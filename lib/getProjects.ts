// lib/getProjects.ts
import "server-only";
import fs from "node:fs";
import path from "node:path";
import { imageSize } from "image-size";

/** --------- Types --------- */
export type ProjectRecord = {
  slug: string;
  title: string;
  cover: string;
  coverIsLandscape?: boolean;
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

function isCoverLandscape(filePath: string): boolean {
  try {
    const buffer = fs.readFileSync(filePath);
    const { width, height } = imageSize(buffer);
    if (!width || !height) return false;
    return width / height >= 1;
  } catch {
    return false;
  }
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

      const cover = preferCover(files);

      const base: ProjectRecord = {
        slug,
        title: titleFromSlug(slug),
        cover,
        coverIsLandscape: cover ? isCoverLandscape(path.join(dir, cover)) : false,
        images: files,
        comingSoon,
      };

      if (!meta) return base;

      return {
        ...base,
        ...meta,
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

export function getProjectBySlug(slug: string): ProjectRecord | undefined {
  const all = getAllProjects();
  return all.find((p) => p.slug === slug);
}
