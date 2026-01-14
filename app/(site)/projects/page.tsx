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
  const projects = (getAllProjects() as ProjectItem[]).slice(0, 24); // show top 24 for grid

  // Show 1 CTA card on desktop if grid is not perfect (4 columns)
  const desktopCols = 4;
  const showCta = projects.length % desktopCols !== 0;

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
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight flex items-center justify-center gap-4">
          <span className="inline-block h-[4px] w-10 bg-brand-gold rounded-full" />
          Projects
          <span className="inline-block h-[4px] w-10 bg-brand-gold rounded-full" />
        </h1>
        <p className="mt-4 sm:mt-6 text-[15px] sm:text-base md:text-lg text-neutral-600 leading-relaxed">
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-2.5 sm:p-4 md:p-5 text-center sm:text-left text-white">
                  <h2 className="text-sm sm:text-lg md:text-xl font-bold drop-shadow-lg line-clamp-2 leading-tight">
                    {p.title}
                  </h2>
                </div>
              </div>
            </Link>
          </li>
        ))}

        {/* CTA card - only visible on desktop when grid is not perfect */}
        {showCta && (
          <li className="relative group hidden sm:block">
            <Link
              href="/connect"
              className="block overflow-hidden rounded-[8px] ring-1 ring-brand-gold/40 hover:ring-brand-gold transition h-full"
            >
              <div className="relative aspect-[3/4] bg-gradient-to-br from-neutral-50 to-neutral-100 flex flex-col items-center justify-center p-6 text-center">
                <div className="w-12 h-12 mb-4 rounded-full bg-brand-gold/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-brand-gold-deep" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <h2 className="text-lg md:text-xl font-bold text-brand-ink leading-tight">
                  Let Us Achieve Your Vision
                </h2>
                <p className="mt-2 text-sm text-neutral-500">
                  Start your project today
                </p>
              </div>
            </Link>
          </li>
        )}
      </ul>
    </main>
  );
}

