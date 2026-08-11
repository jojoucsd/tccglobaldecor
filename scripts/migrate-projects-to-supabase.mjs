#!/usr/bin/env node
// One-time import of app/(site)/data/projects.json into the Supabase `projects` table.
// Run supabase/schema.sql first, then:
//   node --env-file=.env.local scripts/migrate-projects-to-supabase.mjs
//
// Safe to re-run — upserts on `slug`, so it won't create duplicates.

import fs from 'node:fs';
import path from 'node:path';
import { createClient } from '@supabase/supabase-js';
import WebSocket from 'ws';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceRoleKey) {
  console.error(
    'Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.\n' +
    'Run with: node --env-file=.env.local scripts/migrate-projects-to-supabase.mjs'
  );
  process.exit(1);
}

const jsonPath = path.join(process.cwd(), 'app', '(site)', 'data', 'projects.json');
const raw = fs.readFileSync(jsonPath, 'utf8');
const projects = JSON.parse(raw);

if (!Array.isArray(projects) || !projects.length) {
  console.error(`No entries found in ${jsonPath}`);
  process.exit(1);
}

// Mirrors lib/getProjects.ts's titleFromSlug() — some entries (e.g.
// londoner-grand) have no explicit "title" in the JSON and were relying on
// this fallback via the filesystem-merge path. Replicated here so the
// migrated row matches what the site already displays.
function titleFromSlug(slug) {
  return slug
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();
}

const rows = projects.map((p) => ({
  slug: p.slug,
  title: p.title ?? titleFromSlug(p.slug),
  address: p.address ?? null,
  summary: p.summary ?? null,
  description: p.description ?? null,
  notes: p.notes ?? null,
  priority: p.priority ?? null,
  tags: p.tags ?? [],
  cover_position: p.coverPosition ?? null,
}));

for (const r of rows) {
  if (!projects.find((p) => p.slug === r.slug).title) {
    console.warn(`  (no title in JSON for "${r.slug}" — using fallback "${r.title}")`);
  }
}

const missingSlug = rows.find((r) => !r.slug || !r.title);
if (missingSlug) {
  console.error('Entry missing required slug/title:', missingSlug);
  process.exit(1);
}

const supabase = createClient(url, serviceRoleKey, {
  auth: { persistSession: false },
  realtime: { transport: WebSocket }, // Node <22 has no global WebSocket; see lib/supabase.ts
});

const { data, error } = await supabase
  .from('projects')
  .upsert(rows, { onConflict: 'slug' })
  .select('slug');

if (error) {
  console.error('Migration failed:', error.message);
  process.exit(1);
}

console.log(`Upserted ${data.length} projects into Supabase:`);
for (const row of data) console.log(`  - ${row.slug}`);
