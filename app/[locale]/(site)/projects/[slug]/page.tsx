import { setRequestLocale, getMessages } from 'next-intl/server';
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

  const project = await getProjectBySlug(slug);
  // comingSoon projects (<=4 images) don't have enough images for a detail
  // layout and aren't linked from the grid (it renders a non-clickable
  // placeholder instead) — treat a direct/guessed URL the same as unknown.
  if (!project || project.comingSoon) return notFound();

  const messages = await getMessages();
  const projectTitleMap = (messages.projectTitles as Record<string, string>) ?? {};
  const localizedTitle = projectTitleMap[slug] ?? project.title;

  type ProjectDetailTranslation = { summary?: string; description?: string; notes?: string };
  const projectDetailsMap =
    (messages.projectDetails as Record<string, ProjectDetailTranslation>) ?? {};
  const localizedDetails = projectDetailsMap[slug];

  const images = project.images.map((file) => ({
    src: `${bp}/images/projects/${project.slug}/${file}`,
    alt: localizedTitle,
  }));

  const address = project.address ?? project.subtitle;

  const overview = localizedDetails?.summary ?? project.summary ?? '';
  const details = localizedDetails?.description ?? project.description ?? '';
  const details2 = localizedDetails?.notes ?? project.notes ?? '';

  return (
    <ProjectLayoutClient
      title={localizedTitle}
      address={address}
      overview={overview}
      details={details}
      details2={details2}
      images={images}
    />
  );
}

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.filter((p) => !p.comingSoon).map((p) => ({ slug: p.slug }));
}
