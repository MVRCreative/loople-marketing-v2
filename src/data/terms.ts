/**
 * Terms of Service metadata and on-this-page index.
 */

import type { LegalTocItem } from '@/components/legal/types';

export const termsOfServiceMeta = {
  title: 'Terms of Service',
  description: 'The terms that govern your use of Loople.',
  effectiveDate: 'August 28, 2026',
} as const;

export const termsOfServiceToc: readonly LegalTocItem[] = [
  { id: 'what-loople-is', label: '1. What Loople is' },
  { id: 'eligibility-and-accounts', label: '2. Eligibility and accounts' },
  { id: 'family-accounts-and-dependents', label: '3. Family accounts and dependents' },
  { id: 'teen-messaging', label: '4. Teen messaging and guardian controls' },
  { id: 'communities-and-administrators', label: '5. Communities and administrators' },
  { id: 'organization-questions', label: '6. Organization-created questions and data collection' },
  { id: 'community-rules-waivers', label: '7. Community rules, waivers, and agreements' },
  { id: 'user-generated-content', label: '8. User-generated content' },
  { id: 'avatar-generation', label: '9. Optional avatar generation' },
  { id: 'payments-to-organizations', label: '10. Payments to organizations' },
  { id: 'refunds-and-disputes', label: '11. Refunds and disputes for organization charges' },
  { id: 'community-pro-and-fees', label: '12. Community Pro and fees paid to Loople' },
  { id: 'historical-records', label: '13. Historical records and leaving a community' },
  { id: 'data-exports', label: '14. Data exports' },
  { id: 'notifications-and-communications', label: '15. Notifications and communications' },
  { id: 'acceptable-use', label: '16. Acceptable use' },
  { id: 'platform-enforcement', label: '17. Platform enforcement' },
  { id: 'intellectual-property', label: '18. Intellectual property' },
  { id: 'copyright-complaints', label: '19. Copyright and intellectual-property complaints' },
  { id: 'third-party-services', label: '20. Third-party services' },
  { id: 'privacy', label: '21. Privacy' },
  { id: 'service-availability', label: '22. Service availability' },
  { id: 'changes-to-the-services', label: '23. Changes to the Services' },
  { id: 'disclaimers', label: '24. Disclaimers' },
  { id: 'limitation-of-liability', label: '25. Limitation of liability' },
  { id: 'indemnification', label: '26. Indemnification by organizations and users' },
  { id: 'governing-law', label: '27. Governing law and venue' },
  { id: 'changes-to-these-terms', label: '28. Changes to these Terms' },
  { id: 'termination', label: '29. Termination' },
  { id: 'general-terms', label: '30. General terms' },
  { id: 'contact', label: '31. Contact' },
];
