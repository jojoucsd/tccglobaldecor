// app/(site)/collaborations/[slug]/page.tsx
import { notFound } from "next/navigation";

const DETAILS: Record<
  string,
  { title: string; partner: string; intro: string; body?: string }
> = {
  "studio-a": {
    title: "Studio A Collaboration",
    partner: "Studio A",
    intro:
      "Axminster rhythm and grand-scale motifs developed with Studio A. Exploring proportion, texture, and tonal refinement for hospitality environments.",
    body:
      "The collaboration produced a limited series focused on architectural pattern language and restrained metallic palettes, balancing statement design with operational durability.",
  },
  "designer-b": {
    title: "Designer B Capsule",
    partner: "Designer B",
    intro:
      "Hand-Tufted sculpted relief collection emphasizing tactile depth and tonal layering.",
    body:
      "Each carpet was designed to enhance spatial flow, integrating subtle gradients and high-low cut pile interplay for suites and lobbies.",
  },
  "brand-c": {
    title: "Brand C Residency",
    partner: "Brand C",
    intro:
      "A research residency exploring material palettes and color R&D within woven structures.",
  },
  "curator-d": {
    title: "Curator D Series",
    partner: "Curator D",
    intro:
      "Pattern research for public areas focusing on density modulation and way-finding cues through color contrast.",
  },
  "atelier-e": {
    title: "Atelier E Exchange",
    partner: "Atelier E",
    intro:
      "Weave trials and hybrid techniques pushing boundaries between Axminster and Hand-Tuft processes.",
  },
  "house-f": {
    title: "House F Edition",
    partner: "House F",
    intro:
      "Limited capsule for presidential suites showcasing layered textures and custom dye lots.",
  },
};

export function generateStaticParams() {
  return Object.keys(DETAILS).map((slug) => ({ slug }));
}

export default async function CollaborationDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const d = DETAILS[slug];
  if (!d) return notFound();

  return (
    <div className="mx-auto max-w-6xl px-6 py-24">
      <a href="/collaborations" className="text-amber-600 hover:underline">
        ← Back to Collaborations
      </a>

      <h1 className="mt-6 text-4xl font-bold tracking-tight">{d.title}</h1>
      <p className="mt-2 text-sm text-gray-500">with {d.partner}</p>

      <p className="mt-6 text-lg leading-relaxed text-gray-700">{d.intro}</p>
      {d.body && <p className="mt-4 text-gray-700 leading-relaxed">{d.body}</p>}

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="aspect-[4/3] rounded-2xl bg-gray-200" />
        <div className="aspect-[4/3] rounded-2xl bg-gray-200" />
        <div className="aspect-[4/3] rounded-2xl bg-gray-200" />
        <div className="aspect-[4/3] rounded-2xl bg-gray-200" />
      </div>
    </div>
  );
}
