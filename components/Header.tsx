"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
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

  const lastScrollY = useRef(0);
  const watchIds = NAV.map((n) => n.sectionId).filter(Boolean) as string[];
  const activeId = useScrollSpy(watchIds, 120);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      const goingDown = y > lastScrollY.current;
      const nearTop = y < 30;

      // Smooth hide / show logic
      if (nearTop) setHidden(false);
      else if (goingDown && y > 150) setHidden(true);
      else if (!goingDown) setHidden(false);

      // Background blur toggle
      setScrolled(y > 8);

      lastScrollY.current = y;
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 👇 optional: always show when near “About” section
  useEffect(() => {
    if (activeId === "about") setHidden(false);
  }, [activeId]);

  const bp = process.env.NEXT_PUBLIC_BASE_PATH || "";

  const handleSectionClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId?: string
  ) => {
    if (!sectionId) return;
    e.preventDefault();
    const target = `${bp}/#${sectionId}`;
    window.location.assign(target);
    setMenuOpen(false);
  };

  return (
    <header
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
            alt="TCC Global Decor"
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
