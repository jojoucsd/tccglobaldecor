// About.tsx
import Image from "next/image";
import Link from "next/link";
import Section from "@/components/Section";

const bp = process.env.NEXT_PUBLIC_BASE_PATH || "";

const HERO = {
  title: "Walk the Canvas — Art in Every Step",
  image: `${bp}/images/about/artineveryfootstep.avif`,
  alt: "Hospitality lounge featuring custom carpet by TCC",
};

const COPY = {
  intro:
    "Experts in carpet production, committed to quality, efficiency, and flexible design—delivering to international standards.",
  pillars: [
    { h: "Talent and Service", p: "Carpets are our products—but our people and service are our true foundation." },
    { h: "Communication", p: "Collaboration turns your intent into buildable designs and custom carpets." },
    { h: "Commitment", p: "Not just making carpets right—doing what’s right in every detail." },
  ],
  highlights: [
    "Over 20 years of experience in the carpet manufacturing industry with our own production factories.",
    "Creators of luxurious tufted and woven carpets and rugs.",
    "Specialists in customized projects for hospitality, casinos, cruise liners, residences, private jets, and yachts.",
    "Dedicated team of over 550 skilled artisans and professionals.",
  ],
};

export default function About() {
  return (
    <Section id="about" style={{ scrollMarginTop: "calc(var(--header-h))" }} className="scroll-mt-24">
      {/* Heading */}
      <header className="text-center text-brand-ink">
        <p className="inline-flex items-center gap-2 text-[11px] tracking-[0.18em] uppercase text-neutral-500">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand-gold" />
          Our Story
        </p>
        <h1 className="mt-1 text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
          {HERO.title}
        </h1>
        <div className="mx-auto mt-2 h-[3px] w-20 rounded-full bg-brand-gold" />
      </header>

      {/* Image first on mobile, copy after */}
      <div className="mt-6 md:mt-10 grid grid-cols-1 md:grid-cols-[45%_55%] gap-8 md:gap-10 items-start text-brand-ink">
        {/* Image */}
        <div className="relative w-full aspect-[4/3] overflow-hidden rounded-xl md:rounded-2xl bg-neutral-100 ring-1 ring-neutral-200">
          <Image
            src={HERO.image}
            alt={HERO.alt}
            fill
            className="object-cover"
            unoptimized
            priority
          />
        </div>

        {/* Copy */}
        <div>
          {/* Intro (shorter, readable) */}
          <p className="text-[15px] leading-relaxed text-neutral-800 sm:text-base md:text-lg">
            {COPY.intro}
          </p>

          {/* CTA brought up (mobile full width) */}
          <div className="mt-4 flex flex-col sm:flex-row gap-3">
            <Link
              href="/projects"
              className="inline-flex items-center justify-center rounded-full bg-brand-gold text-brand-ink px-5 py-2.5 text-sm font-semibold shadow-sm hover:bg-brand-gold-deep transition-colors w-full sm:w-auto"
            >
              View Projects
            </Link>
            <Link
              href="/process"
              className="inline-flex items-center justify-center rounded-full border border-neutral-300 px-5 py-2.5 text-sm font-semibold text-brand-ink hover:bg-neutral-50 transition-colors w-full sm:w-auto"
            >
              Our Process
            </Link>
          </div>

          {/* Pillars with soft rhythm bands */}
          <div className="mt-6 md:mt-8 space-y-4 md:space-y-6">
            {COPY.pillars.map((it) => (
              <section
                key={it.h}
                className="rounded-lg bg-neutral-50/60 px-4 py-4 ring-1 ring-neutral-200 md:bg-transparent md:ring-0"
              >
                <h3 className="text-base sm:text-lg md:text-xl font-semibold">
                  <span className="inline-block border-l-4 border-brand-gold pl-3">
                    {it.h}
                  </span>
                </h3>
                <p className="mt-2 text-neutral-700 text-sm sm:text-base">
                  {it.p}
                </p>
              </section>
            ))}
          </div>

          {/* Highlights: hidden on mobile, visible on md+ */}
          <ul className="hidden md:block mt-8 ml-5 list-disc space-y-2 marker:text-brand-gold text-neutral-900">
            {COPY.highlights.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
