import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const { path, referrer, sessionId, locale, lead } = (body ?? {}) as Record<string, unknown>;

  if (typeof path !== 'string' || typeof sessionId !== 'string') {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  // Best-effort only — real IP geo/ASN enrichment is a deferred phase (see
  // CLAUDE.md roadmap). CloudFront in front of Amplify may not set this
  // header unless geo headers are explicitly enabled on the distribution.
  const country = request.headers.get('cloudfront-viewer-country');

  const { error } = await supabaseAdmin()
    .from('analytics_events')
    .insert({
      path,
      referrer: typeof referrer === 'string' ? referrer : null,
      session_id: sessionId,
      locale: typeof locale === 'string' ? locale : null,
      lead: typeof lead === 'string' ? lead : null,
      country: country || null,
    });

  if (error) {
    console.error('[api/track] insert failed:', error.message);
    return NextResponse.json({ error: 'Failed to record event' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
