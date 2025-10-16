import Link from "next/link";

type Sample = { slug: string; title: string; tag: string };

const GRID_A: Sample[] = [
  { slug: "london-geometric-01", title: "London Geometric 01", tag: "Axminster" },
  { slug: "alpine-weave-02",     title: "Alpine Weave 02",     tag: "Hand Tufted" },
  { slug: "marine-stripe-03",    title: "Marine Stripe 03",    tag: "Printed" },
  { slug: "soft-ombre-04",       title: "Soft Ombre 04",       tag: "Blend" },
  { slug: "bold-mosaic-05",      title: "Bold Mosaic 05",      tag: "Axminster" },
  { slug: "pebble-texture-06",   title: "Pebble Texture 06",   tag: "Hand Woven" },
];

const GRID_B: Sample[] = [
  { slug: "cascade-07",   title: "Cascade 07",   tag: "Viscose" },
  { slug: "linen-grid-08",title: "Linen Grid 08",tag: "Wool" },
  { slug: "noir-wave-09", title: "Noir Wave 09", tag: "Axminster" },
  { slug: "terra-10",     title: "Terra 10",     tag: "Printed" },
  { slug: "silk-vein-11", title: "Silk Vein 11", tag: "Silk" },
  { slug: "mono-fade-12", title: "Mono Fade 12", tag: "Blend" },
];

function Tile({ s }: { s: Sample }) {
  return (
    <Link
      href={`/library/${s.slug}`}
      className="group block rounded-2xl border border-gray-200 p-4 hover:shadow-md transition"
    >
      <div className="aspect-[4/3] w-full rounded-xl bg-gray-200 mb-3" />
      <div className="flex items-center justify-between">
        <h3 className="font-medium">{s.title}</h3>
        <span className="text-xs text-gray-500">{s.tag}</span>
      </div>
    </Link>
  );
}

export default function LibraryPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-24">
      {/* Header row (like slide 19 intro area) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-start mb-10 md:mb-14">
        <div className="md:col-span-4">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Library</h1>
        </div>
        <div className="md:col-span-7 md:col-start-6">
          <p className="text-gray-700 leading-7">
            A curated collection of patterns, textures, and color stories. Each design is a starting point —
            refined through collaboration, sampling, and material selection to suit the project’s scale and performance.
          </p>
        </div>
      </div>

      {/* Grid A (slide 19 feel) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {GRID_A.map((s) => <Tile key={s.slug} s={s} />)}
      </div>

      {/* Divider rhythm */}
      <div className="my-14 h-px bg-gray-200" />

      {/* Grid B (slide 22 feel) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {GRID_B.map((s) => <Tile key={s.slug} s={s} />)}
      </div>
    </div>
  );
}
