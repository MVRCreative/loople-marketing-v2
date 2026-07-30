import type { Metadata } from 'next';
import { MarketingStubPage } from '@/components/common';

export const metadata: Metadata = {
  title: 'Sign in | Loople',
  description: 'Sign in to your Loople account.',
};

/**
 * Sign in marketing stub.
 * @returns Stub page until full auth lands.
 */
export default function SignInPage() {
  return (
    <MarketingStubPage
      title="Sign in"
      description="Sign in to your Loople account to manage your community."
    />
  );
}
