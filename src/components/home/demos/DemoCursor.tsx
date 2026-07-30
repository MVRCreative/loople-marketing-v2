/**
 * DemoCursor — the faux pointer shared by every self-playing demo.
 *
 * Position is measured from the demo root (see `centerOf` in each demo) and
 * applied as a transform, so the glide is an eased CSS transition rather
 * than a JS tween. The arrow is white with a dark stroke and a soft shadow
 * so it reads on both the light and dark panel surfaces; its tip sits at
 * the supplied point.
 */

import { cn } from '@/lib/cn';

export type DemoPoint = { x: number; y: number };

export type DemoCursorProps = {
  /** Measured position relative to the demo root, or null before first measure. */
  point: DemoPoint | null;
  visible: boolean;
  /** Scales the arrow down and fires an accent ripple at the tip. */
  clicking: boolean;
  className?: string;
};

export const DemoCursor = (props: DemoCursorProps) => {
  if (!props.point) {
    return null;
  }

  return (
    <div
      className={cn('pointer-events-none absolute top-0 left-0 z-10', props.className)}
      style={{
        transform: `translate3d(${props.point.x}px, ${props.point.y}px, 0) scale(${props.clicking ? 0.82 : 1})`,
        transition: 'transform 560ms cubic-bezier(0.5, 0, 0.15, 1), opacity 300ms ease-out',
        opacity: props.visible ? 1 : 0,
      }}
    >
      {props.clicking ? (
        <span className="absolute -top-1 -left-1 size-6 animate-ping rounded-ds-full bg-ds-primary/50" />
      ) : null}
      <svg viewBox="0 0 20 22" className="size-5 drop-shadow-[0_2px_4px_rgb(0_0_0/0.35)]">
        <path
          d="M1 1l6.5 18 2.8-7.3 7.7-2.4z"
          fill="#ffffff"
          stroke="#18181b"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};
