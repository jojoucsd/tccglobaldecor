// components/capability/CapabilitySection.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Section from "@/components/Section";
import AlternatingCard from "@/components/AlternatingCard";
import Card from "@/components/Card"; // ✅ use your shared Card

const bp = process.env.NEXT_PUBLIC_BASE_PATH || "";

// Small helper
function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
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
        active
          ? "bg-black text-white border-black"
          : "bg-white text-gray-800 border-gray-300",
        disabled ? "opacity-50 cursor-not-allowed" : "hover:shadow-sm",
      ].join(" ")}
      aria-pressed={!!active}
      aria-disabled={!!disabled}
    >
      {children}
    </button>
  );
}

const MARKET_CONFIG = {
  hotel: {
    title: "Hotels & Resorts",
    description: "Guestrooms, suites, corridors, ballrooms.",
    featured: "Featured: The Londoner",
    note: "British heritage reimagined in Macau.",
    media: (
      <Image
        src={`${bp}/images/capability/hotel.avif`}
        alt="Hotels & Resorts"
        width={800}
        height={600}
        className="aspect-[4/3] rounded-md object-cover mb-3"
        unoptimized
      />
    ),
    ctaLabel: "View Hotel Case Studies",
    ctaHref: "#",
  },
  casino: {
    title: "Casinos & Gaming",
    description: "Durable Axminster, vibrant custom patterns.",
    featured: "Featured: Cotai Strip",
    note: "High-traffic precision and clarity.",
    media: (
      <Image
        src={`${bp}/images/capability/casino.avif`}
        alt="Casinos & Gaming"
        width={800}
        height={600}
        className="aspect-[4/3] rounded-md object-cover mb-3"
        unoptimized
      />
    ),
    ctaLabel: "View Casino Case Studies",
    ctaHref: "#",
  },
  cruise: {
    title: "Cruise",
    description: "Marine-rated performance with crafted comfort.",
    media: (
      <Image
        src={`${bp}/images/capability/cruise.avif`}
        alt="Cruise"
        width={800}
        height={600}
        className="aspect-[4/3] rounded-md object-cover mb-3"
        unoptimized
      />
    ),
  },
  aviation: {
    title: "Aviation",
    description: "Lightweight, precise fit, and premium feel.",
    media: (
      <Image
        src={`${bp}/images/capability/aviation.avif`}
        alt="Aviation"
        width={800}
        height={600}
        className="aspect-[4/3] rounded-md object-cover mb-3"
        unoptimized
      />
    ),
  },
  yacht: {
    title: "Yacht",
    description: "Seaborne luxury with custom detailing.",
    media: (
      <Image
        src={`${bp}/images/capability/yacht.avif`}
        alt="Yacht"
        width={800}
        height={600}
        className="aspect-[4/3] rounded-md object-cover mb-3"
        unoptimized
      />
    ),
  },
  retail: {
    title: "Retail",
    description: "Brand-forward patterns built for footfall.",
    media: (
      <Image
        src={`${bp}/images/capability/retail.avif`}
        alt="Retail"
        width={800}
        height={600}
        className="aspect-[4/3] rounded-md object-cover mb-3"
        unoptimized
      />
    ),
  },
} as const;

type MarketKey = keyof typeof MARKET_CONFIG;

export default function CapabilitySection() {
  const [activeMarket, setActiveMarket] = useState<MarketKey>("hotel");

  return (
    <section id="capability" aria-label="Capabilities, Specialization, Techniques, Materials">
      {/* === 1) Specialization === */}
      <Section className="bg-gray-50">
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
                src={`${bp}/images/capability/capability-01.avif`}
                alt="TCC craftsmanship in carpet design"
                width={1600}
                height={1066}
                className="w-full h-auto rounded-2xl object-cover md:h-[480px]"
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
                imageSrc: `${bp}/images/capability/hand-tufted.avif`,
              },
              {
                title: "Axminster Carpet Tiles",
                copy: "Modular practicality with a woven Axminster face.",
                imageSrc: `${bp}/images/capability/ax-tile.avif`,
              },
              {
                title: "Axminster Carpets",
                copy: "Durable, precise weaving with rich color clarity.",
                imageSrc: `${bp}/images/capability/ax-roll.avif`,
              },
              {
                title: "Hand Ax Production",
                copy: "Artisanal technique blended with Axminster structure.",
                imageSrc: `${bp}/images/capability/hand-ax.avif`,
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

      {/* === 2) Markets We Serve === */}
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

          <div className="md:col-span-7">
            <h4 className="text-lg font-semibold">Markets We Serve</h4>

            {/* Pills */}
            <div className="mt-4 flex flex-wrap gap-2" role="tablist" aria-label="Markets">
              {(
                [
                  { key: "hotel", label: "Hotel" },
                  { key: "casino", label: "Casino" },
                  { key: "cruise", label: "Cruise" },
                  { key: "aviation", label: "Aviation" },
                  { key: "yacht", label: "Yacht" },
                  { key: "retail", label: "Retail" },
                ] as { key: MarketKey; label: string }[]
              ).map((m) => (
                <MarketPill
                  key={m.key}
                  active={activeMarket === m.key}
                  onClick={() => setActiveMarket(m.key)}
                >
                  {m.label}
                </MarketPill>
              ))}
            </div>

            {/* Panel */}
            <div
              className="mt-6 rounded-xl p-4 transition-all duration-300"
              role="tabpanel"
              aria-label={`${activeMarket} panel`}
            >
              {(() => {
                const cfg = MARKET_CONFIG[activeMarket];
                return (
                  <>
                    <Card
                      title={cfg.title}
                      description={cfg.note ?? cfg.description}
                      href={cfg.ctaHref ?? "#"}
                      media={cfg.media}
                      className="p-0 border-none shadow-none bg-transparent"
                    />
                    {cfg.ctaLabel && cfg.ctaHref && (
                      <div className="mt-6">
                        <Link
                          href={cfg.ctaHref}
                          className="inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold bg-black text-white"
                        >
                          {cfg.ctaLabel}
                        </Link>
                      </div>
                    )}
                  </>
                );
              })()}
            </div>
          </div>
        </div>
      </Section>
    </section>
  );
}
