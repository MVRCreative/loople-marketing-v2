'use client';

/**
 * RolesAccessDemo — self-playing vignette for the "Roles & access"
 * sub-feature of Community Management.
 *
 * A faux cursor tours the Owner / Admin / Member tabs; each click rewrites
 * the permission list beneath so the viewer sees what every role can reach
 * and what stays locked. The sequence runs on a loop: intro → two role
 * switches → a short rest → a staggered drain → reset.
 *
 * The choreography is a timed state machine (React state + CSS transitions)
 * rather than GSAP, because nothing here responds to scroll or input. Under
 * `prefers-reduced-motion: reduce` the machine never starts and the demo
 * paints its resting frame instead.
 *
 * The panel is decorative — it's `aria-hidden` because the sub-feature card
 * already states the same thing in prose.
 *
 * Roles mirror the product: org membership is `owner | admin | member`.
 */

import { useEffect, useRef, useState } from 'react';
import { DemoCursor } from '@/components/home/demos/DemoCursor';
import type { DemoPoint } from '@/components/home/demos/DemoCursor';
import type { DemoRoleId } from '@/data/feature-demos';
import { ROLES_ACCESS_DEMO } from '@/data/feature-demos';
import { cn } from '@/lib/cn';

export type RolesAccessDemoProps = {
  /** CSS aspect-ratio value, e.g. "1 / 1". */
  aspectRatio: string;
  className?: string;
};

type Phase = 'idle' | 'moving' | 'switching' | 'holding' | 'exiting';

const ROLES = ROLES_ACCESS_DEMO.roles;
const LAST_STEP = ROLES.length - 1;
/** Summary line + one line per permission — everything that streams in. */
const LINE_COUNT = ROLES[0].permissions.length + 1;

/**
 * Phase timings in ms — read top to bottom as the demo's script.
 * `FRAME_MS` defers a phase's opening state change to the next frame so CSS
 * transitions interpolate from the current value instead of jumping.
 */
const FRAME_MS = 16;
const RESET_MS = 60;
const FADE_IN_MS = 300;
const INTRO_MS = 1700;
const MOVE_MS = 560;
const CLICK_MS = 220;
const ROW_STAGGER_MS = 110;
const STREAM_MS = LINE_COUNT * ROW_STAGGER_MS + 420;
const HOLD_MS = 1100;
const FINAL_HOLD_MS = 1600;
const ROW_EXIT_STAGGER_MS = 90;
const EXIT_MS = LINE_COUNT * ROW_EXIT_STAGGER_MS + 540;

const badgeToneClasses: Record<DemoRoleId, string> = {
  owner: 'bg-ds-brand text-ds-brand-muted',
  admin: 'bg-ds-brand-muted text-ds-brand',
  member: 'bg-ds-muted text-ds-muted-foreground',
};

const CheckIcon = () => (
  <svg viewBox="0 0 16 16" className="size-3.5 shrink-0 text-ds-brand">
    <path
      d="M3.5 8.5l3 3 6-6.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const LockIcon = () => (
  <svg viewBox="0 0 16 16" className="size-3.5 shrink-0 text-ds-muted-foreground">
    <path d="M5 7V5.25a3 3 0 016 0V7" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <rect x="3.5" y="7" width="9" height="6" rx="1.5" fill="currentColor" opacity="0.85" />
  </svg>
);

