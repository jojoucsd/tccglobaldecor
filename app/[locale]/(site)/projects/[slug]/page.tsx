import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { getAllProjects, getProjectBySlug } from '@/lib/getProjects';
import ProjectLayoutClient from './ProjectLayoutClient';

export const dynamic = 'force-static';
const bp = process.env.NEXT_PUBLIC_BASE_PATH || '';

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const project = await getProjectBySlug(slug, locale);
  // comingSoon projects (<=4 images) don't have enough images for a detail
  // layout and aren't linked from the grid (it renders a non-clickable
  // placeholder instead) — treat a direct/guessed URL the same as unknown.
  if (!project || project.comingSoon) return notFound();

  const images = project.images.map((file) => ({
    src: `${bp}/images/projects/${project.slug}/${file}`,
    alt: project.title,
  }));

  const address = project.address ?? project.subtitle;

  return (
    <ProjectLayoutClient
      title={project.title}
      address={address}
      overview={project.summary ?? ''}
      details={project.description ?? ''}
      details2={project.notes ?? ''}
      images={images}
    />
  );
}

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.filter((p) => !p.comingSoon).map((p) => ({ slug: p.slug }));
}
