// app/(site)/process/page.tsx
import Image from "next/image";
import Link from "next/link";
import Section from "@/components/Section";

export const dynamic = "force-static";
const bp = process.env.NEXT_PUBLIC_BASE_PATH || "";

/* =========================================================================
   HELPERS
   ========================================================================= */
function pickUnique(from: number[], count: number): number[] {
  const arr = [...from];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor((Math.random?.() ?? 0.5) * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.slice(0, count);
}

/* =========================================================================
   DATA
   ========================================================================= */
const A_LEFT = {
  title: "Design Intent → Visual Narrative",
  subtitle:
    "We exist to design and craft beautiful carpets with professionalism and care. Quality, efficiency, and flexibility are the keys to a sustainable future",
  image: `${bp}/images/process/process2.avif`,
};

const A_RIGHT = {
  title: "Material Study → Production Ready",
  subtitle:
    "At TCCarpets, we’re dedicated to transforming your ideas into the perfect custom carpet for your project. ",
  image: `${bp}/images/process/process1.avif`,
};

const B_LEFT = {
  title: "Custom Design Process",
  body:
    "Our collaborative approach ensures every carpet reflects your design intent precisely and beautifully. Behind each project stands an experienced production team that combines craftsmanship with efficiency. Samples are produced within one week, and finished goods are delivered to clients in as little as two weeks, demonstrating TCC’s commitment to quality, speed, and reliability in every detail.",
};

// 🎲 Random unique picks from process3–process7
const randomIds = pickUnique([3, 4, 5, 6, 7], 3);

const B_ROWS = [
  {
    title: "Step 1: Concept & Design Brief",
    copy:
      "We begin by understanding your vision — through sketches, renderings, or material boards. Our design team then translates it into detailed CAD layouts and pattern concepts.",
    image: `${bp}/images/process/process${randomIds[0]}.avif`,
  },
  {
    title: "Step 2: Sampling & Refinement",
    copy:
      "A custom sample is produced to confirm col- or, texture, and construction. Adjustments are made until the design perfectly matches your expectations.",
    image: `${bp}/images/process/process${randomIds[1]}.avif`,
  },
  {
    title: "Step 3: Weaving, Delivery & In- stallation",
    copy:
      "Once approved, production begins in our ded- icated factories. Each piece is inspected and packed for seamless delivery, with optional site coordination support.",
    image: `${bp}/images/process/process${randomIds[2]}.avif`,
  },
];

/* =========================================================================
   COMPONENTS
   ========================================================================= */
function TitleBlock({
  kicker,
  title,
  subtitle,
  align = "left",
}: {
  kicker?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "right";
}) {
  return (
    <header className={align === "right" ? "text-right" : ""}>
      {kicker && (
        <p className="text-xs uppercase tracking-widest text-brand-gold">{kicker}</p>
      )}
      <h2 className="mt-1 text-2xl md:text-3xl font-semibold text-brand-ink">{title}</h2>
      {subtitle && (
        <p className="mt-3 text-sm md:text-base text-neutral-800">{subtitle}</p>
      )}
    </header>
  );
}

/* ---------- Section A ---------- */
function Split5050() {
  return (
    <Section className="py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        <div>
          <TitleBlock title={A_LEFT.title} subtitle={A_LEFT.subtitle} />
          <div className="mt-6 relative w-full aspect-[4/3] overflow-hidden rounded-2xl bg-neutral-100">
            <Image
              src={A_LEFT.image}
              alt={A_LEFT.title}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        </div>
        <div className="flex flex-col">
          <div className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl bg-neutral-100">
            <Image
              src={A_RIGHT.image}
              alt={A_RIGHT.title}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
          <div className="mt-6">
            <TitleBlock title={A_RIGHT.title} subtitle={A_RIGHT.subtitle} align="right" />
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ---------- Row ---------- */
function RailRow({
  title,
  copy,
  image,
  imageLeft = true,
}: {
  title: string;
  copy: string;
  image: string;
  imageLeft?: boolean;
}) {
  const Text = (
    <div>
      <h4 className="text-base md:text-lg font-semibold text-brand-gold">{title}</h4>
      <p className="mt-2 text-sm md:text-base text-brand-ink">{copy}</p>
    </div>
  );

  const Img = (
    <div className="relative aspect-[3/2] overflow-hidden rounded-xl bg-neutral-100">
      <Image src={image} alt={title} fill className="object-cover" unoptimized />
    </div>
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
      {imageLeft ? (
        <>
          {Img}
          {Text}
        </>
      ) : (
        <>
          {Text}
          {Img}
        </>
      )}
    </div>
  );
}

/* ---------- Section B ---------- */
function Split3070Rail() {
  return (
    <Section className="pt-10 pb-20">
      <div className="h-[2px] w-full bg-brand-gold/60 rounded-full mb-8" />
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-10">
        <div className="lg:col-span-3 flex items-center">
          <div>
            <p className="text-xs uppercase tracking-widest text-brand-gold">Process</p>
            <h3 className="mt-1 text-2xl md:text-3xl font-semibold text-brand-ink">
              {B_LEFT.title}
            </h3>
            <p className="mt-3 text-sm md:text-base text-brand-ink">{B_LEFT.body}</p>
          </div>
        </div>
        <div className="lg:col-span-7 space-y-12">
          {B_ROWS.map((r, i) => (
            <RailRow
              key={r.title}
              title={r.title}
              copy={r.copy}
              image={r.image}
              imageLeft={i % 2 === 0}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}

/* =========================================================================
   PAGE
   ========================================================================= */
export default function ProcessPage() {
  return (
    <main className="min-h-screen bg-white text-brand-ink">
      {/* Intro */}
      <Section className="pt-20 pb-6">
        <p className="text-sm uppercase tracking-widest text-brand-gold">Process</p>
        <h1 className="mt-2 text-3xl md:text-4xl font-bold text-brand-ink">
          From intent to installation
        </h1>
        <p className="mt-3 max-w-3xl text-neutral-800">
          Over 20 years of experience in the carpet manufacturing industry with our own production factories. Our primary activities include the production and sale of Hand-Tufted and Axminster carpets for both contract and domestic markets.
        </p>
      </Section>

      {/* Slide 24 */}
      <Split5050 />

      {/* Slide 26 */}
      <Split3070Rail />

      {/* CTA */}
      <Section className="pb-24">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-sm md:text-base text-neutral-800">
            Ready to translate your concept into a finished surface?
          </p>
          <div className="flex gap-3">
            <Link
              href="/projects"
              className="inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold bg-brand-gold text-brand-ink hover:bg-brand-gold-deep transition-colors"
            >
              See Projects
            </Link>
            <Link
              href="/connect"
              className="inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold border border-brand-gold text-brand-ink hover:bg-brand-gold/10 transition-colors"
            >
              Start a Project
            </Link>
          </div>
        </div>
      </Section>
    </main>
  );
}
