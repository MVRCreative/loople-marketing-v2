import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Button, Navbar, RevealHeading, RevealLines, SiteFooter } from '@/components/common';
import { featureSlugs, getFeatureBySlug } from '@/data/feature-index';

type FeaturePageProps = {
  params: Promise<{ slug: string }>;
};

/**
 * Builds static params for every known feature slug.
 * @returns Path params for `/features/[slug]`.
 */
export const generateStaticParams = () => featureSlugs.map((slug) => ({ slug }));

/**
 * Builds metadata for a feature stub page.
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
    title: feature.label,
    description: feature.description,
  };
};

/**
 * Feature detail stub — placeholder until full feature pages are designed.
 * @param props Route params promise.
 * @returns Feature stub page.
 */
export default async function FeaturePage(props: FeaturePageProps) {
  const { slug } = await props.params;
  const feature = getFeatureBySlug(slug);
  if (!feature) {
    notFound();
  }

  return (
    <div className="bg-ds-background text-ds-foreground">
      <Navbar />

      <main className="mx-auto max-w-3xl px-6 py-20 sm:py-28">
        <p className="mb-4 text-xs font-medium tracking-[0.14em] text-ds-muted-foreground uppercase">
          {feature.label}
        </p>
        <RevealHeading
          as="h1"
          className="text-4xl font-bold tracking-tight text-balance sm:text-5xl"
        >
          {feature.headline}
        </RevealHeading>
        <RevealLines
          as="p"
          delay={0.2}
          className="mt-6 max-w-2xl text-base leading-relaxed text-ds-muted-foreground sm:text-lg"
        >
          {feature.description}
        </RevealLines>
        <p className="mt-8 text-sm text-ds-muted-foreground">
          This page is a stub. Full feature content will land here.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Button href="/" variant="outline" size="md">
            Back to home
          </Button>
          <Link
            href="/#feature-index-heading"
            className="text-sm font-medium text-ds-muted-foreground underline-offset-4 transition-colors hover:text-ds-brand hover:underline"
          >
            View all features
          </Link>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
