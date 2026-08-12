// lib/getProjects.ts
import "server-only";
import fs from "node:fs";
import path from "node:path";
import { supabaseAdmin } from "./supabase";

/** --------- Types --------- */
export type ProjectRecord = {
  slug: string;
  title: string;
  cover: string;
  coverPosition?: string; // CSS object-position for the cover crop, e.g. "top", "20% 50%" — defaults to "center"
  images: string[];

  // optional fields used by the project detail page
  subtitle?: string;
  address?: string;
  summary?: string;      // overview
  description?: string;  // details
  notes?: string;        // extra notes
  priority?: number;     // lower = higher priority (1 = featured)
  comingSoon?: boolean;  // true when folder exists but has no images yet
  tags?: string[];       // "hotel" | "restaurant" | "gaming" | "living" — used by the Projects grid filter
  updatedBy?: string;    // email of last admin editor (English row) — audit breadcrumb, not access control
  updatedAt?: string;
};

// Locales with an admin-editable translation row (see project_translations
// in supabase/schema_translations.sql). English isn't here — it's the base
// row, not an overlay.
const TRANSLATABLE_LOCALES = new Set(["zh-TW", "zh-CN"]);

type ProjectMeta = Partial<ProjectRecord> & { slug: string };

/** --------- Config --------- */
const ROOT = process.cwd();
const PROJECTS_DIR = path.join(ROOT, "public", "images", "projects");

const IMAGE_EXTS = new Set([".avif", ".jpg", ".jpeg", ".png", ".webp"]);

// Row shape of the `projects` table (supabase/schema.sql) — snake_case
// columns, mapped to ProjectMeta's camelCase fields below.
type ProjectRow = {
  slug: string;
  title: string;
  address: string | null;
  summary: string | null;
  description: string | null;
  notes: string | null;
  priority: number | null;
  tags: string[] | null;
  cover_position: string | null;
  updated_by: string | null;
  updated_at: string | null;
};

// Row shape of `project_translations` (supabase/schema_translations.sql).
export type ProjectTranslationRow = {
  locale: string;
  title: string | null;
  summary: string | null;
  description: string | null;
  notes: string | null;
  updated_by: string | null;
  updated_at: string | null;
};

/** --------- Helpers --------- */
function titleFromSlug(slug: string) {
  return slug
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();
}

function preferCover(files: string[]) {
  // 1. Explicit cover file named "cover.*" (any extension)
  const explicitCover = files.find((f) => /^cover\./i.test(f));
  if (explicitCover) return explicitCover;

  // 2. Legacy project_list named AVIF
  const avifs = files.filter((f) => path.extname(f).toLowerCase() === ".avif");
  const preferred = avifs.find((f) => /project_list/i.test(f));
  if (preferred) return preferred;

  // 3. First AVIF alphabetically (code uses numeric sort so 01, 02... 10 order correctly)
  if (avifs.length) return avifs[0];

  // 4. First file of any supported type
  return files[0] ?? "";
}

async function loadMeta(): Promise<ProjectMeta[]> {
  const { data, error } = await supabaseAdmin()
    .from("projects")
    .select(
      "slug, title, address, summary, description, notes, priority, tags, cover_position, updated_by, updated_at"
    );

  if (error) {
    // Throw instead of failing soft — a silently swallowed error here used to
    // drop titles/summaries/tags for every project site-wide with only a
    // server-side console.error to notice it by. Better to fail the build.
    throw new Error(`[getProjects] Failed to load projects from Supabase: ${error.message}`);
  }

  return ((data ?? []) as ProjectRow[]).map((row) => ({
    slug: row.slug,
    title: row.title,
    address: row.address ?? undefined,
    summary: row.summary ?? undefined,
    description: row.description ?? undefined,
    notes: row.notes ?? undefined,
    priority: row.priority ?? undefined,
    tags: row.tags ?? undefined,
    coverPosition: row.cover_position ?? undefined,
    updatedBy: row.updated_by ?? undefined,
    updatedAt: row.updated_at ?? undefined,
  }));
}

// Bulk fetch of all admin-edited Chinese translations, grouped by slug then
// locale — used to overlay title/summary/description/notes onto the English
// base per-field (a partially translated project falls back to English for
// whichever fields are still empty), mirroring the fallback the old
// messages/*.json lookup used to do.
async function loadTranslations(): Promise<Map<string, Record<string, ProjectTranslationRow>>> {
  const { data, error } = await supabaseAdmin()
    .from("project_translations")
    .select("slug, locale, title, summary, description, notes, updated_by, updated_at");

  if (error) {
    throw new Error(`[getProjects] Failed to load project translations from Supabase: ${error.message}`);
  }

  const bySlug = new Map<string, Record<string, ProjectTranslationRow>>();
  for (const row of (data ?? []) as (ProjectTranslationRow & { slug: string })[]) {
    const byLocale = bySlug.get(row.slug) ?? {};
    byLocale[row.locale] = row;
    bySlug.set(row.slug, byLocale);
  }
  return bySlug;
}

