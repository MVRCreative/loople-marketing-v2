import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Button,
  MediaPlaceholder,
  Navbar,
  RevealHeading,
  RevealLines,
  SiteFooter,
  Stagger,
} from '@/components/common';
import { RelatedContentPlaceholder } from '@/components/features/RelatedContentPlaceholder';
import { FeatureMedia } from '@/components/home/FeatureMedia';
import type { FeatureEyebrowTone, FeatureSubFeature } from '@/data/features';
import {
  featureSlugs,
  getDetailPresentation,
  getFeatureBySlug,
  getHomepagePresentation,
  getRelatedFeatures,
} from '@/data/features';
import { sitePrimaryCta } from '@/data/site-nav';
import { cn } from '@/lib/cn';

type FeaturePageProps = {
  params: Promise<{ slug: string }>;
};

const eyebrowToneClasses: Record<FeatureEyebrowTone, string> = {
  brand: 'bg-ds-brand-muted text-ds-brand',
  coral: 'bg-ds-coral-muted text-ds-coral-foreground',
  amber: 'bg-ds-amber-muted text-ds-amber-foreground',
  emerald: 'bg-ds-emerald-muted text-ds-emerald-foreground',
  violet: 'bg-ds-violet-muted text-ds-violet-foreground',
};

/**
 * Builds static params for every known feature slug.
 * @returns Path params for `/features/[slug]`.
 */
export const generateStaticParams = () => featureSlugs.map((slug) => ({ slug }));

/**
 * Builds metadata for a feature detail page.
 * @param props Route params promise.
 * @returns Page title and description.
 */
export const generateMetadata = async (props: FeaturePageProps): Promise<Metadata> => {
  const { slug } = await props.params;
  const feature = getFeatureBySlug(slug);
  if (!feature) {
    return { title: 'Feature' };
  }
  return {
    title: `${feature.name} | Loople`,
    description: feature.description,
  };
};

