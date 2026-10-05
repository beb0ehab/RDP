/**
 * Personal links & contact details — edit these in one place.
 */
export const site = {
  name: 'Marwan Hesham',
  initials: 'MH',
  email: 'marawanoka23@gmail.com',
  linkedinUrl: 'https://linkedin.com/in/marwan-hesham-0ab710437',
  linkedinDisplay: 'in/marwan-hesham-0ab710437',

  // While this is empty, GitHub links are hidden automatically.
  githubUrl: '' as string,

  // Marwan's CV (public/marwan/Marwan_Hesham_CV.pdf) — the "Download CV" buttons point to it.
  cvFile: 'marwan/Marwan_Hesham_CV.pdf',
  cvDownloadName: 'Marwan_Hesham_CV.pdf',
} as const;

/** Resolves a file inside /public against the Vite base path (works on GitHub Pages). */
export const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;
