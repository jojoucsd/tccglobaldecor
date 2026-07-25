'use client';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Section from '@/components/Section';
import AlternatingCard from '@/components/AlternatingCard';

const bp = process.env.NEXT_PUBLIC_BASE_PATH || '';

const ITEM_KEYS = [
  { key: 'handTufted', descKey: 'handTuftedDesc', imageSrc: `${bp}/images/capability/hand-tufted.avif`, href: '/gallery/hand-tufted' },
  { key: 'axminster', descKey: 'axminsterDesc', imageSrc: `${bp}/images/capability/axminster.avif`, href: '/gallery/axminster' },
  { key: 'handAx', descKey: 'handAxDesc', imageSrc: `${bp}/images/capability/hand-ax.avif`, href: '/gallery/hand-ax' },
  { key: 'axTiles', descKey: 'axTilesDesc', imageSrc: `${bp}/images/capability/ax-tile.avif`, href: '/gallery/ax-tiles' },
  { key: 'printedCarpet', descKey: 'printedCarpetDesc', imageSrc: `${bp}/images/capability/printed-carpet.avif`, href: '/gallery/printed-carpet' },
  { key: 'machineTufted', descKey: 'machineTuftedDesc', imageSrc: `${bp}/images/capability/machine-tufted.avif`, href: '/gallery/machine-tufted' },
] as const;

export default function Specialization() {
  const t = useTranslations('specialization');

  const items = ITEM_KEYS.map((it) => ({
    title: t(it.key),
    subtitle: t(it.descKey),
    imageSrc: it.imageSrc,
    href: it.href,
  }));

  return (
    <Section className="bg-gray-50 text-brand-ink" id="specialization" pad="sm" padTop={false}>
      <header className="mb-6 md:mb-12">
        <h3 className="text-2xl md:text-3xl font-semibold flex justify-center items-center gap-3 text-center">
          <span className="inline-block h-[3px] w-8 bg-brand-gold rounded-full" />
          {t('title')}
        </h3>
        <p className="mt-2 text-sm md:text-base text-neutral-600 max-w-2xl mx-auto text-center">
          {t('subtitle')}
        </p>
      </header>

      <ul
        className={[
          'grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 lg:gap-6',
          '[&_h4]:text-brand-ink',
        ].join(' ')}
        role="list"
        aria-label="Specialization items"
      >
        {items.map((it, i) => {
          const isTextTopDesktop = i % 2 !== 0;
          return (
            <li key={it.title} className="flex flex-col">
              {isTextTopDesktop && (
                <div className="hidden lg:block px-1.5 lg:px-0 pb-2">
                  <h4 className="text-sm font-semibold tracking-tight">{it.title}</h4>
                  <p className="hidden sm:block text-sm text-gray-500 mt-1">{it.subtitle}</p>
                </div>
              )}
              <AlternatingCard
                title={it.title}
                subtitle={it.subtitle}
                imageSrc={it.imageSrc}
                href={it.href}
                compact
                showText={false}
                className="transition-transform duration-300 hover:-translate-y-1"
              />
              <div className={`px-1.5 lg:px-0 pt-2 ${isTextTopDesktop ? 'lg:hidden' : ''}`}>
                <h4 className="text-[13px] sm:text-sm font-semibold tracking-tight">{it.title}</h4>
                <p className="hidden sm:block text-sm text-gray-500 mt-1">{it.subtitle}</p>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="mt-6 md:mt-8 flex justify-center md:justify-end md:pr-12">
        <Link
          href="/process"
          className="inline-flex items-center gap-2 rounded-full bg-brand-gold hover:bg-brand-gold-deep px-5 py-2 text-sm font-semibold text-brand-ink shadow-sm transition-colors"
        >
          <span>{t('ourProcess')}</span>
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </Section>
  );
}
