import Image from "next/image";
import Section from "@/components/Section";
import { COLLABORATIONS } from "@/app/(site)/data/collaborations";

const bp = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function CollabTeaser() {
  return (
    <Section id="collaborations" className="bg-white">
      {/* Section header */}
      <div className="flex items-end justify-between mb-6 md:mb-8">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Collaborations</h2>
        <p className="text-sm text-gray-500 md:text-base">
          Innovative partnerships that blend artistry, material science, and craftsmanship.
        </p>
      </div>

      {/* Collab grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {COLLABORATIONS.map((c, i) => (
          <div
            key={i}
            className="relative overflow-hidden rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition"
          >
            {/* image or placeholder */}
            <div className="relative aspect-[1/1] w-full">
              {c.img ? (
                <Image
                  src={`${bp}/images/collaborations/${c.img}`}
                  alt={c.title}
                  fill
                  sizes="(min-width:1024px)25vw,(min-width:640px)50vw,100vw"
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="absolute inset-0 bg-gray-200 flex items-center justify-center text-gray-400 text-sm">
                  Coming Soon
                </div>
              )}
            </div>

            {/* overlay text */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0">
              <div className="h-20 bg-gradient-to-t from-black/45 via-black/20 to-transparent"></div>
              <div className="absolute inset-x-0 bottom-0 pb-4 px-4 text-center text-white">
                <h3 className="text-base font-semibold">{c.title}</h3>
                <p className="text-xs text-gray-200 mt-1">{c.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}



