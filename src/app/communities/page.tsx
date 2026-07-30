import type { Metadata } from 'next';
import { MarketingStubPage } from '@/components/common';

export const metadata: Metadata = {
  title: 'Communities | Loople',
  description: 'Explore how communities run on Loople.',
};

/**
 * Communities marketing stub — reserved for community-specific pages.
 * @returns Stub page until full content lands.
 */
export default function CommunitiesPage() {
  return (
    <MarketingStubPage
      title="Communities"
      description="Explore how communities run on Loople. Dedicated community pages will live here."
    />
  );
}
