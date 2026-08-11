/**
 * Homepage hero — product promise and CTAs above a borderless phone stage
 * with product fragments that bounce out into orbit (see `HeroStage`).
 */

import Link from 'next/link';
import { Button, RevealHeading, RevealLines, Stagger } from '@/components/common';
import { AppStoreBadge } from '@/components/home/AppStoreBadge';
import { GooglePlayBadge } from '@/components/home/GooglePlayBadge';
import { HeroStage } from '@/components/home/hero/HeroStage';
import { sitePrimaryCta, siteSecondaryCta } from '@/data/site-nav';

const HERO_COPY = {
  eyebrow: 'The community platform',
  headline: 'Keep the whole community moving.',
  // Non-breaking spaces keep "one place" / "one system" / "and more." from orphaning.
  description:
    'Loople gives members one\u00A0place to keep up and organizers one\u00A0system to manage communication, schedules, registration, payments, and\u00A0more.',
} as const;

const STORE_LINKS = {
  appStore: '/#mobile-apps',
  googlePlay: '/#mobile-apps',
} as const;

const ArrowRightIcon = () => (
  <svg viewBox="0 0 16 16" aria-hidden="true" className="size-4">
    <path
      d="M2.5 8h10m-3.5-3.5L12.5 8 9 11.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * Centered homepage hero — copy on top, phone stage beneath, store badges last.
 * @returns Hero section with product promise, CTAs, media, and store badges.
 */
export const HomeHero = () => (
  <section
    id="home-hero"
    aria-labelledby="home-hero-heading"
    className="relative isolate overflow-x-hidden border-b border-ds-border bg-ds-background"
  >
    <div className="mx-auto max-w-6xl px-6 pt-8 pb-10 sm:pt-10 sm:pb-12 lg:pt-12 lg:pb-16">
      <div className="mx-auto max-w-2xl text-center">
        <Stagger trigger="load" stagger={0} y={12}>
          <p className="inline-flex items-center rounded-ds-full bg-ds-brand-muted px-2.5 py-1 text-xs font-semibold text-ds-brand">
            {HERO_COPY.eyebrow}
          </p>
        </Stagger>

        <RevealHeading
          as="h1"
          id="home-hero-heading"
          trigger="load"
          delay={0.08}
          className="mt-4 font-ds-display text-4xl leading-[1.05] font-bold tracking-tight text-balance text-ds-foreground sm:text-5xl lg:text-[3.25rem]"
        >
          {HERO_COPY.headline}
        </RevealHeading>

        <RevealLines
          as="p"
          trigger="load"
          delay={0.22}
          className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-pretty text-ds-muted-foreground sm:text-base"
        >
          {HERO_COPY.description}
        </RevealLines>

        <Stagger trigger="load" delay={0.38} stagger={0.08} y={14} className="mt-8 sm:mt-10">
          <div className="flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center sm:gap-6">
            <Button href={sitePrimaryCta.href} size="md" className="w-full sm:w-auto">
              {sitePrimaryCta.label}
            </Button>
            <Link
              href={siteSecondaryCta.href}
              className="group inline-flex items-center justify-center gap-1.5 rounded-ds-md text-sm font-semibold text-ds-foreground underline-offset-4 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ds-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-ds-background sm:text-base"
            >
              {siteSecondaryCta.label}
              <span className="transition-transform duration-200 ease-out group-hover:translate-x-0.5">
                <ArrowRightIcon />
              </span>
            </Link>
          </div>
        </Stagger>
      </div>

      <div className="mt-8 sm:mt-9 lg:mt-10">
        <HeroStage />
      </div>

      <Stagger trigger="load" delay={0.55} stagger={0.06} y={12} className="mt-8 sm:mt-10">
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href={STORE_LINKS.appStore}
            aria-label="Download on the App Store"
            className="rounded-ds-md transition-opacity outline-none hover:opacity-80 focus-visible:ring-2 focus-visible:ring-ds-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-ds-background"
          >
            <AppStoreBadge className="h-10 w-auto" />
          </Link>
          <Link
            href={STORE_LINKS.googlePlay}
            aria-label="Get it on Google Play"
            className="rounded-ds-md transition-opacity outline-none hover:opacity-80 focus-visible:ring-2 focus-visible:ring-ds-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-ds-background"
          >
            <GooglePlayBadge className="h-10 w-auto" />
          </Link>
        </div>
      </Stagger>
    </div>
  </section>
);
