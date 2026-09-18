import type { Metadata } from 'next';
import { Button, Navbar, RevealHeading, RevealLines, SiteFooter } from '@/components/common';

export const metadata: Metadata = {
  title: 'Careers | Loople',
  description: 'Come build the platform communities rely on.',
};

/**
 * Careers page — open roles CTA while hiring is early.
 * @returns Careers marketing page.
 */
export default function CareersPage() {
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
              Come build Loople
            </RevealHeading>
            <RevealLines
              as="p"
              delay={0.12}
              className="mt-6 text-base leading-relaxed text-ds-muted-foreground sm:text-lg"
            >
              We are a small team shipping a product organizers and families use every week. If you
              care about clear product thinking, careful craft, and real communities — we want to
              hear from you.
            </RevealLines>
            <RevealLines
              as="p"
              delay={0.2}
              className="mt-4 text-base leading-relaxed text-ds-muted-foreground sm:text-lg"
            >
              We do not publish a full roles board yet. Send a short note about what you want to
              work on, plus a resume or portfolio.
            </RevealLines>
            <div className="mt-10">
              <Button href="mailto:careers@loople.app" size="md">
                Email careers@loople.app
              </Button>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
