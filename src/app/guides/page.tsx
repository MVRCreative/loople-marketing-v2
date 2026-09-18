import type { Metadata } from 'next';
import Link from 'next/link';
import { Button, Navbar, RevealHeading, RevealLines, SiteFooter } from '@/components/common';
import { siteDemoCta } from '@/data/site-nav';

export const metadata: Metadata = {
  title: 'Guides | Loople',
  description: 'Practical guides for running your community on Loople.',
};

/**
 * Guides index — points to Resources until dedicated guide content expands.
 * @returns Guides marketing page.
 */
export default function GuidesPage() {
  return (
    <div className="bg-ds-background text-ds-foreground">
      <Navbar />

      <main>
        <section className="border-b border-ds-border">
          <div className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
            <RevealHeading
              as="h1"
              className="text-4xl font-bold tracking-tight text-balance sm:text-5xl"
            >
              Guides for running your community
            </RevealHeading>
            <RevealLines
              as="p"
              delay={0.12}
              className="mt-6 text-base leading-relaxed text-ds-muted-foreground sm:text-lg"
            >
              Step-by-step help for registration, communication, programs, and family accounts.
              Published guides live in Resources; more dedicated how-tos are on the way.
            </RevealLines>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Button href="/resources" size="md">
                Browse resources
              </Button>
              <Button href={siteDemoCta.href} variant="outline" size="md">
                {siteDemoCta.label}
              </Button>
            </div>
            <p className="mt-8 text-sm text-ds-muted-foreground">
              Looking for something specific?{' '}
              <Link
                href="/support"
                className="font-medium text-ds-foreground underline-offset-4 hover:underline"
              >
                Contact support
              </Link>
              .
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
