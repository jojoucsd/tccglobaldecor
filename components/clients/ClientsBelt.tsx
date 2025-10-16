"use client";
import { useEffect, useState } from "react";
import Section from "@/components/Section";

type Logo = {
  src: string;   // e.g. "/img/clients/hyatt.svg"
  alt: string;   // e.g. "Hyatt"
  href?: string; // optional link
};

export default function ClientsBelt({
  id,
  title = "Trusted by leading hospitality brands",
  logos,
  className = "",
}: {
  id?: string;
  title?: string;
  logos: Logo[];
  className?: string;
}) {
  // Respect prefers-reduced-motion
  const [reduceMotion, setReduceMotion] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  // Duplicate logos to make the loop seamless
  const loop = [...logos, ...logos];

  return (
    <Section id={id} className={`py-10 md:py-12 bg-white ${className}`}>
      <p className="mb-6 text-center text-xs uppercase tracking-widest text-gray-500">
        {title}
      </p>

      <div
        className="relative overflow-hidden"
        aria-label="Client logos carousel"
        role="region"
      >
        {/* gradient fades on edges */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-white to-transparent" />

        {/* belt */}
        <div
          className={`flex gap-10 md:gap-14 items-center will-change-transform ${
            reduceMotion ? "" : "animate-clients-marquee"
          }`}
          onMouseEnter={(e) => !reduceMotion && e.currentTarget.classList.add("pause-animation")}
          onMouseLeave={(e) => e.currentTarget.classList.remove("pause-animation")}
        >
          {loop.map((logo, i) => {
            const content = (
              <img
                src={logo.src}
                alt={logo.alt}
                className="h-8 md:h-10 opacity-80 hover:opacity-100 transition
                           grayscale hover:grayscale-0"
                loading="lazy"
                decoding="async"
              />
            );
            return (
              <div key={i} className="shrink-0">
                {logo.href ? (
                  <a href={logo.href} target="_blank" rel="noreferrer noopener" aria-label={logo.alt}>
                    {content}
                  </a>
                ) : (
                  content
                )}
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
