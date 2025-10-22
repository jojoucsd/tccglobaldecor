// app/(site)/components/AwardsTeasersRow.tsx
"use client";

import { useState, useMemo } from "react";
import Section from "@/components/Section";
import AlternatingCard from "@/components/AlternatingCard";

const PH = `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 500'><rect width='100%' height='100%' fill='%23f5f6f7'/><rect x='0' y='0' width='100%' height='6' fill='%23D6A354'/></svg>`.replace(/\s+/g, " ");

const AWARDS = [
  {
    title: "Marina Bay Singapore Award",
    subtitle: "Marina Bay Sands",
    href: "/gallery/marina-bay-singapore-award",
    imageSrc: PH,
  },
  {
    title: "Sands Supplier Excellence Award",
    subtitle: "Sands",
    href: "/gallery/sands-supplier-excellence-award",
    imageSrc: PH,
  },
  {
    title: "International Design Excellence (Placeholder)",
    subtitle: "—",
    href: "/gallery/industry-excellence-placeholder",
    imageSrc: PH,
  },
];

// ⚡️ New: a light VideoModal (no deps)
function VideoModal({
  open,
  onClose,
  src,
  title = "Marina Bay Sands — Art That You Can Walk On",
}: {
  open: boolean;
  onClose: () => void;
  src: string;
  title?: string;
}) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-[90] bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <iframe
          title={title}
          src={src}
          allow="autoplay; fullscreen; picture-in-picture"
          className="h-full w-full"
          loading="eager"
        />
        <button
          onClick={onClose}
          className="absolute top-2 right-2 rounded-full bg-white/90 hover:bg-white px-3 py-1 text-xs font-semibold text-black"
          aria-label="Close video"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default function AwardsTeasersRow() {
  const [videoOpen, setVideoOpen] = useState(false);

  // Reuse your three cards but swap the *middle* one to be the press/video card
  const [A1, A2orig, A3] = AWARDS;

  const A2 = useMemo(
    () => ({
      ...A2orig,
      title: "Featured by Marina Bay Sands",
      subtitle: "Editorial story & film",
      // Use a real still if you have one; PH for now
      imageSrc: PH,
    }),
    [A2orig]
  );

  const VIDYARD_URL =
    "https://share.vidyard.com/watch/JNxZaBziQScXCg16EhGpvU";

  return (
    <Section id="awards" className="bg-neutral-50 text-brand-ink">
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-semibold inline-flex items-center gap-3">
          <span className="inline-block h-[3px] w-8 bg-brand-gold rounded-full" />
          Recognitions & Awards
        </h2>
        <p className="mt-2 text-sm text-neutral-600">
          Quiet, editorial proof—trusted by category leaders.
        </p>
      </div>

      {/* Row of 3 cards */}
      <ul
        className="
          mt-6 flex items-start justify-center
          gap-6 sm:gap-10 md:gap-[50px]
          [&>li]:w-[210px] sm:[&>li]:w-[230px] md:[&>li]:w-[250px]
        "
      >
        {/* Left card */}
        <AlternatingCard {...A1} variant="imageTop" className="relative top-3" />

        {/* Middle: press/video card */}
        <li className="relative -top-3 md:-top-4">
          <button
            onClick={() => setVideoOpen(true)}
            className="group block w-full text-left"
            aria-label="Play Marina Bay Sands film about TCC"
          >
            <div className="relative">
              <AlternatingCard
                {...A2}
                variant="imageTop"
                href={undefined} // make entire card a button instead of link
              />
              {/* Play badge overlay */}
              <span
                className="
                  absolute inset-0 pointer-events-none flex items-center justify-center
                "
              >
                <span
                  className="
                    inline-flex items-center gap-2 rounded-full
                    bg-black/55 group-hover:bg-black/70
                    px-3 py-1.5 text-xs font-semibold text-white
                    transition
                  "
                >
                  ▶ Play film
                </span>
              </span>
            </div>
            {/* Tiny sub-link to the article under the card */}
            <span className="mt-2 block text-xs text-neutral-600 underline underline-offset-4">
              Read the MBS story →
            </span>
          </button>
        </li>

        {/* Right card */}
        <AlternatingCard {...A3} variant="imageTop" className="relative top-5" />
      </ul>

      <div className="mt-6 text-center">
        <a
          href="/awards"
          className="text-sm font-medium text-brand-gold hover:text-brand-gold-deep"
        >
          View all →
        </a>
      </div>

      {/* Modal mounts at the end to avoid stacking issues */}
      <VideoModal
        open={videoOpen}
        onClose={() => setVideoOpen(false)}
        src={VIDYARD_URL}
      />
    </Section>
  );
}
