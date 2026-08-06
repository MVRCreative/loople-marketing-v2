/**
 * Feature index — scroll-spy presentation matching the Loople Figma content frame.
 *
 * Desktop: sticky left index + scrolling feature panels on the right.
 * Mobile/tablet: compact sticky horizontal index above stacked panels.
 */

'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { RevealHeading, RevealLines, Stagger } from '@/components/common';
import { FeatureMedia } from '@/components/home/FeatureMedia';
import type { FeatureEyebrowTone, FeatureHomepagePanel, FeatureSubFeature } from '@/data/features';
import { FEATURE_INDEX_INTRO, FEATURE_INDEX_TAG, getHomepageFeaturePanels } from '@/data/features';
import { cn } from '@/lib/cn';

const featureIndexItems = getHomepageFeaturePanels();

const eyebrowToneClasses: Record<FeatureEyebrowTone, string> = {
  brand: 'bg-ds-brand-muted text-ds-brand',
  coral: 'bg-ds-coral-muted text-ds-coral-foreground',
  amber: 'bg-ds-amber-muted text-ds-amber-foreground',
  emerald: 'bg-ds-emerald-muted text-ds-emerald-foreground',
  violet: 'bg-ds-violet-muted text-ds-violet-foreground',
};

const FeatureTag = () => (
  <span className="inline-flex items-center rounded-ds-md bg-ds-brand-muted px-1.5 py-1 text-xs font-semibold text-ds-brand">
    {FEATURE_INDEX_TAG}
  </span>
);

const FeatureEyebrow = (props: { label: string; tone: FeatureEyebrowTone }) => (
  <span
    className={cn(
      'inline-flex items-center rounded-ds-full px-2.5 py-1 text-xs font-semibold',
      eyebrowToneClasses[props.tone],
    )}
  >
    {props.label}
  </span>
);

