// app/(site)/lib/getProjects.ts
import "server-only";
import fs from "node:fs";
import path from "node:path";

export type ProjectItem = {
  slug: string;     // folder under public/images/projects
  title: string;    // auto from slug (Title Case)
  cover: string;    // a chosen filename (prefer AVIF, or first image)
  images: string[]; // all images in that folder (filenames only)
};

const ROOT = process.cwd();
const PROJECTS_DIR = path.join(ROOT, "public", "images", "projects");

// Accept these; prefer .avif but allow others
const IMAGE_EXTS = new Set([".avif", ".jpg", ".jpeg", ".png", ".webp"]);

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

/** Scan public/images/projects/* at build time. */
export function getAllProjects(): ProjectItem[] {
  if (!fs.existsSync(PROJECTS_DIR)) return [];
  const slugs = fs
    .readdirSync(PROJECTS_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort();

  const items: ProjectItem[] = [];
  for (const slug of slugs) {
    const dir = path.join(PROJECTS_DIR, slug);
    const files = fs
      .readdirSync(dir)
      .filter((f) => IMAGE_EXTS.has(path.extname(f).toLowerCase()))
      .sort();

    if (!files.length) continue;

    items.push({
      slug,
      title: titleFromSlug(slug),
      cover: preferCover(files),
      images: files,
    });
  }
  return items;
}

export function getProjectBySlug(slug: string): ProjectItem | undefined {
  const all = getAllProjects();
  return all.find((p) => p.slug === slug);
}
