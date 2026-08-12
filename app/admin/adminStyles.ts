// Shared inline styles for /admin edit forms (project edit + site settings).
// fontSize 16 on fields avoids iOS Safari auto-zooming the page on focus.
export const fieldStyle: React.CSSProperties = {
  padding: 10,
  fontSize: 16,
  border: '1px solid #ccc',
  borderRadius: 6,
  font: 'inherit',
};

export const labelStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  fontSize: 13,
  color: '#333',
};

export const buttonStyle: React.CSSProperties = {
  padding: '12px 24px',
  fontSize: 15,
  fontWeight: 500,
  cursor: 'pointer',
  backgroundColor: '#0b0b0b',
  color: '#fff',
  border: 'none',
  borderRadius: 6,
  alignSelf: 'flex-start',
};

export const sectionHeadingStyle: React.CSSProperties = { fontSize: 15, fontWeight: 600, marginTop: 8 };
export const lastEditedStyle: React.CSSProperties = { fontSize: 12, color: '#888', marginTop: -6 };

// Tailwind classes for the "navigate to another admin section" links
// (Settings, Analytics, RAG Corpus, back-to-list) — styled as a real button
// so it reads as clickable, not plain arrow-suffixed text.
export const navPillClass =
  'inline-flex items-center rounded-full border border-neutral-300 px-3.5 py-1.5 text-sm font-medium text-neutral-700 hover:bg-neutral-100 hover:border-neutral-400 transition-colors';

export function formatLastEdited(updatedBy?: string | null, updatedAt?: string | null) {
  if (!updatedBy && !updatedAt) return null;
  const when = updatedAt ? new Date(updatedAt).toLocaleString() : null;
  if (updatedBy && when) return `Last edited by ${updatedBy} on ${when}`;
  if (updatedBy) return `Last edited by ${updatedBy}`;
  return `Last edited ${when}`;
}
