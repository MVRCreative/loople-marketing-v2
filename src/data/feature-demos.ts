/**
 * Content for the self-playing feature demos.
 *
 * Kept next to the feature copy so the demos stay grounded in the same
 * voice and in data that matches the product. Roles and permissions here
 * mirror the Loople app: org membership is `owner | admin | member`,
 * admins manage members, finance, broadcasts, and events, and the owner
 * role itself can only be changed by the owner.
 */

export const DEMO_ORG = 'Northside Wrestling Club';

export type DemoRoleId = 'owner' | 'admin' | 'member';

export type DemoPermission = {
  label: string;
  /** False renders the locked treatment — what this role deliberately can't reach. */
  allowed: boolean;
};

export type DemoRole = {
  id: DemoRoleId;
  label: string;
  /** One-line description of the role's remit, shown under the tabs. */
  summary: string;
  permissions: readonly DemoPermission[];
};

export const ROLES_ACCESS_DEMO = {
  org: DEMO_ORG,
  caption: '128 members · 3 admins',
  roles: [
    {
      id: 'owner',
      label: 'Owner',
      summary: 'Runs the club and owns billing.',
      permissions: [
        { label: 'Members & approvals', allowed: true },
        { label: 'Finance & transactions', allowed: true },
        { label: 'Broadcasts & events', allowed: true },
        { label: 'Community settings', allowed: true },
      ],
    },
    {
      id: 'admin',
      label: 'Admin',
      summary: 'Manages day-to-day operations.',
      permissions: [
        { label: 'Members & approvals', allowed: true },
        { label: 'Finance & transactions', allowed: true },
        { label: 'Broadcasts & events', allowed: true },
        { label: 'Owner role & transfer', allowed: false },
      ],
    },
    {
      id: 'member',
      label: 'Member',
      summary: 'Sees their own family.',
      permissions: [
        { label: 'Community feed', allowed: true },
        { label: 'Programs & events', allowed: true },
        { label: 'Family & payments', allowed: true },
        { label: 'Admin tools', allowed: false },
      ],
    },
  ],
} as const satisfies {
  org: string;
  caption: string;
  roles: readonly DemoRole[];
};

export type DemoParticipant = {
  id: string;
  name: string;
  /** Relationship line, as the registration dialog lists guardians and dependents. */
  relation: string;
};

/** Shared between the two halves of the registration story. */
const DEMO_PROGRAM = 'Fall youth wrestling';
const DEMO_PRICE = '$120.00';

/**
 * The admin half of registration: name a program, set its terms, publish it,
 * and watch registrations land. Mirrors the app's program form, where the
 * waiver is a toggle rather than a separate step.
 */
export const PROGRAM_SETUP_DEMO = {
  eyebrow: `${DEMO_ORG} · Admin`,
  title: 'New program',
  nameLabel: 'Program name',
  /** Typed into the name field one character at a time. */
  program: DEMO_PROGRAM,
  fields: [
    { label: 'Schedule', value: 'Tue & Thu · 6:00 PM' },
    { label: 'Price', value: `${DEMO_PRICE} per participant` },
  ],
  waiverToggle: 'Require waiver',
  publishLabel: 'Publish program',
  publishedLabel: 'Published · open for registration',
  rosterLabel: 'Registrations',
  rosterEmpty: 'None yet',
  rosterFilled: `1 · ${DEMO_PRICE} collected`,
} as const satisfies {
  eyebrow: string;
  title: string;
  nameLabel: string;
  program: string;
  fields: readonly { label: string; value: string }[];
  waiverToggle: string;
  publishLabel: string;
  publishedLabel: string;
  rosterLabel: string;
  rosterEmpty: string;
  rosterFilled: string;
};

/**
 * The family half: the app registers through one guided form — participants,
 * waiver, total, then checkout — so this mirrors that single dialog rather
 * than inventing a multi-step wizard. The waiver consent label, the Stripe
 * line, and the button copy are the app's own strings.
 */
export const FAMILY_CHECKOUT_DEMO = {
  program: DEMO_PROGRAM,
  price: DEMO_PRICE,
  priceCaption: `${DEMO_PRICE} per participant`,
  participantsLabel: 'Who are you registering?',
  participants: [
    { id: 'maria', name: 'Maria Delgado', relation: 'You' },
    { id: 'sofia', name: 'Sofia Delgado', relation: 'Dependent · age 11' },
  ],
  /** The participant the faux cursor selects. */
  selectedId: 'sofia',
  waiver: {
    body: 'Participants accept the risks of contact sport.',
    consent: 'I have read and agree to the waiver',
  },
  payment: {
    totalLabel: 'Total',
    secureNote: 'Payments are processed securely by Stripe.',
    submitLabel: 'Continue to payment',
    submittingLabel: 'Redirecting to checkout...',
  },
  confirmation: {
    title: 'Registration confirmed',
    lines: [
      `Sofia Delgado · ${DEMO_PROGRAM}`,
      'Tue & Thu · 6:00 PM',
      `${DEMO_PRICE} paid · receipt emailed`,
    ],
  },
} as const satisfies {
  program: string;
  price: string;
  priceCaption: string;
  participantsLabel: string;
  participants: readonly DemoParticipant[];
  selectedId: string;
  waiver: { body: string; consent: string };
  payment: {
    totalLabel: string;
    secureNote: string;
    submitLabel: string;
    submittingLabel: string;
  };
  confirmation: { title: string; lines: readonly string[] };
};

export type DemoPost = {
  id: string;
  author: string;
  /** Shown after the name as `@handle`, as the web post card does. */
  handle: string;
  initials: string;
  /** Compact relative time, matching the app's `formatTimeAgo` output. */
  time: string;
  body: string;
  /** Public path for an attached photo; the app renders one image full width. */
  photo?: string;
  replies: number;
  shares: number;
  likes: number;
};

