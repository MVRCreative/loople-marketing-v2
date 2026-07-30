'use client';

/**
 * ProgramSetupDemo — self-playing vignette for the admin half of Online
 * Registration.
 *
 * An organizer names a program, its terms stream in, and a faux cursor
 * publishes it. The payoff is the roster: registrations arrive on their own,
 * which is what publishing is for. The waiver is a toggle here rather than a
 * step, matching the app's program form.
 *
 * Phases: `idle → typing → filling → moving → clicking → published →
 * exiting`. Same rules as the other demos — a timed state machine, CSS
 * transitions, no GSAP, every state change deferred into a timer.
 *
 * Under `prefers-reduced-motion: reduce` the machine never starts and state
 * is seeded at its finished values: a published program with one registration.
 */

import { useEffect, useRef, useState } from 'react';
import { DemoCursor } from '@/components/home/demos/DemoCursor';
import type { DemoPoint } from '@/components/home/demos/DemoCursor';
import { PROGRAM_SETUP_DEMO } from '@/data/feature-demos';
import { cn } from '@/lib/cn';

export type ProgramSetupDemoProps = {
  /** CSS aspect-ratio value, e.g. "1 / 1". */
  aspectRatio: string;
  className?: string;
};

type Phase = 'idle' | 'typing' | 'filling' | 'moving' | 'clicking' | 'published' | 'exiting';

const {
  eyebrow,
  title,
  nameLabel,
  program,
  fields,
  waiverToggle,
  publishLabel,
  publishedLabel,
  rosterLabel,
  rosterEmpty,
  rosterFilled,
} = PROGRAM_SETUP_DEMO;

/** The waiver toggle streams in after the schedule and price rows. */
const SWITCH_INDEX = fields.length;

const CURSOR_PHASES = new Set<Phase>(['moving', 'clicking']);

/**
 * Phase timings in ms. `FRAME_MS` defers a phase's opening state change to
 * the next frame so CSS transitions interpolate from the current value.
 */
const FRAME_MS = 16;
const RESET_MS = 60;
const INTRO_MS = 700;
const TYPE_MS = 45;
const TYPED_SETTLE_MS = 280;
const TYPING_MS = program.length * TYPE_MS + TYPED_SETTLE_MS;
const FILL_MS = 780;
const MOVE_MS = 620;
const CLICK_MS = 220;
const ROW_STAGGER_MS = 120;
const ROSTER_MS = 900;
const FINAL_HOLD_MS = 1800;
const EXIT_MS = 620;

/**
 * Builds the transition style for a streamed row.
 *
 * @param index Row position, used for the stagger.
 * @param visible Whether the row has streamed in.
 * @returns Inline style for the row.
 */
const rowStyle = (index: number, visible: boolean) => {
  if (visible) {
    return {
      transitionDelay: `${index * ROW_STAGGER_MS}ms`,
      opacity: 1,
      transform: 'translateY(0)',
    };
  }
  return { transitionDelay: '0ms', opacity: 0, transform: 'translateY(6px)' };
};

const Switch = (props: { on: boolean }) => (
  <span
    className={cn(
      'flex h-4 w-7 shrink-0 items-center rounded-ds-full p-0.5 transition-colors duration-300',
      props.on ? 'bg-ds-primary' : 'bg-ds-border',
    )}
  >
    <span
      className="size-3 rounded-ds-full bg-ds-card transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
      style={{ transform: `translateX(${props.on ? 12 : 0}px)` }}
    />
  </span>
);

