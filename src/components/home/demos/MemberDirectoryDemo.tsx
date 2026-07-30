'use client';

/**
 * MemberDirectoryDemo — self-playing vignette for the "Member directory"
 * sub-feature of Community Management.
 *
 * A search query types itself, the directory narrows live, a faux cursor
 * opens the matching member, and their profile streams in with family
 * connections and program enrollments. Then it drains and loops.
 *
 * The typing variant of the pattern: `idle → typing → moving → opening →
 * holding → exiting`. Same rules as `RolesAccessDemo` — a timed state
 * machine, CSS transitions, no GSAP, and every state change deferred into a
 * timer so the effect body stays free of synchronous `setState`.
 *
 * Under `prefers-reduced-motion: reduce` the machine never starts; the
 * `motion-reduce:` variants below pin the panel to the opened profile so the
 * resting frame is the finished state rather than an empty search.
 */

import { useEffect, useRef, useState } from 'react';
import { DemoCursor } from '@/components/home/demos/DemoCursor';
import type { DemoPoint } from '@/components/home/demos/DemoCursor';
import { MEMBER_DIRECTORY_DEMO } from '@/data/feature-demos';
import { cn } from '@/lib/cn';

export type MemberDirectoryDemoProps = {
  /** CSS aspect-ratio value, e.g. "1 / 1". */
  aspectRatio: string;
  className?: string;
};

type Phase = 'idle' | 'typing' | 'moving' | 'opening' | 'holding' | 'exiting';

const { org, caption, query, members, openedId, profile } = MEMBER_DIRECTORY_DEMO;
const OPENED = members.find((member) => member.id === openedId) ?? members[0];
/** Header + meta, then a title and its entries for each profile section. */
const LINE_COUNT = profile.sections.reduce(
  (total, section) => total + 1 + section.entries.length,
  2,
);
/** Stream index of each section title, so entries can offset from it. */
const SECTION_LINES = profile.sections.map((_section, index) =>
  profile.sections
    .slice(0, index)
    .reduce((total, previous) => total + 1 + previous.entries.length, 2),
);

/**
 * Phase timings in ms. `FRAME_MS` defers a phase's opening state change to
 * the next frame so CSS transitions interpolate from the current value.
 */
const FRAME_MS = 16;
const RESET_MS = 60;
const INTRO_MS = 1100;
const TYPE_MS = 150;
const TYPED_SETTLE_MS = 420;
const MOVE_MS = 620;
const CLICK_MS = 220;
const OPEN_MS = 180;
const ROW_STAGGER_MS = 110;
const STREAM_MS = LINE_COUNT * ROW_STAGGER_MS + 420;
const FINAL_HOLD_MS = 1700;
const ROW_EXIT_STAGGER_MS = 80;
const EXIT_MS = LINE_COUNT * ROW_EXIT_STAGGER_MS + 540;

