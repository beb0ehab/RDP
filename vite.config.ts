import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';

// The site is served from https://<user>.github.io/<repo>/ on GitHub Pages.
// - Project page (this repo, "RDP")      → base: '/RDP/'
// - <username>.github.io repo or custom domain → base: '/'
// You can also override it at build time: BASE_PATH=/ npm run build
const base = process.env.BASE_PATH ?? '/RDP/';

export default defineConfig({
  base,
  plugins: [react()],
  build: {
    target: 'es2019',
    cssTarget: ['chrome80', 'safari13', 'firefox78', 'edge88'],
    rollupOptions: {
      // 404.html is served by GitHub Pages for any unknown URL.
      input: {
        main: resolve(__dirname, 'index.html'),
        notFound: resolve(__dirname, '404.html'),
        // FBAUTO product landing page → /<base>/fbauto/
        fbauto: resolve(__dirname, 'fbauto/index.html'),
      },
    },
  },
});
