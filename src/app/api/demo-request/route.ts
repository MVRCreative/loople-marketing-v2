import { tokenBucket } from '@arcjet/next';
import { NextResponse } from 'next/server';
import arcjet from '@/libs/Arcjet';
import { createMarketingDemoOpportunity } from '@/libs/Attio';
import { logger } from '@/libs/Logger';
import { companyDomainFromEmail, DemoRequestValidation } from '@/validations/DemoRequestValidation';

export const runtime = 'nodejs';

const aj = arcjet.withRule(
  tokenBucket({
    mode: 'LIVE',
    characteristics: ['ip.src'],
    refillRate: 5,
    interval: 60,
    capacity: 5,
  }),
);

/**
 * Accepts a demo request, upserts Person/Company/Deal in Attio, and always
 * returns success to the client so Calendly can still open on CRM failure.
 * @param request Incoming POST with JSON body.
 * @returns JSON `{ ok: true }` or a validation/rate-limit error.
 */
export const POST = async (request: Request) => {
  const decision = await aj.protect(request, { requested: 1 });
  if (decision.isDenied()) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const parsed = DemoRequestValidation.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid form data', issues: parsed.error.issues },
      { status: 400 },
    );
  }

  const { data } = parsed;
  const companyDomain = companyDomainFromEmail(data.workEmail);

  try {
    const result = await createMarketingDemoOpportunity({
      fullName: data.fullName,
      workEmail: data.workEmail,
      organizationName: data.organizationName,
      ...(companyDomain ? { companyDomain } : {}),
    });

    if (!result.ok) {
      logger.warn('Demo request saved with partial Attio failure', {
        email: data.workEmail,
        personOk: result.person.ok,
        companyOk: result.company.ok,
        dealOk: result.deal.ok,
      });
    }
  } catch (error) {
    logger.error('Demo request Attio write failed', {
      email: data.workEmail,
      error: error instanceof Error ? error.message : 'unknown',
    });
  }

  // Always unlock scheduling after a valid payload. CRM is best-effort.
  return NextResponse.json({ ok: true });
};
