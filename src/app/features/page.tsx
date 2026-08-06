import type { Metadata } from 'next';
import Link from 'next/link';
import { Navbar, RevealHeading, RevealLines, SiteFooter, Stagger } from '@/components/common';
import { FeatureMedia } from '@/components/home/FeatureMedia';
import type { Feature, FeatureEyebrowTone } from '@/data/features';
import {
  FEATURE_INDEX_INTRO,
  FEATURE_INDEX_TAG,
  getFeaturesByPersonaGroup,
  getHomepagePresentation,
  PERSONA_GROUPS,
} from '@/data/features';
import { cn } from '@/lib/cn';

export const metadata: Metadata = {
  title: 'Platform | Loople',
  description: FEATURE_INDEX_INTRO.description,
};

const eyebrowToneClasses: Record<FeatureEyebrowTone, string> = {
  brand: 'bg-ds-brand-muted text-ds-brand',
  coral: 'bg-ds-coral-muted text-ds-coral-foreground',
  amber: 'bg-ds-amber-muted text-ds-amber-foreground',
  emerald: 'bg-ds-emerald-muted text-ds-emerald-foreground',
  violet: 'bg-ds-violet-muted text-ds-violet-foreground',
};

const FeatureCard = (props: { feature: Feature }) => {
  const presentation = getHomepagePresentation(props.feature.id);
  const tone = presentation?.eyebrowTone ?? 'brand';
  const headline = presentation?.headline ?? props.feature.name;
  const hasVideo = Boolean(props.feature.videoSrc);

  return (
    <article className="flex flex-col overflow-hidden rounded-ds-lg border border-ds-border bg-ds-card">
      <div className={cn(hasVideo ? 'w-full' : 'bg-ds-surface p-4')}>
        <FeatureMedia
          aspectRatio={props.feature.mediaAspect}
          label={props.feature.mediaLabel}
          demoId={props.feature.id}
          className={hasVideo ? 'w-full' : 'rounded-ds-sm'}
          {...(props.feature.videoSrc ? { videoSrc: props.feature.videoSrc } : {})}
        />
      </div>
      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <span
          className={cn(
            'inline-flex w-fit items-center rounded-ds-full px-2.5 py-1 text-xs font-semibold',
            eyebrowToneClasses[tone],
          )}
        >
          {props.feature.name}
        </span>
        <h3 className="mt-4 text-xl font-semibold tracking-tight text-ds-foreground">{headline}</h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-ds-muted-foreground sm:text-base">
          {props.feature.description}
        </p>
        <Link
          href={`/features/${props.feature.id}`}
          className="group mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-ds-muted-foreground transition-colors outline-none hover:text-ds-brand focus-visible:ring-2 focus-visible:ring-ds-brand/40 focus-visible:ring-offset-2 focus-visible:ring-offset-ds-background"
        >
          <span>{presentation?.ctaLabel ?? `Explore ${props.feature.name}`}</span>
          <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </Link>
      </div>
    </article>
  );
};

/**
 * Platform features index — persona-grouped Feature cards.
 * @returns Features listing page.
 */
export default function FeaturesPage() {
  return (
    <div className="bg-ds-background text-ds-foreground">
      <Navbar />

      <main>
        <header className="border-b border-ds-border">
          <div className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
            <span className="inline-flex items-center rounded-ds-md bg-ds-brand-muted px-1.5 py-1 text-xs font-semibold text-ds-brand">
              {FEATURE_INDEX_TAG}
            </span>
            <RevealHeading
              as="h1"
              className="mt-5 max-w-3xl text-3xl font-bold tracking-tight text-balance sm:text-5xl"
            >
              {FEATURE_INDEX_INTRO.headline}
            </RevealHeading>
            <RevealLines
              as="p"
              delay={0.12}
              className="mt-6 max-w-2xl text-base leading-relaxed text-ds-muted-foreground sm:text-lg"
            >
              {FEATURE_INDEX_INTRO.description}
            </RevealLines>
          </div>
        </header>

        {PERSONA_GROUPS.map((group) => {
          const features = getFeaturesByPersonaGroup(group.id);
          return (
            <section
              key={group.id}
              aria-labelledby={`persona-${group.id}`}
              className="border-b border-ds-border last:border-b-0"
            >
              <div className="mx-auto max-w-6xl px-6 py-14 sm:py-20">
                <h2
                  id={`persona-${group.id}`}
                  className="text-xs font-semibold tracking-wide text-ds-muted-foreground uppercase"
                >
                  {group.title}
                </h2>
                <Stagger
                  trigger="scroll"
                  stagger={0.06}
                  y={18}
                  start="top 90%"
                  className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                >
                  {features.map((feature) => (
                    <FeatureCard key={feature.id} feature={feature} />
                  ))}
                </Stagger>
              </div>
            </section>
          );
        })}
      </main>

      <SiteFooter />
    </div>
  );
}
