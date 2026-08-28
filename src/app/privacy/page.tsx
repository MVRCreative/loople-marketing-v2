import type { Metadata } from 'next';
import { LegalDocLayout } from '@/components/legal/LegalDocLayout';
import { PrivacyPolicyContent } from '@/components/legal/PrivacyPolicyContent';
import { privacyPolicyMeta, privacyPolicyToc } from '@/data/privacy';

export const metadata: Metadata = {
  title: `${privacyPolicyMeta.title} | Loople`,
  description: privacyPolicyMeta.description,
};

/**
 * Loople Privacy Policy.
 * @returns Docs-style privacy policy with a clickable section index.
 */
export default function PrivacyPage() {
  return (
    <LegalDocLayout
      title={privacyPolicyMeta.title}
      effectiveDate={privacyPolicyMeta.effectiveDate}
      toc={privacyPolicyToc}
      currentPath="/privacy"
    >
      <PrivacyPolicyContent />
    </LegalDocLayout>
  );
}
