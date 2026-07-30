/**
 * Navbar — logo, Platform / Communities / Pricing / Resources,
 * Sign in text link, Get started CTA, and theme toggle.
 *
 * On the homepage (`overlayHero`), the bar sits fixed over the hero:
 * transparent with the white mark while the hero is in view, then
 * transitions to the solid glass treatment as features scroll up.
 * Platform and Communities are marked `hasMenu` for a future mega menu.
 */

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/common/Button';
import { ThemeToggle } from '@/components/common/ThemeToggle';
import { siteNavLinks, sitePrimaryCta, siteSignInCta } from '@/data/site-nav';
import type { SiteNavItem } from '@/data/site-nav';
import { cn } from '@/lib/cn';
import { AppConfig } from '@/utils/AppConfig';

export type NavLink = SiteNavItem;

export type NavbarProps = {
  links?: readonly NavLink[];
  className?: string;
  /**
   * Homepage only — fix the bar over the hero and swap between
   * transparent (over photography) and solid (over page canvas).
   */
  overlayHero?: boolean;
};

const NAV_HEIGHT_PX = 64;

const isActive = (pathname: string | null, href: string): boolean => {
  if (!pathname || href.includes('#')) {
    return false;
  }
  if (href === '/') {
    return pathname === '/';
  }
  return pathname === href || pathname.startsWith(`${href}/`);
};

export const Navbar = (props: NavbarProps) => {
  const links = props.links ?? siteNavLinks;
  const pathname = usePathname();
  const overlayHero = Boolean(props.overlayHero);
  /** True while the hero still occupies the top of the viewport. */
  const [overHero, setOverHero] = useState(overlayHero);

  useEffect(() => {
    if (!overlayHero) {
      return;
    }

    const hero = document.querySelector('#home-hero');
    if (!(hero instanceof Element)) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!entry) {
          return;
        }
        setOverHero(entry.isIntersecting);
      },
      {
        // Flip once the hero clears the sticky nav band.
        root: null,
        rootMargin: `-${NAV_HEIGHT_PX}px 0px 0px 0px`,
        threshold: 0,
      },
    );

    observer.observe(hero);
    return () => {
      observer.disconnect();
    };
  }, [overlayHero]);

  const transparent = overlayHero && overHero;

  return (
    <header
      data-nav-overlay={transparent ? 'true' : 'false'}
      className={cn(
        'z-20 transition-[background-color,border-color,backdrop-filter,box-shadow] duration-500 ease-out',
        overlayHero ? 'fixed inset-x-0 top-0' : 'sticky top-0',
        transparent
          ? 'border-b border-transparent bg-transparent'
          : 'border-b border-ds-border/60 bg-ds-background/80 shadow-ds-xs backdrop-blur',
        props.className,
      )}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3.5 sm:gap-6"
      >
        <Link
          href="/"
          aria-label={`${AppConfig.name} home`}
          className={cn(
            'flex shrink-0 items-center gap-2.5 rounded-ds-md outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
            transparent
              ? 'focus-visible:ring-white/50 focus-visible:ring-offset-transparent'
              : 'focus-visible:ring-ds-primary/40 focus-visible:ring-offset-ds-background',
          )}
        >
          <span className="relative size-9 shrink-0">
            <Image
              src="/assets/images/loople-mark.png"
              alt=""
              width={36}
              height={36}
              priority
              className={cn(
                'absolute inset-0 size-9 rounded-ds-md transition-opacity duration-500',
                transparent ? 'opacity-0' : 'opacity-100',
              )}
            />
            <Image
              src="/assets/images/loople-mark-white.png"
              alt=""
              width={36}
              height={36}
              priority
              className={cn(
                'absolute inset-0 size-9 transition-opacity duration-500',
                transparent ? 'opacity-100' : 'opacity-0',
              )}
            />
          </span>
          <span
            className={cn(
              'text-sm font-semibold tracking-tight transition-colors duration-500',
              transparent ? 'text-white' : 'text-ds-foreground',
            )}
          >
            {AppConfig.name}
          </span>
        </Link>

        <div className="flex min-w-0 items-center gap-1 sm:gap-2">
          <ul className="flex [scrollbar-width:none] items-center gap-0.5 overflow-x-auto [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {links.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.id} data-nav-item={item.id}>
                  <Link
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'inline-flex h-9 items-center rounded-ds-full px-2.5 text-sm font-medium whitespace-nowrap transition-colors duration-500 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 sm:px-3.5',
                      transparent
                        ? cn(
                            'focus-visible:ring-white/50 focus-visible:ring-offset-transparent',
                            active
                              ? 'bg-white/15 text-white'
                              : 'text-white/80 hover:bg-white/10 hover:text-white',
                          )
                        : cn(
                            'focus-visible:ring-ds-primary/40 focus-visible:ring-offset-ds-background',
                            active
                              ? 'bg-ds-foreground text-ds-background'
                              : 'text-ds-muted-foreground hover:bg-ds-muted hover:text-ds-foreground',
                          ),
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex shrink-0 items-center gap-1 sm:gap-2">
            <Link
              href={siteSignInCta.href}
              className={cn(
                'inline-flex h-9 items-center rounded-ds-full px-2.5 text-sm font-medium whitespace-nowrap transition-colors duration-500 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 sm:px-3',
                transparent
                  ? 'text-white/80 hover:text-white focus-visible:ring-white/50 focus-visible:ring-offset-transparent'
                  : 'text-ds-muted-foreground hover:text-ds-foreground focus-visible:ring-ds-primary/40 focus-visible:ring-offset-ds-background',
              )}
            >
              {siteSignInCta.label}
            </Link>

            <Button
              href={sitePrimaryCta.href}
              size="sm"
              className={cn(
                transparent &&
                  'bg-white text-ds-foreground hover:bg-white/95 focus-visible:ring-white/50 focus-visible:ring-offset-transparent',
              )}
            >
              {sitePrimaryCta.label}
            </Button>

            <ThemeToggle
              className={cn(
                transparent &&
                  'text-white/85 hover:bg-white/10 hover:text-white focus-visible:ring-white/50 focus-visible:ring-offset-transparent',
              )}
            />
          </div>
        </div>
      </nav>
    </header>
  );
};
