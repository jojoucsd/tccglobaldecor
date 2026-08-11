-- Run once after schema.sql. Needed because "Automatically expose new
-- tables" was turned off at project creation (intentional — controls anon
-- access manually) — that setting also skips the base GRANTs that the
-- service_role needs, separate from RLS policies. RLS still has zero
-- policies, so the anon/publishable key remains locked out; service_role
-- gets explicit read/write access here instead.

grant usage on schema public to service_role;

grant select, insert, update, delete on public.projects to service_role;
grant select, insert, update, delete on public.analytics_events to service_role;

grant usage, select on all sequences in schema public to service_role;

-- Keep future tables working the same way without a manual grant each time.
alter default privileges in schema public
  grant select, insert, update, delete on tables to service_role;

alter default privileges in schema public
  grant usage, select on sequences to service_role;
