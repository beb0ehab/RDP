import { usePreferences } from '../context/Preferences';
import { SectionHeading } from './SectionHeading';

/** About paragraph + skills grouped as chips. */
export function Skills() {
  const { t } = usePreferences();

  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="container grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading id="about-title" eyebrow={t.about.eyebrow} title={t.about.title} />
          <div className="reveal mt-6 space-y-4 text-pretty text-base leading-relaxed text-muted sm:text-lg">
            {t.about.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>

        <div className="lg:col-span-7">
          <h3 className="sr-only">{t.about.skillsTitle}</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {t.about.groups.map((g) => (
              <div key={g.title} className="reveal rounded-2xl border border-line bg-surface p-5">
                <h4 className="text-sm font-bold">{g.title}</h4>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {g.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-lg border border-line bg-bg px-2.5 py-1.5 text-sm font-medium"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
