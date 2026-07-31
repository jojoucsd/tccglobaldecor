import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Section from '@/components/Section';

export default async function NotFound() {
  const t = await getTranslations('notFound');

  return (
    <Section pad="lg" className="pt-32 sm:pt-40 pb-24 text-center">
      <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">404</p>
      <h1 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight text-brand-ink">
        {t('title')}
      </h1>
      <p className="mt-4 text-base text-neutral-600 max-w-md mx-auto leading-relaxed">
        {t('message')}
      </p>
      <div className="mt-8">
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-full bg-brand-gold hover:bg-brand-gold-deep px-6 py-2.5 text-sm font-semibold text-brand-ink transition-colors"
        >
          {t('backHome')}
        </Link>
      </div>
    </Section>
  );
}
