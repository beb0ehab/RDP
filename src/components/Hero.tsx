import { asset, site } from '../config';
import { usePreferences } from '../context/Preferences';
import {
  ArrowDownIcon,
  ClockIcon,
  GlobeIcon,
  LayersIcon,
  PinIcon,
  RocketIcon,
  WhatsAppIcon,
} from './Icons';

const factIcons = [RocketIcon, LayersIcon, ClockIcon, GlobeIcon];

/** Big portrait that fades into the background, or an "AE" monogram until a photo is added. */
function Portrait() {
  const { t } = usePreferences();
  return (
    <div className="relative mx-auto h-full w-full max-w-md">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 top-[15%] rounded-full bg-accent/40 blur-[90px]"
      />
      {site.photo ? (
        <img
          src={asset(site.photo)}
          srcSet={`${asset(site.photoSmall)} 560w, ${asset(site.photo)} 900w`}
          sizes="(min-width: 1024px) 448px, 80vw"
          alt={t.hero.photoAlt}
          width={900}
          height={1125}
          fetchPriority="high"
          className="relative mx-auto block h-auto w-full max-w-[22rem] object-contain object-bottom [mask-image:linear-gradient(to_bottom,#000_78%,transparent)] lg:max-w-none"
        />
      ) : (
        <div
          aria-hidden="true"
          className="relative grid aspect-[5/3] place-items-center [mask-image:linear-gradient(to_bottom,#000_65%,transparent)] lg:aspect-[4/5]"
        >
          <span
            className="font-display text-[9rem] leading-none text-transparent sm:text-[12rem] lg:text-[15rem]"
            style={{ WebkitTextStroke: '2px rgb(var(--ink) / 0.85)' }}
            dir="ltr"
          >
            AE
          </span>
        </div>
      )}
    </div>
  );
}

export function Hero() {
  const { t } = usePreferences();

  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-line bg-[radial-gradient(60%_55%_at_55%_45%,rgb(var(--accent)/0.22),transparent_70%)] pt-20"
    >
      {/* Giant background word, like the cover of a magazine. Decorative only. */}
      <p
        aria-hidden="true"
        dir="ltr"
        className="pointer-events-none absolute inset-x-0 top-16 select-none whitespace-nowrap text-center font-display text-[21vw] leading-[0.82] text-accent [mask-image:linear-gradient(to_bottom,#000_30%,transparent_92%)] lg:text-[min(19rem,19.5vw)]"
        style={{ fontWeight: 400, textTransform: 'uppercase' }}
      >
        {t.hero.portfolioWord}
      </p>

      <div className="container relative grid gap-8 pt-[12vw] lg:min-h-[44rem] lg:grid-cols-12 lg:items-end lg:gap-6 lg:pt-10">
        {/* Portrait (center on desktop, first on mobile) */}
        <div className="lg:order-2 lg:col-span-5 lg:self-stretch lg:pt-16">
          <Portrait />
        </div>

        {/* Intro text */}
        <div className="pb-4 lg:order-1 lg:col-span-4 lg:self-center lg:pb-0 lg:pt-44">
          <h1>
            <span className="block font-script text-4xl text-accent">{t.hero.greeting}</span>
            <span className="mt-1 block text-balance font-display text-6xl leading-[0.92] sm:text-7xl">
              {t.hero.name}
            </span>
          </h1>
          <p className="mt-5 text-lg font-extrabold uppercase tracking-wide text-accent">
            {t.hero.title}
          </p>
          <p className="mt-1 text-sm font-bold uppercase tracking-[0.12em]">{t.hero.subtitle}</p>
          <p className="mt-4 max-w-md text-pretty text-sm leading-relaxed text-muted sm:text-base">
            {t.hero.intro}
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a href="#projects" className="btn-primary">
              {t.hero.viewWork}
              <ArrowDownIcon size={18} />
            </a>
            <a href={site.whatsappUrl} target="_blank" rel="noopener" className="btn-secondary">
              <WhatsAppIcon size={18} className="text-[#1FA855]" />
              {t.hero.contact}
            </a>
          </div>

          <p className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-muted">
            <PinIcon size={16} className="text-accent" />
            {t.hero.basedLabel}:<span className="text-ink">{t.hero.basedValue}</span>
          </p>
        </div>

        {/* Facts */}
        <ul className="grid grid-cols-2 gap-x-4 border-t border-line pb-10 lg:order-3 lg:col-span-3 lg:grid-cols-1 lg:self-center lg:border-t-0 lg:pb-0 lg:pt-44">
          {t.hero.facts.map((f, i) => {
            const Icon = factIcons[i];
            return (
              <li key={f.label} className="flex items-center gap-3 border-b border-line py-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border-2 border-accent text-accent">
                  <Icon size={19} />
                </span>
                <span className="min-w-0">
                  <span className="block text-[0.65rem] font-bold uppercase tracking-[0.16em] text-muted">
                    {f.label}
                  </span>
                  <span className="mt-0.5 block text-sm font-extrabold uppercase leading-snug">
                    {f.value}
                  </span>
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
