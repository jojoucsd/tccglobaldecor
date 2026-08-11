// /admin sits outside the [locale] segment (no i18n needed for an internal
// tool), so it doesn't get html/body OR globals.css (Tailwind) from
// app/[locale]/layout.tsx — must provide both itself, same reason as
// app/not-found.tsx for the html/body half.
import '@/app/globals.css';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
