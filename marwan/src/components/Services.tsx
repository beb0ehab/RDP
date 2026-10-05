import { usePreferences } from '../context/Preferences';
import { BotIcon, DashboardIcon, SparklesIcon, StoreIcon } from './Icons';
import { SectionHeading } from './SectionHeading';

const icons = [StoreIcon, DashboardIcon, BotIcon, SparklesIcon];

/** Four equal service cards; the "from my work" chips always sit on the same line. */
export function Services() {
  const { t } = usePreferences();

  return (
    <section
      id="services"
      className="border-b border-line py-16 sm:py-20"
      aria-labelledby="services-title"
    >
      <div className="container">
        <SectionHeading id="services-title" title={t.services.title} lead={t.services.lead} />

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.services.items.map((s, i) => {
            const Icon = icons[i];
            return (
              <li
                key={s.title}
                data-anim="card"
                data-tilt
                className="reveal group relative flex flex-col overflow-hidden rounded-md border border-line bg-surface p-6 transition-[border-color,box-shadow] duration-300 hover:border-accent/70 hover:shadow-[0_18px_40px_-18px_rgb(var(--accent)/0.55)]"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -end-10 -top-10 h-32 w-32 rounded-full bg-accent/0 blur-2xl transition-colors duration-300 group-hover:bg-accent/25"
                />
                <div className="relative flex items-center justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-full border-2 border-accent text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
                    <Icon size={20} />
                  </span>
                  <span
                    aria-hidden="true"
                    dir="ltr"
                    data-num={String(i + 1).padStart(2, '0')}
                    className="font-display text-3xl leading-none text-ink/15 transition-colors before:content-[attr(data-num)] group-hover:text-accent/60"
                  />
                </div>

                <h3 className="relative mt-5 font-display text-xl leading-snug">{s.title}</h3>
                <p className="relative mt-2 flex-1 text-pretty text-sm leading-relaxed text-muted">
                  {s.text}
                </p>

                <div className="relative mt-5 border-t border-line pt-4">
                  <p className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-accent">
                    {t.services.examplesLabel}
                  </p>
                  <ul
                    className="mt-2 flex flex-wrap content-start gap-1.5 lg:min-h-[3.4rem]"
                    aria-label={t.services.examplesLabel}
                  >
                    {s.examples.map((name) => (
                      <li
                        key={name}
                        dir="ltr"
                        className="rounded-sm border border-line bg-bg px-2 py-0.5 text-xs font-semibold"
                      >
                        {name}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
