'use client';

import { useEffect, useState } from 'react';

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia(query);
    const update = (event: MediaQueryListEvent | MediaQueryList) => setMatches(event.matches);
    update(mq);
    if (typeof mq.addEventListener === 'function') {
      mq.addEventListener('change', update as (e: MediaQueryListEvent) => void);
      return () => mq.removeEventListener('change', update as (e: MediaQueryListEvent) => void);
    } else {
      // @ts-ignore — Safari <14 fallback
      mq.addListener(update);
      // @ts-ignore
      return () => mq.removeListener(update);
    }
  }, [query]);

  return matches;
}

export function usePrefersReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}
