# TCC-Site Codebase Reference

**Last Updated:** 2026-07-24
**Project:** TCC Carpets Marketing Website
**Framework:** Next.js 15 with React 19, TypeScript, Tailwind CSS 4

---

## Project Overview

A Next.js-based marketing/portfolio website for **TCC Carpets**, a bespoke carpet manufacturer specializing in high-end hospitality and interior design projects. The site showcases carpet designs and projects for luxury hotels, casinos, and hospitality brands worldwide.

**Key Technologies:**
- Next.js 15 (App Router, static export)
- React 19
- TypeScript 5
- Tailwind CSS 4 (with custom CSS variables, not the v3 config file approach)
- Deployed via GitHub Pages (`gh-pages` branch)
- Base path: `/tccglobaldecor`

---

## Directory Structure

```
/
├── app/                          # Next.js App Router
│   ├── (site)/                  # Route group — all public pages
│   │   ├── page.tsx             # Homepage (composes all major sections)
│   │   ├── layout.tsx           # Site shell: Header + Footer + VideoModalProvider
│   │   ├── projects/
│   │   │   ├── page.tsx         # Projects grid (sorted by priority)
│   │   │   └── [slug]/
│   │   │       ├── page.tsx                # Server component — fetches project data
│   │   │       └── ProjectLayoutClient.tsx # Client carousel + image layout
│   │   ├── gallery/
│   │   │   └── [slug]/page.tsx  # Gallery matrix + related projects strip
│   │   ├── awards/
│   │   │   └── [slug]/page.tsx  # Individual award detail
│   │   ├── collaborations/
│   │   │   └── page.tsx         # ⚠️ PLACEHOLDER — uses fake "Studio A/B/C" names
│   │   ├── connect/page.tsx     # Contact form (client-side only, no backend)
│   │   └── process/page.tsx     # Production process timeline
│   │   └── data/                # JSON/TS data files (see Data section)
│   ├── layout.tsx               # Root layout: metadata, mourning-mode env var
│   └── globals.css              # Global styles + Tailwind v4 theme tokens
│
├── components/                   # All shared React components
│   ├── Header.tsx               # Nav with scroll-spy, mobile drawer, trade show badge
│   ├── HeaderWrapper.tsx        # Measures header height → sets --header-h CSS var
│   ├── Footer.tsx               # Simple footer with copyright
│   ├── Section.tsx              # Layout primitive (padding, max-width, bleed)
│   ├── HeroCarousel.tsx         # 4-slide auto-rotating hero (3 photo + 1 reveal)
│   ├── TriptychRevealSlide.tsx  # 3-image staggered reveal (desktop) / crossfade (mobile)
│   ├── VideoModalProvider.tsx   # Context + global iframe modal for videos
│   ├── AlternatingCard.tsx      # Image/text card used across sections
│   ├── TradeShowBadge.tsx       # Hardcoded BDNY '26 event badge
│   ├── WorldMapStatic.tsx       # SVG world map with 18 city pins
│   ├── about/About.tsx          # About section: image, 3 pillars, highlights
│   ├── capability/
│   │   ├── CapabilitySection.tsx  # Wrapper — renders all 3 sub-sections
│   │   ├── Craftsmanship.tsx      # UN HQ project carousel
│   │   ├── Markets.tsx            # Market pills + world map + image/desc
│   │   └── Specialization.tsx     # 6 carpet-type cards
│   ├── clients/ClientsBelt.tsx  # Seeded-random marquee of client logos
│   ├── gallery/PhotoGrid.tsx    # 6-item asymmetric matrix grid
│   ├── awards/AwardsTeaser.tsx  # 4 award cards with optional video
│   ├── collab/CollabTeaser.tsx  # 4 partner cards (horizontal scroll on mobile)
│   ├── connect/
│   │   ├── ConnectForm.tsx      # Contact form with offices list
│   │   └── ConnectSection.tsx   # CTA block linking to /connect
│   ├── sectors/SectorsSection.tsx  # Currently unused (removed from homepage)
│   └── belts/MediaBelt.tsx      # Generic marquee belt for images
│
├── lib/
│   ├── cn.ts                    # clsx + tailwind-merge utility
│   ├── strings.ts               # titleFromSlug helper
│   ├── types.ts                 # HeroSlide type
│   └── getProjects.ts           # Server-only: scans /public/images/projects/ + merges JSON meta
│
├── hooks/
│   └── useScrollSpy.ts          # IntersectionObserver-based active section tracking
│
└── public/images/               # All static assets (organized by feature)
    ├── projects/[slug]/         # Each project in its own folder
    ├── clients/                 # 63 client logos (client_img_1.avif … 63.avif)
    ├── gallery/                 # Specialization + award images
    ├── collaborations/          # 4 partner logos
    ├── capability/              # Craftsmanship, markets, specialization images
    ├── hero/                    # 4 hero slides + mobile variants
    ├── process/                 # 9 step images
    ├── awards/                  # 4 award card images
    ├── about/                   # artineveryfootstep.avif
    └── TCC_Logo.svg
```

