import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Navbar, SiteFooter } from '@/components/common';
import { ResourcePortableText } from '@/components/resources/ResourcePortableText';
import { formatResourceDate, RESOURCE_CATEGORY_LABELS } from '@/data/resource-categories';
import { sanityFetch } from '@/sanity/client';
import { RESOURCE_BY_SLUG_QUERY, RESOURCE_SLUGS_QUERY } from '@/sanity/queries';
import type { ResourceDetail } from '@/sanity/types';

type ResourcePageProps = {
  params: Promise<{ slug: string }>;
};

/**
 * Builds static params for published resource slugs.
 * @returns Slug params for resource detail routes.
 */
export const generateStaticParams = async () => {
  const resources = await sanityFetch<{ slug: string }[]>({
    query: RESOURCE_SLUGS_QUERY,
    revalidate: false,
    tags: ['resource'],
  });

  return resources.map((resource) => ({ slug: resource.slug }));
};

/**
 * Resource detail metadata from Sanity.
 * @param props Route params promise.
 * @returns Page metadata.
 */
export const generateMetadata = async (props: ResourcePageProps): Promise<Metadata> => {
  const { slug } = await props.params;
  const resource = await sanityFetch<ResourceDetail | null>({
    query: RESOURCE_BY_SLUG_QUERY,
    params: { slug },
    tags: [`resource:${slug}`, 'resource'],
  });

  if (!resource) {
    return { title: 'Resource | Loople' };
  }

  return {
    title: `${resource.title} | Loople`,
    description: resource.excerpt,
  };
};

/**
 * Resource detail page fetched from Sanity.
 * @param props Route params promise.
 * @returns Resource article page.
 */
export default async function ResourcePage(props: ResourcePageProps) {
  const { slug } = await props.params;
  const resource = await sanityFetch<ResourceDetail | null>({
    query: RESOURCE_BY_SLUG_QUERY,
    params: { slug },
    tags: [`resource:${slug}`, 'resource'],
  });

  if (!resource) {
    notFound();
  }

  return (
    <div className="bg-ds-background text-ds-foreground">
      <Navbar />

      <main className="mx-auto w-full max-w-3xl px-6 py-16 sm:py-24">
        <Link
          href="/resources"
          className="text-sm font-medium text-ds-muted-foreground transition-colors outline-none hover:text-ds-brand focus-visible:ring-2 focus-visible:ring-ds-brand/40 focus-visible:ring-offset-2 focus-visible:ring-offset-ds-background"
        >
          ← Resources
        </Link>

        <div className="mt-8 flex flex-wrap items-center gap-2 text-xs font-semibold tracking-wide text-ds-muted-foreground uppercase">
          <span>{RESOURCE_CATEGORY_LABELS[resource.category] ?? resource.category}</span>
          {resource.publishedAt ? (
            <>
              <span aria-hidden="true">·</span>
              <time dateTime={resource.publishedAt}>
                {formatResourceDate(resource.publishedAt)}
              </time>
            </>
          ) : null}
          {resource.authorName ? (
            <>
              <span aria-hidden="true">·</span>
              <span className="tracking-normal normal-case">{resource.authorName}</span>
            </>
          ) : null}
        </div>

        <h1 className="mt-4 text-4xl font-bold tracking-tight text-balance sm:text-5xl">
          {resource.title}
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-ds-muted-foreground">{resource.excerpt}</p>

        <div className="mt-12 border-t border-ds-border pt-10">
          <ResourcePortableText value={resource.body} />
        </div>

        {resource.relatedFeatures && resource.relatedFeatures.length > 0 ? (
          <aside className="mt-16 rounded-ds-lg border border-ds-border bg-ds-card p-6">
            <h2 className="text-sm font-semibold tracking-wide text-ds-muted-foreground uppercase">
              Related features
            </h2>
            <ul className="mt-4 space-y-2">
              {resource.relatedFeatures.map((feature) => (
                <li key={feature.slug}>
                  <Link
                    href={`/features/${feature.slug}`}
                    className="text-base font-medium text-ds-foreground transition-colors outline-none hover:text-ds-brand focus-visible:ring-2 focus-visible:ring-ds-brand/40 focus-visible:ring-offset-2 focus-visible:ring-offset-ds-background"
                  >
                    {feature.name}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        ) : null}
      </main>

      <SiteFooter />
    </div>
  );
}
