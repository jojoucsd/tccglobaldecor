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

  // Optional overlay copy for highlighted projects
  const OVERLAYS: Record<
    string,
    Partial<{ address: string; summary: string; description: string; notes: string }>
  > = {
    "the-londoner-hotel": {
      address: "Estrada do Istmo. s/n, Cotai, Macau SAR, P.R. China",
      summary:
        "Located at the heart of Cotai, The Londoner Hotel captures the grandeur of British sophistication through architecture and interior design. Inspired by London’s timeless heritage, the hotel merges classic detailing with modern luxury, creating a distinct atmosphere of refined hospitality.",
      description:
        "Within this setting, TCCarpets crafted bespoke designs that echo the hotel’s British narrative. Each carpet was tailored to its environment—bold patterns and rich tones define the public areas, while softer palettes and delicate motifs enrich the suites. Through meticulous craftsmanship and advanced production, the carpets bring harmony, comfort, and identity to every space, making them an integral part of The Londoner’s distinguished character.",
      notes:
        "Geometric motifs inspired by British architecture guide the flow of movement, while layered color gradients create visual depth under soft ambient lighting.",
    },
    "park-hyatt-niseko": {
      address: "328-47 Aza Iwaobetsu, Kutchan, Abuta District, Hokkaido, Japan",
      summary:
        "Nestled at the base of Mount Annupuri, the Park Hyatt Niseko Hanazono celebrates natural beauty through quiet luxury and refined craftsmanship.",
      description:
        "For the suites and private zones, TCC introduced subtle gradations of color and minimalist motifs, evoking the stillness of winter mornings and the clarity of light on snow. Each piece was crafted to embody tranquility and refinement, contributing to Park Hyatt Niseko’s seamless balance between contemporary comfort and timeless elegance.",
      notes:
        "In the public spaces, organic patterns and muted tones mirror the textures of mountain terrain and melting snow, blending softly with timber finishes and panoramic views.",
    },
  };

  const overlay = OVERLAYS[slug] ?? {};
  const images =
    (project.images ?? []).map((file: string) => ({
      src: `${bp}/images/projects/${project.slug}/${file}`,
      alt: project.title,
    })) ?? [];

  const address =
    (overlay as any).address ??
    (project as any).address ??
    (project as any).location ??
    (project as any).subtitle ??
    undefined;

  const overview = (overlay as any).summary ?? (project as any).summary ?? "";
  const details =
    (overlay as any).description ?? (project as any).description ?? "";
  const details2 = (overlay as any).notes ?? (project as any).notes ?? "";

  return (
    <CaseStudyLayout
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

/* ---------- LAYOUT ---------- */
function CaseStudyLayout({
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
  const hero   = images[1];
  const img50  = images[2] ?? images.at(-1)!;
  const smallA = images[3] ?? images.at(-1)!;
  const img60L = images[4] ?? images.at(-1)!;
  const smallB = images[5] ?? images.at(-1)!;
  const img60R = images[6] ?? images.at(-1)!;

  return (
    <main className="min-h-screen bg-white text-brand-ink">
      {/* HERO */}
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
        ← <span className="font-medium tracking-tight ">Projects</span>
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

      {/* A — 40 / 60 */}
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
          </div>
        </div>


      <Section className="py-0">
        <div className="mt-6 md:mt-8 h-[3px] w-full bg-brand-gold/40 rounded-full" />
      </Section>

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

  {/* RIGHT 35% — no equal-height rows; let content size itself */}
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

    {/* Project Notes — shrink to content */}
    <div className="rounded-2xl p-4 sm:p-5 bg-white self-start lg:self-auto">
      <h3 className="text-base sm:text-lg font-semibold flex items-center gap-3">
        <span className="inline-block h-[3px] w-8 bg-brand-gold rounded-full" />
        Project Notes
      </h3>
      <p className="mt-2 sm:mt-3 text-[15px] sm:text-base md:text-[1.05rem] leading-relaxed text-neutral-800">
        {details}
      </p>
    </div>
  </div>
</div>


      <Section className="py-0">
        <div className="h-[3px] w-full bg-brand-gold/40 rounded-full" />
      </Section>

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
