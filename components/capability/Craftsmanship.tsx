"use client";
import Image from "next/image";
import Section from "@/components/Section";

const bp = process.env.NEXT_PUBLIC_BASE_PATH || "";

// smaller left image
const SUPPORT_IMAGE = `${bp}/images/capability/craftmenship.avif`;
// main large image
const UN_IMAGE = `${bp}/images/capability/un.avif`;

export default function Craftsmanship() {
  return (
    <Section className="bg-white !px-0" pad="sm" id="craftsmanship">
      <div className="px-4 sm:px-6 md:px-12 py-6 md:py-12">
        {/* Desktop grid: LEFT 40% / RIGHT 60% */}
        <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-8 md:gap-14 items-stretch">
          {/* LEFT COLUMN */}
          <div className="flex flex-col justify-between h-full">
            {/* Title */}
            <header>
              <p className="inline-flex items-center gap-2 text-[11px] tracking-[0.18em] uppercase text-neutral-500">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand-gold" />
                Craft
              </p>
              <h2 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-brand-ink">
                Craftsmanship
              </h2>
              <div className="mt-3 h-[3px] w-20 rounded-full bg-brand-gold" />
            </header>

            {/* Small supporting image */}
            <div className="relative mt-6 md:mt-10 mb-6 md:mb-10 self-start w-[85%] aspect-[5/4] overflow-hidden rounded-2xl ring-1 ring-neutral-200 shadow-[0_8px_20px_rgba(0,0,0,0.08)]">
              <Image
                src={SUPPORT_IMAGE}
                alt="TCC artisans preparing yarns for custom carpet design"
                fill
                className="object-cover"
              />
            </div>

            {/* Text */}
            <p className="text-[15px] sm:text-base leading-relaxed text-neutral-800">
              We treat carpet-making as both art and discipline. Every weave, tuft,
              and shade is shaped with intent—transforming wool, nylon, and viscose
              into living surfaces that respond to light and depth. Each piece carries
              the imprint of human touch and the rigor of craft, made to be felt as
              much as seen.
            </p>
          </div>

          {/* RIGHT COLUMN (hero image, same height as left on desktop) */}
          <div className="relative w-full h-[480px] md:h-full overflow-hidden rounded-2xl ring-1 ring-neutral-200 shadow-[0_18px_45px_rgba(0,0,0,0.12)]">
            <Image
              src={UN_IMAGE}
              alt="United Nations Omar Heritage Room carpet by TCC"
              fill
              className="object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-black/35 backdrop-blur-sm px-3 py-2">
              <p className="text-[10px] sm:text-[11px] font-medium tracking-wide uppercase text-white text-right">
                United Nations · Omar Heritage Room
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
