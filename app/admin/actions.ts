'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import {
  ADMIN_COOKIE_NAME,
  ADMIN_COOKIE_MAX_AGE,
  verifyPasscode,
  createSessionCookieValue,
  isValidSessionCookie,
} from '@/lib/adminAuth';
import { supabaseAdmin } from '@/lib/supabase';
import { invalidateProjectsCache } from '@/lib/getProjects';

async function requireAdminSession() {
  const cookieStore = await cookies();
  if (!isValidSessionCookie(cookieStore.get(ADMIN_COOKIE_NAME)?.value)) {
    redirect('/admin');
  }
}

export async function loginAction(formData: FormData) {
  const passcode = String(formData.get('passcode') ?? '');

  if (!verifyPasscode(passcode)) {
    redirect('/admin?error=1');
  }

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE_NAME, createSessionCookieValue(), {
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

export async function saveProjectAction(formData: FormData) {
  await requireAdminSession();

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
    })
    .eq('slug', slug);

  if (error) {
    throw new Error(`Failed to save project: ${error.message}`);
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
