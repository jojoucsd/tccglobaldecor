'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import {
  ADMIN_COOKIE_NAME,
  ADMIN_COOKIE_MAX_AGE,
  verifyPasscode,
  isAllowedEmail,
  createSessionCookieValue,
  parseSessionCookie,
} from '@/lib/adminAuth';
import { supabaseAdmin } from '@/lib/supabase';
import { invalidateProjectsCache } from '@/lib/getProjects';
import { invalidateSiteSettingsCache } from '@/lib/siteSettings';

// Returns the session's email, redirecting to /admin if the cookie is
// missing/invalid — redirect() is typed `never`, so callers can rely on the
// return value being a string without an extra null check.
async function requireAdminSession(): Promise<string> {
  const cookieStore = await cookies();
  const session = parseSessionCookie(cookieStore.get(ADMIN_COOKIE_NAME)?.value);
  if (!session) {
    redirect('/admin');
  }
  return session.email;
}

export async function loginAction(formData: FormData) {
  const email = String(formData.get('email') ?? '').trim().toLowerCase();
  const passcode = String(formData.get('passcode') ?? '');

  if (!isAllowedEmail(email) || !verifyPasscode(passcode)) {
    redirect('/admin?error=1');
  }

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE_NAME, createSessionCookieValue(email), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/admin',
    maxAge: ADMIN_COOKIE_MAX_AGE,
  });

  redirect('/admin');
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
  redirect('/admin');
}

const TRANSLATED_LOCALES = ['zh-TW', 'zh-CN'] as const;

export async function saveProjectAction(formData: FormData) {
  const email = await requireAdminSession();

  const slug = String(formData.get('slug') ?? '');
  if (!slug) throw new Error('Missing slug');

  const tags = String(formData.get('tags') ?? '')
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);

  const priorityRaw = String(formData.get('priority') ?? '').trim();
  const priority = priorityRaw ? Number(priorityRaw) : null;

  const optional = (key: string) => {
    const value = String(formData.get(key) ?? '').trim();
    return value || null;
  };

  const { error } = await supabaseAdmin()
    .from('projects')
    .update({
      title: String(formData.get('title') ?? ''),
      address: optional('address'),
      summary: optional('summary'),
      description: optional('description'),
      notes: optional('notes'),
      priority,
      tags,
      cover_position: optional('coverPosition'),
      updated_by: email,
    })
    .eq('slug', slug);

  if (error) {
    throw new Error(`Failed to save project: ${error.message}`);
  }

  const translationRows = TRANSLATED_LOCALES.map((locale) => ({
    slug,
    locale,
    title: optional(`title-${locale}`),
    summary: optional(`summary-${locale}`),
    description: optional(`description-${locale}`),
    notes: optional(`notes-${locale}`),
    updated_by: email,
  }));

  const { error: translationsError } = await supabaseAdmin()
    .from('project_translations')
    .upsert(translationRows, { onConflict: 'slug,locale' });

  if (translationsError) {
    throw new Error(`Failed to save translations: ${translationsError.message}`);
  }

  invalidateProjectsCache();

  // Public pages are locale-prefixed (en has none, zh-TW/zh-CN do) —
  // revalidate all three so the edit shows up without a full redeploy.
  for (const prefix of ['', '/zh-TW', '/zh-CN']) {
    revalidatePath(`${prefix}/projects`);
    revalidatePath(`${prefix}/projects/${slug}`);
  }

  redirect(`/admin/${slug}?saved=1`);
}

export async function saveSiteSettingAction(formData: FormData) {
  const email = await requireAdminSession();

  const key = String(formData.get('key') ?? '');
  if (!key) throw new Error('Missing key');

  const value = String(formData.get('value') ?? '').trim();

  const { error } = await supabaseAdmin()
    .from('site_settings')
    .upsert({ key, value: value || null, updated_by: email }, { onConflict: 'key' });

  if (error) {
    throw new Error(`Failed to save setting: ${error.message}`);
  }

  invalidateSiteSettingsCache();

  // TradeShowBadge renders via the shared (site) layout on every page, in
  // every locale — 'layout' + the dynamic segment pattern busts that whole
  // subtree in one call rather than listing every route individually.
  revalidatePath('/[locale]', 'layout');

  redirect('/admin/settings?saved=1');
}
