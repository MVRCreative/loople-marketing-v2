---
name: self-playing-demos
description: Build self-playing, looped "product demo" animations — a close-up of one Loople feature using itself (a form fills, a faux cursor clicks, a broadcast sends, a roster streams in), then resets and loops. Use whenever creating or editing an interactive feature demo, a fake-typing/fake-cursor sequence, a streamed-result reveal, an animated state-machine UI vignette, or any "show the product in motion" graphic for a Loople feature panel. Demos live in src/components/home/demos/ and slot into the feature media frame rendered by FeatureMedia. This is the motion layer that sits on top of the static media covered by MediaPlaceholder and the product videos in public/assets/videos.
---

# Self-Playing Demos

This skill is the rulebook for the site's **self-playing product demos** — small, looped, hands-free animations that show **one** Loople feature using itself. The visitor watches the product do something real (a registration form fills itself, a cursor clicks Send, a broadcast lands on the right groups, a family account expands), then it resets and plays again.

The canonical reference implementation is **`src/components/home/demos/RolesAccessDemo.tsx`** (the "Roles & access" sub-feature of Community Management). Read it before building a new one — every pattern below is drawn from it. Treat it as the template; new demos should feel like siblings, not strangers. Put them in `src/components/home/demos/` named `<Feature>Demo.tsx` (e.g. `BroadcastsDemo.tsx`, `FamilyCheckoutDemo.tsx`), one file per feature, named export only, and register them in `src/components/home/demos/index.ts`.

`RolesAccessDemo` is the **multi-state navigation** variant: a faux cursor tours three tabs and each click rewrites the list beneath it. Read it when your demo is "switch between a few views."

**`src/components/home/demos/MemberDirectoryDemo.tsx`** (the "Member directory" sub-feature) is the second reference — the **typing** variant: `idle → typing → moving → opening → holding → exiting`. Read it when your demo is "type something, then act on the result." It shows the self-typing effect, live filtering driven straight off the typed string (no extra state), the `0fr`/`1fr` grid trick for collapsing rows without layout thrash, and the `motion-reduce:` approach to pinning the resting frame.

**`src/components/home/demos/FamilyCheckoutDemo.tsx`** is the **form** variant: the cursor makes several stops in one dialog (check a participant, accept the waiver, submit), the button spins, and a confirmation replaces the form. Read it when the demo is "fill something in and submit it," and for three patterns worth copying:

- **Stop index in a ref, mirrored into state for render.** Reading `ref.current` during render trips the `Refs` lint rule, so the effect reads the ref and the JSX reads the mirror.
- **One `completed` counter instead of a flag per control.** Each click bumps it and every checkbox derives from it, which keeps the reset to a single `setCompleted(0)`.
- **Stops marked in the markup** with `data-demo-stop="N"` and found by `querySelector` inside the effect, rather than refs threaded through props. Passing a ref object as a prop makes the compiler treat the whole `props` object as a ref and fails the same lint rule.

**`src/components/home/demos/ProgramSetupDemo.tsx`** is its counterpart, and the reference for a **paired** demo: two sub-features side by side that tell one story in order (an admin publishes a program; a family registers for it). When a feature has two audiences, two square demos in the sub-feature grid read better than one wide demo trying to hold both.

All four use **`DemoCursor`** (`src/components/home/demos/DemoCursor.tsx`) — the shared faux pointer. Never re-implement the arrow, the glide transition, or the click ripple; import it and feed it a measured point.

## Where this sits

- **`src/components/home/MediaPlaceholder.tsx`** is the dashed neutral box that holds a feature's media slot until a real asset lands. A demo is one of the things that can replace it.
- **`src/components/home/FeatureMedia.tsx`** is the slot itself — it renders a `videoSrc` when present, otherwise the placeholder. A demo is the third branch.
- **This skill** is the *motion* layer: when a feature's media should come alive and demonstrate itself on a loop instead of being a screenshot or an mp4.
- **`src/lib/animations.ts`** (GSAP + ScrollTrigger, via `RevealHeading` / `RevealLines` / `Stagger`) is the general scroll-reveal layer for page content. These demos deliberately **do not** use GSAP — they're hand-driven with React state + CSS transitions, because the choreography is a timed state machine, not a scroll response. Don't reach for GSAP or ScrollTrigger inside a demo.

