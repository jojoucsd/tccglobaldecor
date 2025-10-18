"use client";
import { useEffect } from "react";

export default function HeaderWrapper({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const updateHeaderHeight = () => {
      const header = document.querySelector("header") as HTMLElement | null;
      const banner = document.querySelector(".promo-banner") as HTMLElement | null;

      // Only compute if at least one exists
      if (header || banner) {
        const totalHeight =
          (header?.getBoundingClientRect().height || 0) +
          (banner?.getBoundingClientRect().height || 0);

        document.documentElement.style.setProperty("--header-h", `${totalHeight}px`);
        console.log("Header height set:", totalHeight);
      }
    };

    // Delay until after layout paint to ensure elements are measurable
    setTimeout(updateHeaderHeight, 100);

    window.addEventListener("resize", updateHeaderHeight);
    return () => window.removeEventListener("resize", updateHeaderHeight);
  }, []);

  return <>{children}</>;
}

