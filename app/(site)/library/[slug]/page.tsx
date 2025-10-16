// app/(site)/library/[slug]/page.tsx
import { notFound } from "next/navigation";

type Sample = {
  code: string;
  title: string;
  tag: string;
  desc: string;
};

const SAMPLES: Record<string, Sample> = {
  "london-geometric-01": {
    code: "A001",
    title: "Golden Vein",
    tag: "Axminster",
    desc:
      "Inspired by the texture of aged stone and the play of light across polished metal...",
  },
  "alpine-weave-02": {
    code: "A002",
    title: "Alpine Weave",
    tag: "Hand Tufted",
    desc:
      "Layered pile heights and sculpt detail create a tactile, bespoke finish...",
  },
  // ...add more
};

// ✅ Next 15: params is a Promise
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
      <a href="/library" className="text-amber-600 hover:underline">← Back to Library</a>
      {/* ...rest of your layout unchanged... */}
    </div>
  );
}

// ✅ Needed for static export to know which pages to build
export function generateStaticParams() {
  return Object.keys(SAMPLES).map((slug) => ({ slug }));
}
