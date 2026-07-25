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

  const project = getProjectBySlug(slug);
  if (!project) return notFound();

  const messages = await getMessages();
  const projectTitleMap = (messages.projectTitles as Record<string, string>) ?? {};
  const localizedTitle = projectTitleMap[slug] ?? project.title;

  const images =
    (project.images ?? []).map((file: string) => ({
      src: `${bp}/images/projects/${project.slug}/${file}`,
      alt: localizedTitle,
    })) ?? [];

  const address =
    (project as any).address ??
    (project as any).location ??
    (project as any).subtitle ??
    undefined;

  const overview = (project as any).summary ?? '';
  const details = (project as any).description ?? '';
  const details2 = (project as any).notes ?? '';

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
  return getAllProjects().map((p) => ({ slug: p.slug }));
}
