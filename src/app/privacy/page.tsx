import type { Metadata } from 'next';
import { MarketingStubPage } from '@/components/common';

export const metadata: Metadata = {
  title: 'Privacy | Loople',
  description: 'How we collect, use, and protect your information.',
};

/**
 * Privacy marketing stub.
 * @returns Stub page until full content lands.
 */
export default function PrivacyPage() {
  return (
    <MarketingStubPage
      title="Privacy"
      description="How we collect, use, and protect your information."
    />
  );
}
