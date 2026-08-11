/**
 * Content for the real product UI fragments embedded inside the hero
 * poster's bold color shapes.
 *
 * Strings mirror the Loople app (`~/Developer/loople`). Each fragment is a
 * cropped piece of an actual screen, not an invented mockup.
 */

/** Caption on the community photo shape. */
export const HERO_PHOTO_CAPTION = '128 members active this week';

/** Event RSVP — from `event-detail.tsx` Going / Maybe / Can't go. */
export const HERO_RSVP_MODULE = {
  title: 'Fall dual meet',
  time: 'Sat · 9:00 AM',
  goingBefore: 24,
  goingAfter: 25,
  options: ['Going', 'Maybe', "Can't go"] as const,
} as const;

/** Program registration — from `registration-review.tsx` participant row. */
export const HERO_REGISTER_MODULE = {
  participant: 'Sofia Delgado',
  initials: 'SD',
  program: 'Winter clinic',
} as const;

/** Broadcast announcement — from `broadcast-feed-card.tsx`. */
export const HERO_ANNOUNCEMENT_MODULE = {
  author: 'Coach Rivera',
  initials: 'CR',
  tag: 'Announcement',
  title: 'Practice moved indoors',
  unreadCount: 3,
} as const;
