/**
 * Shared Loople product chrome for the hero stage's phone and satellites.
 *
 * Avatars are squircles (`rounded-ds-md`), matching `apps/web/components/ui/avatar.tsx`
 * — not circles.
 */

import { cn } from '@/lib/cn';

export const HeroCheckIcon = (props: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={props.className}
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

export const HeroChevronIcon = (props: { className?: string }) => (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.75}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={props.className}
  >
    <path d="M4 6.5 8 10.5 12 6.5" />
  </svg>
);

export type HeroSquircleAvatarProps = {
  initials: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
};

const avatarSize = {
  sm: 'size-6 text-[9px]',
  md: 'size-8 text-[10px]',
  lg: 'size-12 text-[13px] sm:size-14 sm:text-sm',
} as const;

/**
 * Product avatar — squircle, primary-tint initials.
 * @param props Initials, optional size, and className.
 * @returns Squircle avatar chip.
 */
export const HeroSquircleAvatar = (props: HeroSquircleAvatarProps) => (
  <span
    className={cn(
      'grid shrink-0 place-items-center rounded-ds-md bg-ds-brand-muted font-semibold text-ds-brand',
      avatarSize[props.size ?? 'md'],
      props.className,
    )}
  >
    {props.initials}
  </span>
);

export type HeroFloatCardProps = {
  className?: string;
  children: React.ReactNode;
};

/**
 * White floating satellite — soft elevation, no border, so the card reads as
 * having bounced out of the phone rather than as a boxed widget.
 * @param props Card contents and optional className.
 * @returns Elevated card surface.
 */
export const HeroFloatCard = (props: HeroFloatCardProps) => (
  <div className={cn('rounded-ds-2xl bg-ds-card shadow-ds-lg', props.className)}>
    {props.children}
  </div>
);

export type HeroTagProps = {
  tone?: 'brand' | 'emerald';
  children: React.ReactNode;
};

const tagTone = {
  brand: 'bg-ds-brand-muted text-ds-brand',
  emerald: 'bg-ds-emerald-muted text-ds-emerald-foreground',
} as const;

/**
 * Compact pill used inside the orbiting feature cards.
 * @param props Tag label and optional tone.
 * @returns Rounded label chip.
 */
export const HeroTag = (props: HeroTagProps) => (
  <span
    className={cn(
      'inline-flex items-center rounded-ds-full px-2 py-0.5 text-[10px] font-medium sm:text-[11px]',
      tagTone[props.tone ?? 'brand'],
    )}
  >
    {props.children}
  </span>
);
