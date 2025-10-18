// components/AlternatingCard.tsx
import Image from "next/image";
import Link from "next/link";

type AlternatingCardProps = {
  title: string;
  imageSrc: string;
  href?: string;
  /** Optional: keep your existing variant API */
  variant?: "imageTop" | "textTop";
  /** New: simple boolean to flip layout (true => textTop) */
  flip?: boolean;
  subtitle?: string; // optional small caption if needed
};

export default function AlternatingCard({
  title,
  imageSrc,
  href = "#",
  variant = "imageTop",
  flip = false,
  subtitle,
}: AlternatingCardProps) {
  // Determine layout: flip wins, otherwise use variant
  const isTextTop = flip ? true : variant === "textTop";

  const TitleBlock = (
    <div className="px-2 pt-3">
      <h3 className="text-base font-semibold tracking-tight">{title}</h3>
      {subtitle ? <p className="text-sm text-gray-500 mt-1">{subtitle}</p> : null}
    </div>
  );

  const ImageBlock = (
    <div className="relative w-full overflow-hidden rounded-2xl">
      {/* Keep aspect consistent with slides; tweak as needed */}
      <div className="aspect-[4/5]">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          priority={false}
        />
      </div>
    </div>
  );

  return (
    <li className="group list-none">
      <Link href={href} className="block">
        {isTextTop ? (
          <>
            {TitleBlock}
            {ImageBlock}
          </>
        ) : (
          <>
            {ImageBlock}
            {TitleBlock}
          </>
        )}
      </Link>
    </li>
  );
}
