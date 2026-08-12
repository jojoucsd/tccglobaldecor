#!/usr/bin/env node
// One-time import of the AI-translated projectTitles/projectDetails out of
// messages/zh-TW.json and messages/zh-CN.json into the Supabase
// `project_translations` table, where HK office staff can correct them via
// /admin. Run supabase/schema_translations.sql first, then:
//   node --env-file=.env.local scripts/migrate-translations-to-supabase.mjs
//
// Safe to re-run — upserts on (slug, locale), so it won't create duplicates.

import fs from 'node:fs';
import path from 'node:path';
import { createClient } from '@supabase/supabase-js';
import WebSocket from 'ws';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceRoleKey) {
  console.error(
    'Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.\n' +
    'Run with: node --env-file=.env.local scripts/migrate-translations-to-supabase.mjs'
  );
  process.exit(1);
}

const LOCALES = ['zh-TW', 'zh-CN'];

const rows = [];

for (const locale of LOCALES) {
  const messagesPath = path.join(process.cwd(), 'messages', `${locale}.json`);
  const messages = JSON.parse(fs.readFileSync(messagesPath, 'utf8'));

  const titles = messages.projectTitles ?? {};
  const details = messages.projectDetails ?? {};

  const slugs = new Set([...Object.keys(titles), ...Object.keys(details)]);

  for (const slug of slugs) {
    const detail = details[slug] ?? {};
    rows.push({
      slug,
      locale,
      title: titles[slug] ?? null,
      summary: detail.summary ?? null,
      description: detail.description ?? null,
      notes: detail.notes ?? null,
    });
  }
}

if (!rows.length) {
  console.error('No projectTitles/projectDetails entries found in messages/zh-TW.json or messages/zh-CN.json');
  process.exit(1);
}

const supabase = createClient(url, serviceRoleKey, {
  auth: { persistSession: false },
  realtime: { transport: WebSocket }, // Node <22 has no global WebSocket; see lib/supabase.ts
});

const { data, error } = await supabase
  .from('project_translations')
  .upsert(rows, { onConflict: 'slug,locale' })
  .select('slug, locale');

if (error) {
  console.error('Migration failed:', error.message);
  process.exit(1);
}

console.log(`Upserted ${data.length} project translations into Supabase:`);
for (const row of data) console.log(`  - ${row.slug} (${row.locale})`);
