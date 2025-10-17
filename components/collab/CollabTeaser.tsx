// components/collab/CollabTeaser.tsx
import Link from "next/link";
import Section from "@/components/Section";

const TEASERS = [
  { title: "Studio A Collaboration", role: "Concept & Axminster", slug: "studio-a" },
  { title: "Designer B Capsule", role: "Hand Tufted Edition", slug: "designer-b" },
  { title: "Brand C Residency", role: "Material Palette", slug: "brand-c" },
  { title: "Curator D Series", role: "Pattern Research", slug: "curator-d" },
];

export default function CollabTeaser() {
  return (
    <Section id="collaborations" className="bg-white">
      <div className="flex items-end justify-between">
        <h2 className="text-2xl md:text-3xl font-semibold">Collaborations</h2>
        <Link href="/collaborations" className="text-amber-600 hover:underline text-sm">
          View all collaborations →
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {TEASERS.map((c) => (
          <Link
            key={c.slug}
            href={`/collaborations#${c.slug}`}
            className="group block rounded-2xl border border-gray-200 p-4 hover:shadow-md transition"
          >
            <div className="aspect-[4/3] w-full rounded-xl bg-gray-200 mb-3" />
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">{c.title}</h3>
                <p className="text-xs text-gray-500">{c.role}</p>
              </div>
              <span className="text-amber-600 opacity-0 group-hover:opacity-100 transition">Open</span>
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
}
