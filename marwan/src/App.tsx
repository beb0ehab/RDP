import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { Marquee } from './components/Marquee';
import { Navbar } from './components/Navbar';
import { Projects } from './components/Projects';
import { Services } from './components/Services';
import { Skills } from './components/Skills';
import { usePreferences } from './context/Preferences';
import { useReveal } from './hooks/useReveal';
import { useMotion } from './hooks/useMotion';

export default function App() {
  const { t, lang } = usePreferences();
  useReveal([lang]);
  useMotion(lang);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-accent focus:px-4 focus:py-3 focus:font-semibold focus:text-accent-ink"
      >
        {t.a11y.skipToContent}
      </a>
      <div
        aria-hidden="true"
        data-progress
        className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left scale-x-0 bg-accent rtl:origin-right"
      />
      <Navbar />
      <main id="main">
        <Hero />
        <Marquee />
        <Projects />
        <Services />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
