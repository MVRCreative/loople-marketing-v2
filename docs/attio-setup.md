/**
 * Attio + Calendly + Supabase sync for Loople.
 *
 * Architecture (one-way):
 *   Marketing /demo → Attio People + Companies + Deals → Calendly
 *   Calendly webhook → Attio Deal stage "Demo Scheduled"
 *   Supabase (prod/staging) → Edge Function sync-attio → Attio People + Users + Workspaces
 *
 * Supabase is the source of truth for product identity and membership.
 * Attio never controls auth, membership, or permissions.
 */

/**
 * ## Object model
 *
 * ### People (CRM)
 * - Upsert by `email_addresses`
 * - May exist without a Loople account (demo lead)
 * - Optional select `loople_source`: marketing_demo | product_signup_prod | product_signup_staging
 *
 * ### Users (product accounts) — enable in Attio Objects settings
 * - Native unique `user_id`
 * - Values: `prod:<supabase-user-uuid>` or `staging:<supabase-user-uuid>`
 * - `primary_email_address` = login email
 * - `person` relationship → matching Person by email
 * - `workspace` relationship → Communities
 *
 * ### Workspaces (UI label: Communities) — enable in Attio Objects settings
 * - API object slug: `workspaces`
 * - Native unique `workspace_id`
 * - Values: `prod:<supabase-organization-uuid>` or `staging:<supabase-organization-uuid>`
 * - `name` = organization name
 *
 * ### Companies (CRM)
 * - Used by marketing demo form when a work-email domain is present
 * - Upsert by `domains`
 * - Optional `loople_source`
 *
 * ### Deals (sales pipeline)
 * - Unique text attribute `dedupe_key` (required for idempotent upserts)
 * - Demo leads use: `demo:{lowercase-email}`
 * - Optional datetime `demo_scheduled_at`
 * - Optional select `loople_source`
 * - Stage titles used by code:
 *   - New Lead
 *   - Contacted
 *   - Demo Scheduled
 *   - Demo Completed
 *   - Evaluating
 *   - Proposal / Approval
 *   - Closed Won
 *   - Closed Lost
 *
 * Deal dedupe: submitting `/demo` twice with the same email upserts the same Deal
 * via `dedupe_key=demo:email@example.com`.
 */

/**
 * ## Custom Attio attributes you must create
 *
 * On Deals:
 * 1. Unique text: `dedupe_key`
 * 2. Timestamp (or datetime): `demo_scheduled_at`
 * 3. Select (optional but used): `loople_source` with options
 *    marketing_demo, product_signup_prod, product_signup_staging
 * 4. Status pipeline with the stage titles listed above (or map titles to match)
 *
 * On People and Companies:
 * 1. Select `loople_source` with the same three options
 *
 * Do NOT create `loople_user_id` or `loople_org_id` — use native User `user_id`
 * and Workspace `workspace_id` instead.
 *
 * Enable standard objects **Users** and **Workspaces** (Communities) in Attio.
 */

/**
 * ## Environment variables
 *
 * Marketing site (`.env.local` locally; Vercel Production/Preview for deploy):
 * - `ATTIO_API_KEY` — Attio access token (Records read-write)
 * - `CALENDLY_PAT` — Calendly personal access token (webhook setup only)
 * - `CALENDLY_WEBHOOK_SIGNING_KEY` — generate with `openssl rand -hex 32`
 * - `PUBLIC_MARKETING_URL` — e.g. https://www.joinloople.com (no trailing slash)
 * - `NEXT_PUBLIC_CALENDLY_URL` — https://calendly.com/hello-joinloople/30min
 *
 * Loople Supabase Edge Function secrets (prod AND staging projects):
 * - `ATTIO_API_KEY`
 * - `ATTIO_SYNC_SECRET` — shared bearer for Database Webhooks
 * - `SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY` (auto on functions)
 * - `LOOPLE_ENVIRONMENT` = `prod` or `staging`
 */

/**
 * ## Calendly webhook setup
 *
 * 1. Generate signing key: `openssl rand -hex 32`
 * 2. Put it in `.env.local` as `CALENDLY_WEBHOOK_SIGNING_KEY`
 * 3. Set `PUBLIC_MARKETING_URL` to the deployed marketing origin
 * 4. Run: `bun run calendly:webhook:setup`
 * 5. Copy the same signing key + other secrets to Vercel
 *
 * Handler: `POST /api/calendly-webhook`
 * - Verifies HMAC over `{t}.{rawBody}` with 180s skew
 * - invitee.created → Deal stage "Demo Scheduled" + demo_scheduled_at
 * - invitee.canceled → log only (preserves Deal through reschedules)
 */

/**
 * ## Supabase → Attio sync
 *
 * Edge Function: `supabase/functions/sync-attio`
 *
 * Database Webhooks (Dashboard → Database → Webhooks) on each project:
 * 1. profiles INSERT, UPDATE → https://<project>.supabase.co/functions/v1/sync-attio
 * 2. organizations INSERT, UPDATE → same URL
 * 3. memberships INSERT, UPDATE, DELETE → same URL
 *
 * HTTP Header: `Authorization: Bearer <ATTIO_SYNC_SECRET>`
 *
 * Profile sync creates Person + User only after `onboarding_completed_at` is set.
 * Organization creates Workspace (skips `is_demo` orgs).
 * Membership changes rewrite the User's workspace links from active memberships.
 *
 * Backfill: `bun scripts/backfill-attio.ts --env=prod --dry-run` then without dry-run.
 * Then staging with `--env=staging` (seed emails filtered).
 */

/**
 * ## Testing
 *
 * Marketing:
 * 1. Submit /demo twice with same email → one Deal
 * 2. Book Calendly → Deal becomes Demo Scheduled
 * 3. Invalid webhook signature → 401
 *
 * Product:
 * 1. Create profile → Attio Person + User (`prod:` or `staging:` id)
 * 2. Create organization → Attio Workspace
 * 3. Active membership → User linked to Workspace
 */

export {};
