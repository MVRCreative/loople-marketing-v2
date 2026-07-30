'use client';

/**
 * FamilyCheckoutDemo — self-playing vignette for the family half of Online
 * Registration.
 *
 * A faux cursor works the registration dialog end to end: pick the child,
 * accept the waiver, pay, and land on the confirmation. The app registers
 * through one guided form rather than a wizard, so this mirrors that single
 * dialog instead of inventing steps.
 *
 * Phases: `idle → (moving → clicking) × 3 → submitting → confirmed →
 * exiting`. Each click bumps `completed`, and both checkboxes derive from it,
 * so the machine holds one counter rather than a flag per control. Same rules
 * as the other demos — a timed state machine, CSS transitions, no GSAP, every
 * state change deferred into a timer.
 *
 * Under `prefers-reduced-motion: reduce` the machine never starts and the
 * `motion-reduce:` variants pin the panel to the confirmation.
 */

import { useEffect, useRef, useState } from 'react';
import { DemoCursor } from '@/components/home/demos/DemoCursor';
import type { DemoPoint } from '@/components/home/demos/DemoCursor';
import { FAMILY_CHECKOUT_DEMO } from '@/data/feature-demos';
import { cn } from '@/lib/cn';

export type FamilyCheckoutDemoProps = {
  /** CSS aspect-ratio value, e.g. "1 / 1". */
  aspectRatio: string;
  className?: string;
};

type Phase = 'idle' | 'moving' | 'clicking' | 'submitting' | 'confirmed' | 'exiting';

const {
  program,
  price,
  priceCaption,
  participantsLabel,
  participants,
  selectedId,
  waiver,
  payment,
  confirmation,
} = FAMILY_CHECKOUT_DEMO;

/** Title plus one line per confirmation detail. */
const LINE_COUNT = confirmation.lines.length + 1;
/** Participant, waiver, then submit. */
const LAST_STOP = 2;
const ALL_DONE = LAST_STOP + 1;

const DONE_PHASES = new Set<Phase>(['confirmed', 'exiting']);
const CURSOR_PHASES = new Set<Phase>(['moving', 'clicking']);

/**
 * Phase timings in ms. `FRAME_MS` defers a phase's opening state change to
 * the next frame so CSS transitions interpolate from the current value.
 */
const FRAME_MS = 16;
const RESET_MS = 60;
const INTRO_MS = 1100;
const MOVE_MS = 620;
const CLICK_MS = 240;
const SETTLE_MS = 380;
const SUBMIT_MS = 950;
const ROW_STAGGER_MS = 120;
const STREAM_MS = LINE_COUNT * ROW_STAGGER_MS + 420;
const FINAL_HOLD_MS = 1700;
const ROW_EXIT_STAGGER_MS = 90;
const EXIT_MS = LINE_COUNT * ROW_EXIT_STAGGER_MS + 540;

/**
 * Measures an element's centre relative to the demo root.
 *
 * @param root Demo root the cursor is positioned within.
 * @param el Element to aim at.
 * @returns The centre point, or null when either element is missing.
 */
const centerOf = (root: HTMLElement | null, el: HTMLElement | null) => {
  if (!(root && el)) {
    return null;
  }
  const box = el.getBoundingClientRect();
  const frame = root.getBoundingClientRect();
  return {
    x: box.left - frame.left + box.width / 2,
    y: box.top - frame.top + box.height / 2,
  };
};

/**
 * Finds the element a stop aims at. Stops are marked in the markup so the
 * panels stay plain presentational JSX.
 *
 * @param root Demo root to search within.
 * @param index Stop index.
 * @returns The element, or null when it has not mounted.
 */
const stopEl = (root: HTMLElement | null, index: number) =>
  root?.querySelector<HTMLElement>(`[data-demo-stop="${index}"]`) ?? null;

const CheckMark = (props: { className?: string }) => (
  <svg viewBox="0 0 16 16" className={props.className}>
    <path
      d="M3.5 8.5l3 3 6-6.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Checkbox = (props: { checked: boolean }) => (
  <span
    className={cn(
      'grid size-4 shrink-0 place-items-center rounded-ds-sm border transition-colors duration-200',
      props.checked ? 'border-ds-primary bg-ds-primary' : 'border-ds-border bg-ds-background',
    )}
  >
    {props.checked ? <CheckMark className="size-3 text-ds-primary-foreground" /> : null}
  </span>
);

const LockIcon = () => (
  <svg viewBox="0 0 16 16" className="size-3 shrink-0 text-ds-muted-foreground">
    <path d="M5 7V5.25a3 3 0 016 0V7" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <rect x="3.5" y="7" width="9" height="6" rx="1.5" fill="currentColor" opacity="0.85" />
  </svg>
);

