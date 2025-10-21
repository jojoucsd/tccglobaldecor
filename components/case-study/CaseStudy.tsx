// components/case-study/CaseStudy.tsx
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/projects";

export default function CaseStudy({ data }: { data: Extract<Project, { template: "caseStudy" }> }) {
  const hero = data.images[0];
  const strip = data.images.slice(1);

  return (
    <main className="min-h-screen bg-white text-neutral-900">
      {/* Sector overview (slide 8) */}
      <section className="mx-auto max-w-6xl px-6 pt-20 pb-8">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-sm uppercase tracking-widest text-neutral-500">Sectors</p>
            <h1 className="mt-2 text-3xl md:text-4xl font-bold">{data.marketTitle ?? "Hotel"}</h1>
            <p className="mt-4 max-w-3xl text-base md:text-lg text-neutral-700">{data.sectorIntro}</p>
          </div>
          <Link href="/projects" className="shrink-0 text-amber-600 hover:text-amber-700 font-medium underline underline-offset-4">
            View Projects →
          </Link>
        </div>

        <ul className="mt-6 flex flex-wrap gap-2">
          {data.marquee.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/projects/${p.slug}`}
                className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-sm shadow-sm hover:shadow transition"
              >
                <span className="font-medium">{p.name}</span>
                <span className="text-neutral-500">{p.location}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <div className="mx-auto max-w-6xl px-6"><div className="h-px w-full bg-neutral-200" /></div>

      {/* Project header (slide 9) */}
      <section className="mx-auto max-w-6xl px-6 py-10">
        <p className="text-sm uppercase tracking-widest text-neutral-500">Project</p>
        <h2 className="mt-2 text-3xl md:text-4xl font-bold">{data.title}</h2>
        {data.address && <p className="mt-2 text-sm md:text-base text-neutral-600">{data.address}</p>}
      </section>

      {/* Hero */}
      {hero && (
        <section className="relative aspect-[16/7] w-full">
          <Image src={hero.src} alt={hero.alt ?? data.title} fill className="object-cover" priority unoptimized />
        </section>
      )}

      {/* Overview (slide 10) */}
      {data.overview && (
        <section className="mx-auto max-w-4xl px-6 py-12">
          <p className="text-lg leading-relaxed text-neutral-800">{data.overview}</p>
        </section>
      )}

      {/* Details + media strip (slide 11) */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-3">
            <div className="prose prose-neutral max-w-none">
              <p className="text-base md:text-lg leading-relaxed text-neutral-800">{data.details}</p>
              {data.details2 && (
                <p className="mt-6 text-base md:text-lg leading-relaxed text-neutral-800">{data.details2}</p>
              )}
            </div>
          </div>
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {strip.map((m) => (
                <div key={m.src} className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-neutral-100">
                  <Image src={m.src} alt={m.alt ?? data.title} fill className="object-cover" unoptimized />
                </div>
              ))}
              <div className="flex items-center gap-2 pt-2" aria-hidden>
                {Array.from({ length: 7 }).map((_, i) => (
                  <span key={i} className={`h-1.5 w-1.5 rounded-full ${i === 2 ? "bg-neutral-800" : "bg-neutral-300"}`} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
