import { setRequestLocale, getTranslations, getMessages } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { getAllProjects } from '@/lib/getProjects';

export const dynamic = 'force-static';

const bp = process.env.NEXT_PUBLIC_BASE_PATH || '';

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

  const desktopCols = 4;
  const showCta = projects.length % desktopCols !== 0;

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

      <ul className="mt-10 sm:mt-14 grid grid-cols-3 gap-[6px] sm:grid-cols-4 sm:gap-3 md:grid-cols-4 md:gap-4 lg:grid-cols-4 lg:gap-5 xl:grid-cols-4 xl:gap-6">
        {projects.map((p, i) => (
          <li key={p.slug} className="relative group">
            {p.comingSoon ? (
              <div
                className="block overflow-hidden rounded-[6px] sm:rounded-[8px] ring-1 ring-neutral-200 cursor-default select-none"
                aria-label={`${projectTitleMap[p.slug] ?? p.title} — ${t('galleryPending')}`}
              >
                <div className="relative aspect-[1/1.2] sm:aspect-[3/4] bg-neutral-200">
                  {p.cover ? (
                    <Image
                      src={`${bp}/images/projects/${p.slug}/${p.cover}`}
                      alt={p.title}
                      fill
                      sizes="(min-width:1280px)25vw,(min-width:1024px)25vw,(min-width:640px)33vw,100vw"
                      className="object-cover opacity-50"
                      unoptimized
                    />
                  ) : null}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute top-2 right-2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-black/60 backdrop-blur-sm px-2 py-0.5 text-[9px] sm:text-[10px] font-semibold tracking-widest uppercase text-white/80">
                      {t('galleryPending')}
                    </span>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-2.5 sm:p-4 md:p-5 text-center sm:text-left text-white">
                    <h2 className="text-sm sm:text-lg md:text-xl font-bold drop-shadow-lg line-clamp-2 leading-tight">
                      {projectTitleMap[p.slug] ?? p.title}
                    </h2>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                href={`/projects/${p.slug}`}
                className="block overflow-hidden rounded-[6px] sm:rounded-[8px] ring-1 ring-neutral-200 hover:ring-brand-gold/60 transition"
              >
                <div className="relative aspect-[1/1.2] sm:aspect-[3/4]">
                  <Image
                    src={`${bp}/images/projects/${p.slug}/${p.cover}`}
                    alt={p.title}
                    fill
                    sizes="(min-width:1280px)25vw,(min-width:1024px)25vw,(min-width:640px)33vw,100vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    priority={i === 0}
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-2.5 sm:p-4 md:p-5 text-center sm:text-left text-white">
                    <h2 className="text-sm sm:text-lg md:text-xl font-bold drop-shadow-lg line-clamp-2 leading-tight">
                      {projectTitleMap[p.slug] ?? p.title}
                    </h2>
                  </div>
                </div>
              </Link>
            )}
          </li>
        ))}

        {showCta && (
          <li className="relative group hidden sm:block">
            <Link
              href="/connect"
              className="block overflow-hidden rounded-[8px] ring-1 ring-brand-gold/40 hover:ring-brand-gold transition h-full"
            >
              <div className="relative aspect-[3/4] bg-gradient-to-br from-neutral-50 to-neutral-100 flex flex-col items-center justify-center p-6 text-center">
                <div className="w-12 h-12 mb-4 rounded-full bg-brand-gold/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-brand-gold-deep" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <h2 className="text-lg md:text-xl font-bold text-brand-ink leading-tight">
                  {t('ctaTitle')}
                </h2>
                <p className="mt-2 text-sm text-neutral-500">
                  {t('ctaSubtitle')}
                </p>
              </div>
            </Link>
          </li>
        )}
      </ul>
    </main>
  );
}
