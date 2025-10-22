// app/(site)/library/page.tsx
import Image from "next/image";
import { LIBRARY_IMAGES } from "@/app/(site)/data/library";

const bp = process.env.NEXT_PUBLIC_BASE_PATH || "";

// demo-only random tag
const TAGS = ["Axminster", "Hand-Tufted", "Printed", "Blend", "Wool", "Silk", "Viscose"];

function titleFromFilename(name: string) {
  const base = name.replace(/\.[^.]+$/, "");
  return base.replace(/[-_]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function LibraryPage() {
  const items = LIBRARY_IMAGES.map((img) => ({
    ...img,
    tag: TAGS[Math.floor(Math.random() * TAGS.length)],
  }));

  return (
    <div className="mx-auto max-w-6xl px-6 py-24">
      {/* Header */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-start mb-10 md:mb-14">
        <div className="md:col-span-4">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Library</h1>
        </div>
        <div className="md:col-span-7 md:col-start-6">
          <p className="text-gray-700 leading-7">
            A curated collection of patterns and textures. Each sample is a starting point — refined through
            collaboration, sampling, and material selection.
          </p>
        </div>
      </div>

      {/* Grid (square tiles, non-clickable) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {items.map(({ filename, tag }) => {
          const title = titleFromFilename(filename);
          const src = `${bp}/images/library/${filename}`;
          return (
            <div
              key={filename}
              className="relative overflow-hidden rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition"
            >
              {/* Square image */}
              <div className="relative aspect-[1/1] w-full">
                <Image
                  src={src}
                  alt={title}
                  fill
                  sizes="(min-width:1024px)33vw,(min-width:640px)50vw,100vw"
                  className="object-cover"
                  priority
                />
              </div>

              {/* Top-right tag badge */}
              <div className="pointer-events-none absolute top-3 right-3 bg-amber-600 text-white text-xs font-medium px-2 py-1 rounded-full shadow">
                {tag}
              </div>

              {/* Bottom-centered title over gradient */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0">
                <div className="h-20 bg-gradient-to-t from-black/45 via-black/20 to-transparent"></div>
                <div className="absolute inset-x-0 bottom-0 pb-4 px-4">
                  <h3 className="text-center text-white text-base font-semibold drop-shadow-sm">
                    {title}
                  </h3>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
