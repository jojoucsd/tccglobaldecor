import { cookies } from 'next/headers';
import Link from 'next/link';
import { ADMIN_COOKIE_NAME, isValidSessionCookie } from '@/lib/adminAuth';
import { getAllProjects } from '@/lib/getProjects';
import { loginAction, logoutAction } from './actions';

export const dynamic = 'force-dynamic';

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const cookieStore = await cookies();
  const authed = isValidSessionCookie(cookieStore.get(ADMIN_COOKIE_NAME)?.value);

  if (!authed) {
    return (
      <main style={{ maxWidth: 360, margin: '96px auto', fontFamily: 'system-ui, sans-serif' }}>
        <h1 style={{ fontSize: 20, marginBottom: 16 }}>TCC Admin</h1>
        <form action={loginAction} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <input
            type="password"
            name="passcode"
            placeholder="Passcode"
            autoFocus
            required
            style={{ padding: 8, fontSize: 14, border: '1px solid #ccc', borderRadius: 4 }}
          />
          <button
            type="submit"
            style={{ padding: '8px 16px', fontSize: 14, cursor: 'pointer' }}
          >
            Enter
          </button>
        </form>
        {error && <p style={{ color: 'crimson', marginTop: 12, fontSize: 13 }}>Incorrect passcode.</p>}
      </main>
    );
  }

  const projects = await getAllProjects();

  return (
    <main style={{ maxWidth: 960, margin: '40px auto', fontFamily: 'system-ui, sans-serif', padding: '0 16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h1 style={{ fontSize: 22 }}>TCC Admin — Projects</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Link href="/admin/analytics">Analytics &rarr;</Link>
          <form action={logoutAction}>
            <button type="submit" style={{ padding: '6px 12px', fontSize: 13, cursor: 'pointer' }}>
              Log out
            </button>
          </form>
        </div>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
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
    </main>
  );
}
