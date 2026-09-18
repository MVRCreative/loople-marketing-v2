import { createHmac, timingSafeEqual } from 'node:crypto';
import { NextResponse } from 'next/server';
import { demoDealDedupeKey, markDealDemoScheduled } from '@/libs/Attio';
import { Env } from '@/libs/Env';
import { logger } from '@/libs/Logger';

export const runtime = 'nodejs';

const TIMESTAMP_TOLERANCE_SECONDS = 180;

type CalendlyWebhookPayload = {
  event?: string;
  payload?: {
    email?: string;
    uri?: string;
    cancel_url?: string;
    scheduled_event?: {
      start_time?: string;
      uri?: string;
    };
  };
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

/**
 * Parses Calendly's `t=<unix>,v1=<hex>` signature header.
 * @param header Raw `Calendly-Webhook-Signature` value.
 * @returns Timestamp and v1 signature parts when present.
 */
const parseSignatureHeader = (
  header: string,
): { timestamp: string; signature: string } | undefined => {
  const parts: Record<string, string> = {};
  for (const pair of header.split(',')) {
    const separatorIndex = pair.indexOf('=');
    if (separatorIndex === -1) {
      continue;
    }
    const key = pair.slice(0, separatorIndex);
    const value = pair.slice(separatorIndex + 1);
    if (key && value) {
      parts[key] = value;
    }
  }

  if (!parts.t || !parts.v1) {
    return undefined;
  }

  return { timestamp: parts.t, signature: parts.v1 };
};

/**
 * Verifies a Calendly webhook signature header.
 * Signed content is `{t}.{rawBody}`; `v1` is hex HMAC-SHA256.
 * @param options Raw body, signature header, and signing key.
 * @returns Whether the signature is valid and fresh.
 */
const verifyCalendlySignature = (options: {
  rawBody: string;
  signatureHeader: string | null;
  signingKey: string;
}): boolean => {
  if (!options.signatureHeader) {
    return false;
  }

  const parsed = parseSignatureHeader(options.signatureHeader);
  if (!parsed) {
    return false;
  }

  const timestamp = Number(parsed.timestamp);
  if (!Number.isFinite(timestamp)) {
    return false;
  }

  const ageSeconds = Math.abs(Math.floor(Date.now() / 1000) - timestamp);
  if (ageSeconds > TIMESTAMP_TOLERANCE_SECONDS) {
    return false;
  }

  const expected = createHmac('sha256', options.signingKey)
    .update(`${parsed.timestamp}.${options.rawBody}`)
    .digest('hex');

  try {
    const expectedBuffer = Buffer.from(expected, 'hex');
    const actualBuffer = Buffer.from(parsed.signature, 'hex');
    if (expectedBuffer.length !== actualBuffer.length) {
      return false;
    }
    return timingSafeEqual(expectedBuffer, actualBuffer);
  } catch {
    return false;
  }
};

/**
 * Narrows unknown JSON into the Calendly webhook payload shape.
 * @param value Parsed JSON body.
 * @returns Typed payload when the top-level shape is an object.
 */
const readCalendlyPayload = (value: unknown): CalendlyWebhookPayload | undefined => {
  if (!isRecord(value)) {
    return undefined;
  }

  const payloadValue = value.payload;
  if (!isRecord(payloadValue)) {
    return {
      event: typeof value.event === 'string' ? value.event : undefined,
    };
  }

  const scheduled = isRecord(payloadValue.scheduled_event)
    ? {
        start_time:
          typeof payloadValue.scheduled_event.start_time === 'string'
            ? payloadValue.scheduled_event.start_time
            : undefined,
        uri:
          typeof payloadValue.scheduled_event.uri === 'string'
            ? payloadValue.scheduled_event.uri
            : undefined,
      }
    : undefined;

  return {
    event: typeof value.event === 'string' ? value.event : undefined,
    payload: {
      email: typeof payloadValue.email === 'string' ? payloadValue.email : undefined,
      uri: typeof payloadValue.uri === 'string' ? payloadValue.uri : undefined,
      cancel_url: typeof payloadValue.cancel_url === 'string' ? payloadValue.cancel_url : undefined,
      scheduled_event: scheduled,
    },
  };
};

/**
 * Calendly webhook — updates Attio Deals on invitee.created / invitee.canceled.
 * Verifies HMAC before parsing. Idempotent via Deal `dedupe_key`.
 * @param request Incoming webhook POST (raw body required for HMAC).
 * @returns 200 on success, 401/400/503 on failure.
 */
export const POST = async (request: Request) => {
  const signingKey = Env.CALENDLY_WEBHOOK_SIGNING_KEY;
  if (!signingKey) {
    logger.error('CALENDLY_WEBHOOK_SIGNING_KEY is not configured');
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 503 });
  }

  const rawBody = await request.text();
  const signatureHeader = request.headers.get('Calendly-Webhook-Signature');

  if (
    !verifyCalendlySignature({
      rawBody,
      signatureHeader,
      signingKey,
    })
  ) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }

  let json: unknown;
  try {
    json = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const payload = readCalendlyPayload(json);
  if (!payload) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }

  const eventName = payload.event;

  if (eventName === 'invitee.canceled') {
    // Reschedules emit cancel + create. Preserve the Deal; do not close it.
    logger.info('Calendly invitee.canceled received; Deal left unchanged', {
      integration: 'calendly',
      email: payload.payload?.email,
      inviteeUri: payload.payload?.uri,
    });
    return NextResponse.json({ ok: true, event: eventName, preserved: true });
  }

  if (eventName && eventName !== 'invitee.created') {
    return NextResponse.json({ ok: true, ignored: true });
  }

  const email = payload.payload?.email;
  if (!email) {
    logger.warn('Calendly webhook missing invitee email');
    return NextResponse.json({ error: 'Missing invitee email' }, { status: 400 });
  }

  const dedupeKey = demoDealDedupeKey(email);
  const demoScheduledAt = payload.payload?.scheduled_event?.start_time;

  const result = await markDealDemoScheduled({
    dedupeKey,
    ...(demoScheduledAt ? { demoScheduledAt } : {}),
  });

  if (!result.ok) {
    logger.error('Failed to mark Attio deal Demo Scheduled', {
      integration: 'attio',
      object: 'deal',
      sourceId: dedupeKey,
      error: result.error,
    });
    return NextResponse.json({ error: 'CRM update failed' }, { status: 502 });
  }

  logger.info('Deal marked Demo Scheduled', {
    integration: 'attio',
    object: 'deal',
    sourceId: dedupeKey,
    demoScheduledAt,
  });

  return NextResponse.json({ ok: true, event: 'invitee.created' });
};
