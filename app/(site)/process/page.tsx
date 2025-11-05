// app/(site)/process/page.tsx
import Image from "next/image";
import Link from "next/link";
import Section from "@/components/Section";

export const dynamic = "force-static";
const bp = process.env.NEXT_PUBLIC_BASE_PATH || "";

/* =========================================================================
   DATA
   ========================================================================= */

type Step = {
  id: number;
  label: string;
  title: string;
  body: string;
  image: string;
};

const STEPS: Step[] = [
  {
    id: 1,
    label: "Step 1",
    title: "Design Elements from Client",
    body: "",
    image: `${bp}/images/process/1.avif`,
  },
  {
    id: 2,
    label: "Step 2",
    title: "Pattern Development",
    body: "",
    image: `${bp}/images/process/2.avif`,
  },
  {
    id: 3,
    label: "Step 3",
    title: "Pattern Development with Options",
    body: "",
    image: `${bp}/images/process/3.avif`,
  },
  {
    id: 4,
    label: "Step 4",
    title: "Strike-offs",
    body: "",
    image: `${bp}/images/process/4.avif`,
  },
  {
    id: 5,
    label: "Step 5",
    title: "Flooded in Floor Plan",
    body: "",
    image: `${bp}/images/process/6.avif`,
  },
  {
    id: 6,
    label: "",
    title: "Autograph Suite",
    body: "",
    image: `${bp}/images/process/7.avif`,
  },
  {
    id: 7,
    label: "",
    title: "Kameo Suite",
    body: "",
    image: `${bp}/images/process/8.avif`,
  },
  {
    id: 8,
    label: "",
    title: "Ikonik Suite",
    body: "",
    image: `${bp}/images/process/9.avif`,
  },
];

/* =========================================================================
   COMPONENTS
   ========================================================================= */

function TimelineStep({ step, index }: { step: Step; index: number }) {
  const isLeft = index % 2 === 0;

  // Every step after the first overlaps upward (tight vertical flow)
  const overlapClass =
    index === 0 ? "" : "-mt-20 sm:-mt-24 md:-mt-32 lg:-mt-36";

  const card = (
    <div
      className={`bg-white border border-neutral-200 rounded-2xl shadow-sm p-4 sm:p-5 flex flex-col ${
        isLeft ? "items-end text-right" : "items-start text-left"
      }`}
    >
      {step.label && (
        <p className="text-[10px] sm:text-xs font-semibold tracking-[0.18em] uppercase text-brand-gold">
          {step.label}
        </p>
      )}
      <h3
        className={`text-sm sm:text-base md:text-lg font-semibold text-brand-ink ${
          step.label ? "mt-1" : ""
        }`}
      >
        {step.title}
      </h3>
      {step.body && (
        <p className="mt-2 text-xs sm:text-sm md:text-base text-neutral-800">
          {step.body}
        </p>
      )}
    </div>
  );

  const image = (
    <div className="relative mt-2 sm:mt-3 aspect-[3/2] overflow-hidden rounded-2xl bg-neutral-100">
      <Image
        src={step.image}
        alt={step.title}
        fill
        className="object-cover"
        unoptimized
      />
    </div>
  );

  const Inner = (
    <div className="w-full max-w-sm sm:max-w-md md:max-w-lg">
      {card}
      {image}
    </div>
  );

  return (
    <li
      className={`relative grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 lg:gap-8 ${overlapClass}`}
    >
      {isLeft ? (
        <>
          {/* LEFT: content floats toward the center line (right side of column) */}
          <div className="pr-2 sm:pr-4 md:pr-8 lg:pr-12 flex justify-end">
            {Inner}
          </div>
          <div />
        </>
      ) : (
        <>
          <div />
          {/* RIGHT: content floats toward the center line (left side of column) */}
          <div className="pl-2 sm:pl-4 md:pl-8 lg:pl-12 flex justify-start">
            {Inner}
          </div>
        </>
      )}
    </li>
  );
}

function ProcessTimeline() {
  return (
    <Section className="pb-16">
      <div className="relative mx-auto max-w-6xl">
        {/* Triple parallel wavy spines – visible on all breakpoints */}
        <svg
          className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-full w-20 sm:w-32 md:w-40 lg:w-48"
          viewBox="0 0 190 800"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {/* Gold (center) */}
          <path
            d="M95 0
               C 45 80, 145 160, 95 240
               S 145 400, 95 480
               S 45 640, 95 800"
            fill="none"
            stroke="#EE9629"
            strokeWidth="5"
            strokeLinecap="round"
          />
          {/* Black (left) */}
          <path
            d="M80 0
               C 30 80, 130 160, 80 240
               S 130 400, 80 480
               S 30 640, 80 800"
            fill="none"
            stroke="#161616"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.9"
          />
          {/* Grey (right) */}
          <path
            d="M110 0
               C 60 80, 160 160, 110 240
               S 160 400, 110 480
               S 60 640, 110 800"
            fill="none"
            stroke="#A0A0A0"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.7"
          />
        </svg>

        <ol className="relative space-y-10 md:space-y-16">
          {STEPS.map((step, i) => (
            <TimelineStep key={step.id} step={step} index={i} />
          ))}
        </ol>
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
      <Section className="pt-20 pb-8 text-center">
        <p className="text-sm uppercase tracking-widest text-brand-gold">Process</p>
        <h1 className="mt-2 text-3xl md:text-4xl font-bold text-brand-ink">
          From intent to installation
        </h1>
        <p className="mt-3 max-w-3xl mx-auto text-neutral-800">
          From the first sketch to final installation, our process is designed to
          support designers, owners, and contractors with clear communication,
          fast sampling, and reliable delivery.
        </p>
      </Section>

      {/* Vertical timeline */}
      <ProcessTimeline />

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