Also honor the house style in `.cursor/rules/designer-profile.mdc`: the product is the hero, one primary action per view, real UI over decoration, generous breathing room.

## The non-negotiables

1. **One feature, no app chrome.** A demo shows a single capability in close-up — no sidebar, no window frame, no nav. It's a feature in use, not a screenshot of the whole app.
2. **It plays itself, on a loop, forever.** No user input, no hover-to-start, no scroll trigger. It autoplays and resets cleanly. The crossfade back to the start must be smooth, not a hard cut. **Hold the final/resting frame for at most ~2.5 seconds before looping** — long enough to read the payoff, short enough that it never feels stalled. **Then exit with a gentle fade, never a hard cut.** How you fade depends on the demo: a **multi-screen / multi-element** demo (a roster streamed row by row, several cards, distinct stages — e.g. Broadcasts, Online Registration) should **stagger the exit**, elements leaving one by one a beat apart (reverse order, or draining the way they filled). A **single-screen** demo (one cohesive panel — e.g. a family account card) should fade out as **one unit** — a per-element reverse drain on a single screen looks fussy and weird. Match the exit to the shape of the demo.
3. **It is a state machine.** Model the demo as a small set of named phases (`'idle' | 'typing' | 'moving' | 'result'`), driven by `setTimeout`. Never animate by chaining raw timeouts ad-hoc — each phase owns its transitions and cleans them up.
4. **Reduced motion jumps to the resting end-state.** `prefers-reduced-motion: reduce` skips all animation and shows the *finished* frame statically. Always implement this. (`src/styles/global.css` already forces `transition-duration: 0.001ms` under reduce, so a demo that ignores this will snap through its phases at full speed — the guard is not optional.) When the loop *starts* on the finished frame the initial state is enough; when it starts somewhere else (an empty search, a blank form), pin the finished layer with `motion-reduce:opacity-100` / `motion-reduce:opacity-0` classes. Drive those layers with Tailwind classes rather than inline `style` opacity, or the inline value wins and the variant never applies.
5. **Real measurement, not magic numbers.** Anything a faux cursor points at must be measured from the **real DOM element** (`getBoundingClientRect`), so it stays accurate at any container size. Never hard-code pixel targets.
6. **Grounded, specific content.** The demo works with real-looking community data — a named club, a real program name, actual counts and dollar amounts ("Northside Wrestling Club", "Fall Youth Soccer · 84 registered", "$120 · paid in full") — never lorem or vague filler. Specificity is what makes it read as a real product. Match the plain, outcome-first voice already in `src/data/feature-index.ts`.
7. **Cheap to run.** CSS transitions over JS tweening, no `requestAnimationFrame` unless there is genuinely no alternative, no canvas, no per-frame allocation. These render inside long scrolling sections and must not jank on a mid-tier Android.
8. **Themed via tokens, correct in both modes.** Loople ships light **and** dark (`[data-theme="dark"]` on `<html>`). Every surface, border, and text color must come from a `--ds-*` token (`bg-ds-card`, `border-ds-border`, `text-ds-muted-foreground`, `bg-ds-surface`) so the demo flips with the theme. **Never hard-code a hex.** Verify both themes before you call it done.
9. **Vertically centered, evenly padded.** The demo fills a fixed-aspect media frame, so center the content block as a whole rather than letting it stick to the top — and keep comfortable, balanced padding on **all four sides**. Use `flex flex-col justify-center` on the fill container; do **not** give an inner block `flex-1` to stretch it (that pins the header to the top and kills the centering). Pad with at least `px-6 py-5` (`sm:px-8 sm:py-6`). The content should read as a poised card with air around it at any size, not a form crammed against the edges.

