-- TCC Site — Phase 3 schema
-- Run this once in the Supabase SQL Editor (or via `supabase db push`).
--
-- Access model: RLS is enabled on both tables with NO policies attached.
-- That means the public anon key gets zero access — all reads/writes happen
-- server-side (Next.js server components / route handlers) using the
-- service role key, which bypasses RLS entirely. This matches the interim
-- auth model (passcode-gated /admin, no real per-user accounts yet).

-- ---------------------------------------------------------------------
-- projects
-- Mirrors the fields previously stored in app/(site)/data/projects.json.
-- Images stay on disk under /public/images/projects/[slug]/ for now —
-- getProjects.ts still scans the filesystem for cover/gallery images and
-- merges this table in for metadata, same as it merged the JSON file before.
-- ---------------------------------------------------------------------
create table if not exists public.projects (
  slug            text primary key,
  title           text not null,
  address         text,
  summary         text,
  description     text,
  notes           text,
  priority        integer,
  tags            text[] not null default '{}',
  cover_position  text,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

alter table public.projects enable row level security;

-- Keep updated_at current on every edit from the /admin form.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists projects_set_updated_at on public.projects;
create trigger projects_set_updated_at
  before update on public.projects
  for each row
  execute function public.set_updated_at();

-- ---------------------------------------------------------------------
-- analytics_events
-- One row per page hit. Deliberately minimal per the Phase 3 scope:
-- pageviews, referrer, path, rough geo, session id, and an optional
-- `lead` tag captured from a `?lead=<name>` query param on links Matthew
-- sends directly to prospects.
-- ---------------------------------------------------------------------
create table if not exists public.analytics_events (
  id           bigint generated always as identity primary key,
  created_at   timestamptz not null default now(),
  path         text not null,
  referrer     text,
  session_id   text not null,
  locale       text,
  lead         text,
  country      text  -- rough geo, e.g. from a CDN/edge header — enrichment deferred
);

alter table public.analytics_events enable row level security;

create index if not exists analytics_events_created_at_idx
  on public.analytics_events (created_at desc);

create index if not exists analytics_events_lead_idx
  on public.analytics_events (lead)
  where lead is not null;

-- ---------------------------------------------------------------------
-- Grants
-- "Automatically expose new tables" was left off at project creation (to
-- control access manually) — that skips the base GRANTs new tables would
-- otherwise get, including for service_role. RLS above still has zero
-- policies, so the anon/publishable key remains locked out; service_role
-- gets explicit access here instead. See CLAUDE.md's Data API decision.
-- ---------------------------------------------------------------------
grant usage on schema public to service_role;

grant select, insert, update, delete on public.projects to service_role;
grant select, insert, update, delete on public.analytics_events to service_role;

grant usage, select on all sequences in schema public to service_role;

alter default privileges in schema public
  grant select, insert, update, delete on tables to service_role;

alter default privileges in schema public
  grant usage, select on sequences to service_role;
