import { setRequestLocale, getTranslations, getMessages } from 'next-intl/server';
import Section from '@/components/Section';
import PhotoGridMatrix, { type MatrixItem } from '@/components/gallery/PhotoGrid';
import SmartBelt from '@/components/belts/MediaBelt';
import { GALLERY } from '@/app/(site)/data/gallery';
import { AWARDS } from '@/app/(site)/data/awards';
import { titleFromSlug } from '@/lib/strings';
import { Link } from '@/i18n/navigation';
import fs from 'node:fs';
import path from 'node:path';

export const dynamicParams = false;

const bp = process.env.NEXT_PUBLIC_BASE_PATH || '';

const SPECIALIZATION_SLUGS = [
  'hand-tufted',
  'axminster',
  'ax-tiles',
  'hand-ax',
  'printed-carpet',
  'machine-tufted',
] as const;

const AWARD_SLUGS = AWARDS.map((a) => a.slug);

const PROJECTS: Array<[number, string]> = [
  [1, 'londoner-grand'],
  [2, 'park-hyatt-niseko'],
  [3, 'four-seasons-grand'],
  [4, 'grand-hyatt-macau'],
  [5, 'mGM-cotai'],
  [6, 'mGM-macau'],
  [7, 'grand-lisboa'],
  [8, 'karl-lagerfeld-macau'],
  [9, 'marina-bay-sands'],
  [10, 'melco-group'],
  [11, 'raffles-macau'],
  [12, 'ritz-carlton-macau'],
  [13, 'united-nations-NYC'],
  [14, 'caesars-octavius-LV'],
  [15, 'caesars-palace-LV'],
  [16, 'londoner-hotel'],
  [17, 'dream-tower-jeju-island'],
  [18, 'w-taipei'],
  [19, 'COD-manila'],
  [20, 'seabank-malta'],
  [21, 'studio-city-epic-tower-macau'],
];

type SixItems = [MatrixItem, MatrixItem, MatrixItem, MatrixItem, MatrixItem, MatrixItem];
const LAYOUT6 = ['*-big-left', '&-single', '%-rect-1x2', '@-single', '%-rect-1x3', '*-big-right'] as const;

export function generateStaticParams() {
  const fromGallery = GALLERY.map((g) => ({ slug: g.slug }));
  const fromAwards = (AWARD_SLUGS as readonly string[]).map((slug) => ({ slug }));
  const bySlug = new Map<string, { slug: string }>();
  for (const o of [...fromGallery, ...fromAwards]) bySlug.set(o.slug, o);
  return Array.from(bySlug.values());
}

const ph = (id: string): MatrixItem => ({
  id,
  src:
    'data:image/svg+xml;utf8,' +
    encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 900'><rect width='100%' height='100%' fill='#f3f4f6'/></svg>`
    ),
});

function galleryItemsFor(slug: string): SixItems {
  const folderFs = path.join(process.cwd(), 'public', 'images', 'gallery', slug);
  const folderExists = fs.existsSync(folderFs);

  const arr: MatrixItem[] = Array.from({ length: 6 }, (_, i) => {
    const id = LAYOUT6[i] ?? `img-${i + 1}`;
    const fileName = `${i + 1}.avif`;
    const fileFs = path.join(folderFs, fileName);
    if (folderExists && fs.existsSync(fileFs)) {
      return { id, src: `${bp}/images/gallery/${slug}/${fileName}` };
    }
    return ph(id);
  });

  while (arr.length < 6) arr.push(ph(`ph-${arr.length + 1}`));
  return arr.slice(0, 6) as SixItems;
}

