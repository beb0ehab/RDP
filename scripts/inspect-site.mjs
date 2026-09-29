/**
 * Opens a live website in headless Chromium and saves what's needed to describe it:
 * title, meta description, headings, visible text and desktop/mobile screenshots.
 *
 *   node scripts/inspect-site.mjs https://example.com
 *
 * Output: .inspect/<host>/{info.json,text.txt,desktop.png,mobile.png}
 * Used by .github/workflows/inspect-site.yml (reads the URL from .github/inspect-url.txt).
 */
import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const url = process.argv[2];
if (!url) {
  console.error('Usage: node scripts/inspect-site.mjs <url>');
  process.exit(1);
}
const out = join('.inspect', new URL(url).host);
await mkdir(out, { recursive: true });

const browser = await chromium.launch();
for (const [name, viewport, isMobile] of [
  ['desktop', { width: 1440, height: 900 }, false],
  ['mobile', { width: 390, height: 844 }, true],
]) {
  const context = await browser.newContext({
    viewport,
    isMobile,
    hasTouch: isMobile,
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();
  await page
    .goto(url, { waitUntil: 'networkidle', timeout: 60_000 })
    .catch(() => page.goto(url, { waitUntil: 'load' }));
  await page.waitForTimeout(2500);
  await page.screenshot({ path: join(out, `${name}.png`) });
  if (name === 'desktop') {
    await page.screenshot({ path: join(out, 'desktop-full.png'), fullPage: true });
    const info = await page.evaluate(() => ({
      finalUrl: location.href,
      title: document.title,
      lang: document.documentElement.lang,
      description:
        document.querySelector('meta[name="description"]')?.getAttribute('content') ?? '',
      generator: document.querySelector('meta[name="generator"]')?.getAttribute('content') ?? '',
      headings: [...document.querySelectorAll('h1,h2,h3')]
        .map((h) => `${h.tagName}: ${h.innerText.trim()}`)
        .slice(0, 80),
      links: [...document.querySelectorAll('a[href]')]
        .map((a) => `${a.innerText.trim().slice(0, 60)} -> ${a.getAttribute('href')}`)
        .slice(0, 120),
      scripts: [...document.scripts]
        .map((s) => s.src)
        .filter(Boolean)
        .slice(0, 40),
    }));
    await writeFile(join(out, 'info.json'), JSON.stringify(info, null, 2));
    await writeFile(
      join(out, 'text.txt'),
      (await page.evaluate(() => document.body.innerText)).slice(0, 40_000),
    );
  }
  await context.close();
}
await browser.close();
console.log(`Saved to ${out}`);
