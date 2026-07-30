'use client';

/**
 * NewsfeedDemo — self-playing vignette for the Centralized Newsfeed feature.
 *
 * The widest demo on the page, and the only one that shows a whole screen
 * rather than a single control: a community rail, the filter bar, and a feed
 * that scrolls on its own. A faux cursor then works it the way a member
 * would — switch the community pill, like a photo post, write a reply.
 *
 * Structure follows the app's web feed: the pill cycles rather than opening a
 * menu, posts carry `@handle` and a compact timestamp with no community line,
 * the action row is Reply / Share / Like / Bookmark with counts only above
 * zero, liking turns the heart `destructive` and filled, and a reply lands
 * optimistically as "Sending" before it settles.
 *
 * Phases: `idle → scrolling → (moving → clicking) × 2 → switching → composing
 * → (moving → clicking) → posted → exiting`. Stops are the pill, the like,
 * the reply, and the composer's submit. Same rules as the other demos — a
 * timed state machine, CSS transitions, no GSAP, every state change deferred
 * into a timer.
 *
 * Under `prefers-reduced-motion: reduce` the machine never starts and state
 * is seeded at its finished values: the community feed, liked, replied.
 */

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { DemoCursor } from '@/components/home/demos/DemoCursor';
import type { DemoPoint } from '@/components/home/demos/DemoCursor';
import type { DemoPost } from '@/data/feature-demos';
import { NEWSFEED_DEMO } from '@/data/feature-demos';
import { cn } from '@/lib/cn';

export type NewsfeedDemoProps = {
  /** CSS aspect-ratio value, e.g. "758 / 633". */
  aspectRatio: string;
  className?: string;
};

type Phase =
  | 'idle'
  | 'scrolling'
  | 'moving'
  | 'clicking'
  | 'switching'
  | 'composing'
  | 'posted'
  | 'exiting';

const { allLabel, railAllLabel, scopes, communities, selectedId, allPosts, communityPosts, reply } =
  NEWSFEED_DEMO;

const selectedCommunity = communities.find((community) => community.id === selectedId);
/** Pill, like, reply, then the composer's submit. */
const LAST_STOP = 3;

const CURSOR_PHASES = new Set<Phase>(['moving', 'clicking']);

/**
 * Phase timings in ms. `FRAME_MS` defers a phase's opening state change to
 * the next frame so CSS transitions interpolate from the current value.
 */
const FRAME_MS = 16;
const RESET_MS = 60;
const INTRO_MS = 800;
const SCROLL_MS = 2000;
/** How far the feed drifts on its own before the cursor takes over. */
const SCROLL_Y = 150;
const MOVE_MS = 600;
const CLICK_MS = 220;
const SETTLE_MS = 320;
const SWAP_FADE_MS = 260;
const SWITCH_MS = SWAP_FADE_MS + 340;
const TYPE_MS = 38;
const TYPED_SETTLE_MS = 260;
const COMPOSE_OPEN_MS = 340;
const COMPOSING_MS = COMPOSE_OPEN_MS + reply.body.length * TYPE_MS + TYPED_SETTLE_MS;
const SENDING_MS = 620;
const FINAL_HOLD_MS = 1500;
const EXIT_MS = 700;

/**
 * Measures an element's centre relative to the demo root.
 *
 * @param root Demo root the cursor is positioned within.
 * @param el Element to aim at.
 * @returns The centre point, or null when the element is absent or hidden.
 */
