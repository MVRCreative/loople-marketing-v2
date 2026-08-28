'use client';

/**
 * Clickable on-this-page index for legal documents.
 * Uses fragment links so sections are shareable, and scrolls the target
 * into view so Lenis smooth-scroll does not swallow native hash jumps.
 */

import { cn } from '@/lib/cn';
import type { LegalTocItem } from './types';

const tocLinkClassName =
  'block rounded-ds-sm py-1 text-sm leading-snug text-ds-muted-foreground transition-colors outline-none hover:text-ds-foreground focus-visible:text-ds-foreground focus-visible:ring-2 focus-visible:ring-ds-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-ds-background';

const scrollToSection = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
  const el = document.querySelector(`#${CSS.escape(id)}`);
  if (!(el instanceof HTMLElement)) {
    return;
  }

  event.preventDefault();
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  history.replaceState(null, '', `#${id}`);
};

const TocLinks = (props: { items: readonly LegalTocItem[]; nested?: boolean }) => (
  <ul
    className={cn(
      props.nested ? 'mt-1 ml-3 space-y-0.5 border-l border-ds-border/60 pl-3' : 'space-y-0.5',
    )}
  >
    {props.items.map((item) => (
      <li key={item.id}>
        <a
          href={`#${item.id}`}
          className={tocLinkClassName}
          onClick={(event) => {
            scrollToSection(event, item.id);
          }}
        >
          {item.label}
        </a>
        {item.children ? <TocLinks items={item.children} nested /> : null}
      </li>
    ))}
  </ul>
);

/**
 * Sidebar or mobile on-this-page navigation.
 * @param props TOC items to render.
 * @returns Accessible section index.
 */
export const LegalToc = (props: { items: readonly LegalTocItem[]; showHeading?: boolean }) => (
  <nav aria-label="On this page">
    {props.showHeading === false ? null : (
      <p className="mb-3 text-xs font-semibold tracking-wide text-ds-foreground uppercase">
        On this page
      </p>
    )}
    <TocLinks items={props.items} />
  </nav>
);