// The dialog itself, worked top to bottom by the cursor.
const RegistrationForm = (props: {
  participantChecked: boolean;
  waiverChecked: boolean;
  submitting: boolean;
  /** The confirmation has taken over. */
  done: boolean;
  /** Stop index currently under the cursor's click, or null. */
  clickTarget: number | null;
}) => (
  <div
    className={cn(
      'absolute inset-0 flex flex-col gap-2.5 rounded-ds-xl border border-ds-border bg-ds-card p-4 shadow-ds-lg transition-opacity duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] motion-reduce:opacity-0',
      props.done ? 'opacity-0' : 'opacity-100',
    )}
  >
    <div>
      <p className="truncate text-sm font-semibold text-ds-foreground">Register for {program}</p>
      <p className="text-xs text-ds-muted-foreground">{priceCaption}</p>
    </div>

    <div className="flex flex-col gap-2">
      <p className="text-[11px] font-medium text-ds-foreground">{participantsLabel}</p>
      {participants.map((participant) => {
        const isTarget = participant.id === selectedId;
        const checked = isTarget && props.participantChecked;
        return (
          <div
            key={participant.id}
            data-demo-stop={isTarget ? 0 : undefined}
            className={cn(
              'flex items-center gap-2.5 rounded-ds-lg border px-2.5 py-1.5 transition-all duration-200',
              isTarget && props.clickTarget === 0
                ? 'border-ds-primary/40 ring-2 ring-ds-primary/40'
                : 'border-ds-border',
              checked ? 'bg-ds-background' : 'bg-ds-card',
            )}
          >
            <Checkbox checked={checked} />
            <span className="min-w-0 flex-1">
              <span className="block truncate text-xs font-medium text-ds-foreground">
                {participant.name}
              </span>
              <span className="block truncate text-[10px] text-ds-muted-foreground">
                {participant.relation}
              </span>
            </span>
          </div>
        );
      })}
    </div>

    <div
      data-demo-stop="1"
      className={cn(
        'flex flex-col gap-1 rounded-ds-lg border p-2.5 transition-all duration-200',
        props.clickTarget === 1
          ? 'border-ds-primary/40 ring-2 ring-ds-primary/40'
          : 'border-ds-border',
      )}
    >
      <div className="flex items-center gap-2">
        <Checkbox checked={props.waiverChecked} />
        <span className="text-[11px] leading-tight font-medium text-ds-foreground">
          {waiver.consent}
        </span>
      </div>
      <p className="text-[10px] leading-snug text-ds-muted-foreground">{waiver.body}</p>
    </div>

    <div className="mt-auto rounded-ds-lg border border-ds-border p-2.5">
      <div className="flex items-center justify-between">
        <span className="text-xs text-ds-muted-foreground">{payment.totalLabel}</span>
        <span className="text-base font-bold text-ds-foreground">{price}</span>
      </div>
      <p className="mt-1 flex items-center gap-1.5 text-[10px] text-ds-muted-foreground">
        <LockIcon />
        <span className="truncate">{payment.secureNote}</span>
      </p>
    </div>

    <div
      data-demo-stop="2"
      className={cn(
        'flex h-9 shrink-0 items-center justify-center gap-2 rounded-ds-full bg-ds-primary px-4 text-xs font-bold text-ds-primary-foreground transition-all duration-200',
        props.participantChecked && props.waiverChecked ? 'opacity-100' : 'opacity-50',
        props.clickTarget === 2 && 'ring-2 ring-ds-primary/40',
      )}
    >
      {props.submitting ? (
        <span className="size-3.5 animate-spin rounded-ds-full border-2 border-ds-primary-foreground border-t-transparent" />
      ) : null}
      <span className="truncate">
        {props.submitting ? payment.submittingLabel : payment.submitLabel}
      </span>
    </div>
  </div>
);

