import { setRequestLocale, getTranslations } from 'next-intl/server';
import Section from '@/components/Section';

const OFFICES = [
  {
    regionKey: 'asiaPacific' as const,
    name: 'TCC Carpets International Ltd.',
    lines: [
      'Flat 4–5, 14/F, Cheung Hing Building,',
      '540 Nathan Road, Yaumatei,',
      'Kowloon, Hong Kong',
    ],
    tel: '+852 2348 4848',
    fax: '+852 2782 2190',
    email: 'matthewsu@tcc-carpets.com',
  },
  {
    regionKey: 'northAmerica' as const,
    name: 'TCC Global Decor LLC',
    lines: ['777 Cloud Creek St.', 'Henderson, NV 89011, USA'],
    tel: null,
    fax: null,
    email: 'matthewsu@tcc-carpets.com',
  },
  {
    regionKey: 'greaterChina' as const,
    name: 'TCC Carpets Manufacture Ltd.',
    lines: [
      '19 Andar C & D, Edif. Kin Heng Long Plaza,',
      '258 Alameda Dr. Carlos d\'Assumpcao,',
      'Macau SAR',
    ],
    tel: null,
    fax: null,
    email: 'matthewsu@tcc-carpets.com',
  },
];

export default async function ConnectPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('connectPage');

  return (
    <main className="min-h-screen bg-white text-brand-ink">
      <Section pad="lg" className="pt-24 sm:pt-28">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
            {t('eyebrow')}
          </p>
          <h1 className="mt-3 text-4xl sm:text-5xl font-extrabold tracking-tight">
            {t('title')}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-neutral-600 leading-relaxed">
            {t('subtitle')}
          </p>
        </div>
      </Section>

      <Section pad="sm">
        <div className="h-px w-full bg-neutral-200" />
      </Section>

      <Section pad="lg" className="pb-28">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-12">
          {OFFICES.map((o) => (
            <div key={o.name} className="flex flex-col gap-4">
              <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-brand-gold-deep">
                {t(o.regionKey)}
              </p>
              <h2 className="text-base font-semibold leading-snug text-brand-ink">
                {o.name}
              </h2>
              <address className="not-italic text-sm text-neutral-600 leading-relaxed">
                {o.lines.map((l) => (
                  <span key={l} className="block">{l}</span>
                ))}
              </address>
              <ul className="space-y-2 text-sm mt-1">
                {o.tel && (
                  <li className="flex items-center gap-2">
                    <span className="w-8 text-neutral-400 text-xs uppercase tracking-wide">Tel</span>
                    <a
                      href={`tel:${o.tel.replace(/\s+/g, '')}`}
                      className="text-brand-ink hover:text-brand-gold-deep transition-colors underline underline-offset-2"
                    >
                      {o.tel}
                    </a>
                  </li>
                )}
                {o.fax && (
                  <li className="flex items-center gap-2">
                    <span className="w-8 text-neutral-400 text-xs uppercase tracking-wide">Fax</span>
                    <span className="text-neutral-600">{o.fax}</span>
                  </li>
                )}
                {o.email && (
                  <li className="flex items-center gap-2">
                    <span className="w-8 text-neutral-400 text-xs uppercase tracking-wide">Email</span>
                    <a
                      href={`mailto:${o.email}`}
                      className="text-brand-ink hover:text-brand-gold-deep transition-colors underline underline-offset-2 break-all"
                    >
                      {o.email}
                    </a>
                  </li>
                )}
              </ul>
            </div>
          ))}
        </div>
      </Section>
    </main>
  );
}
