import type { Metadata } from 'next';
import Link from 'next/link';
import { Navbar, RevealHeading, RevealLines, SiteFooter, Stagger } from '@/components/common';
import { formatResourceDate, RESOURCE_CATEGORY_LABELS } from '@/data/resource-categories';
import { sanityFetch } from '@/sanity/client';
import { RESOURCES_QUERY } from '@/sanity/queries';
import type { ResourceListItem } from '@/sanity/types';

export const metadata: Metadata = {
  title: 'Resources | Loople',
  description: 'Guides, tutorials, and resources for running your community on Loople.',
};

/**
 * Resources index — lists published Sanity resources.
 * @returns Resources listing page.
 */
export default async function ResourcesPage() {
  const resources = await sanityFetch<ResourceListItem[]>({
    query: RESOURCES_QUERY,
    tags: ['resource'],
  });

  return (
    <div className="bg-ds-background text-ds-foreground">
      <Navbar />

      <main className="mx-auto w-full max-w-5xl px-6 py-16 sm:py-24">
        <RevealHeading
          as="h1"
          className="text-4xl font-bold tracking-tight text-balance sm:text-5xl"
        >
          Resources
        </RevealHeading>
        <RevealLines
          as="p"
          delay={0.15}
          className="mt-6 max-w-2xl text-base leading-relaxed text-ds-muted-foreground sm:text-lg"
        >
          Guides, tutorials, and updates for running your community on Loople.
        </RevealLines>

        {resources.length === 0 ? (
          <p className="mt-16 text-sm text-ds-muted-foreground">No resources published yet.</p>
        ) : (
          <Stagger className="mt-14 grid gap-6 sm:grid-cols-2" stagger={0.08}>
            {resources.map((resource) => (
              <article
                key={resource._id}
                className="flex flex-col rounded-ds-lg border border-ds-border bg-ds-card p-6 sm:p-8"
              >
                <div className="flex items-center gap-2 text-xs font-semibold tracking-wide text-ds-muted-foreground uppercase">
                  <span>{RESOURCE_CATEGORY_LABELS[resource.category] ?? resource.category}</span>
                  {resource.publishedAt ? (
                    <>
                      <span aria-hidden="true">·</span>
                      <time dateTime={resource.publishedAt}>
                        {formatResourceDate(resource.publishedAt)}
                      </time>
                    </>
                  ) : null}
                </div>
                <h2 className="mt-4 text-xl font-semibold tracking-tight text-ds-foreground">
                  <Link
                    href={`/resources/${resource.slug}`}
                    className="transition-colors outline-none hover:text-ds-brand focus-visible:ring-2 focus-visible:ring-ds-brand/40 focus-visible:ring-offset-2 focus-visible:ring-offset-ds-background"
                  >
                    {resource.title}
                  </Link>
                </h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ds-muted-foreground sm:text-base">
                  {resource.excerpt}
                </p>
                <div className="mt-6 flex items-center justify-between gap-4">
                  {resource.authorName ? (
                    <span className="text-sm text-ds-muted-foreground">{resource.authorName}</span>
                  ) : (
                    <span />
                  )}
                  <Link
                    href={`/resources/${resource.slug}`}
                    className="group inline-flex items-center gap-1.5 text-sm font-medium text-ds-muted-foreground transition-colors outline-none hover:text-ds-brand focus-visible:ring-2 focus-visible:ring-ds-brand/40 focus-visible:ring-offset-2 focus-visible:ring-offset-ds-background"
                  >
                    <span>Read</span>
                    <span
                      aria-hidden="true"
                      className="transition-transform group-hover:translate-x-0.5"
                    >
                      →
                    </span>
                  </Link>
                </div>
              </article>
            ))}
          </Stagger>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
