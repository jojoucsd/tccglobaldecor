import { setRequestLocale, getTranslations, getMessages } from 'next-intl/server';
import { getAllProjects } from '@/lib/getProjects';
import ProjectsGrid from './ProjectsGrid';

export const dynamic = 'force-static';

export default async function ProjectsIndex({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('projects');
  const messages = await getMessages();
  const projectTitleMap = (messages.projectTitles as Record<string, string>) ?? {};
  const projects = getAllProjects();

  return (
    <main
      className="
        mx-auto max-w-7xl
        px-3 sm:px-6
        mt-[var(--header-h,4rem)]
        py-10 sm:py-16
        text-brand-ink
      "
    >
      <header className="text-center max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight flex items-center justify-center gap-4">
          <span className="inline-block h-[4px] w-10 bg-brand-gold rounded-full" />
          {t('title')}
          <span className="inline-block h-[4px] w-10 bg-brand-gold rounded-full" />
        </h1>
        <p className="mt-4 sm:mt-6 text-[15px] sm:text-base md:text-lg text-neutral-600 leading-relaxed">
          {t('subtitle')}
        </p>
      </header>

      <ProjectsGrid projects={projects} titleMap={projectTitleMap} />
    </main>
  );
}
