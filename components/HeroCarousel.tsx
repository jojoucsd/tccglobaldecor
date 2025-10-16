"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { getHeroSlides } from "@/lib/content";
import type { HeroSlide } from "@/lib/types";

export default function HeroCarousel() {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    getHeroSlides().then(setSlides);
  }, []);

  if (!slides.length) {
    // simple skeleton while loading
    return <section className="h-[90vh] bg-neutral-200" />;
  }

  const next = () =>
    setCurrent((c) => (c + 1) % slides.length);

  const prev = () =>
    setCurrent((c) => (c - 1 + slides.length) % slides.length);

  const slide = slides[current];

  return (
    <section className="relative w-full h-[90vh] overflow-hidden">
      {/* background image */}
      <Image
        src={slide.image}
        alt={slide.headline}
        fill
        sizes="100vw"
        className="object-cover"
        priority
      />

      {/* gray overlay (tint like the deck) */}
      <div className="absolute inset-0 bg-neutral-900/50" />

      {/* centered text block */}
      <div className="absolute inset-0 flex items-center justify-center text-center px-6">
        <div className="max-w-3xl" aria-live="polite">
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
            {slide.headline}
          </h1>
          {slide.subhead && (
            <p className="mt-6 text-lg text-white/80">
              {slide.subhead}
            </p>
          )}
          {slide.cta && (
            <a
              href={slide.cta.href}
              className="mt-10 inline-block rounded-full bg-white/15 hover:bg-white/30 text-white px-8 py-3 text-sm font-medium transition"
            >
              {slide.cta.label}
            </a>
          )}

          {/* controls */}
          <div className="mt-10 flex justify-center gap-4">
            <button
              type="button"
              onClick={prev}
              className="bg-white/20 hover:bg-white/40 text-white rounded-full px-4 py-2"
              aria-label="Previous slide"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={next}
              className="bg-white/20 hover:bg-white/40 text-white rounded-full px-4 py-2"
              aria-label="Next slide"
            >
              ›
            </button>
          </div>
        </div>
      </div>

      {/* dots */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
        {slides.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setCurrent(i)}
            className={`h-2 w-2 rounded-full transition ${
              i === current ? "bg-white" : "bg-white/40"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
