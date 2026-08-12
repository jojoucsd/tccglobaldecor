import { cookies } from 'next/headers';
import Link from 'next/link';
import { ADMIN_COOKIE_NAME, parseSessionCookie } from '@/lib/adminAuth';
import { getAllProjects } from '@/lib/getProjects';
import { loginAction, logoutAction } from './actions';
import { navPillClass } from './adminStyles';

export const dynamic = 'force-dynamic';

// Tailwind's Preflight (loaded via globals.css for the analytics page) strips
// native button chrome, so these need explicit styling to still look tappable.
const primaryButtonStyle: React.CSSProperties = {
  padding: '12px 20px',
  fontSize: 15,
  fontWeight: 500,
  cursor: 'pointer',
  backgroundColor: '#0b0b0b',
  color: '#fff',
  border: 'none',
  borderRadius: 6,
};

const secondaryButtonStyle: React.CSSProperties = {
  padding: '8px 14px',
  fontSize: 13,
  cursor: 'pointer',
  backgroundColor: '#fff',
  color: '#0b0b0b',
  border: '1px solid #ccc',
  borderRadius: 6,
};

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const cookieStore = await cookies();
  const session = parseSessionCookie(cookieStore.get(ADMIN_COOKIE_NAME)?.value);

  if (!session) {
    return (
      <main style={{ maxWidth: 360, margin: '96px auto', padding: '0 16px', fontFamily: 'system-ui, sans-serif' }}>
        <h1 style={{ fontSize: 20, marginBottom: 16 }}>TCC Admin</h1>
        <form action={loginAction} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <input
            type="email"
            name="email"
            placeholder="you@tcc-carpets.com"
            autoFocus
            required
            style={{
              padding: 12,
              fontSize: 16,
              border: '1px solid #ccc',
              borderRadius: 6,
              WebkitAppearance: 'none',
            }}
          />
          <input
            type="password"
            name="passcode"
            placeholder="Passcode"
            required
            style={{
              padding: 12,
              fontSize: 16,
              border: '1px solid #ccc',
              borderRadius: 6,
              WebkitAppearance: 'none',
            }}
          />
          <button type="submit" style={primaryButtonStyle}>
            Enter
          </button>
        </form>
        {error && <p style={{ color: 'crimson', marginTop: 12, fontSize: 13 }}>Incorrect email or passcode.</p>}
      </main>
    );
  }

  const projects = await getAllProjects();

  return (
    <main style={{ maxWidth: 960, margin: '40px auto', fontFamily: 'system-ui, sans-serif', padding: '0 16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h1 style={{ fontSize: 22 }}>TCC Admin — Projects</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ fontSize: 13, color: '#666' }}>{session.email}</span>
          <Link href="/admin/settings" className={navPillClass}>Settings</Link>
          <Link href="/admin/rag" className={navPillClass}>RAG Corpus</Link>
          <Link href="/admin/analytics" className={navPillClass}>Analytics</Link>
          <form action={logoutAction}>
            <button type="submit" style={secondaryButtonStyle}>
              Log out
            </button>
          </form>
        </div>
      </div>

      <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14, minWidth: 480 }}>
        <thead>
          <tr style={{ textAlign: 'left', borderBottom: '1px solid #ddd' }}>
            <th style={{ padding: '8px 8px 8px 0' }}>Priority</th>
            <th style={{ padding: '8px 8px 8px 0' }}>Title</th>
            <th style={{ padding: '8px 8px 8px 0' }}>Slug</th>
            <th style={{ padding: '8px 8px 8px 0' }}>Tags</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {projects.map((p) => (
            <tr key={p.slug} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '8px 8px 8px 0' }}>{p.priority ?? '—'}</td>
              <td style={{ padding: '8px 8px 8px 0' }}>{p.title}</td>
              <td style={{ padding: '8px 8px 8px 0', color: '#666' }}>{p.slug}</td>
              <td style={{ padding: '8px 8px 8px 0', color: '#666' }}>{p.tags?.join(', ') || '—'}</td>
              <td style={{ padding: '8px 0' }}>
                <Link href={`/admin/${p.slug}`}>Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </main>
  );
}
