"use client";
import { useEffect } from "react";

export default function HeaderWrapper({ children }: { children: React.ReactNode }) {
useEffect(() => {
  const header = document.querySelector("header");
  const banner = document.querySelector(".promo-banner");

  const updateHeaderHeight = () => {
    const total =
      (header?.getBoundingClientRect().height || 0) +
      (banner?.getBoundingClientRect().height || 0);
    document.documentElement.style.setProperty("--header-h", `${total}px`);
  };

  updateHeaderHeight();

  const ro = new ResizeObserver(updateHeaderHeight);
  if (header) ro.observe(header);
  if (banner) ro.observe(banner);

  window.addEventListener("resize", updateHeaderHeight);
  return () => {
    ro.disconnect();
    window.removeEventListener("resize", updateHeaderHeight);
  };
}, []);

  return <>{children}</>;
}

