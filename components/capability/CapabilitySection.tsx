// components/capability/CapabilitySection.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Section from "@/components/Section";
import AlternatingCard from "@/components/AlternatingCard";

const items = [
  {
    title: "Hand Tufted Carpets",
    subtitle: "Fully customizable — relief, sculpt, and detail.",
    imageSrc: "/images/specializations/hand-tufted.avif",
  },
  {
    title: "Axminster Carpet Tiles",
    subtitle: "Modular practicality with a woven Axminster face.",
    imageSrc: "/images/specializations/axminster-tiles.avif",
  },
  {
    title: "Axminster Carpets",
    subtitle: "Durable, precise weaving with rich color clarity.",
    imageSrc: "/images/specializations/axminster-roll.avif",
  },
  {
    title: "Hand Ax Production",
    subtitle: "Artisanal technique blended with Axminster structure.",
    imageSrc: "/images/specializations/hand-ax.avif",
  },
];
// tiny helpers
function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function Card({
  title,
  description,
  href = "#",
  media = <div className="aspect-[4/3] rounded-xl bg-gray-200 mb-4" aria-hidden="true" />,
  className = "",
}: {
  title: string;
  description?: string;
  href?: string;
  media?: React.ReactNode;
  className?: string;
}) {
  const content = (
    <article
      className={`rounded-2xl border border-gray-200 p-6 hover:shadow-sm transition focus:outline-none focus:ring-2 focus:ring-black ${className}`}
      role="listitem"
    >
      {media}
      <h4 className="font-medium">{title}</h4>
      {description ? <p className="mt-2 text-sm text-gray-600 hidden md:block">{description}</p> : null}
    </article>
  );
  return (
    <Link href={href} className="block focus:outline-none focus:ring-0">
      {content}
    </Link>
  );
}

function MarketPill({
  active,
  disabled,
  onClick,
  children,
}: {
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={!disabled ? onClick : undefined}
      className={[
        "px-3 py-1.5 rounded-full text-sm border transition",
        active ? "bg-black text-white border-black" : "bg-white text-gray-800 border-gray-300",
        disabled ? "opacity-50 cursor-not-allowed" : "hover:shadow-sm",
      ].join(" ")}
      aria-pressed={!!active}
      aria-disabled={!!disabled}
    >
      {children}
    </button>
  );
}

