"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Section from "@/components/Section";
import WorldMapStaticLabeled from "@/components/WorldMapStatic";

const bp = process.env.NEXT_PUBLIC_BASE_PATH || "";

/* ----------------------------- WorldMapStatic ----------------------------- */
type Pin = { name: string; left: number; top: number };

const PINS: Pin[] = [
  { name: "Hong Kong", left: 81.2, top: 36.7 },
  { name: "Macau", left: 81.54, top: 37.67 },
  { name: "Dubai (UAE)", left: 65.35, top: 36.0 },
  { name: "Japan", left: 87.5, top: 31.0 },
  { name: "Jeju Island", left: 84.3, top: 34.8 },
  { name: "Malta", left: 54.03, top: 30.06 },
  { name: "London", left: 49.96, top: 21.38 },
  { name: "Italy", left: 52.8, top: 28.6 },
  { name: "Las Vegas", left: 21.9, top: 34.5 },
  { name: "New York", left: 26.8, top: 29.7 },
  { name: "Miami", left: 27.72, top: 35.69 },
];

const CONNECTIONS: [string, string][] = [
  ["Hong Kong", "Macau"],
  ["Hong Kong", "Dubai (UAE)"],
  ["Hong Kong", "Japan"],
  ["Hong Kong", "Jeju Island"],
  ["Hong Kong", "Malta"],
  ["Malta", "London"],
  ["London", "Italy"],
  ["Las Vegas", "New York"],
  ["Las Vegas", "Miami"],
];

/* --------------------------------- Markets -------------------------------- */
type MarketKey =
  | "hotel"
  | "casino"
  | "cruise"
  | "aviation"
  | "yacht"
  | "retail";

const MARKET_CFG: Record<
  MarketKey,
  { title: string; desc?: string; img: string; ctaLabel?: string; ctaHref?: string }
> = {
  hotel: {
    title: "Hotels & Resorts",
    img: `${bp}/images/capability/hotel.avif`,
    ctaLabel: "View Projects",
    ctaHref: "/projects",
  },
  casino: {
    title: "Casinos & Gaming",
    img: `${bp}/images/capability/casino.avif`,
    ctaLabel: "View Projects",
    ctaHref: "/projects",
  },
  cruise: {
    title: "Cruise",
    img: `${bp}/images/capability/cruise.avif`,
        ctaLabel: "View Projects",
    ctaHref: "/projects",
  },
  aviation: {
    title: "Aviation",
    img: `${bp}/images/capability/aviation.avif`,
    ctaLabel: "View Projects",
    ctaHref: "/projects",
  },
  yacht: {
    title: "Yacht",
    img: `${bp}/images/capability/yacht.avif`,
    ctaLabel: "View Projects",
    ctaHref: "/projects",
  },
  retail: {
    title: "Retail",
    img: `${bp}/images/capability/retail.avif`,
    ctaLabel: "View Projects",
    ctaHref: "/projects",
  },
};

function Pill({
  active,
  children,
  onClick,
}: {
  active?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "px-3 py-1.5 rounded-full text-[13px] sm:text-sm border transition w-full sm:w-auto text-center",
        active
          ? "bg-black text-white border-black"
          : "bg-white text-gray-800 border-gray-300 hover:shadow-sm",
      ].join(" ")}
      aria-pressed={!!active}
    >
      {children}
    </button>
  );
}

export default function Markets() {
  const [active, setActive] = useState<MarketKey>("hotel");
  const cfg = MARKET_CFG[active];

  return (
    <Section className="bg-white !px-0" pad="sm" padTop={false}>
      <div className="grid grid-cols-1 md:grid-cols-2">
{/* LEFT column */}
<div className="h-auto md:min-h-[52vh] px-4 sm:px-6 md:px-12 py-6 md:py-12 flex flex-col md:justify-between">
  <header>
    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight flex items-center gap-3">
      <span className="inline-block h-[3px] w-8 bg-brand-gold rounded-full" />
      Our Capabilities & Services
    </h3>
  </header>

  {/* Map fills the middle gap on md+, stacks normally on mobile */}
  <div className="mt-6 md:mt-8 md:flex-1 md:basis-0 md:flex md:items-center">
    <div className="w-full md:max-w-[560px] mx-auto">
<WorldMapStaticLabeled showLabels labelUseCodes />
    </div>
  </div>

  {/* Bottom copy pinned to bottom on md+, natural on mobile */}
  <div className="space-y-3 md:space-y-4 mt-6">
    <p className="text-[15px] sm:text-base leading-relaxed text-neutral-700">
      From design collaboration to final installation, we craft bespoke flooring with precision and artistry.
    </p>
    <p className="text-[15px] sm:text-base leading-relaxed text-neutral-700">
      Rooted in Hong Kong and the U.S., supported by production expertise in China, TCC blends craftsmanship and innovation for the world’s most distinguished interiors.
    </p>
  </div>
</div>

        {/* RIGHT: market pills + panel */}
        <div className="px-4 sm:px-6 md:px-12 py-6 md:py-12">
          <h4 className="text-lg font-semibold flex items-center gap-3 mb-3">
            <span className="inline-block h-[3px] w-8 bg-brand-gold rounded-full" />
            Markets We Serve
          </h4>

          <div
            className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:gap-2"
            role="tablist"
            aria-label="Markets"
          >
            {(
              ["hotel", "casino", "cruise", "aviation", "yacht", "retail"] as MarketKey[]
            ).map((k) => (
              <Pill key={k} active={active === k} onClick={() => setActive(k)}>
                {MARKET_CFG[k].title.split(" & ")[0]}
              </Pill>
            ))}
          </div>

          <div
            className="mt-5 sm:mt-6 rounded-xl transition-all duration-300"
            role="tabpanel"
            aria-label={`${active} panel`}
          >
            <div className="rounded-lg overflow-hidden ring-1 ring-neutral-200">
              <Image
                src={cfg.img}
                alt={cfg.title}
                width={800}
                height={600}
                className="w-full h-auto object-cover aspect-[4/3]"
                unoptimized
              />
            </div>

            <div className="mt-3 sm:mt-4 text-center sm:text-left">
              <h5 className="text-base sm:text-lg font-semibold">{cfg.title}</h5>
              {cfg.desc && (
                <p className="mt-1 text-sm text-neutral-700">{cfg.desc}</p>
              )}

              {cfg.ctaLabel && cfg.ctaHref && (
                <div className="mt-3 sm:mt-4 flex justify-center sm:justify-start">
                  <Link
                    href={cfg.ctaHref}
                    className="inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold bg-brand-gold text-brand-ink hover:bg-brand-gold-deep transition-colors"
                  >
                    {cfg.ctaLabel}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
