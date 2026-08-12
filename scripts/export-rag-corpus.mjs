#!/usr/bin/env node
// Generates the baseline markdown corpus for the future RAG chatbot
// (Phase 5, see CLAUDE.md) from the site's own live content — the Supabase
// `projects` table (English fields only, no translations needed here) plus
// messages/en.json and a handful of small, stable static data files.
//
// This is a GENERATED baseline: safe to re-run anytime site content
// changes. Do not hand-edit files under /rag — see rag/README.md for why.
//
// Run with: node --env-file=.env.local scripts/export-rag-corpus.mjs

import fs from 'node:fs';
import path from 'node:path';
import { createClient } from '@supabase/supabase-js';
import WebSocket from 'ws';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceRoleKey) {
  console.error(
    'Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.\n' +
    'Run with: node --env-file=.env.local scripts/export-rag-corpus.mjs'
  );
  process.exit(1);
}

const supabase = createClient(url, serviceRoleKey, {
  auth: { persistSession: false },
  realtime: { transport: WebSocket }, // Node <22 has no global WebSocket; see lib/supabase.ts
});

const ROOT = process.cwd();
const RAG_DIR = path.join(ROOT, 'rag');
const PROJECTS_DIR = path.join(RAG_DIR, 'projects');
const COMPANY_DIR = path.join(RAG_DIR, 'company');

const messages = JSON.parse(fs.readFileSync(path.join(ROOT, 'messages', 'en.json'), 'utf8'));

// ---------------------------------------------------------------------
// Small, stable data mirrored from the app. Node can't import .tsx/.ts
// app source directly, so these are transcribed here rather than pulled
// in at runtime — same tradeoff scripts/migrate-projects-to-supabase.mjs
// already made for titleFromSlug(). Each block names its source of
// truth; update here if that source ever changes.
// ---------------------------------------------------------------------

// Source of truth: app/(site)/data/awards.ts + messages.awardTitles
const AWARDS = [
  { slug: 'sands-supplier-excellence-award' },
  { slug: 'marina-bay-singapore-award' },
  { slug: 'gold-key-award' },
  { slug: 'thedesignawards' },
];

// Source of truth: app/(site)/data/collaborations.ts
const COLLABORATIONS = [
  { title: "Alexander's Collection", role: 'Design Partner', url: 'https://www.alexanders-collection.com/rugs' },
  { title: 'One M Interiors', role: 'Creative Partner', url: 'https://www.oneminteriors.com/' },
  { title: 'TredMor®', role: 'Material Collaboration', url: 'https://commercial-carpetcushion.com/' },
  { title: 'Malta Projects', role: 'Business Partner', url: 'https://www.maltasolutions.biz/' },
];

// Source of truth: app/(site)/data/gallery.ts, paired with messages.specialization keys
const SPECIALIZATIONS = [
  { titleKey: 'handTufted', descKey: 'handTuftedDesc' },
  { titleKey: 'axminster', descKey: 'axminsterDesc' },
  { titleKey: 'handAx', descKey: 'handAxDesc' },
  { titleKey: 'axTiles', descKey: 'axTilesDesc' },
  { titleKey: 'printedCarpet', descKey: 'printedCarpetDesc' },
  { titleKey: 'machineTufted', descKey: 'machineTuftedDesc' },
];

// Source of truth: app/[locale]/(site)/connect/page.tsx OFFICES
const OFFICES = [
  {
    region: 'Asia Pacific',
    name: 'TCC Carpets International Ltd.',
    lines: ['Flat 4–5, 14/F, Cheung Hing Building,', '540 Nathan Road, Yaumatei,', 'Kowloon, Hong Kong'],
    tel: '+852 2348 4848',
    fax: '+852 2782 2190',
    email: 'matthewsu@tcc-carpets.com',
  },
  {
    region: 'North America',
    name: 'TCC Global Decor LLC',
    lines: ['777 Cloud Creek St.', 'Henderson, NV 89011, USA'],
    tel: null,
    fax: null,
    email: 'matthewsu@tcc-carpets.com',
  },
  {
    region: 'Greater China',
    name: 'TCC Carpets Manufacture Ltd.',
    lines: ['19 Andar C & D, Edif. Kin Heng Long Plaza,', "258 Alameda Dr. Carlos d'Assumpcao,", 'Macau SAR'],
    tel: null,
    fax: null,
    email: 'matthewsu@tcc-carpets.com',
  },
];

// Source of truth: app/[locale]/(site)/process/page.tsx STEPS — the last 3
// titles are hardcoded English-only in the app too (confirmed intentional
// in CLAUDE.md), not translation keys.
const PROCESS_STEPS = [
  messages.process.step1Title,
  messages.process.step2Title,
  messages.process.step3Title,
  messages.process.step4Title,
  messages.process.step5Title,
  'Autograph Suite',
  'Kameo Suite',
  'Ikonik Suite',
];

// ---------------------------------------------------------------------

function frontmatter(fields) {
  const lines = ['---'];
  for (const [k, v] of Object.entries(fields)) {
    if (v == null) continue;
    if (Array.isArray(v)) lines.push(`${k}: [${v.map((x) => JSON.stringify(x)).join(', ')}]`);
    else lines.push(`${k}: ${JSON.stringify(v)}`);
  }
  lines.push('---', '');
  return lines.join('\n');
}

