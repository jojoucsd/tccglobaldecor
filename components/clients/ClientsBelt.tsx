"use client";
import { useEffect, useMemo, useState } from "react";
import Section from "@/components/Section";
import Image from "next/image";
import { ALL_CLIENT_LOGOS } from "@/app/(site)/data/clients"; // ✅ central logo data

// --- Random picker utility ---
function getRandomSubset<T>(arr: T[], count: number): T[] {
  const copy = arr.slice();
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, count);
}

export default function ClientsBelt({
  id,
  title = "Trusted by leading hospitality brands",
  seed = 1,               // optional: different number for different belts
  count = 6,              // how many logos to show per belt
  className = "",
}: {
  id?: string;
  title?: string;
  seed?: number;
  count?: number;
  className?: string;
}) {
  // random but stable per seed
  const logos = useMemo(() => {
    const r = Math.random;
    Math.random = () => {
      const x = Math.sin(seed++) * 10000;
      return x - Math.floor(x);
    };
    const subset = getRandomSubset(ALL_CLIENT_LOGOS, count);
    Math.random = r;
    return subset;
  }, [seed, count]);

  // Respect prefers-reduced-motion
  const [reduceMotion, setReduceMotion] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  // Duplicate logos for seamless loop
  const loop = [...logos, ...logos];

  return (
    <Section id={id} className={`py-10 md:py-12 bg-white ${className}`}>
      <p className="mb-6 text-center text-xs uppercase tracking-widest text-gray-500">
        {title}
      </p>

      <div
        className="relative overflow-hidden"
        aria-label="Client logos carousel"
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

      {/* keyframes + pause */}
      <style jsx global>{`
        @keyframes clients-marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-clients-marquee {
          animation: clients-marquee 30s linear infinite;
        }
        .pause-animation {
          animation-play-state: paused !important;
        }
      `}</style>
    </Section>
  );
}
