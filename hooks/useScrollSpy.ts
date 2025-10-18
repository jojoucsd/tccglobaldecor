import { useEffect, useState } from "react";

export function useScrollSpy(ids: string[], offset = 120) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (!ids.length) return;

    const onScroll = () => {
      let current: string | null = null;
      let minDelta = Infinity;

      ids.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        // distance from section top to top-of-viewport + offset
        const delta = Math.abs(rect.top - offset);
        // prefer sections above the fold but not far off-screen
        if (rect.top - offset <= 0 && delta < minDelta) {
          minDelta = delta;
          current = id;
        }
      });

      // if none above, take the first one below
      if (!current) {
        for (const id of ids) {
          const el = document.getElementById(id);
          if (!el) continue;
          const rect = el.getBoundingClientRect();
          if (rect.top - offset > 0) {
            current = id;
            break;
          }
        }
      }

      setActiveId(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("hashchange", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("hashchange", onScroll);
    };
  }, [ids, offset]);

  return activeId;
}
