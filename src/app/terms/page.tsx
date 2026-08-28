import type { Metadata } from 'next';
import { LegalDocLayout } from '@/components/legal/LegalDocLayout';
import { TermsOfServiceContent } from '@/components/legal/TermsOfServiceContent';
import { termsOfServiceMeta, termsOfServiceToc } from '@/data/terms';

export const metadata: Metadata = {
  title: `${termsOfServiceMeta.title} | Loople`,
  description: termsOfServiceMeta.description,
};

/**
 * Loople Terms of Service.
 * @returns Docs-style terms page with a clickable section index.
 */
export default function TermsPage() {
  return (
    <LegalDocLayout
      title={termsOfServiceMeta.title}
      effectiveDate={termsOfServiceMeta.effectiveDate}
      toc={termsOfServiceToc}
      currentPath="/terms"
    >
      <TermsOfServiceContent />
    </LegalDocLayout>
  );
}
