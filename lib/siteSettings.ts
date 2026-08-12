// lib/siteSettings.ts
// Small key/value store for site-wide admin-editable strings (see
// supabase/schema_settings.sql) — e.g. the trade show badge in the header.
import "server-only";
import { supabaseAdmin } from "./supabase";

export type SiteSettingRow = {
  key: string;
  value: string | null;
  updated_by: string | null;
  updated_at: string | null;
};

async function loadSettings(): Promise<Record<string, string>> {
  const { data, error } = await supabaseAdmin().from("site_settings").select("key, value");

  if (error) {
    // Fails soft, unlike getProjects.ts's loadMeta(): this is read from
    // app/[locale]/(site)/layout.tsx, which wraps every single page. Throwing
    // here would take the whole site down over a missing trade show badge —
    // better to just not render it.
    console.error(`[siteSettings] Failed to load site settings: ${error.message}`);
    return {};
  }

  const out: Record<string, string> = {};
  for (const row of (data ?? []) as { key: string; value: string | null }[]) {
    if (row.value != null) out[row.key] = row.value;
  }
  return out;
}

// Cached in production only, same pattern as getProjects.ts — this now runs
// on every page view sitewide (via the shared layout), not just admin.
let cachedSettings: Promise<Record<string, string>> | null = null;

function getSettingsMap(): Promise<Record<string, string>> {
  if (cachedSettings) return cachedSettings;
  const settings = loadSettings();
  if (process.env.NODE_ENV === "production") cachedSettings = settings;
  return settings;
}

export async function getSiteSetting(key: string): Promise<string | null> {
  const settings = await getSettingsMap();
  return settings[key] ?? null;
}

export function invalidateSiteSettingsCache() {
  cachedSettings = null;
}

// Uncached, throws on error — admin-only, same error-handling posture as the
// rest of /admin (a broken admin page is contained, unlike the public site).
export async function getAllSiteSettingsForAdmin(): Promise<SiteSettingRow[]> {
  const { data, error } = await supabaseAdmin()
    .from("site_settings")
    .select("key, value, updated_by, updated_at")
    .order("key");

  if (error) {
    throw new Error(`[siteSettings] Failed to load site settings: ${error.message}`);
  }

  return (data ?? []) as SiteSettingRow[];
}
