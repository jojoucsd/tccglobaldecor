"use client";
import Image from "next/image";
import Section from "@/components/Section";

const bp = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function Craftsmanship() {
  return (
    <Section className="bg-white !px-0" pad="sm" id="craftsmanship">
      <div className="grid grid-cols-1 md:grid-cols-2 items-center">
        {/* Left: title + copy */}
        <div className="h-auto md:min-h-[56vh] px-4 sm:px-6 md:px-12 py-6 md:py-12 flex flex-col">
          <header>
            <p className="inline-flex items-center gap-2 text-[11px] tracking-[0.18em] uppercase text-neutral-500">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand-gold" />
              Craft
            </p>
            <h2 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
              Craftsmanship
            </h2>
            <div className="mt-3 h-[3px] w-20 rounded-full bg-brand-gold" />
          </header>
          <div className="hidden md:block flex-1" />
          <p className="mt-3 md:mt-0 text-[15px] sm:text-base leading-relaxed text-neutral-800 max-w-[38ch]">
            We merge time-honored artistry with modern precision—transforming wool,
            nylon, and viscose into surfaces that move with light and texture. Each piece
            carries the rhythm of human touch and the harmony of technology.
          </p>
        </div>

        {/* Right: image */}
        <div className="relative mx-4 sm:mx-6 md:mx-12 my-4 md:my-10">
          <div className="relative h-56 sm:h-64 md:h-[60vh] w-full overflow-hidden rounded-2xl ring-1 ring-neutral-200">
            <Image
              src={`${bp}/images/capability/capability-01.avif`}
              alt="TCC craftsmanship in carpet design"
              fill
              className="object-cover"
              priority={false}
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
