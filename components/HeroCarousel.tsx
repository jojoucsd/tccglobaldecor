"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useMemo, useRef } from "react";

// --- HERO COPY (shorten anytime) ---
const HERO_TITLE =
  "CRAFTING BESPOKE CARPETS FOR WORLD-CLASS INTERIORS";
const HERO_SUB =
  "TCC Carpets unites a professional design team and skilled craftsmen with over a decade of experience, transforming complex ideas into exclusive creations through close collaboration and precision.";

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
    className="relative pt-[env(safe-area-inset-top)]"
    onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}
    aria-label="TCC Global Decor featured projects"
  >
    <div className="relative h-[60vh] min-h-[420px] md:h-[75vh] w-full overflow-hidden rounded-none md:rounded-2xl">
      {/* Slides */}
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
            className="object-cover object-center"
            priority={i === 0}
            unoptimized
          />
        </div>
      ))}

      {/* Gradient overlay for readability */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

      {/* --- Copy & CTA --- */}
      <div className="absolute inset-0 z-10 flex items-end justify-start px-5 sm:px-8 md:px-14 pb-10">
        <div className="max-w-[90%] sm:max-w-[70%] md:max-w-[55%]">
          <h1
            className="
              text-white font-bold tracking-tight leading-[1.15]
              text-2xl sm:text-3xl md:text-5xl lg:text-6xl
              max-w-[24ch]
            "
          >
            {HERO_TITLE}
          </h1>

          <p
            className="
              mt-4 sm:mt-6 md:mt-8 text-white/90
              text-sm sm:text-base md:text-lg
              leading-relaxed md:leading-[1.6]
              max-w-[36ch]
              bg-black/30 backdrop-blur-sm px-4 py-3 rounded-lg ring-1 ring-white/10
            "
          >
            {HERO_SUB}
          </p>

          <div className="mt-5 sm:mt-6">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/20 backdrop-blur"
            >
              Explore projects <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* --- Controls --- */}
      <div className="pointer-events-none absolute inset-0 z-20 hidden md:flex items-center justify-between p-4">
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

      {/* --- Dots --- */}
      <div className="absolute bottom-5 left-0 right-0 z-20 flex justify-center gap-2">
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
