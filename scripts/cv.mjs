/**
 * Builds the CV from cv/cv.json.
 *
 * Output:
 *   cv/cv.html              the CV as a web page (open it in a browser to check it)
 *   cv/Adly_Ehab_CV.pdf     one-page A4 PDF
 *   cv/preview.png          image preview of the PDF page
 *   public/Adly_Ehab_CV.pdf copy used by the site's "Download CV" button
 *
 * Run: npm run cv
 */
import { chromium } from 'playwright';
import { copyFileSync, existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dir = join(root, 'cv');
const data = JSON.parse(readFileSync(join(dir, 'cv.json'), 'utf8'));

const esc = (s = '') =>
  String(s).replace(
    /[&<>"]/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c],
  );
// **bold** inside any text
const rich = (s = '') => esc(s).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>');
const section = (title, body) => (body ? `<h2>${esc(title)}</h2>${body}` : '');

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>${esc(data.name)} — CV</title>
<style>
  @font-face { font-family: 'DejaVu Sans'; src: url('fonts/DejaVuSans.ttf'); font-weight: 400; }
  @font-face { font-family: 'DejaVu Sans'; src: url('fonts/DejaVuSans-Bold.ttf'); font-weight: 700; }
  @page { size: A4; margin: 0; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html { background: #e9edf1; }
  body { font-family: 'DejaVu Sans', sans-serif; color: #262626; font-size: 7.9pt; line-height: 1.38; }
  .page { width: 210mm; min-height: 297mm; margin: 0 auto; padding: 36pt 42.5pt 30pt; background: #fff; }
  @media screen { .page { margin: 24px auto; box-shadow: 0 6px 30px rgba(0,0,0,.15); } }
  .in { padding-inline-start: 6.5pt; }
  h1 { font-size: 23pt; line-height: 1.1; color: #102a43; font-weight: 700; }
  .title { margin-top: 3pt; font-size: 10.3pt; font-weight: 700; color: #0866c6; text-transform: uppercase; }
  .contact { margin-top: 3pt; font-size: 8.3pt; color: #5b5b5b; }
  h2 { margin-top: 9pt; padding: 0 0 2.5pt 6.5pt; border-bottom: 0.6pt solid #0866c6;
       font-size: 11.2pt; font-weight: 700; color: #102a43; text-transform: uppercase; }
  .summary { margin-top: 4.5pt; padding-inline-start: 6.5pt; font-size: 8.1pt; line-height: 1.45; }
  .grid { margin-top: 4.5pt; display: grid; row-gap: 1pt; }
  .grid.projects { row-gap: 2.5pt; }
  .grid .row { display: grid; grid-template-columns: 96pt 1fr; column-gap: 0; }
  .grid.projects .row { grid-template-columns: 121pt 1fr; row-gap: 0; }
  .grid b { font-weight: 700; }
  .job { margin-top: 4.5pt; }
  .job__head { display: flex; justify-content: space-between; align-items: baseline; }
  .job__role { font-size: 9.2pt; font-weight: 700; }
  .job__date { font-size: 8.2pt; color: #5b5b5b; white-space: nowrap; }
  .job__org { padding-inline-start: 6.5pt; font-size: 8.2pt; color: #5b5b5b; }
  ul { list-style: none; margin-top: 1pt; }
  li { position: relative; padding-inline-start: 16pt; }
  li::before { content: '•'; position: absolute; left: 9pt; font-weight: 700; }
  .edu { margin-top: 4.5pt; }
  .edu .job__head b { font-size: 7.9pt; }
</style>
</head>
<body>
<main class="page">
  <h1 class="in">${esc(data.name)}</h1>
  <p class="title in">${esc(data.title)}</p>
  <p class="contact in">${data.contact.map(esc).join('&nbsp; | &nbsp;')}</p>
  ${section('Professional Summary', data.summary && `<p class="summary">${rich(data.summary)}</p>`)}
  ${section(
    'Core Skills',
    data.skills?.length &&
      `<div class="grid">${data.skills
        .map(
          (s) =>
            `<div class="row"><b>${esc(s.label)}</b><span>${s.items.map(esc).join(' | ')}</span></div>`,
        )
        .join('')}</div>`,
  )}
  ${section(
    'Professional Experience',
    data.experience?.length &&
      data.experience
        .map(
          (j) => `<div class="job">
            <div class="job__head"><span class="job__role">${esc(j.role)}</span><span class="job__date">${esc(j.dates)}</span></div>
            ${j.org ? `<p class="job__org">${esc(j.org)}</p>` : ''}
            <ul>${(j.bullets || []).map((b) => `<li>${rich(b)}</li>`).join('')}</ul>
          </div>`,
        )
        .join(''),
  )}
  ${section(
    'Selected Projects',
    data.projects?.length &&
      `<div class="grid projects">${data.projects
        .map((p) => `<div class="row"><b>${esc(p.name)}</b><span>${rich(p.text)}</span></div>`)
        .join('')}</div>`,
  )}
  ${section(
    'Education & Languages',
    (data.education?.length || data.languages) &&
      `<div class="edu">${(data.education || [])
        .map(
          (
            e,
          ) => `<div class="job__head"><b>${esc(e.degree)}</b><span class="job__date">${esc(e.dates)}</span></div>
            ${e.school ? `<p>${esc(e.school)}</p>` : ''}`,
        )
        .join('')}${data.languages ? `<p><b>Languages:</b> ${esc(data.languages)}</p>` : ''}</div>`,
  )}
</main>
</body>
</html>
`;

const htmlPath = join(dir, 'cv.html');
writeFileSync(htmlPath, html);

// Use Playwright's browser, or the preinstalled Chromium in cloud sessions.
const fallback = '/opt/pw-browsers/chromium';
const browser = await chromium
  .launch()
  .catch(() => chromium.launch({ executablePath: existsSync(fallback) ? fallback : undefined }));
const page = await browser.newPage();
await page.goto(pathToFileURL(htmlPath).href, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);

const pages = await page.evaluate(() =>
  Math.ceil((document.querySelector('.page').scrollHeight - 4) / 1122.5),
);
if (pages > 1) console.warn(`cv: the content is longer than one A4 page (${pages} pages).`);

const pdf = join(dir, 'Adly_Ehab_CV.pdf');
await page.pdf({ path: pdf, format: 'A4', printBackground: true, preferCSSPageSize: true });
await page.emulateMedia({ media: 'print' });
await page.setViewportSize({ width: 794, height: 1123 });
await page.screenshot({ path: join(dir, 'preview.png'), fullPage: true });
await browser.close();

copyFileSync(pdf, join(root, 'public', 'Adly_Ehab_CV.pdf'));
console.log(
  'cv: wrote cv/cv.html, cv/Adly_Ehab_CV.pdf, cv/preview.png and public/Adly_Ehab_CV.pdf',
);
