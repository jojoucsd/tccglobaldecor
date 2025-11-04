import Link from "next/link";
import Image from "next/image";
import { getAllProjects } from "../../../lib/getProjects";

export const dynamic = "force-static";

const bp = process.env.NEXT_PUBLIC_BASE_PATH || "";

type ProjectItem = {
  slug: string;
  title: string;
  cover: string;
  images: string[];
  subtitle?: string;
};

export default function ProjectsIndex() {
  const projects = (getAllProjects() as ProjectItem[]).slice(0, 15); // show top 15 for grid demo

  return (
    <main
      className="
        mx-auto max-w-7xl
        px-3 sm:px-6
        mt-[var(--header-h,4rem)]
        py-10 sm:py-16
        text-brand-ink
      "
    >
      {/* Header */}
      <header className="text-center max-w-3xl mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight flex items-center justify-center gap-3">
          <span className="inline-block h-[3px] w-8 bg-brand-gold rounded-full" />
          Projects
          <span className="inline-block h-[3px] w-8 bg-brand-gold rounded-full" />
        </h1>
        <p className="mt-3 sm:mt-5 text-[14px] sm:text-base md:text-lg text-neutral-700 leading-relaxed">
          A showcase of our bespoke carpet projects for world-class hotels,
          casinos, and hospitality destinations.
        </p>
      </header>

      {/* Grid layout */}
      <ul className="mt-10 sm:mt-14 grid grid-cols-3 gap-[6px] sm:grid-cols-4 sm:gap-3 md:grid-cols-4 md:gap-4 lg:grid-cols-4 lg:gap-5 xl:grid-cols-4 xl:gap-6">
        {projects.map((p, i) => (
          <li key={p.slug} className="relative group">
            <Link
              href={`/projects/${p.slug}`}
              className="block overflow-hidden rounded-[6px] sm:rounded-[8px] ring-1 ring-neutral-200 hover:ring-brand-gold/60 transition"
            >
              <div className="relative aspect-[1/1.2] sm:aspect-[3/4]">
                <Image
                  src={`${bp}/images/projects/${p.slug}/${p.cover}`}
                  alt={p.title}
                  fill
                  sizes="(min-width:1280px)25vw,(min-width:1024px)25vw,(min-width:640px)33vw,100vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  priority={i === 0}
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/25 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-1.5 sm:p-2 md:p-3 text-center sm:text-left text-white">
                  <h2 className="text-[11px] sm:text-sm md:text-base font-semibold drop-shadow-sm truncate">
                    {p.title}
                  </h2>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

