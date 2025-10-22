// app/(site)/components/gallery/PhotoGridMatrix.tsx
"use client";

import Image from "next/image";

export type MatrixItem = { id: string; src: string; alt?: string };

export default function PhotoGridMatrix({
  items, // exactly 6 images
  className = "",
  unoptimized = true,
}: {
  items: [MatrixItem, MatrixItem, MatrixItem, MatrixItem, MatrixItem, MatrixItem];
  className?: string;
  unoptimized?: boolean;
}) {
  const [A, B, C, D, E, F] = items;

  return (
    <section className={`mx-auto px-6 py-10 ${className}`}>
      {/* 3 rows × 5 cols matrix using square cells */}
      <div
        className="
          grid gap-3 justify-center
          [--s:96px] sm:[--s:120px] md:[--s:150px] lg:[--s:176px] xl:[--s:196px]
          [grid-template-columns:repeat(5,var(--s))]
          [grid-auto-rows:var(--s)]
        "
      >
        {/* Row1: | * * & % % | */}
        <Cell item={A} className="col-start-1 col-span-2 row-start-1 row-span-2" unoptimized={unoptimized} />
        <Cell item={B} className="col-start-3 col-span-1 row-start-1 row-span-1" unoptimized={unoptimized} />
        <Cell item={C} className="col-start-4 col-span-2 row-start-1 row-span-1" unoptimized={unoptimized} />

        {/* Row2: | * * @ * * | */}
        <Cell item={D} className="col-start-3 col-span-1 row-start-2 row-span-1" unoptimized={unoptimized} />

        {/* Row3: | % % % * * | */}
        <Cell item={E} className="col-start-1 col-span-3 row-start-3 row-span-1" unoptimized={unoptimized} />
        <Cell item={F} className="col-start-4 col-span-2 row-start-2 row-span-2" unoptimized={unoptimized} />
      </div>
    </section>
  );
}

function Cell({
  item,
  className = "",
  unoptimized = true,
}: {
  item: MatrixItem;
  className?: string;
  unoptimized?: boolean;
}) {
  return (
    <figure className={`relative overflow-hidden rounded-2xl bg-neutral-100 ${className}`}>
      <Image
        src={item.src}
        alt={item.alt ?? item.id}
        fill
        className="object-cover"
        sizes="(min-width:1280px)33vw,(min-width:768px)50vw,100vw"
        unoptimized={unoptimized}
      />
    </figure>
  );
}
