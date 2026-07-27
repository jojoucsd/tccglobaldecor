#!/usr/bin/env node
// Convert an image (jpg/png/webp/etc.) to AVIF using sharp.
// Usage: node scripts/to-avif.mjs <source-path> <dest-path> [quality]

import sharp from 'sharp';

const [, , src, dest, qualityArg] = process.argv;

if (!src || !dest) {
  console.error('Usage: node scripts/to-avif.mjs <source-path> <dest-path> [quality]');
  process.exit(1);
}

const quality = qualityArg ? Number(qualityArg) : 65;

sharp(src)
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
