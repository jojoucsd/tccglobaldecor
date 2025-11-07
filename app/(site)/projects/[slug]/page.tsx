// app/(site)/projects/[slug]/page.tsx
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllProjects, getProjectBySlug } from "@/lib/getProjects";
import Section from "@/components/Section";

export const dynamic = "force-static";
const bp = process.env.NEXT_PUBLIC_BASE_PATH || "";

/* ---------- PAGE ---------- */
export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return notFound();

  // Images from data
  const images =
    (project.images ?? []).map((file: string) => ({
      src: `${bp}/images/projects/${project.slug}/${file}`,
      alt: project.title,
    })) ?? [];

  // Text content comes directly from project data (projects.json)
  const address =
    (project as any).address ??
    (project as any).location ??
    (project as any).subtitle ??
    undefined;

  const overview = (project as any).summary ?? "";
  const details = (project as any).description ?? "";
  const details2 = (project as any).notes ?? "";

  return (
    <ProjectLayout
      title={project.title}
      address={address}
      overview={overview}
      details={details}
      details2={details2}
      images={images}
    />
  );
}

/* ---------- STATIC PARAMS ---------- */
export async function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

/* ---------- LAYOUT (single template for all projects) ---------- */
function ProjectLayout({
  title,
  address,
  overview,
  details,
  details2,
  images,
}: {
  title: string;
  address?: string;
  overview?: string;
  details?: string;
  details2?: string;
  images: { src: string; alt?: string }[];
}) {
  const hero = images[1];
  const img50 = images[2] ?? images.at(-1)!;
  const smallA = images[3] ?? images.at(-1)!;
  const img60L = images[4] ?? images.at(-1)!;
  const smallB = images[5] ?? images.at(-1)!;
  const img60R = images[6] ?? images.at(-1)!;

  return (
    // Added top padding so fixed header no longer overlaps hero
    <main className="min-h-screen bg-white text-brand-ink pt-16 sm:pt-20 lg:pt-24">
      {/* HERO with in-banner back link */}
      {hero && (
        <section className="relative w-full h-[52vh] sm:h-[58vh] md:h-[60vh] min-h-[300px]">
          <Image
            src={hero.src}
            alt={hero.alt ?? title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
            unoptimized
          />

          {/* readability gradient at bottom */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-20 sm:h-24 bg-gradient-to-t from-black/35 via-black/10 to-transparent"
          />

          {/* back link – bottom-left */}
          <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4">
            <Link
              href="/projects"
              aria-label="Back to Projects"
              className="inline-flex items-center gap-2 rounded-full
                         bg-brand-ink/75 hover:bg-brand-ink/90
                         text-white px-3 py-1.5 text-xs sm:text-sm
                         ring-1 ring-white/25 backdrop-blur-sm transition-colors"
            >
              ← <span className="font-medium tracking-tight">Projects</span>
            </Link>
          </div>
        </section>
      )}

      {/* HEADER */}
      <Section className="pt-4 sm:pt-6 md:pt-8 pb-4 md:pb-5">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-2 md:gap-3">
          <h1 className="text-2xl sm:text-3xl md:text-[1.9rem] lg:text-[2.1rem] font-bold tracking-tight">
            {title}
          </h1>
          {address && (
            <p className="text-xs sm:text-sm md:text-[0.95rem] text-neutral-700 md:text-right leading-relaxed">
              {address}
            </p>
          )}
        </div>
        <div className="mt-3 h-[3px] w-full bg-brand-gold/50 rounded-full" />
      </Section>

      {/* A — 40 / 60 : overview + plan vs realized image */}
      <Section className="py-6 sm:py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 items-stretch">
          <div className="lg:col-span-5">
            <div className="grid gap-4 sm:gap-6 h-full lg:grid-rows-[2fr_3fr]">
              <div className="rounded-2xl p-4 sm:p-5 bg-white">
                <p className="text-[15px] sm:text-base md:text-[1.05rem] leading-relaxed text-neutral-800">
                  {overview}
                </p>
              </div>
              <div className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl ring-1 ring-neutral-200">
                <Image
                  src={smallA?.src ?? img50.src}
                  alt={smallA?.alt ?? title}
                  fill
                  className="object-cover"
                  loading="lazy"
                  sizes="(min-width:1024px) 40vw, 100vw"
                  unoptimized
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="relative w-full aspect-[3/2] overflow-hidden rounded-2xl ring-1 ring-neutral-200">
              <Image
                src={img50.src}
                alt={img50.alt ?? title}
                fill
                className="object-cover"
                loading="lazy"
                sizes="(min-width:1024px) 60vw, 100vw"
                unoptimized
              />
            </div>
            {/* Concept → Realization caption */}
            <p className="mt-6 sm:mt-8 text-sm sm:text-[15px] font-semibold tracking-[0.14em] uppercase text-brand-ink">
              Concept Plan → Realized Space
            </p>
          </div>
        </div>
      </Section>

      {/* Divider */}
      <Section className="py-0">
        <div className="mt-0 md:mt-2 h-[3px] w-full bg-brand-gold/40 rounded-full" />
      </Section>

      {/* B — 65 / 35 : feature space + detail + notes */}
      <Section className="py-6 sm:py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 items-start">
          {/* LEFT 65% */}
          <div className="lg:col-span-8">
            <div className="relative w-full aspect-[3/2] overflow-hidden rounded-2xl ring-1 ring-neutral-200">
              <Image
                src={img60L.src}
                alt={img60L.alt ?? title}
                fill
                className="object-cover"
                loading="lazy"
                sizes="(min-width:1024px) 66vw, 100vw"
                unoptimized
              />
            </div>
          </div>

          {/* RIGHT 35% */}
          <div className="lg:col-span-4 flex flex-col gap-4 sm:gap-5 lg:gap-6">
            {/* Square image */}
            <div className="relative w-full aspect-square overflow-hidden rounded-2xl ring-1 ring-neutral-200">
              <Image
                src={smallB?.src ?? img60L.src}
                alt={smallB?.alt ?? title}
                fill
                className="object-cover"
                loading="lazy"
                sizes="(min-width:1024px) 34vw, 100vw"
                unoptimized
              />
            </div>

            {/* Project Notes */}
            <div className="rounded-2xl p-4 sm:p-5 bg-white self-start lg:self-auto">
              <p className="mt-2 sm:mt-3 text-[15px] sm:text-base md:text-[1.05rem] leading-relaxed text-neutral-800">
                {details}
              </p>
            </div>
          </div>
        </div>

        {/* Feature space caption */}
        <p className="mt-6 sm:mt-8 text-sm sm:text-[15px] font-semibold tracking-[0.14em] uppercase text-brand-ink">
          Feature Space &amp; Detail View
        </p>
      </Section>

      {/* Divider */}
      <Section className="py-0">
        <div className="h-[3px] w-full bg-brand-gold/40 rounded-full" />
      </Section>

      {/* C — 35 / 65 : secondary notes + final large image */}
      <Section className="py-6 sm:py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 items-stretch">
          <div className="lg:col-span-4 flex flex-col justify-end">
            <div className="rounded-2xl p-4 sm:p-5 bg-white">
              <p className="text-[15px] sm:text-base md:text-[1.05rem] leading-relaxed text-neutral-800">
                {details2}
              </p>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="relative w-full aspect-[3/2] overflow-hidden rounded-2xl ring-1 ring-neutral-200">
              <Image
                src={img60R.src}
                alt={img60R.alt ?? title}
                fill
                className="object-cover"
                loading="lazy"
                sizes="(min-width:1024px) 66vw, 100vw"
                unoptimized
              />
            </div>
          </div>
        </div>
      </Section>
    </main>
  );
}
