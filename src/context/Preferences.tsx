import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import en from '../i18n/en';
import ar from '../i18n/ar';
import type { Dictionary } from '../i18n/en';
import type { Lang, Theme } from '../types';
import { writeStorage } from '../lib/storage';

const dictionaries: Record<Lang, Dictionary> = { en, ar };

interface PreferencesValue {
  lang: Lang;
  t: Dictionary;
  toggleLang: () => void;
  theme: Theme;
  toggleTheme: () => void;
}

const PreferencesContext = createContext<PreferencesValue | null>(null);

// index.html already applied the saved theme (dark by default) and language before first paint,
// so we read the initial state back from <html> to stay in sync.
const initialTheme = (): Theme =>
  document.documentElement.classList.contains('dark') ? 'dark' : 'light';
const initialLang = (): Lang => (document.documentElement.lang === 'ar' ? 'ar' : 'en');

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(initialTheme);
  const [lang, setLang] = useState<Lang>(initialLang);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    root.style.colorScheme = theme;
  }, [theme]);

  useEffect(() => {
    const root = document.documentElement;
    const t = dictionaries[lang];
    root.lang = lang;
    root.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.title = t.meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.meta.description);
  }, [lang]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      writeStorage('theme', next);
      return next;
    });
  }, []);

  const toggleLang = useCallback(() => {
    setLang((prev) => {
      const next = prev === 'ar' ? 'en' : 'ar';
      writeStorage('lang', next);
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({ lang, t: dictionaries[lang], toggleLang, theme, toggleTheme }),
    [lang, theme, toggleLang, toggleTheme],
  );

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function usePreferences() {
  const ctx = useContext(PreferencesContext);
  if (!ctx) throw new Error('usePreferences must be used inside <PreferencesProvider>');
  return ctx;
}
