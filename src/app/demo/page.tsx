import type { Metadata } from 'next';
import { Navbar, RevealHeading, RevealLines, SiteFooter } from '@/components/common';
import { DemoRequestForm } from '@/components/demo/DemoRequestForm';

export const metadata: Metadata = {
  title: 'Schedule Demo | Loople',
  description: 'Tell us a bit about your community and pick a time to see Loople in action.',
};

/**
 * Demo booking page — lead capture form followed by a prefilled Calendly embed.
 * @returns Demo request page.
 */
export default function DemoPage() {
  return (
    <div className="bg-ds-background text-ds-foreground">
      <Navbar />

      <main className="mx-auto w-full max-w-2xl px-6 py-16 sm:py-24">
        <RevealHeading
          as="h1"
          className="text-4xl font-bold tracking-tight text-balance sm:text-5xl"
        >
          Schedule Demo
        </RevealHeading>
        <RevealLines
          as="p"
          delay={0.12}
          className="mt-6 text-base leading-relaxed text-ds-muted-foreground sm:text-lg"
        >
          Share a few details so we can tailor the walkthrough. Then pick a time that works for you.
        </RevealLines>

        <div className="mt-12">
          <DemoRequestForm />
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
