'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/navigation';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import TradeShowBadge from '@/components/TradeShowBadge';

type NavItem = { href: string; label: string; sectionId?: string };

const LOCALES = [
  { code: 'en', label: 'EN' },
  { code: 'zh-TW', label: '繁' },
  { code: 'zh-CN', label: '简' },
] as const;

export default function Header() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const NAV: NavItem[] = [
    { href: '/#about', label: t('about'), sectionId: 'about' },
    { href: '/projects', label: t('projects') },
    { href: '/#capability', label: t('craftsmanship'), sectionId: 'capability' },
    { href: '/#collaborations', label: t('collaborations'), sectionId: 'collaborations' },
    { href: '/connect', label: t('connect') },
  ];

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [headerHeight, setHeaderHeight] = useState<number>(76);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const rootRef = useRef<HTMLElement | null>(null);
  const lastScrollY = useRef(0);
  const langMenuRef = useRef<HTMLDivElement | null>(null);
  const bp = process.env.NEXT_PUBLIC_BASE_PATH || '';

  const watchIds = NAV.map((n) => n.sectionId).filter(Boolean) as string[];
  const activeId = useScrollSpy(watchIds, 120);

  useEffect(() => {
    const measure = () => {
      const el = rootRef.current;
      if (!el) return;
      const h = el.getBoundingClientRect().height;
      setHeaderHeight(Math.max(56, Math.min(120, Math.round(h))));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (rootRef.current) ro.observe(rootRef.current);
    window.addEventListener('resize', measure, { passive: true });
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      const run = () => {
        const y = window.scrollY;
        const goingDown = y > lastScrollY.current;
        const nearTop = y < 30;
        setHidden(nearTop ? false : goingDown && y > 150);
        setScrolled(y > 8);
        lastScrollY.current = y;
        ticking = false;
      };
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(run);
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (activeId === 'about') setHidden(false);
  }, [activeId]);

  useEffect(() => {
    const { body } = document;
    const prev = body.style.overflow;
    if (menuOpen) {
      body.style.overflow = 'hidden';
      return () => { body.style.overflow = prev; };
    }
  }, [menuOpen]);

  useEffect(() => {
    if (!langMenuOpen) return;
    const onClickOutside = (e: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(e.target as Node)) {
        setLangMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, [langMenuOpen]);

  const isHome = pathname === '/';

  const handleSectionClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId?: string
  ) => {
    if (!sectionId) {
      setMenuOpen(false);
      return;
    }
    if (typeof window === 'undefined') return;
    if (!isHome) {
      setMenuOpen(false);
      return;
    }
    e.preventDefault();
    const el = document.getElementById(sectionId);
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const absoluteY = window.scrollY + rect.top - headerHeight;
    window.scrollTo({ top: absoluteY, behavior: 'smooth' });
    setMenuOpen(false);
  };

  const switchLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
    setMenuOpen(false);
  };

  return (
    <header
      ref={rootRef}
      className={[
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out',
        hidden ? '-translate-y-full' : 'translate-y-0',
        scrolled
          ? 'bg-white/90 backdrop-blur border-b border-neutral-200 shadow-sm'
          : 'bg-white border-transparent',
        'text-brand-ink',
      ].join(' ')}
    >
      <div className="pt-[env(safe-area-inset-top)]" />

      <div className="flex h-16 sm:h-20 items-center justify-between px-3 sm:px-4 lg:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center" prefetch={false}>
          <img
            src={`${bp}/images/TCC_Logo.svg`}
            alt=""
            aria-hidden="true"
            className="h-8 sm:h-10 md:h-12 w-auto object-contain transition-transform duration-300 hover:scale-105"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7 text-[1.05rem] font-semibold tracking-wide">
          <TradeShowBadge />
          {NAV.map((n) => {
            const isActive = n.sectionId && activeId === n.sectionId;
            return (
              <Link
                key={n.label}
                href={n.href}
                prefetch={false}
                onClick={(e) => handleSectionClick(e, n.sectionId)}
                aria-current={isActive ? 'page' : undefined}
                className={[
                  'transition-colors border-b-2',
                  isActive
                    ? 'text-brand-ink border-brand-ink'
                    : 'text-brand-ink/80 border-transparent hover:text-brand-ink hover:border-brand-ink/60',
                ].join(' ')}
              >
                <span className="inline-block pb-0.5">{n.label}</span>
              </Link>
            );
          })}

          {/* Language switcher (dropdown) */}
          <div className="relative" ref={langMenuRef}>
            <button
              type="button"
              onClick={() => setLangMenuOpen((o) => !o)}
              className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold text-brand-ink ring-1 ring-neutral-200 hover:ring-brand-gold-deep transition"
              aria-haspopup="listbox"
              aria-expanded={langMenuOpen}
              aria-label="Change language"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-4 w-4">
                <circle cx="12" cy="12" r="9" strokeWidth="1.6" />
                <path strokeWidth="1.6" d="M3 12h18M12 3c2.5 2.5 4 5.7 4 9s-1.5 6.5-4 9c-2.5-2.5-4-5.7-4-9s1.5-6.5 4-9Z" />
              </svg>
              <span>{LOCALES.find((l) => l.code === locale)?.label ?? locale}</span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className={`h-3.5 w-3.5 transition-transform ${langMenuOpen ? 'rotate-180' : ''}`}
              >
                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
              </svg>
            </button>

            {langMenuOpen && (
              <div
                role="listbox"
                className="absolute right-0 top-full mt-2 w-28 overflow-hidden rounded-lg bg-white py-1 shadow-lg ring-1 ring-neutral-200 animate-slideDown"
              >
                {LOCALES.map((l) => (
                  <button
                    key={l.code}
                    role="option"
                    aria-selected={locale === l.code}
                    onClick={() => {
                      switchLocale(l.code);
                      setLangMenuOpen(false);
                    }}
                    className={[
                      'block w-full px-3 py-2 text-left text-sm transition-colors',
                      locale === l.code
                        ? 'font-bold text-brand-ink bg-neutral-50'
                        : 'text-brand-ink/70 hover:bg-neutral-50 hover:text-brand-ink',
                    ].join(' ')}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex h-10 w-10 items-center justify-center rounded-full ring-1 ring-neutral-200 text-brand-ink hover:bg-neutral-50"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-6 w-6">
            <path
              strokeWidth="2"
              strokeLinecap="round"
              d={menuOpen ? 'M6 6l12 12M18 6l-12 12' : 'M4 6h16M4 12h16M4 18h16'}
            />
          </svg>
        </button>
      </div>

      {/* Mobile announcement bar */}
      <div className="md:hidden border-t border-neutral-200 bg-neutral-50">
        <div className="flex items-center justify-center py-2">
          <TradeShowBadge small />
        </div>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div
          id="mobile-nav"
          className="md:hidden absolute top-full inset-x-0 bg-white shadow-md border-t border-neutral-200 animate-slideDown"
        >
          <nav className="flex flex-col items-start px-4 py-4 gap-4 text-base font-semibold">
            {NAV.map((n) => {
              const isActive = n.sectionId && activeId === n.sectionId;
              return (
                <Link
                  key={n.label}
                  href={n.href}
                  prefetch={false}
                  onClick={(e) => handleSectionClick(e, n.sectionId)}
                  className={[
                    'w-full transition-colors',
                    isActive ? 'text-brand-ink' : 'text-brand-ink/80 hover:text-brand-ink',
                  ].join(' ')}
                >
                  {n.label}
                </Link>
              );
            })}

            {/* Mobile language switcher */}
            <div className="flex items-center gap-3 pt-2 border-t border-neutral-100 w-full">
              {LOCALES.map((l) => (
                <button
                  key={l.code}
                  onClick={() => switchLocale(l.code)}
                  className={[
                    'text-sm font-semibold transition-colors',
                    locale === l.code
                      ? 'text-brand-ink underline underline-offset-2'
                      : 'text-brand-ink/50 hover:text-brand-ink',
                  ].join(' ')}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
