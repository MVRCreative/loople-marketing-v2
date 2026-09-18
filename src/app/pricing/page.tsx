import type { Metadata } from 'next';
import {
  Button,
  Navbar,
  RevealHeading,
  RevealLines,
  SiteFooter,
  Stagger,
} from '@/components/common';
import { pricingTiers } from '@/data/pricing';
import { cn } from '@/lib/cn';

export const metadata: Metadata = {
  title: 'Pricing | Loople',
  description: 'Simple plans for communities of every size. Schedule a demo to find the right fit.',
};

/**
 * Pricing page — drafted tiers with TODO price fields; every CTA books a demo.
 * @returns Pricing page.
 */
export default function PricingPage() {
  return (
    <div className="bg-ds-background text-ds-foreground">
      <Navbar />

      <main>
        <section className="border-b border-ds-border">
          <div className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
            <RevealHeading
              as="h1"
              className="max-w-3xl text-4xl font-bold tracking-tight text-balance sm:text-5xl"
            >
              Pricing that scales with your community
            </RevealHeading>
            <RevealLines
              as="p"
              delay={0.12}
              className="mt-6 max-w-2xl text-base leading-relaxed text-ds-muted-foreground sm:text-lg"
            >
              Start simple, then grow into programs, payments, and broadcasts. Final pricing is
              confirmed on a demo — the tiers below show how Loople is structured.
            </RevealLines>
          </div>
        </section>

        <section aria-label="Pricing tiers" className="border-b border-ds-border">
          <div className="mx-auto max-w-6xl px-6 py-14 sm:py-20">
            <Stagger className="grid gap-6 lg:grid-cols-3" stagger={0.08}>
              {pricingTiers.map((tier) => (
                <article
                  key={tier.id}
                  className={cn(
                    'flex flex-col rounded-ds-lg border bg-ds-card p-6 sm:p-8',
                    tier.highlighted ? 'border-ds-brand shadow-ds-sm' : 'border-ds-border',
                  )}
                >
                  <div className="flex items-center justify-between gap-3">
                    <h2 className="text-lg font-semibold tracking-tight text-ds-foreground">
                      {tier.name}
                    </h2>
                    {tier.highlighted ? (
                      <span className="rounded-ds-full bg-ds-brand-muted px-2.5 py-1 text-xs font-semibold text-ds-brand">
                        Most popular
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-ds-muted-foreground">
                    {tier.description}
                  </p>
                  <p className="mt-6 text-3xl font-bold tracking-tight text-ds-foreground">
                    {tier.priceLabel}
                  </p>
                  <p className="mt-1 text-xs text-ds-muted-foreground">{tier.priceCaption}</p>
                  <ul className="mt-8 flex flex-1 flex-col gap-3">
                    {tier.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex gap-2 text-sm leading-relaxed text-ds-foreground"
                      >
                        <span aria-hidden="true" className="text-ds-brand">
                          ✓
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8">
                    <Button
                      href={tier.ctaHref}
                      variant={tier.highlighted ? 'primary' : 'outline'}
                      size="md"
                      className="w-full"
                    >
                      {tier.ctaLabel}
                    </Button>
                  </div>
                </article>
              ))}
            </Stagger>
            <p className="mt-10 text-center text-sm text-ds-muted-foreground">
              Prices marked TODO will be filled in before public launch. Schedule a demo for current
              rates.
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
