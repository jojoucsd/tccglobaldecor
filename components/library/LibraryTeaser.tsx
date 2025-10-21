// app/(site)/components/LibraryTeaser.tsx
import Link from "next/link";
import Image from "next/image";
import Section from "@/components/Section";
import { getRandomLibraryImages } from "@/app/(site)/data/library";

const bp = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function LibraryTeaser() {
  const images = getRandomLibraryImages(4);

  return (
    <Section id="library" className="bg-white text-brand-ink">
      {/* Header */}
      <div className="flex items-end justify-between">
        <h2 className="text-2xl md:text-3xl font-semibold flex items-center gap-3">
          <span className="inline-block h-[3px] w-8 bg-brand-gold rounded-full" />
          Library
        </h2>
        <Link
          href="/library"
          className="text-sm font-medium text-brand-gold hover:text-brand-gold-deep transition-colors"
        >
          View full library →
        </Link>
      </div>

      {/* Image grid */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {images.map((img) => (
          <Link
            key={img.filename}
            href="/library"
            className="group block border border-neutral-200 bg-neutral-50 overflow-hidden hover:ring-2 hover:ring-brand-gold transition"
          >
            <div className="relative aspect-square w-full">
              <Image
                src={`${bp}/images/library/${img.filename}`}
                alt="Library sample"
                fill
                sizes="(min-width:1024px)25vw,(min-width:640px)50vw,100vw"
                className="object-cover"
                priority
              />
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
}
