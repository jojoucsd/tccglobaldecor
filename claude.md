# TCC-Site Codebase Reference

**Last Updated:** 2026-07-30
**Project:** TCC Carpets Marketing Website
**Framework:** Next.js 15 with React 19, TypeScript, Tailwind CSS 4

---

## Project Overview

A Next.js-based marketing/portfolio website for **TCC Carpets**, a bespoke carpet manufacturer specializing in high-end hospitality and interior design projects. The site showcases carpet designs and projects for luxury hotels, casinos, and hospitality brands worldwide.

**Key Technologies:**
- Next.js 15 (App Router, SSR on Amplify)
- React 19
- TypeScript 5
- Tailwind CSS 4 (with custom CSS variables, not the v3 config file approach)
- **next-intl v4.13.4** — EN + zh-TW + zh-CN i18n
- **Primary deployment:** AWS Amplify (SSR, supports middleware)
- **Legacy deployment:** GitHub Pages (`gh-pages` branch, static export only)
- Amplify base URL: no base path needed
- GitHub Pages base path: `/tccglobaldecor`

---

## Directory Structure

```
/
├── app/
│   ├── [locale]/                    # i18n route segment (en | zh-TW | zh-CN)
│   │   ├── layout.tsx               # html/body + NextIntlClientProvider
│   │   └── (site)/                  # Route group — all public pages
│   │       ├── page.tsx             # Homepage (composes all major sections)
│   │       ├── layout.tsx           # Site shell: Header + Footer + VideoModalProvider
│   │       ├── projects/
│   │       │   ├── page.tsx         # Server: fetches projects, renders header + <ProjectsGrid>
│   │       │   ├── ProjectsGrid.tsx # Client: tag filter chips, Load More pagination, card grid
│   │       │   └── [slug]/
│   │       │       ├── page.tsx                # Server component — fetches project data
│   │       │       └── ProjectLayoutClient.tsx # Client carousel + image layout
│   │       ├── gallery/
│   │       │   └── [slug]/page.tsx  # Gallery matrix + related projects strip — shared by Specialization AND Awards detail pages
│   │       ├── collaborations/
│   │       │   └── page.tsx         # ⚠️ PLACEHOLDER — needs real copy
│   │       ├── connect/page.tsx     # Contact page (no form — links to mail client)
│   │       └── process/page.tsx     # Production process timeline
│   │   └── (site)/data/             # JSON/TS data files — paths unchanged
│   ├── layout.tsx                   # Minimal passthrough (children only)
│   └── globals.css                  # Global styles + Tailwind v4 theme tokens
│
├── i18n/
│   ├── routing.ts                   # defineRouting — locales, defaultLocale, localePrefix
│   ├── request.ts                   # getRequestConfig — loads messages per request
│   └── navigation.ts                # createNavigation — locale-aware Link, useRouter, usePathname
│
├── messages/
│   ├── en.json                      # English strings (canonical — add keys here first)
│   ├── zh-TW.json                   # Traditional Chinese
│   └── zh-CN.json                   # Simplified Chinese
│
├── middleware.ts                    # next-intl createMiddleware — locale routing/detection
│
├── components/                      # All shared React components
│   ├── Header.tsx                   # Nav: scroll-spy, mobile drawer, language switcher (EN/繁/简)
│   ├── HeaderWrapper.tsx            # Measures header height → sets --header-h CSS var
│   ├── Footer.tsx                   # Simple footer with copyright
│   ├── Section.tsx                  # Layout primitive (padding, max-width, bleed)
│   ├── HeroCarousel.tsx             # 3-slide auto-rotating hero (photo slides; 'reveal' type wired but unused)
│   ├── TriptychRevealSlide.tsx      # 3-image staggered reveal (desktop) / crossfade (mobile)
│   ├── VideoModalProvider.tsx       # Context + global iframe modal for videos
│   ├── AlternatingCard.tsx          # Image/text card used across sections — always use @/i18n/navigation's Link inside it, not next/link
│   ├── TradeShowBadge.tsx           # Hardcoded BDNY '26 event badge
│   ├── WorldMapStatic.tsx           # SVG world map with 18 city pins
│   ├── about/About.tsx              # About section: image, 3 pillars, highlights
│   ├── capability/
│   │   ├── CapabilitySection.tsx    # Wrapper — renders all 3 sub-sections
│   │   ├── Craftsmanship.tsx        # UN HQ project carousel
│   │   ├── Markets.tsx              # Market pills + world map + image/desc
│   │   └── Specialization.tsx       # 6 carpet-type cards
│   ├── clients/ClientsBelt.tsx      # Seeded-random marquee of client logos
│   ├── gallery/PhotoGrid.tsx        # 6-item asymmetric matrix grid
│   ├── awards/AwardsTeaser.tsx      # Maps over data/awards.ts; grid layout, systematic stagger, optional video per award
│   ├── collab/CollabTeaser.tsx      # 4 partner cards (imports from data/collaborations.ts)
│   ├── connect/ConnectSection.tsx   # CTA block linking to /connect
│   ├── sectors/SectorsSection.tsx   # Currently unused (removed from homepage)
│   └── belts/MediaBelt.tsx          # Generic marquee belt for images
│
├── lib/
│   ├── cn.ts                        # clsx + tailwind-merge utility
│   ├── strings.ts                   # titleFromSlug helper
│   ├── types.ts                     # HeroSlide type
│   └── getProjects.ts               # Server-only: scans /public/images/projects/ + merges JSON meta
│
├── hooks/
│   ├── useScrollSpy.ts              # IntersectionObserver-based active section tracking
│   └── useMediaQuery.ts             # useMediaQuery(query) + usePrefersReducedMotion() — shared by Hero/Craftsmanship carousels
│
└── public/images/                   # All static assets (organized by feature)
    ├── projects/[slug]/             # Each project in its own folder (slug must be all-lowercase)
    ├── clients/                     # 63 client logos (client_img_1.avif … 63.avif)
    ├── gallery/                     # Specialization + award images
    ├── collaborations/              # 4 partner logos
    ├── capability/                  # Craftsmanship, markets, specialization images
    ├── hero/                        # 4 hero slides + mobile variants
    ├── process/                     # 9 step images
    ├── awards/                      # 4 award card images
    ├── about/                       # artineveryfootstep.avif
    └── TCC_Logo.svg
```

