-- TCC Site — site-wide admin-editable settings (key/value)
-- Run this once in the Supabase SQL Editor, after schema.sql + grants.sql.
-- No new grants needed — grants.sql's `alter default privileges` already
-- covers tables created after it ran.

create table if not exists public.site_settings (
  key         text primary key,
  value       text,
  updated_by  text,
  updated_at  timestamptz not null default now()
);

alter table public.site_settings enable row level security;

-- Reuses set_updated_at() defined in schema.sql.
drop trigger if exists site_settings_set_updated_at on public.site_settings;
create trigger site_settings_set_updated_at
  before update on public.site_settings
  for each row
  execute function public.set_updated_at();

-- Seed the trade show badge shown in the header (components/TradeShowBadge.tsx)
-- — HK office edits the value directly via /admin/settings from here on.
-- ON CONFLICT DO NOTHING so re-running this after an admin edit never
-- clobbers their change back to the seed value.
insert into public.site_settings (key, value)
values ('trade_show_badge', 'BDNY ''26 — NYC • Booth #1264 • Nov 8–9')
on conflict (key) do nothing;
