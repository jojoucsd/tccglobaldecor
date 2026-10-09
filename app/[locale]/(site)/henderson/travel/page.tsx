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

/** Horizontal progress bar: LA → Las Vegas → New York */
function TripRouteBar({ locale }: { locale: string }) {
  const isEn = locale === 'en';
  const stops = [
    { city: isEn ? 'Los Angeles' : '洛杉矶', dates: 'Oct 23–26', transport: '🚗', transportLabel: isEn ? 'Drive' : '自驾' },
    { city: isEn ? 'Las Vegas' : '拉斯维加斯', dates: 'Oct 26–Nov 4', transport: '✈️', transportLabel: isEn ? 'Fly' : '飞行' },
    { city: isEn ? 'New York' : '纽约', dates: 'Nov 4–12' },
  ];

  return (
    <div className="mx-auto mb-10 max-w-2xl px-4">
      <div className="flex items-center">
        {stops.map((stop, i) => (
          <div key={i} className="flex items-center flex-1 last:flex-none">
            {/* Stop dot + label */}
            <div className="flex flex-col items-center text-center min-w-[70px] sm:min-w-[90px]">
              <div className="relative">
                <div className="h-4 w-4 sm:h-5 sm:w-5 rounded-full bg-amber-600 ring-4 ring-amber-100" />
                <span className="absolute -top-0.5 -left-0.5 h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-amber-600/20 animate-ping" style={{ animationDuration: '3s' }} />
              </div>
              <span className="mt-2 text-xs sm:text-sm font-semibold text-neutral-900">{stop.city}</span>
              <span className="text-[10px] sm:text-xs text-neutral-500">{stop.dates}</span>
            </div>

            {/* Connector line + transport */}
            {stop.transport && (
              <div className="flex-1 flex flex-col items-center mx-1 sm:mx-2">
                <span className="text-[10px] sm:text-xs text-neutral-400 mb-1">{stop.transport} {stop.transportLabel}</span>
                <div className="w-full h-0.5 bg-amber-300 relative">
                  <div className="absolute inset-0 bg-amber-500" style={{ backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 6px, #fef3c7 6px, #fef3c7 10px)' }} />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/** Group hotels by name and render as one card with sub-rows per booking */
function groupHotelsByName(hotels: Hotel[]) {
  const groups: { name: string; nameZh?: string; location: string; locationZh?: string; bookings: Hotel[] }[] = [];
  for (const h of hotels) {
    const existing = groups.find((g) => g.name === h.name);
    if (existing) {
      existing.bookings.push(h);
    } else {
      groups.push({ name: h.name, nameZh: h.nameZh, location: h.location, locationZh: h.locationZh, bookings: [h] });
    }
  }
  return groups;
}

function HotelBookingRow({ hotel, locale }: { hotel: Hotel; locale: string }) {
  const isEn = locale === 'en';
  return (
    <div className="py-3 border-b border-neutral-100 last:border-0">
      <div className="flex items-start justify-between gap-2">
        {hotel.guest && (
          <p className="text-sm font-medium text-neutral-800">
            {t(hotel.guest, hotel.guestZh, locale)}
          </p>
        )}
        <StatusBadge status={hotel.status} locale={locale} />
      </div>

      {hotel.roomType && (
        <p className="mt-1 text-xs text-neutral-500">{hotel.roomType}</p>
      )}

      <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-0.5 text-sm text-neutral-700">
        <span>{fmtRange(hotel.checkIn, hotel.checkOut, locale)}</span>
        <span>
          {hotel.rooms} {isEn ? (hotel.rooms === 1 ? 'room' : 'rooms') : '间房'}
        </span>
      </div>

      {hotel.confNo && (
        <p className="mt-1 text-xs text-neutral-400">
          {isEn ? 'Conf #' : '确认号 #'}{hotel.confNo}
        </p>
      )}

      {(hotel.cancelBy || hotel.cancelByZh) && (
        <p className="mt-0.5 text-xs text-orange-600">
          {t(hotel.cancelBy ?? '', hotel.cancelByZh, locale)}
        </p>
      )}

      {(hotel.notes || hotel.notesZh) && (
        <p className="mt-1 text-xs text-neutral-500 leading-relaxed">
          {t(hotel.notes ?? '', hotel.notesZh, locale)}
        </p>
      )}
    </div>
  );
}

function HotelCard({ hotel, locale }: { hotel: Hotel; locale: string }) {
  const isEn = locale === 'en';
  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-4 sm:p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h4 className="text-sm sm:text-base font-semibold leading-snug text-neutral-900">
            {t(hotel.name, hotel.nameZh, locale)}
          </h4>
          <p className="mt-0.5 text-xs text-neutral-500">
            {t(hotel.location, hotel.locationZh, locale)}
          </p>
        </div>
        <StatusBadge status={hotel.status} locale={locale} />
      </div>

      {hotel.guest && (
        <p className="mt-2 text-sm font-medium text-neutral-800">
          {t(hotel.guest, hotel.guestZh, locale)}
        </p>
      )}

      {hotel.roomType && (
        <p className="mt-1 text-xs text-neutral-500">{hotel.roomType}</p>
      )}

      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-neutral-700">
        <span>{fmtRange(hotel.checkIn, hotel.checkOut, locale)}</span>
        <span>
          {hotel.rooms} {isEn ? (hotel.rooms === 1 ? 'room' : 'rooms') : '间房'}
        </span>
      </div>

      {hotel.confNo && (
        <p className="mt-2 text-xs text-neutral-400">
          {isEn ? 'Conf #' : '确认号 #'}{hotel.confNo}
        </p>
      )}

      {(hotel.cancelBy || hotel.cancelByZh) && (
        <p className="mt-1 text-xs text-orange-600">
          {t(hotel.cancelBy ?? '', hotel.cancelByZh, locale)}
        </p>
      )}

      {(hotel.notes || hotel.notesZh) && (
        <p className="mt-2 text-xs text-neutral-500 leading-relaxed">
          {t(hotel.notes ?? '', hotel.notesZh, locale)}
        </p>
      )}
    </div>
  );
}

function GroupedHotelCard({ group, locale }: { group: ReturnType<typeof groupHotelsByName>[number]; locale: string }) {
  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-4 sm:p-5 shadow-sm">
      <h4 className="text-sm sm:text-base font-semibold leading-snug text-neutral-900">
        {t(group.name, group.nameZh, locale)}
      </h4>
      <p className="mt-0.5 text-xs text-neutral-500">
        {t(group.location, group.locationZh, locale)}
      </p>
      <div className="mt-2">
        {group.bookings.map((h, i) => (
          <HotelBookingRow key={i} hotel={h} locale={locale} />
        ))}
      </div>
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

      {/* Hotels — group by name to condense repeated hotels */}
      {leg.hotels.length > 0 && (() => {
        const groups = groupHotelsByName(leg.hotels);
        return (
          <div className="mb-4">
            <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-neutral-400">
              {isEn ? 'Hotels' : '酒店'}
            </h4>
            <div className="space-y-3">
              {groups.map((g, i) =>
                g.bookings.length === 1 ? (
                  <HotelCard key={i} hotel={g.bookings[0]} locale={locale} />
                ) : (
                  <GroupedHotelCard key={i} group={g} locale={locale} />
                )
              )}
            </div>
          </div>
        );
      })()}

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

      <TripRouteBar locale={locale} />

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

      </Section>

      <Section className="pb-24">
        {TRIPS.map((trip) => (
          <TripSection key={trip.id} trip={trip} locale={locale} />
        ))}
      </Section>
    </main>
  );
}

