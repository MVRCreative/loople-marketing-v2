import type { Metadata } from 'next';
import { Button, Navbar, RevealHeading, RevealLines, SiteFooter } from '@/components/common';
import { siteDemoCta } from '@/data/site-nav';

export const metadata: Metadata = {
  title: 'Support | Loople',
  description: 'Get help with Loople for your community.',
};

/**
 * Support page — contact paths for organizers and members.
 * @returns Support marketing page.
 */
export default function SupportPage() {
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
              We are here to help
            </RevealHeading>
            <RevealLines
              as="p"
              delay={0.12}
              className="mt-6 text-base leading-relaxed text-ds-muted-foreground sm:text-lg"
            >
              Whether you are setting up your first program or unblocking a payment for a family,
              reach out and we will help you get moving again.
            </RevealLines>

            <div className="mt-12 space-y-8">
              <div>
                <h2 className="text-lg font-semibold tracking-tight text-ds-foreground">
                  Email support
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-ds-muted-foreground sm:text-base">
                  For account, billing, and product questions.
                </p>
                <div className="mt-4">
                  <Button href="mailto:support@loople.app" size="md">
                    Email support@loople.app
                  </Button>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold tracking-tight text-ds-foreground">
                  Book a walkthrough
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-ds-muted-foreground sm:text-base">
                  Prefer a live session? Schedule a demo and we will tailor it to your community.
                </p>
                <div className="mt-4">
                  <Button href={siteDemoCta.href} variant="outline" size="md">
                    {siteDemoCta.label}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