---

## Key Files Quick Reference

| File | What it does |
|------|-------------|
| `app/layout.tsx` | Root layout, global metadata, mourning-mode env toggle |
| `app/(site)/page.tsx` | Homepage — imports and orders all section components |
| `app/(site)/layout.tsx` | Wraps every page with Header, Footer, VideoModalProvider |
| `components/Header.tsx` | Responsive nav: scroll-hide, scroll-spy, mobile drawer |
| `components/HeroCarousel.tsx` | Auto-rotating 4-slide hero with reduced-motion support |
| `lib/getProjects.ts` | **Server-only.** Reads `/public/images/projects/` then merges metadata from `projects.json` |
| `app/(site)/data/projects.json` | Project metadata: title, address, summary, description, notes, priority |
| `app/(site)/data/clients.ts` | Generates 63 `ClientLogo` refs (numeric filenames) |
| `app/(site)/data/collaborations.ts` | Canonical source for partner data (synced with `CollabTeaser.tsx`) |
| `hooks/useScrollSpy.ts` | IntersectionObserver; returns active section id |
| `components/Section.tsx` | Spacing/layout primitive — use this for all page sections |
| `lib/cn.ts` | `clsx` + `tailwind-merge` — always use this for conditional classes |
| `next.config.ts` | GitHub Pages static export config |

---

## Data Management

### Projects (canonical flow)
1. **Images:** Drop images into `/public/images/projects/[slug]/`
2. **Metadata:** Add entry to `/app/(site)/data/projects.json`
3. **Discovery:** `getProjects.ts` scans the folder, merges JSON, sorts by `priority` (lower = first), then alpha

```json
{
  "slug": "project-name",
  "priority": 1,
  "title": "Display Title",
  "address": "City, Country",
  "summary": "Short overview paragraph",
  "description": "Longer detail paragraph",
  "notes": "Extra notes (optional)"
}
```

**Cover image selection:** prefers `project_list*.avif`, then any `.avif`, then first image alphabetically.

**Image naming convention:** Use `project_list_img_1.avif` for the cover. Remaining images are sorted numerically (natural sort).

### Clients
- Source: `/app/(site)/data/clients.ts` — generates 63 entries with numeric filenames
- Images: `/public/images/clients/client_img_1.avif` … `client_img_63.avif`
- `ClientsBelt` accepts a `seed` prop for stable random shuffles across different instances

### Collaborations
- **`/app/(site)/data/collaborations.ts`** is the canonical data source — edit this
- `CollabTeaser.tsx` duplicates the data inline (historical artifact); keep them in sync
- `app/(site)/collaborations/page.tsx` is **placeholder content** — needs real copy

### Gallery
- Source: `/app/(site)/data/gallery.ts`
- Entries: 6 specialization types + 3 award entries
- Images: `/public/images/gallery/`

---

## Routing

| Route | Component | Notes |
|-------|-----------|-------|
| `/` | `app/(site)/page.tsx` | Homepage |
| `/projects` | `app/(site)/projects/page.tsx` | Grid, sorted by priority |
| `/projects/[slug]` | `ProjectLayoutClient.tsx` | Carousel + layout adapts to image count |
| `/gallery/[slug]` | `app/(site)/gallery/[slug]/page.tsx` | Matrix grid |
| `/awards/[slug]` | `app/(site)/awards/[slug]/page.tsx` | Award detail |
| `/collaborations` | `app/(site)/collaborations/page.tsx` | ⚠️ Placeholder |
| `/connect` | `app/(site)/connect/page.tsx` | Form (no backend) |
| `/process` | `app/(site)/process/page.tsx` | Timeline |

---

## Component Patterns

### Section Component
Use `<Section>` for every page section. Props:

```tsx
<Section
  id="about"           // for scroll-spy
  as="section"         // element type
  pad="md"             // sm | md | lg — vertical padding
  maxWidth="2xl"       // lg | xl | 2xl | full
  bleed              // full-width background color
  gutters={true}       // horizontal padding (default true)
  safeTop            // iOS safe-area padding
>
```

### Scroll Spy
`useScrollSpy()` returns the active section id. Header uses this to highlight nav links. Sections must have an `id` matching the nav entry. The header height offset is provided via `--header-h` CSS variable (set by `HeaderWrapper`).

### Video Modal
```tsx
const { open } = useVideoModal();
open("https://play.vidyard.com/xxx");
```
The modal renders globally in `app/(site)/layout.tsx`.

