import { useEffect, useRef, useState } from 'react';
import { usePreferences } from '../context/Preferences';
import { CloseIcon, MenuIcon, MoonIcon, SunIcon } from './Icons';

const sections = ['projects', 'services', 'about', 'contact'] as const;

export function Logo() {
  const { t } = usePreferences();
  return (
    <a
      href="#top"
      className="group inline-flex min-h-[44px] items-center gap-2.5 rounded-lg font-extrabold tracking-tight"
    >
      <span
        aria-hidden="true"
        className="grid h-9 w-9 place-items-center rounded-[10px] bg-accent-strong font-display text-base text-white transition-transform group-hover:-rotate-6"
        dir="ltr"
      >
        AE
      </span>
      <span className="text-base sm:text-lg">{t.hero.name}</span>
      <span className="sr-only"> — {t.a11y.home}</span>
    </a>
  );
}

function Toggles() {
  const { t, theme, toggleTheme, toggleLang, lang } = usePreferences();
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={toggleLang}
        className="icon-btn w-auto min-w-11 px-3 text-sm font-bold"
        aria-label={`${t.nav.langShort} — ${t.a11y.switchLanguage}`}
        title={t.nav.langLabel}
        lang={lang === 'en' ? 'ar' : 'en'}
      >
        {t.nav.langShort}
      </button>
      <button
        type="button"
        onClick={toggleTheme}
        className="icon-btn"
        aria-label={theme === 'dark' ? t.a11y.switchToLight : t.a11y.switchToDark}
      >
        {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
      </button>
    </div>
  );
}

export function Navbar() {
  const { t } = usePreferences();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const mq = window.matchMedia('(min-width: 768px)');
    const onResize = () => mq.matches && setOpen(false);
    document.addEventListener('keydown', onKey);
    mq.addEventListener?.('change', onResize);
    return () => {
      document.removeEventListener('keydown', onKey);
      mq.removeEventListener?.('change', onResize);
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 border-b transition-colors duration-300 ${
        scrolled || open
          ? 'border-line/80 bg-bg/85 backdrop-blur-md supports-[backdrop-filter]:bg-bg/70'
          : 'border-transparent bg-transparent'
      }`}
    >
      <nav aria-label={t.a11y.mainNav} className="container flex h-16 items-center justify-between">
        <Logo />

        <ul className="hidden items-center gap-1 md:flex">
          {sections.map((id) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className="inline-flex min-h-[44px] items-center rounded-lg px-3 text-sm font-medium text-muted transition-colors hover:text-ink"
              >
                {t.nav[id]}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            <Toggles />
          </div>
          <button
            ref={buttonRef}
            type="button"
            className="icon-btn md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.a11y.closeMenu : t.a11y.openMenu}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        hidden={!open}
        className="border-t border-line/80 bg-bg/95 backdrop-blur-md md:hidden [&[hidden]]:hidden"
      >
        <div className="container animate-fade-in pb-6 pt-2">
          <ul className="flex flex-col">
            {sections.map((id) => (
              <li key={id} className="border-b border-line/60 last:border-0">
                <a
                  href={`#${id}`}
                  onClick={() => setOpen(false)}
                  className="flex min-h-[52px] items-center text-lg font-semibold"
                >
                  {t.nav[id]}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <Toggles />
          </div>
        </div>
      </div>
    </header>
  );
}
