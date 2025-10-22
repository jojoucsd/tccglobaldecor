export type GalleryEntry = {
  slug: string;
  title: string;
  cover?: string;
  tags?: string[];
};

export const GALLERY: GalleryEntry[] = [
  // --- Core Specialization categories ---
  { slug: "hand-tufted", title: "Hand Tufted" },
  { slug: "axminster-tiles", title: "Axminster Tiles" },
  { slug: "axminster-broadloom", title: "Axminster Carpets (Broadloom)" },
  { slug: "hand-ax", title: "Hand-Ax" },
  { slug: "printed", title: "Printed Carpets" },
  { slug: "custom-rugs", title: "Custom Rugs" },

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
