"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useScrollSpy } from "@/hooks/useScrollSpy";

type NavItem = { href: string; label: string; sectionId?: string };

const NAV: NavItem[] = [
  { href: "/#about", label: "About", sectionId: "about" },
  { href: "/projects", label: "Projects" },
  { href: "/#capability", label: "Capability", sectionId: "capability" },
  { href: "/library", label: "Library" },
  { href: "/connect", label: "Connect" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const activeId = useScrollSpy(
    NAV.map(n => n.sectionId).filter(Boolean) as string[],
    120
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
<header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur shadow-sm">
{/* FULL-WIDTH header row (no mx-auto / max-w) */}
<div className="flex h-20 w-full items-center justify-between px-3 sm:px-4 lg:px-6">
  {/* Left: Logo + BDNY (unchanged except optional small gap tweak) */}
  <div className="flex items-center gap-4 sm:gap-5">
    <Link href="/" className="flex items-center">
      <img
        src="/images/TCC_Logo.svg"
        alt="TCC Global Decor"
        className="h-16 w-auto object-contain object-left"
      />
    </Link>

    <Link
      href="/contact"
      className="inline-flex items-center gap-2 rounded-full bg-brand-gold px-3.5 py-2 text-sm font-semibold text-black shadow hover:bg-[color:var(--color-brand-gold-deep)]"
    >
      <span className="inline-block h-2.5 w-2.5 rounded-full bg-black/70" />
      BDNY • Nov 9–10 • Booth #878 <span aria-hidden="true">→</span>
    </Link>
  </div>

  {/* Right: Nav (bigger/bolder like deck) */}
  <nav className="flex items-center gap-7 text-[1.05rem] font-semibold tracking-wide">
    <Link href="/#about" className="text-gray-900 hover:text-brand-gold">
      <span className="inline-block pb-0.5 border-b-2 border-transparent">About</span>
    </Link>
    <Link href="/projects" className="text-gray-900 hover:text-brand-gold">
      <span className="inline-block pb-0.5 border-b-2 border-transparent">Projects</span>
    </Link>
    <Link href="/#capability" className="text-gray-900 hover:text-brand-gold">
      <span className="inline-block pb-0.5 border-b-2 border-transparent">Capability</span>
    </Link>
    <Link href="/library" className="text-gray-900 hover:text-brand-gold">
      <span className="inline-block pb-0.5 border-b-2 border-transparent">Library</span>
    </Link>
    <Link href="/connect" className="text-gray-900 hover:text-brand-gold">
      <span className="inline-block pb-0.5 border-b-2 border-transparent">Connect</span>
    </Link>
  </nav>
</div>
</header>

  );
}