---

## Key Files Quick Reference

| File | What it does |
|------|-------------|
| `app/layout.tsx` | Minimal passthrough — just renders `children` |
| `app/[locale]/layout.tsx` | html/body tag, NextIntlClientProvider, mourning-mode class |
| `app/[locale]/(site)/page.tsx` | Homepage — imports and orders all section components |
| `app/[locale]/(site)/layout.tsx` | Wraps every page with Header, Footer, VideoModalProvider |
| `i18n/routing.ts` | Locale config: `['en','zh-TW','zh-CN']`, default `en`, prefix `as-needed` |
| `i18n/request.ts` | Server-side: loads correct `messages/*.json` per request |
| `i18n/navigation.ts` | Exports locale-aware `Link`, `useRouter`, `usePathname` — use these instead of next/navigation |
| `middleware.ts` | Handles locale detection and redirects |
| `messages/en.json` | Master string file — add new keys here first, then mirror in zh-TW/zh-CN |
| `components/Header.tsx` | Responsive nav with language switcher (EN/繁/简) |
| `components/HeroCarousel.tsx` | Auto-rotating hero (currently 3 photo slides) with reduced-motion support. Uses native `<picture>`/`<source media>` for mobile vs. desktop images (no JS/hydration involved). Arrow keys scoped to in-viewport + not-in-form-control |
| `lib/getProjects.ts` | **Server-only.** Reads `/public/images/projects/`, merges metadata from `projects.json` |
| `app/[locale]/(site)/projects/ProjectsGrid.tsx` | **Client.** Tag filter chips (hotel/restaurant/gaming/living), Load More pagination, renders the card grid |
| `app/(site)/data/projects.json` | Project metadata: title, address, summary, description, notes, priority, tags |
| `app/(site)/data/clients.ts` | Generates 63 `ClientLogo` refs (numeric filenames) |
| `app/(site)/data/collaborations.ts` | **Canonical** source for partner data — `CollabTeaser` imports from here |
| `hooks/useScrollSpy.ts` | IntersectionObserver; returns active section id |
| `components/Section.tsx` | Spacing/layout primitive — use this for all page sections |
| `lib/cn.ts` | `clsx` + `tailwind-merge` — always use this for conditional classes |
| `next.config.ts` | next-intl plugin + GitHub Pages static export config |

