// lib/getProjects.ts
import "server-only";
import fs from "node:fs";
import path from "node:path";

export type ProjectItem = {
  slug: string;
  title: string;
  cover: string;
  images: string[];
};

const ROOT = process.cwd();
const PROJECTS_DIR = path.join(ROOT, "public", "images", "projects");
const IMAGE_EXTS = new Set([".avif", ".jpg", ".jpeg", ".png", ".webp"]);

function titleFromSlug(slug: string) {
  return slug.replace(/[-_]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()).trim();
}
function preferCover(files: string[]) {
  const avifs = files.filter((f) => path.extname(f).toLowerCase() === ".avif");
  const preferred = avifs.find((f) => /project_list/i.test(f));
  if (preferred) return preferred;
  if (avifs.length) return avifs[0];
  return files[0] ?? "";
}

export function getAllProjects(): ProjectItem[] {
  if (!fs.existsSync(PROJECTS_DIR)) return [];
  const slugs = fs
    .readdirSync(PROJECTS_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort();

  return slugs
    .map((slug) => {
      const dir = path.join(PROJECTS_DIR, slug);
      const files = fs
        .readdirSync(dir)
        .filter((f) => IMAGE_EXTS.has(path.extname(f).toLowerCase()))
        .sort();
      if (!files.length) return null;
      return {
        slug,
        title: titleFromSlug(slug),
        cover: preferCover(files),
        images: files,
      } as ProjectItem;
    })
    .filter(Boolean) as ProjectItem[];
}

export function getProjectBySlug(slug: string): ProjectItem | undefined {
  return getAllProjects().find((p) => p.slug === slug);
}