## Anatomy of a demo

### 1. The media frame contract

Demos are dropped into the same slot as a video or placeholder: a box with a fixed `aspectRatio` (`758 / 633` for a primary feature, `1 / 1` for a sub-feature) and a caller-supplied `className`. Take those as props and fill the frame absolutely — **never assume fixed pixel dimensions**:

```tsx
'use client';

export type BroadcastsDemoProps = {
  /** CSS aspect-ratio value, e.g. "758 / 633". */
  aspectRatio: string;
  className?: string;
};

export const BroadcastsDemo = (props: BroadcastsDemoProps) => (
  <div
    ref={rootRef}
    className={cn('relative w-full overflow-hidden bg-ds-card', props.className)}
    style={{ aspectRatio: props.aspectRatio }}
  >
    <div className="absolute inset-0 flex flex-col justify-center px-6 py-5 sm:px-8 sm:py-6">
      {/* both states, stacked */}
    </div>
  </div>
);
```

Wire it up by adding a `demo` key to the feature in `src/data/feature-index.ts` and a `FEATURE_DEMOS` map (id → component) that `FeatureMedia` checks **before** `videoSrc` and the placeholder. That map is where a finished demo gets dropped onto its feature panel.

### 2. Phase state machine

Define the phases as a union type and drive them from a single effect keyed on `phase`. (`AGENTS.md` says avoid `useEffect` — a timed loop is the documented exception; keep the effects to the two below.)

**Never call `setState` synchronously in the effect body** — the react-compiler lint rule `EffectSetState` fails on it. Every state change belongs inside a `setTimeout`, even the phase's opening move, which gets a one-frame delay so CSS transitions interpolate from the current value instead of jumping. Push each phase's timers in **one** `timers.push(...)` call (`prefer-single-call`), and give every arrow a braced body (`no-confusing-void-expression`).

```tsx
type Phase = 'idle' | 'typing' | 'moving' | 'result';
const [phase, setPhase] = useState<Phase>('idle');

useEffect(() => {
  const timers: ReturnType<typeof setTimeout>[] = [];
  if (!reducedRef.current) {
    if (phase === 'idle') {
      timers.push(
        // reset all sub-state, park the cursor…
        setTimeout(() => {
          setResultIn(false);
        }, RESET_MS),
        setTimeout(() => {
          setPhase('typing');
        }, INTRO_MS),
      );
    } else if (phase === 'moving') {
      // measure the real target, move cursor, schedule click + handoff
    } else if (phase === 'result') {
      // loop back: stream time + a SHORT hold. Keep the resting hold <= ~2s.
      timers.push(
        setTimeout(() => {
          setResultIn(true);
        }, FRAME_MS),
        setTimeout(() => {
          setPhase('idle');
        }, FRAME_MS + STREAM_MS + FINAL_HOLD_MS),
      );
    }
  }
  // Single return keeps `consistent-return` happy, and ALWAYS cleans up.
  return () => {
    for (const timer of timers) {
      clearTimeout(timer);
    }
  };
}, [phase]);
```

Rules:
- **The effect always returns its cleanup.** Guard reduced motion with an `if` around the body rather than an early `return`, so there's exactly one return path.
- The `'idle'` branch is also the **reset**: clear typed text, hide the result, un-click, park the cursor. Looping is just `setPhase('idle')` again.
- Keep the per-phase timings as named, readable constants of intent (typing speed `46`ms/char, click after `640`ms, hold the result ~`1800`ms before looping).
- Keep `step`-style counters in a **ref** mirrored to state, and depend only on `[phase]`. If the driver effect depends on the step too, changing the step mid-phase tears down its own pending timers and the loop stalls.
- Read reduced motion once into a ref on mount, the way `ThemeToggle` and `SmoothScroll` do it: `window.matchMedia('(prefers-reduced-motion: reduce)').matches`, guarded for SSR. Declare that effect **before** the driver effect so the ref is resolved first.
- Start the visible state at "filled" (`useState(true)`) so SSR, no-JS, and reduced motion all paint the resting frame, and use a `startedRef` so the first loop doesn't re-hide it and flash.

