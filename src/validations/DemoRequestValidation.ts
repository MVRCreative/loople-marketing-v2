import * as z from 'zod';

export const DemoRequestValidation = z.object({
  fullName: z.string().trim().min(1, 'Enter your name').max(120),
  workEmail: z.email('Enter a valid work email'),
  organizationName: z.string().trim().min(1, 'Enter your organization').max(160),
  communityType: z.string().trim().max(80).optional(),
  communitySize: z.string().trim().max(40).optional(),
});

export type DemoRequestInput = z.infer<typeof DemoRequestValidation>;

/**
 * Derives a company domain from a work email for Attio company matching.
 * @param email Work email address.
 * @returns Lowercased domain, or `undefined` for public inbox hosts.
 */
export const companyDomainFromEmail = (email: string): string | undefined => {
  const domain = email.split('@')[1]?.toLowerCase();
  if (!domain) {
    return undefined;
  }

  const publicInboxHosts = new Set([
    'gmail.com',
    'googlemail.com',
    'yahoo.com',
    'hotmail.com',
    'outlook.com',
    'icloud.com',
    'me.com',
    'aol.com',
    'proton.me',
    'protonmail.com',
  ]);

  if (publicInboxHosts.has(domain)) {
    return undefined;
  }

  return domain;
};
