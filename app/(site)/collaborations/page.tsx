// app/(site)/collaborations/page.tsx
import Link from "next/link";

type Collab = {
  id: string;     // anchor id
  title: string;
  partner: string;
  intro: string;
  body?: string;
};

const COLLABS: Collab[] = [
  {
    id: "studio-a",
    title: "Studio A Collaboration",
    partner: "Studio A",
    intro:
      "Axminster rhythm and grand-scale motifs developed with Studio A. Exploring proportion, texture, and tonal refinement for hospitality environments.",
    body:
      "The collaboration produced a limited series focused on architectural pattern language and restrained metallic palettes, balancing statement design with operational durability.",
  },
  {
    id: "designer-b",
    title: "Designer B Capsule",
    partner: "Designer B",
    intro:
      "Hand-Tufted sculpted relief collection emphasizing tactile depth and tonal layering.",
    body:
      "Each carpet was designed to enhance spatial flow, integrating subtle gradients and high-low cut pile interplay for suites and lobbies.",
  },
  {
    id: "brand-c",
    title: "Brand C Residency",
    partner: "Brand C",
    intro:
      "A research residency exploring material palettes and color R&D within woven structures.",
  },
  {
    id: "curator-d",
    title: "Curator D Series",
    partner: "Curator D",
    intro:
      "Pattern research for public areas focusing on density modulation and way-finding cues through color contrast.",
  },
  {
    id: "atelier-e",
    title: "Atelier E Exchange",
    partner: "Atelier E",
    intro:
      "Weave trials and hybrid techniques pushing boundaries between Axminster and Hand-Tuft processes.",
  },
  {
    id: "house-f",
    title: "House F Edition",
    partner: "House F",
    intro:
      "Limited capsule for presidential suites showcasing layered textures and custom dye lots.",
  },
];

function CardVisuals() {
  // simple 2x2 placeholder grid
  return (
    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
      <div className="aspect-[4/3] rounded-2xl bg-gray-200" />
      <div className="aspect-[4/3] rounded-2xl bg-gray-200" />
      <div className="aspect-[4/3] rounded-2xl bg-gray-200" />
      <div className="aspect-[4/3] rounded-2xl bg-gray-200" />
    </div>
  );
}

export default function CollaborationsPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-24">
      {/* Header + mini TOC */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-start mb-12">
        <div className="md:col-span-4">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Collaborations</h1>
        </div>
        <div className="md:col-span-7 md:col-start-6">
          <p className="text-gray-700 leading-7">
            Partnerships with designers, studios, and brands — exploring technique, material, and scale
            to create unique carpets for world-class interiors.
          </p>

          {/* Optional quick-jump links */}
          <ul className="mt-6 flex flex-wrap gap-3 text-sm text-amber-700">
            {COLLABS.map((c) => (
              <li key={c.id}>
                <a href={`#${c.id}`} className="hover:underline">{c.partner}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* All collaborations on one page */}
      <div className="space-y-20">
        {COLLABS.map((c) => (
          <section key={c.id} id={c.id} className="scroll-mt-24">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl md:text-3xl font-semibold">{c.title}</h2>
              <Link href="/collaborations" className="text-xs text-gray-500 hover:underline">
                # {c.partner}
              </Link>
            </div>
            <p className="mt-2 text-sm text-gray-500">with {c.partner}</p>
            <p className="mt-6 text-lg leading-relaxed text-gray-700">{c.intro}</p>
            {c.body && <p className="mt-3 text-gray-700 leading-relaxed">{c.body}</p>}

            <CardVisuals />
          </section>
        ))}
      </div>
    </div>
  );
}
