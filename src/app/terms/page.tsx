import type { Metadata } from 'next';
import { MarketingStubPage } from '@/components/common';

export const metadata: Metadata = {
  title: 'Terms | Loople',
  description: 'The terms that govern your use of Loople.',
};

/**
 * Terms marketing stub.
 * @returns Stub page until full content lands.
 */
export default function TermsPage() {
  return (
    <MarketingStubPage
      title="Terms"
      description="The terms that govern your use of Loople."
    />
  );
}
