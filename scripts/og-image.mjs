/**
 * Generates the social preview image (public/og-image.png, 1200×630) and PNG icons
 * (favicon-32.png, apple-touch-icon.png) by rendering HTML in headless Chromium.
 *
 *   npm run og
 */
import { chromium } from 'playwright';
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const pub = join(root, 'public');

// Fonts are embedded from the local @fontsource package so rendering never depends on the network.
const fontDir = join(root, 'node_modules', '@fontsource', 'plus-jakarta-sans', 'files');
const fontFaces = (
  await Promise.all(
    [500, 700, 800].map(async (w) => {
      const data = await readFile(join(fontDir, `plus-jakarta-sans-latin-${w}-normal.woff2`));
      return `@font-face{font-family:'Plus Jakarta Sans';font-weight:${w};src:url(data:font/woff2;base64,${data.toString('base64')}) format('woff2')}`;
    }),
  )
).join('');

const ogHtml = `<!doctype html><html><head>
<style>${fontFaces}
  *{box-sizing:border-box;margin:0}
  body{width:1200px;height:630px;background:#0b0e0d;color:#eceFEA;
    font-family:'Plus Jakarta Sans',system-ui,sans-serif;position:relative;overflow:hidden}
  .grid{position:absolute;inset:0;
    background-image:linear-gradient(to right,rgba(255,255,255,.06) 1px,transparent 1px),
      linear-gradient(to bottom,rgba(255,255,255,.06) 1px,transparent 1px);
    background-size:56px 56px;
    -webkit-mask-image:radial-gradient(ellipse 80% 70% at 30% 40%,#000 30%,transparent 80%)}
  .glow{position:absolute;width:620px;height:620px;border-radius:50%;right:-160px;top:-220px;
    background:#34d3b2;opacity:.28;filter:blur(120px)}
  .wrap{position:relative;padding:76px 84px;height:100%;display:flex;flex-direction:column}
  .logo{display:flex;align-items:center;gap:16px;font-weight:800;font-size:28px}
  .mark{width:56px;height:56px;border-radius:14px;background:#eceFEA;color:#0b0e0d;
    display:grid;place-items:center;font-size:22px}
  h1{margin-top:auto;font-size:92px;line-height:1;font-weight:800;letter-spacing:-.035em}
  h1 span{color:#34d3b2}
  h2{margin-top:18px;font-size:40px;font-weight:700;color:#cfd6d2}
  .tags{display:flex;gap:12px;margin-top:40px}
  .tag{border:1.5px solid rgba(255,255,255,.18);border-radius:999px;padding:10px 20px;
    font-size:22px;font-weight:500;color:#cfd6d2}
</style></head><body>
<div class="grid"></div><div class="glow"></div>
<div class="wrap">
  <div class="logo"><div class="mark">AE</div>Portfolio</div>
  <h1>Adly Ehab<span>.</span></h1>
  <h2>Web &amp; AI Automation Developer</h2>
  <div class="tags">
    <div class="tag">Websites &amp; Stores</div><div class="tag">CRM Systems</div>
    <div class="tag">Bots</div><div class="tag">AI Automation</div>
  </div>
</div></body></html>`;

const browser = await chromium.launch(
  process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {},
);
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(ogHtml);
await page.evaluate(() => document.fonts.ready);
await writeFile(join(pub, 'og-image.png'), await page.screenshot({ type: 'png' }));

const svg = await readFile(join(pub, 'favicon.svg'), 'utf8');
for (const [name, size] of [
  ['favicon-32.png', 32],
  ['apple-touch-icon.png', 180],
]) {
  await page.setViewportSize({ width: size, height: size });
  // iOS rounds the corners itself, so the touch icon is a full square.
  const icon = (size > 32 ? svg.replace('rx="16"', 'rx="0"') : svg).replace(
    '<svg ',
    `<svg width="${size}" height="${size}" `,
  );
  await page.setContent(
    `<html><body style="margin:0;background:transparent">${icon}</body></html>`,
  );
  await writeFile(join(pub, name), await page.screenshot({ type: 'png', omitBackground: true }));
}

await browser.close();
console.log('Generated og-image.png, favicon-32.png, apple-touch-icon.png');
