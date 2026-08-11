/**
 * Content for the real product UI fragments staged in the homepage hero.
 *
 * Strings mirror the Loople app (`~/Developer/loople`). Each fragment is a
 * cropped piece of an actual screen, not an invented mockup.
 */

/** Full-bleed photo inside the borderless phone. */
export const HERO_PHONE_PHOTO = {
  src: '/assets/images/hero-community.jpg',
  alt: 'Friends high-fiving across a pickleball net on a sunny outdoor court',
} as const;

/** Square photo that orbits off the left of the phone. */
export const HERO_ORBIT_PHOTO = {
  src: '/assets/images/hero-wrestling.jpg',
  alt: 'Wrestlers competing on the mat',
} as const;

/** Small thumbnail that orbits off the lower left. */
export const HERO_ORBIT_THUMB = {
  src: '/assets/images/hero-sideline.jpg',
  alt: 'Athletes on the sideline',
} as const;

/** Caption on the members chip overlaying the phone. */
export const HERO_PHOTO_CAPTION = '128 active this week';

/** Compact overlay chips anchored to the phone edge. */
export const HERO_PHONE_CHIPS = ['RSVP from the feed', 'One place for everyone'] as const;

/** Event RSVP — from `event-detail.tsx` Going / Maybe / Can't go. */
export const HERO_RSVP_MODULE = {
  title: 'Fall dual meet',
  time: 'Sat · 9:00 AM',
  goingBefore: 24,
  goingAfter: 25,
  cta: 'RSVP',
  options: ['Going', 'Maybe', "Can't go"] as const,
} as const;

/** Program registration — from `registration-review.tsx` participant row. */
export const HERO_REGISTER_MODULE = {
  participant: 'Sofia Delgado',
  initials: 'SD',
  program: 'Winter clinic',
  status: 'Registered',
} as const;

/** Broadcast announcement — from `broadcast-feed-card.tsx`. */
export const HERO_ANNOUNCEMENT_MODULE = {
  author: 'Coach Rivera',
  initials: 'CR',
  tag: 'Announcement',
  title: 'Practice moved indoors',
  unreadCount: 3,
} as const;

/** Group-targeting moment — tags from the broadcast composer. */
export const HERO_GROUPS_MODULE = {
  title: 'Reach the right people',
  tags: ['Team', 'Parents', 'Board'] as const,
} as const;

/** Live-ops moment — tags for the surfaces members actually open. */
export const HERO_UPDATES_MODULE = {
  title: 'Keep everyone in the loop',
  tags: ['Broadcasts', 'RSVPs', 'Check-in'] as const,
} as const;

/** Stacked going-avatars on the phone overlay chip. */
export const HERO_GOING_AVATARS = [
  { initials: 'SD' },
  { initials: 'CR' },
  { initials: 'MD' },
] as const;
