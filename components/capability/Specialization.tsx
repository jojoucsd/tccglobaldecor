// components/capability/Specialization.tsx
"use client";
import Link from "next/link";
import Section from "@/components/Section";
import AlternatingCard from "@/components/AlternatingCard";

const bp = process.env.NEXT_PUBLIC_BASE_PATH || "";

const ITEMS = [
  {
    title: "Hand Tufted",
    subtitle:
      "Where color, texture, and form converge — every rug a signature work of art.",
    imageSrc: `${bp}/images/capability/hand-tufted.avif`,
    href: "/gallery/hand-tufted",
  },
  {
    title: "Axminster",
    subtitle:
      "Expertly woven in 7-pitch precision with up to 16 colors — a seamless balance of strength and artistry.",
    imageSrc: `${bp}/images/capability/axminster.avif`,
    href: "/gallery/axminster",
  },
  {
    title: "Hand-Ax",
    subtitle:
      "Where artisanal warmth meets Axminster precision — the perfect harmony of handcraft and technology.",
    imageSrc: `${bp}/images/capability/hand-ax.avif`,
    href: "/gallery/hand-ax",
  },
  {
    title: "Ax-Tiles",
    subtitle:
      "Modular precision meets Axminster craftsmanship — refined aesthetics in a practical format.",
    imageSrc: `${bp}/images/capability/ax-tile.avif`,
    href: "/gallery/ax-tiles",
  },
  {
    title: "Printed Carpet",
    subtitle:
      "Precision dye-printing offers limitless creative freedom — vibrant color and seamless gradient expression.",
    imageSrc: `${bp}/images/capability/printed-carpet.avif`,
    href: "/gallery/printed-carpet",
  },
  {
    title: "Machine Tufted",
    subtitle:
      "Bespoke shapes, sculpted textures, and tailored edges — design pieces crafted for each interior.",
    imageSrc: `${bp}/images/capability/machine-tufted.avif`,
    href: "/gallery/machine-tufted",
  },
];

export default function Specialization() {
  return (
    <Section
      className="bg-gray-50 text-brand-ink"
      id="specialization"
      pad="sm"
      padTop={false}
    >
      <header className="mb-6 md:mb-12">
        <h3 className="text-2xl md:text-3xl font-semibold flex justify-center items-center gap-3 text-center">
          <span className="inline-block h-[3px] w-8 bg-brand-gold rounded-full" />
          Specialization
        </h3>
        <p className="mt-2 text-sm md:text-base text-neutral-600 max-w-2xl mx-auto text-center">
          From hand-tufted masterpieces to Axminster innovations — our
          craftsmanship spans artistry, technology, and versatility.
        </p>
      </header>

      <ul
        className={[
          // Mobile: 3×2 one-screen; Desktop: 6 across with larger gaps
          "grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 lg:gap-6",
          "[&_h4]:text-brand-ink", // ✅ switched from gold to black
        ].join(" ")}
        role="list"
        aria-label="Specialization items"
      >
        {ITEMS.map((it, i) => {
          const isTextTopDesktop = i % 2 !== 0; // mirror your original variant logic
          return (
            <li key={it.title} className="flex flex-col">
              {/* Desktop: show title/subtitle ABOVE the image for odd cards */}
              {isTextTopDesktop && (
                <div className="hidden lg:block px-1.5 lg:px-0 pb-2">
                  <h4 className="text-sm font-semibold tracking-tight">
                    {it.title}
                  </h4>
                  <p className="hidden sm:block text-sm text-gray-500 mt-1">
                    {it.subtitle}
                  </p>
                </div>
              )}

              {/* Image-only card; compact affects mobile, desktop stays your original shape */}
              <AlternatingCard
                title={it.title}
                subtitle={it.subtitle}
                imageSrc={it.imageSrc}
                href={it.href}
                compact
                showText={false} // image only inside the card
                className="transition-transform duration-300 hover:-translate-y-1"
              />

              {/* Mobile & default desktop: title/subtitle BELOW the image (or for even cards on desktop) */}
              <div
                className={`px-1.5 lg:px-0 pt-2 ${
                  isTextTopDesktop ? "lg:hidden" : ""
                }`}
              >
                <h4 className="text-[13px] sm:text-sm font-semibold tracking-tight">
                  {it.title}
                </h4>
                <p className="hidden sm:block text-sm text-gray-500 mt-1">
                  {it.subtitle}
                </p>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="mt-6 md:mt-8 flex justify-center md:justify-end md:pr-12">
        <Link
          href="/process"
          className="inline-flex items-center gap-2 rounded-full bg-brand-gold hover:bg-brand-gold-deep px-5 py-2 text-sm font-semibold text-brand-ink shadow-sm transition-colors"
        >
          <span>Our Process</span>
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </Section>
  );
}
