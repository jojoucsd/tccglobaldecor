// app/(site)/projects/[slug]/page.tsx
import Image from "next/image";
import { notFound } from "next/navigation";
import { getAllProjects, getProjectBySlug } from "@/lib/getProjects";
import Section from "@/components/Section";

export const dynamic = "force-static";
const bp = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** ---------- Page (DEFAULT EXPORT) ---------- */
export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params; // ✅ Next 15 requires await

  const project = getProjectBySlug(slug);
  if (!project) return notFound();

  // Inject copy ONLY for these two slugs (no change to getProjects.ts)
  const OVERLAYS: Record<
    string,
    Partial<{ address: string; summary: string; description: string; notes: string }>
  > = {
    "the-londoner-hotel": {
      address: "Estrada do Istmo. s/n, Cotai, Macau SAR, P.R. China",
      summary:
        "Located at the heart of Cotai, The Londoner Hotel captures the grandeur of British sophistication through architecture and interior design. Inspired by London’s timeless heritage, the hotel merges classic detailing with modern luxury, creating a distinct atmosphere of refined hospitality.",
      description:
        "Within this setting, TCC Carpets crafted bespoke designs that echo the hotel’s British narrative. Each carpet was tailored to its environment—bold patterns and rich tones define the public areas, while softer palettes and delicate motifs enrich the suites. Through meticulous craftsmanship and advanced production, the carpets bring harmony, comfort, and identity to every space, making them an integral part of The Londoner’s distinguished character.",
      notes:
        "Geometric motifs inspired by British architecture guide the flow of movement, while layered color gradients create visual depth under soft ambient lighting. Each installation showcases TCC Carpets’ ability to balance design precision with the dynamic needs of high-traffic hospitality environments.",
    },
    "park-hyatt-niseko": {
      address: "328-47 Aza Iwaobetsu, Kutchan, Abuta District, Hokkaido, Japan",
      summary:
        "Nestled at the base of Mount Annupuri, the Park Hyatt Niseko Hanazono celebrates natural beauty through quiet luxury and refined craftsmanship. The interior design draws inspiration from the surrounding landscape— snow, wood, and stone. Within this context, TCC Carpets designed a series of bespoke floor coverings that reflect the rhythm of nature and the Japanese aesthetic of restraint.",
      description:
        "For the suites and private zones, TCC introduced subtle gradations of color and minimalist motifs, evoking the stillness of winter mornings and the clarity of light on snow. Every piece was crafted to embody tranquility and refinement, contributing to Park Hyatt Niseko’s seamless balance between contemporary comfort and timeless elegance.",
      notes:
        "In the public spaces, organic patterns and muted tones mirror the textures of mountain terrain and melting snow, softly blending with timber finishes and panoramic views. The carpets serve as both visual anchors and sensory elements, offering warmth underfoot while enhancing the acoustics and intimacy of the lounge and dining areas.",
    },
  };

  const overlay = OVERLAYS[slug] ?? {};

  const images =
    (project.images ?? []).map((file: string) => ({
      src: `${bp}/images/projects/${project.slug}/${file}`,
      alt: project.title,
    })) ?? [];

  // Address + text with overlay fallback (safe casts avoid TS errors)
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

/** ---------- SSG params ---------- */
export async function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

