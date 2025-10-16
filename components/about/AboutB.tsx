import Section from "@/components/Section";

export default function AboutB() {
  return (
    <Section className="bg-white">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
        {/* LEFT: copy */}
        <div className="md:col-span-5">
          <h3 className="text-2xl md:text-3xl font-semibold">What Makes Us Different</h3>
          <ul className="mt-6 space-y-3 text-gray-700 leading-relaxed">
            <li>• Bespoke design expertise from concept to installation.</li>
            <li>• One-stop service: sampling, weaving, logistics, site coordination.</li>
            <li>• Hospitality focus: hotels, resorts, casinos, cruise, aviation.</li>
            <li>• Global perspective with local insight and reliable QC.</li>
            <li>• Sustainability options and responsible processes.</li>
          </ul>
        </div>

        {/* RIGHT: 6-card placeholder grid (slide 4 style) */}
        <div className="md:col-span-7">
          <div className="grid grid-cols-2 gap-4 md:gap-5">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="rounded-2xl border border-gray-200 p-3">
                <div className="aspect-[4/3] w-full rounded-xl bg-gray-100" />
                <div className="mt-2 h-3 w-2/3 rounded bg-gray-200" />
                <div className="mt-1 h-3 w-1/3 rounded bg-gray-200" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
