# TCC-Site Codebase Reference

**Last Updated:** 2026-01-06
**Project:** TCC Carpets Marketing Website
**Framework:** Next.js 15.5.5 with React 19, TypeScript, Tailwind CSS 4

---

## Project Overview

This is a **Next.js-based marketing/portfolio website** for **TCC Carpets**, a bespoke carpet manufacturer specializing in high-end hospitality and interior design projects. The site showcases carpet designs and projects for luxury hotels, casinos, and hospitality brands worldwide.

**Key Technologies:**
- Next.js 15.5.5 (App Router)
- React 19.1.0
- TypeScript 5
- Tailwind CSS 4
- Deployed via GitHub Pages (`gh-pages` branch)
- Base path: `/tccglobaldecor`

---

## Directory Structure

```
/
├── app/                          # Next.js App Router
│   ├── (site)/                  # Main site pages group
│   │   ├── page.tsx             # Homepage
│   │   ├── layout.tsx           # Site wrapper (Header, Footer, modals)
│   │   ├── projects/            # Project showcase
│   │   ├── gallery/             # Photo gallery
│   │   ├── awards/              # Awards showcase
│   │   ├── collaborations/      # Collaborations page
│   │   ├── connect/             # Contact/inquiry page
│   │   ├── process/             # Process page
│   │   └── data/                # JSON data files
│   ├── layout.tsx               # Root layout
│   └── globals.css              # Global styles + Tailwind config
│
├── components/                   # Reusable React components
│   ├── Header.tsx               # Nav with scroll spy & mobile menu
│   ├── Footer.tsx
│   ├── HeroCarousel.tsx         # Auto-rotating image carousel
│   ├── VideoModalProvider.tsx   # Global video modal context
│   ├── Section.tsx              # Flexible layout primitive
│   ├── about/
│   ├── awards/
│   ├── belts/                   # Horizontal scroll components
│   ├── capability/              # 3 subsections
│   ├── clients/
│   ├── connect/
│   ├── gallery/
│   └── sectors/
│
├── lib/                          # Utilities & helpers
│   ├── cn.ts                    # Tailwind class merger
│   ├── types.ts                 # Shared TypeScript types
│   ├── getProjects.ts           # Server-side project discovery
│   └── strings.ts
│
├── hooks/
│   └── useScrollSpy.ts          # Scroll position tracking
│
├── public/                       # Static assets
│   ├── images/                  # Organized by feature
│   │   ├── hero/
│   │   ├── projects/            # [slug] subdirs
│   │   ├── clients/             # 63 logos
│   │   ├── gallery/
│   │   └── ...
│   └── TCC_Logo.svg
│
└── Configuration
    ├── package.json
    ├── tsconfig.json
    ├── next.config.ts           # GitHub Pages config
    └── eslint.config.mjs
```

---

## Key Files & Their Purpose

| File | Purpose |
|------|---------|
| `app/layout.tsx` | Root layout, metadata, mourning mode toggle |
| `app/(site)/page.tsx` | Homepage - all major sections |
| `app/(site)/layout.tsx` | Site wrapper with Header/Footer/VideoModal |
| `components/Header.tsx` | Navigation (scroll-based hide/show, scroll spy) |
| `components/HeroCarousel.tsx` | Auto-rotating carousel with fade transitions |
| `lib/getProjects.ts` | Scans `/public/images/projects/` filesystem |
| `app/(site)/data/projects.json` | Project metadata (title, description, address) |
| `app/(site)/data/clients.ts` | Generates 63 client logo references |
| `hooks/useScrollSpy.ts` | Detects active section during scroll |
| `components/Section.tsx` | Layout primitive with responsive padding/width |
| `lib/cn.ts` | `clsx` + `tailwind-merge` utility |
| `next.config.ts` | GitHub Pages export config |

---

## Main Features

### Homepage Sections
1. **Hero Carousel** - Auto-rotating project showcase
2. **About** - Company mission, three pillars (Talent, Communication, Commitment)
3. **Clients Belt** - Animated marquee of 60+ client logos
4. **Capability Section**:
   - Craftsmanship (production methods)
   - Specialization (carpet types & materials)
   - Markets (geographic presence)
5. **Awards Teaser** - Industry recognition highlights
6. **Collaborations Teaser** - Partner showcase
7. **Connect CTA** - Contact inquiry

### Site Pages
- `/projects` - Grid showcase + individual project detail pages
- `/gallery` - Curated photo grid
- `/awards` - Full awards showcase with detail pages
- `/collaborations` - Partner/collaboration page
- `/connect` - Contact form
- `/process` - Production process visualization

### Interactive Features
- **Scroll-based Header** - Hides on scroll down, shows on scroll up
- **Scroll Spy Navigation** - Highlights active section
- **Mobile Menu** - Responsive hamburger drawer
- **Video Modal** - Context-based overlay video player
- **Image Carousel** - Hero section fade transitions
- **Animated Marquee** - Client logos with continuous scroll

---

## Important Patterns

### Scroll Spy Hook
`useScrollSpy()` tracks which section is in viewport and highlights nav items.
- Uses IntersectionObserver API
- Respects header height offset (120px)
- Returns active section ID

### Section Component
Flexible layout primitive with:
- Responsive padding (`sm`, `md`, `lg`)
- Max-width presets (`lg`, `xl`, `2xl`, `full`)
- Safe area support for mobile notches
- Bleeding backgrounds with centered content

### Project Discovery
Hybrid file system + metadata approach:
1. Scans `/public/images/projects/[slug]/` directories
2. Matches metadata from `data/projects.json`
3. Prefers `.avif` images for covers
4. Generates fallback titles from slugs