### Base Path for Images
Always prefix static image `src` with:
```tsx
const bp = process.env.NEXT_PUBLIC_BASE_PATH || "";
// usage:
<Image src={`${bp}/images/projects/${slug}/cover.avif`} />
```

### Client Logo Marquee
```tsx
<ClientsBelt seed={1} />              // random subset, stable across renders
<ClientsBelt seed={3} title="Our Global Partners" />
```
Multiple instances on the same page use different seeds for variety.

### AlternatingCard
Used for collab cards, project cards, and detail pages. Key props:
- `variant`: `"imageTop"` | `"textTop"` — image/text order
- `compact`: smaller font + spacing
- `showText`: toggle text block (still reserves space by default)

---

## Styling System

### Tailwind CSS 4
Uses CSS-variable-based theming in `globals.css` (not `tailwind.config.js`):

```css
@theme {
  --color-brand-gold: #D1D5DB;       /* light gray accent */
  --color-brand-gold-deep: #9CA3AF;  /* medium gray */
  --color-brand-ink: #1F2937;        /* dark text */
}
```

Custom animations in `globals.css`:
- `clients-marquee` — continuous left scroll for logo belts
- `clients-marquee-reverse` — reverse direction variant

### Responsive Breakpoints
Standard Tailwind: `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px)

---

## Build & Deployment

```bash
npm run dev              # Dev server at localhost:3000
npm run build            # Standard Next.js build
npm run build:pages      # Static export for GitHub Pages (sets GITHUB_PAGES=true)
npm run deploy           # Builds + pushes to gh-pages branch
npm run lint             # ESLint (errors ignored in build per next.config.ts)
```

**GitHub Pages config:**
- Env: `GITHUB_PAGES=true`
- Base path: `/tccglobaldecor`
- Output: `/out` directory (static export)
- Branch: `gh-pages`
- Requires `.nojekyll` file in `/out`

### Environment Variables

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_BASE_PATH` | `/tccglobaldecor` on GitHub Pages, empty in dev |
| `NEXT_PUBLIC_MOURNING_MODE` | Enables mourning styling |
| `GITHUB_PAGES` | Triggers static export mode in `next.config.ts` |

---

## Known Issues & Tech Debt

### Must Fix Before Launch

**1. Collaborations page is all placeholder content**
`app/(site)/collaborations/page.tsx` uses fake partners: "Studio A", "Designer B", "Brand C", "Curator D", "Atelier E", "House F". All copy and `CardVisuals` (gray boxes) are placeholder. Needs real content.

**2. Contact form has no backend**
`ConnectForm.tsx` simulates submission client-side only. No email is ever sent. Also has inconsistent email addresses: form shows `matthewsu@tcc-carpets.com`, success message says `info@tcc-carpets.com`.

### Medium Priority

**3. Hydration mismatch risk in HeroCarousel**
`useIsMobile()` calls `matchMedia` during render — value differs between SSR and client. Add an `isMounted` guard before reading `isMobile`.

**4. Project image count assumptions**
`ProjectLayoutClient.tsx` accesses images by hardcoded index (hero=`[1]`, etc.). If a project has fewer images than expected, `.at(-1)` silently reuses the last image, causing duplicates. Validate image count in `getProjectBySlug`.

**5. TradeShowBadge is hardcoded**
`TradeShowBadge.tsx` has event details baked in. Update manually when the event changes or move to a data file.

**6. CollabTeaser.tsx duplicates data**
The `COLLABORATIONS` array in `CollabTeaser.tsx` is a copy of `data/collaborations.ts`. The component should import from the data file. Until then, update both when changing partner info.

### Low Priority

**7. Carousel keyboard navigation missing**
HeroCarousel, Craftsmanship carousel, and Project carousel have no arrow-key support. Impacts keyboard accessibility.

**8. WorldMapStatic pin positions are approximate**
Pin coordinates are percentage-based estimates. Labels may overlap at small sizes.

**9. No shared carousel abstraction**
Three separate carousel implementations (HeroCarousel, Craftsmanship.tsx, ProjectLayoutClient.tsx) each do slightly different things. Could be consolidated.

**10. Image loading strategy is inconsistent**
Some images use `priority`, some `loading="lazy"`, some neither. Review and standardize.

---

## Common Tasks

### Adding a New Project
1. Create `/public/images/projects/[slug]/`
2. Add cover image named `project_list_img_1.avif` (or any `.avif` — first one wins)
3. Add remaining images; they display in sort order
4. Add entry to `app/(site)/data/projects.json` with `slug`, `title`, `address`, `summary`, `description`
5. Set `"priority": 1` to feature it at the top of the grid

