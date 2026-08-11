import { cookies } from 'next/headers';
import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import { ADMIN_COOKIE_NAME, isValidSessionCookie } from '@/lib/adminAuth';
import { getProjectBySlug } from '@/lib/getProjects';
import { saveProjectAction } from '../actions';

export const dynamic = 'force-dynamic';

// fontSize 16 avoids iOS Safari auto-zooming the page when a field is focused
const fieldStyle: React.CSSProperties = { padding: 10, fontSize: 16, border: '1px solid #ccc', borderRadius: 6, font: 'inherit' };
const labelStyle: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: 4, fontSize: 13, color: '#333' };
const saveButtonStyle: React.CSSProperties = {
  padding: '12px 24px',
  fontSize: 15,
  fontWeight: 500,
  cursor: 'pointer',
  backgroundColor: '#0b0b0b',
  color: '#fff',
  border: 'none',
  borderRadius: 6,
  alignSelf: 'flex-start',
};

export default async function AdminEditProject({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ saved?: string }>;
}) {
  const { slug } = await params;
  const { saved } = await searchParams;

  const cookieStore = await cookies();
  if (!isValidSessionCookie(cookieStore.get(ADMIN_COOKIE_NAME)?.value)) {
    redirect('/admin');
  }

  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <main style={{ maxWidth: 640, margin: '40px auto', fontFamily: 'system-ui, sans-serif', padding: '0 16px' }}>
      <p style={{ marginBottom: 16 }}>
        <Link href="/admin">&larr; All projects</Link>
      </p>
      <h1 style={{ fontSize: 20, marginBottom: 4 }}>{project.title}</h1>
      <p style={{ color: '#666', fontSize: 13, marginBottom: 16 }}>{project.slug}</p>

      {saved && <p style={{ color: 'green', fontSize: 13, marginBottom: 16 }}>Saved.</p>}

      <form action={saveProjectAction} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <input type="hidden" name="slug" value={project.slug} />

        <label style={labelStyle}>
          Title
          <input style={fieldStyle} name="title" defaultValue={project.title} required />
        </label>

        <label style={labelStyle}>
          Address
          <input style={fieldStyle} name="address" defaultValue={project.address ?? ''} />
        </label>

        <label style={labelStyle}>
          Summary
          <textarea style={fieldStyle} name="summary" defaultValue={project.summary ?? ''} rows={2} />
        </label>

        <label style={labelStyle}>
          Description
          <textarea style={fieldStyle} name="description" defaultValue={project.description ?? ''} rows={4} />
        </label>

        <label style={labelStyle}>
          Notes
          <textarea style={fieldStyle} name="notes" defaultValue={project.notes ?? ''} rows={2} />
        </label>

        <label style={labelStyle}>
          Tags (comma-separated: hotel, restaurant, gaming, living)
          <input style={fieldStyle} name="tags" defaultValue={(project.tags ?? []).join(', ')} />
        </label>

        <label style={labelStyle}>
          Priority (lower = shows first; blank = unfeatured)
          <input style={fieldStyle} name="priority" type="number" defaultValue={project.priority ?? ''} />
        </label>

        <label style={labelStyle}>
          Cover position (CSS object-position, e.g. &quot;top&quot; or &quot;20% 50%&quot;)
          <input style={fieldStyle} name="coverPosition" defaultValue={project.coverPosition ?? ''} />
        </label>

        <button type="submit" style={saveButtonStyle}>
          Save
        </button>
      </form>
    </main>
  );
}
