import Section from "@/components/Section";

export default function AboutC() {
  return (
    <Section id="about-approach" className="bg-gray-50">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <header className="mb-10 md:mb-14 text-center md:text-left">
          <h3 className="text-2xl md:text-3xl font-semibold tracking-tight">Our Approach</h3>
          <p className="mt-3 text-gray-600 max-w-2xl md:max-w-none">
            From the first spark to site-ready carpets — a focused, four-part collaboration.
          </p>
        </header>

        {/* Slide-5 style: images L/R, text center */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-start">
          {/* LEFT images (2 cards) */}
          <div className="md:col-span-4 order-1 md:order-1">
            <div className="grid grid-cols-1 gap-5">
              <div className="rounded-2xl border border-gray-200 p-3">
                <div className="aspect-[4/3] w-full rounded-xl bg-gray-200" />
                <div className="mt-2 h-3 w-2/3 rounded bg-gray-200" />
              </div>
              <div className="rounded-2xl border border-gray-200 p-3">
                <div className="aspect-[4/3] w-full rounded-xl bg-gray-200" />
                <div className="mt-2 h-3 w-1/2 rounded bg-gray-200" />
              </div>
            </div>
          </div>

          {/* CENTER: 1–4 (Inspire, Craft, Desire, Sustain) */}
          <div className="md:col-span-4 order-3 md:order-2">
            {/* 1 — Inspire */}
            <div className="flex items-start gap-4">
              <div className="shrink-0 rounded-full w-10 h-10 bg-black text-white flex items-center justify-center font-semibold">
                1
              </div>
              <div>
                <h4 className="text-xl md:text-2xl font-semibold">Inspire</h4>
                <p className="mt-3 text-gray-600">
                  Translate mood, palette, and spatial intent into clear directions — align scale,
                  color story, and pattern rhythm.
                </p>
              </div>
            </div>

            <div className="my-8 h-px bg-gray-200" />

            {/* 2 — Craft */}
            <div className="flex items-start gap-4">
              <div className="shrink-0 rounded-full w-10 h-10 bg-black text-white flex items-center justify-center font-semibold">
                2
              </div>
              <div>
                <h4 className="text-xl md:text-2xl font-semibold">Craft</h4>
                <p className="mt-3 text-gray-600">
                  Refine artwork, weave trials, and specifications — convert approved design into
                  Axminster or Hand-Tuft production.
                </p>
              </div>
            </div>

            <div className="my-8 h-px bg-gray-200" />

            {/* 3 — Desire */}
            <div className="flex items-start gap-4">
              <div className="shrink-0 rounded-full w-10 h-10 bg-black text-white flex items-center justify-center font-semibold">
                3
              </div>
              <div>
                <h4 className="text-xl md:text-2xl font-semibold">Desire</h4>
                <p className="mt-3 text-gray-600">
                  Shape the emotional signature — calibrate texture, sheen, and visual depth to
                  elevate the atmosphere and brand identity.
                </p>
              </div>
            </div>

            <div className="my-8 h-px bg-gray-200" />

            {/* 4 — Sustain */}
            <div className="flex items-start gap-4">
              <div className="shrink-0 rounded-full w-10 h-10 bg-black text-white flex items-center justify-center font-semibold">
                4
              </div>
              <div>
                <h4 className="text-xl md:text-2xl font-semibold">Sustain</h4>
                <p className="mt-3 text-gray-600">
                  Specify responsibly — material choices, performance, and lifecycle support aligned
                  to hospitality standards and longevity.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT images (2 cards) */}
          <div className="md:col-span-4 order-2 md:order-3">
            <div className="grid grid-cols-1 gap-5">
              <div className="rounded-2xl border border-gray-200 p-3">
                <div className="aspect-[4/3] w-full rounded-xl bg-gray-200" />
                <div className="mt-2 h-3 w-2/3 rounded bg-gray-200" />
              </div>
              <div className="rounded-2xl border border-gray-200 p-3">
                <div className="aspect-[4/3] w-full rounded-xl bg-gray-200" />
                <div className="mt-2 h-3 w-1/2 rounded bg-gray-200" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
