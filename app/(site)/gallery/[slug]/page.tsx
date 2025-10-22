// app/(site)/gallery/[slug]/page.tsx
import Section from "@/components/Section";
import PhotoGridMatrix, { type MatrixItem } from "@/components/gallery/PhotoGrid";
import SmartBelt from "@/components/belts/MediaBelt";
import { GALLERY } from "@/app/(site)/data/gallery";
import { titleFromSlug } from "@/lib/strings";
import Link from "next/link";
import fs from "node:fs";
import path from "node:path";

const SPECIALIZATION_SLUGS = [
  "hand-tufted",
  "axminster-tiles",
  "axminster-broadloom",
  "hand-ax",
  "printed",
  "custom-rugs",
] as const;

// Awards: 3-item loop
const AWARD_SLUGS = [
  "sands-supplier-excellence-award",
  "marina-bay-singapore-award",
  "industry-excellence-placeholder",
] as const;

export const dynamicParams = false;
// If you ever see "fs not available on Edge", uncomment the next line:
// export const runtime = "nodejs";

const bp = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** Map image index -> project slug (edit this list to match your files) */
const PROJECTS: Array<[number, string]> = [
  [1,  "galaxy-macau"],
  [2,  "four-seasons-macau"],
  [3,  "grand-lisboa-palace"],
  [4,  "londoner-court"],
  [5,  "mgm-cotai"],
  [6,  "morocco-resort"],
  [7,  "park-hyatt-niseko"],
  [8,  "the-venetian"],
  [9,  "wynn-palace"],
  [10, "raffles-hainan"],
  [11, "sands-macao"],
  [12, "studio-city"],
  [13, "the-londoner-hotel"],
];

// exact-6 tuple type
type SixItems = [MatrixItem, MatrixItem, MatrixItem, MatrixItem, MatrixItem, MatrixItem];

const LAYOUT6 = ["*-big-left", "&-single", "%-rect-1x2", "@-single", "%-rect-1x3", "*-big-right"] as const;

export function generateStaticParams() {
  return GALLERY.map((g) => ({ slug: g.slug }));
}

