import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { ADMIN_COOKIE_NAME, isValidSessionCookie } from '@/lib/adminAuth';
import { getAllSiteSettingsForAdmin } from '@/lib/siteSettings';
import { saveSiteSettingAction } from '../actions';
import { fieldStyle, labelStyle, buttonStyle, sectionHeadingStyle, lastEditedStyle, formatLastEdited, navPillClass } from '../adminStyles';

export const dynamic = 'force-dynamic';

// Friendly labels for known settings keys — falls back to the raw key for
// any row added directly in Supabase without a matching entry here.
const SETTING_LABELS: Record<string, string> = {
  trade_show_badge: 'Trade Show Badge (shown in the site header)',
};

export default async function AdminSettings({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const { saved } = await searchParams;

  const cookieStore = await cookies();
  if (!isValidSessionCookie(cookieStore.get(ADMIN_COOKIE_NAME)?.value)) {
    redirect('/admin');
  }

  const settings = await getAllSiteSettingsForAdmin();

  return (
    <main style={{ maxWidth: 640, margin: '40px auto', fontFamily: 'system-ui, sans-serif', padding: '0 16px' }}>
      <p style={{ marginBottom: 16 }}>
        <Link href="/admin" className={navPillClass}>All projects</Link>
      </p>
      <h1 style={{ fontSize: 20, marginBottom: 16 }}>Site Settings</h1>

      {saved && <p style={{ color: 'green', fontSize: 13, marginBottom: 16 }}>Saved.</p>}

      {settings.map((setting) => {
        const lastEdited = formatLastEdited(setting.updated_by, setting.updated_at);
        return (
          <form
            key={setting.key}
            action={saveSiteSettingAction}
            style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 32 }}
          >
            <input type="hidden" name="key" value={setting.key} />

            <h2 style={sectionHeadingStyle}>{SETTING_LABELS[setting.key] ?? setting.key}</h2>
            {lastEdited && <p style={lastEditedStyle}>{lastEdited}</p>}

            <label style={labelStyle}>
              Value
              <input style={fieldStyle} name="value" defaultValue={setting.value ?? ''} />
            </label>

            <button type="submit" style={buttonStyle}>
              Save
            </button>
          </form>
        );
      })}
    </main>
  );
}