const related = PROJECTS.map(([idx, slug]) => ({
  src: `${bp}/images/projects/project_icon_img_${idx}.avif`,
  alt: slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
  href: `/projects/${slug}`,
  kind: 'image' as const,
}));

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('galleryDetail');
  const messages = await getMessages();
  const awardTitleMap = (messages.awardTitles as Record<string, string>) ?? {};

  const titleForSlug = (s: string) =>
    GALLERY.find((g) => g.slug === s)?.title ?? awardTitleMap[s] ?? titleFromSlug(s);

  const prettyTitle = titleForSlug(slug);

  type Loop = readonly string[] | null;
  const inSpec = (SPECIALIZATION_SLUGS as readonly string[]).includes(slug);
  const inAwards = AWARD_SLUGS.includes(slug);
  const loop: Loop = inSpec ? SPECIALIZATION_SLUGS : inAwards ? AWARD_SLUGS : null;

  let prevSlug: string | null = null;
  let nextSlug: string | null = null;

  if (loop) {
    const i = loop.indexOf(slug);
    prevSlug = loop[(i - 1 + loop.length) % loop.length];
    nextSlug = loop[(i + 1) % loop.length];
  }

  const items = galleryItemsFor(slug);

  return (
    <Section
      id="gallery"
      className="relative text-brand-ink flex flex-col items-center bg-white pt-[calc(var(--header-h,72px)+24px)] pb-16"
    >
      <div className="relative mx-auto max-w-2xl text-center flex flex-col items-center">
        <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.12em] uppercase text-neutral-500">
          <span className="inline-block h-[3px] w-8 bg-brand-gold rounded-full" />
          {t('eyebrow')}
        </span>
        <h1 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight">{prettyTitle}</h1>
        <p className="mt-2 text-neutral-600 text-sm md:text-base">
          {t('subtitle')}
        </p>

        {loop && (
          <>
            {prevSlug && (
              <Link
                href={`/gallery/${prevSlug}`}
                aria-label={`Previous: ${prevSlug ? titleForSlug(prevSlug) : ''}`}
                className="hidden sm:flex items-center justify-center absolute top-1/2 -translate-y-1/2 left-[-14px] md:left-[-24px] h-9 w-9 rounded-full bg-brand-gold text-brand-ink shadow ring-1 ring-brand-gold/60 hover:bg-brand-gold-deep focus:outline-none focus-visible:ring-2 focus-visible:ring-black transition"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            )}
            {nextSlug && (
              <Link
                href={`/gallery/${nextSlug}`}
                aria-label={`Next: ${nextSlug ? titleForSlug(nextSlug) : ''}`}
                className="hidden sm:flex items-center justify-center absolute top-1/2 -translate-y-1/2 right-[-14px] md:right-[-24px] h-9 w-9 rounded-full bg-brand-gold text-brand-ink shadow ring-1 ring-brand-gold/60 hover:bg-brand-gold-deep focus:outline-none focus-visible:ring-2 focus-visible:ring-black transition"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            )}
          </>
        )}
      </div>

      {loop && (
        <div className="mt-3 w-full max-w-2xl flex justify-between sm:hidden">
          {prevSlug ? (
            <Link
              href={`/gallery/${prevSlug}`}
              className="inline-flex items-center gap-1 rounded-full bg-brand-gold hover:bg-brand-gold-deep px-3 py-1.5 text-xs font-semibold text-brand-ink transition"
              aria-label={`Previous: ${prevSlug ? titleForSlug(prevSlug) : ''}`}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {t('prev')}
            </Link>
          ) : (
            <span />
          )}
          {nextSlug ? (
            <Link
              href={`/gallery/${nextSlug}`}
              className="inline-flex items-center gap-1 rounded-full bg-brand-gold hover:bg-brand-gold-deep px-3 py-1.5 text-xs font-semibold text-brand-ink transition"
              aria-label={`Next: ${nextSlug ? titleForSlug(nextSlug) : ''}`}
            >
              {t('next')}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          ) : null}
        </div>
      )}

      <div className="w-full flex justify-center">
        <PhotoGridMatrix items={items} className="pt-12" />
      </div>

      <SmartBelt
        items={related}
        title={t('relatedTitle')}
        height="md"
        seed={3}
        count={6}
        grayscaleHover={false}
        showCaptions={false}
        speedSec={28}
      />
    </Section>
  );
}
