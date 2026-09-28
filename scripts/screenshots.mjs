/**
 * Captures real screenshots of every project that has a live `url` in src/data/projects.ts.
 *
 *   npm run screenshots                # all projects with a url
 *   npm run screenshots -- kero-tours  # only the given ids
 *
 * Output (public/projects/):
 *   <id>-desktop.webp      1440×900
 *   <id>-desktop-720.webp  720×450 (used on cards)
 *   <id>-mobile.webp       390×844 (only for ids in MOBILE_IDS)
 * and src/data/screenshots.json, which the site reads to swap placeholders for real images.
 */
import { chromium } from 'playwright';
import sharp from 'sharp';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const MOBILE_IDS = new Set(['kero-tours', 'leadora']);

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, 'public', 'projects');
const manifestPath = join(root, 'src', 'data', 'screenshots.json');

// Pull { id, url } pairs out of projects.ts without needing a TS toolchain.
const source = await readFile(join(root, 'src', 'data', 'projects.ts'), 'utf8');
const targets = [];
for (const block of source.split(/\n {2}\{\n/).slice(1)) {
  const id = block.match(/\bid:\s*'([^']+)'/)?.[1];
  const url = block.match(/\burl:\s*'([^']+)'/)?.[1];
  if (id && url) targets.push({ id, url });
}

const only = process.argv.slice(2);
const selected = only.length ? targets.filter((t) => only.includes(t.id)) : targets;
if (!selected.length) {
  console.error('No matching projects with a url found.');
  process.exit(1);
}

const manifest = existsSync(manifestPath) ? JSON.parse(await readFile(manifestPath, 'utf8')) : {};
await mkdir(outDir, { recursive: true });

const browser = await chromium.launch(
  process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {},
);

async function capture(url, viewport, isMobile) {
  const context = await browser.newContext({
    viewport,
    deviceScaleFactor: isMobile ? 2 : 1,
    isMobile,
    hasTouch: isMobile,
    locale: 'en-US',
    colorScheme: 'light',
    reducedMotion: 'reduce',
    userAgent: isMobile
      ? 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
      : undefined,
  });
  const page = await context.newPage();
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 60_000 });
  } catch {
    // Some sites keep connections open forever — fall back to "load" + a pause.
    await page.goto(url, { waitUntil: 'load', timeout: 60_000 });
  }
  // Nudge lazy-loaded content and let animations settle.
  await page.evaluate(() => window.scrollTo(0, 400));
  await page.waitForTimeout(800);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(2500);
  const png = await page.screenshot({ type: 'png' });
  await context.close();
  return png;
}

let failed = 0;
for (const { id, url } of selected) {
  try {
    console.log(`→ ${id}: ${url}`);
    const desktop = await capture(url, { width: 1440, height: 900 }, false);
    await sharp(desktop)
      .webp({ quality: 78 })
      .toFile(join(outDir, `${id}-desktop.webp`));
    await sharp(desktop)
      .resize(720, 450)
      .webp({ quality: 78 })
      .toFile(join(outDir, `${id}-desktop-720.webp`));

    const entry = {
      desktop: `projects/${id}-desktop.webp`,
      desktopSmall: `projects/${id}-desktop-720.webp`,
      width: 1440,
      height: 900,
    };

    if (MOBILE_IDS.has(id)) {
      const mobile = await capture(url, { width: 390, height: 844 }, true);
      await sharp(mobile)
        .resize(390, 844)
        .webp({ quality: 80 })
        .toFile(join(outDir, `${id}-mobile.webp`));
      Object.assign(entry, {
        mobile: `projects/${id}-mobile.webp`,
        mobileWidth: 390,
        mobileHeight: 844,
      });
    }

    manifest[id] = entry;
    console.log(`  ✓ saved`);
  } catch (err) {
    failed++;
    console.error(`  ✗ ${id} failed: ${err.message}`);
  }
}

await browser.close();
const sorted = Object.fromEntries(Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)));
await writeFile(manifestPath, JSON.stringify(sorted, null, 2) + '\n');
console.log(`Updated ${manifestPath}`);
if (failed) process.exit(1);
