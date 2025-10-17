// app/(site)/data/library.ts
import "server-only";
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const LIBRARY_DIR = path.join(ROOT, "public", "images", "library");

export type LibraryImage = { filename: string };

function getAllLibraryImages(): LibraryImage[] {
  if (!fs.existsSync(LIBRARY_DIR)) return [];
  return fs
    .readdirSync(LIBRARY_DIR)
    .filter((f) => f.toLowerCase().endsWith(".avif"))
    .sort()
    .map((filename) => ({ filename }));
}

// optional utility — grab N random samples
export function getRandomLibraryImages(count = 4): LibraryImage[] {
  const all = getAllLibraryImages();
  return all.sort(() => 0.5 - Math.random()).slice(0, count);
}

export const LIBRARY_IMAGES = getAllLibraryImages();
