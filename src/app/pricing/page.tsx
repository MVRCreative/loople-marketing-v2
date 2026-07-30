import type { Metadata } from 'next';
import { MarketingStubPage } from '@/components/common';

export const metadata: Metadata = {
  title: 'Pricing | Loople',
  description: 'Simple plans for communities of every size.',
};

/**
 * Pricing marketing stub.
 * @returns Stub page until full content lands.
 */
export default function PricingPage() {
  return (
    <MarketingStubPage
      title="Pricing"
      description="Simple plans for communities of every size."
    />
  );
}
