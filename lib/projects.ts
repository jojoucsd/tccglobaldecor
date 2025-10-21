// lib/projects.ts
export type Img = { src: string; alt?: string };

type Base = {
  slug: string;
  title: string;
  address?: string;
  marketTitle?: string;     // e.g., "Hotel", "Casino"
  overview?: string;
  images: Img[];
};

// Discriminated union for template safety
export type Project =
  | (Base & {
      template: "default";
      // fields used by your current ProjectDetail…
      details?: string;
    })
  | (Base & {
      template: "caseStudy"; // slides 8–11 layout
      sectorIntro: string;
      marquee: { name: string; location: string; slug: string }[];
      details: string;
      details2?: string;
    });

// For BDNY now; expand freely later
const bp = process.env.NEXT_PUBLIC_BASE_PATH || "";
export const PROJECTS: Project[] = [
  {
    slug: "londoner",
    template: "caseStudy",
    title: "The Londoner Hotel",
    address: "Estrada do Istmo. s/n, Cotai, Macau SAR, P.R. China",
    marketTitle: "Hotel",
    sectorIntro:
      "TCC Carpets collaborates with world-renowned hotels to craft bespoke flooring solutions…",
    marquee: [
      { name: "The Londoner Hotel", location: "Macau, China", slug: "londoner" },
      { name: "Park Hyatt Niseko Hanazono", location: "Hokkaido, Japan", slug: "niseko" },
      // add more…
    ],
    overview:
      "Located at the heart of Cotai, The Londoner captures the grandeur of British sophistication…",
    details:
      "Within this setting, TCC Carpets crafted bespoke designs that echo the British narrative…",
    details2:
      "Geometric motifs inspired by British architecture guide the flow of movement…",
    images: [
      { src: `${bp}/images/londoner/hero.jpg`, alt: "Londoner lobby" },
      { src: `${bp}/images/londoner/suite.jpg`, alt: "Londoner suite" },
      { src: `${bp}/images/londoner/corridor.jpg`, alt: "Londoner corridor" },
    ],
  },
  {
    slug: "niseko",
    template: "caseStudy",
    title: "Park Hyatt Niseko Hanazono",
    address: "328-1 Aza Iwaobetsu, Kutchan, Hokkaido, Japan",
    marketTitle: "Hotel",
    sectorIntro:
      "Our hospitality work scales from alpine resorts to urban landmarks…",
    marquee: [
      { name: "The Londoner Hotel", location: "Macau, China", slug: "londoner" },
      { name: "Park Hyatt Niseko Hanazono", location: "Hokkaido, Japan", slug: "niseko" },
      // …
    ],
    overview:
      "Nestled amid Hokkaido’s winter landscapes, Park Hyatt Niseko layers natural textures…",
    details:
      "We developed a palette of custom wool textures that soften acoustics and guide circulation…",
    details2:
      "Tones and pile heights were tuned for both performance and atmosphere…",
    images: [
      { src: `${bp}/images/niseko/hero.jpg`, alt: "Niseko lobby" },
      { src: `${bp}/images/niseko/lounge.jpg`, alt: "Niseko lounge" },
      { src: `${bp}/images/niseko/corridor.jpg`, alt: "Niseko corridor" },
    ],
  },
  // …the other ~11 projects keep template: "default" and your existing fields
];

export function getAllProjectSlugs() {
  return PROJECTS.map((p) => p.slug);
}
export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
