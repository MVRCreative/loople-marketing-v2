/**
 * Thin Attio REST client for marketing demo booking.
 * No SDK — `fetch` only. Requires `ATTIO_API_KEY`.
 *
 * Objects used:
 * - People (CRM identity, match on email)
 * - Companies (CRM account for demo leads with a work domain)
 * - Deals (sales pipeline; match on unique `dedupe_key`)
 *
 * Deal dedupe: `demo:{lowercase-email}` via unique text attribute `dedupe_key`.
 */

import { Env } from '@/libs/Env';
import { logger } from '@/libs/Logger';

const ATTIO_BASE_URL = 'https://api.attio.com/v2';

/** CRM source tag (custom select on People, Companies, Deals). */
type LoopleSource = 'marketing_demo' | 'product_signup_prod' | 'product_signup_staging';

/** Deal pipeline stages (Attio status titles). */
const DEAL_STAGES = {
  newLead: 'New Lead',
  contacted: 'Contacted',
  demoScheduled: 'Demo Scheduled',
  demoCompleted: 'Demo Completed',
  evaluating: 'Evaluating',
  proposal: 'Proposal / Approval',
  closedWon: 'Closed Won',
  closedLost: 'Closed Lost',
} as const;

type DealStage = (typeof DEAL_STAGES)[keyof typeof DEAL_STAGES];

type UpsertPersonInput = {
  email: string;
  fullName: string;
  source?: LoopleSource;
};

type UpsertCompanyInput = {
  name: string;
  domain?: string;
  source?: LoopleSource;
};

type UpsertDealInput = {
  dedupeKey: string;
  name: string;
  stage?: DealStage;
  personEmail: string;
  companyDomain?: string;
  source?: LoopleSource;
  demoScheduledAt?: string;
};

type AttioRecord = {
  id?: { record_id?: string };
};

