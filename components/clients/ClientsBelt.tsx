"use client";
import { useMemo } from "react";
import { useTranslations } from "next-intl";
import Section from "@/components/Section";
import Image from "next/image";
import { ALL_CLIENT_LOGOS } from "@/app/(site)/data/clients";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

// Seeded shuffle — deterministic per `seed`, without touching the global
// Math.random (the previous version monkey-patched and restored it, which
// would have permanently corrupted Math.random site-wide if the shuffle
// ever threw mid-computation).
function seededRandom(seed: number) {
  let s = seed;
  return () => {
    const x = Math.sin(s++) * 10000;
    return x - Math.floor(x);
  };
}

function getRandomSubset<T>(arr: T[], count: number, seed: number): T[] {
  const rand = seededRandom(seed);
  const copy = arr.slice();
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, count);
}

export default function ClientsBelt({
  id,
  title,
  seed = 1,
  count = 6,
  className = "",
}: {
  id?: string;
  title?: string;
  seed?: number;
  count?: number;
  className?: string;
}) {
  const t = useTranslations('clients');
  const displayTitle = title ?? t('defaultTitle');
  // random but stable per seed
  const logos = useMemo(
    () => getRandomSubset(ALL_CLIENT_LOGOS, count, seed),
    [seed, count]
  );

  const reduceMotion = usePrefersReducedMotion();

  // Duplicate logos for seamless loop
  const loop = [...logos, ...logos];

  return (
    <Section id={id} className={`py-10 md:py-12 bg-white ${className}`}>
      <p className="mb-6 text-center text-xs uppercase tracking-widest text-gray-500">
        {displayTitle}
      </p>

      <div
        className="relative overflow-hidden"
        aria-label="Client logos"
        role="region"
      >
        {/* gradient fades on edges */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-white to-transparent" />

        {/* belt */}
        <div
          className={`flex gap-10 md:gap-14 items-center will-change-transform ${
            reduceMotion ? "" : "animate-clients-marquee"
          }`}
          onMouseEnter={(e) =>
            !reduceMotion && e.currentTarget.classList.add("pause-animation")
          }
          onMouseLeave={(e) =>
            e.currentTarget.classList.remove("pause-animation")
          }
        >
          {loop.map((logo, i) => (
          <div key={i} className="shrink-0">
<Image
  src={logo.src}
  alt={logo.alt}
  width={480}    // 3× intrinsic width
  height={120}   // proportional height
  className="
    h-16 md:h-20 lg:h-24   /* ~3× original visual size */
    opacity-90 hover:opacity-100 transition
    grayscale hover:grayscale-0
    w-auto mx-3 md:mx-6
  "
  loading="lazy"
  unoptimized
/>
          </div>
          ))}

        </div>
      </div>
    </Section>
  );
}
