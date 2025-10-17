// app/(site)/components/LibraryTeaser.tsx
import Link from "next/link";
import Image from "next/image";
import Section from "@/components/Section";
import { getRandomLibraryImages } from "@/app/(site)/data/library";

const bp = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function LibraryTeaser() {
  const images = getRandomLibraryImages(4);

  return (
    <Section id="library" className="bg-white">
      <div className="flex items-end justify-between">
        <h2 className="text-2xl md:text-3xl font-semibold">Library</h2>
        <Link href="/library" className="text-amber-600 hover:underline text-sm">
          View full library →
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {images.map((img) => (
          <Link
            key={img.filename}
            href="/library"
            className="group block rounded-2xl border border-gray-200 overflow-hidden hover:shadow-md transition"
          >
            <div className="relative aspect-[4/3] w-full">
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