export type DemoCommunity = {
  id: string;
  name: string;
  initials: string;
};

/**
 * Newsfeed content. The feed mirrors the app's web layout: a community rail,
 * a filter bar whose pill cycles between "All Communities" and one community,
 * and post cards with a Reply / Share / Like / Bookmark action row. Counts
 * only appear above zero, timestamps are compact, and replying opens a
 * composer — all as the product does it.
 */
export const NEWSFEED_DEMO = {
  allLabel: 'All Communities',
  railAllLabel: 'All',
  scopes: ['Everything', 'Programs', 'Events'],
  communities: [
    { id: 'northside', name: DEMO_ORG, initials: 'NW' },
    { id: 'riverside', name: 'Riverside Soccer Club', initials: 'RS' },
    { id: 'eastside', name: 'Eastside Band Boosters', initials: 'EB' },
  ],
  /** The community the faux cursor switches the pill to. */
  selectedId: 'northside',
  allPosts: [
    {
      id: 'a1',
      author: 'Coach Rivera',
      handle: 'crivera',
      initials: 'CR',
      time: '12m',
      body: 'Mats are down early tonight. Doors open at 5:30 for open mat.',
      replies: 3,
      shares: 1,
      likes: 12,
    },
    {
      id: 'a2',
      author: 'Priya Raman',
      handle: 'praman',
      initials: 'PR',
      time: '1h',
      body: 'Fall registration closes Friday. Two spots left in the beginner group.',
      replies: 1,
      shares: 4,
      likes: 8,
    },
    {
      id: 'a3',
      author: 'Jordan Ellis',
      handle: 'jellis',
      initials: 'JE',
      time: '3h',
      body: 'Ride share list for the Riverside meet is open.',
      replies: 2,
      shares: 0,
      likes: 6,
    },
  ],
  communityPosts: [
    {
      id: 'c1',
      author: 'Coach Rivera',
      handle: 'crivera',
      initials: 'CR',
      time: '12m',
      body: 'Great turnout at open mat tonight.',
      photo: '/assets/images/hero-wrestling.jpg',
      replies: 2,
      shares: 1,
      likes: 11,
    },
    {
      id: 'c2',
      author: 'Maria Delgado',
      handle: 'mdelgado',
      initials: 'MD',
      time: '2h',
      body: 'Singlets came in. Pick yours up at the front desk before Thursday.',
      replies: 1,
      shares: 0,
      likes: 9,
    },
  ],
  /** The reply the faux cursor writes on the first community post. */
  reply: {
    author: 'Maria Delgado',
    initials: 'MD',
    body: 'Sofia loved it. Thank you, coach!',
    /** The app shows this while an optimistic reply is in flight. */
    sendingLabel: 'Sending',
    time: 'now',
    replyingTo: 'Replying to @crivera',
    placeholder: 'Post your reply',
    submitLabel: 'Reply',
  },
} as const satisfies {
  allLabel: string;
  railAllLabel: string;
  scopes: readonly string[];
  communities: readonly DemoCommunity[];
  selectedId: string;
  allPosts: readonly DemoPost[];
  communityPosts: readonly DemoPost[];
  reply: {
    author: string;
    initials: string;
    body: string;
    sendingLabel: string;
    time: string;
    replyingTo: string;
    placeholder: string;
    submitLabel: string;
  };
};

export type DemoMember = {
  id: string;
  name: string;
  /** Initials shown in the avatar chip. */
  initials: string;
  /** Role · dues line, mirroring the directory's Role and Dues columns. */
  meta: string;
};

export type DemoProfileEntry = {
  label: string;
  /** Relationship or schedule line under the entry. */
  detail: string;
};

/**
 * Directory search + profile content. The columns (member, role, dues) and
 * the "Family accounts" section mirror the app's admin member directory and
 * member detail views.
 */
export const MEMBER_DIRECTORY_DEMO = {
  org: DEMO_ORG,
  caption: 'Member directory',
  /** Typed into the search field one character at a time. */
  query: 'del',
  members: [
    {
      id: 'maria',
      name: 'Maria Delgado',
      initials: 'MD',
      meta: 'Admin · Dues paid',
    },
    {
      id: 'jordan',
      name: 'Jordan Ellis',
      initials: 'JE',
      meta: 'Member · Dues paid',
    },
    {
      id: 'luis',
      name: 'Luis Delgado',
      initials: 'LD',
      meta: 'Member · Dues paid',
    },
    {
      id: 'priya',
      name: 'Priya Raman',
      initials: 'PR',
      meta: 'Member · Pending',
    },
  ],
  /** The row the faux cursor opens once the search has narrowed the list. */
  openedId: 'maria',
  profile: {
    status: 'Active',
    meta: 'Joined Aug 2023 · Dues paid through Dec 2026',
    sections: [
      {
        title: 'Family accounts',
        entries: [
          { label: 'Sofia Delgado', detail: 'Dependent · age 11' },
          { label: 'Luis Delgado', detail: 'Guardian' },
        ],
      },
      {
        title: 'Programs',
        entries: [
          { label: 'Fall youth wrestling', detail: 'Tue & Thu · 6:00 PM' },
          { label: 'Saturday open mat', detail: 'Sat · 9:00 AM' },
        ],
      },
    ],
  },
} as const satisfies {
  org: string;
  caption: string;
  query: string;
  members: readonly DemoMember[];
  openedId: string;
  profile: {
    status: string;
    meta: string;
    sections: readonly {
      title: string;
      entries: readonly DemoProfileEntry[];
    }[];
  };
};
