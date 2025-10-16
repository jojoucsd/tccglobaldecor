import Link from "next/link";
import Section from "@/components/Section";

const TEASERS = [
  { title: "Geometric", slug: "geom-01" },
  { title: "Organic", slug: "org-01" },
  { title: "Textural", slug: "tex-01" },
  { title: "Monochrome", slug: "mono-01" },
];

export default function LibraryTeaser() {
  return (
    <Section id="library" className="bg-white">
      <div className="flex items-end justify-between">
        <h2 className="text-2xl md:text-3xl font-semibold">Library</h2>
        <Link href="/library" className="text-amber-600 hover:underline text-sm">
          View full library →
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {TEASERS.map((t) => (
          <Link
            key={t.slug}
            href={`/library`}
            className="group block rounded-2xl border border-gray-200 p-4 hover:shadow-md transition"
          >
            <div className="aspect-[4/3] w-full rounded-xl bg-gray-200 mb-3" />
            <div className="flex items-center justify-between">
              <h3 className="font-medium">{t.title}</h3>
              <span className="text-amber-600 opacity-0 group-hover:opacity-100 transition">Open</span>
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
}
