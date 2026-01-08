// lib/getProjects.ts
import "server-only";
import fs from "node:fs";
import path from "node:path";

/** --------- Types --------- */
export type ProjectRecord = {
  slug: string;
  title: string;
  cover: string;
  images: string[];

  // optional fields used by the project detail page
  subtitle?: string;
  address?: string;
  summary?: string;      // overview
  description?: string;  // details
  notes?: string;        // extra notes
};

type ProjectMeta = Partial<ProjectRecord> & { slug: string };

/** --------- Config --------- */
const ROOT = process.cwd();
const PROJECTS_DIR = path.join(ROOT, "public", "images", "projects");

// JSON lives here (your actual file) and an optional fallback
const META_PATHS = [
  path.join(ROOT, "app", "(site)", "data", "projects.json"),
  path.join(ROOT, "data", "projects.json"),
];

const IMAGE_EXTS = new Set([".avif", ".jpg", ".jpeg", ".png", ".webp"]);

/** --------- Helpers --------- */
function titleFromSlug(slug: string) {
  return slug
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();
}

function preferCover(files: string[]) {
  const avifs = files.filter((f) => path.extname(f).toLowerCase() === ".avif");
  const preferred = avifs.find((f) => /project_list/i.test(f));
  if (preferred) return preferred;
  if (avifs.length) return avifs[0];
  return files[0] ?? "";
}

function resolveMetaPath(): string | null {
  for (const p of META_PATHS) {
    if (fs.existsSync(p)) return p;
  }
  return null;
}

function loadMeta(): ProjectMeta[] {
  const metaPath = resolveMetaPath();
  if (!metaPath) return [];

  const raw = fs.readFileSync(metaPath, "utf8");

  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed.filter(
        (m) => m && typeof m.slug === "string"
      ) as ProjectMeta[];
    }
    return [];
  } catch (err) {
    console.error("[getProjects] Failed to parse projects.json:", err);
    // fail soft – projects still render from images only
    return [];
  }
}

/** --------- API --------- */
export function getAllProjects(): ProjectRecord[] {
  if (!fs.existsSync(PROJECTS_DIR)) return [];

  const metaList = loadMeta();
  const metaBySlug = new Map<string, ProjectMeta>(
    metaList.map((m) => [m.slug, m])
  );

  const slugs = fs
    .readdirSync(PROJECTS_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort();

  // DEBUG (optional): uncomment to verify slugs
  console.log("[projects] FS slugs:", slugs);
  console.log("[projects] JSON slugs:", metaList.map((m) => m.slug));

  const scanned: ProjectRecord[] = slugs
    .map((slug) => {
      const dir = path.join(PROJECTS_DIR, slug);
      const files = fs
        .readdirSync(dir)
        .filter((f) => IMAGE_EXTS.has(path.extname(f).toLowerCase()))
        .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));

      if (!files.length) return null;

      const base: ProjectRecord = {
        slug,
        title: titleFromSlug(slug),
        cover: preferCover(files),
        images: files,
      };

      const meta = metaBySlug.get(slug);
      if (!meta) return base;

      return {
        ...base,
        ...meta,
      };
    })
    .filter(Boolean) as ProjectRecord[];

  return scanned;
}

export function getProjectBySlug(slug: string): ProjectRecord | undefined {
  const all = getAllProjects();
  return all.find((p) => p.slug === slug);
}