const centerOf = (root: HTMLElement | null, el: HTMLElement | null) => {
  if (!(root && el)) {
    return null;
  }
  const box = el.getBoundingClientRect();
  if (box.width === 0) {
    return null;
  }
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

/**
 * Formats an action count the way the feed does.
 *
 * @param count Raw count.
 * @returns The count, or an empty string when there is nothing to show.
 */
const formatCount = (count: number) => (count > 0 ? String(count) : '');

const iconProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const;

const ReplyIcon = (props: { className?: string }) => (
  <svg {...iconProps} className={props.className}>
    <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
  </svg>
);

const ShareIcon = (props: { className?: string }) => (
  <svg {...iconProps} className={props.className}>
    <path d="m22 2-7 20-4-9-9-4Z" />
    <path d="M22 2 11 13" />
  </svg>
);

const HeartIcon = (props: { className?: string; filled: boolean }) => (
  <svg {...iconProps} className={props.className} fill={props.filled ? 'currentColor' : 'none'}>
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </svg>
);

const BookmarkIcon = (props: { className?: string }) => (
  <svg {...iconProps} className={props.className}>
    <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
  </svg>
);

const GlobeIcon = (props: { className?: string }) => (
  <svg {...iconProps} className={props.className}>
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const Avatar = (props: { initials: string; small?: boolean }) => (
  <span
    className={cn(
      'grid shrink-0 place-items-center rounded-ds-full bg-ds-brand-muted font-semibold text-ds-brand',
      props.small ? 'size-6 text-[9px]' : 'size-8 text-[10px]',
    )}
  >
    {props.initials}
  </span>
);

// The desktop rail that holds the member's communities.
const CommunityRail = (props: { activeId: string | null }) => (
  <div className="hidden w-[132px] shrink-0 flex-col gap-1 border-r border-ds-border p-3 sm:flex">
    <div
      className={cn(
        'flex items-center gap-2 rounded-ds-md px-2 py-1.5 transition-colors duration-300',
        props.activeId ? 'text-ds-muted-foreground' : 'bg-ds-brand-muted text-ds-brand',
      )}
    >
      <GlobeIcon className="size-4 shrink-0" />
      <span className="truncate text-[11px] font-medium">{railAllLabel}</span>
    </div>
    {communities.map((community) => (
      <div
        key={community.id}
        className={cn(
          'flex items-center gap-2 rounded-ds-md px-2 py-1.5 transition-colors duration-300',
          props.activeId === community.id
            ? 'bg-ds-brand-muted text-ds-brand'
            : 'text-ds-muted-foreground',
        )}
      >
        <span className="grid size-4 shrink-0 place-items-center rounded-ds-sm bg-ds-border/60 text-[7px] font-bold text-ds-foreground">
          {community.initials}
        </span>
        <span className="truncate text-[11px] font-medium">{community.name}</span>
      </div>
    ))}
  </div>
);

// Sticky header: the community pill on the left, scope tabs beside it.
const FilterBar = (props: { label: string; scoped: boolean; targeted: boolean }) => (
  <div className="flex items-center gap-3 border-b border-ds-border px-3 py-2">
    <span
      data-demo-stop="0"
      className={cn(
        'inline-flex max-w-[150px] items-center rounded-ds-full px-2.5 py-1 text-[11px] font-semibold transition-all duration-300',
        props.scoped ? 'bg-ds-brand-muted text-ds-brand' : 'bg-ds-muted text-ds-muted-foreground',
        props.targeted && 'ring-2 ring-ds-primary/40',
      )}
    >
      <span className="truncate">{props.label}</span>
    </span>
    <div className="flex items-center gap-3">
      {scopes.map((scope, index) => (
        <span
          key={scope}
          className={cn(
            'relative pb-0.5 text-[11px]',
            index === 0 ? 'font-semibold text-ds-foreground' : 'text-ds-muted-foreground',
          )}
        >
          {scope}
          {index === 0 ? (
            <span className="absolute inset-x-0 -bottom-0.5 h-0.5 rounded-ds-full bg-ds-brand" />
          ) : null}
        </span>
      ))}
    </div>
  </div>
);

const ActionButton = (props: {
  count: number;
  active?: boolean;
  targeted?: boolean;
  stop?: number;
  children: React.ReactNode;
}) => (
  <span
    data-demo-stop={props.stop}
    className={cn(
      'flex items-center gap-1 rounded-ds-full px-1.5 py-0.5 text-[11px] transition-all duration-200',
      props.active ? 'text-ds-destructive' : 'text-ds-muted-foreground',
      props.targeted && 'ring-2 ring-ds-primary/40',
    )}
  >
    {props.children}
    {formatCount(props.count)}
  </span>
);

// One post card, matching the app's web layout.
const FeedPost = (props: {
  post: DemoPost;
  /** Only the cursor's target post carries stop markers and live counts. */
  target: boolean;
  liked: boolean;
  replied: boolean;
  sending: boolean;
  clickTarget: number | null;
}) => (
  <article className="flex gap-2.5 rounded-ds-lg bg-ds-card px-3 py-2.5">
    <Avatar initials={props.post.initials} />
    <div className="min-w-0 flex-1">
      <div className="flex items-center gap-1">
        <span className="truncate text-[12px] font-bold text-ds-foreground">
          {props.post.author}
        </span>
        <span className="truncate text-[11px] text-ds-muted-foreground">@{props.post.handle}</span>
        <span className="text-[11px] text-ds-muted-foreground">·</span>
        <span className="text-[11px] whitespace-nowrap text-ds-muted-foreground">
          {props.post.time}
        </span>
      </div>

      <p className="mt-0.5 text-[12px] leading-relaxed text-ds-foreground">{props.post.body}</p>

      {props.post.photo ? (
        <div className="relative mt-2 aspect-[16/9] w-full overflow-hidden rounded-ds-lg border border-ds-border">
          <Image
            src={props.post.photo}
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, 480px"
            className="object-cover"
          />
        </div>
      ) : null}

      <div className="mt-1 -ml-1.5 flex items-center gap-4">
        <ActionButton
          count={props.post.replies + (props.replied ? 1 : 0)}
          targeted={props.target && props.clickTarget === 2}
          stop={props.target ? 2 : undefined}
        >
          <ReplyIcon className="size-3.5" />
        </ActionButton>
        <ActionButton count={props.post.shares}>
          <ShareIcon className="size-3.5" />
        </ActionButton>
        <ActionButton
          count={props.post.likes + (props.liked ? 1 : 0)}
          active={props.liked}
          targeted={props.target && props.clickTarget === 1}
          stop={props.target ? 1 : undefined}
        >
          <HeartIcon className="size-3.5" filled={props.liked} />
        </ActionButton>
        <span className="ml-auto text-ds-muted-foreground">
          <BookmarkIcon className="size-3.5" />
        </span>
      </div>

      <div
        className="grid transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          gridTemplateRows: props.replied ? '1fr' : '0fr',
          opacity: props.replied ? 1 : 0,
        }}
      >
        <div className="overflow-hidden">
          <div className="mt-2 flex gap-2 rounded-ds-lg bg-ds-muted/50 px-2.5 py-1.5">
            <Avatar initials={reply.initials} small />
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="truncate text-[11px] font-semibold text-ds-foreground">
                  {reply.author}
                </span>
                <span className="text-[10px] text-ds-muted-foreground">
                  {props.sending ? reply.sendingLabel : reply.time}
                </span>
              </div>
              <p className="text-[11px] leading-relaxed text-ds-foreground">{reply.body}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </article>
);

