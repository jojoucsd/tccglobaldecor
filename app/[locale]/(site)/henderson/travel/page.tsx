import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import Section from '@/components/Section';
import { TRIPS } from '@/app/(site)/data/travel';
import type { Trip, Stop, Hotel, HotelBooking, Flight, Note } from '@/app/(site)/data/travel';

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

function lang(locale: string) {
  return locale === 'en' ? 'en-US' : 'zh-CN';
}

function toDate(iso: string) {
  return new Date(iso + 'T00:00:00');
}

/** "Wed, Nov 4" */
function fmtDay(iso: string, locale: string) {
  return toDate(iso).toLocaleDateString(lang(locale), { month: 'short', day: 'numeric', weekday: 'short' });
}

/** "Nov 4" */
function fmtShort(iso: string, locale: string) {
  return toDate(iso).toLocaleDateString(lang(locale), { month: 'short', day: 'numeric' });
}

// Sub-components ----------------------------------------------------------

function StatusBadge({ status, locale }: { status: HotelBooking['status']; locale: string }) {
  // Confirmed is the norm — only flag the exceptions
  if (status === 'confirmed') return null;
  const isEn = locale === 'en';
  const styles = {
    pending: ['Pending', '待确认', 'bg-yellow-100 text-yellow-800'],
    cancelled: ['Cancelled', '已取消', 'bg-red-100 text-red-800'],
  } as const;
  const [en, zh, color] = styles[status];
  return (
    <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${color}`}>{isEn ? en : zh}</span>
  );
}

/** Horizontal route: LA → Las Vegas → New York */
function TripRouteBar({ stops, locale }: { stops: Stop[]; locale: string }) {
  const isEn = locale === 'en';
  const transport = {
    drive: ['🚗', isEn ? 'Drive' : '自驾'],
    fly: ['✈️', isEn ? 'Fly' : '飞行'],
  } as const;

  return (
    <div className="mx-auto mb-8 max-w-2xl">
      <div className="flex items-center">
        {stops.map((stop, i) => (
          <div key={i} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center text-center min-w-[70px] sm:min-w-[90px]">
              <div className="h-4 w-4 sm:h-5 sm:w-5 rounded-full bg-amber-600 ring-4 ring-amber-100" />
              <span className="mt-2 text-xs sm:text-sm font-semibold text-neutral-900">
                {t(stop.city, stop.cityZh, locale)}
              </span>
              <span className="text-[10px] sm:text-xs text-neutral-500">
                {fmtShort(stop.startDate, locale)} – {fmtShort(stop.endDate, locale)}
              </span>
            </div>

            {stop.next && (
              <div className="flex-1 flex flex-col items-center mx-1 sm:mx-2">
                <span className="text-[10px] sm:text-xs text-neutral-400 mb-1">
                  {transport[stop.next][0]} {transport[stop.next][1]}
                </span>
                <div
                  className="w-full h-0.5"
                  style={{ backgroundImage: 'repeating-linear-gradient(90deg, #f59e0b 0 6px, transparent 6px 10px)' }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function SectionHeading({ id, en, zh, locale }: { id: string; en: string; zh: string; locale: string }) {
  return (
    <h3 id={id} className="mb-3 scroll-mt-24 text-lg font-bold text-neutral-900">
      {locale === 'en' ? en : zh}
    </h3>
  );
}

function Notes({ notes, locale }: { notes: Note[]; locale: string }) {
  if (notes.length === 0) return null;
  return (
    <ul className="mt-3 space-y-1 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
      {notes.map((n, i) => (
        <li key={i}>{locale === 'en' ? n.en : n.zh}</li>
      ))}
    </ul>
  );
}

function BookingRow({ booking, locale }: { booking: HotelBooking; locale: string }) {
  return (
    <li className="flex items-baseline justify-between gap-3 py-2 border-t border-neutral-100 first:border-0 first:pt-0 last:pb-0">
      <p className="text-sm font-medium text-neutral-900">
        {t(booking.guest, booking.guestZh, locale)} <StatusBadge status={booking.status} locale={locale} />
      </p>
      <p className="shrink-0 text-sm tabular-nums text-neutral-600">
        {fmtShort(booking.checkIn, locale)} – {fmtShort(booking.checkOut, locale)}
      </p>
    </li>
  );
}

function HotelCard({ hotel, locale }: { hotel: Hotel; locale: string }) {
  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm">
      <p className="text-[11px] font-semibold uppercase tracking-wider text-amber-700">
        {t(hotel.city, hotel.cityZh, locale)}
      </p>
      <h4 className="mt-0.5 text-base font-semibold leading-snug text-neutral-900">
        {t(hotel.name, hotel.nameZh, locale)}
      </h4>
      <p className="mt-0.5 text-xs text-neutral-500">{t(hotel.location, hotel.locationZh, locale)}</p>
      {hotel.notes && (
        <p className="mt-1 text-xs text-neutral-500">{t(hotel.notes, hotel.notesZh, locale)}</p>
      )}
      <ul className="mt-3 border-t border-neutral-100 pt-3">
        {hotel.bookings.map((b, i) => (
          <BookingRow key={i} booking={b} locale={locale} />
        ))}
      </ul>
    </div>
  );
}

/** "Hong Kong (HKG)" → "HKG" — keeps each flight to two short lines on a phone */
function airportCode(place: string) {
  return place.match(/\(([A-Z]{3})\)/)?.[1] ?? place;
}

function FlightRow({ flight, locale }: { flight: Flight; locale: string }) {
  return (
    <li className="py-2.5 border-t border-neutral-100 first:border-0 first:pt-0 last:pb-0">
      <div className="flex items-baseline justify-between gap-2">
        <p className="text-sm font-semibold text-neutral-900">{t(flight.person, flight.personZh, locale)}</p>
        {flight.flightNo && <p className="shrink-0 text-sm tabular-nums text-neutral-500">{flight.flightNo}</p>}
      </div>
      <p className="mt-0.5 text-sm tabular-nums text-neutral-700">
        {airportCode(flight.from)} → {airportCode(flight.to)}
        {flight.depart && flight.arrive && (
          <span className="text-neutral-500">
            {' · '}
            {flight.depart} → {flight.arrive}
          </span>
        )}
      </p>
    </li>
  );
}

/** Flights sorted chronologically and grouped by departure date, so each date shows once */
function groupFlightsByDate(flights: Flight[]) {
  const sorted = [...flights].sort((a, b) =>
    (a.date + (a.depart ?? '')).localeCompare(b.date + (b.depart ?? ''))
  );
  const groups: { date: string; flights: Flight[] }[] = [];
  for (const f of sorted) {
    const last = groups[groups.length - 1];
    if (last?.date === f.date) last.flights.push(f);
    else groups.push({ date: f.date, flights: [f] });
  }
  return groups;
}

function TripSection({ trip, locale }: { trip: Trip; locale: string }) {
  const isEn = locale === 'en';
  return (
    <div className="mx-auto max-w-2xl mb-16 last:mb-0">
      <div className="mb-6 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900">{t(trip.name, trip.nameZh, locale)}</h2>
        <p className="mt-1 text-sm text-neutral-500">{t(trip.season, trip.seasonZh, locale)}</p>
      </div>

      <TripRouteBar stops={trip.stops} locale={locale} />

      {/* Jump links — the page is long on mobile */}
      <nav className="mb-8 flex justify-center gap-2">
        <a href={`#${trip.id}-hotels`} className="rounded-full border border-neutral-300 bg-white px-4 py-1.5 text-sm font-medium text-neutral-700">
          {isEn ? 'Hotels' : '酒店'}
        </a>
        <a href={`#${trip.id}-flights`} className="rounded-full border border-neutral-300 bg-white px-4 py-1.5 text-sm font-medium text-neutral-700">
          {isEn ? 'Flights' : '航班'}
        </a>
      </nav>

      <section className="mb-10">
        <SectionHeading id={`${trip.id}-hotels`} en="Hotels" zh="酒店" locale={locale} />
        <div className="space-y-3">
          {trip.hotels.map((h, i) => (
            <HotelCard key={i} hotel={h} locale={locale} />
          ))}
        </div>
        <Notes notes={trip.hotelNotes} locale={locale} />
      </section>

      <section>
        <SectionHeading id={`${trip.id}-flights`} en="Flights" zh="航班" locale={locale} />
        <div className="space-y-3">
          {groupFlightsByDate(trip.flights).map((g) => (
            <div key={g.date} className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-amber-700">
                {fmtDay(g.date, locale)}
              </p>
              <ul className="mt-2">
                {g.flights.map((f, i) => (
                  <FlightRow key={i} flight={f} locale={locale} />
                ))}
              </ul>
            </div>
          ))}
        </div>
        <Notes notes={trip.flightNotes} locale={locale} />
      </section>
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
        <h1 className="mt-2 text-3xl sm:text-4xl font-bold">{isEn ? 'Team Travel' : '团队出差行程'}</h1>
      </Section>

      <Section className="pb-24">
        {TRIPS.map((trip) => (
          <TripSection key={trip.id} trip={trip} locale={locale} />
        ))}
      </Section>
    </main>
  );
}