const SearchIcon = () => (
  <svg viewBox="0 0 16 16" className="size-3.5 shrink-0 text-ds-muted-foreground">
    <circle cx="7" cy="7" r="4.25" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const Avatar = (props: { initials: string; large?: boolean }) => (
  <span
    className={cn(
      'grid shrink-0 place-items-center rounded-ds-full bg-ds-brand-muted font-semibold text-ds-brand',
      props.large ? 'size-9 text-xs' : 'size-7 text-[10px]',
    )}
  >
    {props.initials}
  </span>
);

export const MemberDirectoryDemo = (props: MemberDirectoryDemoProps) => {
  const [phase, setPhase] = useState<Phase>('idle');
  const [typed, setTyped] = useState('');
  const [opened, setOpened] = useState(false);
  const [linesIn, setLinesIn] = useState(true);
  const [clicking, setClicking] = useState(false);
  const [cursor, setCursor] = useState<DemoPoint | null>(null);

  const rootRef = useRef<HTMLDivElement>(null);
  const targetRowRef = useRef<HTMLDivElement>(null);
  const reducedRef = useRef(false);

  // Declared first so the driver effects below see the resolved value.
  useEffect(() => {
    reducedRef.current =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    const parkPoint = (): DemoPoint | null => {
      const frame = rootRef.current?.getBoundingClientRect();
      return frame ? { x: frame.width * 0.82, y: frame.height * 0.9 } : null;
    };

    if (!reducedRef.current) {
      if (phase === 'idle') {
        timers.push(
          setTimeout(() => {
            setTyped('');
            setOpened(false);
            setClicking(false);
            setCursor(parkPoint());
          }, RESET_MS),
          setTimeout(() => {
            setPhase('typing');
          }, INTRO_MS),
        );
      } else if (phase === 'moving') {
        timers.push(
          setTimeout(() => {
            const root = rootRef.current;
            const target = targetRowRef.current;
            if (root && target) {
              const box = target.getBoundingClientRect();
              const frame = root.getBoundingClientRect();
              setCursor({
                x: box.left - frame.left + box.width / 2,
                y: box.top - frame.top + box.height / 2,
              });
            }
          }, FRAME_MS),
          setTimeout(() => {
            setPhase('opening');
          }, MOVE_MS),
        );
      } else if (phase === 'opening') {
        timers.push(
          setTimeout(() => {
            setClicking(true);
            setLinesIn(false);
          }, FRAME_MS),
          setTimeout(() => {
            setClicking(false);
            setOpened(true);
          }, FRAME_MS + CLICK_MS),
          setTimeout(
            () => {
              setLinesIn(true);
            },
            FRAME_MS + CLICK_MS + OPEN_MS,
          ),
          setTimeout(
            () => {
              setPhase('holding');
            },
            FRAME_MS + CLICK_MS + OPEN_MS + STREAM_MS,
          ),
        );
      } else if (phase === 'holding') {
        timers.push(
          setTimeout(() => {
            setPhase('exiting');
          }, FINAL_HOLD_MS),
        );
      } else if (phase === 'exiting') {
        timers.push(
          setTimeout(() => {
            setLinesIn(false);
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

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    if (!reducedRef.current && phase === 'typing') {
      timers.push(
        typed.length >= query.length
          ? setTimeout(() => {
              setPhase('moving');
            }, TYPED_SETTLE_MS)
          : setTimeout(() => {
              setTyped(query.slice(0, typed.length + 1));
            }, TYPE_MS),
      );
    }

    return () => {
      for (const timer of timers) {
        clearTimeout(timer);
      }
    };
  }, [phase, typed]);

  const needle = typed.toLowerCase();
  const isMatch = (name: string) => name.toLowerCase().includes(needle);
  const matchCount = members.filter((member) => isMatch(member.name)).length;
  const cursorVisible = phase === 'moving' || phase === 'opening';
  // The exit drains bottom-up; every other transition fills top-down.
  const leaving = phase === 'exiting';

  const lineStyle = (index: number) => {
    if (linesIn) {
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
      <div
        className={cn(
          'absolute inset-0 flex flex-col justify-center gap-3 px-6 py-5 transition-opacity duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] sm:px-8 sm:py-6',
          opened ? 'opacity-0' : 'opacity-100',
          'motion-reduce:opacity-0',
        )}
      >
        <div>
          <p className="truncate text-sm font-semibold text-ds-foreground">{org}</p>
          <p className="truncate text-xs text-ds-muted-foreground">{caption}</p>
        </div>

        <div className="flex items-center gap-2 rounded-ds-md border border-ds-border bg-ds-background px-2.5 py-2">
          <SearchIcon />
          <span className="text-xs text-ds-foreground">{typed}</span>
          {phase === 'typing' ? <span className="h-3.5 w-px animate-pulse bg-ds-brand" /> : null}
          {typed === '' && phase !== 'typing' ? (
            <span className="text-xs text-ds-muted-foreground">Search members</span>
          ) : null}
        </div>

        <p className="text-[11px] text-ds-muted-foreground">
          {matchCount} of {members.length} members
        </p>

        <ul className="flex flex-col">
          {members.map((member) => {
            const match = isMatch(member.name);
            return (
              <li
                key={member.id}
                className="grid transition-all duration-300 ease-out"
                style={{ gridTemplateRows: match ? '1fr' : '0fr', opacity: match ? 1 : 0 }}
              >
                <div className="overflow-hidden">
                  <div
                    ref={member.id === openedId ? targetRowRef : undefined}
                    className={cn(
                      'mb-1.5 flex items-center gap-2.5 rounded-ds-md border px-2.5 py-1.5 transition-shadow duration-200',
                      clicking && member.id === openedId
                        ? 'border-ds-primary/40 shadow-ds-sm ring-2 ring-ds-primary/40'
                        : 'border-ds-border bg-ds-background',
                    )}
                  >
                    <Avatar initials={member.initials} />
                    <span className="min-w-0">
                      <span className="block truncate text-xs font-medium text-ds-foreground">
                        {member.name}
                      </span>
                      <span className="block truncate text-[10px] text-ds-muted-foreground">
                        {member.meta}
                      </span>
                    </span>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <div
        className={cn(
          'absolute inset-0 flex flex-col justify-center gap-3 px-6 py-5 transition-opacity duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] sm:px-8 sm:py-6',
          opened ? 'opacity-100' : 'opacity-0',
          'motion-reduce:opacity-100',
        )}
      >
        <div
          className="flex items-center gap-3 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={lineStyle(0)}
        >
          <Avatar initials={OPENED.initials} large />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-ds-foreground">{OPENED.name}</p>
            <span className="mt-0.5 inline-flex rounded-ds-full bg-ds-emerald-muted px-1.5 py-0.5 text-[10px] font-semibold text-ds-emerald-foreground">
              {profile.status}
            </span>
          </div>
        </div>

        <p
          className="text-[11px] text-ds-muted-foreground transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={lineStyle(1)}
        >
          {profile.meta}
        </p>

        {profile.sections.map((section, sectionIndex) => {
          const titleIndex = SECTION_LINES[sectionIndex] ?? 2;
          return (
            <div key={section.title} className="flex flex-col gap-1.5">
              <p
                className="text-[10px] font-semibold tracking-wide text-ds-muted-foreground uppercase transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={lineStyle(titleIndex)}
              >
                {section.title}
              </p>
              {section.entries.map((entry, entryIndex) => (
                <div
                  key={entry.label}
                  className="flex items-center justify-between gap-2 rounded-ds-md border border-ds-border bg-ds-background px-2.5 py-1.5 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={lineStyle(titleIndex + 1 + entryIndex)}
                >
                  <span className="truncate text-xs text-ds-foreground">{entry.label}</span>
                  <span className="shrink-0 text-[10px] text-ds-muted-foreground">
                    {entry.detail}
                  </span>
                </div>
              ))}
            </div>
          );
        })}
      </div>

      <DemoCursor point={cursor} visible={cursorVisible} clicking={clicking} />
    </div>
  );
};
