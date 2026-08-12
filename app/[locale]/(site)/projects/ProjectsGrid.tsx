'use client';

import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import type { ProjectRecord } from '@/lib/getProjects';

const bp = process.env.NEXT_PUBLIC_BASE_PATH || '';

const INITIAL_COUNT = 16;
const LOAD_STEP = 12;

const FILTERS = [
  { key: 'hotel', labelKey: 'filterHotel' },
  { key: 'restaurant', labelKey: 'filterRestaurant' },
  { key: 'gaming', labelKey: 'filterGaming' },
  { key: 'living', labelKey: 'filterLiving' },
] as const;

export default function ProjectsGrid({
  projects,
}: {
  projects: ProjectRecord[];
}) {
  const t = useTranslations('projects');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  const filteredProjects = useMemo(() => {
    if (selectedTags.length === 0) return projects;
    return projects.filter((p) => p.tags?.some((tag) => selectedTags.includes(tag)));
  }, [projects, selectedTags]);

  const visibleProjects = filteredProjects.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProjects.length;

  // grid is 3 cols below sm, 4 cols at sm+. While there's more to load, don't
  // show a trailing partial row on either breakpoint — round each down to
  // its own complete-row boundary and let the rest appear on the next
  // "Load More" click instead of leaving a gap.
  const mobileCutoff = hasMore ? Math.floor(visibleProjects.length / 3) * 3 : visibleProjects.length;
  const desktopCutoff = hasMore ? Math.floor(visibleProjects.length / 4) * 4 : visibleProjects.length;

  function cardVisibilityClass(index: number) {
    const onMobile = index < mobileCutoff;
    const onDesktop = index < desktopCutoff;
    if (onMobile && onDesktop) return '';
    if (onMobile) return 'block sm:hidden';
    if (onDesktop) return 'hidden sm:block';
    return 'hidden';
  }

  // once everything is loaded, fill the last row's remainder (if any) with
  // the CTA card instead — computed per breakpoint since 3-col and 4-col
  // don't divide evenly at the same counts
  const showCtaMobile = !hasMore && visibleProjects.length % 3 !== 0;
  const showCtaDesktop = !hasMore && visibleProjects.length % 4 !== 0;

  function toggleTag(key: string) {
    setSelectedTags((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
    setVisibleCount(INITIAL_COUNT);
  }

  function clearFilters() {
    setSelectedTags([]);
    setVisibleCount(INITIAL_COUNT);
  }

  return (
    <>
      <div className="mt-8 sm:mt-10 flex flex-wrap justify-center gap-2 sm:gap-2.5">
        <button
          type="button"
          onClick={clearFilters}
          className={`rounded-full px-4 py-1.5 text-xs sm:text-sm font-semibold tracking-wide transition ring-1 ${
            selectedTags.length === 0
              ? 'bg-brand-ink text-white ring-brand-ink'
              : 'bg-white text-brand-ink ring-neutral-300 hover:ring-brand-gold-deep'
          }`}
        >
          {t('filterAll')}
        </button>
        {FILTERS.map(({ key, labelKey }) => {
          const active = selectedTags.includes(key);
          return (
            <button
              key={key}
              type="button"
              onClick={() => toggleTag(key)}
              className={`rounded-full px-4 py-1.5 text-xs sm:text-sm font-semibold tracking-wide transition ring-1 ${
                active
                  ? 'bg-brand-ink text-white ring-brand-ink'
                  : 'bg-white text-brand-ink ring-neutral-300 hover:ring-brand-gold-deep'
              }`}
            >
              {t(labelKey)}
            </button>
          );
        })}
      </div>

      {filteredProjects.length === 0 && (
        <p className="mt-12 text-center text-sm sm:text-base text-neutral-500">
          {t('noResults')}
        </p>
      )}

      <ul className="mt-8 sm:mt-10 grid grid-cols-3 gap-[6px] sm:grid-cols-4 sm:gap-3 md:grid-cols-4 md:gap-4 lg:grid-cols-4 lg:gap-5 xl:grid-cols-4 xl:gap-6">
        {visibleProjects.map((p, i) => (
          <li key={p.slug} className={`relative group ${cardVisibilityClass(i)}`}>
            {p.comingSoon ? (
              <div
                className="block overflow-hidden rounded-[6px] sm:rounded-[8px] ring-1 ring-neutral-200 cursor-default select-none"
                aria-label={`${p.title} — ${t('galleryPending')}`}
              >
                <div className="relative aspect-[1/1.2] sm:aspect-[3/4] bg-neutral-200">
                  {p.cover ? <CoverImage p={p} /> : null}
                  <div className="absolute top-2 right-2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-black/60 backdrop-blur-sm px-1.5 py-0.5 sm:px-2 text-[8px] sm:text-[10px] font-semibold tracking-normal sm:tracking-widest uppercase text-white/80 whitespace-nowrap">
                      {t('galleryPending')}
                    </span>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 h-16 sm:h-20 bg-gradient-to-t from-black/75 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-2.5 sm:p-4 md:p-5 text-center sm:text-left text-white">
                    <h2 className="text-sm sm:text-lg md:text-xl font-bold drop-shadow-lg line-clamp-2 leading-tight">
                      {p.title}
                    </h2>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                href={`/projects/${p.slug}`}
                className="block overflow-hidden rounded-[6px] sm:rounded-[8px] ring-1 ring-neutral-200 hover:ring-brand-gold/60 transition"
              >
                <div className="relative aspect-[1/1.2] sm:aspect-[3/4] bg-neutral-200">
                  <CoverImage p={p} priority={i === 0} hoverZoom />
                  <div className="absolute inset-x-0 bottom-0 h-20 sm:h-24 bg-gradient-to-t from-black/85 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-2.5 sm:p-4 md:p-5 text-center sm:text-left text-white">
                    <h2 className="text-sm sm:text-lg md:text-xl font-bold drop-shadow-lg line-clamp-2 leading-tight">
                      {p.title}
                    </h2>
                  </div>
                </div>
              </Link>
            )}
          </li>
        ))}

        {showCtaMobile && (
          <li className="relative group block sm:hidden">
            <CtaCard ctaTitle={t('ctaTitle')} ctaSubtitle={t('ctaSubtitle')} />
          </li>
        )}
        {showCtaDesktop && (
          <li className="relative group hidden sm:block">
            <CtaCard ctaTitle={t('ctaTitle')} ctaSubtitle={t('ctaSubtitle')} />
          </li>
        )}
      </ul>

      {hasMore && (
        <div className="mt-10 sm:mt-12 flex justify-center">
          <button
            type="button"
            onClick={() => setVisibleCount((v) => v + LOAD_STEP)}
            className="rounded-full px-8 py-2.5 text-sm font-semibold tracking-wide bg-white text-brand-ink ring-1 ring-neutral-300 hover:ring-brand-gold-deep transition"
          >
            {t('loadMore')}
          </button>
        </div>
      )}
    </>
  );
}

function CoverImage({
  p,
  priority = false,
  hoverZoom = false,
}: {
  p: ProjectRecord;
  priority?: boolean;
  hoverZoom?: boolean;
}) {
  return (
    <Image
      src={`${bp}/images/projects/${p.slug}/${p.cover}`}
      alt={p.title}
      fill
      sizes="(min-width:1280px)25vw,(min-width:1024px)25vw,(min-width:640px)33vw,100vw"
      className={`object-cover ${hoverZoom ? 'transition-transform duration-300 group-hover:scale-[1.03]' : ''}`}
      style={{ objectPosition: p.coverPosition || 'center' }}
      priority={priority}
      unoptimized
    />
  );
}

function CtaCard({ ctaTitle, ctaSubtitle }: { ctaTitle: string; ctaSubtitle: string }) {
  return (
    <Link
      href="/connect"
      className="block overflow-hidden rounded-[6px] sm:rounded-[8px] ring-1 ring-brand-gold/40 hover:ring-brand-gold transition h-full"
    >
      <div className="relative aspect-[1/1.2] sm:aspect-[3/4] bg-gradient-to-br from-neutral-50 to-neutral-100 flex flex-col items-center justify-center p-3 sm:p-6 text-center">
        <div className="w-9 h-9 sm:w-12 sm:h-12 mb-2 sm:mb-4 rounded-full bg-brand-gold/10 flex items-center justify-center">
          <svg className="w-4 h-4 sm:w-6 sm:h-6 text-brand-gold-deep" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </div>
        <h2 className="text-sm sm:text-lg md:text-xl font-bold text-brand-ink leading-tight">
          {ctaTitle}
        </h2>
        <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-neutral-500">
          {ctaSubtitle}
        </p>
      </div>
    </Link>
  );
}