### Client Logos Randomization
- Uses seeded random for stable randomization
- Different "seeds" show different logo subsets
- Multiple `ClientsBelt` instances with varying seeds

---

## Build & Deployment

### Development
```bash
npm run dev              # Start dev server (localhost:3000)
```

### Production Build
```bash
npm run build            # Standard Next.js build
npm run build:pages      # Static export for GitHub Pages
```

### Deployment
```bash
npm run deploy           # Deploy to gh-pages branch
```

**GitHub Pages Setup:**
- Environment: `GITHUB_PAGES=true`
- Base path: `/tccglobaldecor`
- Static export to `/out` directory
- Deploys to `gh-pages` branch

---

## Environment Variables

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_BASE_PATH` | Base path for GitHub Pages (`/tccglobaldecor`) |
| `NEXT_PUBLIC_MOURNING_MODE` | Toggle mourning styling |
| `GITHUB_PAGES` | Triggers static export config |

---

## Styling System

### Tailwind CSS 4
Custom theme tokens in `globals.css`:
```css
--color-brand-gold: #D1D5DB        /* Light gray */
--color-brand-gold-deep: #9CA3AF   /* Medium gray */
--color-brand-ink: #1F2937         /* Dark gray */
```

### Custom Animations
- `clients-marquee` - Horizontal scroll
- `clients-marquee-reverse` - Reverse scroll

### Hero Section Color Schemes
- Dark-on-image mode (white text on dark backgrounds)
- Light-on-white mode (dark text on light backgrounds)

---

## Data Management

### Projects
- **Source:** `/public/images/projects/[slug]/`
- **Metadata:** `/app/(site)/data/projects.json`
- **Discovery:** Server-side filesystem scan via `getProjects.ts`
- **Structure:**
  ```json
  {
    "slug": "project-name",
    "title": "Project Title",
    "description": "...",
    "address": "Location"
  }
  ```

### Clients
- **Source:** `/app/(site)/data/clients.ts`
- **Images:** `/public/images/clients/`
- **Count:** 63 client logos

### Gallery
- **Source:** `/public/images/gallery/`
- **Metadata:** `/app/(site)/data/` (JSON files)

---

## TypeScript Types

### Common Types (`lib/types.ts`)
```typescript
interface HeroSlide {
  id: string
  image: string
  title?: string
  subtitle?: string
  // ...
}

interface Project {
  slug: string
  title: string
  description?: string
  address?: string
  coverImage: string
  images: string[]
}
```

---

## Recent Development Activity

Based on git history:
- **Mourn mode** - Mourning styling toggle feature
- **Trade show badges** - Normal and HD Expo announcements
- **OMI integration** - URL/API updates
- **Image optimization** - AVIF format preference, fixes
- **Process documentation** - Process page content

---

## Common Tasks

### Adding a New Project
1. Create folder: `/public/images/projects/[slug]/`
2. Add images (prefer `.avif` format)
3. Add metadata to `/app/(site)/data/projects.json`:
   ```json
   {
     "slug": "new-project",
     "title": "Project Name",
     "description": "Description...",
     "address": "Location"
   }
   ```
4. Cover image automatically detected (first `.avif` or image file)

### Adding Client Logo
1. Add logo to `/public/images/clients/`
2. Update `/app/(site)/data/clients.ts` with new entry
3. Logo appears in marquee automatically

### Modifying Homepage Sections
Edit `/app/(site)/page.tsx` - all sections are composed here.

### Updating Navigation
Modify `/components/Header.tsx` - nav items and scroll spy sections.

### Changing Color Theme
Update custom properties in `/app/globals.css`:
```css
@theme {
  --color-brand-gold: #newcolor;
}
```

---

## Performance Considerations

- **Image Optimization:** Uses Next.js Image component where possible
- **Static Export:** Pre-renders all pages at build time
- **Lazy Loading:** Images load on demand
- **AVIF Format:** Preferred for smaller file sizes
- **Reduced Motion:** Respects `prefers-reduced-motion` for animations

---

## Accessibility

- ARIA labels on interactive elements
- Keyboard navigation support
- Focus states on all interactive components
- Semantic HTML structure
- Alt text on images (where implemented)

---

## Troubleshooting

### Build Fails
- Check TypeScript errors: `npm run type-check` (if script exists)
- ESLint issues are ignored in build (see `next.config.ts`)

### GitHub Pages 404
- Verify base path is set: `/tccglobaldecor`
- Check `.nojekyll` file exists in `out/` directory
- Ensure `gh-pages` branch is deployed correctly

### Images Not Loading
- Confirm images exist in `/public/images/`
- Check project slug matches folder name
- Verify base path in production URLs

### Scroll Spy Not Working
- Ensure sections have unique `id` attributes
- Check header height offset (120px default)
- Verify IntersectionObserver support in browser

---

## Useful Commands

```bash
# Development
npm run dev

# Build for production
npm run build
npm run build:pages      # Static export

# Deploy
npm run deploy           # GitHub Pages

# Linting
npm run lint

# Clear cache
rm -rf .next out node_modules/.cache
```

---

## Notes for Future Development

1. **Content Management:** Consider headless CMS for non-technical content updates
2. **Image Optimization:** Batch convert images to AVIF for better performance
3. **Analytics:** Consider adding privacy-friendly analytics (Plausible, Fathom)
4. **SEO:** Add meta descriptions, Open Graph tags per page
5. **Testing:** Consider adding E2E tests (Playwright, Cypress)
6. **Forms:** Contact form currently client-side only - may need backend integration

---

## Contact & Support

For questions about this codebase, refer to:
- Project README: `/README.md`
- Git history for context on recent changes
- This document for architecture and patterns

---

**End of Reference Document**
