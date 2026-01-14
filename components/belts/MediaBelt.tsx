// components/belts/SmartBelt.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

export type SmartBeltItem = {
  src: string;
  alt: string;
  href?: string;           // click-through
  label?: string;          // optional caption
  kind?: "logo" | "image"; // grayscale hover applies when not "image"
};

type Props = {
  // EITHER pass items manually...
  items?: SmartBeltItem[];
  // ...OR use auto mode:
  source?: "projects" | "gallery"; // uses /public/images/<source>/project_list_img_#.avif
  slugs?: string[];                // maps index -> /projects/[slug]
  hrefBase?: string;               // default "/projects"
  startIndex?: number;             // default 1 (your images start at 1)
  // visuals/behavior
  className?: string;
  height?: "sm" | "md" | "lg";
  speedSec?: number;
  showCaptions?: boolean;
  grayscaleHover?: boolean;
  seed?: number;
  count?: number;
  unoptimized?: boolean;
  title?: string;
  edgeFade?: boolean;
  ariaLabel?: string;
};

export default function SmartBelt({
  items = [],
  source,
  slugs,
  hrefBase = "/projects",
  startIndex = 1,
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
  const bp = process.env.NEXT_PUBLIC_BASE_PATH || "";

  // Auto-generate items from /public/images/<source>/project_list_img_#.avif
  const generated = useMemo(() => {
    if (!source) return [];
    const total = slugs?.length ?? 12; // default 12 if no slugs provided
    const arr: SmartBeltItem[] = [];
    for (let i = 0; i < total; i++) {
      const idx = startIndex + i;
      const slug = slugs?.[i];
      const labelFromSlug =
        slug?.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
      arr.push({
        src: `${bp}/images/${source}/project_list_img_${idx}.avif`,
        alt: labelFromSlug ?? `Project ${idx}`,
        href: slug ? `${hrefBase}/${slug}` : undefined,
        label: showCaptions ? (labelFromSlug ?? undefined) : undefined,
        kind: "image",
      });
    }
    return arr;
  }, [source, slugs, hrefBase, startIndex, bp, showCaptions]);

  // Pick manual items if provided; otherwise generated
  const combined: SmartBeltItem[] = items.length ? items : generated;

  // Deterministic shuffle + subset
  const sliced = useMemo(() => {
    if (combined.length === 0) return [];
    const rng = seeded(seed ?? 1);
    const copy = combined.slice();
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return count ? copy.slice(0, count) : copy;
  }, [combined, seed, count]);

  // Reduced-motion support
  const [reduceMotion, setReduceMotion] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  // Triple the items for smoother infinite loop (no visible seam)
  const loop = [...sliced, ...sliced, ...sliced];

  const hClass =
    height === "lg" ? "h-24 md:h-28"
    : height === "sm" ? "h-12 md:h-14"
    : "h-16 md:h-20";

  return (
    <div className={`py-6 ${className}`}>
      {title && (
        <p className="mb-4 text-center text-xs uppercase tracking-widest text-gray-500">
          {title}
        </p>
      )}

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
                ].filter(Boolean).join(" ")}
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

      <style jsx global>{`
        @keyframes smart-belt {
          0% { transform: translate3d(0, 0, 0) }
          100% { transform: translate3d(-33.333%, 0, 0) }
        }
        .animate-smart-belt {
          animation: smart-belt linear infinite;
          backface-visibility: hidden;
          perspective: 1000px;
        }
        .pause-animation { animation-play-state: paused !important }
      `}</style>
    </div>
  );
}

function seeded(s: number) {
  let x = s || 1;
  return () => {
    x ^= x << 13; x ^= x >> 17; x ^= x << 5;
    return ((x >>> 0) % 1_000_000) / 1_000_000;
  };
}