const SubFeatureCard = (props: { item: FeatureSubFeature }) => (
  <div className="flex flex-col gap-6 rounded-ds-lg border border-ds-border bg-ds-card p-6 sm:p-8">
    <div className="max-w-md">
      <h3 className="text-lg font-semibold tracking-tight text-ds-foreground sm:text-xl">
        {props.item.title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-ds-muted-foreground">
        {props.item.description}
      </p>
    </div>
    <FeatureMedia
      aspectRatio={props.item.mediaAspect}
      label={props.item.mediaLabel}
      demoId={props.item.id}
      className={cn('w-full rounded-ds-md', props.item.mediaFirst && 'order-first')}
    />
  </div>
);

/**
 * Feature detail page — hero, media, sub-features or placeholder, related
 * features, related-content placeholders, and closing CTA.
 * @param props Route params promise.
 * @returns Feature detail page.
 */
export default async function FeaturePage(props: FeaturePageProps) {
  const { slug } = await props.params;
  const feature = getFeatureBySlug(slug);
  if (!feature) {
    notFound();
  }

  const detail = getDetailPresentation(feature.id);
  const homepage = getHomepagePresentation(feature.id);
  const tone = homepage?.eyebrowTone ?? 'brand';
  const headline = detail?.headline ?? feature.name;
  const description = detail?.description ?? feature.description;
  const related = getRelatedFeatures(feature.id, 3);
  const hasSubFeatures = Boolean(feature.subFeatures && feature.subFeatures.length > 0);
  const hasVideo = Boolean(feature.videoSrc);

  return (
    <div className="bg-ds-background text-ds-foreground">
      <Navbar />

      <main>
        <header className="border-b border-ds-border">
          <div className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
            <span
              className={cn(
                'inline-flex items-center rounded-ds-full px-2.5 py-1 text-xs font-semibold',
                eyebrowToneClasses[tone],
              )}
            >
              {feature.name}
            </span>
            <RevealHeading
              as="h1"
              className="mt-5 max-w-3xl text-3xl font-bold tracking-tight text-balance sm:text-5xl"
            >
              {headline}
            </RevealHeading>
            <RevealLines
              as="p"
              delay={0.12}
              className="mt-6 max-w-2xl text-base leading-relaxed text-ds-muted-foreground sm:text-lg"
            >
              {description}
            </RevealLines>
            <div className="mt-10">
              <Button href={sitePrimaryCta.href} size="md">
                {sitePrimaryCta.label}
              </Button>
            </div>
          </div>
        </header>

        <section aria-label={`${feature.name} media`} className="border-b border-ds-border">
          <div className={cn('mx-auto max-w-6xl', hasVideo ? '' : 'px-6 py-10 sm:py-14')}>
            <div className={cn(hasVideo ? 'w-full' : 'rounded-ds-lg bg-ds-surface p-4 sm:p-6')}>
              <FeatureMedia
                aspectRatio={feature.mediaAspect}
                label={feature.mediaLabel}
                demoId={feature.id}
                className={hasVideo ? 'w-full' : 'rounded-ds-md'}
                {...(feature.videoSrc ? { videoSrc: feature.videoSrc } : {})}
              />
            </div>
          </div>
        </section>

        {hasSubFeatures ? (
          <section aria-labelledby="sub-features-heading" className="border-b border-ds-border">
            <div className="mx-auto max-w-6xl px-6 py-14 sm:py-20">
              <h2
                id="sub-features-heading"
                className="text-2xl font-semibold tracking-tight text-ds-foreground sm:text-3xl"
              >
                How it works
              </h2>
              <Stagger
                trigger="scroll"
                stagger={0.08}
                y={18}
                start="top 90%"
                className="mt-8 grid gap-6 md:grid-cols-2"
              >
                {feature.subFeatures?.map((item) => (
                  <SubFeatureCard key={item.id} item={item} />
                ))}
              </Stagger>
            </div>
          </section>
        ) : (
          <section
            aria-labelledby="detail-placeholder-heading"
            className="border-b border-ds-border"
          >
            <div className="mx-auto max-w-6xl px-6 py-14 sm:py-20">
              <h2
                id="detail-placeholder-heading"
                className="text-2xl font-semibold tracking-tight text-ds-foreground sm:text-3xl"
              >
                Detailed content coming soon
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ds-muted-foreground sm:text-base">
                Deeper walkthroughs, screenshots, and workflows for {feature.name} will land here.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <MediaPlaceholder aspectRatio="4 / 3" label={`${feature.name} detail 1`} />
                <MediaPlaceholder aspectRatio="4 / 3" label={`${feature.name} detail 2`} />
              </div>
            </div>
          </section>
        )}

        {related.length > 0 ? (
          <section aria-labelledby="related-features-heading" className="border-b border-ds-border">
            <div className="mx-auto max-w-6xl px-6 py-14 sm:py-20">
              <h2
                id="related-features-heading"
                className="text-2xl font-semibold tracking-tight text-ds-foreground sm:text-3xl"
              >
                More from the platform
              </h2>
              <ul className="mt-8 grid gap-4 sm:grid-cols-3">
                {related.map((item) => {
                  const relatedHome = getHomepagePresentation(item.id);
                  return (
                    <li key={item.id}>
                      <Link
                        href={`/features/${item.id}`}
                        className="group flex h-full flex-col rounded-ds-lg border border-ds-border bg-ds-card p-6 transition-colors outline-none hover:border-ds-brand/40 focus-visible:ring-2 focus-visible:ring-ds-brand/40 focus-visible:ring-offset-2 focus-visible:ring-offset-ds-background"
                      >
                        <span className="text-sm font-semibold text-ds-foreground group-hover:text-ds-brand">
                          {item.name}
                        </span>
                        <span className="mt-2 text-sm leading-relaxed text-ds-muted-foreground">
                          {relatedHome?.headline ?? item.description}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>
        ) : null}

        <RelatedContentPlaceholder featureName={feature.name} />

        <section className="border-t border-ds-border bg-ds-muted/40">
          <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-6 py-14 sm:flex-row sm:items-center sm:py-16">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-ds-foreground">
                Ready to try {feature.name}?
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
      </main>

      <SiteFooter />
    </div>
  );
}
