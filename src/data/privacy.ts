/**
 * Privacy Policy metadata and on-this-page index.
 */

import type { LegalTocItem } from '@/components/legal/types';

export const privacyPolicyMeta = {
  title: 'Privacy Policy',
  description: 'How Loople collects, uses, discloses, and protects personal information.',
  effectiveDate: 'August 28, 2026',
} as const;

export const privacyPolicyToc: readonly LegalTocItem[] = [
  {
    id: 'information-we-collect',
    label: '1. Information we collect',
    children: [
      { id: 'account-and-profile', label: 'Account and profile' },
      { id: 'family-and-dependents', label: 'Family and dependents' },
      { id: 'community-and-membership', label: 'Community and membership' },
      { id: 'organization-registration', label: 'Organization registration' },
      { id: 'messages-and-content', label: 'Messages and content' },
      { id: 'payments-and-transactions', label: 'Payments and transactions' },
      { id: 'support-and-communications', label: 'Support and communications' },
      { id: 'device-usage-and-technical', label: 'Device, usage, and technical' },
      { id: 'location-information', label: 'Location' },
    ],
  },
  { id: 'google-sign-in', label: '2. Google Sign-In' },
  { id: 'sign-in-with-apple', label: '3. Sign in with Apple' },
  { id: 'how-we-use-personal-information', label: '4. How we use personal information' },
  { id: 'how-organizations-use-information', label: '5. How organizations use information' },
  { id: 'teen-accounts', label: '6. Teen accounts, guardians, and messaging' },
  {
    id: 'how-we-share-personal-information',
    label: '7. How we share personal information',
    children: [
      { id: 'share-with-organizations', label: 'With organizations' },
      { id: 'share-with-other-users', label: 'With other users' },
      { id: 'share-with-service-providers', label: 'With service providers' },
      { id: 'avatar-generation', label: 'Avatar generation' },
      { id: 'legal-safety-enforcement', label: 'Legal, safety, and enforcement' },
      { id: 'business-transfers', label: 'Business transfers' },
    ],
  },
  { id: 'do-not-sell', label: '8. We do not sell personal information' },
  { id: 'analytics', label: '9. Analytics and similar technologies' },
  { id: 'communications-and-notifications', label: '10. Communications and notifications' },
  { id: 'data-retention', label: '11. Data retention' },
  { id: 'your-choices-and-privacy-rights', label: '12. Your choices and privacy rights' },
  { id: 'security', label: '13. Security' },
  { id: 'international-processing', label: '14. International and cross-border processing' },
  { id: 'childrens-privacy', label: "15. Children's privacy" },
  { id: 'changes', label: '16. Changes to this Privacy Policy' },
  { id: 'contact-us', label: '17. Contact us' },
];
