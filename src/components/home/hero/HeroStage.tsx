'use client';

/**
 * HeroStage — borderless phone at the centre of the homepage hero, with
 * product fragments that bounce out to an expanded orbit once on load.
 *
 * No device chrome: the phone is a 9:16 rounded rectangle of real
 * photography. Satellites start collapsed on the phone and spring to rest.
 * Photos keep a slow looping Ken Burns so the stage stays alive after the
 * bounce lands.
 */

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import {
  HeroCheckIcon,
  HeroChevronIcon,
  HeroFloatCard,
  HeroSquircleAvatar,
  HeroTag,
} from '@/components/home/hero/HeroProductBits';
import {
  HERO_ANNOUNCEMENT_MODULE,
  HERO_GOING_AVATARS,
  HERO_GROUPS_MODULE,
  HERO_ORBIT_PHOTO,
  HERO_ORBIT_THUMB,
  HERO_PHONE_CHIPS,
  HERO_PHONE_PHOTO,
  HERO_PHOTO_CAPTION,
  HERO_REGISTER_MODULE,
  HERO_RSVP_MODULE,
  HERO_UPDATES_MODULE,
} from '@/data/hero-modules';
import { cn } from '@/lib/cn';

const FRAME_MS = 16;
const INTRO_MS = 720;

type HeroOrbitProps = {
  out: boolean;
  live: boolean;
  /** Collapsed translate X, relative to the satellite itself. */
  x: string;
  /** Collapsed translate Y, relative to the satellite itself. */
  y: string;
  delay: string;
  className?: string;
  children: React.ReactNode;
};

/**
 * Positions a satellite at its rest slot and drives the bounce between
 * collapsed (on the phone) and expanded (in orbit).
 * @param props Rest slot, collapsed offset, and orbit clock.
 * @returns Absolutely positioned satellite wrapper.
 */
const HeroOrbit = (props: HeroOrbitProps) => (
  <div
    className={cn('absolute', props.className)}
    style={{
      transform: props.out
        ? 'translate(0px, 0px) scale(1)'
        : `translate(${props.x}, ${props.y}) scale(0.36)`,
      opacity: props.out ? 1 : 0,
      transitionProperty: props.live ? 'transform, opacity' : 'none',
      transitionDuration: props.out ? '800ms' : '520ms',
      transitionDelay: props.out && props.live ? props.delay : '0ms',
      transitionTimingFunction: props.out
        ? 'cubic-bezier(0.22, 1.45, 0.36, 1)'
        : 'cubic-bezier(0.4, 0, 1, 1)',
    }}
  >
    {props.children}
  </div>
);

const useHeroOrbit = () => {
  const [out, setOut] = useState(false);
  const [live, setLive] = useState(false);
  const reducedRef = useRef(false);

  useEffect(() => {
    reducedRef.current =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    if (reducedRef.current) {
      timers.push(
        setTimeout(() => {
          setOut(true);
        }, FRAME_MS),
      );
    } else {
      timers.push(
        setTimeout(() => {
          setLive(true);
        }, FRAME_MS),
        setTimeout(() => {
          setOut(true);
        }, INTRO_MS),
      );
    }

    return () => {
      for (const timer of timers) {
        clearTimeout(timer);
      }
    };
  }, []);

  return { out, live };
};

const PhoneScreen = () => (
  <div className="absolute inset-0 overflow-hidden rounded-ds-3xl bg-ds-muted shadow-ds-xl">
    <Image
      src={HERO_PHONE_PHOTO.src}
      alt=""
      fill
      priority
      sizes="(min-width: 1024px) 22rem, (min-width: 640px) 40vw, 60vw"
      className="hero-media-ken-loop object-cover"
    />
    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent px-3 pt-16 pb-3 sm:px-3.5 sm:pb-3.5">
      <div className="rounded-ds-xl bg-ds-card/95 p-3 shadow-ds-md backdrop-blur-[2px]">
        <p className="truncate text-[12px] font-bold text-ds-foreground sm:text-[13px]">
          {HERO_RSVP_MODULE.title}
        </p>
        <div className="mt-2 flex items-center justify-between gap-2">
          <p className="truncate text-[10px] text-ds-muted-foreground sm:text-[11px]">
            {HERO_RSVP_MODULE.time} · {HERO_RSVP_MODULE.goingAfter} going
          </p>
          <span className="inline-flex shrink-0 items-center rounded-ds-full bg-ds-primary px-2.5 py-1 text-[10px] font-bold text-ds-primary-foreground sm:text-[11px]">
            {HERO_RSVP_MODULE.cta}
          </span>
        </div>
      </div>
    </div>
  </div>
);

