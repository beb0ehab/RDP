/**
 * Personal links & contact details — edit these in one place.
 */
export const site = {
  name: 'Adly Ehab',
  email: 'adlyehabdev@gmail.com',
  whatsappDisplay: '+20 106 352 9309',
  whatsappUrl: 'https://wa.me/201063529309',
  linkedinUrl: 'https://linkedin.com/in/adly-ehab-dev',

  // TODO(Adly): paste your GitHub profile URL here, e.g. 'https://github.com/your-username'.
  // While this is empty, GitHub links are hidden automatically.
  githubUrl: '' as string,

  // TODO(Adly): add a portrait photo at public/profile.webp (about 800×1000, WebP) and set this to
  // 'profile.webp'. While it's empty, the hero shows an "AE" monogram instead of a photo.
  photo: '' as string,

  // Put your CV at public/Adly_Ehab_CV.pdf — the "Download CV" buttons point to it.
  cvFile: 'Adly_Ehab_CV.pdf',
} as const;

/** Resolves a file inside /public against the Vite base path (works on GitHub Pages). */
export const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;