---

## i18n System

### How It Works
- **Locales:** `en` (default, no URL prefix), `zh-TW` (`/zh-TW/...`), `zh-CN` (`/zh-CN/...`)
- **`localePrefix: 'as-needed'`** — English URLs have no prefix; Chinese gets prefix
- **Middleware** detects locale from Accept-Language header and redirects on first visit
- **Static params:** Every `[locale]/(site)/` page calls `setRequestLocale(locale)` and exports `generateStaticParams` returning all 3 locales

### Adding/Updating Translations
1. Add the key to `messages/en.json`
2. Mirror in `messages/zh-TW.json` and `messages/zh-CN.json`
3. In **server components**: `const t = await getTranslations('namespace')`
4. In **client components**: `const t = useTranslations('namespace')`
5. Every page/layout must call `setRequestLocale(locale)` at the top

### Navigation — Always Use i18n Versions
```tsx
// ✅ correct — locale-aware
import { Link, useRouter, usePathname } from '@/i18n/navigation';

// ❌ wrong — breaks locale prefix
import Link from 'next/link';
import { useRouter } from 'next/navigation';
```

### Language Switcher
```tsx
const router = useRouter();           // from @/i18n/navigation
const pathname = usePathname();       // strips locale prefix automatically
router.replace(pathname, { locale: 'zh-TW' });
```

### Translation Namespaces in messages/*.json
| Namespace | Used by |
|-----------|---------|
| `nav` | Header.tsx |
| `hero` | HeroCarousel.tsx |
| `about` | about/About.tsx |
| `craftsmanship` | capability/Craftsmanship.tsx |
| `specialization` | capability/Specialization.tsx |
| `markets` | capability/Markets.tsx |
| `awards` | AwardsTeaser.tsx (section title/subtitle/play button — not award titles, see `awardTitles`) |
| `awardTitles` | AwardsTeaser.tsx + gallery/[slug]/page.tsx — maps award slug → localized title, same pattern as `projectTitles` |
| `galleryDetail` | gallery/[slug]/page.tsx — shared template for both Specialization and Award detail pages |
| `collaborations` | CollabTeaser.tsx |
| `clients` | ClientsBelt.tsx |
| `connect` | ConnectSection.tsx |
| `connectPage` | app/[locale]/(site)/connect/page.tsx |
| `projects` | projects/page.tsx, ProjectLayoutClient.tsx |
| `process` | process/page.tsx |
| `projectTitles` | projects/page.tsx + projects/[slug]/page.tsx — maps slug → localized hotel name |

### Project Titles in Chinese
All 27 project titles are translated in `messages/zh-TW.json` and `messages/zh-CN.json` under `projectTitles`. The key is the project slug (e.g. `"venetian-hotel-macau": "澳門威尼斯人度假村"`). Pages look them up with:
```ts
const messages = await getMessages();
const projectTitleMap = (messages.projectTitles as Record<string, string>) ?? {};
const localizedTitle = projectTitleMap[slug] ?? project.title;
```

---

## Data Management

### Projects (canonical flow)
1. **Images:** Drop images into `/public/images/projects/[slug]/` — **slug folder name must be all lowercase**
2. **Metadata:** Add entry to `/app/(site)/data/projects.json`
3. **Chinese title:** Add entry to `projectTitles` in both `messages/zh-TW.json` and `messages/zh-CN.json`
4. **Discovery:** `getProjects.ts` scans the folder, merges JSON, sorts by `priority` (lower = first), then alpha

