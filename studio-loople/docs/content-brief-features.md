# Loople content brief — all platform features

Reference document for authoring Sanity content (feature documents, feature pages, and
resource articles). Grounded in the live marketing site (`src/data/features.ts`) so
Sanity content stays consistent with existing copy, slugs, and tone.

## About Loople

Loople is a community management platform for youth sports leagues, clubs, and
recreational organizations. It brings registration, communication, schedules, payments,
family accounts, and operations into one connected system — replacing the usual mess of
spreadsheets, group texts, email chains, and single-purpose apps.

- Platform tagline: "The system that keeps the whole community moving."
- Two personas: **Organizers** ("Run your community") and **Members** ("For members & families").
- Voice: concise, non-cute, high-trust. Sentence case. Buttons are verbs, headlines are
  outcomes. No jargon, no hype.

### Feature index (canonical order)

| # | Feature | Slug | Persona |
| --- | --- | --- | --- |
| 1 | Community Management | `community-management` | organizers |
| 2 | Online Registration | `online-registration` | organizers |
| 3 | Centralized Newsfeed | `centralized-newsfeed` | members |
| 4 | Broadcasts | `broadcasts` | organizers |
| 5 | Family Accounts | `family-accounts` | members |
| 6 | Programs & Events | `programs-events` | organizers |
| 7 | Mobile Apps | `mobile-apps` | members |
| 8 | App Marketplace | `app-marketplace` | organizers |

---

## Feature 1: Community Management

**Slug:** `community-management` · **Persona:** organizers · **Eyebrow tone:** brand

### Technical brief

Community Management is the operational backbone of Loople — the connected system where
members, roles, programs, payments, and day-to-day admin live together.

- **Roles and access.** Assign roles so coaches, admins, and volunteers see only what they
  need — and nothing they don't. Permissions drive what people can edit, broadcast, or
  register others for.
- **Member directory.** Profiles, family connections, and program enrollments stay
  organized in one searchable directory. Household relationships are first-class, not
  notes in a spreadsheet.
- **Operations hub.** Everyday work — looking someone up, checking enrollment, adjusting
  access — happens without hopping between tools.
- **Source of truth.** Other features (Broadcasts targeting, Registration rosters,
  Programs & Events attendees) read from the same membership graph.