/** ---------- Case Study Layout (unchanged visuals, text areas borderless) ---------- */
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
  const hero   = images[0];
  const img50  = images[1] ?? images.at(-1)!;
  const smallA = images[2] ?? images.at(-1)!;
  const img60L = images[3] ?? images.at(-1)!;
  const smallB = images[4] ?? images.at(-1)!;
  const img60R = images[5] ?? images.at(-1)!;

  return (
    <main className="min-h-screen bg-white text-brand-ink">
      {hero && (
        <section className="relative w-full h-[66vh]">
          <Image
            src={hero.src}
            alt={hero.alt ?? title}
            fill
            className="object-cover"
            priority
            unoptimized
          />
        </section>
      )}

      {/* Header */}
      <Section className="pt-6 md:pt-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{title}</h1>
          {address ? (
            <p className="text-sm md:text-base text-neutral-700 md:text-right">{address}</p>
          ) : null}
        </div>
        <div className="mt-4 h-[3px] w-full bg-brand-gold/50 rounded-full" />
      </Section>

      {/* A — 40%/60% stacked left */}
      <Section className="py-10 md:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left 40%: text + small image */}
          <div className="lg:col-span-5">
            <div className="grid gap-6 h-full lg:grid-rows-[2fr_3fr]">
              {/* Text area — borderless */}
              <div className="rounded-2xl p-5 md:p-6 bg-white">
                <p className="text-base md:text-lg leading-relaxed text-neutral-800">
                  {overview || "[WRITE OVERVIEW TEXT HERE]"}
                </p>
              </div>

              {/* Small image (kept as-is) */}
              <div className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl ring-1 ring-neutral-200">
                <Image
                  src={smallA?.src ?? img50.src}
                  alt={smallA?.alt ?? title}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            </div>
          </div>

          {/* Right 60% image (kept as-is) */}
          <div className="lg:col-span-7">
            <div className="relative w-full aspect-[3/2] overflow-hidden rounded-2xl ring-1 ring-neutral-200">
              <Image
                src={img50.src}
                alt={img50.alt ?? title}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          </div>
        </div>
      </Section>

      {/* Divider */}
      <Section>
        <div className="mt-10 md:mt-12 h-[3px] w-full bg-brand-gold/40 rounded-full" />
      </Section>

      {/* B — 65% left image, right column (square img + text) */}
      <Section className="py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* LEFT 65% (kept as-is) */}
          <div className="lg:col-span-8">
            <div className="relative w-full aspect-[3/2] overflow-hidden rounded-2xl ring-1 ring-neutral-200">
              <Image
                src={img60L.src}
                alt={img60L.alt ?? title}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          </div>

          {/* RIGHT 35%: stacked */}
          <div className="lg:col-span-4 grid gap-6 lg:grid-rows-[1fr_1fr]">
            {/* Top square image (kept as-is) */}
            <div className="relative w-full aspect-square overflow-hidden rounded-2xl ring-1 ring-neutral-200">
              <Image
                src={smallB?.src ?? img60L.src}
                alt={smallB?.alt ?? title}
                fill
                className="object-cover"
                unoptimized
              />
            </div>

            {/* Bottom text area — borderless */}
            <div className="rounded-2xl p-5 md:p-6 bg-white">
              <h3 className="text-lg font-semibold flex items-center gap-3">
                <span className="inline-block h-[3px] w-8 bg-brand-gold rounded-full" />
                Project Notes
              </h3>
              <p className="mt-3 text-base md:text-lg leading-relaxed text-neutral-800">
                {details || "[WRITE PROJECT DETAILS HERE]"}
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Divider */}
      <Section>
        <div className="h-[3px] w-full bg-brand-gold/40 rounded-full" />
      </Section>
      <div className="h-16 md:h-20" />

      {/* C — 30% text (bottom) + 70% image */}
      <Section className="pb-20 md:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* LEFT 30% */}
          <div className="lg:col-span-4 flex flex-col justify-end">
            {/* Final text area — borderless */}
            <div className="rounded-2xl p-5 md:p-6 bg-white">
              <p className="text-base md:text-lg leading-relaxed text-neutral-800">
                {details2 || "[WRITE FINAL SECTION TEXT HERE]"}
              </p>
            </div>
          </div>

          {/* RIGHT 70% image (kept as-is) */}
          <div className="lg:col-span-8">
            <div className="relative w-full aspect-[3/2] overflow-hidden rounded-2xl ring-1 ring-neutral-200">
              <Image
                src={img60R.src}
                alt={img60R.alt ?? title}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          </div>
        </div>
      </Section>
    </main>
  );
}