```json
{
  "slug": "project-name",
  "priority": 1,
  "title": "Display Title, With Location If Helpful",
  "address": "City, Country",
  "summary": "Short overview paragraph",
  "description": "Longer detail paragraph",
  "notes": "Extra notes (optional)",
  "tags": ["hotel", "gaming"],
  "coverPosition": "top"
}
```

**Cover image selection:** prefers `project_list*.avif`, then `cover.avif`, then any `.avif`, then first image alphabetically.

**Image naming convention:** `0.avif` = cover/hero. Remaining images sort numerically.

**Cover cropping:** Every cover — portrait or landscape — renders with `object-cover`, cropped to fill the card edge-to-edge, centered by default. A landscape or off-center photo gets a plain center-crop rather than a letterbox; if the crop clips something important, set `coverPosition` in `projects.json` (any valid CSS `object-position` value, e.g. `"top"`, `"20% 50%"`) to nudge the focal point without re-editing the source image. (An earlier version letterboxed landscape covers with a blurred backdrop instead of cropping — removed 2026-07-26 because a mixed grid of cropped and letterboxed cards read as visually inconsistent; see feedback memory for the reasoning.)

**Tags & filtering:** `tags` is a free-form string array. The Projects grid currently filters on four values — `hotel`, `restaurant`, `gaming`, `living` — as multi-select OR chips (see "Projects Grid — Tags & Filtering" below). A project can carry any combination (e.g. a restaurant inside a casino hotel could be `["restaurant"]` on its own card, with the hotel separately tagged `["hotel", "gaming"]`).

**Naming: slug vs. title.** The slug (= folder name = URL segment) should stay short and lowercase — it's just a technical ID, never rename it after the fact (breaks shared links, and Amplify's Linux filesystem is case-sensitive so uppercase folder names silently 404 in production). If a project needs location context for clarity (e.g. "which city is this restaurant in?"), put it in `title` instead — that's what actually renders on the card. Example: slug `tao-peak-hudson-yards`, title `"Tao Peak, Hudson Yards, New York"`.

**⚠️ Folder casing:** The Amplify deployment runs on Linux (case-sensitive). Folder name `Four-Seasons-Grand` will NOT match slug `four-seasons-grand`. Always use lowercase slugs for folder names.

### Clients
- Source: `/app/(site)/data/clients.ts` — generates 63 entries with numeric filenames
- Images: `/public/images/clients/client_img_1.avif` … `client_img_63.avif`
- `ClientsBelt` accepts a `seed` prop for stable random shuffles and an optional `title` prop (defaults to translated `clients.defaultTitle`)

### Collaborations
- **`/app/(site)/data/collaborations.ts`** is the canonical data source
- `CollabTeaser.tsx` imports directly from this file (no longer duplicated)
- `app/[locale]/(site)/collaborations/page.tsx` is **placeholder content** — needs real copy

### Gallery
- Source: `/app/(site)/data/gallery.ts`
- Entries: 6 specialization types only. Awards live separately in `data/awards.ts` (see below) — don't add award entries back here, that duplication is what caused a stale/mismatched entry before (fixed 2026-07-30)
- Images: `/public/images/gallery/`

### Awards
- **`/app/(site)/data/awards.ts`** is the canonical source — one entry per award: `slug`, `imageSrc` (filename under `/public/images/awards/`), optional `video` (Vidyard embed URL)
- Localized titles live in `messages/*.json` under `awardTitles`, keyed by slug — same pattern as `projectTitles`
- `AwardsTeaser.tsx` (homepage teaser row) and `gallery/[slug]/page.tsx` (detail page, shared with Specialization) both read from this one source — no other files should define award titles or slugs
- Homepage card grid is a real CSS grid (2/3/4 cols by breakpoint) with a repeating vertical stagger cycled by index — adding an award never requires hand-tuning position values

---

## Routing

