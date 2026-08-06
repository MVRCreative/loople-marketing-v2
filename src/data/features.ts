/**
 * Content-graph Feature layer — Sanity-schema-shaped entities and
 * presentation contexts. Components consume getters only; these become
 * GROQ queries when Sanity is wired.
 *
 * Layers reserved (typed, unused by UI yet): Concepts, Audiences, Content.
 */

export type PersonaGroupId = 'organizers' | 'members';

export type FeatureEyebrowTone = 'brand' | 'coral' | 'amber' | 'emerald' | 'violet';

export type FeatureSubFeature = {
  id: string;
  title: string;
  description: string;
  mediaLabel: string;
  mediaAspect: `${number} / ${number}`;
  /** Puts the media above the title and description instead of below them. */
  mediaFirst?: boolean;
};

/** Reusable Feature entity — what Loople does. */
export type Feature = {
  id: string;
  name: string;
  personaGroup: PersonaGroupId;
  /** Short description shared across surfaces. */
  description: string;
  mediaLabel: string;
  mediaAspect: `${number} / ${number}`;
  videoSrc?: string;
  subFeatures?: readonly FeatureSubFeature[];
  /** Related Feature ids for cross-links. Empty → same-persona siblings. */
  relatedFeatureIds: readonly string[];
  /** Future Concept references (content graph). */
  conceptIds: readonly string[];
  /** Future Audience references (content graph). */
  audienceIds: readonly string[];
};

/** Homepage scroll-spy panel presentation for a Feature. */
export type FeatureHomepagePresentation = {
  featureId: string;
  eyebrowTone: FeatureEyebrowTone;
  headline: string;
  ctaLabel: string;
};

/** Mega-menu one-liner for a Feature. */
export type FeatureMenuPresentation = {
  featureId: string;
  blurb: string;
};

/** Feature detail page presentation. */
export type FeatureDetailPresentation = {
  featureId: string;
  headline: string;
  description: string;
};

/** Composed homepage panel — Feature entity + homepage presentation. */
export type FeatureHomepagePanel = {
  id: string;
  label: string;
  personaGroup: PersonaGroupId;
  eyebrowTone: FeatureEyebrowTone;
  headline: string;
  description: string;
  mediaLabel: string;
  mediaAspect: `${number} / ${number}`;
  videoSrc?: string;
  subFeatures?: readonly FeatureSubFeature[];
  cta: {
    label: string;
    href: string;
  };
};

export type PersonaGroup = {
  id: PersonaGroupId;
  title: string;
};

export const PERSONA_GROUPS: readonly PersonaGroup[] = [
  { id: 'organizers', title: 'Run your community' },
  { id: 'members', title: 'For members & families' },
] as const;

export const FEATURE_INDEX_TAG = 'Platform';

export const FEATURE_INDEX_INTRO = {
  headline: 'The system that keeps the whole community moving.',
  description:
    'Bring registration, communication, schedules, payments, family accounts, and operations together—so everyone knows what is happening and what comes next.',
} as const;

const mediaAspect = '758 / 633' as const;
const subMediaAspect = '1 / 1' as const;
const subFormAspect = '4 / 5' as const;

