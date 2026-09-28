import { asset, site } from '../config';
import { usePreferences } from '../context/Preferences';
import { ArrowDownIcon, ClockIcon, LayersIcon, PinIcon, RocketIcon, WhatsAppIcon } from './Icons';

const factIcons = [LayersIcon, RocketIcon, ClockIcon, PinIcon];

/** Portrait slot: the photo from config, or an "AE" monogram until one is added. */
function Portrait() {
  const { t } = usePreferences();
  return (
    <div className="relative mx-auto aspect-[4/5] w-full max-w-[20rem] lg:max-w-none">
      <div
        aria-hidden="true"
        className="absolute inset-x-6 bottom-0 top-10 rounded-[2rem] bg-accent/30 blur-3xl"
      />
      <div className="relative h-full overflow-hidden rounded-[2rem] border border-line bg-surface-2 shadow-lift">
        {site.photo ? (
          <img
            src={asset(site.photo)}
            alt={t.hero.photoAlt}
            width={800}
            height={1000}
            fetchPriority="high"
            className="h-full w-full object-cover object-top"
          />
        ) : (
          <div
            aria-hidden="true"
            className="relative grid h-full place-items-center bg-[radial-gradient(120%_80%_at_50%_0%,rgb(var(--accent)/0.35),transparent_60%)]"
          >
            <div className="bg-grid absolute inset-0 opacity-60" />
            <span
              className="relative font-display text-[9rem] leading-none text-ink/90 sm:text-[11rem]"
              dir="ltr"
            >
              AE
            </span>
          </div>
        )}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-bg/90 to-transparent"
        />
        <p className="absolute inset-x-0 bottom-4 text-center font-display text-xl tracking-wide text-ink">
          {t.hero.name}
        </p>
      </div>
    </div>
  );
}

export function Hero() {
  const { t } = usePreferences();

  return (
    <section id="top" className="relative overflow-hidden pb-8 pt-24 sm:pb-16 sm:pt-28">
      {/* Giant background word, like a magazine cover. Decorative only. */}
      <p
        aria-hidden="true"
        dir="ltr"
        className="pointer-events-none absolute inset-x-0 top-16 -z-10 select-none whitespace-nowrap text-center font-display text-[21vw] leading-[0.8] text-accent/90 [mask-image:linear-gradient(to_bottom,#000_35%,transparent_95%)] lg:top-14 lg:text-[min(19rem,20vw)]"
        style={{ fontWeight: 400, textTransform: 'uppercase' }}
      >
        {t.hero.portfolioWord}
      </p>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -end-40 top-20 -z-10 h-[30rem] w-[30rem] rounded-full bg-accent/15 blur-3xl"
      />

      <div className="container grid items-center gap-10 pt-[18vw] lg:grid-cols-12 lg:gap-8 lg:pt-40">
        <div className="order-2 lg:order-1 lg:col-span-5">
          <p className="inline-flex max-w-full items-center gap-2.5 rounded-full border border-line bg-surface/80 px-3.5 py-1.5 text-xs font-semibold text-ink shadow-card backdrop-blur sm:text-sm">
            <span className="relative flex h-2.5 w-2.5 shrink-0" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:hidden" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
            </span>
            {t.hero.availability}
          </p>

          <h1 className="mt-6">
            <span className="block text-lg font-semibold italic text-accent sm:text-xl">
              {t.hero.greeting}
            </span>
            <span className="mt-1 block text-balance font-display text-6xl leading-[0.95] sm:text-7xl">
              {t.hero.name}
            </span>
          </h1>
          <p className="mt-4 text-lg font-bold uppercase tracking-wide text-accent sm:text-xl">
            {t.hero.title}
          </p>
          <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-muted sm:text-lg">
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
        </div>

        <div className="order-1 lg:order-2 lg:col-span-4">
          <Portrait />
        </div>

        <ul className="order-3 grid gap-3 sm:grid-cols-2 lg:col-span-3 lg:grid-cols-1 lg:gap-5">
          {t.hero.facts.map((f, i) => {
            const Icon = factIcons[i];
            return (
              <li
                key={f.label}
                className="flex items-center gap-4 rounded-2xl border border-line bg-surface/70 p-4 backdrop-blur lg:border-0 lg:bg-transparent lg:p-0 lg:backdrop-blur-none"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border-2 border-accent/70 text-accent">
                  <Icon size={20} />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs font-bold uppercase tracking-[0.14em] text-muted">
                    {f.label}
                  </span>
                  <span className="mt-0.5 block text-sm font-semibold leading-snug">{f.value}</span>
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
