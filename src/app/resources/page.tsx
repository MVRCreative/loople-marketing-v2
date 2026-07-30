import type { Metadata } from 'next';
import { MarketingStubPage } from '@/components/common';

export const metadata: Metadata = {
  title: 'Resources | Loople',
  description: 'Guides, support, and resources for running your community on Loople.',
};

/**
 * Resources marketing stub.
 * @returns Stub page until full content lands.
 */
export default function ResourcesPage() {
  return (
    <MarketingStubPage
      title="Resources"
      description="Guides, support, and resources for running your community on Loople."
    />
  );
}