const features: readonly Feature[] = [
  {
    id: 'community-management',
    name: 'Community Management',
    personaGroup: 'organizers',
    description:
      'Manage members, roles, programs, payments, and everyday operations from one connected system.',
    mediaLabel: 'Community Management',
    mediaAspect,
    videoSrc: '/assets/videos/test-video.mp4',
    relatedFeatureIds: ['online-registration', 'broadcasts', 'programs-events'],
    conceptIds: [],
    audienceIds: [],
    subFeatures: [
      {
        id: 'roles-access',
        title: 'Give the right people the right access.',
        description:
          "Assign roles so coaches, admins, and volunteers see only what they need—and nothing they don't.",
        mediaLabel: 'Roles & access',
        mediaAspect: subMediaAspect,
      },
      {
        id: 'member-directory',
        title: 'Keep every member easy to find.',
        description:
          'Profiles, family connections, and program enrollments stay organized in one directory.',
        mediaLabel: 'Member directory',
        mediaAspect: subMediaAspect,
      },
    ],
  },
  {
    id: 'online-registration',
    name: 'Online Registration',
    personaGroup: 'organizers',
    description:
      'Create programs, collect family information, accept waivers, and take payment through one guided flow.',
    mediaLabel: 'Online Registration',
    mediaAspect,
    relatedFeatureIds: ['family-accounts', 'programs-events', 'community-management'],
    conceptIds: [],
    audienceIds: [],
    subFeatures: [
      {
        id: 'program-setup',
        title: 'Set up a program once.',
        description:
          'Name it, set the schedule, price, and waiver, then publish it for families to find.',
        mediaLabel: 'Program setup',
        mediaAspect: subFormAspect,
        mediaFirst: true,
      },
      {
        id: 'family-checkout',
        title: 'Let families register in minutes.',
        description:
          'Parents choose who is playing, agree to the waiver, and pay without leaving the page.',
        mediaLabel: 'Family checkout',
        mediaAspect: subFormAspect,
        mediaFirst: true,
      },
    ],
  },
  {
    id: 'centralized-newsfeed',
    name: 'Centralized Newsfeed',
    personaGroup: 'members',
    description:
      'Members can see announcements, activity, events, and community updates without digging through texts, inboxes, and scattered apps.',
    mediaLabel: 'Centralized Newsfeed',
    mediaAspect,
    relatedFeatureIds: ['broadcasts', 'family-accounts', 'mobile-apps'],
    conceptIds: [],
    audienceIds: [],
  },
  {
    id: 'broadcasts',
    name: 'Broadcasts',
    personaGroup: 'organizers',
    description:
      'Send important updates to the entire community or target specific programs, teams, roles, and groups.',
    mediaLabel: 'Broadcasts',
    mediaAspect,
    videoSrc: '/assets/videos/broadcasts.mp4',
    relatedFeatureIds: ['centralized-newsfeed', 'community-management', 'programs-events'],
    conceptIds: [],
    audienceIds: [],
  },
  {
    id: 'family-accounts',
    name: 'Family Accounts',
    personaGroup: 'members',
    description:
      'Parents can manage children, registrations, schedules, payments, and community activity without juggling separate profiles.',
    mediaLabel: 'Family Accounts',
    mediaAspect,
    videoSrc: '/assets/videos/family-accounts.mp4',
    relatedFeatureIds: ['online-registration', 'mobile-apps', 'centralized-newsfeed'],
    conceptIds: [],
    audienceIds: [],
  },
  {
    id: 'programs-events',
    name: 'Programs & Events',
    personaGroup: 'organizers',
    description:
      'Publish programs and events with schedules, locations, registration, RSVPs, payments, and updates attached.',
    mediaLabel: 'Programs & Events',
    mediaAspect,
    relatedFeatureIds: ['online-registration', 'broadcasts', 'community-management'],
    conceptIds: [],
    audienceIds: [],
  },
  {
    id: 'mobile-apps',
    name: 'Mobile Apps',
    personaGroup: 'members',
    description:
      'Members and organizers get schedules, updates, registration, and payments on iOS and Android—wherever the day takes them.',
    mediaLabel: 'Mobile Apps',
    mediaAspect,
    relatedFeatureIds: ['family-accounts', 'centralized-newsfeed', 'broadcasts'],
    conceptIds: [],
    audienceIds: [],
  },
  {
    id: 'app-marketplace',
    name: 'App Marketplace',
    personaGroup: 'organizers',
    description:
      'Extend Loople with tools for check-in, reservations, brackets, meet management, matchmaking, websites, and more.',
    mediaLabel: 'App Marketplace',
    mediaAspect,
    relatedFeatureIds: ['community-management', 'programs-events'],
    conceptIds: [],
    audienceIds: [],
  },
];

const homepagePresentations: readonly FeatureHomepagePresentation[] = [
  {
    featureId: 'community-management',
    eyebrowTone: 'brand',
    headline: 'Run the community without turning it into a second job.',
    ctaLabel: 'Explore community management',
  },
  {
    featureId: 'online-registration',
    eyebrowTone: 'coral',
    headline: 'Turn interest into registration without the paperwork chase.',
    ctaLabel: 'See registration workflows',
  },
  {
    featureId: 'centralized-newsfeed',
    eyebrowTone: 'amber',
    headline: 'Give every update one reliable place to live.',
    ctaLabel: 'Explore the newsfeed',
  },
  {
    featureId: 'broadcasts',
    eyebrowTone: 'emerald',
    headline: 'Reach the right people without messaging everyone.',
    ctaLabel: 'How broadcasts work',
  },
  {
    featureId: 'family-accounts',
    eyebrowTone: 'violet',
    headline: 'Keep the whole family organized from one account.',
    ctaLabel: 'See family accounts',
  },
  {
    featureId: 'programs-events',
    eyebrowTone: 'brand',
    headline: 'Make it obvious what is happening and what people need to do.',
    ctaLabel: 'Explore programs & events',
  },
  {
    featureId: 'mobile-apps',
    eyebrowTone: 'coral',
    headline: 'Carry the community in your pocket.',
    ctaLabel: 'See the mobile apps',
  },
  {
    featureId: 'app-marketplace',
    eyebrowTone: 'amber',
    headline: 'Add what your community needs without rebuilding your entire system.',
    ctaLabel: 'Browse the app marketplace',
  },
];

