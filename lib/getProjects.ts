// lib/getProjects.ts
import "server-only";
import fs from "node:fs";
import path from "node:path";

/** --------- Types --------- */
export type ProjectRecord = {
  slug: string;
  title: string;
  cover: string;
  images: string[];
  // optional fields for the case-study layout
  subtitle?: string;
  address?: string;
  summary?: string;      // overview
  description?: string;  // details
  notes?: string;        // details2
  template?: "default" | "caseStudy";
};

/** --------- Config --------- */
const ROOT = process.cwd();
const PROJECTS_DIR = path.join(ROOT, "public", "images", "projects");
const IMAGE_EXTS = new Set([".avif", ".jpg", ".jpeg", ".png", ".webp"]);

const CASE_STUDY_TEMPLATE: Record<string, "caseStudy"> = {
  "the-londoner-hotel": "caseStudy",
  "park-hyatt-niseko": "caseStudy",
};

const CASE_STUDY_CONTENT: Partial<Record<string, Partial<ProjectRecord>>> = {
  "the-londoner-hotel": {
    // subtitle optional; your page falls back to address/location if present
    address: "Estrada do Istmo. s/n, Cotai, Macau SAR, P.R. China",
    summary:
      "Located at the heart of Cotai, The Londoner Hotel captures the grandeur of British sophistication through architecture and interior design. Inspired by London’s timeless heritage, the hotel merges classic detailing with modern luxury, creating a distinct atmosphere of refined hospitality.",
    description:
      "Within this setting, TCC Carpets crafted bespoke designs that echo the hotel’s British narrative. Each carpet was tailored to its environment—bold patterns and rich tones define the public areas, while softer palettes and delicate motifs enrich the suites. Through meticulous craftsmanship and advanced production, the carpets bring harmony, comfort, and identity to every space, making them an integral part of The Londoner’s distinguished character.",
    notes:
      "Geometric motifs inspired by British architecture guide the flow of movement, while layered color gradients create visual depth under soft ambient lighting. Each installation showcases TCC Carpets’ ability to balance design precision with the dynamic needs of high-traffic hospitality environments.",
  },
  "park-hyatt-niseko": {
    address: "328-47 Aza Iwaobetsu, Kutchan, Abuta District, Hokkaido, Japan",
    summary:
      "Nestled at the base of Mount Annupuri, the Park Hyatt Niseko Hanazono celebrates natural beauty through quiet luxury and refined craftsmanship. The interior design draws inspiration from the surrounding landscape— snow, wood, and stone. Within this context, TCC Carpets designed a series of bespoke floor coverings that reflect the rhythm of nature and the Japanese aesthetic of restraint.",
    description:
      "For the suites and private zones, TCC introduced subtle gradations of color and minimalist motifs, evoking the stillness of winter mornings and the clarity of light on snow. Every piece was crafted to embody tranquility and refinement, contributing to Park Hyatt Niseko’s seamless balance between contemporary comfort and timeless elegance.",
    notes:
      "In the public spaces, organic patterns and muted tones mirror the textures of mountain terrain and melting snow, softly blending with timber finishes and panoramic views. The carpets serve as both visual anchors and sensory elements, offering warmth underfoot while enhancing the acoustics and intimacy of the lounge and dining areas.",
  },
};

/** --------- Helpers --------- */
function titleFromSlug(slug: string) {
  return slug.replace(/[-_]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()).trim();
}
function preferCover(files: string[]) {
  const avifs = files.filter((f) => path.extname(f).toLowerCase() === ".avif");
  const preferred = avifs.find((f) => /project_list/i.test(f));
  if (preferred) return preferred;
  if (avifs.length) return avifs[0];
  return files[0] ?? "";
}

/** --------- API --------- */
export function getAllProjects(): ProjectRecord[] {
  if (!fs.existsSync(PROJECTS_DIR)) return [];

  const slugs = fs
    .readdirSync(PROJECTS_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort();

  const scanned: ProjectRecord[] = slugs
    .map((slug) => {
      const dir = path.join(PROJECTS_DIR, slug);
      const files = fs
        .readdirSync(dir)
        .filter((f) => IMAGE_EXTS.has(path.extname(f).toLowerCase()))
        .sort();
      if (!files.length) return null;

      return {
        slug,
        title: titleFromSlug(slug),
        cover: preferCover(files),
        images: files,
      } as ProjectRecord;
    })
    .filter(Boolean) as ProjectRecord[];

  // Merge overlays + template flag
  return scanned.map((p) => ({
    ...p,
    ...(CASE_STUDY_CONTENT[p.slug] ?? {}),
    template: CASE_STUDY_TEMPLATE[p.slug] ?? "default",
  }));
}

export function getProjectBySlug(slug: string): ProjectRecord | undefined {
  const project = getAllProjects().find((p) => p.slug === slug);
  if (!project) return undefined;

  return {
    ...project,
    ...(CASE_STUDY_CONTENT[slug] ?? {}),
    template: CASE_STUDY_TEMPLATE[slug] ?? "default",
  };
}
