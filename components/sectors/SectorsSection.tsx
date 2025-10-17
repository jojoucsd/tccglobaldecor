import Section from "@/components/Section";
import Link from "next/link";
import Image from "next/image";

const prefix =
  process.env.NEXT_PUBLIC_BASE_PATH && process.env.NEXT_PUBLIC_BASE_PATH !== ""
    ? process.env.NEXT_PUBLIC_BASE_PATH
    : "";

// ---- Types ----
type Sector = {
  title: string;
  blurb: string;
  href?: string; // presence => clickable
  image: string;
};

// ---- Data ----
const sectors: Sector[] = [
  {
    title: "Hotel",
    blurb: "Custom carpets that bring elegance and comfort...",
    href: "/projects",
    image: `${prefix}/images/sectors/hotel.avif`,
  },
  {
    title: "Casino",
    blurb: "Vibrant and durable flooring...",
    href: "/projects",
    image: `${prefix}/images/sectors/casino.avif`,
  },
  {
    title: "Cruise",
    blurb:
      "Marine-grade carpets combining beauty, safety, and performance.",
    image: `${prefix}/images/sectors/cruise.avif`,
  },
  {
    title: "Aviation",
    blurb:
      "Lightweight and refined designs crafted for private and business jets.",
    image: `${prefix}/images/sectors/aviation.avif`,
  },
  {
    title: "Yacht",
    blurb:
      "Bespoke hand-tufted carpets that express luxury and craftsmanship onboard.",
    image: `${prefix}/images/sectors/yacht.avif`,
  },
  {
    title: "Retail",
    blurb:
      "Distinctive flooring solutions enhancing the identity of global destinations.",
    image: `${prefix}/images/sectors/retail.avif`,
  },
];

export default function ProjectsSectors() {
  return (
    <Section id="projects" className="bg-white">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
        {/* left grid */}
        <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {sectors.map((s) => {
            const CardInner = (
              <article
                className={`group ${s.href ? "cursor-pointer hover:scale-[1.02] hover:shadow-md transition" : "opacity-60"} `}
                aria-disabled={s.href ? undefined : true}
              >
                {/* image */}
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl mb-3 bg-gray-200">
                  <Image
                    src={s.image}              // absolute path string (GH Pages-safe)
                    alt={s.title}
                    fill
                    sizes="(min-width:1024px) 20vw, (min-width:640px) 33vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    unoptimized
                    priority={false}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
                </div>

                {/* text */}
                <h4 className="text-lg font-semibold text-amber-600">{s.title}</h4>
                <p className="mt-1 text-sm text-gray-700 leading-relaxed">{s.blurb}</p>
              </article>
            );

            return s.href ? (
              <Link key={s.title} href={s.href} aria-label={`${s.title} projects`}>
                {CardInner}
              </Link>
            ) : (
              <div key={s.title} role="article" aria-disabled className="select-none">
                {CardInner}
              </div>
            );
          })}
        </div>

        {/* right text block */}
        <aside className="md:col-span-4 md:flex md:flex-col md:justify-center">
          <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight">Sectors</h3>
          <p className="mt-4 text-gray-700 leading-7">
            TCC Carpets offers comprehensive solutions across the full spectrum of commercial interiors.
            From luxury hotels and casinos to yachts, cruises, and private aviation, our expertise extends
            to every environment where design and performance meet. Through close collaboration with
            architects, designers, and global brands, we deliver tailored flooring that embodies aesthetic
            excellence, technical precision, and lasting quality.
          </p>
        </aside>
      </div>
    </Section>
  );
}