### 3. Self-typing

A second effect keyed on `[phase, typed]` appends one character per tick, then hands off to the next phase when the string is complete. Same shape as the driver — guard with an `if`, push once, return one cleanup:

```tsx
useEffect(() => {
  const timers: ReturnType<typeof setTimeout>[] = [];
  if (!reducedRef.current && phase === 'typing') {
    timers.push(
      typed.length >= QUERY.length
        ? setTimeout(() => {
            setPhase('moving');
          }, TYPED_SETTLE_MS)
        : setTimeout(() => {
            setTyped(QUERY.slice(0, typed.length + 1));
          }, TYPE_MS),
    );
  }
  return () => {
    for (const timer of timers) {
      clearTimeout(timer);
    }
  };
}, [phase, typed]);
```

Pair it with a blinking caret (a thin `animate-pulse` `bg-ds-brand` bar) shown only while typing. ~150ms per character reads as deliberate typing; 46ms reads as a machine.

**Derive the consequence, don't store it.** If typing filters a list, compute the match off `typed` during render — never mirror it into another state. Collapse the non-matching rows with the grid trick so nothing jumps: wrap each row in `grid` with `gridTemplateRows: match ? '1fr' : '0fr'` over an `overflow-hidden` inner div, and put the row's spacing *inside* that inner div so collapsed rows contribute zero height.

### 4. Faux cursor (measured, not guessed)

Render `<DemoCursor point={cursor} visible={cursorVisible} clicking={clicking} />` — it owns the arrow, the eased glide, the scale-down, and the click ripple. Your job is only to feed it a point measured **relative to the demo root**:

```tsx
const centerOf = (el: HTMLElement | null): DemoPoint | null => {
  const root = rootRef.current;
  if (!(root && el)) return null;
  const box = el.getBoundingClientRect();
  const frame = root.getBoundingClientRect();
  return {
    x: box.left - frame.left + box.width / 2,
    y: box.top - frame.top + box.height / 2,
  };
};
```

