import type { Metadata } from 'next';
import { MarketingStubPage } from '@/components/common';

export const metadata: Metadata = {
  title: 'Support | Loople',
  description: 'Get help with setup, billing, and day-to-day operations.',
};

/**
 * Support marketing stub.
 * @returns Stub page until full content lands.
 */
export default function SupportPage() {
  return (
    <MarketingStubPage
      title="Support"
      description="Get help with setup, billing, and day-to-day operations."
    />
  );
}
