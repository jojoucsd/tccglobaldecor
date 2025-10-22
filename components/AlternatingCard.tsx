// components/AlternatingCard.tsx
import Image from "next/image";
import Link from "next/link";

type AlternatingCardProps = {
  title: string;
  imageSrc: string;
  href?: string;
  variant?: "imageTop" | "textTop";
  flip?: boolean;
  subtitle?: string;
  className?: string;
  compact?: boolean;
  /** NEW: render only image when false (externalize text) */
  showText?: boolean; // <-- added
};

export default function AlternatingCard({
  title,
  imageSrc,
  href = "#",
  variant = "imageTop",
  flip = false,
  subtitle,
  className = "",
  compact = false,
  showText = true, // <-- default keeps old behavior
}: AlternatingCardProps) {
  const isTextTop = flip ? true : variant === "textTop";

  const titleClass = compact
    ? "text-[13px] sm:text-sm font-semibold tracking-tight"
    : "text-base font-semibold tracking-tight";

  const subtitleClass = compact
    ? "hidden sm:block text-xs text-gray-500 mt-0.5"
    : "text-sm text-gray-500 mt-1";

  const titlePadding = compact
    ? "px-1.5 pt-2 pb-1"
    : `px-2 pt-3 ${isTextTop ? "pb-2" : ""}`;

  // compact only affects mobile; desktop keeps your original look
  const imageAspect = compact ? "aspect-square sm:aspect-[4/5]" : "aspect-[4/5]";
  const imageRound  = compact ? "rounded-xl sm:rounded-2xl" : "rounded-2xl";

  const TitleBlock = showText ? (
    <div className={titlePadding}>
      <h3 className={titleClass}>{title}</h3>
      {subtitle ? <p className={subtitleClass}>{subtitle}</p> : null}
    </div>
  ) : null;

  const ImageBlock = (
    <div className={`relative w-full overflow-hidden ${imageRound}`}>
      <div className={imageAspect}>
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
    <li className={`group list-none ${className}`}>
      <Link href={href} className="block focus:outline-none">
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
