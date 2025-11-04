// app/(site)/components/AwardsTeasersRow.tsx
"use client";

import { useMemo } from "react";
import Section from "@/components/Section";
import AlternatingCard from "@/components/AlternatingCard";
import { useRouter } from "next/navigation";
import { useVideoModal } from "@/components/VideoModalProvider";

const bp = process.env.NEXT_PUBLIC_BASE_PATH || "";

// simple SVG placeholder (optional)
const PH = `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 500'><rect width='100%' height='100%' fill='%23f5f6f7'/><rect x='0' y='0' width='100%' height='6' fill='%23D6A354'/></svg>`.replace(/\s+/g, " ");

// ➕ now 4 cards
const AWARDS = [
  {
    title: "Sands Supplier Excellence Service Award",
    href: "/gallery/sands-supplier-excellence-award",
    imageSrc: `${bp}/images/awards/china_sands.avif`,
  },
  {
    title: "Marina Bay Singapore Regional Award",
    href: "/gallery/marina-bay-singapore-award",
    imageSrc: `${bp}/images/awards/mbs.avif`,
  },
  {
    title: "Grand Imperial Court Winner & Honoree",
    href: "/gallery/gold-key-award",
    imageSrc: `${bp}/images/awards/gold-key.avif`,
  },
  {
    title: "The Design Awards Winner",
    href: "/gallery/thedesignawards",
    imageSrc: `${bp}/images/awards/designetal.avif`,
  },
];

export default function AwardsTeasersRow() {
  const router = useRouter();
  const video = useVideoModal();

  const [A1, A2orig, A3, A4] = AWARDS;

  // Middle card copy tweak (same MBS image)
  const A2 = useMemo(
    () => ({
      ...A2orig,
      title: "Marina Bay Sands Recognition",
      imageSrc: `${bp}/images/awards/mbs.avif`,
    }),
    [A2orig]
  );

  const VIDYARD_EMBED =
    "https://play.vidyard.com/JNxZaBziQScXCg16EhGpvU.html?autoplay=1&muted=1&controls=1&v=4.1";
  const galleryHref = "/gallery/marina-bay-singapore-award";

  const handlePlay = () => {
    video.open(VIDYARD_EMBED);
    router.push(galleryHref, { scroll: true });
  };

  return (
    <Section id="awards" className="bg-neutral-50 text-brand-ink pt-10 pb-14 sm:pt-12 sm:pb-16">
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-semibold inline-flex items-center gap-3">
          <span className="inline-block h-[3px] w-8 bg-brand-gold rounded-full" />
          Recognitions & Awards
        </h2>
        <p className="mt-2 text-sm text-neutral-600">
          Quiet, editorial proof — trusted by category leaders.
        </p>
      </div>

      <ul
        className="
          mt-6 flex flex-wrap items-start justify-center
          gap-6 sm:gap-10 md:gap-[50px]
          [&_h3]:text-center [&_h3]:line-clamp-2
        "
      >
        {/* 1 — keep your fixed widths; allow wrapping on mobile */}
        <li
          className="
            basis-[45%] max-w-[240px] sm:basis-auto
            w-[210px] sm:w-[230px] md:w-[250px]
            relative md:top-3
          "
        >
          <AlternatingCard {...A1} variant="imageTop" className="w-full" />
        </li>

        {/* 2 — video/press card */}
        <li
          className="
            basis-[45%] max-w-[240px] sm:basis-auto
            w-[210px] sm:w-[230px] md:w-[250px]
            relative md:-top-3 md:-top-4
          "
        >
          <button
            onClick={handlePlay}
            className="group block w-full text-left"
            aria-label="Play MBS film"
          >
            <div className="relative">
              <AlternatingCard {...A2} variant="imageTop" href={undefined} className="w-full" />
              {/* Play badge overlay */}
              <span className="absolute inset-0 pointer-events-none flex items-center justify-center">
                <span className="inline-flex items-center gap-2 rounded-full bg-black/55 group-hover:bg-black/70 px-3 py-1.5 text-xs font-semibold text-white transition">
                  ▶ Play
                </span>
              </span>
            </div>
          </button>
        </li>

        {/* 3 */}
        <li
          className="
            basis-[45%] max-w-[240px] sm:basis-auto
            w-[210px] sm:w-[230px] md:w-[250px]
            relative md:top-5
          "
        >
          <AlternatingCard {...A3} variant="imageTop" className="w-full" />
        </li>

        {/* 4 — new */}
        <li
          className="
            basis-[45%] max-w-[240px] sm:basis-auto
            w-[210px] sm:w-[230px] md:w-[250px]
            relative md:-top-1
          "
        >
          <AlternatingCard {...A4} variant="imageTop" className="w-full" />
        </li>
      </ul>
    </Section>
  );
}
