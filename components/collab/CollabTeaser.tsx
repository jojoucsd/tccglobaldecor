import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Section from '@/components/Section';
import { COLLABORATIONS } from '@/app/(site)/data/collaborations';

const bp = process.env.NEXT_PUBLIC_BASE_PATH || '';

const BLUR =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2U1ZTdlYiIvPjwvc3ZnPg==';

export default function CollabTeaser() {
  const t = useTranslations('collaborations');

  return (
    <Section id="collaborations" className="bg-white text-brand-ink">
      <div className="flex items-end justify-between mb-3 sm:mb-6 md:mb-8">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold flex items-center gap-3">
          <span className="inline-block h-[3px] w-8 bg-brand-gold rounded-full" />
          {t('title')}
        </h2>
      </div>

      <div className="flex gap-3 sm:gap-5 overflow-x-auto pb-2 snap-x snap-mandatory sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:overflow-visible [-webkit-overflow-scrolling:touch]">
        {COLLABORATIONS.map((c, i) => (
          <Link
            key={c.title}
            href={c.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex-shrink-0 w-[62%] sm:w-auto border border-neutral-200 bg-white hover:ring-2 hover:ring-brand-gold transition rounded-lg sm:rounded-none snap-start"
            aria-label={`${c.title} — ${c.role ?? 'Collaboration'}`}
          >
            <div className="relative w-full aspect-[3/1.6] bg-white">
              <Image
                src={`${bp}/images/collaborations/${c.img}`}
                alt={c.title}
                fill
                sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 80vw"
                className="object-contain p-4 sm:p-6"
                unoptimized
                placeholder="blur"
                blurDataURL={BLUR}
                fetchPriority={i === 0 ? 'high' : 'auto'}
              />
            </div>
            <div className="px-3 py-2 text-center sm:text-left">
              <h3 className="text-[13px] sm:text-base font-semibold">{c.title}</h3>
              {c.role && <p className="text-[11px] sm:text-sm text-neutral-600 mt-0.5">{c.role}</p>}
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
}