| Route | Component | Notes |
|-------|-----------|-------|
| `/` | `app/[locale]/(site)/page.tsx` | Homepage (en has no prefix) |
| `/zh-TW/` | same page | Traditional Chinese |
| `/zh-CN/` | same page | Simplified Chinese |
| `/projects` | `app/[locale]/(site)/projects/page.tsx` | Grid, sorted by priority, tag-filterable with Load More |
| `/projects/[slug]` | `ProjectLayoutClient.tsx` | Carousel + layout adapts to image count |
| `/gallery/[slug]` | `app/[locale]/(site)/gallery/[slug]/page.tsx` | Matrix grid — serves BOTH Specialization and Award detail pages (routes by which slug list contains the slug) |
| `/collaborations` | `app/[locale]/(site)/collaborations/page.tsx` | ⚠️ Placeholder |
| `/connect` | `app/[locale]/(site)/connect/page.tsx` | Links to email/phone (no form) |
| `/process` | `app/[locale]/(site)/process/page.tsx` | Timeline |

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
The modal renders globally in `app/[locale]/(site)/layout.tsx`.

### Base Path for Images
Always prefix static image `src` with:
```tsx
const bp = process.env.NEXT_PUBLIC_BASE_PATH || "";
// usage:
<Image src={`${bp}/images/projects/${slug}/cover.avif`} />
```

### Client Logo Marquee
```tsx
<ClientsBelt seed={1} />                          // default title from translations
<ClientsBelt seed={3} title={t('globalPartners')} /> // explicit translated title
```

### AlternatingCard
Used for collab cards, project cards, and detail pages. Key props:
- `variant`: `"imageTop"` | `"textTop"` — image/text order
- `compact`: smaller font + spacing
- `showText`: toggle text block (still reserves space by default)

### Projects Grid — Tags & Filtering
`ProjectsGrid.tsx` (client component) owns all interactive grid behavior:
- **Filter chips:** All / Hotels / Restaurants / Gaming / Living — multi-select, OR logic (union of any selected tags). Selecting nothing = show everything, including untagged projects (e.g. United Nations HQ NYC, which is neither a hotel nor restaurant).
- **Load More pagination:** shows 16 cards initially (`INITIAL_COUNT`), reveals 12 more per click (`LOAD_STEP`). Resets to 16 whenever the filter selection changes. This exists specifically so the grid doesn't become an unbounded scroll as the project count grows past ~30.
- **"Let Us Achieve Your Vision" filler card:** fills the last row when the visible card count doesn't evenly divide the column count, so the grid never ends on an awkward partial row. It's computed **independently per breakpoint** — `visibleProjects.length % 3` for the mobile 3-col grid, `% 4` for the sm+ 4-col grid — rendered as two separate `<li>`s toggled with `block sm:hidden` / `hidden sm:block`. This only fires when `!hasMore` (i.e. all filtered results are already showing, not mid-pagination). Per Ling: mobile must never show a whitespace gap; a partial last row is acceptable on desktop/iPad.
- Translation keys live under `projects` namespace: `filterAll`, `filterHotel`, `filterRestaurant`, `filterGaming`, `filterLiving`, `loadMore`.

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
npm run build            # Standard Next.js build (for Amplify)
npm run build:pages      # Static export for GitHub Pages (sets GITHUB_PAGES=true)
npm run deploy           # Builds + pushes to gh-pages branch (legacy)
npm run lint             # ESLint (errors ignored in build per next.config.ts)
```

### AWS Amplify (Primary)
- Full SSR — middleware and locale detection work correctly
- No base path needed
- Deploys automatically on push to `main`
- Environment variables set in Amplify Console

### GitHub Pages (Legacy)
- Static export only (`GITHUB_PAGES=true`)
- Base path: `/tccglobaldecor`
- Middleware doesn't run → locale auto-detection doesn't work (acceptable for now)
- Branch: `gh-pages`, requires `.nojekyll` in `/out`

### Environment Variables

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_BASE_PATH` | `/tccglobaldecor` on GitHub Pages, empty on Amplify/dev |
| `NEXT_PUBLIC_MOURNING_MODE` | Enables mourning styling (set to `1`) |
| `GITHUB_PAGES` | Triggers static export mode in `next.config.ts` |

