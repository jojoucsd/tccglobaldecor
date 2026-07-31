// Safety-net 404 for routes that don't resolve to a [locale] segment at all
// (the normal case is handled by app/[locale]/(site)/not-found.tsx, which
// gets the real header/footer/styles). This one must provide its own
// <html>/<body> since it renders outside the locale layout — see
// https://nextjs.org/docs/messages/missing-root-layout-tags
export default function RootNotFound() {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'system-ui, sans-serif' }}>
        <div style={{ padding: '4rem 1.5rem', textAlign: 'center' }}>
          <p style={{ fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#737373' }}>
            404
          </p>
          <h1 style={{ marginTop: '0.75rem', fontSize: '2rem', fontWeight: 800 }}>
            Page Not Found
          </h1>
          <p style={{ marginTop: '1rem', color: '#525252' }}>
            <a href="/" style={{ color: '#1F2937', textDecoration: 'underline' }}>
              Back to Home
            </a>
          </p>
        </div>
      </body>
    </html>
  );
}
