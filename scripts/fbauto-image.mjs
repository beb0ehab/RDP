/**
 * Makes fast WebP copies of the FBAUTO landing-page screenshot.
 *
 * Source (the only file you replace): public/fbauto/fbauto-main-1440x900.png
 * Output (generated, git-ignored):    public/fbauto/fbauto-main-1440.webp, fbauto-main-720.webp
 *
 * Runs automatically before `npm run dev` and `npm run build`.
 */
import sharp from 'sharp';
import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'fbauto');
const src = join(dir, 'fbauto-main-1440x900.png');

if (!existsSync(src)) {
  console.warn(`fbauto-image: ${src} not found, skipping.`);
  process.exit(0);
}

// Always 1440×900 (16:10); letterboxed with the page background if the source differs.
const bg = { r: 7, g: 4, b: 12, alpha: 1 };
for (const width of [1440, 720]) {
  await sharp(src)
    .resize(width, Math.round((width * 900) / 1440), { fit: 'contain', background: bg })
    .webp({ quality: 82 })
    .toFile(join(dir, `fbauto-main-${width}.webp`));
}
console.log('fbauto-image: generated fbauto-main-1440.webp and fbauto-main-720.webp');
