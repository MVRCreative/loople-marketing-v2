/**
 * Platform mega menu panel — two persona-grouped columns of Feature links
 * plus a "View all features" footer. Used inside Radix NavigationMenu.
 */

'use client';

import Link from 'next/link';
import { platformMenu } from '@/data/site-nav';
import { cn } from '@/lib/cn';

export type PlatformMenuPanelProps = {
  /** Called when a link inside the panel is activated (e.g. close mobile). */
  onNavigate?: () => void;
  className?: string;
};

/**
 * Desktop / shared Platform mega-menu content.
 * @param props Optional navigate callback and className.
 * @returns Persona-grouped feature link grid.
 */
export const PlatformMenuPanel = (props: PlatformMenuPanelProps) => (
  <div className={cn('w-full', props.className)}>
    <div className="grid gap-8 sm:grid-cols-2 sm:gap-10">
      {platformMenu.groups.map((group) => (
        <div key={group.id}>
          <h3 className="text-xs font-semibold tracking-wide text-ds-muted-foreground uppercase">
            {group.title}
          </h3>
          <ul className="mt-3 flex flex-col gap-1">
            {group.links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={props.onNavigate}
                  className="group block rounded-ds-md px-2.5 py-2 transition-colors outline-none hover:bg-ds-muted focus-visible:ring-2 focus-visible:ring-ds-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-ds-background"
                >
                  <span className="block text-sm font-medium text-ds-foreground group-hover:text-ds-brand">
                    {link.label}
                  </span>
                  <span className="mt-0.5 block text-xs leading-relaxed text-ds-muted-foreground">
                    {link.description}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    <div className="mt-6 border-t border-ds-border/60 pt-4">
      <Link
        href={platformMenu.viewAll.href}
        onClick={props.onNavigate}
        className="group inline-flex items-center gap-1.5 text-sm font-medium text-ds-muted-foreground transition-colors outline-none hover:text-ds-brand focus-visible:ring-2 focus-visible:ring-ds-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-ds-background"
      >
        <span>{platformMenu.viewAll.label}</span>
        <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
          →
        </span>
      </Link>
    </div>
  </div>
);