### Updating Trade Show Badge
Edit `components/TradeShowBadge.tsx` — all event details are hardcoded there.

### Adding a Client Logo
1. Add `.avif` to `/public/images/clients/` named `client_img_64.avif` (next number)
2. Update the array length in `app/(site)/data/clients.ts`

### Changing a Collaboration Partner
1. Update `app/(site)/data/collaborations.ts`
2. Also update the inline `COLLABORATIONS` array in `components/collab/CollabTeaser.tsx` (same data, duplicated)
3. Add/replace image in `/public/images/collaborations/`

### Updating Navigation Links
Edit the `NAV` array in `components/Header.tsx`.

### Changing Color Theme
Update `@theme` block in `app/globals.css`:
```css
@theme {
  --color-brand-gold: #newcolor;
}
```

---

## Architecture Notes

**Why static export?** The site is hosted on GitHub Pages which doesn't support Node.js. `next.config.ts` sets `output: "export"` when `GITHUB_PAGES=true`, generating a fully static `/out` folder.

**Why hybrid project discovery?** `getProjects.ts` reads the filesystem at build time (no database needed), then overlays structured metadata from `projects.json`. Adding a project only requires dropping images in the right folder — metadata is optional (slug becomes the title fallback).

**Why multiple ClientsBelt seeds?** The logo list is shuffled deterministically by seed so different instances on the same page show visually varied subsets without randomness that breaks SSR hydration.

**Scroll spy + header height:** `HeaderWrapper` measures the header's rendered height and writes it to `--header-h` CSS variable. `useScrollSpy` reads this value as the IntersectionObserver root margin offset, ensuring the active section tracks correctly as the header resizes across breakpoints.

---

## Future TODOs

### Project Cover Images — Needs Research & Upload
Several project folders currently have low-res WeChat-compressed images or ChatGPT-generated placeholders as covers. Real high-res images need to be sourced and uploaded.

**Who should do this:** HK office team (once superadmin upload is built)
**How to source:**
- TCC's own installation photography (ask Matthew if any exists — this is the strongest content)
- Hotel official press/media kits (Wynn, Marriott/St. Regis, Sands/Venetian, Hard Rock, MGM all have free high-res downloads)
- Minimum acceptable size: 1400px wide for covers, 2000px+ preferred

**Projects that need attention:**
- `wynn-macau` — 750×500 (too small)
- `wynn-hotel-las-vegas` — 640×475 (too small)
- `st-regis-macau` — 480×720, 750×500, 900×600 (all small)
- `ritz-carlton-macau` — new image is 600×743 (small)
- `venetian-hotel-macau` — 1620×1279 (acceptable but not great)
- All 6 ChatGPT `cover.avif` files — AI-generated, should be replaced with real hotel photos

**Workflow once superadmin is built:** HK team researches + downloads hotel press images → uploads via superadmin → system converts to AVIF and slots into the right project folder automatically.

---

### Gallery Specialization Icons (`/public/images/projects/project_icon_img_*.avif`)
There are 21 loose `project_icon_img_1.avif` through `project_icon_img_21.avif` files sitting directly inside `/public/images/projects/` (not in a project subfolder). These are icons used by the 6 gallery specialization pages (e.g. `/gallery/hand-tufted`). Each specialization shows 1 icon pulled from this flat list.

**The problem:** The original intent was for each gallery specialization to have a carousel of project icons that grows as more projects are added. This was not built — instead a hardcoded carousel placeholder was shipped under the specialization section. The 21 icons are orphaned from their original purpose.

**What to do when time allows:**
1. Associate each `project_icon_img_*.avif` with a specific project slug (rename or move them into project folders)
2. Update the gallery specialization pages to dynamically pull icons from the relevant projects (filter `getAllProjects()` by carpet type/tag)
3. Add a `type` or `tags` field to `projects.json` (e.g. `"tags": ["axminster", "casino"]`) to support this filtering
4. Replace the static carousel placeholder in the specialization pages with the dynamic version

---

## Troubleshooting

**Build fails:** Check `npm run lint` first. TypeScript errors don't fail the build (configured to ignore in `next.config.ts`) but ESLint may flag things.

**GitHub Pages 404:** Verify base path `/tccglobaldecor` is set, `.nojekyll` exists in `/out/`, and `gh-pages` branch is deployed.

**Images not loading in production:** Check that `NEXT_PUBLIC_BASE_PATH` is set and that all `<Image>` `src` props are prefixed with `${bp}`.

**Scroll spy not working:** Sections need unique `id` attributes matching the nav entries. Header height offset is dynamic — check `--header-h` is being set by `HeaderWrapper`.

**Project not appearing:** Confirm the folder name in `/public/images/projects/` exactly matches the `slug` in `projects.json`. Folder must contain at least one image file.
