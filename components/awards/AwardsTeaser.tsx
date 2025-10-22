// app/(site)/components/AwardsTeasersRow.tsx
"use client";

import { useMemo } from "react";
import Section from "@/components/Section";
import AlternatingCard from "@/components/AlternatingCard";
import { useRouter } from "next/navigation";
import { useVideoModal } from "@/components/VideoModalProvider";

const bp = process.env.NEXT_PUBLIC_BASE_PATH || "";

// simple SVG placeholder (kept for the 3rd card for now)
const PH = `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 500'><rect width='100%' height='100%' fill='%23f5f6f7'/><rect x='0' y='0' width='100%' height='6' fill='%23D6A354'/></svg>`.replace(/\s+/g, " ");

const AWARDS = [
  {
    title: "Sands Supplier Excellence Award",
    subtitle: "Sands",
    href: "/gallery/sands-supplier-excellence-award",
    imageSrc: `${bp}/images/awards/china_sands.avif`,   // ✅ 1st image
  },
  {
    title: "Marina Bay Singapore Award",
    subtitle: "Marina Bay Sands",
    href: "/gallery/marina-bay-singapore-award",
    imageSrc: `${bp}/images/awards/mbs.avif`,           // ✅ 2nd image
  },
  {
    title: "International Design Excellence (Placeholder)",
    subtitle: "—",
    href: "/gallery/industry-excellence-placeholder",
    imageSrc: PH,                                       // ✅ keep placeholder
  },
];

export default function AwardsTeasersRow() {
  const router = useRouter();
  const video = useVideoModal();

  const [A1, A2orig, A3] = AWARDS;

  // Middle card copy tweak (uses same MBS image)
  const A2 = useMemo(
    () => ({
      ...A2orig,
      title: "Featured by Marina Bay Sands",
      subtitle: "Editorial story & film",
      imageSrc: `${bp}/images/awards/mbs.avif`,
    }),
    [A2orig]
  );

  const VIDYARD_EMBED =
    "https://play.vidyard.com/JNxZaBziQScXCg16EhGpvU.html?autoplay=1&muted=1&controls=1&v=4.1";
  const galleryHref = "/gallery/marina-bay-singapore-award";

  const handlePlay = () => {
    video.open(VIDYARD_EMBED);            // open modal
    router.push(galleryHref, { scroll: true }); // navigate behind modal
  };

  return (
    <Section id="awards" className="bg-neutral-50 text-brand-ink">
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-semibold inline-flex items-center gap-3">
          <span className="inline-block h-[3px] w-8 bg-brand-gold rounded-full" />
          Recognitions & Awards
        </h2>
        <p className="mt-2 text-sm text-neutral-600">Quiet, editorial proof—trusted by category leaders.</p>
      </div>

      <ul
        className="
          mt-6 flex items-start justify-center
          gap-6 sm:gap-10 md:gap-[50px]
          [&>li]:w-[210px] sm:[&>li]:w-[230px] md:[&>li]:w-[250px]
        "
      >
        {/* Left card (Sands) */}
        <AlternatingCard
          {...A1}
          variant="imageTop"
          className="relative top-3"
        />

        {/* Middle: press/video card (MBS) */}
        <li className="relative -top-3 md:-top-4">
          <button onClick={handlePlay} className="group block w-full text-left" aria-label="Play MBS film">
            <div className="relative">
              <AlternatingCard
                {...A2}
                variant="imageTop"
                href={undefined} // whole card acts as the button
              />
              {/* Play badge overlay */}
              <span className="absolute inset-0 pointer-events-none flex items-center justify-center">
                <span className="inline-flex items-center gap-2 rounded-full bg-black/55 group-hover:bg-black/70 px-3 py-1.5 text-xs font-semibold text-white transition">
                  ▶ Play film
                </span>
              </span>
            </div>
            {/* Small text link to article under the card */}
            <a href={galleryHref} className="mt-2 block text-xs text-neutral-600 underline underline-offset-4">
              Read the MBS story →
            </a>
          </button>
        </li>

        {/* Right card (placeholder for now) */}
        <AlternatingCard
          {...A3}
          variant="imageTop"
          className="relative top-5"
        />
      </ul>
    </Section>
  );
}
