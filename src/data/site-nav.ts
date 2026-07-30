/**
 * Shared marketing site navigation and footer link data.
 */

export type SiteLink = {
  href: string;
  label: string;
};

/**
 * Primary nav item. `hasMenu` marks triggers reserved for a future
 * Platform mega menu or Communities flyout — not implemented yet.
 */
export type SiteNavItem = SiteLink & {
  id: 'platform' | 'communities' | 'pricing' | 'resources';
  hasMenu?: boolean;
};

export const siteNavLinks: readonly SiteNavItem[] = [
  {
    id: 'platform',
    label: 'Platform',
    href: '/#feature-index-heading',
    hasMenu: true,
  },
  {
    id: 'communities',
    label: 'Communities',
    href: '/communities',
    hasMenu: true,
  },
  {
    id: 'pricing',
    label: 'Pricing',
    href: '/pricing',
  },
  {
    id: 'resources',
    label: 'Resources',
    href: '/resources',
  },
] as const;

/** Text link — account access. */
export const siteSignInCta: SiteLink = {
  href: '/sign-in',
  label: 'Sign in',
};

/** Primary call to action — navbar and hero. */
export const sitePrimaryCta: SiteLink = {
  href: '/sign-up',
  label: 'Get started',
};

/** Secondary call to action — hero → platform section. */
export const siteSecondaryCta: SiteLink = {
  href: '/#feature-index-heading',
  label: 'Explore the platform',
};

export type FooterLinkGroup = {
  title: string;
  links: readonly SiteLink[];
};

export const footerLinkGroups: readonly FooterLinkGroup[] = [
  {
    title: 'Product',
    links: [
      { href: '/#feature-index-heading', label: 'Platform' },
      { href: '/communities', label: 'Communities' },
      { href: '/pricing', label: 'Pricing' },
      { href: '/sign-up', label: 'Get started' },
    ],
  },
  {
    title: 'Company',
    links: [
      { href: '/about', label: 'About' },
      { href: '/careers', label: 'Careers' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { href: '/resources', label: 'Resources' },
      { href: '/guides', label: 'Guides' },
      { href: '/support', label: 'Support' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { href: '/privacy', label: 'Privacy' },
      { href: '/terms', label: 'Terms' },
    ],
  },
] as const;
