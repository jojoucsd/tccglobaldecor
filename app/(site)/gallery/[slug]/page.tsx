// app/(site)/gallery/[slug]/page.tsx
import Section from "@/components/Section";
import PhotoGridMatrix, { type MatrixItem } from "@/components/gallery/PhotoGrid";
import SmartBelt from "@/components/belts/MediaBelt";

// simple placeholder tile
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

// Let TS infer the type from SmartBelt props (no SmartBeltItem import needed)
const related = [
  {
    src: "/images/projects/marina/cover.jpg",
    alt: "Marina Bay Sands — Lobby",
    label: "Marina Bay Sands — Singapore",
    href: "/projects/marina-bay-sands",
    kind: "image" as const,
  },
  {
    src: "/images/projects/venetian/cover.jpg",
    alt: "The Venetian",
    label: "The Venetian — Las Vegas",
    href: "/projects/the-venetian",
    kind: "image" as const,
  },
  {
    src: "/images/clients/sands.svg",
    alt: "Sands",
    label: "Sands Portfolio",
    href: "/projects?client=sands",
    kind: "logo" as const,
  },
  // add up to ~6 for a tasteful belt
];

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // ✅ Option A: await params
  const { slug } = await params;

  const items: MatrixItem[] = [
    ph("*-big-left"),
    ph("&-single"),
    ph("%-rect-1x2"),
    ph("@-single"),
    ph("%-rect-1x3"),
    ph("*-big-right"),
  ];

  const prettyTitle = decodeURIComponent(slug)
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <Section id="gallery" className="text-brand-ink flex flex-col items-center justify-center bg-white">
      <div className="mx-auto max-w-2xl text-center flex flex-col items-center">
        <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.12em] uppercase text-neutral-500">
          <span className="inline-block h-[3px] w-8 bg-brand-gold rounded-full" />
          Gallery
        </span>

        <h1 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight">
          {prettyTitle}
        </h1>

        <p className="mt-2 text-neutral-600 text-sm md:text-base">
          Project showcase & visual craftsmanship gallery
        </p>
      </div>

      {/* Grid */}
      <div className="w-full flex justify-center">
        <PhotoGridMatrix items={items} className="pt-12" />
      </div>

      {/* Smart Belt */}
      <SmartBelt
        items={related}
        title="Projects that feature similar work"
        height="md"
        seed={3}               // stable shuffle (optional)
        count={6}              // or omit to show all
        grayscaleHover={false} // keep images in color
        showCaptions
        speedSec={28}
      />
    </Section>
  );
}
