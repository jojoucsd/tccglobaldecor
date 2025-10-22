import Link from "next/link";

export default function TradeShowBadge({
  event = "BDNY",
  date = "Nov 9–10",
  booth = "#878",
  href = "/contact#bdny",
  small = false, // renders compact variant for inline use
}) {
  const base =
    "inline-flex items-center gap-2 rounded-full font-semibold text-brand-ink shadow transition-colors";
  return (
    <Link
      href={href}
      className={
        small
          ? `${base} bg-brand-gold/95 hover:bg-brand-gold-deep px-2 py-1 text-[11px]`
          : `${base} bg-brand-gold hover:bg-brand-gold-deep px-3.5 py-2 text-sm`
      }
    >
      <span className="inline-block h-2 w-2 rounded-full bg-brand-ink/70" />
      {event} • {date} • Booth {booth}
    </Link>
  );
}
