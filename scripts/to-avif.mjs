#!/usr/bin/env node
// Convert an image (jpg/png/webp/etc.) to AVIF using sharp.
// Usage: node scripts/to-avif.mjs <source-path> <dest-path> [quality] [maxWidth]

import sharp from 'sharp';

const [, , src, dest, qualityArg, maxWidthArg] = process.argv;

if (!src || !dest) {
  console.error('Usage: node scripts/to-avif.mjs <source-path> <dest-path> [quality] [maxWidth]');
  process.exit(1);
}

const quality = qualityArg ? Number(qualityArg) : 65;
const maxWidth = maxWidthArg ? Number(maxWidthArg) : null;

let pipeline = sharp(src);
if (maxWidth) {
  pipeline = pipeline.resize({ width: maxWidth, withoutEnlargement: true });
}

pipeline
  .avif({ quality })
  .toFile(dest)
  .then((info) => {
    console.log(`Wrote ${dest}`);
    console.log(JSON.stringify(info, null, 2));
  })
  .catch((err) => {
    console.error(`Failed to convert ${src} -> ${dest}`);
    console.error(err);
    process.exit(1);
  });