// The receipt the family lands on, streamed line by line.
const ConfirmationCard = (props: {
  visible: boolean;
  /** Lines have streamed in. */
  streamedIn: boolean;
  /** The loop is draining, so lines leave bottom-up. */
  leaving: boolean;
}) => {
  const lineStyle = (index: number) => {
    if (props.streamedIn) {
      return {
        transitionDelay: `${index * ROW_STAGGER_MS}ms`,
        opacity: 1,
        transform: 'translateY(0)',
      };
    }
    return {
      transitionDelay: props.leaving
        ? `${(LINE_COUNT - 1 - index) * ROW_EXIT_STAGGER_MS}ms`
        : '0ms',
      opacity: 0,
      transform: props.leaving ? 'translateY(-4px)' : 'translateY(6px)',
    };
  };

  return (
    <div
      className={cn(
        'absolute inset-0 flex flex-col justify-center gap-3 rounded-ds-xl border border-ds-border bg-ds-card p-5 shadow-ds-lg transition-opacity duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] motion-reduce:opacity-100',
        props.visible ? 'opacity-100' : 'opacity-0',
      )}
    >
      <div
        className="flex items-center gap-3 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={lineStyle(0)}
      >
        <span className="grid size-9 shrink-0 place-items-center rounded-ds-full bg-ds-emerald-muted">
          <CheckMark className="size-4 text-ds-emerald-foreground" />
        </span>
        <p className="text-sm font-semibold text-ds-foreground">{confirmation.title}</p>
      </div>

      <ul className="flex flex-col gap-1.5">
        {confirmation.lines.map((line, index) => (
          <li
            key={line}
            className="rounded-ds-md border border-ds-border bg-ds-background px-2.5 py-1.5 text-[11px] text-ds-foreground transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={lineStyle(index + 1)}
          >
            {line}
          </li>
        ))}
      </ul>
    </div>
  );
};

export const FamilyCheckoutDemo = (props: FamilyCheckoutDemoProps) => {
  // Seeded at the finished state so a reduced-motion visitor, for whom the
  // machine never starts, sees the confirmation.
  const [phase, setPhase] = useState<Phase>('idle');
  /** Stops clicked so far; both checkboxes derive from it. */
  const [completed, setCompleted] = useState(ALL_DONE);
  const [confirmedIn, setConfirmedIn] = useState(true);
  const [clicking, setClicking] = useState(false);
  const [cursor, setCursor] = useState<DemoPoint | null>(null);
  /** Mirrors `stopRef` for render; the ref is what the driver effect reads. */
  const [stop, setStop] = useState(0);

  const rootRef = useRef<HTMLDivElement>(null);
  const stopRef = useRef(0);
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
            stopRef.current = 0;
            setStop(0);
            setCompleted(0);
            setConfirmedIn(false);
            setClicking(false);
            const frame = rootRef.current?.getBoundingClientRect();
            setCursor(frame ? { x: frame.width * 0.84, y: frame.height * 0.92 } : null);
          }, RESET_MS),
          setTimeout(() => {
            setPhase('moving');
          }, INTRO_MS),
        );
      } else if (phase === 'moving') {
        timers.push(
          setTimeout(() => {
            const root = rootRef.current;
            setCursor(centerOf(root, stopEl(root, stopRef.current)));
          }, FRAME_MS),
          setTimeout(() => {
            setPhase('clicking');
          }, MOVE_MS),
        );
      } else if (phase === 'clicking') {
        const currentStop = stopRef.current;
        timers.push(
          setTimeout(() => {
            setClicking(true);
          }, FRAME_MS),
          setTimeout(() => {
            setClicking(false);
            setCompleted(currentStop + 1);
          }, FRAME_MS + CLICK_MS),
          setTimeout(
            () => {
              if (currentStop < LAST_STOP) {
                stopRef.current = currentStop + 1;
                setStop(currentStop + 1);
                setPhase('moving');
              } else {
                setPhase('submitting');
              }
            },
            FRAME_MS + CLICK_MS + SETTLE_MS,
          ),
        );
      } else if (phase === 'submitting') {
        timers.push(
          setTimeout(() => {
            setPhase('confirmed');
          }, SUBMIT_MS),
        );
      } else if (phase === 'confirmed') {
        timers.push(
          setTimeout(() => {
            setConfirmedIn(true);
          }, FRAME_MS),
          setTimeout(
            () => {
              setPhase('exiting');
            },
            FRAME_MS + STREAM_MS + FINAL_HOLD_MS,
          ),
        );
      } else if (phase === 'exiting') {
        timers.push(
          setTimeout(() => {
            setConfirmedIn(false);
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

  const done = DONE_PHASES.has(phase);

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
      <RegistrationForm
        participantChecked={completed > 0}
        waiverChecked={completed > 1}
        submitting={phase === 'submitting'}
        done={done}
        clickTarget={clicking ? stop : null}
      />

      <ConfirmationCard visible={done} streamedIn={confirmedIn} leaving={phase === 'exiting'} />

      <DemoCursor point={cursor} visible={CURSOR_PHASES.has(phase)} clicking={clicking} />
    </div>
  );
};
