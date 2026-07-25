import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Section from '@/components/Section';

const bp = process.env.NEXT_PUBLIC_BASE_PATH || '';

export default function About() {
  const t = useTranslations('about');

  const pillars = [
    { h: t('talentTitle'), p: t('talentDesc') },
    { h: t('communicationTitle'), p: t('communicationDesc') },
    { h: t('commitmentTitle'), p: t('commitmentDesc') },
  ];

  const highlights = [t('highlight1'), t('highlight2'), t('highlight3')];

  return (
    <Section
      id="about"
      style={{ scrollMarginTop: 'calc(var(--header-h))' }}
      className="scroll-mt-24"
    >
      <header className="text-center text-brand-ink">
        <p className="inline-flex items-center gap-2 text-[11px] tracking-[0.18em] uppercase text-neutral-500">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand-gold" />
          {t('eyebrow')}
        </p>
        <h1 className="mt-1 text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
          <a
            href="https://www.marinabaysands.com/stories/room-craft-tcc-carpets.html"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline hover:text-brand-gold transition-colors"
          >
            {t('title')}
          </a>
        </h1>
        <div className="mx-auto mt-2 h-[3px] w-20 rounded-full bg-brand-gold" />
      </header>

      <div className="mt-6 md:mt-10 grid grid-cols-1 md:grid-cols-[45%_55%] gap-8 md:gap-10 items-start text-brand-ink">
        <div className="relative w-full aspect-[4/3] md:aspect-auto md:h-full overflow-hidden rounded-xl md:rounded-2xl bg-neutral-100 ring-1 ring-neutral-200">
          <Image
            src={`${bp}/images/about/artineveryfootstep.avif`}
            alt="Hospitality lounge featuring custom carpet by TCC"
            fill
            className="object-cover object-center"
            priority
            unoptimized
          />
        </div>

        <div>
          <p className="text-[15px] leading-relaxed text-neutral-800 sm:text-base md:text-lg">
            {t('intro')}
          </p>

          <div className="mt-4 flex flex-col sm:flex-row gap-3">
            <Link
              href="/projects"
              className="inline-flex items-center justify-center rounded-full bg-brand-gold text-brand-ink px-5 py-2.5 text-sm font-semibold shadow-sm hover:bg-brand-gold-deep transition-colors w-full sm:w-auto"
            >
              {t('viewProjects')}
            </Link>
            <Link
              href="/process"
              className="inline-flex items-center justify-center rounded-full border border-neutral-300 px-5 py-2.5 text-sm font-semibold text-brand-ink hover:bg-neutral-50 transition-colors w-full sm:w-auto"
            >
              {t('ourProcess')}
            </Link>
          </div>

          <div className="mt-6 md:mt-8 space-y-4 md:space-y-6">
            {pillars.map((it) => (
              <section
                key={it.h}
                className="rounded-lg bg-neutral-50/60 px-4 py-4 ring-1 ring-neutral-200 md:bg-transparent md:ring-0"
              >
                <h3 className="text-base sm:text-lg md:text-xl font-semibold">
                  <span className="inline-block border-l-4 border-brand-gold pl-3">{it.h}</span>
                </h3>
                <p className="mt-2 text-neutral-700 text-sm sm:text-base">{it.p}</p>
              </section>
            ))}
          </div>

          <ul className="hidden md:block mt-8 ml-5 list-disc space-y-2 marker:text-brand-gold text-neutral-900">
            {highlights.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
