import type { Metadata } from 'next';
import { Button, Navbar, RevealHeading, RevealLines, SiteFooter } from '@/components/common';
import { siteDemoCta } from '@/data/site-nav';

export const metadata: Metadata = {
  title: 'About | Loople',
  description: 'We build the system that keeps communities moving.',
};

/**
 * About page — company story and product intent.
 * @returns About marketing page.
 */
export default function AboutPage() {
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
              Communities deserve better tools
            </RevealHeading>
            <RevealLines
              as="p"
              delay={0.12}
              className="mt-6 text-base leading-relaxed text-ds-muted-foreground sm:text-lg"
            >
              Loople started from a simple frustration: the people who keep clubs and leagues
              running were stitching together registration forms, payment apps, group chats, and
              spreadsheets. Members were left guessing. Organizers were exhausted.
            </RevealLines>
            <RevealLines
              as="p"
              delay={0.2}
              className="mt-4 text-base leading-relaxed text-ds-muted-foreground sm:text-lg"
            >
              We build one system for communication, schedules, registration, payments, and family
              accounts — so the whole community can keep moving.
            </RevealLines>
            <div className="mt-10">
              <Button href={siteDemoCta.href} size="md">
                {siteDemoCta.label}
              </Button>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
