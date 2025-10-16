"use client";
import Link from "next/link";

type Card = {
  slug?: string;            // present = clickable
  title: string;
  location: string;
  disabled?: boolean;
};

const CARDS: Card[] = [
  { slug: "the-londoner-hotel", title: "The Londoner Hotel", location: "Macau, China" },
  { slug: "park-hyatt-niseko",  title: "Park Hyatt Niseko Hanazono Hotel", location: "Hokkaido, Japan" },
  { title: "The Langham",       location: "London, UK", disabled: true },
  { title: "Hyatt Regency Trivandrum", location: "Trivandrum, India", disabled: true },
  { title: "FWD House 1881",   location: "Hongkong, China", disabled: true },
];

function ProjectTile({ card }: { card: Card }) {
  const content = (
    <div
      className={`relative aspect-[3/4] w-full rounded-2xl overflow-hidden
        bg-gray-200 shadow-sm group
        ${card.disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer hover:shadow-lg transition"}
      `}
    >
      {/* image placeholder */}
      <div className="absolute inset-0 bg-gray-300" />
      {/* dark overlay for legibility */}
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/45 transition" />
      {/* bottom text */}
      <div className="absolute inset-x-0 bottom-0 p-4 md:p-5 text-white">
        <div className="text-lg md:text-xl font-bold leading-tight drop-shadow">
          {card.title}
        </div>
        <div className="text-xs md:text-sm opacity-90">{card.location}</div>
      </div>
    </div>
  );

  if (card.disabled || !card.slug) return content;
  return <Link href={`/projects/${card.slug}`}>{content}</Link>;
}

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-24">
      {/* Top header row: left = big heading, right = paragraph */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-start mb-10 md:mb-14">
        <div className="md:col-span-3">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Hotel</h1>
        </div>
        <div className="md:col-span-6 md:col-start-5">
          <p className="text-gray-700 leading-7">
            TCC Carpets collaborates with world-renowned hotels to craft bespoke flooring solutions
            that embody luxury, comfort, and identity. Each design is tailored to complement the
            architectural character of its environment, from grand lobbies and corridors to intimate
            guest suites.
          </p>
        </div>
      </div>

      {/* Card row (5-up on large screens) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6 md:gap-8">
        {CARDS.map((c) => (
          <ProjectTile key={c.title} card={c} />
        ))}
      </div>
    </div>
  );
}