// The reply dialog, opened by the Reply action.
const ReplyComposer = (props: { open: boolean; typed: number; targeted: boolean }) => (
  <div
    className={cn(
      'absolute inset-0 z-[1] flex items-center justify-center bg-ds-foreground/20 p-6 transition-opacity duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]',
      props.open ? 'opacity-100' : 'pointer-events-none opacity-0',
    )}
  >
    <div
      className={cn(
        'flex w-full max-w-[300px] flex-col gap-2 rounded-ds-xl border border-ds-border bg-ds-card p-3 shadow-ds-lg transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
        props.open ? 'translate-y-0' : 'translate-y-2',
      )}
    >
      <p className="text-[11px] text-ds-muted-foreground">{reply.replyingTo}</p>
      <div className="flex gap-2">
        <Avatar initials={reply.initials} small />
        <div className="flex min-h-[38px] flex-1 items-start pt-0.5">
          {props.typed > 0 ? (
            <p className="text-[12px] leading-relaxed text-ds-foreground">
              {reply.body.slice(0, props.typed)}
              <span className="ml-px inline-block h-3 w-px translate-y-0.5 bg-ds-primary" />
            </p>
          ) : (
            <p className="text-[12px] text-ds-muted-foreground">{reply.placeholder}</p>
          )}
        </div>
      </div>
      <span
        data-demo-stop="3"
        className={cn(
          'self-end rounded-ds-full bg-ds-primary px-3 py-1 text-[11px] font-bold text-ds-primary-foreground transition-all duration-200',
          props.typed > 0 ? 'opacity-100' : 'opacity-50',
          props.targeted && 'ring-2 ring-ds-primary/40',
        )}
      >
        {reply.submitLabel}
      </span>
    </div>
  </div>
);

