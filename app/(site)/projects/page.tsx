// app/(site)/projects/page.tsx
import Link from "next/link";
import Image from "next/image";
import { getAllProjects } from "../lib/getProjects";

export const dynamic = "force-static";

const bp = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function ProjectsIndex() {
  const projects = getAllProjects();

  return (
    <main className="mx-auto max-w-7xl px-6 py-24 text-brand-ink">
      {/* Centered header */}
      <header className="text-center max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight flex items-center justify-center gap-3">
          <span className="inline-block h-[3px] w-10 bg-brand-gold rounded-full" />
          Hotel
          <span className="inline-block h-[3px] w-10 bg-brand-gold rounded-full" />
        </h1>
        <p className="mt-8 text-base md:text-lg text-neutral-700 leading-relaxed">
          TCC Carpets collaborates with world-renowned hotels to craft bespoke flooring solutions
          that embody luxury, comfort, and identity. Each design is tailored to complement the
          architectural character of its environment, from grand lobbies and corridors to intimate
          guest suites.
        </p>
      </header>

      {/* generous vertical breathing room before grid */}
      <div className="mt-20 md:mt-24" />

      {/* Project cards */}
      <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
        {projects.map((p, i) => (
          <li key={p.slug}>
            <Link
              href={`/projects/${p.slug}`}
              className="group block overflow-hidden border border-neutral-200 bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="relative aspect-[3/4]">
                <Image
                  src={`${bp}/images/projects/${p.slug}/${p.cover}`}
                  alt={p.title}
                  fill
                  sizes="(min-width:1280px)20vw,(min-width:1024px)25vw,(min-width:640px)50vw,100vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  priority={i === 0}
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4 md:p-5 text-white">
                  <h2 className="text-lg md:text-xl font-semibold drop-shadow-sm">
                    {p.title}
                  </h2>
                  {p.subtitle && (
                    <p className="mt-1 text-sm text-white/90">{p.subtitle}</p>
                  )}
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
