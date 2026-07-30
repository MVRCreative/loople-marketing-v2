/**
 * Feature-index content for the homepage scroll-spy section.
 *
 * Left rail: literal feature noun.
 * Right side: colored eyebrow + outcome headline + how-it-happens subtext.
 */

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

export type FeatureCta = {
  label: string;
  href: string;
};

export type FeatureIndexItem = {
  id: string;
  /** Literal feature noun shown in the left rail and panel eyebrow. */
  label: string;
  /** Soft accent pill color for the panel eyebrow. */
  eyebrowTone: FeatureEyebrowTone;
  /** Accomplishment / outcome headline on the right. */
  headline: string;
  /** How Loople makes that outcome happen. */
  description: string;
  /** Placeholder label shown on media blocks until production assets land. */
  mediaLabel: string;
  /** Width / height of the Figma media frame (758.5 × 633). */
  mediaAspect: `${number} / ${number}`;
  /** Soft exit to the dedicated feature page. */
  cta: FeatureCta;
  /** Optional public video path — replaces the placeholder when set. */
  videoSrc?: string;
  /** Optional 1:1 sub-feature pair rendered below the primary media. */
  subFeatures?: readonly FeatureSubFeature[];
};

export const FEATURE_INDEX_TAG = 'Platform';

export const FEATURE_INDEX_INTRO = {
  headline: 'The system that keeps the whole community moving.',
  description:
    'Bring registration, communication, schedules, payments, family accounts, and operations together—so everyone knows what is happening and what comes next.',
} as const;

const mediaAspect = '758 / 633' as const;
const subMediaAspect = '1 / 1' as const;
/** Taller frame for sub-feature demos built around a form. */
const subFormAspect = '4 / 5' as const;

export const featureIndexItems: readonly FeatureIndexItem[] = [
  {
    id: 'community-management',
    label: 'Community Management',
    eyebrowTone: 'brand',
    headline: 'Run the community without turning it into a second job.',
    description:
      'Manage members, roles, programs, payments, and everyday operations from one connected system.',
    mediaLabel: 'Community Management',
    mediaAspect,
    videoSrc: '/assets/videos/test-video.mp4',
    cta: {
      label: 'Explore community management',
      href: '/features/community-management',
    },
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
    label: 'Online Registration',
    eyebrowTone: 'coral',
    headline: 'Turn interest into registration without the paperwork chase.',
    description:
      'Create programs, collect family information, accept waivers, and take payment through one guided flow.',
    mediaLabel: 'Online Registration',
    mediaAspect,
    cta: {
      label: 'See registration workflows',
      href: '/features/online-registration',
    },
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
    label: 'Centralized Newsfeed',
    eyebrowTone: 'amber',
    headline: 'Give every update one reliable place to live.',
    description:
      'Members can see announcements, activity, events, and community updates without digging through texts, inboxes, and scattered apps.',
    mediaLabel: 'Centralized Newsfeed',
    mediaAspect,
    cta: {
      label: 'Explore the newsfeed',
      href: '/features/centralized-newsfeed',
    },
  },
  {
    id: 'broadcasts',
    label: 'Broadcasts',
    eyebrowTone: 'emerald',
    headline: 'Reach the right people without messaging everyone.',
    description:
      'Send important updates to the entire community or target specific programs, teams, roles, and groups.',
    mediaLabel: 'Broadcasts',
    mediaAspect,
    videoSrc: '/assets/videos/broadcasts.mp4',
    cta: {
      label: 'How broadcasts work',
      href: '/features/broadcasts',
    },
  },
  {
    id: 'family-accounts',
    label: 'Family Accounts',
    eyebrowTone: 'violet',
    headline: 'Keep the whole family organized from one account.',
    description:
      'Parents can manage children, registrations, schedules, payments, and community activity without juggling separate profiles.',
    mediaLabel: 'Family Accounts',
    mediaAspect,
    videoSrc: '/assets/videos/family-accounts.mp4',
    cta: {
      label: 'See family accounts',
      href: '/features/family-accounts',
    },
  },
  {
    id: 'programs-events',
    label: 'Programs & Events',
    eyebrowTone: 'brand',
    headline: 'Make it obvious what is happening and what people need to do.',
    description:
      'Publish programs and events with schedules, locations, registration, RSVPs, payments, and updates attached.',
    mediaLabel: 'Programs & Events',
    mediaAspect,
    cta: {
      label: 'Explore programs & events',
      href: '/features/programs-events',
    },
  },
  {
    id: 'mobile-apps',
    label: 'Mobile Apps',
    eyebrowTone: 'coral',
    headline: 'Carry the community in your pocket.',
    description:
      'Members and organizers get schedules, updates, registration, and payments on iOS and Android—wherever the day takes them.',
    mediaLabel: 'Mobile Apps',
    mediaAspect,
    cta: {
      label: 'See the mobile apps',
      href: '/features/mobile-apps',
    },
  },
  {
    id: 'app-marketplace',
    label: 'App Marketplace',
    eyebrowTone: 'amber',
    headline: 'Add what your community needs without rebuilding your entire system.',
    description:
      'Extend Loople with tools for check-in, reservations, brackets, meet management, matchmaking, websites, and more.',
    mediaLabel: 'App Marketplace',
    mediaAspect,
    cta: {
      label: 'Browse the app marketplace',
      href: '/features/app-marketplace',
    },
  },
];

/** Feature slugs used by `/features/[slug]` routes. */
export const featureSlugs = featureIndexItems.map((item) => item.id);

/**
 * Looks up a homepage feature by its route slug.
 * @param slug Feature id / URL segment.
 * @returns Matching feature, or `undefined` when the slug is unknown.
 */
export const getFeatureBySlug = (slug: string): FeatureIndexItem | undefined =>
  featureIndexItems.find((item) => item.id === slug);
