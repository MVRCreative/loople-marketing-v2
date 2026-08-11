'use client';

/**
 * HeroCollage — the right-side hero visual: a bold geometric poster, not a
 * grid of white UI cards.
 *
 * Four large color shapes are the primary building blocks. Real photography
 * and small Loople UI moments sit *inside* those shapes — a shape is never
 * built from, or filled edge-to-edge by, a plain white card. Two shapes
 * (`b` and `c`) are each built from two same-color pieces placed with a
 * shared, radius-free seam so they read as one stepped/L-shaped silhouette
 * instead of a stack of rectangles; the overall outline is intentionally
 * irregular rather than one rounded box.
 *
 * Layout is done with absolute-positioned percentages inside a fixed-ratio
 * canvas (not CSS grid) so overlap, gaps, and notches stay exact at every
 * size. Motion lives inside the small inset UI cards: one plays its
 * authentic product moment at a time on a shared clock, the rest hold their
 * settled state.
 */

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import {
  HeroBellIcon,
  HeroCheckIcon,
  HeroInsetCard,
  HeroSquircleAvatar,
} from '@/components/home/hero/HeroProductBits';
import {
  HERO_ANNOUNCEMENT_MODULE,
  HERO_PHOTO_CAPTION,
  HERO_REGISTER_MODULE,
  HERO_RSVP_MODULE,
} from '@/data/hero-modules';
import { cn } from '@/lib/cn';

const BEAT_COUNT = 3;
const FRAME_MS = 16;
const INTRO_MS = 1400;
const RESET_MS = 400;
const BEAT_MS = 2800;

// Shared clock: one module index is mid-transition at a time, the rest settled.
const useHeroBeat = () => {
  const [beat, setBeat] = useState(0);
  const [settled, setSettled] = useState(true);
  const startedRef = useRef(false);
  const reducedRef = useRef(false);

  useEffect(() => {
    reducedRef.current =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    if (!reducedRef.current) {
      const resetAt = startedRef.current ? FRAME_MS : INTRO_MS;

      timers.push(
        setTimeout(() => {
          startedRef.current = true;
          setSettled(false);
        }, resetAt),
        setTimeout(() => {
          setSettled(true);
        }, resetAt + RESET_MS),
        setTimeout(() => {
          setBeat((current) => (current + 1) % BEAT_COUNT);
        }, resetAt + BEAT_MS),
      );
    }

    return () => {
      for (const timer of timers) {
        clearTimeout(timer);
      }
    };
  }, [beat]);

  return (index: number) => (index === beat ? settled : true);
};

const shapeBase = 'absolute overflow-hidden';
const ink = 'text-ds-hero-ink';

// Module A — dominant blue shape; photo bleeds edge-to-edge, no card framing.
const PhotoShape = () => (
  <div
    data-hero-tile
    className={cn(shapeBase, 'top-[0%] left-[0%] h-[62%] w-[58%] rounded-ds-3xl bg-ds-primary')}
  >
    <Image
      src="/assets/images/hero-community.jpg"
      alt="Friends high-fiving across a pickleball net on a sunny outdoor court"
      fill
      priority
      sizes="(min-width: 1024px) 23rem, 60vw"
      className="object-cover object-[56%_40%]"
    />
    <div className={cn('absolute inset-x-0 bottom-0 h-[27%] bg-ds-primary px-4 py-2.5', ink)}>
      <p className="text-[11px] font-semibold sm:text-[12px]">{HERO_PHOTO_CAPTION}</p>
    </div>
  </div>
);

// Module B — amber L-shape (main + tab); RSVP moment inset inside the main piece.
const RsvpShape = (props: { active: boolean }) => {
  const going = props.active;
  const count = going ? HERO_RSVP_MODULE.goingAfter : HERO_RSVP_MODULE.goingBefore;

  return (
    <>
      <div
        data-hero-tile
        className={cn(
          shapeBase,
          'top-[0%] left-[60%] h-[40%] w-[40%] rounded-t-ds-3xl rounded-br-ds-3xl bg-ds-hero-amber p-2.5 sm:p-3',
        )}
      >
        <HeroInsetCard className="flex h-full flex-col justify-between p-2.5">
          <div>
            <p className="truncate text-[11px] font-bold text-ds-foreground sm:text-[12px]">
              {HERO_RSVP_MODULE.title}
            </p>
            <p className="mt-0.5 truncate text-[9px] text-ds-muted-foreground sm:text-[10px]">
              {HERO_RSVP_MODULE.time} · <span className="tabular-nums">{count}</span> going
            </p>
          </div>

          <div className="grid grid-cols-3 gap-1">
            {HERO_RSVP_MODULE.options.map((option) => {
              const selected = option === 'Going' && going;
              let label = "Can't";
              if (option === 'Going') {
                label = 'Going';
              } else if (option === 'Maybe') {
                label = 'Maybe';
              }

              return (
                <span
                  key={option}
                  className={cn(
                    'flex items-center justify-center gap-0.5 rounded-ds-md border px-1 py-1 text-[8px] font-medium transition-all duration-300 sm:text-[9px]',
                    selected
                      ? 'border-ds-primary bg-ds-brand-muted text-ds-brand'
                      : 'border-ds-border text-ds-muted-foreground',
                  )}
                >
                  {option === 'Going' ? <HeroCheckIcon className="size-2" /> : null}
                  {label}
                </span>
              );
            })}
          </div>
        </HeroInsetCard>
      </div>

      <div
        aria-hidden="true"
        className={cn(
          shapeBase,
          'top-[40%] left-[60%] h-[16%] w-[24%] rounded-b-ds-3xl bg-ds-hero-amber',
        )}
      >
        <span
          className={cn(
            'absolute top-1/2 left-1/2 grid size-7 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-ds-full bg-ds-card shadow-ds-sm transition-transform duration-300',
            going ? 'scale-100' : 'scale-90',
          )}
        >
          <HeroCheckIcon
            className={cn('size-3.5', going ? 'text-ds-brand' : 'text-ds-muted-foreground')}
          />
        </span>
      </div>
    </>
  );
};

