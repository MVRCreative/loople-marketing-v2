import type { Metadata } from 'next';
import { MarketingStubPage } from '@/components/common';

export const metadata: Metadata = {
  title: 'Guides | Loople',
  description: 'Practical walkthroughs for getting the most out of Loople.',
};

/**
 * Guides marketing stub.
 * @returns Stub page until full content lands.
 */
export default function GuidesPage() {
  return (
    <MarketingStubPage
      title="Guides"
      description="Practical walkthroughs for getting the most out of Loople."
    />
  );
}
