import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { PreferencesProvider } from './context/Preferences';
// Fonts are bundled with the site (no third-party requests). Each file only downloads
// when a page actually uses those characters (unicode-range), e.g. Arabic only in Arabic.
import '@fontsource/plus-jakarta-sans/latin-400.css';
import '@fontsource/plus-jakarta-sans/latin-500.css';
import '@fontsource/plus-jakarta-sans/latin-600.css';
import '@fontsource/plus-jakarta-sans/latin-700.css';
import '@fontsource/plus-jakarta-sans/latin-800.css';
import '@fontsource/ibm-plex-sans-arabic/arabic-400.css';
import '@fontsource/ibm-plex-sans-arabic/arabic-600.css';
import '@fontsource/ibm-plex-sans-arabic/arabic-700.css';
import '@fontsource/anton/latin-400.css';
import '@fontsource/great-vibes/latin-400.css';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PreferencesProvider>
      <App />
    </PreferencesProvider>
  </StrictMode>,
);
