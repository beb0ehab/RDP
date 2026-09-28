import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { Navbar } from './components/Navbar';
import { Projects } from './components/Projects';
import { Services } from './components/Services';
import { Skills } from './components/Skills';
import { usePreferences } from './context/Preferences';
import { useReveal } from './hooks/useReveal';

export default function App() {
  const { t, lang } = usePreferences();
  useReveal([lang]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-accent focus:px-4 focus:py-3 focus:font-semibold focus:text-accent-ink"
      >
        {t.a11y.skipToContent}
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <Projects />
        <Services />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
