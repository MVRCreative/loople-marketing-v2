import type { Metadata } from 'next';
import { MarketingStubPage } from '@/components/common';

export const metadata: Metadata = {
  title: 'Get started | Loople',
  description: 'Create your Loople account and start running your community.',
};

/**
 * Get started (sign-up) marketing stub.
 * @returns Stub page until full onboarding lands.
 */
export default function SignUpPage() {
  return (
    <MarketingStubPage
      title="Get started"
      description="Create your Loople account and start running your community."
    />
  );
}
