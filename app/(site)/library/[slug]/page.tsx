// app/(site)/library/[slug]/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";

type Sample = {
  code: string;
  title: string;
  tag: string;
  desc: string;
};

// Minimal sample data so the page builds; add more as needed
const SAMPLES: Record<string, Sample> = {
  "london-geometric-01": {
    code: "A001",
    title: "Golden Vein",
    tag: "Axminster",
    desc:
      "Inspired by the texture of aged stone and the play of light across polished metal, Golden Vein balances luxury with restraint.",
  },
  "alpine-weave-02": {
    code: "A002",
    title: "Alpine Weave",
    tag: "Hand Tufted",
    desc:
      "Layered pile heights and sculpt detail create a tactile, bespoke finish suited to suites and lounges.",
  },
};

// Let Next know which [slug] pages to prebuild for static export
export function generateStaticParams() {
  return Object.keys(SAMPLES).map((slug) => ({ slug }));
}

// Next 15: params is a Promise
export default async function LibraryDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = SAMPLES[slug];
  if (!item) return notFound();

  return (
    <div className="mx-auto max-w-6xl px-6 py-24">
      <Link href="/library" className="text-amber-600 hover:underline">
        ← Back to Library
      </Link>

      {/* Header block */}
      <header className="mt-4 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-start">
        <div className="md:col-span-5">
          <h1 className="text-3xl md:text-4xl font-bold">
            {item.code} — {item.title}
          </h1>
          <div className="mt-1 text-sm text-gray-500">{item.tag}</div>
          <p className="mt-4 text-lg text-gray-700 leading-7">{item.desc}</p>
        </div>
        <div className="md:col-span-7">
          <div className="rounded-xl border border-gray-200 p-4 text-sm text-gray-700">
            <div className="font-medium">Project Applications</div>
            <p className="mt-2">
              Public areas, corridors, guestrooms (scale and colorway adjustable to site).
            </p>
          </div>
        </div>
      </header>

      {/* Visual composition — primary left; two stacked right */}
      <section className="mt-10 grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-7">
          <div className="aspect-[5/4] w-full rounded-2xl bg-gray-200" />
          <p className="mt-2 text-xs text-gray-500">Image of Carpet (primary)</p>
        </div>
        <div className="md:col-span-5 space-y-6">
          <div>
            <div className="aspect-[4/3] w-full rounded-2xl bg-gray-200" />
            <p className="mt-2 text-xs text-gray-500">Image of Details</p>
          </div>
          <div>
            <div className="aspect-[4/3] w-full rounded-2xl bg-gray-200" />
            <p className="mt-2 text-xs text-gray-500">Image of Application</p>
          </div>
        </div>
      </section>

      {/* Optional concise spec box */}
      <aside className="mt-10 grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-7" />
        <div className="md:col-span-5">
          <div className="rounded-xl border p-6">
            <h2 className="text-lg font-semibold">Technique & Materials</h2>
            <ul className="mt-3 text-sm text-gray-700 space-y-1">
              <li>Technique: {item.tag}</li>
              <li>Materials: Wool / Viscose / Silk / Blend</li>
              <li>Colorway: Custom to project palette</li>
              <li>Scale: Tuned to room size / circulation</li>
            </ul>
          </div>
        </div>
      </aside>
    </div>
  );
}
