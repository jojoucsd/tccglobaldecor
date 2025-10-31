"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useMemo, useRef } from "react";
import TriptychRevealSlide from "@/components/TriptychRevealSlide";

// --- Copy ---
const HERO_TITLE = "CRAFTING BESPOKE CARPETS FOR WORLD-CLASS INTERIORS";
const HERO_SUB =
  "TCC Carpets unites a professional design team and skilled craftsmen with over a decade of experience, transforming complex ideas into exclusive creations through close collaboration and precision.";

// --- Slide types ---
type PhotoSlide = {
  type: "photo";
  src: string;
  alt: string;
};

type RevealSlide = {
  type: "reveal";
  images: { src: string; alt: string; focus?: string }[]; // [install, plan, final]
};

type Slide = PhotoSlide | RevealSlide;

// --- Slides (1–3 photo, 4 = reveal). Use relative paths for GH Pages. ---
const slides: Slide[] = [
  { type: "photo", src: "images/hero/hero-01.avif", alt: "Custom Hand-Ax carpet detail" },
  { type: "photo", src: "images/hero/hero-02.avif", alt: "Casino floor Axminster carpet" },
  { type: "photo", src: "images/hero/hero-03.avif", alt: "Hotel suite rug design" },

  {
    type: "reveal",
    images: [
      { src: "images/hero/hero-04-install.avif", alt: "Installation in progress", focus: "object-[center_80%]" },
      { src: "images/hero/hero-04-plan.avif",    alt: "Concept drawing / plan" },
      { src: "images/hero/hero-04-final.avif",   alt: "Finished bespoke interior", focus: "object-[center_65%]" },
    ],
  },
];

const AUTOPLAY_MS = 6500;

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const timer = useRef<number | null>(null);

  const prefersReducedMotion = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );

  const next = () => setIndex((p) => (p + 1) % slides.length);
  const prev = () => setIndex((p) => (p - 1 + slides.length) % slides.length);

  // autoplay
  useEffect(() => {
    if (prefersReducedMotion) return;
    if (timer.current) clearTimeout(timer.current);
    timer.current = window.setTimeout(next, AUTOPLAY_MS);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [index, prefersReducedMotion]);

  // pause on hover
  const handleMouseEnter = () => {
    if (timer.current) clearTimeout(timer.current);
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
      <div className="relative h-[60vh] min-h-[420px] md:h-[75vh] w-full overflow-hidden rounded-none md:rounded-2xl bg-black">
        {/* Slides */}
        {slides.map((s, i) => {
          const active = i === index;

          if (s.type === "reveal") {
            return (
              <div
                key={i}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  active ? "opacity-100" : "opacity-0"
                }`}
              >
                <TriptychRevealSlide
                  images={s.images}
                  active={active}
                  prefersReducedMotion={prefersReducedMotion}
                />
              </div>
            );
          }

          // photo slide
          return (
            <div
              key={i}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                active ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={s.src}
                alt={s.alt}
                fill
                sizes="100vw"
                className="object-cover object-center"
                priority={active}
                unoptimized
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
            </div>
          );
        })}

        {/* Copy & CTA */}
        <div className="absolute inset-0 z-30 flex items-end justify-start px-5 sm:px-8 md:px-14 pb-10 pointer-events-none">
          <div className="max-w-[90%] sm:max-w-[70%] md:max-w-[55%] pointer-events-auto">
            <h1 className="text-white font-bold tracking-tight leading-[1.15] text-2xl sm:text-3xl md:text-5xl lg:text-6xl max-w-[24ch] drop-shadow-[0_3px_8px_rgba(0,0,0,0.8)]">
              {HERO_TITLE}
            </h1>
            <p className="mt-4 sm:mt-6 md:mt-8 text-white/90 text-sm sm:text-base md:text-lg leading-relaxed md:leading-[1.6] max-w-[36ch] bg-black/30 backdrop-blur-sm px-4 py-3 rounded-lg ring-1 ring-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
              {HERO_SUB}
            </p>
            <div className="mt-5 sm:mt-6">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/20 backdrop-blur"
              >
                Explore projects <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="pointer-events-none absolute inset-0 z-40 hidden md:flex items-center justify-between p-4">
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

        {/* Dots */}
        <div className="absolute bottom-5 left-0 right-0 z-40 flex justify-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2 w-2 rounded-full ${i === index ? "bg-white" : "bg-white/50"} hover:bg-white`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
