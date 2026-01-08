// app/(site)/projects/[slug]/page.tsx
import { notFound } from "next/navigation";
import { getAllProjects, getProjectBySlug } from "@/lib/getProjects";
import ProjectLayoutClient from "./ProjectLayoutClient";

export const dynamic = "force-static";
const bp = process.env.NEXT_PUBLIC_BASE_PATH || "";

/* ---------- PAGE ---------- */
export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return notFound();

  // Images from data
  const images =
    (project.images ?? []).map((file: string) => ({
      src: `${bp}/images/projects/${project.slug}/${file}`,
      alt: project.title,
    })) ?? [];

  // Text content comes directly from project data (projects.json)
  const address =
    (project as any).address ??
    (project as any).location ??
    (project as any).subtitle ??
    undefined;

  const overview = (project as any).summary ?? "";
  const details = (project as any).description ?? "";
  const details2 = (project as any).notes ?? "";

  return (
    <ProjectLayoutClient
      title={project.title}
      address={address}
      overview={overview}
      details={details}
      details2={details2}
      images={images}
    />
  );
}

/* ---------- STATIC PARAMS ---------- */
export async function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}
