"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import TradeShowBadge from "@/components/TradeShowBadge";

type NavItem = { href: string; label: string; sectionId?: string };

const NAV: NavItem[] = [
  { href: "/#about", label: "About", sectionId: "about" },
  { href: "/projects", label: "Projects" },
  { href: "/#capability", label: "Craftsmanship", sectionId: "capability" },
  { href: "/connect", label: "Connect" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [headerHeight, setHeaderHeight] = useState<number>(76); // fallback

  const rootRef = useRef<HTMLElement | null>(null);
  const lastScrollY = useRef(0);
  const bp = process.env.NEXT_PUBLIC_BASE_PATH || "";

  // ids to watch for the scroll spy
  const watchIds = NAV.map((n) => n.sectionId).filter(Boolean) as string[];
  const activeId = useScrollSpy(watchIds, 120);

  // measure header height (for scroll offset)
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
    window.addEventListener("resize", measure, { passive: true });
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  // scroll listener (throttled via rAF)
  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      const run = () => {
        const y = window.scrollY;
        const goingDown = y > lastScrollY.current;
        const nearTop = y < 30;

        setHidden(nearTop ? false : (goingDown && y > 150));
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
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // keep header visible when "About" is active
  useEffect(() => {
    if (activeId === "about") setHidden(false);
  }, [activeId]);

  // lock background scroll when mobile menu is open
  useEffect(() => {
    const { body } = document;
    const prev = body.style.overflow;
    if (menuOpen) {
      body.style.overflow = "hidden";
      return () => {
        body.style.overflow = prev;
      };
    }
  }, [menuOpen]);

  // in-page smooth scroll with header offset (no full navigation)
  const handleSectionClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId?: string
  ) => {
    if (!sectionId) return;
    e.preventDefault();
    const el = document.getElementById(sectionId);
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const absoluteY = window.scrollY + rect.top - headerHeight;
    window.scrollTo({ top: absoluteY, behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <header
      ref={rootRef}
      className={[
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out",
        hidden ? "-translate-y-full" : "translate-y-0",
        scrolled
          ? "bg-white/90 backdrop-blur border-b border-brand-gold/30 shadow-sm"
          : "bg-white border-transparent",
        "text-brand-ink",
      ].join(" ")}
    >
      {/* iPhone safe area */}
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
                aria-current={isActive ? "page" : undefined}
                className={`transition-colors border-b-2 border-transparent ${
                  isActive
                    ? "text-brand-gold border-brand-gold"
                    : "text-brand-ink hover:text-brand-gold"
                }`}
              >
                <span className="inline-block pb-0.5">{n.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex h-10 w-10 items-center justify-center rounded-full ring-1 ring-brand-ink/10 text-brand-ink"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeWidth="2"
              strokeLinecap="round"
              d={
                menuOpen
                  ? "M6 6l12 12M18 6l-12 12"
                  : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>
      </div>

      {/* Mobile announcement bar */}
      <div className="md:hidden border-t border-brand-gold/30 bg-brand-gold/10">
        <div className="flex items-center justify-center py-2">
          <TradeShowBadge small />
        </div>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div
          id="mobile-nav"
          className="md:hidden absolute top-full inset-x-0 bg-white shadow-md border-t border-brand-ink/10 animate-slideDown"
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
                  className={`w-full ${
                    isActive ? "text-brand-gold" : "text-brand-ink"
                  }`}
                >
                  {n.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