export const ProgramSetupDemo = (props: ProgramSetupDemoProps) => {
  // Seeded at the finished state so a reduced-motion visitor, for whom the
  // machine never starts, sees a published program with one registration.
  const [phase, setPhase] = useState<Phase>('idle');
  const [typed, setTyped] = useState(program.length);
  const [filled, setFilled] = useState(true);
  const [published, setPublished] = useState(true);
  const [registered, setRegistered] = useState(true);
  const [visible, setVisible] = useState(true);
  const [clicking, setClicking] = useState(false);
  const [cursor, setCursor] = useState<DemoPoint | null>(null);

  const rootRef = useRef<HTMLDivElement>(null);
  const publishRef = useRef<HTMLDivElement>(null);
  const reducedRef = useRef(false);

  // Declared first so the driver effect below sees the resolved value.
  useEffect(() => {
    reducedRef.current =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    if (!reducedRef.current) {
      if (phase === 'idle') {
        timers.push(
          setTimeout(() => {
            setTyped(0);
            setFilled(false);
            setPublished(false);
            setRegistered(false);
            setClicking(false);
            const frame = rootRef.current?.getBoundingClientRect();
            setCursor(frame ? { x: frame.width * 0.82, y: frame.height * 0.95 } : null);
          }, RESET_MS),
          setTimeout(() => {
            setVisible(true);
          }, RESET_MS + FRAME_MS),
          setTimeout(() => {
            setPhase('typing');
          }, INTRO_MS),
        );
      } else if (phase === 'typing') {
        for (let count = 1; count <= program.length; count += 1) {
          timers.push(
            setTimeout(() => {
              setTyped(count);
            }, count * TYPE_MS),
          );
        }
        timers.push(
          setTimeout(() => {
            setPhase('filling');
          }, TYPING_MS),
        );
      } else if (phase === 'filling') {
        timers.push(
          setTimeout(() => {
            setFilled(true);
          }, FRAME_MS),
          setTimeout(() => {
            setPhase('moving');
          }, FILL_MS),
        );
      } else if (phase === 'moving') {
        timers.push(
          setTimeout(() => {
            const root = rootRef.current;
            const box = publishRef.current?.getBoundingClientRect();
            const frame = root?.getBoundingClientRect();
            setCursor(
              box && frame
                ? {
                    x: box.left - frame.left + box.width / 2,
                    y: box.top - frame.top + box.height / 2,
                  }
                : null,
            );
          }, FRAME_MS),
          setTimeout(() => {
            setPhase('clicking');
          }, MOVE_MS),
        );
      } else if (phase === 'clicking') {
        timers.push(
          setTimeout(() => {
            setClicking(true);
          }, FRAME_MS),
          setTimeout(() => {
            setClicking(false);
            setPublished(true);
            setPhase('published');
          }, FRAME_MS + CLICK_MS),
        );
      } else if (phase === 'published') {
        timers.push(
          setTimeout(() => {
            setRegistered(true);
          }, ROSTER_MS),
          setTimeout(() => {
            setPhase('exiting');
          }, ROSTER_MS + FINAL_HOLD_MS),
        );
      } else if (phase === 'exiting') {
        timers.push(
          setTimeout(() => {
            setVisible(false);
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

  const typing = phase === 'typing';

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className={cn(
        'relative w-full overflow-hidden border border-ds-border bg-ds-surface',
        props.className,
      )}
      style={{ aspectRatio: props.aspectRatio }}
    >
      <div
        className={cn(
          'absolute inset-0 flex flex-col gap-2.5 rounded-ds-xl border border-ds-border bg-ds-card p-4 shadow-ds-lg transition-opacity duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] motion-reduce:opacity-100',
          visible ? 'opacity-100' : 'opacity-0',
        )}
      >
        <div>
          <p className="truncate text-[10px] font-medium tracking-wide text-ds-muted-foreground uppercase">
            {eyebrow}
          </p>
          <p className="text-sm font-semibold text-ds-foreground">{title}</p>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-medium text-ds-muted-foreground">{nameLabel}</span>
          <div
            className={cn(
              'flex h-8 items-center rounded-ds-md border bg-ds-background px-2.5 transition-all duration-300',
              typing ? 'border-ds-primary/50 ring-2 ring-ds-primary/20' : 'border-ds-border',
            )}
          >
            <span className="truncate text-xs text-ds-foreground">{program.slice(0, typed)}</span>
            <span
              className={cn(
                'ml-px h-3.5 w-px shrink-0 bg-ds-primary transition-opacity duration-200',
                typing ? 'opacity-100' : 'opacity-0',
              )}
            />
          </div>
        </div>

        {fields.map((field, index) => (
          <div
            key={field.label}
            className="flex items-center justify-between gap-2 rounded-ds-md border border-ds-border bg-ds-background px-2.5 py-2 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={rowStyle(index, filled)}
          >
            <span className="shrink-0 text-[10px] text-ds-muted-foreground">{field.label}</span>
            <span className="truncate text-xs text-ds-foreground">{field.value}</span>
          </div>
        ))}

        <div
          className="flex items-center justify-between gap-2 rounded-ds-md border border-ds-border bg-ds-background px-2.5 py-2 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={rowStyle(SWITCH_INDEX, filled)}
        >
          <span className="truncate text-xs text-ds-foreground">{waiverToggle}</span>
          <Switch on={filled} />
        </div>

        <div
          ref={publishRef}
          className={cn(
            'mt-1 flex h-9 shrink-0 items-center justify-center rounded-ds-full px-3 text-center transition-all duration-300',
            published
              ? 'bg-ds-emerald-muted text-[11px] font-semibold text-ds-emerald-foreground'
              : 'bg-ds-primary text-xs font-bold text-ds-primary-foreground',
            clicking && 'ring-2 ring-ds-primary/40',
            filled ? 'opacity-100' : 'opacity-50',
          )}
        >
          <span className="truncate">{published ? publishedLabel : publishLabel}</span>
        </div>

        <div
          className={cn(
            'mt-auto flex items-center justify-between gap-2 rounded-ds-lg border bg-ds-background px-2.5 py-2 transition-colors duration-500',
            registered ? 'border-ds-emerald-foreground/30' : 'border-ds-border',
          )}
        >
          <span className="text-[10px] text-ds-muted-foreground">{rosterLabel}</span>
          <span
            className={cn(
              'truncate text-xs font-semibold transition-colors duration-500',
              registered ? 'text-ds-emerald-foreground' : 'text-ds-muted-foreground',
            )}
          >
            {registered ? rosterFilled : rosterEmpty}
          </span>
        </div>
      </div>

      <DemoCursor point={cursor} visible={CURSOR_PHASES.has(phase)} clicking={clicking} />
    </div>
  );
};
