"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useScrollSpy } from "@/hooks/useScrollSpy";

type NavItem = { href: string; label: string; sectionId?: string };

const NAV: NavItem[] = [
  { href: "/#about", label: "About", sectionId: "about" },
  { href: "/projects", label: "Projects" },
  { href: "/#capability", label: "Craftsmanship", sectionId: "capability" },
  { href: "/connect", label: "Connect" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
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

  // Force basePath-aware hash navigation (works in production export)
  const handleSectionClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId?: string
  ) => {
    if (!sectionId) return; // normal route like /projects, /connect
    e.preventDefault();
    const target = `${bp}/#${sectionId}`;
    // Hard-navigate so the hash is applied in all cases (GH Pages/basePath safe)
    window.location.assign(target);
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-colors duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur border-brand-gold/30 shadow-sm"
          : "bg-white border-transparent"
      }`}
    >
      <div className="flex h-20 w-full items-center justify-between px-3 sm:px-4 lg:px-6">
        {/* Left: Logo + BDNY badge */}
        <div className="flex items-center gap-4 sm:gap-5">
          <Link href="/" className="flex items-center">
            <img
              src={`${bp}/images/TCC_Logo.svg`}
              alt="TCC Global Decor"
              className="h-16 w-auto object-contain object-left"
            />
          </Link>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-brand-gold px-3.5 py-2 text-sm font-semibold text-brand-ink shadow hover:bg-brand-gold-deep transition-colors"
          >
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-brand-ink/70" />
            BDNY • Nov 9–10 • Booth #878 <span aria-hidden="true">→</span>
          </Link>
        </div>

        {/* Right: Nav */}
        <nav className="flex items-center gap-7 text-[1.05rem] font-semibold tracking-wide">
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
      </div>
    </header>
  );
}
