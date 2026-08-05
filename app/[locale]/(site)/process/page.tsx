import { setRequestLocale, getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import Section from '@/components/Section';

export const dynamic = 'force-static';
const bp = process.env.NEXT_PUBLIC_BASE_PATH || '';

type Step = {
  id: number;
  label: string;
  title: string;
  image: string;
};

function TimelineStep({ step, index }: { step: Step; index: number }) {
  const isLeft = index % 2 === 0;
  const overlapClass = index === 0 ? '' : '-mt-20 sm:-mt-24 md:-mt-32 lg:-mt-36';

  const card = (
    <div className={`bg-transparent rounded-none p-4 sm:p-5 flex flex-col ${isLeft ? 'items-end text-right' : 'items-start text-left'}`}>
      {step.label && (
        <p className="text-[10px] sm:text-xs font-semibold tracking-[0.18em] uppercase text-brand-gold">
          {step.label}
        </p>
      )}
      <h3 className={`text-sm sm:text-base md:text-lg font-semibold text-brand-ink ${step.label ? 'mt-1' : ''}`}>
        {step.title}
      </h3>
    </div>
  );

  const image = (
    <div className="relative mt-2 sm:mt-3 aspect-[3/2] overflow-hidden rounded-2xl bg-neutral-100">
      <Image src={step.image} alt={step.title} fill className="object-cover" unoptimized />
    </div>
  );

  const Inner = (
    <div className="w-full max-w-sm sm:max-w-md md:max-w-lg">
      {card}
      {image}
    </div>
  );

  return (
    <li className={`relative grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 lg:gap-8 ${overlapClass}`}>
      {isLeft ? (
        <>
          <div className="pr-2 sm:pr-4 md:pr-8 lg:pr-12 flex justify-end">{Inner}</div>
          <div />
        </>
      ) : (
        <>
          <div />
          <div className="pl-2 sm:pl-4 md:pl-8 lg:pl-12 flex justify-start">{Inner}</div>
        </>
      )}
    </li>
  );
}

function ProcessTimeline({ steps }: { steps: Step[] }) {
  return (
    <Section className="pb-16">
      <div className="relative mx-auto max-w-6xl">
        <svg
          className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-full w-20 sm:w-32 md:w-40 lg:w-48"
          viewBox="0 0 190 800"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M95 0 C 45 80, 145 160, 95 240 S 145 400, 95 480 S 45 640, 95 800" fill="none" stroke="#EE9629" strokeWidth="5" strokeLinecap="round" />
          <path d="M80 0 C 30 80, 130 160, 80 240 S 130 400, 80 480 S 30 640, 80 800" fill="none" stroke="#161616" strokeWidth="3" strokeLinecap="round" opacity="0.9" />
          <path d="M110 0 C 60 80, 160 160, 110 240 S 160 400, 110 480 S 60 640, 110 800" fill="none" stroke="#A0A0A0" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
        </svg>

        <ol className="relative space-y-10 md:space-y-16">
          {steps.map((step, i) => (
            <TimelineStep key={step.id} step={step} index={i} />
          ))}
        </ol>
      </div>
    </Section>
  );
}

export default async function ProcessPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('process');

  const STEPS: Step[] = [
    { id: 1, label: t('stepLabel', { n: 1 }), title: t('step1Title'), image: `${bp}/images/process/1.avif` },
    { id: 2, label: t('stepLabel', { n: 2 }), title: t('step2Title'), image: `${bp}/images/process/2.avif` },
    { id: 3, label: t('stepLabel', { n: 3 }), title: t('step3Title'), image: `${bp}/images/process/3.avif` },
    { id: 4, label: t('stepLabel', { n: 4 }), title: t('step4Title'), image: `${bp}/images/process/4.avif` },
    { id: 5, label: t('stepLabel', { n: 5 }), title: t('step5Title'), image: `${bp}/images/process/6.avif` },
    { id: 6, label: '', title: 'Autograph Suite', image: `${bp}/images/process/7.avif` },
    { id: 7, label: '', title: 'Kameo Suite', image: `${bp}/images/process/8.avif` },
    { id: 8, label: '', title: 'Ikonik Suite', image: `${bp}/images/process/9.avif` },
  ];

  return (
    <main className="min-h-screen bg-white text-brand-ink">
      <Section className="pt-20 pb-8 text-center">
        <p className="text-sm uppercase tracking-widest text-brand-gold">{t('eyebrow')}</p>
        <h1 className="mt-2 text-3xl md:text-4xl font-bold text-brand-ink">
          {t('title')}
        </h1>
        <p className="mt-3 max-w-3xl mx-auto text-neutral-800">
          {t('subtitle')}
        </p>
      </Section>

      <ProcessTimeline steps={STEPS} />

      <Section className="pb-24">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-sm md:text-base text-neutral-800">
            {t('ctaQuestion')}
          </p>
          <div className="flex gap-3">
            <Link
              href="/projects"
              className="inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold bg-brand-gold text-brand-ink hover:bg-brand-gold-deep transition-colors"
            >
              {t('seeProjects')}
            </Link>
            <Link
              href="/connect"
              className="inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold border border-brand-gold text-brand-ink hover:bg-brand-gold/10 transition-colors"
            >
              {t('startProject')}
            </Link>
          </div>
        </div>
      </Section>
    </main>
  );
}
