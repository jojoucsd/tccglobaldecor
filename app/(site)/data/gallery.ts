// app/(site)/data/gallery.ts
export type GalleryEntry = {
  slug: string;
  title: string;
  cover?: string;
  tags?: string[];
};

// Awards live in ./awards.ts (single source of truth) — not duplicated here.
export const GALLERY: GalleryEntry[] = [
  // --- Core Specialization categories ---
  { slug: "hand-tufted", title: "Hand Tufted" },
  { slug: "ax-tiles", title: "Axminster Tiles" },
  { slug: "axminster", title: "Axminster" },
  { slug: "hand-ax", title: "Hand-Ax" },
  { slug: "printed-carpet", title: "Printed Carpets" },
  { slug: "machine-tufted", title: "Machine Tufted" },
];
