"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import TriptychRevealSlide from "@/components/TriptychRevealSlide";

const bp = process.env.NEXT_PUBLIC_BASE_PATH || "";

// --- Copy ---
const HERO_TITLE = "CRAFTING BESPOKE CARPETS FOR WORLD-CLASS INTERIORS";
const HERO_SUB =
  "TCC unites a professional design team and skilled craftsmen with over decades of experience, transforming complex ideas into exclusive creations through collaboration and precision.";

// --- Slide types ---
type PhotoSlide = {
  type: "photo";
  src: string;
  mobileSrc?: string;
  alt: string;
  focus?: string;
};

type RevealSlide = {
  type: "reveal";
  images: { src: string; alt: string; focus?: string }[];
};

type Slide = PhotoSlide | RevealSlide;

// --- Slides (prefixed with bp) ---
const slides: Slide[] = [
  {
    type: "photo",
    src: `${bp}/images/hero/hero-01.avif`,
    mobileSrc: `${bp}/images/hero/hero-mobile-01.avif`,
    alt: "Custom Hand-Ax carpet detail",
    focus: "object-center",
  },
  {
    type: "photo",
    src: `${bp}/images/hero/hero-02.avif`,
    mobileSrc: `${bp}/images/hero/hero-mobile-02.avif`,
    alt: "Casino floor Axminster carpet",
    focus: "object-[50%_55%]",
  },
  {
    type: "photo",
    src: `${bp}/images/hero/hero-03.avif`,
    mobileSrc: `${bp}/images/hero/hero-mobile-03.avif`,
    alt: "Hotel suite rug design",
    focus: "object-center",
  },
  {
    type: "reveal",
    images: [
      {
        src: `${bp}/images/hero/hero-04-install.avif`,
        alt: "Installation in progress",
        focus: "object-[center_80%]",
      },
      {
        src: `${bp}/images/hero/hero-04-plan.avif`,
        alt: "Concept drawing / plan",
      },
      {
        src: `${bp}/images/hero/hero-04-final.avif`,
        alt: "Finished bespoke interior",
        focus: "object-[center_65%]",
      },
    ],
  },
];

const AUTOPLAY_MS = 5000;

// --- Hook: isMobile based on CSS breakpoint (≤ 639px) ---
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mq = window.matchMedia("(max-width: 639px)");

    const handleChange = (event: MediaQueryListEvent | MediaQueryList) => {
      setIsMobile(event.matches);
    };

    // Initial
    handleChange(mq);

    // Listen to changes
    if (typeof mq.addEventListener === "function") {
      mq.addEventListener("change", handleChange as (e: MediaQueryListEvent) => void);
      return () =>
        mq.removeEventListener("change", handleChange as (e: MediaQueryListEvent) => void);
    } else {
      // Safari fallback
      // @ts-ignore
      mq.addListener(handleChange);
      // @ts-ignore
      return () => mq.removeListener(handleChange);
    }
  }, []);

  return isMobile;
}

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const intervalRef = useRef<number | null>(null);
  const isMobile = useIsMobile();

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Detect prefers-reduced-motion
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");

    const update = () => {
      setPrefersReducedMotion(mq.matches);
    };

    update(); // initial

    if (typeof mq.addEventListener === "function") {
      mq.addEventListener("change", update);
      return () => mq.removeEventListener("change", update);
    } else {
      // Safari fallback
      // @ts-ignore
      mq.addListener(update);
      // @ts-ignore
      return () => mq.removeListener(update);
    }
  }, []);

  const stopAutoplay = () => {
    if (intervalRef.current != null) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const startAutoplay = () => {
    if (prefersReducedMotion) {
      stopAutoplay();
      return;
    }
    if (intervalRef.current != null) return; // already running

    intervalRef.current = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, AUTOPLAY_MS);
  };

  // Start/stop autoplay when motion preference changes
  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefersReducedMotion]);

  const goTo = (nextIndex: number | ((prev: number) => number)) => {
    stopAutoplay();
    setIndex((prev) =>
      typeof nextIndex === "function"
        ? (nextIndex as (p: number) => number)(prev)
        : nextIndex % slides.length
    );
    startAutoplay();
  };

  const next = () => goTo((p) => (p + 1) % slides.length);
  const prev = () => goTo((p) => (p - 1 + slides.length) % slides.length);

  const handleMouseEnter = () => {
    stopAutoplay();
  };

  const handleMouseLeave = () => {
    startAutoplay();
  };

  const activeSlide = slides[index];

  // 🔑 Only use light scheme on non-mobile reveal slides
  const isLightScheme = activeSlide.type === "reveal" && !isMobile;

  return (
    <section
      className="hero relative pt-[env(safe-area-inset-top)] transition-colors duration-500"
      style={{
        paddingTop: "calc(var(--header-h, 72px) + env(safe-area-inset-top))",
      }}
      data-scheme={isLightScheme ? "light" : undefined}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label="TCC Global Decor featured projects"
    >
      <div
        className="
          relative w-full overflow-hidden rounded-none md:rounded-2xl bg-black
          h-[88svh] xs:h-[85svh] sm:h-[85svh] md:h-[85vh]
          min-h-[440px] md:min-h-[520px]
        "
      >
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

          // Photo slide
          const imgSrc = isMobile && s.mobileSrc ? s.mobileSrc : s.src;

          return (
            <div
              key={i}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                active ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={imgSrc}
                alt={s.alt}
                fill
                sizes="100vw"
                className={`object-cover ${s.focus ?? "object-center"}`}
                priority={active}
                unoptimized
              />

              {/* Gradient overlay only for photo slides */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
            </div>
          );
        })}

        {/* Copy & CTA */}
        <div className="absolute inset-0 z-30 flex items-end justify-start px-5 sm:px-8 md:px-14 pb-10 pointer-events-none">
          <div className="max-w-[92%] sm:max-w-[70%] md:max-w-[55%] pointer-events-auto">
            <h1 className="font-bold tracking-tight leading-[1.15] text-2xl sm:text-3xl md:text-5xl lg:text-6xl max-w-[24ch] text-[var(--hero-fg)]">
              {HERO_TITLE}
            </h1>
            <p className="mt-4 sm:mt-6 md:mt-8 text-sm sm:text-base md:text-lg leading-relaxed md:leading-[1.6] max-w-[36ch] text-[var(--hero-fg-muted)] bg-[var(--hero-chip-bg)] ring-1 ring-[var(--hero-chip-border)] backdrop-blur-sm px-4 py-3 rounded-lg transition-colors duration-300">
              {HERO_SUB}
            </p>
            <div className="mt-5 sm:mt-6">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm backdrop-blur text-[var(--hero-fg)] border border-[var(--hero-chip-border)] bg-[var(--hero-chip-bg)] hover:bg-[var(--hero-chip-hover)] transition-colors duration-300"
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
              onClick={() => goTo(i)}
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
