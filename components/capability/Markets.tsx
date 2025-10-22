"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Section from "@/components/Section";

const bp = process.env.NEXT_PUBLIC_BASE_PATH || "";

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
    desc: "Guestrooms, corridors, and lobbies.",
    img: `${bp}/images/capability/hotel.avif`,
    ctaLabel: "View Hotel Case Study",
    ctaHref: "/projects/the-londoner-hotel",
  },
  casino: {
    title: "Casinos & Gaming",
    desc: "Vibrant, durable gaming floors.",
    img: `${bp}/images/capability/casino.avif`,
    ctaLabel: "View Casino Case Study",
    ctaHref: "/projects/park-hyatt-niseko",
  },
  cruise: {
    title: "Cruise",
    desc: "Marine-grade beauty & performance.",
    img: `${bp}/images/capability/cruise.avif`,
  },
  aviation: {
    title: "Aviation",
    desc: "Lightweight, refined for private jets.",
    img: `${bp}/images/capability/aviation.avif`,
  },
  yacht: {
    title: "Yacht",
    desc: "Bespoke hand-tufted luxury at sea.",
    img: `${bp}/images/capability/yacht.avif`,
  },
  retail: {
    title: "Retail",
    desc: "Floors that elevate brand identity.",
    img: `${bp}/images/capability/retail.avif`,
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
        {/* LEFT: copy */}
        <div className="h-auto md:min-h-[52vh] px-4 sm:px-6 md:px-12 py-6 md:py-12 flex flex-col">
          <header>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight flex items-center gap-3">
              <span className="inline-block h-[3px] w-8 bg-brand-gold rounded-full" />
              Our Capabilities & Services
            </h3>
          </header>

          <div className="hidden md:block flex-1" />

          <div className="space-y-3 md:space-y-4 mt-3 md:mt-0">
            <p className="text-[15px] sm:text-base leading-relaxed text-neutral-700">
              From concept and design collaboration to manufacturing and
              installation, we help hospitality brands bring distinctive
              flooring visions to life.
            </p>
            <p className="text-[15px] sm:text-base leading-relaxed text-neutral-700">
              Vertically integrated production across Macau and Mainland China
              combines artisanal skill with Axminster and hand-tufting
              technology—paired with close client communication.
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
              <h5 className="text-base sm:text-lg font-semibold">
                {cfg.title}
              </h5>
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
