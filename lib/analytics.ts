// lib/analytics.ts
import "server-only";
import { supabaseAdmin } from "./supabase";

export type AnalyticsEvent = {
  id: number;
  created_at: string;
  path: string;
  referrer: string | null;
  session_id: string;
  locale: string | null;
  lead: string | null;
  country: string | null;
};

export async function getRecentEvents(limit = 50): Promise<AnalyticsEvent[]> {
  const { data, error } = await supabaseAdmin()
    .from("analytics_events")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw new Error(`[analytics] Failed to load recent events: ${error.message}`);
  return (data ?? []) as AnalyticsEvent[];
}

export type TopViewedProject = { slug: string; views: number };

// Bare-bones aggregation: pull recent pageviews for /projects/[slug] paths and
// count in memory rather than standing up a Postgres aggregate/view — traffic
// volume is low enough right now (new tracker, new site) that this is cheap.
// Revisit with a SQL view or materialized rollup once event volume grows.
export async function getTopViewedProjects(limit = 10, sampleSize = 5000): Promise<TopViewedProject[]> {
  const { data, error } = await supabaseAdmin()
    .from("analytics_events")
    .select("path")
    .like("path", "/projects/%")
    .order("created_at", { ascending: false })
    .limit(sampleSize);

  if (error) throw new Error(`[analytics] Failed to load project views: ${error.message}`);

  const counts = new Map<string, number>();
  for (const row of (data ?? []) as { path: string }[]) {
    const slug = row.path.replace(/^\/projects\//, "").replace(/\/$/, "");
    if (!slug) continue;
    counts.set(slug, (counts.get(slug) ?? 0) + 1);
  }

  return [...counts.entries()]
    .map(([slug, views]) => ({ slug, views }))
    .sort((a, b) => b.views - a.views)
    .slice(0, limit);
}

export type TopPage = { path: string; views: number };

// Everything the tracker sees that isn't a /projects/[slug] page — home,
// /process, /gallery/[slug], /connect. The tracker itself already covers all
// of these (it's mounted once in the shared site layout); this was just
// never surfaced in the dashboard as its own ranking.
export async function getTopPages(limit = 5, sampleSize = 5000): Promise<TopPage[]> {
  const { data, error } = await supabaseAdmin()
    .from("analytics_events")
    .select("path")
    .not("path", "like", "/projects/%")
    .order("created_at", { ascending: false })
    .limit(sampleSize);

  if (error) throw new Error(`[analytics] Failed to load page views: ${error.message}`);

  const counts = new Map<string, number>();
  for (const row of (data ?? []) as { path: string }[]) {
    const path = row.path || "/";
    counts.set(path, (counts.get(path) ?? 0) + 1);
  }

  return [...counts.entries()]
    .map(([path, views]) => ({ path, views }))
    .sort((a, b) => b.views - a.views)
    .slice(0, limit);
}

export type DailyCount = { date: string; count: number };

// Bucketed in memory for the same reason as getTopViewedProjects — fine at
// current volume, revisit with a SQL rollup once traffic actually grows.
export async function getDailyPageviews(days = 14): Promise<DailyCount[]> {
  const since = new Date();
  since.setUTCDate(since.getUTCDate() - (days - 1));
  since.setUTCHours(0, 0, 0, 0);

  const { data, error } = await supabaseAdmin()
    .from("analytics_events")
    .select("created_at")
    .gte("created_at", since.toISOString())
    .limit(20000);

  if (error) throw new Error(`[analytics] Failed to load daily pageviews: ${error.message}`);

  const counts = new Map<string, number>();
  for (const row of (data ?? []) as { created_at: string }[]) {
    const day = row.created_at.slice(0, 10); // YYYY-MM-DD (UTC)
    counts.set(day, (counts.get(day) ?? 0) + 1);
  }

  const series: DailyCount[] = [];
  for (let i = 0; i < days; i++) {
    const d = new Date(since);
    d.setUTCDate(since.getUTCDate() + i);
    const key = d.toISOString().slice(0, 10);
    series.push({ date: key, count: counts.get(key) ?? 0 });
  }

  return series;
}

export async function getEventCounts(): Promise<{ totalEvents: number; uniqueSessions: number }> {
  const { count: totalEvents, error: totalError } = await supabaseAdmin()
    .from("analytics_events")
    .select("*", { count: "exact", head: true });

  if (totalError) throw new Error(`[analytics] Failed to count events: ${totalError.message}`);

  // No native DISTINCT count via the JS client — sample recent session ids
  // and count unique. Fine for a bare-bones view at current traffic levels.
  const { data, error } = await supabaseAdmin()
    .from("analytics_events")
    .select("session_id")
    .order("created_at", { ascending: false })
    .limit(5000);

  if (error) throw new Error(`[analytics] Failed to sample sessions: ${error.message}`);

  const uniqueSessions = new Set((data ?? []).map((r) => r.session_id)).size;

  return { totalEvents: totalEvents ?? 0, uniqueSessions };
}
