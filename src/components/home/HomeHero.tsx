/**
 * Homepage hero — paginated full-bleed photography with product promise,
 * CTAs, and mobile app store badges. Slides auto-rotate; reduced-motion
 * users get a static first slide with manual pagination.
 */

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button, RevealHeading, RevealLines, Stagger } from '@/components/common';
import { AppStoreBadge } from '@/components/home/AppStoreBadge';
import { GooglePlayBadge } from '@/components/home/GooglePlayBadge';
import { sitePrimaryCta, siteSecondaryCta } from '@/data/site-nav';
import { cn } from '@/lib/cn';

type HeroSlide = {
  id: string;
  src: string;
  alt: string;
  objectPosition: string;
};

const HERO_SLIDES: readonly HeroSlide[] = [
  {
    id: 'pickleball',
    src: '/assets/images/hero-community.jpg',
    alt: 'Friends high-fiving across a pickleball net on a sunny outdoor court',
    objectPosition: 'object-[center_35%]',
  },
  {
    id: 'wrestling',
    src: '/assets/images/hero-wrestling.jpg',
    alt: 'Two wrestlers facing off on a blue mat in a sunlit gymnasium',
    objectPosition: 'object-[center_40%]',
  },
  {
    id: 'sideline',
    src: '/assets/images/hero-sideline.jpg',
    alt: 'A parent smiling at a young player in a blue jersey at an outdoor sports field',
    objectPosition: 'object-[center_45%]',
  },
] as const;

const SLIDE_INTERVAL_MS = 17_000;

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

/**
 * Full-width homepage hero with rotating photography.
 * @returns Edge-to-edge photo hero with product promise, CTAs, and store badges.
 */
export const HomeHero = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (HERO_SLIDES.length < 2) {
      return;
    }

    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (media.matches) {
      return;
    }

    const id = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % HERO_SLIDES.length);
    }, SLIDE_INTERVAL_MS);

    return () => {
      window.clearInterval(id);
    };
  }, []);

  return (
    <section
      id="home-hero"
      aria-labelledby="home-hero-heading"
      aria-roledescription="carousel"
      className="relative isolate min-h-[min(88svh,52rem)] w-full overflow-hidden bg-ds-brand"
    >
      <div className="absolute inset-0">
        {HERO_SLIDES.map((slide, index) => {
          const active = index === activeIndex;
          return (
            <div
              key={slide.id}
              aria-hidden={!active}
              className={cn(
                'absolute inset-0 transition-opacity duration-1000 ease-out',
                active ? 'opacity-100' : 'opacity-0',
              )}
            >
              <Image
                src={slide.src}
                alt={active ? slide.alt : ''}
                fill
                priority={index === 0}
                sizes="100vw"
                className={cn('object-cover', slide.objectPosition)}
              />
            </div>
          );
        })}
      </div>

      <div aria-hidden="true" className="hero-gradient pointer-events-none absolute inset-0" />

      <div className="relative z-10 flex min-h-[min(88svh,52rem)] flex-col justify-end px-6 pt-28 pb-14 sm:px-10 sm:pb-20 lg:px-0 lg:pb-24">
        <div className="mx-auto w-full max-w-6xl lg:px-6">
          <div className="max-w-xl lg:max-w-[34rem]">
            <Stagger trigger="load" stagger={0} y={12}>
              <p className="text-xs font-semibold tracking-[0.16em] text-white/80 uppercase">
                {HERO_COPY.eyebrow}
              </p>
            </Stagger>

            <RevealHeading
              as="h1"
              id="home-hero-heading"
              trigger="load"
              delay={0.08}
              className="mt-4 font-ds-display text-3xl leading-[1.1] font-bold tracking-tight text-balance text-white sm:text-4xl sm:leading-[1.08] lg:text-[2.75rem]"
            >
              {HERO_COPY.headline}
            </RevealHeading>

            <RevealLines
              as="p"
              trigger="load"
              delay={0.22}
              className="mt-5 max-w-md text-base leading-relaxed text-white/85 sm:mt-6 sm:text-lg"
            >
              {HERO_COPY.description}
            </RevealLines>

            <Stagger trigger="load" delay={0.38} stagger={0.08} y={14} className="mt-8 sm:mt-9">
              <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <Button href={sitePrimaryCta.href} size="lg" className="w-full sm:w-auto">
                  {sitePrimaryCta.label}
                </Button>
                <Button
                  href={siteSecondaryCta.href}
                  variant="outline"
                  size="lg"
                  className="w-full border-white/40 bg-white/5 text-white hover:bg-white/15 focus-visible:ring-white/40 focus-visible:ring-offset-ds-brand sm:w-auto"
                >
                  {siteSecondaryCta.label}
                </Button>
              </div>
            </Stagger>

            <Stagger trigger="load" delay={0.5} stagger={0.06} y={12} className="mt-6 sm:mt-7">
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href={STORE_LINKS.appStore}
                  aria-label="Download on the App Store"
                  className="rounded-ds-md transition-opacity outline-none hover:opacity-90 focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-ds-brand"
                >
                  <AppStoreBadge className="h-10 w-auto" />
                </Link>
                <Link
                  href={STORE_LINKS.googlePlay}
                  aria-label="Get it on Google Play"
                  className="rounded-ds-md transition-opacity outline-none hover:opacity-90 focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-ds-brand"
                >
                  <GooglePlayBadge className="h-10 w-auto" />
                </Link>
              </div>
            </Stagger>
          </div>
        </div>
      </div>

      <div className="absolute right-6 bottom-6 z-10 sm:right-10 lg:right-[max(1.5rem,calc((100%-72rem)/2+1.5rem))] lg:bottom-10">
        <nav
          aria-label="Hero images"
          className="flex items-center gap-2 rounded-ds-full bg-black/35 px-2.5 py-2 backdrop-blur-sm"
        >
          {HERO_SLIDES.map((slide, index) => {
            const selected = index === activeIndex;
            return (
              <button
                key={slide.id}
                type="button"
                aria-current={selected ? 'true' : undefined}
                aria-label={`Show image ${index + 1} of ${HERO_SLIDES.length}`}
                onClick={() => {
                  setActiveIndex(index);
                }}
                className={cn(
                  'h-2 rounded-ds-full transition-[width,background-color] duration-300 outline-none focus-visible:ring-2 focus-visible:ring-white/60',
                  selected ? 'w-6 bg-white' : 'w-2 bg-white/45 hover:bg-white/70',
                )}
              />
            );
          })}
        </nav>
      </div>
    </section>
  );
};
