/**
 * Site footer — multi-column marketing links, brand mark, and theme toggle.
 */

import Image from 'next/image';
import Link from 'next/link';
import { ThemeToggle } from '@/components/common/ThemeToggle';
import { footerLinkGroups } from '@/data/site-nav';
import { AppConfig } from '@/utils/AppConfig';

/**
 * Global marketing footer.
 * @returns Footer with product, company, resources, legal links, and theme toggle.
 */
export const SiteFooter = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ds-border/60 bg-ds-background">
      <div className="mx-auto max-w-6xl px-6 py-14 sm:py-16">
        <div className="flex flex-col gap-12 lg:flex-row lg:justify-between lg:gap-16">
          <div className="max-w-xs">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 rounded-ds-md outline-none focus-visible:ring-2 focus-visible:ring-ds-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-ds-background"
            >
              <Image
                src="/assets/images/loople-mark.png"
                alt=""
                width={36}
                height={36}
                className="size-9 rounded-ds-md"
              />
              <span className="text-sm font-semibold tracking-tight text-ds-foreground">
                {AppConfig.name}
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-ds-muted-foreground">
              The system that keeps the whole community moving.
            </p>
          </div>

          <div className="grid flex-1 grid-cols-2 gap-8 sm:grid-cols-4 sm:gap-10">
            {footerLinkGroups.map((group) => (
              <div key={group.title}>
                <h2 className="text-xs font-semibold tracking-wide text-ds-foreground uppercase">
                  {group.title}
                </h2>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-ds-muted-foreground transition-colors outline-none hover:text-ds-foreground focus-visible:text-ds-foreground focus-visible:ring-2 focus-visible:ring-ds-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-ds-background"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-ds-border/60 pt-8 text-xs text-ds-muted-foreground sm:flex-row sm:items-center">
          <span>
            © {year} {AppConfig.name}
          </span>
          <div className="flex w-full items-center justify-between gap-4 sm:w-auto sm:justify-end">
            <ThemeToggle />
            <span className="tracking-[0.2em]">L-O-O-P-L-E</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
