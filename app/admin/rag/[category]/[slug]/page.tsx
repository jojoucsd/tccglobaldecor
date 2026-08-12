import { cookies } from 'next/headers';
import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import { ADMIN_COOKIE_NAME, isValidSessionCookie } from '@/lib/adminAuth';
import { readRagFile } from '@/lib/ragCorpus';
import { navPillClass } from '../../../adminStyles';

export const dynamic = 'force-dynamic';

export default async function AdminRagFile({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;

  const cookieStore = await cookies();
  if (!isValidSessionCookie(cookieStore.get(ADMIN_COOKIE_NAME)?.value)) {
    redirect('/admin');
  }

  const content = readRagFile(category, slug);
  if (content == null) notFound();

  return (
    <main style={{ maxWidth: 720, margin: '40px auto', fontFamily: 'system-ui, sans-serif', padding: '0 16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h1 style={{ fontSize: 18, fontFamily: 'monospace' }}>{category}/{slug}.md</h1>
        <Link href="/admin/rag" className={navPillClass}>All files</Link>
      </div>
      <pre
        style={{
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
          fontSize: 13,
          lineHeight: 1.6,
          background: '#f7f7f5',
          border: '1px solid #eee',
          borderRadius: 8,
          padding: 16,
        }}
      >
        {content}
      </pre>
    </main>
  );
}
