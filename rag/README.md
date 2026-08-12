# RAG Corpus — Baseline

This directory is a **generated** markdown export of TCC Carpets' own live
site content — company/capability copy from `messages/en.json` and a few
small static data files, plus every project's title/address/summary/
description/notes/tags pulled live from Supabase. English only; the site's
zh-TW/zh-CN copy isn't needed here.

It exists as the foundation layer for the Phase 5 RAG knowledge base (see
CLAUDE.md) — real, already-reviewed, on-brand facts about the company and
its project history, available before Marco's emails and technical spec
material (the deeper, sales-specific layer) get added.

## Regenerating

```
node --env-file=.env.local scripts/export-rag-corpus.mjs
```

Safe to re-run anytime the site's content changes (a new project, an edited
description, updated capability copy) — it always overwrites, never merges.

## Do not hand-edit files in this directory

Everything under `rag/projects/` and `rag/company/` is a build artifact of
the script above. If someone edits a `.md` file here directly, the next
regeneration silently overwrites it — the file and the live site will look
in sync right up until that happens, then quietly diverge. This is the same
single-source-of-truth trap this codebase has hit before with duplicated
content (see CLAUDE.md's Awards/Gallery/translation history).

**Curated content that doesn't come from the live site — Marco's case
studies, technical specs (pile height, fiber type, etc.), sales narratives —
belongs in separate files, not merged into these.** That split doesn't exist
yet (no curated material has been gathered), but when it does, keep it in
its own directory so a reader can always tell "this came from the site" from
"someone wrote this by hand."

## Layout

```
rag/
  projects/{slug}.md   — one file per project (title, address, summary, description, notes, tags)
  company/*.md          — about, craftsmanship, specialization, markets, process, awards, collaborations, clients, contact
```

Each file has light YAML frontmatter (`type`, `slug`/`topic`, `tags`) for
whatever loader eventually ingests this into an embedding/vector store.
