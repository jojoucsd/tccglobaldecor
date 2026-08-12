// lib/ragCorpus.ts
// Read-only access to the generated /rag markdown corpus (see
// scripts/export-rag-corpus.mjs, rag/README.md) for the /admin/rag viewer.
// Admin-only, so no caching — these are static files, reads are cheap, and
// there's no point adding staleness risk for a low-traffic internal page.
import "server-only";
import fs from "node:fs";
import path from "node:path";

const RAG_DIR = path.join(process.cwd(), "rag");
export const RAG_CATEGORIES = ["company", "projects"] as const;
export type RagCategory = (typeof RAG_CATEGORIES)[number];

export type RagFileRef = { category: RagCategory; slug: string };

export function listRagFiles(): RagFileRef[] {
  const out: RagFileRef[] = [];
  for (const category of RAG_CATEGORIES) {
    const dir = path.join(RAG_DIR, category);
    if (!fs.existsSync(dir)) continue;
    for (const file of fs.readdirSync(dir).sort()) {
      if (file.endsWith(".md")) out.push({ category, slug: file.slice(0, -3) });
    }
  }
  return out;
}

// category/slug come from a URL param — guard against path traversal
// (e.g. slug="../../secret") before touching the filesystem.
export function readRagFile(category: string, slug: string): string | null {
  if (!RAG_CATEGORIES.includes(category as RagCategory)) return null;

  const file = path.resolve(RAG_DIR, category, `${slug}.md`);
  const dir = path.resolve(RAG_DIR, category);
  if (!file.startsWith(dir + path.sep)) return null;

  if (!fs.existsSync(file)) return null;
  return fs.readFileSync(file, "utf8");
}
