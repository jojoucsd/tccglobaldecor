// components/Card.tsx
import Link from "next/link";
import type { ReactNode } from "react";

export type CardProps = {
  title: string;
  description?: string;
  href?: string;
  media?: ReactNode;
  className?: string;
  children?: ReactNode; // ✅ allows flexible custom content
};

export default function Card({
  title,
  description,
  href = "#",
  media = <div className="aspect-[4/3] rounded-xl bg-gray-200 mb-4" aria-hidden="true" />,
  className = "",
  children,
}: CardProps) {
  const content = (
    <article
      className={`rounded-2xl border border-gray-200 p-6 hover:shadow-sm transition focus:outline-none focus:ring-2 focus:ring-black ${className}`}
      role="listitem"
    >
      {media}
      <h4 className="font-medium">{title}</h4>
      {description && (
        <p className="mt-2 text-sm text-gray-600 hidden md:block">{description}</p>
      )}
      {children && <div className="mt-3">{children}</div>}
    </article>
  );

  return (
    <Link href={href} className="block focus:outline-none focus:ring-0">
      {content}
    </Link>
  );
}
