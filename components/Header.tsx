"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
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
  const activeId = useScrollSpy(
    NAV.map((n) => n.sectionId).filter(Boolean) as string[],
    120
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
      className={`sticky top-0 z-50 w-full border-b transition-colors duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur border-brand-gold/30 shadow-sm"
          : "bg-white border-transparent"
      }`}
    >
      {/* iPhone safe area */}
      <div className="pt-[env(safe-area-inset-top)]" />

      <div className="flex h-16 sm:h-20 items-center justify-between px-3 sm:px-4 lg:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <img
            src={`${bp}/images/TCC_Logo.svg`}
            alt="TCC Global Decor"
            className="h-8 sm:h-10 md:h-12 w-auto object-contain transition-transform duration-300 hover:scale-105"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7 text-[1.05rem] font-semibold tracking-wide">
          {/* BDNY first */}
          <TradeShowBadge />
          {NAV.map((n) => (
            <Link
              key={n.label}
              href={n.href}
              prefetch={false}
              onClick={(e) => handleSectionClick(e, n.sectionId)}
              className={`transition-colors ${
                n.sectionId && activeId === n.sectionId
                  ? "text-brand-gold border-b-2 border-brand-gold"
                  : "text-brand-ink hover:text-brand-gold"
              }`}
            >
              <span className="inline-block pb-0.5">{n.label}</span>
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex h-10 w-10 items-center justify-center rounded-full ring-1 ring-black/10"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
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

      {/* 📣 Mobile announcement bar */}
      <div className="md:hidden border-t border-brand-gold/30 bg-amber-50">
        <div className="flex items-center justify-center py-2">
          <TradeShowBadge small />
        </div>
      </div>

      {/* 📱 Mobile drawer */}
{menuOpen && (
  <div className="md:hidden absolute top-full inset-x-0 bg-white shadow-md border-t border-neutral-100">
    <nav className="flex flex-col items-start px-4 py-4 gap-4 text-base font-semibold">
      {/* 🚫 Removed BDNY badge here to avoid duplication on mobile */}
      {NAV.map((n) => (
        <Link
          key={n.label}
          href={n.href}
          prefetch={false}
          onClick={(e) => handleSectionClick(e, n.sectionId)}
          className={`w-full ${
            n.sectionId && activeId === n.sectionId
              ? "text-brand-gold"
              : "text-brand-ink"
          }`}
        >
          {n.label}
        </Link>
      ))}
    </nav>
  </div>
)}
    </header>
  );
}