const menuPresentations: readonly FeatureMenuPresentation[] = [
  {
    featureId: 'community-management',
    blurb: 'Members, roles, and operations in one place.',
  },
  {
    featureId: 'online-registration',
    blurb: 'Programs, waivers, and payments in one flow.',
  },
  {
    featureId: 'centralized-newsfeed',
    blurb: 'Every update in one reliable feed.',
  },
  {
    featureId: 'broadcasts',
    blurb: 'Reach the right people, not everyone.',
  },
  {
    featureId: 'family-accounts',
    blurb: 'Kids, schedules, and payments together.',
  },
  {
    featureId: 'programs-events',
    blurb: 'Schedules, RSVPs, and registration attached.',
  },
  {
    featureId: 'mobile-apps',
    blurb: 'The community on iOS and Android.',
  },
  {
    featureId: 'app-marketplace',
    blurb: 'Add check-in, brackets, and more.',
  },
];

const detailPresentations: readonly FeatureDetailPresentation[] = homepagePresentations.map(
  (panel) => {
    const feature = features.find((item) => item.id === panel.featureId);
    return {
      featureId: panel.featureId,
      headline: panel.headline,
      description: feature?.description ?? '',
    };
  },
);

/** Feature slugs used by `/features/[slug]` routes. */
export const featureSlugs = features.map((item) => item.id);

/**
 * Looks up a Feature entity by route slug.
 * @param slug Feature id / URL segment.
 * @returns Matching Feature, or `undefined` when unknown.
 */
export const getFeatureBySlug = (slug: string): Feature | undefined =>
  features.find((item) => item.id === slug);

/**
 * Returns Features in a persona group, in canonical order.
 * @param group Persona group id.
 * @returns Matching Features.
 */
export const getFeaturesByPersonaGroup = (group: PersonaGroupId): readonly Feature[] =>
  features.filter((item) => item.personaGroup === group);

/**
 * Returns related Features for cross-links. Falls back to same-persona siblings.
 * @param slug Feature id / URL segment.
 * @param limit Max related features to return.
 * @returns Related Feature entities.
 */
export const getRelatedFeatures = (slug: string, limit = 3): readonly Feature[] => {
  const feature = getFeatureBySlug(slug);
  if (!feature) {
    return [];
  }

  const fromIds = feature.relatedFeatureIds
    .map((id) => getFeatureBySlug(id))
    .filter((item): item is Feature => item !== undefined);

  if (fromIds.length > 0) {
    return fromIds.slice(0, limit);
  }

  return getFeaturesByPersonaGroup(feature.personaGroup)
    .filter((item) => item.id !== slug)
    .slice(0, limit);
};

/**
 * Looks up homepage presentation for a Feature.
 * @param featureId Feature id.
 * @returns Homepage presentation, or `undefined`.
 */
export const getHomepagePresentation = (
  featureId: string,
): FeatureHomepagePresentation | undefined =>
  homepagePresentations.find((item) => item.featureId === featureId);

/**
 * Looks up mega-menu blurb for a Feature.
 * @param featureId Feature id.
 * @returns Menu presentation, or `undefined`.
 */
export const getMenuPresentation = (featureId: string): FeatureMenuPresentation | undefined =>
  menuPresentations.find((item) => item.featureId === featureId);

/**
 * Looks up detail-page presentation for a Feature.
 * @param featureId Feature id.
 * @returns Detail presentation, or `undefined`.
 */
export const getDetailPresentation = (featureId: string): FeatureDetailPresentation | undefined =>
  detailPresentations.find((item) => item.featureId === featureId);

/**
 * Composes Feature + homepage presentation for the homepage scroll section.
 * @returns Homepage panels in canonical Feature order.
 */
export const getHomepageFeaturePanels = (): readonly FeatureHomepagePanel[] =>
  features.flatMap((feature) => {
    const presentation = getHomepagePresentation(feature.id);
    if (!presentation) {
      return [];
    }
    return [
      {
        id: feature.id,
        label: feature.name,
        personaGroup: feature.personaGroup,
        eyebrowTone: presentation.eyebrowTone,
        headline: presentation.headline,
        description: feature.description,
        mediaLabel: feature.mediaLabel,
        mediaAspect: feature.mediaAspect,
        ...(feature.videoSrc ? { videoSrc: feature.videoSrc } : {}),
        ...(feature.subFeatures ? { subFeatures: feature.subFeatures } : {}),
        cta: {
          label: presentation.ctaLabel,
          href: `/features/${feature.id}`,
        },
      },
    ];
  });

/**
 * Returns all Features in canonical order.
 * @returns Feature entities.
 */
export const listFeatures = (): readonly Feature[] => features;