const GroupsCard = () => (
  <HeroFloatCard className="w-[min(100%,17rem)] px-3.5 py-3 sm:px-4">
    <div className="flex items-center justify-between gap-3">
      <p className="truncate text-[12px] font-semibold text-ds-foreground sm:text-[13px]">
        {HERO_GROUPS_MODULE.title}
      </p>
      <span className="grid size-6 shrink-0 place-items-center rounded-ds-full bg-ds-muted text-ds-muted-foreground">
        <HeroChevronIcon className="size-3.5" />
      </span>
    </div>
    <div className="mt-2 flex flex-wrap gap-1.5">
      {HERO_GROUPS_MODULE.tags.map((tag) => (
        <HeroTag key={tag}>{tag}</HeroTag>
      ))}
    </div>
  </HeroFloatCard>
);

const UpdatesCard = () => (
  <HeroFloatCard className="w-[min(100%,17rem)] px-3.5 py-3 sm:px-4">
    <div className="flex items-center justify-between gap-3">
      <p className="truncate text-[12px] font-semibold text-ds-foreground sm:text-[13px]">
        {HERO_UPDATES_MODULE.title}
      </p>
      <span className="grid size-6 shrink-0 place-items-center rounded-ds-full bg-ds-muted text-ds-muted-foreground">
        <HeroChevronIcon className="size-3.5" />
      </span>
    </div>
    <div className="mt-2 flex flex-wrap gap-1.5">
      {HERO_UPDATES_MODULE.tags.map((tag) => (
        <HeroTag key={tag} tone="emerald">
          {tag}
        </HeroTag>
      ))}
    </div>
  </HeroFloatCard>
);

const RegisterCard = () => (
  <HeroFloatCard className="flex w-[min(100%,11rem)] flex-col items-center gap-2 px-3 py-4 text-center sm:px-4">
    <HeroSquircleAvatar initials={HERO_REGISTER_MODULE.initials} size="lg" />
    <div className="min-w-0">
      <p className="truncate text-[12px] font-bold text-ds-foreground sm:text-[13px]">
        {HERO_REGISTER_MODULE.participant}
      </p>
      <p className="truncate text-[10px] text-ds-muted-foreground sm:text-[11px]">
        {HERO_REGISTER_MODULE.program}
      </p>
    </div>
    <span className="inline-flex items-center gap-1 rounded-ds-full bg-ds-success/15 px-2 py-1 text-[10px] font-semibold text-ds-success sm:text-[11px]">
      <HeroCheckIcon className="size-2.5" />
      {HERO_REGISTER_MODULE.status}
    </span>
  </HeroFloatCard>
);

const AnnouncementAvatar = () => (
  <HeroFloatCard className="flex items-center gap-2.5 p-2 pr-3.5">
    <HeroSquircleAvatar initials={HERO_ANNOUNCEMENT_MODULE.initials} size="lg" />
    <div className="min-w-0">
      <p className="truncate text-[12px] font-bold text-ds-foreground sm:text-[13px]">
        {HERO_ANNOUNCEMENT_MODULE.author}
      </p>
      <p className="truncate text-[10px] text-ds-muted-foreground sm:text-[11px]">
        {HERO_ANNOUNCEMENT_MODULE.tag}
      </p>
    </div>
  </HeroFloatCard>
);

const MembersChip = () => (
  <HeroFloatCard className="flex items-center gap-2 rounded-ds-full px-2.5 py-1.5">
    <span className="flex -space-x-1.5">
      {HERO_GOING_AVATARS.map((person) => (
        <HeroSquircleAvatar
          key={person.initials}
          initials={person.initials}
          size="sm"
          className="ring-2 ring-ds-card"
        />
      ))}
    </span>
    <span className="text-[10px] font-semibold whitespace-nowrap text-ds-foreground sm:text-[11px]">
      {HERO_PHOTO_CAPTION}
    </span>
  </HeroFloatCard>
);

export type HeroStageProps = {
  className?: string;
};

