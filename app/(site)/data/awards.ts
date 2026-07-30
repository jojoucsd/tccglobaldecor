// app/(site)/data/awards.ts
// Single source of truth for Recognitions & Awards.
// Localized titles live in messages/*.json under `awardTitles`, keyed by slug
// (same pattern as `projectTitles`). Add a new award by adding one entry here
// plus one key per locale file — no other files need to change.

export type AwardEntry = {
  slug: string;
  imageSrc: string; // filename only, relative to /public/images/awards/
  video?: string; // optional Vidyard (or similar) embed URL
};

export const AWARDS: AwardEntry[] = [
  { slug: 'sands-supplier-excellence-award', imageSrc: 'china_sands.avif' },
  {
    slug: 'marina-bay-singapore-award',
    imageSrc: 'mbs.avif',
    video: 'https://play.vidyard.com/JNxZaBziQScXCg16EhGpvU.html?autoplay=1&muted=1&controls=1&v=4.1',
  },
  { slug: 'gold-key-award', imageSrc: 'gold-key.avif' },
  { slug: 'thedesignawards', imageSrc: 'designetal.avif' },
];