// Module C — emerald L-shape (tower + main); announcement moment inset inside the main piece.
const AnnouncementShape = (props: { active: boolean }) => (
  <>
    <div
      aria-hidden="true"
      className={cn(
        shapeBase,
        'top-[64%] left-[0%] h-[10%] w-[40%] rounded-t-ds-3xl bg-ds-hero-emerald',
      )}
    >
      <span className="absolute top-1/2 left-3.5 flex -translate-y-1/2 items-center gap-1.5 sm:left-4">
        <span className="grid size-5 place-items-center rounded-ds-full bg-ds-card">
          <HeroBellIcon className="size-3 text-ds-hero-emerald" />
        </span>
        <span className={cn('text-[10px] font-semibold sm:text-[11px]', ink)}>
          {HERO_ANNOUNCEMENT_MODULE.unreadCount} new
        </span>
      </span>
    </div>

    <div
      data-hero-tile
      className={cn(
        shapeBase,
        'top-[74%] left-[0%] h-[26%] w-[70%] rounded-tr-ds-3xl rounded-b-ds-3xl bg-ds-hero-emerald p-2.5 sm:p-3',
      )}
    >
      <HeroInsetCard className="flex h-full items-center gap-2.5 px-3 py-2.5">
        <HeroSquircleAvatar initials={HERO_ANNOUNCEMENT_MODULE.initials} />
        <div
          className={cn(
            'min-w-0 flex-1 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
            props.active ? 'translate-x-0 opacity-100' : '-translate-x-1.5 opacity-60',
          )}
        >
          <p className="truncate text-[11px] font-bold text-ds-foreground sm:text-[12px]">
            {HERO_ANNOUNCEMENT_MODULE.author}{' '}
            <span className="font-normal text-ds-muted-foreground">
              · {HERO_ANNOUNCEMENT_MODULE.tag}
            </span>
          </p>
          <p className="truncate text-[12px] text-ds-foreground sm:text-[13px]">
            {HERO_ANNOUNCEMENT_MODULE.title}
          </p>
        </div>
      </HeroInsetCard>
    </div>
  </>
);

// Module D — small coral shape tucked against Module C; registration moment inset inside.
const RegisterShape = (props: { active: boolean }) => (
  <div
    data-hero-tile
    className={cn(
      shapeBase,
      'top-[60%] left-[71%] h-[40%] w-[29%] rounded-ds-3xl bg-ds-hero-coral p-2.5 sm:p-3',
    )}
  >
    <HeroInsetCard className="flex h-full flex-col items-center justify-center gap-2 px-2 py-3 text-center">
      <HeroSquircleAvatar initials={HERO_REGISTER_MODULE.initials} size="md" />
      <div className="min-w-0">
        <p className="truncate text-[10px] font-bold text-ds-foreground sm:text-[11px]">
          {HERO_REGISTER_MODULE.participant}
        </p>
        <p className="truncate text-[9px] text-ds-muted-foreground sm:text-[10px]">
          {HERO_REGISTER_MODULE.program}
        </p>
      </div>
      <span
        className={cn(
          'flex items-center gap-1 rounded-ds-full px-2 py-1 text-[9px] font-semibold transition-colors duration-300',
          props.active
            ? 'bg-ds-success/15 text-ds-success'
            : 'bg-ds-border/60 text-ds-muted-foreground',
        )}
      >
        <HeroCheckIcon className="size-2.5" />
        Registered
      </span>
    </HeroInsetCard>
  </div>
);

export type HeroCollageProps = {
  className?: string;
};

export const HeroCollage = (props: HeroCollageProps) => {
  const activeAt = useHeroBeat();

  return (
    <div
      aria-hidden="true"
      className={cn(
        'relative mx-auto aspect-[16/15] w-full max-w-sm sm:max-w-md lg:max-w-[40rem]',
        props.className,
      )}
    >
      <PhotoShape />
      <RsvpShape active={activeAt(0)} />
      <AnnouncementShape active={activeAt(2)} />
      <RegisterShape active={activeAt(1)} />
    </div>
  );
};
