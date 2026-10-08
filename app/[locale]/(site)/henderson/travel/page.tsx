import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import Section from '@/components/Section';
import { TRIPS } from '@/app/(site)/data/travel';
import type { Trip, TripLeg, Hotel, Flight } from '@/app/(site)/data/travel';

export const dynamic = 'force-static';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// Helpers -----------------------------------------------------------------

/** Pick EN or ZH string based on locale */
function t(en: string, zh: string | undefined, locale: string) {
  if (locale === 'en' || !zh) return en;
  return zh;
}

function fmtDate(iso: string, locale: string) {
  const lang = locale === 'en' ? 'en-US' : 'zh-CN';
  return new Date(iso + 'T00:00:00').toLocaleDateString(lang, {
    month: 'short',
    day: 'numeric',
    weekday: 'short',
  });
}

function fmtRange(start: string, end: string, locale: string) {
  return `${fmtDate(start, locale)} – ${fmtDate(end, locale)}`;
}

// Status badge
function StatusBadge({ status, locale }: { status: Hotel['status']; locale: string }) {
  const labels: Record<Hotel['status'], [string, string]> = {
    confirmed: ['Confirmed', '已确认'],
    pending: ['Pending', '待确认'],
    cancelled: ['Cancelled', '已取消'],
  };
  const colors: Record<Hotel['status'], string> = {
    confirmed: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    cancelled: 'bg-red-100 text-red-800',
  };
  const [en, zh] = labels[status];
  return (
    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${colors[status]}`}>
      {locale === 'en' ? en : zh}
    </span>
  );
}

// Sub-components ----------------------------------------------------------

function HotelCard({ hotel, locale }: { hotel: Hotel; locale: string }) {
  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-4 sm:p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h4 className="text-sm sm:text-base font-semibold text-neutral-900 leading-snug">
            {t(hotel.name, hotel.nameZh, locale)}
          </h4>
          <p className="mt-0.5 text-xs text-neutral-500">
            {t(hotel.location, hotel.locationZh, locale)}
          </p>
        </div>
        <StatusBadge status={hotel.status} locale={locale} />
      </div>

      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-neutral-700">
        <span>{fmtRange(hotel.checkIn, hotel.checkOut, locale)}</span>
        <span>
          {hotel.rooms} {locale === 'en' ? (hotel.rooms === 1 ? 'room' : 'rooms') : '间房'}
        </span>
        {hotel.cost && <span className="font-medium">{hotel.cost}</span>}
      </div>

      {(hotel.notes || hotel.notesZh) && (
        <p className="mt-2 text-xs text-neutral-500 leading-relaxed">
          {t(hotel.notes ?? '', hotel.notesZh, locale)}
        </p>
      )}
    </div>
  );
}

function FlightRow({ flight, locale }: { flight: Flight; locale: string }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 py-2.5 border-b border-neutral-100 last:border-0">
      <span className="shrink-0 text-sm font-semibold text-neutral-900 w-20">
        {t(flight.person, flight.personZh, locale)}
      </span>
      <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-sm text-neutral-700">
        <span>{fmtDate(flight.date, locale)}</span>
        <span className="text-neutral-300">|</span>
        <span>{t(flight.from, flight.fromZh, locale)}</span>
        <span className="text-neutral-400">&rarr;</span>
        <span>{t(flight.to, flight.toZh, locale)}</span>
        {flight.flightNo && (
          <>
            <span className="text-neutral-300">|</span>
            <span className="font-medium">
              {flight.airline} {flight.flightNo}
            </span>
          </>
        )}
        {flight.depart && flight.arrive && (
          <>
            <span className="text-neutral-300">|</span>
            <span>
              {flight.depart} &rarr; {flight.arrive}
            </span>
          </>
        )}
        {flight.terminal && (
          <span className="text-xs text-neutral-400">
            ({t(flight.terminal, flight.terminalZh, locale)})
          </span>
        )}
      </div>
    </div>
  );
}

function LegCard({ leg, index, locale }: { leg: TripLeg; index: number; locale: string }) {
  const isEn = locale === 'en';
  return (
    <div className="relative pl-8 sm:pl-10 pb-10 last:pb-0">
      {/* Timeline dot + line */}
      <div className="absolute left-0 top-0 flex flex-col items-center">
        <div className="h-5 w-5 rounded-full border-[3px] border-neutral-800 bg-white" />
        <div className="w-0.5 flex-1 bg-neutral-200" />
      </div>

      {/* Leg header */}
      <div className="mb-4">
        <h3 className="text-lg sm:text-xl font-bold text-neutral-900">
          <span className="mr-2 text-sm font-normal text-neutral-400">
            {String(index + 1).padStart(2, '0')}
          </span>
          {t(leg.city, leg.cityZh, locale)}
        </h3>
        <p className="text-sm text-neutral-500">
          {fmtRange(leg.startDate, leg.endDate, locale)}
          {leg.purpose && (
            <span className="ml-2 text-neutral-400">
              — {t(leg.purpose, leg.purposeZh, locale)}
            </span>
          )}
        </p>
      </div>

      {/* Hotels */}
      {leg.hotels.length > 0 && (
        <div className="mb-4">
          <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-neutral-400">
            {isEn ? 'Hotels' : '酒店'}
          </h4>
          <div className="space-y-3">
            {leg.hotels.map((h, i) => (
              <HotelCard key={i} hotel={h} locale={locale} />
            ))}
          </div>
        </div>
      )}

      {/* Flights */}
      {leg.flights.length > 0 && (
        <div className="mb-4">
          <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-neutral-400">
            {isEn ? 'Flights' : '航班'}
          </h4>
          <div className="rounded-xl border border-neutral-200 bg-white px-4 shadow-sm">
            {leg.flights.map((f, i) => (
              <FlightRow key={i} flight={f} locale={locale} />
            ))}
          </div>
        </div>
      )}

      {/* Leg notes */}
      {(leg.notes || leg.notesZh) && (
        <div className="rounded-lg bg-amber-50 border border-amber-200 px-4 py-3">
          <p className="text-sm text-amber-900 leading-relaxed">
            {t(leg.notes ?? '', leg.notesZh, locale)}
          </p>
        </div>
      )}
    </div>
  );
}

function TripSection({ trip, locale }: { trip: Trip; locale: string }) {
  return (
    <div className="mb-16 last:mb-0">
      <div className="mb-8 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900">
          {t(trip.name, trip.nameZh, locale)}
        </h2>
        <p className="mt-1 text-sm text-neutral-500">
          {t(trip.season, trip.seasonZh, locale)}
        </p>
      </div>

      <div className="mx-auto max-w-2xl">
        {trip.legs.map((leg, i) => (
          <LegCard key={i} leg={leg} index={i} locale={locale} />
        ))}
      </div>
    </div>
  );
}

// Page --------------------------------------------------------------------

export default async function TravelPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const isEn = locale === 'en';

  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900">
      <Section className="pt-20 pb-6 text-center">
        <p className="text-xs uppercase tracking-widest text-neutral-400">
          {isEn ? 'Internal · Team Only' : '内部 · 仅限团队'}
        </p>
        <h1 className="mt-2 text-3xl sm:text-4xl font-bold">
          {isEn ? 'Team Travel' : '团队出差行程'}
        </h1>
        <p className="mt-2 text-sm text-neutral-500 max-w-md mx-auto">
          {isEn
            ? 'Upcoming trip details — hotels, flights, and logistics in one place.'
            : '即将到来的出差详情 — 酒店、航班和后勤信息汇总。'}
        </p>

        {/* Language toggle */}
        <div className="mt-4 inline-flex rounded-full border border-neutral-200 bg-white text-sm overflow-hidden">
          <LangLink locale="en" current={locale} label="EN" />
          <LangLink locale="zh-TW" current={locale} label="繁" />
          <LangLink locale="zh-CN" current={locale} label="简" />
        </div>
      </Section>

      <Section className="pb-24">
        {TRIPS.map((trip) => (
          <TripSection key={trip.id} trip={trip} locale={locale} />
        ))}
      </Section>
    </main>
  );
}

// Language toggle links — simple <a> tags since we're switching locale
function LangLink({ locale, current, label }: { locale: string; current: string; label: string }) {
  const isActive = locale === current;
  const prefix = locale === 'en' ? '' : `/${locale}`;
  return (
    <a
      href={`${prefix}/henderson/travel`}
      className={`px-4 py-1.5 transition-colors ${
        isActive
          ? 'bg-neutral-900 text-white font-medium'
          : 'text-neutral-600 hover:bg-neutral-100'
      }`}
    >
      {label}
    </a>
  );
}