export const RolesAccessDemo = (props: RolesAccessDemoProps) => {
  const [phase, setPhase] = useState<Phase>('idle');
  const [step, setStep] = useState(0);
  const [rowsIn, setRowsIn] = useState(true);
  const [chromeIn, setChromeIn] = useState(true);
  const [clicking, setClicking] = useState(false);
  const [cursor, setCursor] = useState<DemoPoint | null>(null);

  const rootRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const stepRef = useRef(0);
  const startedRef = useRef(false);
  const reducedRef = useRef(false);

  // Declared first so the driver effect below sees the resolved value.
  useEffect(() => {
    reducedRef.current =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    const centerOf = (el: HTMLElement | null): DemoPoint | null => {
      const root = rootRef.current;
      if (!(root && el)) {
        return null;
      }
      const target = el.getBoundingClientRect();
      const frame = root.getBoundingClientRect();
      return {
        x: target.left - frame.left + target.width / 2,
        y: target.top - frame.top + target.height / 2,
      };
    };

    const parkPoint = (): DemoPoint | null => {
      const frame = rootRef.current?.getBoundingClientRect();
      return frame ? { x: frame.width * 0.8, y: frame.height * 0.88 } : null;
    };

    const advance = (next: number) => {
      stepRef.current = next;
      setStep(next);
    };

    if (!reducedRef.current) {
      if (phase === 'idle') {
        timers.push(
          setTimeout(() => {
            advance(0);
            setClicking(false);
            setCursor(parkPoint());
            // The first paint is already the resting frame — only re-hide on loop.
            if (startedRef.current) {
              setRowsIn(false);
              setChromeIn(false);
            }
            startedRef.current = true;
          }, RESET_MS),
          setTimeout(() => {
            setChromeIn(true);
            setRowsIn(true);
          }, FADE_IN_MS),
          setTimeout(() => {
            setPhase('moving');
          }, INTRO_MS),
        );
      } else if (phase === 'moving') {
        timers.push(
          setTimeout(() => {
            const target = centerOf(tabRefs.current[stepRef.current + 1] ?? null);
            if (target) {
              setCursor(target);
            }
          }, FRAME_MS),
          setTimeout(() => {
            setPhase('switching');
          }, MOVE_MS),
        );
      } else if (phase === 'switching') {
        timers.push(
          setTimeout(() => {
            setClicking(true);
            setRowsIn(false);
          }, FRAME_MS),
          setTimeout(() => {
            setClicking(false);
            advance(Math.min(stepRef.current + 1, LAST_STEP));
          }, FRAME_MS + CLICK_MS),
          setTimeout(
            () => {
              setRowsIn(true);
            },
            FRAME_MS + CLICK_MS + 80,
          ),
          setTimeout(
            () => {
              setPhase('holding');
            },
            FRAME_MS + CLICK_MS + 80 + STREAM_MS,
          ),
        );
      } else if (phase === 'holding') {
        const atEnd = stepRef.current >= LAST_STEP;
        timers.push(
          setTimeout(
            () => {
              setPhase(atEnd ? 'exiting' : 'moving');
            },
            atEnd ? FINAL_HOLD_MS : HOLD_MS,
          ),
        );
      } else {
        timers.push(
          setTimeout(() => {
            setRowsIn(false);
            setChromeIn(false);
          }, FRAME_MS),
          setTimeout(() => {
            setPhase('idle');
          }, EXIT_MS),
        );
      }
    }

    return () => {
      for (const timer of timers) {
        clearTimeout(timer);
      }
    };
  }, [phase]);

  const role = ROLES[step] ?? ROLES[0];
  const cursorVisible = phase === 'moving' || phase === 'switching';
  // The exit drains bottom-up; every other transition fills top-down.
  const leaving = phase === 'exiting';

  const lineStyle = (index: number) => {
    if (rowsIn) {
      return {
        transitionDelay: `${index * ROW_STAGGER_MS}ms`,
        opacity: 1,
        transform: 'translateY(0)',
      };
    }
    return {
      transitionDelay: leaving ? `${(LINE_COUNT - 1 - index) * ROW_EXIT_STAGGER_MS}ms` : '0ms',
      opacity: 0,
      transform: leaving ? 'translateY(-4px)' : 'translateY(6px)',
    };
  };

  // Chrome leaves last, after the lines have drained.
  const chromeStyle = {
    opacity: chromeIn ? 1 : 0,
    transitionDelay: leaving ? `${LINE_COUNT * ROW_EXIT_STAGGER_MS}ms` : '0ms',
  };

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className={cn(
        'relative w-full overflow-hidden border border-ds-border bg-ds-card',
        props.className,
      )}
      style={{ aspectRatio: props.aspectRatio }}
    >
      <div className="absolute inset-0 flex flex-col justify-center gap-4 px-6 py-5 sm:gap-5 sm:px-8 sm:py-6">
        <div
          className="flex items-center gap-3 transition-opacity duration-500 ease-out"
          style={chromeStyle}
        >
          <span className="grid size-9 shrink-0 place-items-center rounded-ds-full bg-ds-brand-muted text-xs font-semibold text-ds-brand">
            NW
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-ds-foreground">
              {ROLES_ACCESS_DEMO.org}
            </p>
            <p className="truncate text-xs text-ds-muted-foreground">{ROLES_ACCESS_DEMO.caption}</p>
          </div>
        </div>

        <div
          className="flex gap-1 rounded-ds-full bg-ds-muted p-1 transition-opacity duration-500 ease-out"
          style={chromeStyle}
        >
          {ROLES.map((item, index) => (
            <span
              key={item.id}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              className={cn(
                'flex-1 rounded-ds-full px-2 py-1.5 text-center text-xs font-medium transition-all duration-300 ease-out',
                index === step
                  ? 'bg-ds-card text-ds-foreground shadow-ds-xs'
                  : 'text-ds-muted-foreground',
                clicking && index === step + 1 && 'ring-2 ring-ds-primary/40',
              )}
            >
              {item.label}
            </span>
          ))}
        </div>

        <div
          className="flex items-center gap-2 transition-all duration-500 ease-out"
          style={lineStyle(0)}
        >
          <span
            className={cn(
              'rounded-ds-full px-2 py-0.5 text-[11px] font-semibold',
              badgeToneClasses[role.id],
            )}
          >
            {role.label}
          </span>
          <span className="truncate text-xs text-ds-muted-foreground">{role.summary}</span>
        </div>

        <ul className="flex flex-col gap-2">
          {role.permissions.map((permission, index) => (
            <li
              key={permission.label}
              className={cn(
                'flex items-center gap-2.5 rounded-ds-md border bg-ds-background px-3 py-2 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
                permission.allowed ? 'border-ds-border' : 'border-dashed border-ds-border/70',
              )}
              style={lineStyle(index + 1)}
            >
              {permission.allowed ? <CheckIcon /> : <LockIcon />}
              <span
                className={cn(
                  'truncate text-[13px]',
                  permission.allowed ? 'text-ds-foreground' : 'text-ds-muted-foreground',
                )}
              >
                {permission.label}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <DemoCursor point={cursor} visible={cursorVisible} clicking={clicking} />
    </div>
  );
};
