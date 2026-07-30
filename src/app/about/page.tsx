import type { Metadata } from 'next';
import { MarketingStubPage } from '@/components/common';

export const metadata: Metadata = {
  title: 'About | Loople',
  description: 'We build the system that keeps communities moving.',
};

/**
 * About marketing stub.
 * @returns Stub page until full content lands.
 */
export default function AboutPage() {
  return (
    <MarketingStubPage
      title="About"
      description="We build the system that keeps communities moving."
    />
  );
}
