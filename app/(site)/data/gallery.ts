// app/(site)/data/gallery.ts
export type GalleryEntry = {
  slug: string;
  title: string;
  cover?: string;
  tags?: string[];
};

export const GALLERY: GalleryEntry[] = [
  // --- Core Specialization categories ---
  { slug: "hand-tufted", title: "Hand Tufted" },
  { slug: "ax-tiles", title: "Axminster Tiles" },
  { slug: "axminster", title: "Axminster" },
  { slug: "hand-ax", title: "Hand-Ax" },
  { slug: "printed-carpet", title: "Printed Carpets" },
  { slug: "machine-tufted", title: "Machine Tufted" },

  // --- Awards & Recognition (used by AwardsTeasersRow) ---
  {
    slug: "marina-bay-singapore-award",
    title: "Marina Bay Sands — Recognition",
  },
  {
    slug: "sands-supplier-excellence-award",
    title: "Sands Supplier Excellence Award",
  },
  {
    slug: "industry-excellence-placeholder",
    title: "Industry Design Excellence (Placeholder)",
  },
];
