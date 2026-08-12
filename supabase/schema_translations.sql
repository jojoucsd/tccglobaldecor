-- TCC Site — Phase 3 follow-up: admin audit stamp + Chinese project translations
-- Run this once in the Supabase SQL Editor, after schema.sql + grants.sql.
--
-- No new grants needed here — grants.sql already ran
--   alter default privileges in schema public grant ... to service_role
-- which covers tables created after that point automatically. If the app
-- reports permission errors on project_translations, rerun grants.sql.

-- ---------------------------------------------------------------------
-- projects.updated_by
-- Stamped from the admin session email (see lib/adminAuth.ts) on every
-- save — a breadcrumb, not real per-user access control.
-- ---------------------------------------------------------------------
alter table public.projects add column if not exists updated_by text;

-- ---------------------------------------------------------------------
-- project_translations
-- HK-office-editable zh-TW / zh-CN overrides for project title/summary/
-- description/notes. Only present once someone has actually translated a
-- field — getProjects.ts falls back to the English project row per-field
-- when a translation or row doesn't exist yet. Address is intentionally
-- not translated here, same convention as the JSON it replaces.
-- ---------------------------------------------------------------------
create table if not exists public.project_translations (
  slug            text not null references public.projects(slug) on delete cascade,
  locale          text not null check (locale in ('zh-TW', 'zh-CN')),
  title           text,
  summary         text,
  description     text,
  notes           text,
  updated_by      text,
  updated_at      timestamptz not null default now(),
  primary key (slug, locale)
);

alter table public.project_translations enable row level security;

-- Reuses set_updated_at() defined in schema.sql.
drop trigger if exists project_translations_set_updated_at on public.project_translations;
create trigger project_translations_set_updated_at
  before update on public.project_translations
  for each row
  execute function public.set_updated_at();
