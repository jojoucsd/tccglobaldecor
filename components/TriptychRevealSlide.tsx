"use client";

import Image from "next/image";

// 🔧 Tuning knobs
const REVEAL_DURATION_MS = 2600; // fade time per image
const REVEAL_STAGGER_MS  = 1800; // delay between each reveal
const DESKTOP_SCALE      = 1.02; // tiny scale compensation to avoid gaps
const MOBILE_SCALE       = 1.01; // gentler scale on mobile

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
    // ✅ White backdrop for clean contrast
    <div className="absolute inset-0 bg-white transition-colors duration-500">
      {/* Mobile: slow layered crossfade (single full-bleed at a time) */}
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
              className={`object-cover ${img.focus ?? "object-center"} transform-gpu`}
              // Tiny scale to eliminate micro-gaps on some devices
              style={{ transform: `scale(${MOBILE_SCALE})` }}
              unoptimized
            />
          </div>
        ))}
      </div>

      {/* Desktop: three-up reveal, fill hero height, hairline white seams */}
      <div className="hidden md:flex absolute inset-0 px-4 sm:px-8 md:px-14">
        <div className="grid grid-cols-3 gap-[2px] md:gap-[3px] w-full h-full items-stretch bg-white">
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
                className={`object-cover ${img.focus ?? "object-center"} transform-gpu will-change-transform`}
                // ✅ Tiny scale compensation so edges tuck under the seams
                style={{ transform: `scale(${DESKTOP_SCALE})` }}
                unoptimized
              />
            </div>
          ))}
        </div>
      </div>

      {/* Subtle light vignette (kept very soft for white bg) */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent" />
    </div>
  );
}
