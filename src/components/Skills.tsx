import { usePreferences } from '../context/Preferences';
import { QuoteIcon } from './Icons';
import { SectionHeading } from './SectionHeading';

/** About paragraph + skills chips, then the work process and a short statement. */
export function Skills() {
  const { t } = usePreferences();

  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-12">
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
                <div
                  key={g.title}
                  className="reveal rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-accent/50"
                >
                  <h4 className="text-xs font-bold uppercase tracking-[0.14em] text-accent">
                    {g.title}
                  </h4>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {g.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-md border border-line bg-bg px-2.5 py-1.5 text-sm font-medium"
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

        <div className="mt-20 grid gap-12 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-7">
            <SectionHeading
              id="process-title"
              eyebrow={t.process.eyebrow}
              title={t.process.title}
            />
            <ol className="relative mt-8 space-y-6 before:absolute before:bottom-6 before:start-6 before:top-6 before:w-px before:bg-line">
              {t.process.steps.map((step, i) => (
                <li key={step.title} className="reveal relative flex gap-5">
                  <span
                    className="relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-full border-2 border-accent bg-bg font-display text-lg text-accent"
                    dir="ltr"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="pt-1.5">
                    <h3 className="font-display text-xl">{step.title}</h3>
                    <p className="mt-1 text-pretty text-sm leading-relaxed text-muted sm:text-base">
                      {step.text}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <figure className="force-dark reveal relative overflow-hidden rounded-[2rem] bg-[linear-gradient(145deg,#2a070c,#0a0a0b_70%)] p-8 shadow-lift sm:p-10 lg:col-span-5 lg:mt-24">
            <div
              aria-hidden="true"
              className="absolute -end-16 -top-16 h-56 w-56 rounded-full bg-accent/30 blur-3xl"
            />
            <QuoteIcon className="relative text-accent rtl:-scale-x-100" />
            <blockquote className="relative mt-6 text-balance text-2xl font-bold leading-snug sm:text-3xl">
              {t.quote.text}
            </blockquote>
            <figcaption className="relative mt-8 border-t border-line pt-5">
              <span className="block font-display text-xl text-accent">{t.quote.author}</span>
              <span className="block text-sm text-muted">{t.quote.role}</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
