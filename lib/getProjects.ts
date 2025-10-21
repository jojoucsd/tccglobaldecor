// lib/getProjects.ts

// 1) Minimal overlay: which slugs are case studies
const CASE_STUDY_TEMPLATE: Record<string, "caseStudy"> = {
  "the-londoner-hotel": "caseStudy",
  "park-hyatt-niseko": "caseStudy",
};

// 2) If you have types, extend them (optional but nice)
export type ProjectRecord = {
  slug: string;
  title: string;
  cover: string;
  images: string[];
  // ...
  template?: "default" | "caseStudy";
};

// Wherever you build your array:
export function getAllProjects(): ProjectRecord[] {
  const projects = /* your existing scan */ [] as ProjectRecord[];

  // Inject template based on slug (default → "default")
  return projects.map((p) => ({
    ...p,
    template: CASE_STUDY_TEMPLATE[p.slug] ?? "default",
  }));
}

// Make sure getProjectBySlug returns the merged object too
export function getProjectBySlug(slug: string): ProjectRecord | undefined {
  const p = /* your current lookup */ undefined as ProjectRecord | undefined;
  return p
    ? { ...p, template: CASE_STUDY_TEMPLATE[p.slug] ?? "default" }
    : undefined;
}
