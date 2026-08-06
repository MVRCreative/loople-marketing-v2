/**
 * Navbar — logo, Platform mega menu / Communities / Pricing / Resources,
 * Sign in text link, Get started CTA, theme toggle, and mobile disclosure.
 *
 * On the homepage (`overlayHero`), the bar sits fixed over the hero:
 * transparent with the white mark while the hero is in view, then
 * transitions to the solid glass treatment as features scroll up.
 */

'use client';

import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/common/Button';
import { MobileNav } from '@/components/common/MobileNav';
import { PlatformMenuPanel } from '@/components/common/PlatformMenu';
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

const navPillClasses = (options: { transparent: boolean; active: boolean }) =>
  cn(
    'inline-flex h-9 items-center rounded-ds-full px-2.5 text-sm font-medium whitespace-nowrap transition-colors duration-500 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 sm:px-3.5',
    options.transparent
      ? cn(
          'focus-visible:ring-white/50 focus-visible:ring-offset-transparent',
          options.active
            ? 'bg-white/15 text-white'
            : 'text-white/80 hover:bg-white/10 hover:text-white',
        )
      : cn(
          'focus-visible:ring-ds-primary/40 focus-visible:ring-offset-ds-background',
          options.active
            ? 'bg-ds-foreground text-ds-background'
            : 'text-ds-muted-foreground hover:bg-ds-muted hover:text-ds-foreground',
        ),
  );

/**
 * Global marketing navbar with Platform mega menu and mobile panel.
 * @param props Optional link override, className, and hero overlay mode.
 * @returns Site header navigation.
 */
export const Navbar = (props: NavbarProps) => {
  const links = props.links ?? siteNavLinks;
  const pathname = usePathname();
  const overlayHero = Boolean(props.overlayHero);
  /** True while the hero still occupies the top of the viewport. */
  const [overHero, setOverHero] = useState(overlayHero);

  useEffect(() => {
    let observer: IntersectionObserver | undefined;

    if (overlayHero) {
      const hero = document.querySelector('#home-hero');
      if (hero instanceof Element) {
        observer = new IntersectionObserver(
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
      }
    }

    return () => {
      observer?.disconnect();
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
        className="relative mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3.5 sm:gap-6"
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
          <NavigationMenu.Root className="relative z-30 hidden md:block">
            <NavigationMenu.List className="flex items-center gap-0.5">
              {links.map((item) => {
                const active = isActive(pathname, item.href);

                if (item.hasMenu && item.id === 'platform') {
                  return (
                    <NavigationMenu.Item key={item.id} data-nav-item={item.id} className="relative">
                      <NavigationMenu.Trigger
                        className={cn(
                          navPillClasses({ transparent, active }),
                          'group gap-1 data-[state=open]:bg-ds-muted data-[state=open]:text-ds-foreground',
                          transparent &&
                            'data-[state=open]:bg-white/15 data-[state=open]:text-white',
                        )}
                      >
                        {item.label}
                        <span
                          aria-hidden="true"
                          className="text-[10px] transition-transform duration-200 group-data-[state=open]:rotate-180"
                        >
                          ▾
                        </span>
                      </NavigationMenu.Trigger>
                      <NavigationMenu.Content className="absolute top-full left-0 z-40 mt-3 w-[min(36rem,calc(100vw-3rem))] origin-top rounded-ds-lg border border-ds-border/60 bg-ds-background p-6 shadow-ds-md motion-safe:animate-[platform-menu-in_200ms_ease-out] motion-reduce:animate-none">
                        <PlatformMenuPanel />
                      </NavigationMenu.Content>
                    </NavigationMenu.Item>
                  );
                }

                return (
                  <NavigationMenu.Item key={item.id} data-nav-item={item.id}>
                    <NavigationMenu.Link asChild active={active}>
                      <Link
                        href={item.href}
                        aria-current={active ? 'page' : undefined}
                        className={navPillClasses({ transparent, active })}
                      >
                        {item.label}
                      </Link>
                    </NavigationMenu.Link>
                  </NavigationMenu.Item>
                );
              })}
            </NavigationMenu.List>
          </NavigationMenu.Root>

          <div className="hidden shrink-0 items-center gap-1 sm:gap-2 md:flex">
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
          </div>

          <ThemeToggle
            className={cn(
              transparent &&
                'text-white/85 hover:bg-white/10 hover:text-white focus-visible:ring-white/50 focus-visible:ring-offset-transparent',
            )}
          />

          <MobileNav transparent={transparent} links={links} />
        </div>
      </nav>
    </header>
  );
};
