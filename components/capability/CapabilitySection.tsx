// components/capability/CapabilitySection.tsx
import Section from "@/components/Section";

/**
 * CapabilitySection — single long scroll section
 * Mirrors the deck flow (pp. 16, 17, 18, 20, 21, 24–26) with placeholder media.
 * Blocks:
 *  - p16  Intro: Specialization / Techniques / Materials
 *  - p17  Specialization grid (4)
 *  - p18  Axminster feature (image + text)
 *  - p20–21 Capabilities & Markets split
 *  - p21  Techniques grid (4)
 *  - p24–26 Process steps (3) with side media
 *  - Echo: Materials grid (4)
 */
export default function CapabilitySection() {
  return (
    <section id="capability" aria-label="Capabilities, Specialization, Techniques, Materials">
      {/* p16 — Intro */}
      <Section className="bg-gray-50">
        <header className="max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Specialization, Techniques, Materials
          </h2>
          <p className="mt-4 text-gray-600 leading-7">
            Craftsmanship meets technology. We merge time-honored artistry with modern precision,
            shaping surfaces with depth, rhythm, and light.
          </p>
        </header>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="aspect-[4/3] rounded-2xl bg-gray-200" />
          <div className="aspect-[4/3] rounded-2xl bg-gray-200" />
          <div className="aspect-[4/3] rounded-2xl bg-gray-200" />
        </div>
      </Section>

      {/* p17 — Specialization grid */}
      <Section>
        <h3 className="text-2xl md:text-3xl font-semibold">Specialization</h3>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Hand Tufted Carpets", copy: "Fully customizable — relief, sculpt, and detail." },
            { title: "Axminster Carpet Tiles", copy: "Modular practicality with a woven Axminster face." },
            { title: "Axminster Carpets", copy: "Durable, precise weaving with rich color clarity." },
            { title: "Hand Ax Production", copy: "Artisanal technique blended with Axminster structure." },
          ].map((it) => (
            <article key={it.title} className="rounded-2xl border border-gray-200 p-6">
              <div className="aspect-[4/3] rounded-xl bg-gray-200 mb-4" />
              <h4 className="font-medium">{it.title}</h4>
              <p className="mt-2 text-sm text-gray-600">{it.copy}</p>
            </article>
          ))}
        </div>
      </Section>

      {/* p18 — Axminster feature */}
      <Section className="bg-gray-50">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-7">
            <div className="aspect-[16/9] rounded-2xl bg-gray-200" />
          </div>
          <div className="md:col-span-5">
            <h3 className="text-2xl md:text-3xl font-semibold">Axminster Carpets</h3>
            <p className="mt-4 text-gray-700 leading-7">
              Patterns are woven in for longevity and clarity. Multiple yarn colors interlace to create
              richly textured, durable surfaces suited to hospitality environments.
            </p>
          </div>
        </div>
      </Section>

      {/* p20–21 — Capabilities & Markets split */}
      <Section>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <h3 className="text-2xl md:text-3xl font-semibold">Our Capabilities & Services</h3>
            <p className="mt-4 text-gray-700">
              Concept development, design collaboration, CAD + sampling, production, logistics,
              and site coordination — an end-to-end service model for hospitality projects.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-gray-700">
              <li>• Axminster, Hand-Tufted, and Printed Carpets</li>
              <li>• In-house dyeing and color matching</li>
              <li>• Global logistics & on-site coordination</li>
            </ul>
          </div>

          <div className="md:col-span-7">
            <h4 className="text-lg font-semibold">Markets We Serve</h4>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "Hotels & Resorts — Guestrooms, Suites, Corridors, Ballrooms",
                "Casinos & Gaming — Durable Axminster, vibrant custom patterns",
                "Cruise Liners — Lightweight, marine-grade solutions",
                "Aviation & Private Jets — Refined, bespoke details",
                "Yachts & Residences — Tailored luxury for intimate interiors",
              ].map((m) => (
                <div key={m} className="rounded-xl border border-gray-200 p-4 text-sm text-gray-700">
                  {m}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* p21 — Techniques grid */}
      <Section className="bg-gray-50">
        <h3 className="text-2xl md:text-3xl font-semibold">Techniques</h3>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { t: "Hand Tufted", d: "Tufting gun on stretched canvas; refined textures and detail." },
            { t: "Machine Woven", d: "Modern looms delivering precision and durability." },
            { t: "Hand Woven", d: "Artisan interlacing — tactile depth and quiet irregularity." },
            { t: "Digital Printing", d: "Complex designs and gradients with lasting vibrancy." },
          ].map((x) => (
            <article key={x.t} className="rounded-2xl border border-gray-200 p-6">
              <div className="aspect-[4/3] rounded-xl bg-gray-200 mb-4" />
              <h4 className="font-medium">{x.t}</h4>
              <p className="mt-2 text-sm text-gray-600">{x.d}</p>
            </article>
          ))}
        </div>
      </Section>

      {/* p24–26 — Custom Design Process */}
      <Section>
        <h3 className="text-2xl md:text-3xl font-semibold">Custom Design Process</h3>
        <p className="mt-2 text-gray-600 max-w-2xl">
          A focused, collaborative path from brief to delivery — fast sampling, reliable production,
          and coordinated shipment to site.
        </p>

        <ol className="mt-8 space-y-6">
          {[
            {
              n: "1",
              t: "Concept & Design Brief",
              d: "Translate vision into layouts, palettes, and pattern direction; align scale and spatial rhythm.",
            },
            {
              n: "2",
              t: "Sampling & Refinement",
              d: "Confirm color/texture; iterate artwork and weave trials until approved.",
            },
            {
              n: "3",
              t: "Weaving & Delivery",
              d: "Production, inspection, and global logistics coordinated to project timelines.",
            },
          ].map((s) => (
            <li key={s.n} className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-3 flex items-start gap-3">
                <div className="h-10 w-10 rounded-full bg-black text-white flex items-center justify-center font-semibold">
                  {s.n}
                </div>
                <div className="font-medium">{s.t}</div>
              </div>
              <div className="md:col-span-9">
                <p className="text-gray-700">{s.d}</p>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="aspect-[4/3] rounded-xl bg-gray-200" />
                  <div className="aspect-[4/3] rounded-xl bg-gray-200" />
                </div>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {/* Echo — Materials grid */}
      <Section className="bg-gray-50">
        <h3 className="text-2xl md:text-3xl font-semibold">Materials</h3>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { t: "Wool", d: "Soft, resilient, timeless warmth." },
            { t: "Viscose (Rayon)", d: "Silky sheen and subtle elegance." },
            { t: "Silk", d: "Lustrous refinement for elevated spaces." },
            { t: "Blend", d: "Balanced performance and luxury." },
          ].map((m) => (
            <article key={m.t} className="rounded-2xl border border-gray-200 p-6">
              <div className="aspect-[4/3] rounded-xl bg-gray-200 mb-4" />
              <h4 className="font-medium">{m.t}</h4>
              <p className="mt-2 text-sm text-gray-600">{m.d}</p>
            </article>
          ))}
        </div>
      </Section>
    </section>
  );
}
