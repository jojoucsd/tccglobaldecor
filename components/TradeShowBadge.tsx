// Label is admin-editable via /admin/settings (site_settings.trade_show_badge)
// — see app/[locale]/(site)/layout.tsx for where it's fetched.
export default function TradeShowBadge({
  label,
  small = false,
}: {
  label: string | null;
  small?: boolean;
}) {
  if (!label) return null;

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
      {label}
    </div>
  );
}
