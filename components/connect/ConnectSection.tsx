import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

export default async function ConnectCTA() {
  const t = await getTranslations('connect');

  return (
    <section
      id="connect"
      aria-labelledby="connect-cta"
      className="bg-gradient-to-b from-white to-neutral-50 text-center text-brand-ink py-12 sm:py-16 md:py-20 px-4"
    >
      <header className="mb-6 sm:mb-8">
        <h2
          id="connect-cta"
          className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight"
        >
          {t('title')}
        </h2>
        <p className="mt-3 text-[14px] sm:text-base text-neutral-600 max-w-xl mx-auto leading-relaxed">
          {t('subtitle')}
        </p>
      </header>

      <div className="mt-5 sm:mt-6 flex justify-center">
        <Link
          href="/connect"
          className="inline-flex items-center justify-center rounded-full bg-brand-gold hover:bg-brand-gold-deep px-5 sm:px-6 py-2.5 text-sm sm:text-base font-semibold text-brand-ink shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2"
        >
          {t('cta')}
        </Link>
      </div>
    </section>
  );
}
