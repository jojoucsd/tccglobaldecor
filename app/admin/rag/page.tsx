import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { ADMIN_COOKIE_NAME, isValidSessionCookie } from '@/lib/adminAuth';
import { listRagFiles } from '@/lib/ragCorpus';
import { navPillClass } from '../adminStyles';

export const dynamic = 'force-dynamic';

export default async function AdminRag() {
  const cookieStore = await cookies();
  if (!isValidSessionCookie(cookieStore.get(ADMIN_COOKIE_NAME)?.value)) {
    redirect('/admin');
  }

  const files = listRagFiles();
  const company = files.filter((f) => f.category === 'company');
  const projects = files.filter((f) => f.category === 'projects');

  return (
    <main style={{ maxWidth: 640, margin: '40px auto', fontFamily: 'system-ui, sans-serif', padding: '0 16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h1 style={{ fontSize: 20 }}>RAG Corpus</h1>
        <Link href="/admin" className={navPillClass}>All projects</Link>
      </div>
      <p style={{ color: '#666', fontSize: 13, marginBottom: 24 }}>
        Generated baseline for the future RAG chatbot — see rag/README.md. Read-only.
      </p>

      <h2 style={{ fontSize: 15, fontWeight: 600, marginBottom: 8 }}>Company ({company.length})</h2>
      <ul style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 24 }}>
        {company.map((f) => (
          <li key={f.slug}>
            <Link href={`/admin/rag/${f.category}/${f.slug}`} style={{ fontSize: 14, color: '#0b0b0b' }}>
              {f.slug}
            </Link>
          </li>
        ))}
      </ul>

      <h2 style={{ fontSize: 15, fontWeight: 600, marginBottom: 8 }}>Projects ({projects.length})</h2>
      <ul style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {projects.map((f) => (
          <li key={f.slug}>
            <Link href={`/admin/rag/${f.category}/${f.slug}`} style={{ fontSize: 14, color: '#0b0b0b' }}>
              {f.slug}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
