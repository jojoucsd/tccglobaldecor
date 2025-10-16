// app/(site)/projects/[slug]/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";

// Whatever you had—kept from earlier:
const DETAILS: Record<string, { title: string; blurb: string }> = {
  "the-londoner-hotel": {
    title: "The Londoner Hotel",
    blurb:
      "Bespoke carpets across suites and public areas, balancing comfort, durability, and identity.",
  },
  "park-hyatt-niseko": {
    title: "Park Hyatt Niseko Hanazono Hotel",
    blurb:
      "Refined palettes and textures designed for alpine luxury and performance.",
  },
  // add more as you publish more detail pages…
};

// ✅ Next 15: params is a Promise
export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = DETAILS[slug];
  if (!data) return notFound();

  return (
    <div className="mx-auto max-w-5xl px-6 py-24">
      <Link href="/projects" className="text-amber-600 hover:underline">← Back to Projects</Link>
      <h1 className="mt-4 text-4xl font-bold text-amber-600">{data.title}</h1>
      <p className="mt-4 text-lg text-gray-700">{data.blurb}</p>

      {/* placeholders */}
      <div className="mt-10 aspect-[16/9] rounded-2xl bg-gray-200" />
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="aspect-[4/3] rounded-xl bg-gray-200" />
        <div className="aspect-[4/3] rounded-xl bg-gray-200" />
      </div>
    </div>
  );
}

// ✅ Needed for static export (build-time paths)
export function generateStaticParams() {
  return Object.keys(DETAILS).map((slug) => ({ slug }));
}

