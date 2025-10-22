// components/belts/SmartBelt.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

export type SmartBeltItem = {
  src: string;
  alt: string;
  href?: string;         // optional link
  label?: string;        // optional caption below image
  kind?: "logo" | "image"; // affects default styling (grayscale for logos)
};

type Props = {
  items: SmartBeltItem[];
  className?: string;
  height?: "sm" | "md" | "lg"; // visual height
  speedSec?: number;           // marquee duration
  showCaptions?: boolean;
  grayscaleHover?: boolean;    // only applies to kind !== "image"
  seed?: number;               // deterministic shuffle
  count?: number;              // random subset length
  unoptimized?: boolean;
  title?: string;              // optional kicker/title row
  edgeFade?: boolean;
  ariaLabel?: string;
};

export default function SmartBelt({
  items,
  className = "",
  height = "md",
  speedSec = 30,
  showCaptions = true,
  grayscaleHover = true,
  seed,
  count,
  unoptimized = true,
  title,
  edgeFade = true,
  ariaLabel = "media belt",
}: Props) {
  // deterministic shuffle + subset (keeps your randomSubset spirit)
  const sliced = useMemo(() => {
    if (items.length === 0) return [];
    const rng = seeded(seed ?? 1);
    const copy = items.slice();
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return count ? copy.slice(0, count) : copy;
  }, [items, seed, count]);

  // reduced motion
  const [reduceMotion, setReduceMotion] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  const loop = [...sliced, ...sliced];

  const hClass =
    height === "lg" ? "h-24 md:h-28" : height === "sm" ? "h-12 md:h-14" : "h-16 md:h-20";

  return (
    <div className={`py-6 ${className}`}>
      {title ? (
        <p className="mb-4 text-center text-xs uppercase tracking-widest text-gray-500">{title}</p>
      ) : null}

      <div className="relative overflow-hidden" role="region" aria-label={ariaLabel}>
        {edgeFade && (
          <>
            <div className="pointer-events-none absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-white to-transparent" />
            <div className="pointer-events-none absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-white to-transparent" />
          </>
        )}

        <div
          className={`flex gap-10 md:gap-14 items-end will-change-transform ${
            reduceMotion ? "" : "animate-smart-belt"
          }`}
          style={{ animationDuration: `${speedSec}s` }}
          onMouseEnter={(e) => !reduceMotion && e.currentTarget.classList.add("pause-animation")}
          onMouseLeave={(e) => e.currentTarget.classList.remove("pause-animation")}
        >
          {loop.map((it, i) => {
            const img = (
              <Image
                src={it.src}
                alt={it.alt}
                width={480}
                height={160}
                className={[
                  "w-auto",
                  hClass,
                  "transition",
                  it.kind !== "image" && grayscaleHover
                    ? "grayscale hover:grayscale-0 opacity-90 hover:opacity-100"
                    : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                loading="lazy"
                unoptimized={unoptimized}
              />
            );

            return (
              <div key={`${it.src}-${i}`} className="shrink-0 mx-3 md:mx-6 text-center">
                {it.href ? <Link href={it.href}>{img}</Link> : img}
                {showCaptions && it.label ? (
                  <div className="mt-2 text-xs text-neutral-600 line-clamp-1">{it.label}</div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>

      {/* keyframes + pause */}
      <style jsx global>{`
        @keyframes smart-belt {
          0% { transform: translateX(0) }
          100% { transform: translateX(-50%) }
        }
        .animate-smart-belt { animation: smart-belt linear infinite }
        .pause-animation { animation-play-state: paused !important }
      `}</style>
    </div>
  );
}

// simple deterministic RNG
function seeded(s: number) {
  let x = s || 1;
  return () => {
    x ^= x << 13;
    x ^= x >> 17;
    x ^= x << 5;
    return ((x >>> 0) % 1_000_000) / 1_000_000;
  };
}