/**
 * Homepage hero visual — phone plus bouncing satellites.
 * @param props Optional className for the stage canvas.
 * @returns Decorative phone stage with a one-shot orbit bounce.
 */
export const HeroStage = (props: HeroStageProps) => {
  const orbit = useHeroOrbit();

  return (
    <div
      aria-hidden="true"
      className={cn(
        'relative mx-auto h-[min(36rem,56svh)] w-full max-w-5xl sm:h-[min(40rem,62svh)] lg:h-[min(44rem,70svh)]',
        props.className,
      )}
    >
      <div className="absolute top-[4%] left-1/2 z-10 w-[56%] -translate-x-1/2 sm:top-[3%] sm:w-[40%] lg:w-[30%]">
        <div className="relative aspect-[9/16]">
          <PhoneScreen />

          <HeroOrbit
            out={orbit.out}
            live={orbit.live}
            x="30%"
            y="40%"
            delay="60ms"
            className="top-[6%] -left-[18%] z-20 sm:-left-[22%]"
          >
            <MembersChip />
          </HeroOrbit>

          <HeroOrbit
            out={orbit.out}
            live={orbit.live}
            x="-24%"
            y="20%"
            delay="140ms"
            className="top-[22%] -right-[8%] z-20 flex flex-col items-end gap-1.5 sm:-right-[14%]"
          >
            {HERO_PHONE_CHIPS.map((chip) => (
              <span
                key={chip}
                className="rounded-ds-full bg-ds-card px-2.5 py-1 text-[10px] font-semibold whitespace-nowrap text-ds-foreground shadow-ds-md sm:text-[11px]"
              >
                {chip}
              </span>
            ))}
          </HeroOrbit>
        </div>
      </div>

      <HeroOrbit
        out={orbit.out}
        live={orbit.live}
        x="110%"
        y="70%"
        delay="0ms"
        className="top-[3%] left-[2%] z-20 hidden w-[22%] sm:block sm:w-[18%] lg:left-[4%] lg:w-[15%]"
      >
        <div className="relative aspect-square overflow-hidden rounded-ds-2xl shadow-ds-lg">
          <Image
            src={HERO_ORBIT_PHOTO.src}
            alt=""
            fill
            sizes="(min-width: 1024px) 10rem, 18vw"
            className="hero-media-ken-loop-alt object-cover"
          />
        </div>
      </HeroOrbit>

      <HeroOrbit
        out={orbit.out}
        live={orbit.live}
        x="80%"
        y="8%"
        delay="90ms"
        className="top-[36%] left-0 z-20 w-[46%] sm:top-[40%] sm:w-[32%] lg:left-[1%] lg:w-[24%]"
      >
        <GroupsCard />
      </HeroOrbit>

      <HeroOrbit
        out={orbit.out}
        live={orbit.live}
        x="130%"
        y="-80%"
        delay="180ms"
        className="top-[74%] left-[4%] z-20 hidden w-[14%] sm:block lg:left-[7%] lg:w-[11%]"
      >
        <div className="relative aspect-square overflow-hidden rounded-ds-2xl shadow-ds-lg">
          <Image
            src={HERO_ORBIT_THUMB.src}
            alt=""
            fill
            sizes="(min-width: 1024px) 7rem, 12vw"
            className="hero-media-ken-loop-thumb object-cover"
          />
        </div>
      </HeroOrbit>

      <HeroOrbit
        out={orbit.out}
        live={orbit.live}
        x="-90%"
        y="80%"
        delay="40ms"
        className="top-[2%] right-[4%] z-20 hidden sm:block lg:right-[7%]"
      >
        <AnnouncementAvatar />
      </HeroOrbit>

      <HeroOrbit
        out={orbit.out}
        live={orbit.live}
        x="-80%"
        y="12%"
        delay="120ms"
        className="top-[32%] right-0 z-20 w-[46%] sm:top-[36%] sm:w-[32%] lg:right-[1%] lg:w-[24%]"
      >
        <UpdatesCard />
      </HeroOrbit>

      <HeroOrbit
        out={orbit.out}
        live={orbit.live}
        x="-70%"
        y="-50%"
        delay="200ms"
        className="top-[62%] right-[1%] z-20 w-[42%] sm:top-[60%] sm:w-[26%] lg:right-[3%] lg:w-[18%]"
      >
        <RegisterCard />
      </HeroOrbit>
    </div>
  );
};
