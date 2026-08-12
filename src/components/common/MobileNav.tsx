/**
 * Mobile navigation panel — hamburger disclosure with Platform accordion
 * and primary nav links / CTAs.
 */

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useId, useState } from 'react';
import { Button } from '@/components/common/Button';
import { PlatformMenuPanel } from '@/components/common/PlatformMenu';
import type { SiteNavItem } from '@/data/site-nav';
import { siteNavLinks, sitePrimaryCta, siteSignInCta } from '@/data/site-nav';
import { cn } from '@/lib/cn';

export type MobileNavProps = {
  transparent?: boolean;
  links?: readonly SiteNavItem[];
};

const isActive = (pathname: string | null, href: string): boolean => {
  if (!pathname || href.includes('#')) {
    return false;
  }
  if (href === '/') {
    return pathname === '/';
  }
  return pathname === href || pathname.startsWith(`${href}/`);
};

/**
 * Mobile nav toggle and slide-down panel.
 * @param props Transparent hero styling and optional link override.
 * @returns Hamburger control + disclosure panel.
 */
export const MobileNav = (props: MobileNavProps) => {
  const links = props.links ?? siteNavLinks;
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [platformOpen, setPlatformOpen] = useState(false);
  const panelId = useId();
  const platformId = useId();
  const transparent = Boolean(props.transparent);

  useEffect(() => {
    setOpen(false);
    setPlatformOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };
    if (open) {
      window.addEventListener('keydown', onKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  useEffect(() => {
    const { body, documentElement } = document;
    const previousBodyOverflow = body.style.overflow;
    const previousHtmlOverflow = documentElement.style.overflow;

    if (open) {
      body.style.overflow = 'hidden';
      documentElement.style.overflow = 'hidden';
    }

    return () => {
      body.style.overflow = previousBodyOverflow;
      documentElement.style.overflow = previousHtmlOverflow;
    };
  }, [open]);

  const close = () => {
    setOpen(false);
  };

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? 'Close menu' : 'Open menu'}
        onClick={() => {
          setOpen((value) => !value);
        }}
        className={cn(
          'inline-flex size-10 shrink-0 items-center justify-center overflow-visible rounded-ds-full transition-colors outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
          transparent
            ? 'text-white hover:bg-white/10 focus-visible:ring-white/50 focus-visible:ring-offset-transparent'
            : 'text-ds-foreground hover:bg-ds-muted focus-visible:ring-ds-primary/40 focus-visible:ring-offset-ds-background',
        )}
      >
        <span className="relative block size-5 overflow-visible" aria-hidden="true">
          <span
            className={cn(
              'absolute top-1/2 left-1/2 h-0.5 w-4 origin-center -translate-x-1/2 rounded-full transition-[transform,opacity] duration-200',
              transparent ? 'bg-white' : 'bg-current',
              open ? '-translate-y-1/2 rotate-45' : '-translate-y-[7px]',
            )}
          />
          <span
            className={cn(
              'absolute top-1/2 left-1/2 h-0.5 w-4 origin-center -translate-x-1/2 -translate-y-1/2 rounded-full transition-opacity duration-200',
              transparent ? 'bg-white' : 'bg-current',
              open && 'opacity-0',
            )}
          />
          <span
            className={cn(
              'absolute top-1/2 left-1/2 h-0.5 w-4 origin-center -translate-x-1/2 rounded-full transition-[transform,opacity] duration-200',
              transparent ? 'bg-white' : 'bg-current',
              open ? '-translate-y-1/2 -rotate-45' : 'translate-y-[5px]',
            )}
          />
        </span>
      </button>

      {open ? (
        <div
          id={panelId}
          className="absolute inset-x-0 top-full max-h-[calc(100dvh-4rem)] overflow-y-auto border-b border-ds-border/60 bg-ds-background shadow-ds-sm"
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-6 py-4">
            {links.map((item) => {
              if (item.hasMenu && item.id === 'platform') {
                return (
                  <div key={item.id} className="border-b border-ds-border/40 pb-2">
                    <button
                      type="button"
                      aria-expanded={platformOpen}
                      aria-controls={platformId}
                      onClick={() => {
                        setPlatformOpen((value) => !value);
                      }}
                      className="flex h-11 w-full items-center justify-between rounded-ds-md px-2.5 text-left text-sm font-medium text-ds-foreground outline-none hover:bg-ds-muted focus-visible:ring-2 focus-visible:ring-ds-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-ds-background"
                    >
                      <span>{item.label}</span>
                      <span
                        aria-hidden="true"
                        className={cn(
                          'text-ds-muted-foreground transition-transform duration-200',
                          platformOpen && 'rotate-180',
                        )}
                      >
                        ▾
                      </span>
                    </button>
                    {platformOpen ? (
                      <div id={platformId} className="px-1 pb-3">
                        <PlatformMenuPanel onNavigate={close} />
                      </div>
                    ) : null}
                  </div>
                );
              }

              const active = isActive(pathname, item.href);
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  onClick={close}
                  className={cn(
                    'flex h-11 items-center rounded-ds-md px-2.5 text-sm font-medium outline-none focus-visible:ring-2 focus-visible:ring-ds-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-ds-background',
                    active
                      ? 'bg-ds-foreground text-ds-background'
                      : 'text-ds-foreground hover:bg-ds-muted',
                  )}
                >
                  {item.label}
                </Link>
              );
            })}

            <div className="mt-3 flex flex-col gap-2 border-t border-ds-border/40 pt-3">
              <Link
                href={siteSignInCta.href}
                onClick={close}
                className="flex h-11 items-center rounded-ds-md px-2.5 text-sm font-medium text-ds-muted-foreground outline-none hover:bg-ds-muted hover:text-ds-foreground focus-visible:ring-2 focus-visible:ring-ds-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-ds-background"
              >
                {siteSignInCta.label}
              </Link>
              <Button href={sitePrimaryCta.href} size="md" onClick={close} className="w-full">
                {sitePrimaryCta.label}
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
