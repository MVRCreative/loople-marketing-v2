/**
 * Shared marketing site navigation and footer link data.
 */

import type { PersonaGroupId } from '@/data/features';
import {
  getFeaturesByPersonaGroup,
  getMenuPresentation,
  listFeatures,
  PERSONA_GROUPS,
} from '@/data/features';

export type SiteLink = {
  href: string;
  label: string;
};

/**
 * Primary nav item. `hasMenu` marks Platform as a mega-menu trigger.
 */
export type SiteNavItem = SiteLink & {
  id: 'platform' | 'communities' | 'pricing' | 'resources';
  hasMenu?: boolean;
};

type PlatformMenuLink = SiteLink & {
  description: string;
};

type PlatformMenuGroup = {
  id: PersonaGroupId;
  title: string;
  links: readonly PlatformMenuLink[];
};

export type PlatformMenu = {
  groups: readonly PlatformMenuGroup[];
  viewAll: SiteLink;
};

export const siteNavLinks: readonly SiteNavItem[] = [
  {
    id: 'platform',
    label: 'Platform',
    href: '/features',
    hasMenu: true,
  },
  {
    id: 'communities',
    label: 'Communities',
    href: '/communities',
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

/**
 * Platform mega menu — persona groups derived from Feature entities.
 */
export const platformMenu: PlatformMenu = {
  groups: PERSONA_GROUPS.map((group) => ({
    id: group.id,
    title: group.title,
    links: getFeaturesByPersonaGroup(group.id).map((feature) => ({
      href: `/features/${feature.id}`,
      label: feature.name,
      description: getMenuPresentation(feature.id)?.blurb ?? feature.description,
    })),
  })),
  viewAll: {
    href: '/features',
    label: 'View all features',
  },
};

/** Loople app origin — auth CTAs point at the real product, not marketing stubs. */
const appBaseUrl = 'https://www.loople.app';

/** Text link — account access. */
export const siteSignInCta: SiteLink = {
  href: `${appBaseUrl}/login`,
  label: 'Sign in',
};

/** Primary call to action — navbar and hero. */
export const sitePrimaryCta: SiteLink = {
  href: `${appBaseUrl}/signup`,
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

const topFeatureLinks: readonly SiteLink[] = listFeatures()
  .slice(0, 4)
  .map((feature) => ({
    href: `/features/${feature.id}`,
    label: feature.name,
  }));

export const footerLinkGroups: readonly FooterLinkGroup[] = [
  {
    title: 'Product',
    links: [
      { href: '/features', label: 'Platform' },
      ...topFeatureLinks,
      { href: '/communities', label: 'Communities' },
      { href: '/pricing', label: 'Pricing' },
      { href: `${appBaseUrl}/signup`, label: 'Get started' },
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
