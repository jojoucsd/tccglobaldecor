'use client';

import { useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { useLocale } from 'next-intl';
import { usePathname } from '@/i18n/navigation';

const SESSION_KEY = 'tcc_session_id';

function getSessionId(): string {
  try {
    let id = sessionStorage.getItem(SESSION_KEY);
    if (!id) {
      id = crypto.randomUUID();
      sessionStorage.setItem(SESSION_KEY, id);
    }
    return id;
  } catch {
    // sessionStorage unavailable (e.g. some privacy modes) — fall back to a
    // per-pageview id rather than dropping the event entirely.
    return crypto.randomUUID();
  }
}

export default function PageviewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const locale = useLocale();
  const lastTracked = useRef<string | null>(null);

  useEffect(() => {
    const query = searchParams.toString();
    const key = `${pathname}?${query}`;
    if (lastTracked.current === key) return; // React StrictMode double-invoke guard
    lastTracked.current = key;

    const payload = JSON.stringify({
      path: pathname,
      referrer: document.referrer || undefined,
      sessionId: getSessionId(),
      locale,
      lead: searchParams.get('lead') ?? undefined,
    });

    const sent = navigator.sendBeacon?.(
      '/api/track',
      new Blob([payload], { type: 'application/json' })
    );

    if (!sent) {
      fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payload,
        keepalive: true,
      }).catch(() => {});
    }
  }, [pathname, searchParams, locale]);

  return null;
}