- Put a `ref` on the **real element** the cursor targets — the button, the tab, the row. Measure it on entering the `moving` phase; never hard-code.
- Park the cursor off to one side on reset (`{ x: width * 0.8, y: height * 0.88 }` from the root's own box) so it doesn't teleport across the panel when the loop wraps.
- **Click feedback is a pair**: `DemoCursor` handles the cursor half, and the *target* gets the other half — a `ring-2 ring-ds-primary/40` while `clicking` is true.
- Show the cursor only during the phases where it's acting (`moving`/`opening`); fade it out otherwise via `visible`.

### 5. Two cross-faded states (before ↔ after)

Don't unmount/remount between the input state and the result state — render **both**, absolutely positioned and stacked, and cross-fade with opacity:

```tsx
<div style={{ opacity: done ? 0 : 1 }}>…input state…</div>
<div style={{ opacity: done ? 1 : 0 }}>…result state…</div>
```

Use a slow (~800ms) `cubic-bezier(0.4,0,0.2,1)` opacity transition so the loop's wrap-around is a soft dissolve.

**Accessibility:** put `aria-hidden="true"` on the demo root and nothing else. The panel is a decorative motion graphic whose meaning is already carried by the card's real title and description, and hiding the whole thing keeps a screen reader from narrating a UI that rewrites itself every two seconds. Don't add `role="img"` (the `prefer-tag-over-role` lint rule rejects it on a `div`), and don't render fake `<button>`s for things the cursor "clicks" — use `<span>`s, so no dead keyboard stops appear in the tab order.

### 6. Streamed-in result (per-line reveal)

The result doesn't pop in — each row eases up a beat after the previous, like a list filling. Drive it with **one** boolean (`resultIn`) plus the phase, and let the *delay direction* encode whether the lines are filling or draining. Do **not** add a separate `exiting` flag that the layer reads directly: when that flag flips back on reset, every line snaps to visible in one frame — the exact hard cut rule 2 forbids.

```tsx
const leaving = phase === 'exiting';

const lineStyle = (i: number) => {
  if (resultIn) {
    return { transitionDelay: `${i * 110}ms`, opacity: 1, transform: 'translateY(0)' };
  }
  return {
    transitionDelay: leaving ? `${(LINE_COUNT - 1 - i) * 90}ms` : '0ms',
    opacity: 0,
    transform: leaving ? 'translateY(-4px)' : 'translateY(6px)',
  };
};
```

Because `opacity` is 0 whenever `resultIn` is false, the wrap from `exiting` back to `idle` changes only the delay — nothing flashes. Apply `style={lineStyle(n)}` with an increasing `n` down the content, each element using `transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]`. Give the surrounding chrome (header, tabs) its own boolean on the same pattern so it can leave a beat after the lines. Add a `linear-gradient` mask on the scroll container so long lists fade at the bottom edge instead of hard-clipping.

### 7. The Loople mark and other brand furniture

If a demo needs the brand mark (an avatar on a broadcast, a sender chip, an empty state), use the real asset via `next/image` — `/assets/images/loople-mark.png`, or `loople-mark-white.png` on dark surfaces — at an explicit width/height so nothing shifts. **Do not build a canvas or CSS recreation of the logo.** Accent color budget per demo: `ds-brand` for identity and labels, `ds-primary` (the cyan pill) for the single primary action, and one soft pill family (`ds-coral-*`, `ds-amber-*`, `ds-emerald-*`, `ds-violet-*`) matching the feature's `eyebrowTone`. Nothing else.

## Match the product

A demo is a claim about how Loople works, so open the app before inventing UI. The product monorepo lives at **`~/Developer/loople`** (`MVRCreative/loople`):

- **`docs/design-system/DESIGN_LANGUAGE.md`** — surfaces, typography, color roles, motion, and the "states are the feature" rule. Read it first.
- **`packages/tokens/src/`** → **`packages/tokens/dist/tokens.css`** — the app's real token values. Note the contract differs from this repo: the app uses shadcn naming with three-value accent families (`accent-coral` / `-light` / `-foreground`), while marketing flattens them to `--ds-*` two-value pairs. Map deliberately; don't invent a token to close the gap.
- **`apps/web/components/ui/`** — the shipped primitives (`badge`, `card`, `button`, `avatar`, `switch`) to echo in markup and proportion.
- **`apps/web/components/`** — the feature UI itself: `broadcast-feed-card.tsx` and `compose-dialog.tsx` for Broadcasts, `program-registration-dialog.tsx` for registration, `family/` for family accounts, `home-feed.tsx` + `post-card.tsx` for the newsfeed, `admin/` for anything management-side.
- **`apps/web/app/design/page.tsx`** — a live gallery of the whole system; run it and screenshot the target before building.

Take the **names and rules** from the app, not just the pixels: `RolesAccessDemo` uses `owner | admin | member` because that's the real enum in `packages/shared/src/schemas/organization.ts`, and it locks "Owner role & transfer" for admins because `admin-member-detail.tsx` genuinely disables those controls on the owner. A demo that shows a permission the product doesn't have is a bug, not a liberty.

## Building a new demo — checklist

1. **Pick one feature** and the single thing it should be seen doing (fill→register, type→send, select→filter, tap→RSVP). One verb.
2. **Write the phase union** for that verb. Most demos are `idle → act → (move/click) → result → idle`.
3. **Mark `'use client'`**, set up `rootRef` + refs on every element the cursor (or a measured highlight) targets.
4. **Implement the phase-driver effect** with full timer cleanup; make `idle` the reset.
5. **Add the reduced-motion early-out** that paints the finished state.
6. **Cross-fade** the before/after layers; never remount.
7. **Stream the result** in line-by-line with the `line(i)` delay helper.
8. **Ground the content** in specific, real-looking community data, kept as constants in `src/data/` next to the feature copy.
9. **Stay on tokens**: `--ds-*` only, no raw hex. The working palette is brand blue for identity (avatars, names, org chrome), the cyan `ds-primary` for the one action and its checked/ring states, `ds-emerald-*` for success and confirmation, and neutral `ds-muted*` for everything else. Reach for the feature's `eyebrowTone` family only when the demo genuinely needs a categorical pill.
10. **Size-agnostic**: it's handed an `aspectRatio` + `className` and dropped into a media frame — never assume fixed dimensions. Measure, use `%`/`max-w-*`, and re-measure on the fly.
11. **Center it, pad it**: wrap content in `flex flex-col justify-center` with balanced four-side padding (`px-6 py-5` / `sm:px-8 sm:py-6`); never stretch an inner block with `flex-1`. The block should sit centered with air around it.
12. **Check both themes and 375/768/1440 widths**, plus reduced motion.
13. **Smoke-test it**: add a case to `tests/e2e/Sanity.check.e2e.ts` that scrolls the demo into view and waits for a string only the *later* phases render — that asserts the loop actually advances, not just that the component mounted.
14. **Document it**: note what the demo shows and where it lives in `README.md`.

## Pitfalls

- **Leaked timers / stuck loop** — forgetting a cleanup return makes phases double-fire after the loop wraps or the component unmounts. Always clear.
- **A driver effect that depends on its own counter** — `[phase, step]` means advancing the step tears down the timers that phase just scheduled. Depend on `[phase]` and read the step from a ref.
- **Flash on the loop wrap** — a dedicated `exiting` flag that the render reads directly snaps everything back to visible the instant the phase resets. Encode the exit as a delay direction on the same visibility boolean instead.
- **`setState` in the effect body** — fails the `EffectSetState` lint rule. Defer every state change into a timer, using a one-frame delay for a phase's opening move.
- **Truncated copy** — these panels are small and the text is `truncate`d; a summary that fits in review can clip at another breakpoint. Keep demo strings short and check the rendered panel, not the source string.
- **Hard-coded cursor targets** — they drift the moment the container resizes. Measure from the real element every time you enter the `moving` phase.
- **Remounting between states** — causes a flash and re-runs the effects. Keep both states mounted, toggle opacity.
- **GSAP for choreography** — fights the timed state machine, and ScrollTrigger will pause/restart it unpredictably inside a long page. Use plain state + CSS transitions here.
- **Hard-coded colors** — a hex that looks right in light mode breaks the moment `[data-theme="dark"]` flips. Tokens only.
- **Generic content** — instantly reads as fake. Use a named club, a real program, real counts.
- **Accent everywhere** — breaks the brand. Brand blue for identity, the cyan pill for one action, emerald for success. That's the budget.
- **Reading a ref during render** — the `Refs` lint rule rejects `stopRef.current` in JSX. Keep the ref for the effect and mirror it into state for rendering.
- **Inventing product steps** — a wizard where the app has a single form is a false claim about the product. Open the real component (`program-registration-dialog.tsx`, etc.) and mirror its actual shape and strings.
- **Canvas / rAF for decoration** — unjustified cost in a scrolling marketing page. CSS transitions unless there is no alternative.
- **Content stuck to the top / cramped edges** — caused by an inner block with `flex-1` stretching to fill, which pins the header up top. Use `justify-center` on the fill container and let the block size to its content, with even four-side padding.
- **Hard-cut loop** — snapping the whole finished frame to empty in one frame reads as a glitch. Hold ≤2.5s, then fade out before resetting: stagger the elements for a multi-screen/multi-element demo, or fade the panel as one unit for a single-screen demo.
- **Staggered exit on a single screen** — a per-element reverse drain only suits demos with multiple stages/elements. On one cohesive panel it looks fussy; fade the whole thing together instead.
