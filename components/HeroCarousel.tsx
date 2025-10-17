"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useMemo, useRef } from "react";

// --- HERO COPY (shorten anytime) ---
const HERO_TITLE =
  "CRAFTING BESPOKE CARPETS FOR WORLD-CLASS INTERIORS";
const HERO_SUB =
  "Design excellence • Reliable craftsmanship • Global service";

// --- SLIDES: no captions now ---
// remove: import hero01 from "@/public/images/hero/hero-01.avif"; etc.


// DO NOT start with "/" on GitHub Pages; use relative paths
const slides = [
  { src: "images/hero/hero-01.avif", alt: "Custom Hand-Ax carpet detail" },
  { src: "images/hero/hero-02.avif", alt: "Casino floor Axminster carpet" },
  { src: "images/hero/hero-03.avif", alt: "Hotel suite rug design" },
  { src: "images/hero/hero-04.avif", alt: "Resort lobby carpet installation" },
];


const AUTOPLAY_MS = 5000;

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const timer = useRef<number | null>(null);
  const prefersReducedMotion = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );

  const next = () => setIndex((prev) => (prev + 1) % slides.length);
  const prev = () => setIndex((prev) => (prev - 1 + slides.length) % slides.length);


// autoplay
useEffect(() => {
  if (prefersReducedMotion) return;

  if (timer.current !== null) {
    clearTimeout(timer.current);
    timer.current = null;
  }

  timer.current = window.setTimeout(next, AUTOPLAY_MS);

  return () => {
    if (timer.current !== null) {
      clearTimeout(timer.current);
      timer.current = null;
    }
  };
}, [index, prefersReducedMotion]);

// pause on hover
const handleMouseEnter = () => {
  if (timer.current !== null) {
    clearTimeout(timer.current);
    timer.current = null;
  }
};

const handleMouseLeave = () => {
  if (!prefersReducedMotion) {
    timer.current = window.setTimeout(next, AUTOPLAY_MS);
  }
};

  return (
<section
  className="relative"
  onMouseEnter={handleMouseEnter}
  onMouseLeave={handleMouseLeave}
  aria-label="TCC Global Decor featured projects"
>
  <div className="relative h-[60vh] min-h-[420px] w-full overflow-hidden rounded-2xl md:h-[75vh]">
    {/* --- Slides --- */}
    {slides.map((s, i) => (
      <div
        key={i}
        className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
          i === index ? "opacity-100" : "opacity-0"
        }`}
      >
<Image
  src={s.src}
  alt={s.alt}
  fill
  sizes="100vw"
  className="object-cover"
  priority={i === 0}
  unoptimized
/>
      </div>
    ))}

    {/* gradient wash for legibility (LEFT side stronger) */}
    <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-r from-black/60 via-black/25 to-transparent" />

    {/* ---- Bottom-left lockup ---- */}
    <div className="absolute inset-0 z-10 flex items-end justify-start px-6 md:px-10 lg:px-14 pb-8 md:pb-10">
      <div className="w-fit max-w-full text-left translate-y-[-25px] md:max-w-[80vw]">
        {/* BDNY badge */}
<Link
  href="/contact"
  className="inline-flex items-center gap-2 rounded-full bg-amber-500/90 hover:bg-amber-500 px-3 py-1.5 text-xs font-semibold text-black shadow mb-3 md:mb-4"
>
  <span className="inline-block h-2 w-2 rounded-full bg-black/70"></span>
  BDNY • Nov 9–10 • Booth 878 <span aria-hidden="true">→</span>
</Link>

      <h1
        className="
          text-white font-bold tracking-tight leading-[1.15]
          text-[1.75rem] sm:text-4xl md:text-5xl lg:text-6xl
          whitespace-normal md:whitespace-normal  /* allow wrapping */
          max-w-[22ch] md:max-w-[28ch]            /* control line length for 3 lines */
        "
      >
        {HERO_TITLE}
      </h1>

        {/* Smaller supporting text (≈ 3 visible lines) */}
        <p
          className="
            mt-12
            text-white/85
            text-sm sm:text-base md:text-lg
            leading-relaxed md:leading-[1.6]
            max-w-[32ch] md:max-w-[38ch]
            whitespace-normal
          "
        >
          {HERO_SUB}
        </p>
{/* Soft CTA */}
<div className="mt-5 flex justify-start">
  <Link
    href="/projects"
    className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur hover:bg-white/20"
  >
    Explore projects <span aria-hidden="true">→</span>
  </Link>
</div>
      </div>
    </div>

    {/* --- Controls (z-index fix) --- */}
    <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-between p-3">
      <button
        onClick={prev}
        className="pointer-events-auto rounded-full bg-white/70 px-3 py-2 text-sm shadow hover:bg-white"
        aria-label="Previous slide"
      >
        ←
      </button>
      <button
        onClick={next}
        className="pointer-events-auto rounded-full bg-white/70 px-3 py-2 text-sm shadow hover:bg-white"
        aria-label="Next slide"
      >
        →
      </button>
    </div>

    {/* --- Dots (z-index fix) --- */}
    <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center gap-2">
      {slides.map((_, i) => (
        <button
          key={i}
          onClick={() => setIndex(i)}
          aria-label={`Go to slide ${i + 1}`}
          className={`h-2 w-2 rounded-full ${
            i === index ? "bg-white" : "bg-white/50"
          } hover:bg-white`}
        />
      ))}
    </div>
  </div>
</section>
  );
}
