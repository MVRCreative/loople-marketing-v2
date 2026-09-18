/**
 * Draft pricing tiers for the marketing pricing page.
 * Dollar amounts are intentionally marked TODO until finance confirms numbers.
 */

export type PricingTier = {
  id: string;
  name: string;
  /** Display price string — replace TODO placeholders before launch. */
  priceLabel: string;
  priceCaption: string;
  description: string;
  highlighted?: boolean;
  features: readonly string[];
  ctaLabel: string;
  ctaHref: string;
};

export const pricingTiers: readonly PricingTier[] = [
  {
    id: 'starter',
    name: 'Starter',
    priceLabel: 'TODO: price',
    priceCaption: 'per month, billed annually',
    description: 'For small clubs getting organized for the first time.',
    features: [
      'Up to 100 members',
      'Online registration and waivers',
      'Centralized newsfeed',
      'Family accounts',
      'Email support',
    ],
    ctaLabel: 'Schedule Demo',
    ctaHref: '/demo',
  },
  {
    id: 'growth',
    name: 'Growth',
    priceLabel: 'TODO: price',
    priceCaption: 'per month, billed annually',
    description: 'For growing communities that need programs, payments, and broadcasts.',
    highlighted: true,
    features: [
      'Up to 1,000 members',
      'Everything in Starter',
      'Programs and events',
      'Targeted broadcasts',
      'Roles and permissions',
      'Priority support',
    ],
    ctaLabel: 'Schedule Demo',
    ctaHref: '/demo',
  },
  {
    id: 'organization',
    name: 'Organization',
    priceLabel: 'TODO: price',
    priceCaption: 'custom annual agreement',
    description: 'For leagues, multi-site orgs, and communities that need a tailored rollout.',
    features: [
      'Unlimited members',
      'Everything in Growth',
      'App marketplace access',
      'Dedicated success manager',
      'Custom onboarding',
      'SLA and security review',
    ],
    ctaLabel: 'Schedule Demo',
    ctaHref: '/demo',
  },
];