function write(file, sections) {
  const body = sections.filter((s) => s != null && s !== '').join('\n\n');
  fs.writeFileSync(file, body.trimEnd() + '\n', 'utf8');
}

fs.mkdirSync(PROJECTS_DIR, { recursive: true });
fs.mkdirSync(COMPANY_DIR, { recursive: true });

// ---- Projects ----

const { data: projects, error } = await supabase
  .from('projects')
  .select('slug, title, address, summary, description, notes, tags, priority')
  .order('slug');

if (error) {
  console.error('Failed to load projects:', error.message);
  process.exit(1);
}

for (const p of projects) {
  write(path.join(PROJECTS_DIR, `${p.slug}.md`), [
    frontmatter({ type: 'project', slug: p.slug, title: p.title, tags: p.tags ?? [] }).trimEnd(),
    `# ${p.title}`,
    p.address ? `**Location:** ${p.address}` : null,
    p.tags?.length ? `**Tags:** ${p.tags.join(', ')}` : null,
    p.summary ? `## Overview\n\n${p.summary}` : null,
    p.description ? `## Details\n\n${p.description}` : null,
    p.notes ? `## Notes\n\n${p.notes}` : null,
  ]);
}
console.log(`Wrote ${projects.length} project files to rag/projects/`);

// ---- Company / topic files ----

write(path.join(COMPANY_DIR, 'about.md'), [
  frontmatter({ type: 'company', topic: 'about' }).trimEnd(),
  '# About TCC Carpets',
  messages.about.intro,
  `## Talent and Service\n\n${messages.about.talentDesc}`,
  `## Communication\n\n${messages.about.communicationDesc}`,
  `## Commitment\n\n${messages.about.commitmentDesc}`,
  `## Highlights\n\n- ${messages.about.highlight1}\n- ${messages.about.highlight2}\n- ${messages.about.highlight3}`,
  `## Positioning\n\n${messages.hero.subtitle}`,
]);

write(path.join(COMPANY_DIR, 'craftsmanship.md'), [
  frontmatter({ type: 'company', topic: 'craftsmanship' }).trimEnd(),
  '# Craftsmanship',
  messages.craftsmanship.body,
]);

write(path.join(COMPANY_DIR, 'specialization.md'), [
  frontmatter({ type: 'company', topic: 'specialization' }).trimEnd(),
  '# Specialization',
  messages.specialization.subtitle,
  ...SPECIALIZATIONS.map(
    (s) => `## ${messages.specialization[s.titleKey]}\n\n${messages.specialization[s.descKey]}`
  ),
]);

write(path.join(COMPANY_DIR, 'markets.md'), [
  frontmatter({ type: 'company', topic: 'markets' }).trimEnd(),
  '# Capabilities & Markets Served',
  messages.markets.bodyA,
  messages.markets.bodyB,
  `## ${messages.markets.marketsTitle}\n\n- ${[
    messages.markets.hotel,
    messages.markets.casino,
    messages.markets.cruise,
    messages.markets.aviation,
    messages.markets.yacht,
    messages.markets.retail,
  ].join('\n- ')}`,
]);

write(path.join(COMPANY_DIR, 'process.md'), [
  frontmatter({ type: 'company', topic: 'process' }).trimEnd(),
  `# ${messages.process.title}`,
  messages.process.subtitle,
  '## Steps',
  PROCESS_STEPS.map((title, i) => `${i + 1}. ${title}`).join('\n'),
]);

write(path.join(COMPANY_DIR, 'awards.md'), [
  frontmatter({ type: 'company', topic: 'awards' }).trimEnd(),
  `# ${messages.awards.title}`,
  messages.awards.subtitle,
  '## Awards',
  AWARDS.map((a) => `- ${messages.awardTitles[a.slug]}`).join('\n'),
]);

write(path.join(COMPANY_DIR, 'collaborations.md'), [
  frontmatter({ type: 'company', topic: 'collaborations' }).trimEnd(),
  `# ${messages.collaborations.title}`,
  '## Partners',
  COLLABORATIONS.map((c) => `- **${c.title}** — ${c.role} (${c.url})`).join('\n'),
]);

write(path.join(COMPANY_DIR, 'clients.md'), [
  frontmatter({ type: 'company', topic: 'clients' }).trimEnd(),
  '# Clients',
  messages.clients.defaultTitle,
  'The site displays 63 client/partner logos as images with no text name list in the underlying data — named clients are best identified through the project corpus instead (e.g. project titles like "Wynn Macau", "Marina Bay Sands").',
]);

write(path.join(COMPANY_DIR, 'contact.md'), [
  frontmatter({ type: 'company', topic: 'contact' }).trimEnd(),
  '# Offices & Contact',
  ...OFFICES.map((o) =>
    [
      `## ${o.region} — ${o.name}`,
      o.lines.join(' '),
      o.tel ? `Tel: ${o.tel}` : null,
      o.fax ? `Fax: ${o.fax}` : null,
      `Email: ${o.email}`,
    ]
      .filter(Boolean)
      .join('\n')
  ),
]);

console.log('Wrote 9 company files to rag/company/');
