// app/(site)/gallery/[slug]/page.tsx
import Section from "@/components/Section";
import PhotoGridMatrix, { type MatrixItem } from "@/components/gallery/PhotoGrid";
import SmartBelt from "@/components/belts/MediaBelt";
import { GALLERY } from "@/app/(site)/data/gallery";
import { titleFromSlug } from "@/lib/strings";
import fs from "node:fs";
import path from "node:path";

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


export default async function GalleryPage({ params }: { params: { slug: string } }) {
  const { slug } = params; // no need to await a Promise here

  const entry = GALLERY.find((g) => g.slug === slug);
  const prettyTitle = entry?.title ?? titleFromSlug(slug);

  // ✅ build the tuple once, at render
  const items = galleryItemsFor(slug);

  return (
    <Section id="gallery" className="text-brand-ink flex flex-col items-center justify-center bg-white">
      <div className="mx-auto max-w-2xl text-center flex flex-col items-center">
        <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.12em] uppercase text-neutral-500">
          <span className="inline-block h-[3px] w-8 bg-brand-gold rounded-full" />
          Gallery
        </span>

        <h1 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight">{prettyTitle}</h1>

        <p className="mt-2 text-neutral-600 text-sm md:text-base">Project showcase & visual craftsmanship gallery</p>
      </div>

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
  showCaptions={false}   // ⬅️ hides text under each image
  speedSec={28}
/>
    </Section>
  );
}