export type AttioResult = {
  ok: boolean;
  data?: AttioRecord;
  error?: string;
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

/**
 * Stable Deal dedupe key for a demo lead email.
 * @param email Invitee / form email.
 * @returns `demo:{email}`.
 */
export const demoDealDedupeKey = (email: string): string => `demo:${email.trim().toLowerCase()}`;

const splitName = (fullName: string): { firstName: string; lastName: string } => {
  const parts = fullName.trim().split(/\s+/u);
  const firstName = parts[0] ?? fullName;
  const lastName = parts.slice(1).join(' ');
  return { firstName, lastName };
};

const readAttioRecord = (value: unknown): AttioRecord | undefined => {
  if (!isRecord(value) || !('data' in value)) {
    return undefined;
  }
  const { data } = value;
  if (!isRecord(data)) {
    return undefined;
  }
  return data;
};

const attioFetch = async (path: string, init: RequestInit): Promise<AttioResult> => {
  if (!Env.ATTIO_API_KEY) {
    return { ok: false, error: 'ATTIO_API_KEY is not configured' };
  }

  try {
    const headers = new Headers(init.headers);
    headers.set('Authorization', `Bearer ${Env.ATTIO_API_KEY}`);
    headers.set('Content-Type', 'application/json');

    const response = await fetch(`${ATTIO_BASE_URL}${path}`, {
      ...init,
      headers,
    });

    if (!response.ok) {
      const body = await response.text();
      logger.error('Attio request failed', {
        integration: 'attio',
        path,
        status: response.status,
        body: body.slice(0, 500),
      });
      return { ok: false, error: `Attio ${response.status}` };
    }

    const json: unknown = await response.json();
    return { ok: true, data: readAttioRecord(json) };
  } catch (error) {
    logger.error('Attio request threw', {
      integration: 'attio',
      path,
      error: error instanceof Error ? error.message : 'unknown',
    });
    return { ok: false, error: 'Attio network error' };
  }
};

/**
 * Upserts a Person matched on email.
 * @param input Person fields.
 * @returns Attio result.
 */
const upsertPerson = async (input: UpsertPersonInput): Promise<AttioResult> => {
  const { firstName, lastName } = splitName(input.fullName);
  const values: Record<string, unknown> = {
    email_addresses: [{ email_address: input.email }],
    name: [{ first_name: firstName, last_name: lastName, full_name: input.fullName }],
  };
  if (input.source) {
    values.loople_source = input.source;
  }

  return await attioFetch('/objects/people/records?matching_attribute=email_addresses', {
    method: 'PUT',
    body: JSON.stringify({ data: { values } }),
  });
};

/**
 * Upserts a Company matched on domain when available.
 * @param input Company fields.
 * @returns Attio result.
 */
const upsertCompany = async (input: UpsertCompanyInput): Promise<AttioResult> => {
  const values: Record<string, unknown> = {
    name: [{ value: input.name }],
  };
  if (input.source) {
    values.loople_source = input.source;
  }

  if (input.domain) {
    values.domains = [{ domain: input.domain }];
    return await attioFetch('/objects/companies/records?matching_attribute=domains', {
      method: 'PUT',
      body: JSON.stringify({ data: { values } }),
    });
  }

  return await attioFetch('/objects/companies/records', {
    method: 'POST',
    body: JSON.stringify({ data: { values } }),
  });
};

/**
 * Upserts a Deal matched on unique `dedupe_key`.
 * @param input Deal fields.
 * @returns Attio result.
 */
const upsertDeal = async (input: UpsertDealInput): Promise<AttioResult> => {
  const values: Record<string, unknown> = {
    dedupe_key: input.dedupeKey,
    name: [{ value: input.name }],
    associated_people: [
      {
        target_object: 'people',
        email_addresses: [{ email_address: input.personEmail }],
      },
    ],
  };
  if (input.source) {
    values.loople_source = input.source;
  }
  if (input.stage) {
    values.stage = input.stage;
  }
  if (input.demoScheduledAt) {
    values.demo_scheduled_at = input.demoScheduledAt;
  }
  if (input.companyDomain) {
    values.associated_company = [
      {
        target_object: 'companies',
        domains: [{ domain: input.companyDomain }],
      },
    ];
  }

  return await attioFetch('/objects/deals/records?matching_attribute=dedupe_key', {
    method: 'PUT',
    body: JSON.stringify({ data: { values } }),
  });
};

/**
 * Marks a demo Deal as scheduled (stage + optional start time).
 * Idempotent via `dedupe_key`.
 * @param options Dedupe key, optional ISO start time.
 * @returns Attio result.
 */
export const markDealDemoScheduled = async (options: {
  dedupeKey: string;
  demoScheduledAt?: string;
}): Promise<AttioResult> => {
  const values: Record<string, unknown> = {
    dedupe_key: options.dedupeKey,
    stage: DEAL_STAGES.demoScheduled,
  };
  if (options.demoScheduledAt) {
    values.demo_scheduled_at = options.demoScheduledAt;
  }

  return await attioFetch('/objects/deals/records?matching_attribute=dedupe_key', {
    method: 'PUT',
    body: JSON.stringify({ data: { values } }),
  });
};

/**
 * Creates the marketing-demo opportunity chain: person → company → deal.
 * Failures are logged and returned; callers should not block UX on CRM errors.
 * @param input Lead details from the demo form.
 * @returns Aggregate success flag.
 */
export const createMarketingDemoOpportunity = async (input: {
  fullName: string;
  workEmail: string;
  organizationName: string;
  companyDomain?: string;
}) => {
  const person = await upsertPerson({
    email: input.workEmail,
    fullName: input.fullName,
    source: 'marketing_demo',
  });

  const companyInput: UpsertCompanyInput = {
    name: input.organizationName,
    source: 'marketing_demo',
  };
  if (input.companyDomain) {
    companyInput.domain = input.companyDomain;
  }
  const company = await upsertCompany(companyInput);

  const dealInput: UpsertDealInput = {
    dedupeKey: demoDealDedupeKey(input.workEmail),
    name: `Demo — ${input.organizationName}`,
    stage: DEAL_STAGES.newLead,
    personEmail: input.workEmail,
    source: 'marketing_demo',
  };
  if (input.companyDomain) {
    dealInput.companyDomain = input.companyDomain;
  }
  const deal = await upsertDeal(dealInput);

  logger.info('Marketing demo opportunity sync', {
    integration: 'attio',
    object: 'deal',
    sourceId: demoDealDedupeKey(input.workEmail),
    personOk: person.ok,
    companyOk: company.ok,
    dealOk: deal.ok,
  });

  return {
    ok: person.ok && company.ok && deal.ok,
    person,
    company,
    deal,
  };
};
