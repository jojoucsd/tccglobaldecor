// components/capability/CapabilitySection.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Section from "@/components/Section";
import AlternatingCard from "@/components/AlternatingCard";

const bp = process.env.NEXT_PUBLIC_BASE_PATH || "";

// ---------------------------------------------
// Shared helpers / types
// ---------------------------------------------
function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

type MarketKey = "hotel" | "casino" | "cruise" | "aviation" | "yacht" | "retail";

type MarketItem = {
  title: string;
  description: string;
  media: React.ReactNode;
  featured?: string;
  note?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

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

// ---------------------------------------------
// Markets config
// ---------------------------------------------
const MARKET_CONFIG: Record<MarketKey, MarketItem> = {
  hotel: {
    title: "Hotels & Resorts",
    description: "Custom carpets that bring elegance and comfort to guest rooms, corridors, and lobbies.",
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
    ctaLabel: "View Hotel Case Study",
    ctaHref: "/projects/the-londoner-hotel",
  },
  casino: {
    title: "Casinos & Gaming",
    description: "Vibrant and durable flooring designed for dynamic gaming environments.",
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
    ctaLabel: "View Casino Case Study",
    ctaHref: "/projects/park-hyatt-niseko",
  },
  cruise: {
    title: "Cruise",
    description: "Marine-grade carpets combining beauty, safety, and performanc.",
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
    description: "Lightweight and refined designs crafted for private and business jets.",
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
    description: "Bespoke hand-tufted carpets that express luxury and craftsmanship onboard.",
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
    description: "Distinctive flooring solutions enhancing the identity of global destinations.",
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
};

// ---------------------------------------------
// Main section
// ---------------------------------------------
export default function CapabilitySection() {
  const [activeMarket, setActiveMarket] = useState<MarketKey>("hotel");

  return (
    <section id="capability" aria-label="Capabilities, Specialization, Techniques, Materials" className="text-brand-ink scroll-mt-24">
      {/* 0) Slide-16 style Craftsmanship hero (50/50, viewport image) */}
      <Section className="bg-white !px-0 text-brand-ink">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center">
          {/* LEFT: title (top) + space + paragraph (bottom) */}
          <div className="h-full min-h-[60vh] px-6 md:px-12 py-12 flex flex-col">
            <header className="pt-6">
              <p className="inline-flex items-center gap-2 text-[11px] tracking-[0.18em] uppercase text-neutral-500">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand-gold" />
                Craft
              </p>
              <h2 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight">Craftsmanship</h2>
              <div className="mt-3 h-[3px] w-20 rounded-full bg-brand-gold" />
            </header>
            <div className="flex-1" />
            <p className="pb-6 text-[15px] md:text-lg leading-7 text-neutral-800 max-w-md">
              At TCC, craftsmanship becomes a language each thread a verse woven into form. We merge time-honored artistry with modern precision, transforming wool, nylon, and viscose into surfaces that speak of movement, texture, and light. Every carpet carries the quiet rhythm of human touch and the harmony of technology, offering spaces not just design, but atmosphere a soft architecture underfoot where tradition and innovation meet.
            </p>
          </div>

          {/* RIGHT: image (smaller than viewport) */}
          <div className="relative mx-6 md:mx-12 my-8 md:my-12">
            <div className="relative h-[48vh] md:h-[64vh] lg:h-[68vh] max-h-[780px] w-full overflow-hidden rounded-2xl ring-1 ring-neutral-200">
              <Image
                src={`${bp}/images/capability/capability-01.avif`}
                alt="TCC craftsmanship in carpet design"
                fill
                className="object-cover"
                priority={false}
              />
            </div>
          </div>
        </div>
      </Section>
      
<Section className="bg-gray-50 text-brand-ink" id="specialization">
  <header className="mb-12">
    <h3 className="text-2xl md:text-3xl font-semibold flex justify-center items-center gap-3 text-center">
      <span className="inline-block h-[3px] w-8 bg-brand-gold rounded-full" />
      Specialization
    </h3>
    <p className="mt-3 text-sm md:text-base text-neutral-600 max-w-2xl mx-auto text-left md:text-center md:text-left:0">
      From hand-tufted masterpieces to Axminster innovations — our craftsmanship spans artistry,
      technology, and versatility.
    </p>
  </header>

  <ul
    className={[
      "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6",
      "[&_h3]:text-brand-gold [&_p]:text-sm [&_p]:leading-snug",
    ].join(" ")}
    aria-label="Specialization items"
    role="list"
  >
    {[
      {
        title: "Hand Tufted",
        subtitle:
          "Fully customizable in design, color, and texture. Each piece expresses individuality.",
        imageSrc: `${bp}/images/capability/hand-tufted.avif`,
        href: "/gallery/hand-tufted",
      },
      {
        title: "Axminster Tiles",
        subtitle:
          "Modular precision with Axminster face construction — refined look, practical format.",
        imageSrc: `${bp}/images/capability/ax-tile.avif`,
        href: "/gallery/axminster-tiles",
      },
      {
        title: "Axminster Carpets",
        subtitle:
          "Woven in 7-pitch with up to 16 colors — precision, durability, and design integrity.",
        imageSrc: `${bp}/images/capability/ax-roll.avif`,
        href: "/gallery/axminster-broadloom",
      },
      {
        title: "Hand Ax",
        subtitle:
          "Artisanal warmth meets Axminster structure — the harmony of handcraft and technology.",
        imageSrc: `${bp}/images/capability/hand-ax.avif`,
        href: "/gallery/hand-ax",
      },
      {
        title: "Printed Carpets",
        subtitle:
          "High-resolution digital print for creative freedom and seamless color gradients.",
        imageSrc: `${bp}/images/capability/digital-print-tech.avif`,
        href: "/gallery/printed",
      },
      {
        title: "Custom Rugs",
        subtitle:
          "Bespoke shapes, sculpting, and edges — design pieces tailored to each interior.",
        imageSrc: `${bp}/images/capability/silk.avif`,
        href: "/gallery/custom-rugs",
      },
    ].map((it, i) => (
      <AlternatingCard
        key={it.title}
        title={it.title}
        subtitle={it.subtitle}
        imageSrc={it.imageSrc}
        href={it.href}
        variant={i % 2 === 0 ? "imageTop" : "textTop"}
        className="transition-transform duration-300 hover:-translate-y-1"
      />
    ))}
  </ul>
</Section>


      {/* 4) Our Capabilities & Services + Markets (50/50 like Craftsmanship) */}
      <Section className="text-brand-ink !px-0">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* LEFT: title top, generous space, text bottom */}
          <div className="h-full min-h-[60vh] px-6 md:px-12 py-12 flex flex-col">
            <header className="pt-6">
              <h3 className="text-3xl md:text-4xl font-bold tracking-tight flex items-center gap-3">
                <span className="inline-block h-[3px] w-8 bg-brand-gold rounded-full" />
                Our Capabilities & Services
              </h3>
            </header>
            <div className="flex-1" />
            <div className="pb-6 space-y-5">
              <p className="text-sm md:text-base leading-relaxed text-neutral-700">
                TCC Carpets provides a full-spectrum service — from concept development and design
                collaboration to manufacturing and installation. With over 20 years of experience and
                advanced production facilities, we help designers and hospitality brands bring distinctive
                flooring visions to life.
              </p>
              <p className="text-sm md:text-base leading-relaxed text-neutral-700">
                With vertically integrated production facilities in Macau, Nanhai, Dongguan, and Xinling, TCC
                Carpets combines artisanal skill with state-of-the-art Axminster and hand-tufting technology.
                Our offices in Hong Kong and Macau ensure close communication with international clients and
                project teams.
              </p>
            </div>
          </div>

          {/* RIGHT: Markets pills + panel */}
          <div className="px-6 md:px-12 py-12">
            <h4 className="text-lg font-semibold flex items-center gap-3">
              <span className="inline-block h-[3px] w-8 bg-brand-gold rounded-full" />
              Markets We Serve
            </h4>

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

            <div className="mt-6 rounded-xl p-0 transition-all duration-300" role="tabpanel" aria-label={`${activeMarket} panel`}>
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
                    {cfg.ctaLabel && cfg.ctaHref ? (
                      <div className="mt-4">
                        <Link
                          href={cfg.ctaHref}
                          className="inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold bg-brand-gold text-brand-ink hover:bg-brand-gold-deep transition-colors"
                        >
                          {cfg.ctaLabel}
                        </Link>
                      </div>
                    ) : null}
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
