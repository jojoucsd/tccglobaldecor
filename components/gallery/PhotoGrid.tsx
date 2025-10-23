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
      {/* Mobile: 3 cols   ·  md+: 5 cols */}
      <div
        className="
          grid gap-3 justify-center
          [--s:92px] sm:[--s:110px] md:[--s:150px] lg:[--s:176px] xl:[--s:196px]
          [grid-template-columns:repeat(3,var(--s))]
          md:[grid-template-columns:repeat(5,var(--s))]
          [grid-auto-rows:var(--s)]
        "
      >
        {/* ===== MOBILE (default) =====
           1 1 2
           1 1 4
           5 5 5
           5 5 5
           3 3 3
           3 3 3
           6 6 6
           6 6 6
        */}

        {/* A: 2x2 block at top-left (rows 1-2, cols 1-2) */}
        <Cell
          item={A}
          className="
            col-start-1 col-span-2 row-start-1 row-span-2
            md:col-start-1 md:col-span-2 md:row-start-1 md:row-span-2
          "
          unoptimized={unoptimized}
        />

        {/* B: (col 3, row 1) on mobile; md+: row1 col3 */}
        <Cell
          item={B}
          className="
            col-start-3 col-span-1 row-start-1 row-span-1
            md:col-start-3 md:row-start-1 md:col-span-1 md:row-span-1
          "
          unoptimized={unoptimized}
        />

        {/* C: full-width 2 rows lower on mobile; md+: row1 cols 4-5 */}
        <Cell
          item={C}
          className="
            col-start-1 col-span-3 row-start-5 row-span-2
            md:col-start-4 md:col-span-2 md:row-start-1 md:row-span-1
          "
          unoptimized={unoptimized}
        />

        {/* D: (col 3, row 2) on mobile; md+: row2 col3 */}
        <Cell
          item={D}
          className="
            col-start-3 col-span-1 row-start-2 row-span-1
            md:col-start-3 md:row-start-2 md:col-span-1 md:row-span-1
          "
          unoptimized={unoptimized}
        />

        {/* E: full-width 2 rows (rows 3-4) on mobile; md+: row3 cols 1-3 */}
        <Cell
          item={E}
          className="
            col-start-1 col-span-3 row-start-3 row-span-2
            md:col-start-1 md:col-span-3 md:row-start-3 md:row-span-1
          "
          unoptimized={unoptimized}
        />

        {/* F: full-width 2 rows lowest on mobile; md+: rows 2-3 cols 4-5 */}
        <Cell
          item={F}
          className="
            col-start-1 col-span-3 row-start-7 row-span-2
            md:col-start-4 md:col-span-2 md:row-start-2 md:row-span-2
          "
          unoptimized={unoptimized}
        />
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
