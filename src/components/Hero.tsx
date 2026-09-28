import { site } from '../config';
import { usePreferences } from '../context/Preferences';
import { ArrowDownIcon, PinIcon, WhatsAppIcon } from './Icons';

export function Hero() {
  const { t } = usePreferences();

  return (
    <section id="top" className="relative overflow-hidden pb-4 pt-28 sm:pb-12 sm:pt-36 lg:pt-40">
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 -z-10" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 end-[-10%] -z-10 h-[28rem] w-[28rem] rounded-full bg-accent/20 blur-3xl"
      />

      <div className="container grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="inline-flex max-w-full items-center gap-2.5 rounded-full border border-line bg-surface/80 px-3.5 py-1.5 text-xs font-semibold text-ink shadow-card sm:text-sm">
            <span className="relative flex h-2.5 w-2.5 shrink-0" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:hidden" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
            </span>
            {t.hero.availability}
          </p>

          <h1 className="mt-6 text-balance text-[2.6rem] font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            <span className="block text-lg font-semibold text-muted sm:text-xl">
              {t.hero.greeting}
            </span>
            {t.hero.name}
            <span className="text-accent">.</span>
          </h1>
          <p className="mt-4 text-xl font-bold text-ink/90 sm:text-2xl">{t.hero.title}</p>
          <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted sm:text-lg">
            {t.hero.intro}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#projects" className="btn-primary">
              {t.hero.viewWork}
              <ArrowDownIcon size={18} />
            </a>
            <a href={site.whatsappUrl} target="_blank" rel="noopener" className="btn-secondary">
              <WhatsAppIcon size={18} className="text-[#1FA855]" />
              {t.hero.contact}
            </a>
          </div>

          <p className="mt-6 inline-flex items-center gap-2 text-sm text-muted">
            <PinIcon size={16} />
            {t.hero.location}
          </p>
        </div>

        <ul className="relative hidden lg:col-span-5 lg:block" aria-label={t.projects.title}>
          {t.hero.highlights.map((h, i) => (
            <li
              key={h.title}
              className="animate-fade-up rounded-2xl border border-line bg-surface p-5 shadow-lift motion-reduce:animate-none"
              style={{
                animationDelay: `${150 + i * 120}ms`,
                marginInlineStart: `${[0, 3.5, 1.5][i]}rem`,
                marginTop: i ? '-0.25rem' : 0,
                rotate: `${[-1.5, 1, -0.75][i]}deg`,
              }}
            >
              <span className="eyebrow text-[0.65rem]">{h.label}</span>
              <p className="mt-1.5 text-lg font-bold">{h.title}</p>
              <p className="mt-1 text-sm text-muted">{h.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