export const NewsfeedDemo = (props: NewsfeedDemoProps) => {
  // Seeded at the finished state so a reduced-motion visitor, for whom the
  // machine never starts, sees the community feed with the reply in place.
  const [phase, setPhase] = useState<Phase>('idle');
  const [scoped, setScoped] = useState(true);
  const [swapping, setSwapping] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [liked, setLiked] = useState(true);
  const [replied, setReplied] = useState(true);
  const [sending, setSending] = useState(false);
  const [composerOpen, setComposerOpen] = useState(false);
  const [typed, setTyped] = useState(reply.body.length);
  const [visible, setVisible] = useState(true);
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

    // Applies a stop's effect on the panel.
    const applyStop = (index: number) => {
      if (index === 0) {
        setSwapping(true);
      } else if (index === 1) {
        setLiked(true);
      } else if (index === 2) {
        setComposerOpen(true);
      } else {
        setComposerOpen(false);
        setReplied(true);
        setSending(true);
      }
    };

    /** Sends the cursor to the next stop. */
    const advance = () => {
      stopRef.current += 1;
      setStop(stopRef.current);
      setPhase('moving');
    };

    // Hands a settled click off to whatever comes next.
    const handOff = (index: number) => {
      if (index === 0) {
        setPhase('switching');
      } else if (index === 2) {
        setPhase('composing');
      } else if (index === LAST_STOP) {
        setPhase('posted');
      } else {
        advance();
      }
    };

    if (!reducedRef.current) {
      if (phase === 'idle') {
        timers.push(
          setTimeout(() => {
            stopRef.current = 0;
            setStop(0);
            setScoped(false);
            // Snaps the feed back to the top while the panel is still faded out.
            setSwapping(true);
            setScrollY(0);
            setLiked(false);
            setReplied(false);
            setSending(false);
            setComposerOpen(false);
            setTyped(0);
            setClicking(false);
            const frame = rootRef.current?.getBoundingClientRect();
            setCursor(frame ? { x: frame.width * 0.9, y: frame.height * 0.94 } : null);
          }, RESET_MS),
          setTimeout(() => {
            setVisible(true);
            setSwapping(false);
          }, RESET_MS + FRAME_MS),
          setTimeout(() => {
            setPhase('scrolling');
          }, INTRO_MS),
        );
      } else if (phase === 'scrolling') {
        timers.push(
          setTimeout(() => {
            setScrollY(SCROLL_Y);
          }, FRAME_MS),
          setTimeout(() => {
            setPhase('moving');
          }, SCROLL_MS),
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
            applyStop(currentStop);
          }, FRAME_MS + CLICK_MS),
          setTimeout(
            () => {
              handOff(currentStop);
            },
            FRAME_MS + CLICK_MS + SETTLE_MS,
          ),
        );
      } else if (phase === 'switching') {
        timers.push(
          setTimeout(() => {
            setScoped(true);
            setScrollY(0);
          }, SWAP_FADE_MS),
          setTimeout(() => {
            setSwapping(false);
          }, SWAP_FADE_MS + FRAME_MS),
          setTimeout(() => {
            advance();
          }, SWITCH_MS),
        );
      } else if (phase === 'composing') {
        for (let count = 1; count <= reply.body.length; count += 1) {
          timers.push(
            setTimeout(
              () => {
                setTyped(count);
              },
              COMPOSE_OPEN_MS + count * TYPE_MS,
            ),
          );
        }
        timers.push(
          setTimeout(() => {
            advance();
          }, COMPOSING_MS),
        );
      } else if (phase === 'posted') {
        timers.push(
          setTimeout(() => {
            setSending(false);
          }, SENDING_MS),
          setTimeout(() => {
            setPhase('exiting');
          }, SENDING_MS + FINAL_HOLD_MS),
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

  const targetPost = scoped ? communityPosts[0] : null;
  const posts = scoped ? communityPosts : allPosts;
  const clickTarget = clicking ? stop : null;

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
          'absolute inset-0 flex overflow-hidden rounded-ds-xl border border-ds-border bg-ds-background transition-opacity duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] motion-reduce:opacity-100',
          visible ? 'opacity-100' : 'opacity-0',
        )}
      >
        <CommunityRail activeId={scoped ? selectedId : null} />

        <div className="relative flex min-w-0 flex-1 flex-col">
          <FilterBar
            label={scoped ? (selectedCommunity?.name ?? allLabel) : allLabel}
            scoped={scoped}
            targeted={clickTarget === 0}
          />

          <div className="relative flex-1 overflow-hidden">
            <div
              className={cn(
                'flex flex-col gap-2 p-3 transition-opacity',
                swapping ? 'opacity-0 duration-200' : 'opacity-100 duration-300',
              )}
              style={{
                transform: `translateY(-${scrollY}px)`,
                transitionProperty: 'opacity, transform',
                transitionDuration: swapping ? '200ms, 0ms' : `300ms, ${SCROLL_MS}ms`,
                transitionTimingFunction: 'ease-out, linear',
              }}
            >
              {posts.map((post) => (
                <FeedPost
                  key={post.id}
                  post={post}
                  target={post.id === targetPost?.id}
                  liked={liked && post.id === targetPost?.id}
                  replied={replied && post.id === targetPost?.id}
                  sending={sending}
                  clickTarget={clickTarget}
                />
              ))}
            </div>
          </div>

          <ReplyComposer open={composerOpen} typed={typed} targeted={clickTarget === 3} />
        </div>
      </div>

      <DemoCursor point={cursor} visible={CURSOR_PHASES.has(phase)} clicking={clicking} />
    </div>
  );
};
