// app/(site)/projects/[slug]/ProjectLayoutClient.tsx
"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import Section from "@/components/Section";

const bp = process.env.NEXT_PUBLIC_BASE_PATH || "";

type ProjectLayoutProps = {
  title: string;
  address?: string;
  overview?: string;
  details?: string;
  details2?: string;
  images: { src: string; alt?: string }[];
};

export default function ProjectLayoutClient({
  title,
  address,
  overview,
  details,
  details2,
  images,
}: ProjectLayoutProps) {
  const totalImages = images.length;
  const showSectionB = totalImages >= 7;

  // Image assignments
  const hero = images[1];
  const imgA_large = images[2] ?? images.at(-1)!;
  const imgA_small = images[3] ?? images.at(-1)!;

  // Section B images (only if shown)
  const imgB_large = images[4];
  const imgB_small = images[5];

  // Section C carousel: starts from index 4 if B hidden, index 6 if B shown
  const carouselStartIndex = showSectionB ? 6 : 4;
  const carouselImages = images.slice(carouselStartIndex);

  // Carousel state
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance carousel every 6 seconds
  useEffect(() => {
    if (carouselImages.length <= 1) return; // No carousel needed

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [carouselImages.length]);

  return (
    <main className="min-h-screen bg-white text-brand-ink pt-16 sm:pt-20 lg:pt-24">
      {/* HERO with in-banner back link */}
      {hero && (
        <section className="relative w-full h-[52vh] sm:h-[58vh] md:h-[60vh] min-h-[300px]">
          <Image
            src={hero.src}
            alt={hero.alt ?? title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
            unoptimized
          />

          {/* Readability gradient at bottom */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-20 sm:h-24 bg-gradient-to-t from-black/35 via-black/10 to-transparent"
          />

          {/* Back link – bottom-left */}
          <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4">
            <Link
              href="/projects"
              aria-label="Back to Projects"
              className="inline-flex items-center gap-2 rounded-full
                         bg-brand-ink/75 hover:bg-brand-ink/90
                         text-white px-3 py-1.5 text-xs sm:text-sm
                         ring-1 ring-white/25 backdrop-blur-sm transition-colors"
            >
              ← <span className="font-medium tracking-tight">Projects</span>
            </Link>
          </div>
        </section>
      )}

      {/* HEADER - Reduced padding */}
      <Section className="pt-3 sm:pt-4 md:pt-5 pb-2 sm:pb-3">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-2">
          <h1 className="text-2xl sm:text-3xl md:text-[1.9rem] lg:text-[2.1rem] font-bold tracking-tight">
            {title}
          </h1>
          {address && (
            <p className="text-xs sm:text-sm md:text-[0.95rem] text-neutral-700 md:text-right leading-relaxed">
              {address}
            </p>
          )}
        </div>
        <div className="mt-2 sm:mt-3 h-[3px] w-full bg-brand-gold/50 rounded-full" />
      </Section>

      {/* SECTION A — 40 / 60 : overview + plan vs realized image */}
      <Section className="py-4 sm:py-5 md:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 lg:gap-6 items-end">
          <div className="lg:col-span-5">
            <div className="flex flex-col gap-2 sm:gap-3">
              <div className="rounded-2xl p-3 sm:p-4 bg-neutral-50">
                <p className="text-[15px] sm:text-base leading-relaxed text-neutral-800">
                  {overview}
                </p>
              </div>
              <div className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl ring-1 ring-neutral-200">
                <Image
                  src={imgA_small?.src ?? imgA_large.src}
                  alt={imgA_small?.alt ?? title}
                  fill
                  className="object-cover"
                  loading="lazy"
                  sizes="(min-width:1024px) 40vw, 100vw"
                  unoptimized
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="relative w-full aspect-[3/2] overflow-hidden rounded-2xl ring-1 ring-neutral-200">
              <Image
                src={imgA_large.src}
                alt={imgA_large.alt ?? title}
                fill
                className="object-cover"
                loading="lazy"
                sizes="(min-width:1024px) 60vw, 100vw"
                unoptimized
              />
            </div>
            {/* Concept → Realization caption */}
            <p className="mt-3 sm:mt-4 text-xs sm:text-sm font-semibold tracking-[0.14em] uppercase text-brand-ink">
              Concept Plan → Realized Space
            </p>
          </div>
        </div>
      </Section>

      {/* SECTION B — 65 / 35 : feature space + detail + notes (Conditional) */}
      {showSectionB && imgB_large && (
        <>
          {/* Divider */}
          <Section className="py-0">
            <div className="h-[2px] w-full bg-brand-gold/30 rounded-full" />
          </Section>

          <Section className="py-4 sm:py-5 md:py-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 lg:gap-6 items-start">
              {/* LEFT 65% */}
              <div className="lg:col-span-8">
                <div className="relative w-full aspect-[3/2] overflow-hidden rounded-2xl ring-1 ring-neutral-200">
                  <Image
                    src={imgB_large.src}
                    alt={imgB_large.alt ?? title}
                    fill
                    className="object-cover"
                    loading="lazy"
                    sizes="(min-width:1024px) 66vw, 100vw"
                    unoptimized
                  />
                </div>
              </div>

              {/* RIGHT 35% */}
              <div className="lg:col-span-4 flex flex-col gap-3 sm:gap-4">
                {/* Square image */}
                {imgB_small && (
                  <div className="relative w-full aspect-square overflow-hidden rounded-2xl ring-1 ring-neutral-200">
                    <Image
                      src={imgB_small.src}
                      alt={imgB_small.alt ?? title}
                      fill
                      className="object-cover"
                      loading="lazy"
                      sizes="(min-width:1024px) 34vw, 100vw"
                      unoptimized
                    />
                  </div>
                )}

                {/* Project Notes */}
                <div className="rounded-2xl p-3 sm:p-4 bg-neutral-50">
                  <p className="text-[15px] sm:text-base leading-relaxed text-neutral-800">
                    {details}
                  </p>
                </div>
              </div>
            </div>

            {/* Feature space caption */}
            <p className="mt-3 sm:mt-4 text-xs sm:text-sm font-semibold tracking-[0.14em] uppercase text-brand-ink">
              Feature Space &amp; Detail View
            </p>
          </Section>
        </>
      )}

      {/* Divider before Section C */}
      <Section className="py-0">
        <div className="h-[2px] w-full bg-brand-gold/30 rounded-full" />
      </Section>

      {/* SECTION C — 25 / 75 : text + carousel (smaller text, bigger carousel) */}
      <Section className="py-4 sm:py-5 md:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 lg:gap-6 items-stretch">
          {/* LEFT 25% - Smaller text box */}
          <div className="lg:col-span-3 flex flex-col justify-end">
            <div className="rounded-2xl p-3 sm:p-4 bg-neutral-50">
              <p className="text-sm sm:text-[15px] leading-relaxed text-neutral-800">
                {details2}
              </p>
            </div>
          </div>

          {/* RIGHT 75% - Bigger carousel */}
          <div className="lg:col-span-9">
            {carouselImages.length > 0 && (
              <div className="relative w-full aspect-[3/2] overflow-hidden rounded-2xl ring-1 ring-neutral-200 group">
                {/* Carousel Images */}
                {carouselImages.map((image, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ${
                      index === currentSlide ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt ?? title}
                      fill
                      className="object-cover"
                      loading="lazy"
                      sizes="(min-width:1024px) 75vw, 100vw"
                      unoptimized
                    />
                  </div>
                ))}

                {/* Navigation Arrows - Only show if more than 1 image */}
                {carouselImages.length > 1 && (
                  <>
                    <button
                      onClick={() =>
                        setCurrentSlide(
                          (prev) => (prev - 1 + carouselImages.length) % carouselImages.length
                        )
                      }
                      className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      aria-label="Previous image"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() => setCurrentSlide((prev) => (prev + 1) % carouselImages.length)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      aria-label="Next image"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>

                    {/* Dot Indicators */}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                      {carouselImages.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentSlide(index)}
                          className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                            index === currentSlide ? "bg-white w-6" : "bg-white/50 hover:bg-white/75"
                          }`}
                          aria-label={`Go to image ${index + 1}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </Section>
    </main>
  );
}