const scrollToFeature = (id: string) => {
  const el = document.querySelector(`#${CSS.escape(id)}`);
  if (!el) {
    return;
  }
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const FeatureNav = (props: {
  items: readonly FeatureHomepagePanel[];
  activeId: string;
  orientation: 'vertical' | 'horizontal';
}) => (
  <nav
    aria-label="Feature index"
    className={cn(
      props.orientation === 'vertical'
        ? 'flex w-full flex-col gap-[15px]'
        : 'flex gap-4 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
    )}
  >
    {props.items.map((item) => {
      const active = item.id === props.activeId;
      return (
        <button
          key={item.id}
          type="button"
          aria-current={active ? 'true' : undefined}
          onClick={() => {
            scrollToFeature(item.id);
          }}
          className={cn(
            'relative text-left text-base font-medium whitespace-nowrap transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ds-brand/40 focus-visible:ring-offset-2 focus-visible:ring-offset-ds-background',
            props.orientation === 'vertical' && 'w-full',
            props.orientation === 'horizontal' && 'shrink-0',
            active ? 'text-ds-foreground' : 'text-ds-border hover:text-ds-muted-foreground',
          )}
        >
          {props.orientation === 'vertical' ? (
            <span
              aria-hidden="true"
              className={cn(
                'absolute top-0 left-[-45px] h-full w-0.5 -translate-x-1/2 bg-ds-brand transition-opacity duration-200',
                active ? 'opacity-100' : 'opacity-0',
              )}
            />
          ) : (
            <span
              aria-hidden="true"
              className={cn(
                'absolute right-0 -bottom-1 left-0 h-0.5 bg-ds-brand transition-opacity duration-200',
                active ? 'opacity-100' : 'opacity-0',
              )}
            />
          )}
          {item.label}
        </button>
      );
    })}
  </nav>
);

const FeatureSubFeatureCard = (props: { item: FeatureSubFeature }) => (
  <div className="flex flex-col gap-8 px-6 py-10 sm:px-8 sm:py-12 lg:px-10 lg:py-14">
    {/* Reading order stays title-first; `order` only moves the decorative media. */}
    <div className="max-w-md">
      <h4 className="text-xl font-semibold tracking-tight text-ds-foreground sm:text-2xl">
        {props.item.title}
      </h4>
      <p className="mt-3 text-sm leading-relaxed text-ds-muted-foreground sm:text-base">
        {props.item.description}
      </p>
    </div>
    <FeatureMedia
      aspectRatio={props.item.mediaAspect}
      label={props.item.mediaLabel}
      demoId={props.item.id}
      className={cn('w-full rounded-ds-lg', props.item.mediaFirst && 'order-first')}
    />
  </div>
);

const FeatureSubFeatureGrid = (props: { items: readonly FeatureSubFeature[] }) => (
  <div className="grid border-t border-ds-border md:grid-cols-2">
    {props.items.map((item, index) => (
      <div
        key={item.id}
        className={cn(
          'border-ds-border',
          index < props.items.length - 1 && 'border-b md:border-r md:border-b-0',
        )}
      >
        <Stagger trigger="scroll" stagger={0.06} y={18} start="top 90%">
          <FeatureSubFeatureCard item={item} />
        </Stagger>
      </div>
    ))}
  </div>
);

const FeaturePanel = (props: { item: FeatureHomepagePanel }) => {
  const { subFeatures, cta } = props.item;
  const hasVideo = Boolean(props.item.videoSrc);

  return (
    <article
      id={props.item.id}
      aria-labelledby={`${props.item.id}-title`}
      className="scroll-mt-28 border-b border-ds-border last:border-b-0 lg:scroll-mt-32"
    >
      <div className="border-b border-ds-border px-6 py-16 sm:px-10 sm:py-[90px] lg:px-[45px]">
        <div className="max-w-[734px]">
          <Stagger trigger="scroll" stagger={0} y={12} start="top 90%">
            <FeatureEyebrow label={props.item.label} tone={props.item.eyebrowTone} />
          </Stagger>
          <RevealHeading
            as="h3"
            id={`${props.item.id}-title`}
            trigger="scroll"
            delay={0.04}
            className="mt-4 text-xl font-medium tracking-tight text-ds-foreground sm:text-2xl"
          >
            {props.item.headline}
          </RevealHeading>
          <RevealLines
            trigger="scroll"
            delay={0.1}
            className="mt-4 text-base leading-relaxed text-ds-muted-foreground sm:text-lg"
          >
            {props.item.description}
          </RevealLines>
        </div>
      </div>
      <div className={cn(hasVideo ? 'w-full' : 'bg-ds-surface p-6 sm:p-10 lg:p-[45px]')}>
        <Stagger trigger="scroll" stagger={0} y={24} start="top 90%">
          <FeatureMedia
            aspectRatio={props.item.mediaAspect}
            label={props.item.mediaLabel}
            videoSrc={props.item.videoSrc}
            demoId={props.item.id}
            className={hasVideo ? 'w-full' : 'max-w-[759px] rounded-ds-sm'}
          />
        </Stagger>
      </div>
      {subFeatures && subFeatures.length > 0 ? <FeatureSubFeatureGrid items={subFeatures} /> : null}
      <div className="border-t border-ds-border px-6 py-8 sm:px-10 sm:py-10 lg:px-[45px]">
        <Link
          href={cta.href}
          className="group inline-flex items-center gap-2 text-base font-medium text-ds-muted-foreground transition-colors outline-none hover:text-ds-brand focus-visible:ring-2 focus-visible:ring-ds-brand/40 focus-visible:ring-offset-2 focus-visible:ring-offset-ds-background"
        >
          <span>{cta.label}</span>
          <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </Link>
      </div>
    </article>
  );
};

export const FeatureIndex = () => {
  const [activeId, setActiveId] = useState(featureIndexItems[0]?.id ?? '');

  useEffect(() => {
    const nodes = featureIndexItems
      .map((item) => document.querySelector(`#${CSS.escape(item.id)}`))
      .filter((node): node is HTMLElement => node instanceof HTMLElement);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .toSorted((a, b) => b.intersectionRatio - a.intersectionRatio);

        const [top] = visible;
        if (top?.target.id) {
          setActiveId(top.target.id);
        }
      },
      {
        root: null,
        rootMargin: '-20% 0px -55% 0px',
        threshold: [0, 0.15, 0.35, 0.55],
      },
    );

    for (const node of nodes) {
      observer.observe(node);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section aria-labelledby="feature-index-heading" className="bg-ds-background">
      <div className="mx-auto w-full max-w-[1158px] border-x border-ds-border/80">
        <header className="border-b border-ds-border px-6 py-16 sm:px-10 sm:py-[90px] lg:px-[45px]">
          <div className="flex max-w-[734px] flex-col items-start gap-[23px]">
            <Stagger trigger="scroll" stagger={0} y={14} start="top 90%">
              <FeatureTag />
            </Stagger>
            <RevealHeading
              as="h2"
              id="feature-index-heading"
              trigger="scroll"
              className="text-2xl font-medium tracking-tight text-ds-foreground sm:text-[32px]"
            >
              {FEATURE_INDEX_INTRO.headline}
            </RevealHeading>
            <RevealLines
              trigger="scroll"
              delay={0.08}
              className="text-base leading-relaxed text-ds-muted-foreground sm:text-lg"
            >
              {FEATURE_INDEX_INTRO.description}
            </RevealLines>
          </div>
        </header>

        <div className="sticky top-16 z-10 border-b border-ds-border bg-ds-background/95 px-6 py-4 backdrop-blur lg:hidden">
          <FeatureNav items={featureIndexItems} activeId={activeId} orientation="horizontal" />
        </div>

        {/* items-stretch: left rail border runs the full feature-stack height */}
        <div className="lg:flex lg:items-stretch">
          <aside className="relative hidden border-r border-ds-border lg:block lg:w-[319px] lg:shrink-0">
            <div className="sticky top-20 w-full px-[45px] py-[90px]">
              <FeatureNav items={featureIndexItems} activeId={activeId} orientation="vertical" />
            </div>
          </aside>

          <div className="min-w-0 flex-1">
            {featureIndexItems.map((item) => (
              <FeaturePanel key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
