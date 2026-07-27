/**
 * Regenerates the PNG favicons from public/favicon.svg.
 * Run after changing the logo mark:  node scripts/gen-favicons.mjs
 */
import sharp from 'sharp';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const PUB = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'public');
const src = path.join(PUB, 'favicon.svg');

const sizes = [
  [32, 'favicon-32.png'],
  [64, 'favicon-64.png'],
  [180, 'apple-touch-icon.png'],
  [512, 'icon-512.png'],
];

for (const [size, name] of sizes) {
  await sharp(src, {density: 384}).resize(size, size).png().toFile(path.join(PUB, name));
  console.log(`${name} (${size}x${size})`);
}
