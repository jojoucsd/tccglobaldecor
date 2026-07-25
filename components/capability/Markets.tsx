'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import Section from '@/components/Section';
import WorldMapStaticLabeled from '@/components/WorldMapStatic';

const bp = process.env.NEXT_PUBLIC_BASE_PATH || '';

type MarketKey = 'hotel' | 'casino' | 'cruise' | 'aviation' | 'yacht' | 'retail';

const MARKET_IMGS: Record<MarketKey, string> = {
  hotel: `${bp}/images/capability/hotel.avif`,
  casino: `${bp}/images/capability/casino.avif`,
  cruise: `${bp}/images/capability/cruise.avif`,
  aviation: `${bp}/images/capability/aviation.avif`,
  yacht: `${bp}/images/capability/yacht.avif`,
  retail: `${bp}/images/capability/retail.avif`,
};

function Pill({ active, children, onClick }: { active?: boolean; children: React.ReactNode; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'px-3 py-1.5 rounded-full text-[13px] sm:text-sm border transition w-full sm:w-auto text-center',
        active ? 'bg-black text-white border-black' : 'bg-white text-gray-800 border-gray-300 hover:shadow-sm',
      ].join(' ')}
      aria-pressed={!!active}
    >
      {children}
    </button>
  );
}

const MARKET_KEYS: MarketKey[] = ['hotel', 'casino', 'cruise', 'aviation', 'yacht', 'retail'];

export default function Markets() {
  const t = useTranslations('markets');
  const [active, setActive] = useState<MarketKey>('hotel');

  const activeTitle = t(active);
  const activeImg = MARKET_IMGS[active];

  return (
    <Section className="bg-white !px-0" pad="sm" padTop={false}>
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* LEFT column */}
        <div className="h-auto md:min-h-[52vh] px-4 sm:px-6 md:px-12 py-6 md:py-12 flex flex-col md:justify-between">
          <header>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight flex items-center gap-3">
              <span className="inline-block h-[3px] w-8 bg-brand-gold rounded-full" />
              {t('title')}
            </h3>
          </header>

          <div className="mt-6 md:mt-8 md:flex-1 md:basis-0 md:flex md:items-center">
            <div className="w-full md:max-w-[560px] mx-auto">
              <WorldMapStaticLabeled showLabels labelUseCodes />
            </div>
          </div>

          <div className="space-y-3 md:space-y-4 mt-6">
            <p className="text-[15px] sm:text-base leading-relaxed text-neutral-700">{t('bodyA')}</p>
            <p className="text-[15px] sm:text-base leading-relaxed text-neutral-700">{t('bodyB')}</p>
          </div>
        </div>

        {/* RIGHT: market pills + panel */}
        <div className="px-4 sm:px-6 md:px-12 py-6 md:py-12">
          <h4 className="text-lg font-semibold flex items-center gap-3 mb-3">
            <span className="inline-block h-[3px] w-8 bg-brand-gold rounded-full" />
            {t('marketsTitle')}
          </h4>

          <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:gap-2" role="tablist" aria-label="Markets">
            {MARKET_KEYS.map((k) => (
              <Pill key={k} active={active === k} onClick={() => setActive(k)}>
                {t(k).split(' & ')[0]}
              </Pill>
            ))}
          </div>

          <div className="mt-5 sm:mt-6 rounded-xl transition-all duration-300" role="tabpanel" aria-label={`${active} panel`}>
            <div className="rounded-lg overflow-hidden ring-1 ring-neutral-200">
              <Image
                src={activeImg}
                alt={activeTitle}
                width={800}
                height={600}
                className="w-full h-auto object-cover aspect-[4/3]"
                unoptimized
              />
            </div>

            <div className="mt-3 sm:mt-4 text-center sm:text-left">
              <h5 className="text-base sm:text-lg font-semibold">{activeTitle}</h5>
              <div className="mt-3 sm:mt-4 flex justify-center sm:justify-start">
                <Link
                  href="/projects"
                  className="inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold bg-brand-gold text-brand-ink hover:bg-brand-gold-deep transition-colors"
                >
                  {t('viewProjects')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
