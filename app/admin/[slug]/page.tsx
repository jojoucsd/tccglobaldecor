import { cookies } from 'next/headers';
import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import { ADMIN_COOKIE_NAME, isValidSessionCookie } from '@/lib/adminAuth';
import { getProjectBySlug, getProjectTranslationsForSlug } from '@/lib/getProjects';
import { saveProjectAction } from '../actions';
import { fieldStyle, labelStyle, buttonStyle as saveButtonStyle, sectionHeadingStyle, lastEditedStyle, formatLastEdited } from '../adminStyles';

export const dynamic = 'force-dynamic';

const LOCALE_LABELS: Record<string, string> = { 'zh-TW': 'Chinese (Traditional)', 'zh-CN': 'Chinese (Simplified)' };

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

  const translations = await getProjectTranslationsForSlug(slug);
  const enLastEdited = formatLastEdited(project.updatedBy, project.updatedAt);

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

        <h2 style={sectionHeadingStyle}>English</h2>
        {enLastEdited && <p style={lastEditedStyle}>{enLastEdited}</p>}

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

        {Object.entries(LOCALE_LABELS).map(([locale, label]) => {
          const t = translations[locale];
          const lastEdited = formatLastEdited(t?.updated_by, t?.updated_at);
          return (
            <div key={locale} style={{ display: 'flex', flexDirection: 'column', gap: 14, borderTop: '1px solid #eee', paddingTop: 14 }}>
              <h2 style={sectionHeadingStyle}>{label}</h2>
              {lastEdited && <p style={lastEditedStyle}>{lastEdited}</p>}

              <label style={labelStyle}>
                Title
                <input style={fieldStyle} name={`title-${locale}`} defaultValue={t?.title ?? ''} placeholder={project.title} />
              </label>

              <label style={labelStyle}>
                Summary
                <textarea style={fieldStyle} name={`summary-${locale}`} defaultValue={t?.summary ?? ''} rows={2} placeholder={project.summary ?? ''} />
              </label>

              <label style={labelStyle}>
                Description
                <textarea style={fieldStyle} name={`description-${locale}`} defaultValue={t?.description ?? ''} rows={4} placeholder={project.description ?? ''} />
              </label>

              <label style={labelStyle}>
                Notes
                <textarea style={fieldStyle} name={`notes-${locale}`} defaultValue={t?.notes ?? ''} rows={2} placeholder={project.notes ?? ''} />
              </label>
            </div>
          );
        })}

        <button type="submit" style={saveButtonStyle}>
          Save
        </button>
      </form>
    </main>
  );
}
