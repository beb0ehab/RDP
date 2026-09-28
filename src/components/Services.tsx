import { usePreferences } from '../context/Preferences';
import { BotIcon, DashboardIcon, SparklesIcon, StoreIcon } from './Icons';
import { SectionHeading } from './SectionHeading';

const icons = [StoreIcon, DashboardIcon, BotIcon, SparklesIcon];

export function Services() {
  const { t } = usePreferences();

  return (
    <section
      id="services"
      className="section border-y border-line bg-surface-2/50"
      aria-labelledby="services-title"
    >
      <div className="container">
        <SectionHeading
          id="services-title"
          eyebrow={t.services.eyebrow}
          title={t.services.title}
          lead={t.services.lead}
        />

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {t.services.items.map((s, i) => {
            const Icon = icons[i];
            return (
              <li
                key={s.title}
                className="reveal group flex flex-col rounded-2xl border border-line bg-surface p-6 shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-lift motion-reduce:hover:translate-y-0"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent-soft text-accent transition-transform group-hover:-rotate-6">
                  <Icon size={24} />
                </span>
                <h3 className="mt-5 text-lg font-bold">{s.title}</h3>
                <p className="mt-2 flex-1 text-pretty text-sm leading-relaxed text-muted">
                  {s.text}
                </p>
                <p className="mt-4 text-xs font-semibold text-ink/70">{s.example}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
