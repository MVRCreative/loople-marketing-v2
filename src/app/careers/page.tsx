import type { Metadata } from 'next';
import { MarketingStubPage } from '@/components/common';

export const metadata: Metadata = {
  title: 'Careers | Loople',
  description: 'Come build the platform communities rely on.',
};

/**
 * Careers marketing stub.
 * @returns Stub page until full content lands.
 */
export default function CareersPage() {
  return (
    <MarketingStubPage title="Careers" description="Come build the platform communities rely on." />
  );
}