Integration points: Online Registration (rosters land here), Broadcasts (role- and
group-scoped audiences), Programs & Events (who's in what).

### Marketing brief

- **Core promise:** Run the community without turning it into a second job.
- **Pain point:** Organizers juggle spreadsheets for members, separate tools for roles,
  and tribal knowledge for "who can do what." Volunteers get over-permissioned or locked
  out; looking up a family means hunting across systems.
- **Value propositions:**
  1. One connected system for members, roles, programs, and payments.
  2. Give the right people the right access — coaches, admins, and volunteers see only what they need.
  3. Keep every member easy to find — profiles, family ties, and enrollments in one directory.
- **Proof-style claims (directional, verify before publishing):** less time hunting for
  contact info; fewer "who has access to this?" tickets; one directory instead of three spreadsheets.
- **Existing site copy to reuse:**
  - Description: "Manage members, roles, programs, payments, and everyday operations from one connected system."
  - Homepage headline: "Run the community without turning it into a second job."
  - Menu blurb: "Members, roles, and operations in one place."
  - CTA: "Explore community management"
- **Sub-features (existing):** "Give the right people the right access." / "Keep every member easy to find."
- **Media:** existing product video at `/assets/videos/test-video.mp4` (placeholder — replace when a dedicated CM video ships).

### Resource guide angle

Tutorial: "Set up roles and your member directory before registration opens" — assign
coach/admin/volunteer roles, import or create the first families, and confirm the
directory is ready so registration and broadcasts have a clean source of truth.

---

## Feature 2: Online Registration

**Slug:** `online-registration` · **Persona:** organizers · **Eyebrow tone:** coral

### Technical brief

Online Registration is a guided, end-to-end flow that takes a program from setup to a
completed, paid roster without any paper or manual reconciliation.

- **Program setup.** An organizer creates a program once: name, schedule, price, capacity,
  and required waiver. Publishing makes it instantly discoverable to families.
- **Family checkout.** A parent opens the program, selects which children are registering,
  agrees to the waiver, and pays — all on one page. No account juggling; the flow pulls
  from the family's existing Loople profile (see Family Accounts).
- **Waivers and compliance.** Waiver acceptance is captured per registrant and stored with
  the registration record — auditable, timestamped, and never a photocopied form again.
- **Payments.** Card payment happens inside checkout. Registrations and payments reconcile
  automatically against the program roster; no exporting to spreadsheets.
- **Roster output.** Every completed registration lands in the member directory and the
  program roster in real time, connected to the family's account.

Integration points: Family Accounts (registrant selection, stored family info),
Programs & Events (the program being registered for), Community Management (roster,
directory, roles).

### Marketing brief

- **Core promise:** Turn interest into registration without the paperwork chase.
- **Pain point:** Registration season means paper forms, chasing waivers, tracking
  payments in spreadsheets, and re-typing family information every year. Organizers lose
  evenings to admin; families abandon clunky multi-step signups.
- **Value propositions:**
  1. Set up a program once — name it, schedule it, price it, attach the waiver, publish.
  2. Families register in minutes — pick who's playing, sign, and pay without leaving the page.
  3. Everything reconciles itself — waivers, payments, and rosters stay attached to the registration.
- **Proof-style claims (directional, verify before publishing):** registration time cut
  from days of back-and-forth to minutes; zero paper forms; payments and rosters always in sync.
- **Existing site copy to reuse:**
  - Description: "Create programs, collect family information, accept waivers, and take payment through one guided flow."
  - Homepage headline: "Turn interest into registration without the paperwork chase."
  - Menu blurb: "Programs, waivers, and payments in one flow."
  - CTA: "See registration workflows"
- **Sub-features (existing):** "Set up a program once." / "Let families register in minutes."

### Resource guide angle

Tutorial: "How to set up online registration for your season in under 15 minutes" —
walk through program setup, waiver attachment, publishing, and what families see at
checkout. Ends with the roster filling itself.

---

## Feature 3: Centralized Newsfeed

**Slug:** `centralized-newsfeed` · **Persona:** members · **Eyebrow tone:** amber

### Technical brief

Centralized Newsfeed is the member-facing home for community information — one reliable
stream instead of texts, inboxes, and app-hopping.

- **Unified stream.** Announcements, activity, events, and community updates appear in one
  chronological feed members already open.
- **Broadcast delivery surface.** Organizer Broadcasts land here (and via push on Mobile
  Apps), so targeted messages have a durable place to live after the notification fades.
- **Family-relevant context.** With Family Accounts, the feed can surface what matters to
  the household — not every league-wide noise item.
- **Less channel sprawl.** Members do not need to join a Facebook group, save a coach's
  number, or dig through email to stay current.

Integration points: Broadcasts (primary content source), Family Accounts (household
relevance), Mobile Apps (on-the-go feed + push).

### Marketing brief

- **Core promise:** Give every update one reliable place to live.
- **Pain point:** Families miss practice changes because the update was in a muted group
  chat, a buried email, or an app they stopped checking. Organizers repeat themselves
  across three channels and still hear "I never saw that."
- **Value propositions:**
  1. Announcements, activity, and events in one feed — no digging through texts and inboxes.
  2. Updates stick — notifications fade; the newsfeed keeps the record.
  3. Built for how members actually check in — open the app, see what's new.
- **Proof-style claims (directional):** fewer "I never got the message" conversations;
  one place families check before asking the coach.
- **Existing site copy to reuse:**
  - Description: "Members can see announcements, activity, events, and community updates without digging through texts, inboxes, and scattered apps."
  - Homepage headline: "Give every update one reliable place to live."
  - Menu blurb: "Every update in one reliable feed."
  - CTA: "Explore the newsfeed"

### Resource guide angle

Blog: "Stop repeating yourself: why your community needs one feed" — the cost of
multi-channel announcements, then how a centralized newsfeed + targeted broadcasts
gives families a single place to look.

---

## Feature 4: Broadcasts

**Slug:** `broadcasts` · **Persona:** organizers · **Eyebrow tone:** emerald

### Technical brief

Broadcasts is Loople's targeted announcement system — one composer that reaches exactly
the right slice of the community.

- **Audience targeting.** Send to the entire community or scope to specific programs,
  teams, roles, or groups. Targeting uses the same membership data as the directory, so
  audiences are always current — no stale distribution lists.
- **Delivery.** Broadcasts land in the centralized newsfeed and reach members through the
  mobile apps (push) so updates arrive where people already look.
- **Sender roles.** Who can broadcast, and to whom, is controlled by roles from Community
  Management — coaches can message their team, admins can message everyone.
- **No channel sprawl.** Replaces the group-text/email-chain/Facebook-group triad with a
  single authoritative channel; members don't need to know a phone number or join a group
  to stay informed.

Integration points: Centralized Newsfeed (delivery surface), Community Management
(roles, groups), Programs & Events (program/team-scoped audiences), Mobile Apps (push).

### Marketing brief

- **Core promise:** Reach the right people without messaging everyone.
- **Pain point:** Important updates die in group texts and buried inboxes. Blasting
  everyone trains people to ignore you; targeting by hand means maintaining lists that go
  stale the moment a roster changes.
- **Value propositions:**
  1. Target by program, team, role, or group — audiences stay in sync with the roster automatically.
  2. One channel members actually check — updates land in the feed and on their phones.
  3. Role-based sending — coaches reach their team, admins reach the community, nobody oversteps.
- **Proof-style claims (directional):** rainout notices reach every affected family in
  seconds; no more "I never got the text."
- **Existing site copy to reuse:**
  - Description: "Send important updates to the entire community or target specific programs, teams, roles, and groups."
  - Homepage headline: "Reach the right people without messaging everyone."
  - Menu blurb: "Reach the right people, not everyone."
  - CTA: "How broadcasts work"
- **Media:** existing product video at `/assets/videos/broadcasts.mp4`.

### Resource guide angle

Blog: "Why your league's group chat is failing you (and what to do instead)" — the cost
of scattered communication, then the targeted-broadcast model. Case-study-adjacent but
publishable as a blog post.

---

## Feature 5: Family Accounts

**Slug:** `family-accounts` · **Persona:** members · **Eyebrow tone:** violet

### Technical brief

Family Accounts is the member-side account model: one parent login that manages the
whole household.

- **One account, many people.** A parent manages children, guardians, and their own
  profile from a single login — no per-child accounts or shared passwords.
- **Registrations.** During checkout the parent picks which family members are
  registering; stored family information pre-fills forms.
- **Schedules and activity.** Every child's programs, events, and updates roll up into
  one combined family view — one calendar instead of four.
- **Payments.** Payment methods and history live at the family level; receipts and dues
  are visible in one place.
- **Data model.** The family is a first-class entity connected to the member directory,
  so organizers see accurate household relationships without collecting them repeatedly.

Integration points: Online Registration (registrant selection, pre-fill), Mobile Apps
(family view on the go), Centralized Newsfeed (per-family relevance).

### Marketing brief

- **Core promise:** Keep the whole family organized from one account.
- **Pain point:** Parents with multiple kids juggle separate logins, duplicate forms, and
  scattered schedules across leagues and apps. Every season means re-typing the same
  emergency contacts.
- **Value propositions:**
  1. One login for the whole household — kids, schedules, payments, and updates together.
  2. Register any child in minutes — family info is saved, forms pre-fill.
  3. One family calendar — practices, games, and events for everyone, in one view.
- **Proof-style claims (directional):** no duplicate data entry after the first signup;
  one place to check "where does everyone need to be today?"
- **Existing site copy to reuse:**
  - Description: "Parents can manage children, registrations, schedules, payments, and community activity without juggling separate profiles."
  - Homepage headline: "Keep the whole family organized from one account."
  - Menu blurb: "Kids, schedules, and payments together."
  - CTA: "See family accounts"
- **Media:** existing product video at `/assets/videos/family-accounts.mp4`.

### Resource guide angle

Guide: "A parent's guide to managing the whole season from one account" — onboarding
walkthrough for members: set up the family, register kids, read the combined calendar,
manage payments.

---

## Feature 6: Programs & Events

**Slug:** `programs-events` · **Persona:** organizers · **Eyebrow tone:** brand

### Technical brief

Programs & Events is how organizers publish what is happening — with schedules,
locations, registration, RSVPs, payments, and updates attached to each offering.

- **Program and event records.** Create season programs, clinics, tournaments, meetings,
  or one-off events with the details families need: when, where, who, and what to do next.
- **Registration and RSVPs attached.** Link Online Registration or lighter RSVP flows so
  signup is not a separate spreadsheet. Capacity and waitlists stay on the same record.
- **Payments and updates.** Pricing and dues can ride with the program; Broadcasts can
  target that program's roster when plans change.
- **Operational clarity.** Coaches and admins see the same source of truth for "what's on
  this week" instead of reconstructing it from emails.

Integration points: Online Registration (enroll into a program), Broadcasts
(program-scoped audiences), Community Management (rosters and roles).

### Marketing brief

- **Core promise:** Make it obvious what is happening and what people need to do.
- **Pain point:** Schedules live in PDFs, RSVPs in a Facebook post, payments in Venmo,
  and updates in a group text. Families guess; organizers answer the same "when/where?"
  questions all week.
- **Value propositions:**
  1. Publish programs and events with schedules, locations, and next steps attached.
  2. Registration, RSVPs, and payments stay on the same record — not three tools over.
  3. When something changes, update once and notify the people in that program.
- **Proof-style claims (directional):** fewer "what time is practice?" DMs; one page
  families can bookmark for the season.
- **Existing site copy to reuse:**
  - Description: "Publish programs and events with schedules, locations, registration, RSVPs, payments, and updates attached."
  - Homepage headline: "Make it obvious what is happening and what people need to do."
  - Menu blurb: "Schedules, RSVPs, and registration attached."
  - CTA: "Explore programs & events"

### Resource guide angle

Tutorial: "Publish your season calendar so families stop guessing" — create the first
programs and events, attach registration or RSVP, set locations/schedules, and send a
launch broadcast to the right audiences.

---

## Feature 7: Mobile Apps

**Slug:** `mobile-apps` · **Persona:** members · **Eyebrow tone:** coral

### Technical brief

Mobile Apps put Loople on iOS and Android so members and organizers can handle
schedules, updates, registration, and payments wherever the day takes them.

- **Parity for the jobs that matter.** Check the family calendar, read the newsfeed,
  register a child, pay a balance, and receive push for broadcasts — without needing a
  laptop.
- **Push delivery.** Broadcasts and time-sensitive updates reach phones so rainouts and
  last-minute changes are not buried in email.
- **Organizer and member paths.** Coaches and admins can act on the go (quick lookups,
  sends); parents manage the household from the same app family.
- **Always with the community.** The product stays useful in parking lots, sidelines, and
  car lines — where most youth-sports decisions actually happen.

Integration points: Family Accounts (household view), Centralized Newsfeed (mobile
surface), Broadcasts (push), Online Registration (mobile checkout).

### Marketing brief

- **Core promise:** Carry the community in your pocket.
- **Pain point:** Desktop-only tools fail at game time. Parents miss updates because they
  were not at a computer; coaches cannot look up a roster between fields.
- **Value propositions:**
  1. Schedules, updates, registration, and payments on iOS and Android.
  2. Push so important broadcasts reach people when they need them.
  3. The same household and community context as the web — not a stripped-down afterthought.
- **Proof-style claims (directional):** families check the app before texting the coach;
  organizers handle common tasks without opening a laptop.
- **Existing site copy to reuse:**
  - Description: "Members and organizers get schedules, updates, registration, and payments on iOS and Android—wherever the day takes them."
  - Homepage headline: "Carry the community in your pocket."
  - Menu blurb: "The community on iOS and Android."
  - CTA: "See the mobile apps"

### Resource guide angle

Blog: "Sideline-ready: what parents and coaches actually need on their phone" — the
jobs-to-be-done on game day, then how Mobile Apps + Family Accounts + Broadcasts cover
them without another single-purpose download.

---

## Feature 8: App Marketplace

**Slug:** `app-marketplace` · **Persona:** organizers · **Eyebrow tone:** amber

### Technical brief

App Marketplace extends Loople with optional tools so communities can add capabilities
without rebuilding their core system.

- **Extend, don't replace.** Check-in, reservations, brackets, meet management,
  matchmaking, websites, and similar modules plug into the same membership and program
  foundation.
- **Shared identity and data.** Marketplace apps should use Loople's members, families,
  and programs — not force a second login or a parallel roster.
- **Community-fit selection.** Organizers enable what their sport or workflow needs
  (e.g. brackets for tournaments, check-in for events) and skip the rest.
- **Lower custom-build cost.** Instead of commissioning one-off software, communities
  compose from marketplace pieces on top of Community Management and Programs & Events.

Integration points: Community Management (members/roles as the base), Programs & Events
(events and programs marketplace tools attach to).

### Marketing brief

- **Core promise:** Add what your community needs without rebuilding your entire system.
- **Pain point:** Every league eventually needs "just one more tool" — check-in, brackets,
  a website, meet management — and each one becomes another login, another roster export,
  another bill. Custom builds are expensive; duct-taping apps is fragile.
- **Value propositions:**
  1. Extend Loople with check-in, reservations, brackets, meet management, matchmaking, websites, and more.
  2. Keep one membership system — marketplace tools build on Loople, not beside it.
  3. Turn capabilities on as you grow; do not buy a rebuild when the season changes.
- **Proof-style claims (directional):** add tournament brackets without a new vendor
  roster; check-in that already knows who registered.
- **Existing site copy to reuse:**
  - Description: "Extend Loople with tools for check-in, reservations, brackets, meet management, matchmaking, websites, and more."
  - Homepage headline: "Add what your community needs without rebuilding your entire system."
  - Menu blurb: "Add check-in, brackets, and more."
  - CTA: "Browse the app marketplace"

### Resource guide angle

Blog: "When to extend your platform vs. buy another app" — decision framework for
organizers (roster sync, logins, seasonality), then how the App Marketplace keeps
extensions on the same foundation as Community Management and Programs & Events.

---

## Sanity field mapping (for content entry)

When creating `feature` documents from this brief, map as follows:

| Schema field | Source |
| --- | --- |
| `name` | Feature name above |
| `slug` | Slug above (must match existing route ids) |
| `personaGroup` | Persona above (`organizers` / `members`) |
| `description` | "Existing site copy — Description" |
| `mediaLabel` | Feature name |
| `mediaAspect` | `758 / 633` (top-level); `1 / 1` or `4 / 5` for sub-features |
| `eyebrowTone` | Tone above |
| `homepageHeadline` | "Existing site copy — Homepage headline" |
| `ctaLabel` | "Existing site copy — CTA" |
| `menuBlurb` | "Existing site copy — Menu blurb" |
| `detailHeadline` | Same as homepage headline |
| `detailDescription` | Same as description |
| `subFeatures` | Listed above where present (Community Management, Online Registration) |
| `relatedFeatures` | References — see `relatedFeatureIds` in `src/data/features.ts` |

For `resource` documents, use the "Resource guide angle" per feature. Prefer
`tutorial` for how-to walks and `blog` for problem/solution pieces. Each resource should
set `relatedFeatures` to its feature and include `author`, `publishedAt`, `excerpt`,
optional cover image, and `seo` fields.

## Notes

- Slugs must match the existing `/features/[slug]` routes exactly so the Next.js app can
  swap its static data for GROQ queries without URL changes.
- Proof-style claims are directional placeholders — verify with real numbers before
  publishing anything quantitative.
- Demos and hero chips remain code-driven (`src/components/home/demos/`,
  `src/data/hero-chips.ts`); do not model them in Sanity.
- Community Management's current video path (`/assets/videos/test-video.mp4`) is a
  placeholder; prefer a dedicated asset before heavy marketing use.
