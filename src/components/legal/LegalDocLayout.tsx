/**
 * Standard docs layout for legal pages: sticky left index + article.
 */

import Link from 'next/link';
import { Navbar, SiteFooter } from '@/components/common';
import { cn } from '@/lib/cn';
import { LegalToc } from './LegalToc';
import type { LegalTocItem } from './types';

const legalDocs = [
  { href: '/privacy', label: 'Privacy' },
  { href: '/terms', label: 'Terms' },
] as const;

/**
 * Legal document shell with navbar, on-this-page index, and footer.
 * @param props Document title, effective date, TOC, current path, and body.
 * @returns Docs-style legal page layout.
 */
export const LegalDocLayout = (props: {
  title: string;
  effectiveDate: string;
  toc: readonly LegalTocItem[];
  currentPath: (typeof legalDocs)[number]['href'];
  children: React.ReactNode;
}) => (
  <div className="flex min-h-svh flex-col bg-ds-background text-ds-foreground">
    <Navbar />

    <div className="mx-auto w-full max-w-6xl flex-1 px-6 py-12 sm:py-16">
      <header className="mb-10 max-w-3xl border-b border-ds-border/60 pb-8 lg:mb-12">
        <p className="text-xs font-semibold tracking-wide text-ds-muted-foreground uppercase">
          Legal
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-balance sm:text-5xl">
          {props.title}
        </h1>
        <p className="mt-4 text-sm text-ds-muted-foreground">
          Effective date: {props.effectiveDate}
        </p>
        <nav aria-label="Legal documents" className="mt-6 flex items-center gap-4">
          {legalDocs.map((doc) => {
            const current = doc.href === props.currentPath;
            return (
              <Link
                key={doc.href}
                href={doc.href}
                aria-current={current ? 'page' : undefined}
                className={cn(
                  'text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ds-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-ds-background',
                  current
                    ? 'text-ds-foreground'
                    : 'text-ds-muted-foreground hover:text-ds-foreground',
                )}
              >
                {doc.label}
              </Link>
            );
          })}
        </nav>
      </header>

      <div className="lg:flex lg:items-stretch lg:gap-16">
        <aside className="hidden lg:block lg:w-64 lg:shrink-0">
          <div className="sticky top-24 max-h-[calc(100svh-8rem)] overflow-y-auto pr-2">
            <LegalToc items={props.toc} />
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <details className="sticky top-20 z-10 mb-10 rounded-ds-lg border border-ds-border bg-ds-background px-4 py-3 lg:hidden">
            <summary className="cursor-pointer text-sm font-semibold text-ds-foreground">
              On this page
            </summary>
            <div className="mt-3 border-t border-ds-border/60 pt-3">
              <LegalToc items={props.toc} showHeading={false} />
            </div>
          </details>

          <article className="max-w-3xl">{props.children}</article>
        </div>
      </div>
    </div>

    <SiteFooter />
  </div>
);
