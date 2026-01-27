import Link from "next/link";

export default function TradeShowBadge({
  small = false,
}: {
  small?: boolean;
}) {
  const base =
    "inline-flex items-center gap-2 rounded-full font-semibold shadow transition-colors";

  return (
    <div
      className={
        small
          ? `${base} bg-black/90 text-white px-2 py-1 text-[11px] opacity-90`
          : `${base} bg-black text-white px-3.5 py-2 text-sm opacity-90`
      }
    >
      <span className="inline-block h-2 w-2 rounded-full bg-white/70" />
      HD Expo '26 — Vegas • Booth #4362 • May 5–7
    </div>
  );
}