---

## Known Issues & Tech Debt

### Must Fix Before Launch

**1. Collaborations page is all placeholder content**
`app/[locale]/(site)/collaborations/page.tsx` has placeholder copy. Needs real content from Marco/HK team.

**1b. Alexander's Design collaboration logo is the wrong asset**
`public/images/collaborations/alexanders-collection.avif` is a product spec slide (mostly empty gray background, small artwork thumbnail, "TCC-004, Fine New Zealand Wool..." spec text) — not a logo. Card layout was fixed 2026-07-30, but this needs the real logo file from Ling before it'll display correctly on the homepage Collaborations teaser.

**2. Contact page has no backend**
`connect/page.tsx` shows office contact info but has no form submission. Intentional for now — user decided to rely on device mail clients rather than a web form.

### Medium Priority

**4. Project image count assumptions**
`ProjectLayoutClient.tsx` accesses images by hardcoded index (hero=`[1]`, etc.). If a project has fewer images than expected, `.at(-1)` silently reuses the last image, causing duplicates. Validate image count in `getProjectBySlug`.

**5. TradeShowBadge is hardcoded**
`TradeShowBadge.tsx` has event details baked in. Update manually when the event changes or move to a data file.

### Low Priority

**6. Carousel keyboard navigation missing**
Project carousel (`ProjectLayoutClient.tsx`) has no arrow-key support. Impacts keyboard accessibility. (HeroCarousel and Craftsmanship's UN HQ carousel both have scoped arrow-key support — Hero fixed 2026-07-30, Craftsmanship already had it via `tabIndex`+`onKeyDown` on the carousel region.)

**7. WorldMapStatic pin positions are approximate**
Pin coordinates are percentage-based estimates. Confirmed 2026-07-30: several labels visibly overlap (LHR/FRA, ALA/DEL, CJU/IND, SIN/MNL) even at full desktop width, not just small sizes as previously noted — several pins (Macau/Jeju/Japan; Singapore/Philippines/Thailand) are genuinely close together on a real proportional map. Needs either larger per-pin offsets to fan crowded labels out, or switching to hover/focus-reveal labels instead of always-on.

**8. No shared carousel abstraction**
Three separate carousel implementations (HeroCarousel, Craftsmanship.tsx, ProjectLayoutClient.tsx) each do slightly different things. Could be consolidated. (Partial progress 2026-07-30: the `matchMedia`/`prefers-reduced-motion` boilerplate that both Hero and Craftsmanship needed was extracted into `hooks/useMediaQuery.ts` — the autoplay/slide-index logic itself is still duplicated.)

**9. Image loading strategy is inconsistent**
Some images use `priority`, some `loading="lazy"`, some neither. Review and standardize.

**10. Chinese translations need native speaker review**
All zh-TW and zh-CN translations were machine-generated. HK staff should review and correct before treating as final. Key files: `messages/zh-TW.json`, `messages/zh-CN.json`.

---

## Common Tasks

### Adding a New Project
1. Create `/public/images/projects/[slug]/` — **use all-lowercase slug, and don't rename it later** (breaks shared URLs + risks case-sensitivity issues on Amplify)
2. Add cover image named `0.avif` (or `cover.avif` — first `.avif` alphabetically wins)
3. Add remaining images named `1.avif`, `2.avif`, etc.
4. Add entry to `app/(site)/data/projects.json` with `slug`, `title`, `address`, `summary`, `description`, `tags` (`["hotel","gaming"]`, `["hotel","living"]`, or `["restaurant"]`)
5. Add Chinese title to `messages/zh-TW.json` and `messages/zh-CN.json` under `projectTitles`
6. Set `"priority": 1` to feature it at the top of the grid
7. If the project needs location context in its display name (e.g. a restaurant that could be confused with others of the same brand), put it in `title` — not the slug

### Converting a Source Photo to AVIF
Use `node scripts/to-avif.mjs <source-path> <dest-path> [quality] [maxWidth]` (wraps the project's existing `sharp` dependency; `sips` on macOS can read AVIF but not write it, so it's not an option here). The optional `maxWidth` resizes (never enlarges) before encoding — use it when a source file's pixel dimensions are absurdly oversized for what it displays as (e.g. a text logo exported at 9000px+ wide). Convention: save as `cover.avif` rather than overwriting `0.avif`, so the original numbered image stays in the gallery instead of being lost. Move the raw pre-conversion source file to `/originals/` at the repo root (gitignored, outside `public/`) rather than leaving it in the project folder — `getProjects.ts` picks up any `.jpg`/`.png`/`.webp` left in `public/images/projects/[slug]/` as a gallery image too.

### Updating Trade Show Badge
Edit `components/TradeShowBadge.tsx` — all event details are hardcoded there.

### Adding a Client Logo
1. Add `.avif` to `/public/images/clients/` named `client_img_64.avif` (next number)
2. Update the array length in `app/(site)/data/clients.ts`

### Changing a Collaboration Partner
1. Update `app/(site)/data/collaborations.ts` — this is the only place now (no duplicate)
2. Add/replace image in `/public/images/collaborations/`

### Adding an Award
1. Add the image to `/public/images/awards/`
2. Add one entry to `app/(site)/data/awards.ts` — `slug`, `imageSrc`, optional `video`
3. Add the localized title under `awardTitles` (keyed by the same slug) in `messages/en.json`, `zh-TW.json`, `zh-CN.json`
4. That's it — the homepage grid and the `/gallery/[slug]` detail page both pick it up automatically, no position tuning needed

### Updating Navigation Links
Edit the `NAV` array in `components/Header.tsx`.

### Changing Color Theme
Update `@theme` block in `app/globals.css`:
```css
@theme {
  --color-brand-gold: #newcolor;
}
```

### Adding a New Translation Key
1. Add to `messages/en.json` under the appropriate namespace
2. Add the same key to `messages/zh-TW.json` and `messages/zh-CN.json`
3. Use in server component: `const t = await getTranslations('namespace')`
4. Use in client component: `const t = useTranslations('namespace')`

---

## Architecture Notes

**Why [locale] route segment?** next-intl v4 with App Router uses a `[locale]` dynamic segment so Next.js can generate static pages per locale. The `generateStaticParams` in each page returns all 3 locales.

**Why `localePrefix: 'as-needed'`?** English (default locale) gets clean URLs (`/`, `/projects`). Only Chinese adds a prefix (`/zh-TW/`, `/zh-CN/`). This avoids breaking existing English links.

**Why Amplify over GitHub Pages?** Amplify supports SSR and middleware, which next-intl's locale detection requires. GitHub Pages is static-only — middleware doesn't run, so locale auto-detection is disabled there.

**Why static export?** The GitHub Pages legacy path needs it. `next.config.ts` sets `output: "export"` only when `GITHUB_PAGES=true`.

**Why hybrid project discovery?** `getProjects.ts` reads the filesystem at build time (no database needed), then overlays structured metadata from `projects.json`. Adding a project only requires dropping images in the right folder — metadata is optional (slug becomes the title fallback).

**Why multiple ClientsBelt seeds?** The logo list is shuffled deterministically by seed so different instances on the same page show visually varied subsets without randomness that breaks SSR hydration.

**Scroll spy + header height:** `HeaderWrapper` measures the header's rendered height and writes it to `--header-h` CSS variable. `useScrollSpy` reads this value as the IntersectionObserver root margin offset, ensuring the active section tracks correctly as the header resizes across breakpoints.

---

## Future TODOs

### Hero Slide 4 Replacement
Removed 2026-07-30 — the original 4th slide (a "reveal" triptych: install photo → concept plan → finished tree-motif carpet matching a French artist's ceiling design) wasn't landing the intended story and the flip animation read as distracting. Ling is picking a replacement from his photo library. The `'reveal'` slide type and `TriptychRevealSlide` component are still wired up in `HeroCarousel.tsx` (just no slide data using them), so the replacement can go back in either as a plain photo slide or the same reveal treatment — whichever fits the new image.

### Superadmin Panel (Planned — Phase 3)
A password-protected admin UI for the HK team to:
- Upload and manage project images (auto-convert to AVIF)
- Edit project metadata without touching code
- User: Matthew Su (Global Sales Director) and HK office staff

### RAG Knowledge Base (Planned — Phase 5)
A retrieval-augmented chatbot for Marco (HK-based sales contact) to:
- Query TCC's project history, capabilities, and specifications
- Source material: Marco's emails + internal .md files
- Platform: AWS (Amplify already in use)

### Project Cover Images — Needs Research & Upload
Several project folders have low-res WeChat-compressed images or placeholder covers. Real high-res images need to be sourced.

**How to source:**
- TCC's own installation photography (ask Matthew)
- Hotel official press/media kits (Wynn, Marriott/St. Regis, Sands/Venetian, Hard Rock, MGM all have free high-res downloads)
- Minimum: 1400px wide for covers, 2000px+ preferred

**Projects needing better images:**
- `wynn-macau` — too small
- `wynn-hotel-las-vegas` — too small
- `st-regis-macau` — all images small
- `ritz-carlton-macau` — small
- `venetian-hotel-macau` — acceptable but not great
- Several projects with AI-generated placeholder covers

### Gallery Specialization Icons
21 loose `project_icon_img_*.avif` files exist in `/public/images/projects/` (moved to `/public/images/old-icons/` and removed). Originally intended for gallery specialization carousels — not yet built. The `tags` field now exists (added 2026-07-26 for the Projects grid filter — see "Projects Grid — Tags & Filtering" above) and could be extended with specialization values (e.g. `"axminster"`) to power this. When time allows:
1. Extend `tags` vocabulary in `projects.json` with specialization values
2. Update gallery pages to dynamically filter projects by tag
3. Move icons into respective project folders

### Projects Grid Tag Taxonomy — Needs Marco's Review
All 28 projects were given a best-guess `hotel`/`restaurant` + `gaming`/`living` tag on 2026-07-26 based on public knowledge of which properties are casino resorts. Two need explicit confirmation:
- **`melco-group`** — tagged `["hotel", "gaming"]` as a placeholder, but it's a company name (Melco is a casino operator), not a single property. Worth clarifying what this card should actually represent.
- **`united-nations-NYC`** — intentionally left untagged (neither a hotel nor restaurant), only appears in the "All" view.

Also: Marco (CEO) wants standout F&B projects (e.g. Michelin-caliber restaurants) to get their own cards even when housed inside a hotel TCC also worked on — his reasoning is the restaurant's brand recognition can exceed the host building's. First one added: **Tao Peak, Hudson Yards, New York** (`tao-peak-hudson-yards`), still gallery-pending with one rendering image. More F&B projects are expected soon (Marco tends to add projects at a steady clip), which is part of why the Load More pagination above exists.

---

## Troubleshooting

**Build fails:** Check `npm run lint` first. TypeScript errors don't fail the build (configured to ignore in `next.config.ts`) but ESLint may flag things.

**Locale not switching:** Confirm middleware is running (Amplify only — not GitHub Pages). Check `i18n/routing.ts` locale list matches the folders in `messages/`.

**GitHub Pages 404:** Verify base path `/tccglobaldecor` is set, `.nojekyll` exists in `/out/`, and `gh-pages` branch is deployed.

**Images not loading in production:** Check that `NEXT_PUBLIC_BASE_PATH` is set and that all `<Image>` `src` props are prefixed with `${bp}`.

**Project not appearing:** Confirm the folder name in `/public/images/projects/` exactly matches the `slug` in `projects.json` — **case-sensitive on Amplify (Linux)**. Always use lowercase.

**Scroll spy not working:** Sections need unique `id` attributes matching the nav entries. Header height offset is dynamic — check `--header-h` is being set by `HeaderWrapper`.

**Translation key missing:** next-intl throws in development if a key is used but not defined. Check the namespace in the component matches a top-level key in the message file.