const ph = (id: string): MatrixItem => ({
  id,
  src:
    "data:image/svg+xml;utf8," +
    encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 900'>
         <rect width='100%' height='100%' fill='#f3f4f6'/>
       </svg>`
    ),
});

// ✅ single top-level helper that ALWAYS returns exactly 6 items
function galleryItemsFor(slug: string): SixItems {
  const folderFs = path.join(process.cwd(), "public", "images", "gallery", slug);
  const folderExists = fs.existsSync(folderFs);

  const arr: MatrixItem[] = Array.from({ length: 6 }, (_, i) => {
    const id = LAYOUT6[i] ?? `img-${i + 1}`;
    const fileName = `${i + 1}.avif`;
    const fileFs = path.join(folderFs, fileName);
    if (folderExists && fs.existsSync(fileFs)) {
      return { id, src: `${bp}/images/gallery/${slug}/${fileName}` };
    }
    return ph(id);
  });

  // ensure exact tuple length
  while (arr.length < 6) arr.push(ph(`ph-${arr.length + 1}`));
  return arr.slice(0, 6) as SixItems;
}


const related = PROJECTS.map(([idx, slug]) => ({
  src: `${bp}/images/projects/project_list_img_${idx}.avif`,
  alt: slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
  href: `/projects/${slug}`,
  kind: "image" as const,
}));


export default async function GalleryPage({
  params,
}: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;


  const entry = GALLERY.find((g) => g.slug === slug);
  const prettyTitle = entry?.title ?? titleFromSlug(slug);

  type Loop = readonly string[] | null;

const inSpec = SPECIALIZATION_SLUGS.includes(slug as any);
const inAwards = AWARD_SLUGS.includes(slug as any);

const loop: Loop = inSpec ? SPECIALIZATION_SLUGS : inAwards ? AWARD_SLUGS : null;

let prevSlug: string | null = null;
let nextSlug: string | null = null;
let prevEntry: typeof entry | null = null;
let nextEntry: typeof entry | null = null;

if (loop) {
  const i = loop.indexOf(slug);
  const prev = loop[(i - 1 + loop.length) % loop.length];
  const next = loop[(i + 1) % loop.length];
  prevSlug = prev;
  nextSlug = next;
  prevEntry = GALLERY.find((g) => g.slug === prev) ?? null;
  nextEntry = GALLERY.find((g) => g.slug === next) ?? null;
}

  // ✅ build the tuple once, at render
  const items = galleryItemsFor(slug);

  return (
<Section id="gallery" className="relative text-brand-ink flex flex-col items-center justify-center bg-white">
  {/* Header */}
  <div className="relative mx-auto max-w-2xl text-center flex flex-col items-center">
    <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.12em] uppercase text-neutral-500">
      <span className="inline-block h-[3px] w-8 bg-brand-gold rounded-full" />
      Gallery
    </span>

    <h1 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight">{prettyTitle}</h1>
    <p className="mt-2 text-neutral-600 text-sm md:text-base">
      Project showcase & visual craftsmanship gallery
    </p>

    {/* Floating left/right arrows (desktop only) */}
    {loop && (
      <>
        {prevSlug && (
          <Link
            href={`/gallery/${prevSlug}`}
            aria-label={`Previous: ${prevEntry?.title ?? prevSlug}`}
            className="
              hidden sm:flex items-center justify-center
              absolute top-1/2 -translate-y-1/2
              left-[-14px] md:left-[-24px]
              h-9 w-9 rounded-full bg-brand-gold text-brand-ink shadow
              ring-1 ring-brand-gold/60 hover:bg-brand-gold-deep
              focus:outline-none focus-visible:ring-2 focus-visible:ring-black
              transition
            "
          >
            <svg width='18' height='18' viewBox='0 0 24 24' fill='none' aria-hidden='true'>
              <path d='M15 6l-6 6 6 6' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'/>
            </svg>
          </Link>
        )}

        {nextSlug && (
          <Link
            href={`/gallery/${nextSlug}`}
            aria-label={`Next: ${nextEntry?.title ?? nextSlug}`}
            className="
              hidden sm:flex items-center justify-center
              absolute top-1/2 -translate-y-1/2
              right-[-14px] md:right-[-24px]
              h-9 w-9 rounded-full bg-brand-gold text-brand-ink shadow
              ring-1 ring-brand-gold/60 hover:bg-brand-gold-deep
              focus:outline-none focus-visible:ring-2 focus-visible:ring-black
              transition
            "
          >
            <svg width='18' height='18' viewBox='0 0 24 24' fill='none' aria-hidden='true'>
              <path d='M9 6l6 6-6 6' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'/>
            </svg>
          </Link>
        )}
      </>
    )}
  </div>

  {/* Small “Prev / Next” pills for mobile */}
  {loop && (
    <div className="mt-3 w-full max-w-2xl flex justify-between sm:hidden">
      {prevSlug ? (
        <Link
          href={`/gallery/${prevSlug}`}
          className="inline-flex items-center gap-1 rounded-full bg-brand-gold hover:bg-brand-gold-deep px-3 py-1.5 text-xs font-semibold text-brand-ink transition"
          aria-label={`Previous: ${prevEntry?.title ?? prevSlug}`}
        >
          <svg width='14' height='14' viewBox='0 0 24 24' fill='none' aria-hidden='true'>
            <path d='M15 6l-6 6 6 6' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'/>
          </svg>
          Prev
        </Link>
      ) : <span />}

      {nextSlug ? (
        <Link
          href={`/gallery/${nextSlug}`}
          className="inline-flex items-center gap-1 rounded-full bg-brand-gold hover:bg-brand-gold-deep px-3 py-1.5 text-xs font-semibold text-brand-ink transition"
          aria-label={`Next: ${nextEntry?.title ?? nextSlug}`}
        >
          Next
          <svg width='14' height='14' viewBox='0 0 24 24' fill='none' aria-hidden='true'>
            <path d='M9 6l6 6-6 6' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'/>
          </svg>
        </Link>
      ) : null}
    </div>
  )}

  {/* ...keep your grid + belt below... */}
  <div className="w-full flex justify-center">
    <PhotoGridMatrix items={items} className="pt-12" />
  </div>

  <SmartBelt
    items={related}
    title="Projects that feature similar work"
    height="md"
    seed={3}
    count={6}
    grayscaleHover={false}
    showCaptions={false}
    speedSec={28}
  />
</Section>

  );
}
