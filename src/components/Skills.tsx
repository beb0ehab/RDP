import { usePreferences } from '../context/Preferences';
import { QuoteIcon } from './Icons';
import { SectionHeading } from './SectionHeading';

/**
 * Three-column band, as in the reference design:
 * About & skills | Work process | Statement.
 */
export function Skills() {
  const { t } = usePreferences();

  return (
    <section
      id="about"
      className="border-b border-line bg-[linear-gradient(180deg,rgb(var(--accent)/0.07),transparent_60%)]"
      aria-labelledby="about-title"
    >
      <div className="container grid lg:grid-cols-3 lg:divide-x lg:divide-line rtl:lg:divide-x-reverse">
        {/* About & skills */}
        <div className="border-b border-line py-14 lg:border-b-0 lg:pe-8">
          <SectionHeading id="about-title" title={t.about.bandTitle} small />
          <ul className="reveal mt-6 space-y-3" data-anim="fade">
            {t.about.bullets.map((b) => (
              <li key={b} className="flex gap-3 text-sm leading-relaxed">
                <span
                  aria-hidden="true"
                  className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent"
                />
                {b}
              </li>
            ))}
          </ul>

          <h3 className="mt-8 text-xs font-bold uppercase tracking-[0.18em] text-accent">
            {t.about.skillsTitle}
          </h3>
          <div className="reveal mt-4 space-y-4" data-anim="fade">
            {t.about.groups.map((g) => (
              <div key={g.title}>
                <h4 className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-muted">
                  {g.title}
                </h4>
                <ul className="mt-2 flex flex-wrap gap-1.5">
                  {g.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-sm border border-line px-2 py-1 text-[0.72rem] font-semibold uppercase tracking-wide"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Work process */}
        <div className="border-b border-line py-14 lg:border-b-0 lg:px-8">
          <SectionHeading id="process-title" title={t.process.title} small />
          <ol className="relative mt-6 space-y-5" data-process>
            <span aria-hidden="true" className="absolute bottom-5 start-5 top-5 w-px bg-line" />
            <span
              aria-hidden="true"
              data-process-line
              className="absolute bottom-5 start-5 top-5 w-px origin-top scale-y-0 bg-accent"
            />
            {t.process.steps.map((step, i) => (
              <li key={step.title} className="reveal relative flex gap-4" data-anim="step">
                <span
                  className="relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full border-2 border-accent bg-bg font-display text-base text-ink"
                  dir="ltr"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="text-sm font-extrabold uppercase tracking-[0.14em] text-accent">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-pretty text-sm leading-relaxed text-muted">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Statement */}
        <div className="py-14 lg:ps-8">
          <figure
            data-anim="pop"
            className="force-dark reveal relative flex h-full flex-col overflow-hidden rounded-md bg-[linear-gradient(160deg,#7a0a16,#2a070c_55%,#0a0a0b)] p-8 shadow-lift"
          >
            <div
              aria-hidden="true"
              className="absolute -end-16 -top-16 h-56 w-56 rounded-full bg-[#ff4655]/30 blur-3xl"
            />
            <QuoteIcon className="relative text-[#ff4655] rtl:-scale-x-100" />
            <blockquote className="relative mt-5 flex-1 text-balance text-2xl font-semibold leading-snug">
              {t.quote.text}
            </blockquote>
            <figcaption className="relative mt-8">
              <span className="block font-script text-4xl leading-none text-[#ff4655]">
                {t.quote.author}
              </span>
              <span className="mt-2 block text-xs font-bold uppercase tracking-[0.14em] text-muted">
                {t.quote.role}
              </span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