// Direct (uncached) fetch for a single project's translation rows — used by
// the admin edit form, which always wants the latest value, not whatever
// happens to be in the process-lifetime cache below.
export async function getProjectTranslationsForSlug(
  slug: string
): Promise<Record<string, ProjectTranslationRow>> {
  const { data, error } = await supabaseAdmin()
    .from("project_translations")
    .select("locale, title, summary, description, notes, updated_by, updated_at")
    .eq("slug", slug);

  if (error) {
    throw new Error(`[getProjects] Failed to load translations for "${slug}": ${error.message}`);
  }

  const out: Record<string, ProjectTranslationRow> = {};
  for (const row of (data ?? []) as ProjectTranslationRow[]) out[row.locale] = row;
  return out;
}

/** --------- API --------- */
// Cached in production only, keyed by locale: generateStaticParams + one
// render per slug/locale used to trigger a full filesystem rescan + Supabase
// fetch on every single call (~90 times for 30 projects x 3 locales).
// Caching is skipped in dev so newly added projects / admin edits show up on
// refresh without a server restart. Each entry is a Promise (not the
// resolved value) so concurrent callers during the same build share one
// in-flight fetch instead of firing duplicate Supabase requests.
const cachedProjects = new Map<string, Promise<ProjectRecord[]>>();
let cachedTranslations: Promise<Map<string, Record<string, ProjectTranslationRow>>> | null = null;

function getTranslationsMap() {
  if (cachedTranslations) return cachedTranslations;
  const translations = loadTranslations();
  if (process.env.NODE_ENV === "production") cachedTranslations = translations;
  return translations;
}

export function getAllProjects(locale: string = "en"): Promise<ProjectRecord[]> {
  const cached = cachedProjects.get(locale);
  if (cached) return cached;

  const projects = computeAllProjects(locale);
  if (process.env.NODE_ENV === "production") cachedProjects.set(locale, projects);
  return projects;
}

// The Amplify SSR server is a long-lived Node process, so the module-scope
// caches above survive across requests — an /admin save must clear them (in
// addition to Next's own revalidatePath) or edits won't appear until the
// server restarts.
export function invalidateProjectsCache() {
  cachedProjects.clear();
  cachedTranslations = null;
}

async function computeAllProjects(locale: string): Promise<ProjectRecord[]> {
  if (!fs.existsSync(PROJECTS_DIR)) return [];

  const metaList = await loadMeta();
  const metaBySlug = new Map<string, ProjectMeta>(
    metaList.map((m) => [m.slug, m])
  );
  const translationsBySlug = TRANSLATABLE_LOCALES.has(locale) ? await getTranslationsMap() : null;

  const slugs = fs
    .readdirSync(PROJECTS_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort();


  const scanned: ProjectRecord[] = slugs
    .map((slug) => {
      const dir = path.join(PROJECTS_DIR, slug);
      const files = fs
        .readdirSync(dir)
        .filter((f) => IMAGE_EXTS.has(path.extname(f).toLowerCase()))
        .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));

      const meta = metaBySlug.get(slug);

      // 4 or fewer images = not enough for a detail page; show as gallery-pending in the grid
      const comingSoon = files.length <= 4;

      if (!files.length) {
        return {
          slug,
          title: meta?.title ?? titleFromSlug(slug),
          cover: "",
          images: [],
          comingSoon: true,
          ...(meta ?? {}),
        } as ProjectRecord;
      }

      const base: ProjectRecord = {
        slug,
        title: titleFromSlug(slug),
        cover: preferCover(files),
        images: files,
        comingSoon,
      };

      const merged: ProjectRecord = meta ? { ...base, ...meta } : base;

      const translation = translationsBySlug?.get(slug)?.[locale];
      if (!translation) return merged;

      // Overlay per-field, not per-row — a partially translated project
      // falls back to the English value for whichever fields are still empty.
      return {
        ...merged,
        title: translation.title ?? merged.title,
        summary: translation.summary ?? merged.summary,
        description: translation.description ?? merged.description,
        notes: translation.notes ?? merged.notes,
      };
    })
    .filter(Boolean) as ProjectRecord[];

  // Sort: priority first (lower = top), then alphabetically by title
  return scanned.sort((a, b) => {
    const aPriority = a.priority ?? 999;
    const bPriority = b.priority ?? 999;
    if (aPriority !== bPriority) return aPriority - bPriority;
    return a.title.localeCompare(b.title);
  });
}

export async function getProjectBySlug(slug: string, locale: string = "en"): Promise<ProjectRecord | undefined> {
  const all = await getAllProjects(locale);
  return all.find((p) => p.slug === slug);
}
