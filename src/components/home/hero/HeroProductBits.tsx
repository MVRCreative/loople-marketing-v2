/**
 * Shared Loople product chrome for the hero poster's embedded UI moments.
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

export const HeroBellIcon = (props: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={props.className}
  >
    <path d="M6 8a6 6 0 0 1 12 0c0 4.5 1.5 6 1.5 6H4.5S6 12.5 6 8Z" />
    <path d="M10 21a2 2 0 0 0 4 0" />
  </svg>
);

export type HeroSquircleAvatarProps = {
  initials: string;
  className?: string;
  size?: 'sm' | 'md';
};

// Product avatar — squircle, primary-tint initials.
export const HeroSquircleAvatar = (props: HeroSquircleAvatarProps) => (
  <span
    className={cn(
      'grid shrink-0 place-items-center rounded-ds-md bg-ds-brand-muted font-semibold text-ds-brand',
      props.size === 'sm' ? 'size-6 text-[9px]' : 'size-8 text-[10px]',
      props.className,
    )}
  >
    {props.initials}
  </span>
);

export type HeroInsetCardProps = {
  className?: string;
  children: React.ReactNode;
};

// Small light UI card embedded inside a bold poster shape — never the shape
// itself. Keep it modest (padding, shadow) so the color block stays dominant.
export const HeroInsetCard = (props: HeroInsetCardProps) => (
  <div
    className={cn('rounded-ds-lg bg-ds-card/95 shadow-ds-md backdrop-blur-[1px]', props.className)}
  >
    {props.children}
  </div>
);
