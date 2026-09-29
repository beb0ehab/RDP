# Adly Ehab — Portfolio

Personal portfolio of **Adly Ehab**, Web & AI Automation Developer.
One-page site built with **React + Vite + TypeScript + Tailwind CSS**, bilingual (English / Arabic with full RTL), light & dark themes, deployed to **GitHub Pages** with GitHub Actions.

- Live: https://beb0ehab.github.io/RDP/ (after the first deploy — see [Deployment](#deployment))

## Run locally

Requires Node.js 20+.

```bash
npm install
npm run dev        # http://localhost:5173/RDP/
npm run build      # type-check + production build into dist/
npm run preview    # serve the production build
npm run lint       # ESLint
npm run format     # Prettier
```

## Where to edit things

| What                                      | File                                        |
| ----------------------------------------- | ------------------------------------------- |
| Projects (order, text, tech, links)       | `src/data/projects.ts`                      |
| All UI texts — English                    | `src/i18n/en.ts`                            |
| All UI texts — Arabic                     | `src/i18n/ar.ts` (same keys as `en.ts`)     |
| Email, WhatsApp, LinkedIn, **GitHub**, CV | `src/config.ts`                             |
| Colors (light & dark)                     | CSS variables at the top of `src/index.css` |
| Page title / SEO / Open Graph tags        | `index.html` (+ `meta` in `src/i18n/*.ts`)  |

### Projects

Each project in `src/data/projects.ts` has an English and Arabic version of every text.
The array order is the display order.

- All projects are always shown, in array order.
- `landing` → the card opens a page inside this site (e.g. `fbauto/`) instead of the details dialog.
- `url` → shows the **Live site** button. Remove it to hide the button.
- `badge` → optional small label (e.g. "Client project").
- `placeholder` → icon + gradient used until the project has a screenshot.

### GitHub link & CV

- Paste your GitHub URL into `githubUrl` in `src/config.ts`. GitHub links stay hidden while it's empty.
- Put your CV at **`public/Adly_Ehab_CV.pdf`**. The **Download CV** button already points there.

## Screenshots

Real screenshots are captured automatically from the live sites.

**Option A: GitHub Actions (no setup).** Open the **Actions** tab → **Capture screenshots** → **Run workflow**.
It captures every project that has a `url`, commits the images to `public/projects/`, and redeploys the site.

**Option B: locally.**

```bash
npx playwright install chromium   # first time only
npm run screenshots               # all projects with a url
npm run screenshots -- leadora    # just one project
```

The script saves `public/projects/<id>-desktop.webp` (1440×900), a 720px version for cards,
and `<id>-mobile.webp` (390×844) for the projects listed in `MOBILE_IDS` in `scripts/screenshots.mjs`
(Kero Tours and LEADORA). It records them in `src/data/screenshots.json`, which the site reads to
replace placeholders automatically.

**Using your own images** (e.g. for projects without a live link): save a 1440×900 WebP to
`public/projects/<id>-desktop.webp` (+ a 720×450 copy as `<id>-desktop-720.webp`) and add an entry to
`src/data/screenshots.json`:

```json
"ai-workspace": {
  "desktop": "projects/ai-workspace-desktop.webp",
  "desktopSmall": "projects/ai-workspace-desktop-720.webp",
  "width": 1440,
  "height": 900
}
```

The social preview image and favicons can be regenerated with `npm run og`.

## FBAUTO landing page

A standalone Arabic (RTL) product page at **`/fbauto/`** (e.g. `https://beb0ehab.github.io/RDP/fbauto/`).
Project card #4 in the portfolio links to it (`landing: 'fbauto/'` in `src/data/projects.ts`).

| What               | Where                                                                                                                                         |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| **WhatsApp link**  | `WHATSAPP_URL` at the top of `fbauto/main.ts` (e.g. `'https://wa.me/201063529309'`)                                                           |
| **App screenshot** | Replace `public/fbauto/fbauto-main-1440x900.png` (keep the name). WebP copies are generated automatically on `npm run dev` / `npm run build`. |
| Page text & prices | `fbauto/index.html`                                                                                                                           |
| Styles             | `fbauto/style.css`                                                                                                                            |
| Customer reviews   | "آراء العملاء" section in `fbauto/index.html` (placeholder until you have real reviews)                                                       |

Every WhatsApp button sends a ready-made message (set in its `data-wa` attribute), e.g. which
package the visitor picked. Until `WHATSAPP_URL` is set, the buttons just scroll to the contact section.

## Deployment

`.github/workflows/deploy.yml` builds and deploys the site on every push to **`main`**.

One-time setup: go to **Settings → Pages → Build and deployment → Source** and choose **GitHub Actions**.
(The workflow also tries to enable Pages by itself.)

The Vite `base` path is set automatically in CI:

- Repo `RDP` → site at `https://beb0ehab.github.io/RDP/` (base `/RDP/`)
- Repo named `<username>.github.io`, or a custom domain (`public/CNAME`) → base `/`

Locally the default base is `/RDP/` (see `vite.config.ts`); override it with `BASE_PATH=/ npm run build`.

GitHub Pages serves `404.html` for unknown URLs. It's a small branded page that links back home.

## Custom domain

1. Create `public/CNAME` containing just your domain, e.g. `adlyehab.dev`.
2. At your DNS provider, point the domain to GitHub Pages
   ([docs](https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site)):
   `A` records to `185.199.108.153`, `185.199.109.153`, `185.199.110.153` and `185.199.111.153`,
   or a `CNAME` record for `www` pointing to `beb0ehab.github.io`.
3. Update the site URL in `.env` (`VITE_SITE_URL`), `public/robots.txt` and `public/sitemap.xml`.
4. Push to `main`. The workflow detects `CNAME` and builds with base `/`.
5. In **Settings → Pages**, enter the domain and tick **Enforce HTTPS**.

## Tech notes

- Language & theme are saved in `localStorage` (safely wrapped) and applied before first paint, so there's no flash.
  The design is dark-first: it opens in dark mode unless the visitor switched to light.
- Arabic switches `<html dir="rtl" lang="ar">`. Layout uses logical properties (`ms-`, `pe-`, `start-`, `end-`) so it mirrors correctly.
- Fonts are bundled with the site via `@fontsource` (no third-party requests, `font-display: swap`):
  Anton (headings), Plus Jakarta Sans (text), IBM Plex Sans Arabic (Arabic), Great Vibes (signature).
- Project details open in a native `<dialog>`, which gives keyboard focus trapping and Esc-to-close.
- Animations are subtle and disabled with `prefers-reduced-motion`.
