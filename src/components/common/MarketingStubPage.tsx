/**
 * Lightweight stub for marketing routes that are linked but not designed yet.
 */

import { Button } from '@/components/common/Button';
import { Navbar } from '@/components/common/Navbar';
import { RevealHeading } from '@/components/common/RevealHeading';
import { RevealLines } from '@/components/common/RevealLines';
import { SiteFooter } from '@/components/common/SiteFooter';

export type MarketingStubPageProps = {
  title: string;
  description: string;
};

/**
 * Placeholder marketing page until full content lands.
 * @param props Stub title and description.
 * @returns Stub layout with nav and footer.
 */
export const MarketingStubPage = (props: MarketingStubPageProps) => (
  <div className="flex min-h-svh flex-col bg-ds-background text-ds-foreground">
    <Navbar />

    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center px-6 py-20 sm:py-28">
      <RevealHeading as="h1" className="text-4xl font-bold tracking-tight text-balance sm:text-5xl">
        {props.title}
      </RevealHeading>
      <RevealLines
        as="p"
        delay={0.15}
        className="mt-6 max-w-2xl text-base leading-relaxed text-ds-muted-foreground sm:text-lg"
      >
        {props.description}
      </RevealLines>
      <p className="mt-8 text-sm text-ds-muted-foreground">
        This page is a stub. Full content will land here.
      </p>
      <div className="mt-10">
        <Button href="/" variant="outline" size="md">
          Back to home
        </Button>
      </div>
    </main>

    <SiteFooter />
  </div>
);
