"use client";

import Image from "next/image";

// 🔧 Tuning knobs
const REVEAL_DURATION_MS = 2600;   // smoother fade per image
const REVEAL_STAGGER_MS  = 1800;   // longer delay between each reveal

export default function TriptychRevealSlide({
  images, // [install, plan, final]
  active,
  prefersReducedMotion = false,
}: {
  images: { src: string; alt: string; focus?: string }[];
  active: boolean;
  prefersReducedMotion?: boolean;
}) {
  const duration = `[${REVEAL_DURATION_MS}ms]`;
  return (
    <div className="absolute inset-0">
      {/* Mobile: slow layered crossfade */}
      <div className="md:hidden absolute inset-0">
        {images.map((img, i) => (
          <div
            key={`m-${i}`}
            className={[
              "absolute inset-0 transition-opacity ease-out",
              `duration-${duration}`,
              active ? "opacity-100" : "opacity-0",
            ].join(" ")}
            style={{
              transitionDelay:
                active && !prefersReducedMotion ? `${i * REVEAL_STAGGER_MS}ms` : "0ms",
              zIndex: 10 + i,
            }}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="100vw"
              className={`object-cover ${img.focus ?? "object-center"}`}
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/50" />
          </div>
        ))}
      </div>

      {/* Desktop: full-height, slower reveal */}
      <div className="hidden md:flex absolute inset-0 px-4 sm:px-8 md:px-14">
        <div className="grid grid-cols-3 gap-3 md:gap-4 w-full h-full items-stretch">
          {images.map((img, i) => (
            <div
              key={`d-${i}`}
              className={[
                "relative h-full overflow-hidden rounded-2xl ring-1 ring-white/15",
                "shadow-[0_30px_80px_rgba(0,0,0,0.7)]",
                "transition-all ease-out",
                `duration-${duration}`,
                active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
              ].join(" ")}
              style={{
                transitionDelay:
                  active && !prefersReducedMotion ? `${i * REVEAL_STAGGER_MS}ms` : "0ms",
              }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(min-width:1024px) 33vw, 100vw"
                className={`object-cover ${img.focus ?? "object-center"}`}
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/60" />
            </div>
          ))}
        </div>
      </div>

      {/* Vignette overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
    </div>
  );
}
