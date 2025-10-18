import Image from "next/image";
import Link from "next/link";
import Section from "@/components/Section";

export const COLLABORATIONS = [
  { title: "Alexander’s Design", role: "Design Partner",          img: "alexanders-collection.avif", url: "https://www.alexanders-collection.com/rugs" },
  { title: "One-Interiors",       role: "Creative Direction",     img: "one.avif",                    url: "https://www.one-interior.com/" },
  { title: "TredMor®",            role: "Material Collaboration", img: "tred-mor.avif",               url: "https://commercial-carpetcushion.com/" },
  { title: "Malta Projects",      role: "Manufacturing Partner",  img: "malta-solutions.avif",        url: "https://www.maltasolutions.biz/" },
];

const bp = process.env.NEXT_PUBLIC_BASE_PATH || "";

// tiny gray blur data URL (works in Server Components)
const BLUR =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2U1ZTdlYiIvPjwvc3ZnPg==";

type CollabItem = { title: string; role?: string; img: string; url: string };

export default function CollabTeaser() {
  const items = (COLLABORATIONS as CollabItem[]).slice(0, 4);

  return (
    <Section id="collaborations" className="bg-white">
      <div className="flex items-center justify-between mb-6 md:mb-8">
        <h2 className="text-2xl md:text-3xl font-semibold">Collaborations</h2>
        <Link href="/collaborations" className="text-sm font-medium text-amber-600 hover:underline">
          View all collaborations →
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {items.map((c, i) => (
          <Link
            key={`collab-${i}`}
            href={c.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group"
            aria-label={`${c.title} — ${c.role ?? "Collaboration"}`}
          >
            <div className="relative overflow-hidden rounded-2xl bg-gray-100">
              <Image
                src={`${bp}/images/collaborations/${c.img}`}
                alt={c.title}
                width={800}
                height={600}
                className="aspect-[16/9] md:aspect-[4/3] object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"
                unoptimized
                placeholder="blur"
                blurDataURL={BLUR}
                fetchPriority={i === 0 ? "high" : "auto"}
              />
            </div>

            <div className="mt-3">
              <h3 className="text-base font-semibold text-gray-900">{c.title}</h3>
              {c.role && <p className="text-sm text-gray-500">{c.role}</p>}
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
}
