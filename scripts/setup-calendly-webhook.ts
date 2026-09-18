/**
 * Creates (or reuses) a Calendly USER-scoped webhook subscription for
 * invitee.created + invitee.canceled, using our own signing key.
 *
 * Usage:
 *   bun run calendly:webhook:setup
 *
 * Required env (from .env.local / Vercel):
 *   CALENDLY_PAT
 *   CALENDLY_WEBHOOK_SIGNING_KEY   (generate: openssl rand -hex 32)
 *   PUBLIC_MARKETING_URL           (e.g. https://www.joinloople.com)
 *
 * Does not print secrets.
 */

const CALENDLY_API = 'https://api.calendly.com';

type CalendlyUser = {
  uri: string;
  current_organization: string;
};

type WebhookSubscription = {
  uri: string;
  callback_url: string;
  events: string[];
  scope: string;
  state: string;
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const required = (name: string): string => {
  const value = process.env[name]?.trim();
  if (!value) {
    console.error(`Missing required env: ${name}`);
    process.exit(1);
  }
  return value;
};

const calendlyFetch = async (
  path: string,
  token: string,
  init?: RequestInit,
): Promise<Response> => {
  const headers = new Headers(init?.headers);
  headers.set('Authorization', `Bearer ${token}`);
  headers.set('Content-Type', 'application/json');
  return await fetch(`${CALENDLY_API}${path}`, {
    ...init,
    headers,
  });
};

const readUser = (value: unknown): CalendlyUser | undefined => {
  if (!isRecord(value) || !isRecord(value.resource)) {
    return undefined;
  }
  const { resource } = value;
  if (typeof resource.uri !== 'string' || typeof resource.current_organization !== 'string') {
    return undefined;
  }
  return { uri: resource.uri, current_organization: resource.current_organization };
};

const readSubscriptions = (value: unknown): WebhookSubscription[] => {
  if (!isRecord(value) || !Array.isArray(value.collection)) {
    return [];
  }
  const items: WebhookSubscription[] = [];
  for (const item of value.collection) {
    if (!isRecord(item)) {
      continue;
    }
    if (
      typeof item.uri === 'string' &&
      typeof item.callback_url === 'string' &&
      Array.isArray(item.events) &&
      typeof item.scope === 'string' &&
      typeof item.state === 'string'
    ) {
      items.push({
        uri: item.uri,
        callback_url: item.callback_url,
        events: item.events.filter((event): event is string => typeof event === 'string'),
        scope: item.scope,
        state: item.state,
      });
    }
  }
  return items;
};

const readCreated = (value: unknown): WebhookSubscription | undefined => {
  if (!isRecord(value) || !isRecord(value.resource)) {
    return undefined;
  }
  const list = readSubscriptions({ collection: [value.resource] });
  return list[0];
};

const main = async () => {
  const pat = process.env.CALENDLY_PAT?.trim() ?? process.env.CALENDLY_API_TOKEN?.trim();
  if (!pat) {
    console.error('Missing required env: CALENDLY_PAT (or legacy CALENDLY_API_TOKEN)');
    process.exit(1);
  }

  const signingKey = required('CALENDLY_WEBHOOK_SIGNING_KEY');
  const publicUrl = required('PUBLIC_MARKETING_URL').replace(/\/$/u, '');
  const callbackUrl = `${publicUrl}/api/calendly-webhook`;

  const meResponse = await calendlyFetch('/users/me', pat);
  if (!meResponse.ok) {
    const body = await meResponse.text();
    console.error(`Calendly /users/me failed: ${meResponse.status}`);
    console.error(body.slice(0, 500));
    if (meResponse.status === 401 || meResponse.status === 403) {
      console.error(
        'Check CALENDLY_PAT in .env.local — recreate the token in Calendly → Integrations & apps → API & webhooks if needed.',
      );
    }
    process.exit(1);
  }

  const meJson: unknown = await meResponse.json();
  const me = readUser(meJson);
  if (!me) {
    console.error('Calendly /users/me returned unexpected shape');
    process.exit(1);
  }

  const listUrl = new URL(`${CALENDLY_API}/webhook_subscriptions`);
  listUrl.searchParams.set('organization', me.current_organization);
  listUrl.searchParams.set('user', me.uri);
  listUrl.searchParams.set('scope', 'user');

  const listResponse = await fetch(listUrl, {
    headers: { Authorization: `Bearer ${pat}` },
  });
  if (!listResponse.ok) {
    console.error(`Calendly list webhooks failed: ${listResponse.status}`);
    process.exit(1);
  }

  const listJson: unknown = await listResponse.json();
  const existing = readSubscriptions(listJson).find(
    (item) => item.callback_url === callbackUrl && item.state === 'active',
  );

  if (existing) {
    console.log('Webhook already exists for this callback URL (user scope). Skipping create.');
    console.log(`URI: ${existing.uri}`);
    console.log(`Events: ${existing.events.join(', ')}`);
    return;
  }

  const createResponse = await calendlyFetch('/webhook_subscriptions', pat, {
    method: 'POST',
    body: JSON.stringify({
      url: callbackUrl,
      events: ['invitee.created', 'invitee.canceled'],
      organization: me.current_organization,
      user: me.uri,
      scope: 'user',
      signing_key: signingKey,
    }),
  });

  if (!createResponse.ok) {
    const body = await createResponse.text();
    console.error(`Calendly create webhook failed: ${createResponse.status}`);
    console.error(body.slice(0, 500));
    process.exit(1);
  }

  const createdJson: unknown = await createResponse.json();
  const created = readCreated(createdJson);
  console.log('Created Calendly webhook subscription.');
  console.log(`Callback: ${callbackUrl}`);
  if (created) {
    console.log(`URI: ${created.uri}`);
  }
  console.log('Events: invitee.created, invitee.canceled');
  console.log('Signing key: (using CALENDLY_WEBHOOK_SIGNING_KEY from env — not printed)');
};

/**
 * CLI entry — run via `bun run calendly:webhook:setup`.
 */
export const runCalendlyWebhookSetup = async (): Promise<void> => {
  await main();
};

if (import.meta.main) {
  try {
    await runCalendlyWebhookSetup();
  } catch (error: unknown) {
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
  }
}
