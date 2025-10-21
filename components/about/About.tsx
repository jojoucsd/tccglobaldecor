// About.tsx
import Image from "next/image";
import Link from "next/link";
import Section from "@/components/Section";

const bp = process.env.NEXT_PUBLIC_BASE_PATH || "";

const HERO = {
  title: "About TCC Carpets — Art You Can Walk On",
  image: `${bp}/images/about/artineveryfootstep.avif`,
  alt: "Hospitality lounge featuring custom carpet by TCC",
};

const COPY = {
  intro:
    "Professional carpet manufacturing focused on quality, efficiency, and flexible design—with human-centered service—delivered to international standards.",
  pillars: [
    { h: "Talent and Service", p: "Carpets are our product, but people and service are our core materials." },
    { h: "Communicate", p: "Clear communication turns your ideas into buildable designs and finished carpets." },
    { h: "Commitment", p: "It’s not only about making carpets right—it’s about doing what’s right." },
  ],
  highlights: [
    "20+ years in carpet manufacturing with owned factories",
    "Quality tufted and woven carpets and rugs",
    "Custom projects: hospitality, casinos, cruise liners, residences, private jets, yachts",
    "Approximately 550 employees",
  ],
};

export default function About() {
  return (
    <Section id="about" style={{ scrollMarginTop: "calc(var(--header-h))" }} className ="scroll-mt-24">
      {/* Centered heading with brand accents */}
      <header className="text-center text-brand-ink">
        <p className="inline-flex items-center gap-2 text-[11px] tracking-[0.18em] uppercase text-neutral-500">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand-gold" />
          Our Story
        </p>
        <h1 className="mt-2 text-3xl md:text-4xl font-extrabold tracking-tight">
          {HERO.title}
        </h1>
        <div className="mx-auto mt-3 h-[3px] w-24 rounded-full bg-brand-gold" />
      </header>

      {/* 45/55 split */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-[45%_55%] gap-10 items-start text-brand-ink">
        {/* Left: image */}
        <div className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl bg-neutral-100 ring-1 ring-neutral-200">
          <Image
            src={HERO.image}
            alt={HERO.alt}
            fill
            className="object-cover"
            unoptimized
            priority
          />
        </div>

        {/* Right: copy */}
        <div>
          <p className="text-[15px] md:text-lg leading-relaxed text-neutral-800">
            {COPY.intro}
          </p>

          <div className="mt-8 space-y-6">
            {COPY.pillars.map((it) => (
              <section key={it.h}>
                <h3 className="text-lg md:text-xl font-semibold">
                  <span className="inline-block border-l-4 border-brand-gold pl-3">
                    {it.h}
                  </span>
                </h3>
                <p className="mt-2 text-neutral-700">{it.p}</p>
              </section>
            ))}
          </div>

          <ul className="mt-8 ml-5 list-disc space-y-2 marker:text-brand-gold text-neutral-900">
            {COPY.highlights.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>

          {/* CTA buttons */}
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/projects"
              className="inline-flex items-center rounded-full bg-brand-gold text-brand-ink px-5 py-2.5 text-sm font-semibold shadow-sm hover:bg-brand-gold-deep transition-colors"
            >
              View Projects
            </Link>
            <Link
              href="/process"
              className="inline-flex items-center rounded-full border border-neutral-300 px-5 py-2.5 text-sm font-semibold text-brand-ink hover:bg-neutral-50 transition-colors"
            >
              Our Process
            </Link>
          </div>
        </div>
      </div>
    </Section>
  );
}
