import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { ADMIN_COOKIE_NAME, isValidSessionCookie } from '@/lib/adminAuth';
import {
  getRecentEvents,
  getTopViewedProjects,
  getTopPages,
  getEventCounts,
  getDailyPageviews,
  type AnalyticsEvent,
} from '@/lib/analytics';

export const dynamic = 'force-dynamic';

// Single-hue blue (dataviz palette slot 1) — every chart here is one series,
// so sequential/one-hue applies throughout; no categorical palette needed.
const BLUE = '#2a78d6';
const INK = '#0b0b0b';
const INK_SECONDARY = '#52514e';
const INK_MUTED = '#898781';
const GRID = '#e1e0d9';
const BASELINE = '#c3c2b7';

function formatTime(iso: string) {
  return new Date(iso).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

function formatDayLabel(dateStr: string) {
  const d = new Date(`${dateStr}T00:00:00Z`);
  return d.toLocaleDateString('en-US', { weekday: 'short', timeZone: 'UTC' }).slice(0, 1);
}

function StatTile({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-xl border border-black/10 bg-[#fcfcfb] p-4">
      <div className="text-xs text-[#898781]">{label}</div>
      <div className="mt-1 text-2xl font-semibold text-[#0b0b0b] truncate">{value}</div>
      {sub && <div className="mt-0.5 text-xs text-[#52514e] truncate">{sub}</div>}
    </div>
  );
}

// Round a max value up to a "nice" axis ceiling (2, 5, 10, 20, 25, 50, 100…)
// so gridlines land on clean numbers instead of the raw data max.
function niceCeiling(value: number): number {
  if (value <= 5) return 5;
  const magnitude = Math.pow(10, Math.floor(Math.log10(value)));
  const steps = [1, 2, 2.5, 5, 10];
  for (const step of steps) {
    const candidate = step * magnitude;
    if (candidate >= value) return candidate;
  }
  return Math.ceil(value / magnitude) * magnitude;
}

function TrendChart({ data }: { data: { date: string; count: number }[] }) {
  const rawMax = Math.max(...data.map((d) => d.count), 0);
  const hasData = rawMax > 0;
  const axisMax = niceCeiling(rawMax || 5);

  const leftAxisWidth = 20;
  const barSlot = 22;
  const plotWidth = data.length * barSlot;
  const width = plotWidth + leftAxisWidth;
  const topLabelSpace = 14;
  const plotHeight = 70;
  const dayLabelSpace = 16;
  const height = topLabelSpace + plotHeight + dayLabelSpace;
  const plotTop = topLabelSpace;
  const plotBottom = topLabelSpace + plotHeight;

  const gridSteps = [0, 0.5, 1]; // 0%, mid, top of axisMax

  return (
    <div className="rounded-xl border border-black/10 bg-[#fcfcfb] p-4">
      <h2 className="text-sm font-semibold text-[#0b0b0b] mb-1">Pageviews — last {data.length} days</h2>
      {!hasData ? (
        <p className="text-sm text-[#898781] py-6">No pageviews recorded yet.</p>
      ) : (
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full" style={{ height: 140 }} preserveAspectRatio="none">
          {gridSteps.map((step) => {
            const y = plotBottom - step * plotHeight;
            const value = Math.round(axisMax * step);
            return (
              <g key={step}>
                <line
                  x1={leftAxisWidth}
                  y1={y}
                  x2={width}
                  y2={y}
                  stroke={step === 0 ? BASELINE : GRID}
                  strokeWidth={1}
                />
                <text x={leftAxisWidth - 4} y={y + 3} fontSize={8} fill={INK_MUTED} textAnchor="end">
                  {value}
                </text>
              </g>
            );
          })}
          {data.map((d, i) => {
            const barW = 14;
            const x = leftAxisWidth + i * barSlot + 4;
            const h = (d.count / axisMax) * plotHeight;
            const y = plotBottom - h;
            const isMax = d.count === rawMax && rawMax > 0;
            return (
              <g key={d.date}>
                <rect
                  x={x}
                  y={h > 0 ? y : plotBottom - 1}
                  width={barW}
                  height={h > 0 ? h : 1}
                  rx={3}
                  fill={isMax ? BLUE : `${BLUE}99`}
                >
                  <title>{`${d.date}: ${d.count} pageview${d.count === 1 ? '' : 's'}`}</title>
                </rect>
                {isMax && (
                  <text x={x + barW / 2} y={y - 4} fontSize={9} fill={INK_SECONDARY} textAnchor="middle">
                    {d.count}
                  </text>
                )}
                <text x={x + barW / 2} y={height - 3} fontSize={8} fill={INK_MUTED} textAnchor="middle">
                  {formatDayLabel(d.date)}
                </text>
              </g>
            );
          })}
        </svg>
      )}
    </div>
  );
}

function TopProjectsChart({ data }: { data: { slug: string; views: number }[] }) {
  const max = Math.max(...data.map((d) => d.views), 1);

  return (
    <div className="rounded-xl border border-black/10 bg-[#fcfcfb] p-4">
      <h2 className="text-sm font-semibold text-[#0b0b0b] mb-3">Top-viewed projects</h2>
      {data.length === 0 ? (
        <p className="text-sm text-[#898781] py-2">No project views recorded yet.</p>
      ) : (
        <ul className="flex flex-col gap-2.5">
          {data.map((p) => (
            <li key={p.slug}>
              <div className="flex items-baseline justify-between gap-2 mb-1">
                <Link href={`/admin/${p.slug}`} className="text-sm text-[#0b0b0b] truncate hover:underline">
                  {p.slug}
                </Link>
                <span className="text-xs text-[#52514e] shrink-0">{p.views}</span>
              </div>
              <div className="h-2 rounded-full" style={{ backgroundColor: GRID }}>
                <div
                  className="h-2 rounded-full"
                  style={{ width: `${Math.max((p.views / max) * 100, 4)}%`, backgroundColor: BLUE }}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function TopPagesChart({ data }: { data: { path: string; views: number }[] }) {
  const max = Math.max(...data.map((d) => d.views), 1);

  return (
    <div className="rounded-xl border border-black/10 bg-[#fcfcfb] p-4">
      <h2 className="text-sm font-semibold text-[#0b0b0b] mb-1">Top pages</h2>
      <p className="text-xs text-[#52514e] mb-3">Home, process, gallery, and connect — everything outside the project catalog.</p>
      {data.length === 0 ? (
        <p className="text-sm text-[#898781] py-2">No page views recorded yet.</p>
      ) : (
        <ul className="flex flex-col gap-2.5">
          {data.map((p) => (
            <li key={p.path}>
              <div className="flex items-baseline justify-between gap-2 mb-1">
                <span className="text-sm text-[#0b0b0b] truncate">{p.path === '/' ? 'Homepage' : p.path}</span>
                <span className="text-xs text-[#52514e] shrink-0">{p.views}</span>
              </div>
              <div className="h-2 rounded-full" style={{ backgroundColor: GRID }}>
                <div
                  className="h-2 rounded-full"
                  style={{ width: `${Math.max((p.views / max) * 100, 4)}%`, backgroundColor: BLUE }}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function EventCard({ e, showLead }: { e: AnalyticsEvent; showLead?: boolean }) {
  return (
    <li className="rounded-lg border border-black/10 bg-[#fcfcfb] p-3">
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-medium text-[#0b0b0b] truncate">{e.path}</span>
        <span className="text-xs text-[#898781] shrink-0">{formatTime(e.created_at)}</span>
      </div>
      <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-[#52514e]">
        {e.locale && <span>{e.locale}</span>}
        {e.referrer && <span className="truncate max-w-[160px]">from {e.referrer}</span>}
        {showLead && e.lead && (
          <span className="rounded-full bg-[#2a78d6]/10 px-2 py-0.5 text-[#2a78d6] font-medium">{e.lead}</span>
        )}
        <span className="text-[#898781]">{e.session_id.slice(0, 8)}</span>
      </div>
    </li>
  );
}

export default async function AdminAnalytics() {
  const cookieStore = await cookies();
  if (!isValidSessionCookie(cookieStore.get(ADMIN_COOKIE_NAME)?.value)) {
    redirect('/admin');
  }

  const [recent, topProjects, topPages, counts, daily] = await Promise.all([
    getRecentEvents(30),
    getTopViewedProjects(5),
    getTopPages(5),
    getEventCounts(),
    getDailyPageviews(14),
  ]);

  const topProject = topProjects[0];

  return (
    <main className="max-w-3xl mx-auto px-4 py-8 pb-20" style={{ fontFamily: 'system-ui, sans-serif', color: INK }}>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-lg font-semibold">TCC Analytics</h1>
        <Link href="/admin" className="text-sm text-[#2a78d6]">
          Projects &rarr;
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        <StatTile label="Visitors" value={`~${counts.uniqueSessions.toLocaleString()}`} />
        <StatTile label="Total pageviews" value={counts.totalEvents.toLocaleString()} />
        <StatTile
          label="Top project"
          value={topProject ? topProject.slug : '—'}
          sub={topProject ? `${topProject.views} view${topProject.views === 1 ? '' : 's'}` : undefined}
        />
      </div>

      <div className="mb-6">
        <TrendChart data={daily} />
      </div>

      <div className="mb-6">
        <TopProjectsChart data={topProjects} />
      </div>

      <div className="mb-6">
        <TopPagesChart data={topPages} />
      </div>

      <section>
        <h2 className="text-sm font-semibold mb-3">Recent visits</h2>
        {recent.length === 0 ? (
          <p className="text-sm text-[#898781]">No visits recorded yet.</p>
        ) : (
          <ul className="flex flex-col gap-2">
            {recent.map((e) => (
              <EventCard key={e.id} e={e} showLead />
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
