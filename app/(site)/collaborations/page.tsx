// app/(site)/collaborations/page.tsx
import Link from "next/link";

type Collab = { slug: string; title: string; partner: string; blurb: string };

const COLLABS: Collab[] = [
  { slug: "studio-a",  title: "Studio A Collaboration",  partner: "Studio A",  blurb: "Axminster concepts exploring scale and rhythm." },
  { slug: "designer-b",title: "Designer B Capsule",      partner: "Designer B", blurb: "Hand Tufted series with sculpted relief." },
  { slug: "brand-c",   title: "Brand C Residency",       partner: "Brand C",   blurb: "Material palettes and color R&D." },
  { slug: "curator-d", title: "Curator D Series",        partner: "Curator D", blurb: "Pattern research for public areas." },
  { slug: "atelier-e", title: "Atelier E Exchange",      partner: "Atelier E", blurb: "Weave trials and hybrid techniques." },
  { slug: "house-f",   title: "House F Edition",         partner: "House F",   blurb: "Limited collection for suites." },
];

function Card({ c }: { c: Collab }) {
  return (
    <Link
      href={`/collaborations/${c.slug}`}
      className="group block rounded-2xl border border-gray-200 p-4 hover:shadow-md transition"
    >
      <div className="aspect-[4/3] w-full rounded-xl bg-gray-200 mb-3" />
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold">{c.title}</h3>
          <p className="text-xs text-gray-500">with {c.partner}</p>
        </div>
        <span className="text-amber-600 opacity-0 group-hover:opacity-100 transition">View</span>
      </div>
      <p className="mt-2 text-sm text-gray-600">{c.blurb}</p>
    </Link>
  );
}

export default function CollaborationsPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-24">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-start mb-10 md:mb-14">
        <div className="md:col-span-4">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Collaborations</h1>
        </div>
        <div className="md:col-span-7 md:col-start-6">
          <p className="text-gray-700 leading-7">
            Partnerships with designers, studios, and brands — exploring technique, material, and scale
            to create unique carpets for world-class interiors.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {COLLABS.map((c) => <Card key={c.slug} c={c} />)}
      </div>
    </div>
  );
}
