/**
 * Homepage closing CTA band — primary signup plus pricing escape hatch.
 */

import { Button } from '@/components/common/Button';
import { sitePrimaryCta } from '@/data/site-nav';

/**
 * Final homepage call-to-action before the footer.
 * @returns Centered CTA section with primary and secondary actions.
 */
export const HomeCta = () => (
  <section aria-labelledby="home-cta-heading" className="border-t border-ds-border bg-ds-muted/40">
    <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-6 py-14 sm:flex-row sm:items-center sm:py-16">
      <div>
        <h2
          id="home-cta-heading"
          className="text-2xl font-semibold tracking-tight text-ds-foreground"
        >
          Ready to keep your community moving?
        </h2>
        <p className="mt-2 text-sm text-ds-muted-foreground sm:text-base">
          Get started free, or see how Loople fits your community.
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Button href={sitePrimaryCta.href} size="md">
          {sitePrimaryCta.label}
        </Button>
        <Button href="/pricing" variant="outline" size="md">
          View pricing
        </Button>
      </div>
    </div>
  </section>
);
