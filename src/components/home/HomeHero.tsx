/**
 * Homepage hero — product promise and CTAs beside a bold geometric product
 * poster (see `HeroCollage`).
 */

import Link from 'next/link';
import { Button, RevealHeading, RevealLines, Stagger } from '@/components/common';
import { AppStoreBadge } from '@/components/home/AppStoreBadge';
import { GooglePlayBadge } from '@/components/home/GooglePlayBadge';
import { HeroCollage } from '@/components/home/hero/HeroCollage';
import { sitePrimaryCta, siteSecondaryCta } from '@/data/site-nav';

const HERO_COPY = {
  eyebrow: 'The community platform',
  headline: 'Keep the whole community moving.',
  description:
    'Loople gives members one place to keep up and organizers one system to manage communication, schedules, registration, payments, and more.',
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
 * Split homepage hero — copy on the left, geometric product poster on the right.
 * @returns Hero section with product promise, CTAs, store badges, and media.
 */
export const HomeHero = () => (
  <section
    id="home-hero"
    aria-labelledby="home-hero-heading"
    className="relative isolate bg-ds-background"
  >
    <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 pt-14 pb-16 sm:pt-16 lg:grid-cols-12 lg:gap-10 lg:pt-20 lg:pb-20">
      <div className="lg:col-span-6">
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
          className="mt-5 font-ds-display text-4xl leading-[1.05] font-bold tracking-tight text-balance text-ds-foreground sm:text-5xl lg:text-[3.25rem]"
        >
          {HERO_COPY.headline}
        </RevealHeading>

        <RevealLines
          as="p"
          trigger="load"
          delay={0.22}
          className="mt-5 max-w-lg text-base leading-relaxed text-ds-muted-foreground sm:mt-6 sm:text-lg"
        >
          {HERO_COPY.description}
        </RevealLines>

        <Stagger trigger="load" delay={0.38} stagger={0.08} y={14} className="mt-8 sm:mt-9">
          <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:gap-6">
            <Button href={sitePrimaryCta.href} size="lg" className="w-full sm:w-auto">
              {sitePrimaryCta.label}
            </Button>
            <Link
              href={siteSecondaryCta.href}
              className="group inline-flex items-center justify-center gap-1.5 rounded-ds-md text-base font-semibold text-ds-foreground underline-offset-4 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ds-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-ds-background"
            >
              {siteSecondaryCta.label}
              <span className="transition-transform duration-200 ease-out group-hover:translate-x-0.5">
                <ArrowRightIcon />
              </span>
            </Link>
          </div>
        </Stagger>

        <Stagger trigger="load" delay={0.5} stagger={0.06} y={12} className="mt-10">
          <div className="flex flex-wrap items-center gap-3">
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

      <div className="lg:col-span-6">
        <Stagger
          trigger="load"
          delay={0.2}
          stagger={0.08}
          y={14}
          select="[data-hero-tile]"
          className="mx-auto w-full lg:mr-0 lg:ml-auto"
        >
          <HeroCollage />
        </Stagger>
      </div>
    </div>
  </section>
);
