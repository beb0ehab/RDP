import { usePreferences } from '../context/Preferences';
import { BotIcon, DashboardIcon, SparklesIcon, StoreIcon } from './Icons';
import { SectionHeading } from './SectionHeading';

const icons = [StoreIcon, DashboardIcon, BotIcon, SparklesIcon];

/** Compact 4-column services strip. */
export function Services() {
  const { t } = usePreferences();

  return (
    <section
      id="services"
      className="border-b border-line py-16 sm:py-20"
      aria-labelledby="services-title"
    >
      <div className="container">
        <SectionHeading id="services-title" title={t.services.title} />

        <ul className="mt-10 grid border-line sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-line rtl:lg:divide-x-reverse">
          {t.services.items.map((s, i) => {
            const Icon = icons[i];
            return (
              <li
                key={s.title}
                className="reveal border-b border-line py-6 last:border-b-0 sm:odd:pe-6 sm:even:ps-6 lg:border-b-0 lg:px-6 lg:first:ps-0 lg:last:pe-0"
              >
                <span className="grid h-11 w-11 place-items-center rounded-full border-2 border-accent text-accent">
                  <Icon size={19} />
                </span>
                <h3 className="mt-4 font-display text-xl">{s.title}</h3>
                <p className="mt-2 text-pretty text-sm leading-relaxed text-muted">{s.text}</p>
                <p className="mt-3 text-xs font-bold uppercase tracking-[0.12em] text-accent">
                  {s.example}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
