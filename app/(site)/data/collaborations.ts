// app/(site)/data/collaborations.ts
// Single source of truth for collaboration partners — CollabTeaser.tsx
// imports this directly, no duplicate copy to keep in sync.

export type Collaboration = {
  title: string;
  role: string;
  url: string;
  img?: string; // filename under /public/images/collaborations/
  wordmark?: string; // text logo, used when the partner has no icon/image mark
};

export const COLLABORATIONS: Collaboration[] = [
  {
    // Real company name is "Alexander's Collection" (per their own site
    // header) — "Alexander's Design" was a naming slip in this data.
    title: "Alexander's Collection",
    role: "Design Partner",
    img: "alexanders-collection.avif",
    url: "https://www.alexanders-collection.com/rugs",
  },
  {
    title: "One M Interiors",
    role: "Creative Partner",
    img: "one-m-interiors.avif",
    url: "https://www.oneminteriors.com/",
  },
  {
    title: "TredMor®",
    role: "Material Collaboration",
    img: "tred-mor.avif",
    url: "https://commercial-carpetcushion.com/",
  },
  {
    title: "Malta Projects",
    role: "Business Partner",
    img: "malta-solutions.avif",
    url: "https://www.maltasolutions.biz/",
  },
];
