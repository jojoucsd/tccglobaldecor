// app/(site)/library/[slug]/page.tsx
import { notFound } from "next/navigation";

type Sample = {
  code: string;        // e.g., A001
  title: string;       // e.g., Golden Vein
  tag: string;         // e.g., Axminster / Hand Tufted, etc.
  desc: string;        // rich description
};

const SAMPLES: Record<string, Sample> = {
  "london-geometric-01": {
    code: "A001",
    title: "Golden Vein",
    tag: "Axminster",
    desc:
      "Inspired by the texture of aged stone and the play of light across polished metal, Golden Vein evokes timeless elegance through layered tones. Designed for public areas, its abstract composition balances luxury with restraint, grounding the space while complementing high-end finishes.",
  },
  "alpine-weave-02": {
    code: "A002",
    title: "Alpine Weave",
    tag: "Hand Tufted",
    desc:
      "Layered pile heights and sculpt detail create a tactile, bespoke finish. A versatile base for lounges and suites, adaptable in colorway and scale to match architectural rhythm.",
  },
  // add more samples as you like…
};

export default function LibraryDetail({ params }: { params: { slug: string } }) {
  const item = SAMPLES[params.slug];
  if (!item) return notFound();

  return (
    <div className="mx-auto max-w-6xl px-6 py-24">
      {/* back link */}
      <a href="/library" className="text-amber-600 hover:underline">&larr; Back to Library</a>

      {/* Header block — Title + description (slide 23 style) */}
      <header className="mt-4 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-start">
        <div className="md:col-span-5">
          <h1 className="text-3xl md:text-4xl font-bold">
            {item.code} — {item.title}
          </h1>
          <div className="mt-1 text-sm text-gray-500">{item.tag}</div>
          <p className="mt-4 text-lg text-gray-700 leading-7">
            {item.desc}
          </p>
        </div>
        <div className="md:col-span-7">
          {/* Optional supporting note or specs intro; keep minimal for now */}
          <div className="rounded-xl border border-gray-200 p-4 text-sm text-gray-700">
            <div className="font-medium">Project Applications</div>
            <p className="mt-2">
              Public areas, corridors, guestrooms (scale and colorway adjustable to site).
            </p>
          </div>
        </div>
      </header>

      {/* Visual composition — Primary + Details + Application (slide 23 layout) */}
      <section className="mt-10 grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Left: Primary visual (Image of Carpet) */}
        <div className="md:col-span-7">
          <div className="aspect-[4/3] md:aspect-[5/4] w-full rounded-2xl bg-gray-200" />
          <p className="mt-2 text-xs text-gray-500">Image of Carpet (primary)</p>
        </div>

        {/* Right: Two stacked visuals (Details + Application) */}
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

      {/* Optional: spec / technique box (kept concise like the deck tone) */}
      <aside className="mt-10 grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-7">
          {/* Placeholder for a second row of images if needed later */}
        </div>
        <div className="md:col-span-5">
          <div className="rounded-xl border p-6">
            <h2 className="text-lg font-semibold">Technique & Materials</h2>
            <ul className="mt-3 text-sm text-gray-700 space-y-1">
              <li>Technique: {item.tag} (adjustable)</li>
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