// main section (this is the scroll target for the hero “Our Process” button)
export default function CapabilitySection() {
  const [activeMarket, setActiveMarket] = useState<
    "hotel" | "casino" | "cruise" | "aviation" | "yacht" | "retail"
  >("hotel");

  return (
    <section id="capability" aria-label="Capabilities, Specialization, Techniques, Materials">
      {/* 1) Specialization (what we make) */}

<Section className="bg-gray-50">
  {/* widen just this section */}
  <div
    className="mx-auto max-w-[1600px] px-4 md:px-6 lg:px-8 py-16"
    style={{ scrollMarginTop: "calc(var(--header-h))" }}
  >
    <header className="max-w-3xl">
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Specialization</h2>
      <p className="mt-4 text-gray-600 leading-7">
        Craftsmanship meets technology. We focus on hospitality-grade carpets built for beauty and performance.
      </p>
    </header>

    <div className="mt-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
      {/* Text first */}
      <div className="md:col-span-5">
        <p className="mt-4 text-gray-700 leading-7">
          At TCC, technique and touch speak in unison. We merge time-honored artistry with modern precision,
          shaping wool, nylon, and viscose into surfaces that carry movement, texture, and light. Each piece
          balances human skill and engineered control — creating not just decoration, but atmosphere underfoot.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="#"
            className="inline-flex items-center rounded-full px-4 py-2 text-sm font-medium bg-black text-white"
          >
            View Projects
          </Link>
          <Link
            href="#"
            className="inline-flex items-center rounded-full px-4 py-2 text-sm font-medium border border-gray-300"
          >
            Explore Materials
          </Link>
        </div>
      </div>

      {/* Image second */}
      <div className="md:col-span-7">
        <Image
          src="/images/capability/capability-01.avif"
          alt="TCC craftsmanship in carpet design"
          width={1600}
          height={1066}
          className="w-full h-auto rounded-2xl object-cover md:h-[480px]"
          priority={false}
        />
      </div>
    </div>

<ul
  className="mt-10 grid grid-cols-1 md:grid-cols-4 gap-6"
  aria-label="Specialization items"
>
  {[
    {
      title: "Hand Tufted Carpets",
      copy: "Fully customizable — relief, sculpt, and detail.",
      imageSrc: "/images/capability/hand-tufted.avif",
    },
    {
      title: "Axminster Carpet Tiles",
      copy: "Modular practicality with a woven Axminster face.",
      imageSrc: "/images/capability/ax-tile.avif",
    },
    {
      title: "Axminster Carpets",
      copy: "Durable, precise weaving with rich color clarity.",
      imageSrc: "/images/capability/ax-roll.avif",
    },
    {
      title: "Hand Ax Production",
      copy: "Artisanal technique blended with Axminster structure.",
      imageSrc: "/images/capability/hand-ax.avif",
    },
  ].map((it, i) => (
    <AlternatingCard
      key={it.title}
      title={it.title}
      subtitle={it.copy}
      imageSrc={it.imageSrc}
      href="#"
      variant={i % 2 === 0 ? "imageTop" : "textTop"}
    />
  ))}
</ul>
  </div>
</Section>

<Section>
  <div className="flex items-center justify-between">
    <h3 className="text-2xl md:text-3xl font-semibold">Techniques</h3>
    <Link href="#" className="text-sm font-medium underline underline-offset-4" aria-label="See our custom design process">
      See our process
    </Link>
  </div>

  <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" role="list" aria-label="Techniques">
    {[
      {
        title: "Hand Tufted",
        subtitle: "Refined textures and sculpted relief",
        imageSrc: "/images/capability/hand-tufted-tech.avif",
      },
      {
        title: "Hand Woven",
        subtitle: "Tactile depth and quiet irregularity",
        imageSrc: "/images/capability/hand-woven-tech.avif",
      },
      {
        title: "Machine Woven",
        subtitle: "Precision, durability, color clarity",
        imageSrc: "/images/capability/machine-woven-tech.avif",
      },
      {
        title: "Digital Printing",
        subtitle: "Complex gradients with lasting vibrancy",
        imageSrc: "/images/capability/digital-print-tech.avif",
      },
    ].map((item, i) => (
      <AlternatingCard
        key={item.title}
        title={item.title}
        subtitle={item.subtitle}
        imageSrc={item.imageSrc}
        href="#"
        flip={i % 2 === 0} // <- even items show text on top
      />
    ))}
  </ul>

  {/* optional discoverability banner */}
  <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-5">
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <p className="text-sm text-gray-700">
        Curious how we go from technique to delivery? Explore our{" "}
        <Link href="#" className="underline underline-offset-4">Custom Design Process</Link>.
      </p>
      <Link href="#" className="inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold bg-black text-white">
        View Process
      </Link>
    </div>
  </div>
</Section>

{/* 3) Materials (what we use) */}
<Section className="bg-gray-50">
  <div className="flex items-center justify-between">
    <h3 className="text-2xl md:text-3xl font-semibold">Materials</h3>
    <Link href="#" className="text-sm font-medium underline underline-offset-4">
      See all
    </Link>
  </div>

  <ul
    className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
    role="list"
    aria-label="Materials"
  >
    {[
      {
        title: "Wool",
        subtitle: "Soft, resilient, timeless warmth",
        imageSrc: "/images/capability/wool.avif",
      },
      {
        title: "Viscose (Rayon)",
        subtitle: "Silky sheen and subtle elegance",
        imageSrc: "/images/capability/viscose.avif",
      },
      {
        title: "Silk",
        subtitle: "Lustrous refinement for elevated spaces",
        imageSrc: "/images/capability/silk.avif", // ← your silk.avif
      },
      {
        title: "Blend",
        subtitle: "Balanced performance and luxury",
        imageSrc: "/images/capability/blend.avif",
      },
    ].map((item, i) => (
      <AlternatingCard
        key={item.title}
        title={item.title}
        subtitle={item.subtitle}
        imageSrc={item.imageSrc}
        href="#"
        flip={i % 2 === 1} 
      />
    ))}
  </ul>
</Section>


      {/* 4) Our Capabilities & Services (after craft & materials) */}
      <Section>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <h3 className="text-2xl md:text-3xl font-semibold">Our Capabilities & Services</h3>
            <p className="mt-4 text-gray-700">
              Concept development, design collaboration, CAD + sampling, production, logistics, and site coordination —
              an end-to-end service model for hospitality projects.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-gray-700">
              <li>• Axminster, Hand-Tufted, and Printed Carpets</li>
              <li>• In-house dyeing and color matching</li>
              <li>• Global logistics & on-site coordination</li>
            </ul>
          </div>

          {/* 5) Markets We Serve (Hotel preselected) */}
          <div className="md:col-span-7">
            <h4 className="text-lg font-semibold">Markets We Serve</h4>

            {/* pills */}
            <div className="mt-4 flex flex-wrap gap-2" role="tablist" aria-label="Markets">
              {[
                { key: "hotel", label: "Hotel", clickable: true },
                { key: "casino", label: "Casino", clickable: true },
                { key: "cruise", label: "Cruise", clickable: false },
                { key: "aviation", label: "Aviation", clickable: false },
                { key: "yacht", label: "Yacht", clickable: false },
                { key: "retail", label: "Retail", clickable: false },
              ].map((m) => (
                <MarketPill
                  key={m.key as string}
                  active={activeMarket === (m.key as any)}
                  disabled={!m.clickable}
                  onClick={() => setActiveMarket(m.key as any)}
                >
                  {m.label}
                </MarketPill>
              ))}
            </div>

            {/* panel */}
            <div className="mt-6 rounded-xl border border-gray-200 p-4" role="tabpanel" aria-label={`${activeMarket} panel`}>
              {activeMarket === "hotel" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Card
                    title="Hotels & Resorts"
                    description="Guestrooms, suites, corridors, ballrooms."
                    href="#"
                    media={<div className="aspect-[4/3] rounded-md bg-gray-200 mb-3" aria-hidden="true" />}
                    className="p-4"
                  />
                  <Card
                    title="Featured: The Londoner"
                    description="British heritage reimagined in Macau."
                    href="#"
                    media={<div className="aspect-[4/3] rounded-md bg-gray-200 mb-3" aria-hidden="true" />}
                    className="p-4"
                  />
                </div>
              )}

              {activeMarket === "casino" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Card
                    title="Casinos & Gaming"
                    description="Durable Axminster, vibrant custom patterns."
                    href="#"
                    media={<div className="aspect-[4/3] rounded-md bg-gray-200 mb-3" aria-hidden="true" />}
                    className="p-4"
                  />
                  <Card
                    title="Featured: Cotai Strip"
                    description="High-traffic precision and clarity."
                    href="#"
                    media={<div className="aspect-[4/3] rounded-md bg-gray-200 mb-3" aria-hidden="true" />}
                    className="p-4"
                  />
                </div>
              )}

              {["cruise", "aviation", "yacht", "retail"].includes(activeMarket) && (
                <div className="text-sm text-gray-600">
                  Details coming soon. In the meantime, <Link href="#" className="underline">contact us</Link> for specs.
                </div>
              )}

              <div className="mt-6">
                {activeMarket === "hotel" && (
                  <Link href="#" className="inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold bg-black text-white">
                    View Hotel Case Studies
                  </Link>
                )}
                {activeMarket === "casino" && (
                  <Link href="#" className="inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold bg-black text-white">
                    View Casino Case Studies
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* 6) Final CTA */}
      <Section>
        <div className="mt-2">
          <Link
            href="#"
            className="inline-flex items-center rounded-full px-5 py-2.5 text-sm font-semibold bg-amber-500 text-black shadow"
          >
            Start a Project
          </Link>
        </div>
      </Section>
    </section>
  );
}
