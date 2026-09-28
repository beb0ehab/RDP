import { asset } from '../config';
import { usePreferences } from '../context/Preferences';
import type { Project } from '../types';
import { ArrowIcon, ExternalIcon } from './Icons';
import { getScreenshot } from '../lib/screenshots';
import { ProjectMedia } from './ProjectMedia';

interface Props {
  project: Project;
  onOpen: (project: Project, trigger: HTMLElement) => void;
}

export function ProjectCard({ project, onOpen }: Props) {
  const { t, lang } = usePreferences();
  const title = project.title[lang];
  const mobile = getScreenshot(project.id)?.mobile;
  const shot = getScreenshot(project.id);

  return (
    <article className="reveal group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-card transition duration-300 hover:-translate-y-1 hover:border-ink/20 hover:shadow-lift motion-reduce:hover:translate-y-0">
      <div className="relative">
        <ProjectMedia
          project={project}
          lang={lang}
          alt={`${title} — ${t.projects.desktopShot}`}
          sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
        />
        {mobile && shot && (
          <div className="absolute bottom-3 end-3 w-[22%] overflow-hidden rounded-[10px] border-[3px] border-ink/90 bg-ink shadow-lift">
            <img
              src={asset(mobile)}
              width={shot.mobileWidth}
              height={shot.mobileHeight}
              alt={`${title} — ${t.projects.mobileShot}`}
              loading="lazy"
              decoding="async"
              className="block aspect-[390/844] h-auto w-full object-cover object-top"
            />
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {project.badge && (
          <span className="mb-2 inline-flex w-fit rounded-full bg-accent-soft px-2.5 py-0.5 text-xs font-bold text-accent">
            {project.badge[lang]}
          </span>
        )}
        <h3 className="text-lg font-bold leading-snug sm:text-xl">
          <button
            type="button"
            onClick={(e) => onOpen(project, e.currentTarget)}
            className="text-start after:absolute after:inset-0 after:rounded-2xl after:content-[''] focus-visible:outline-none focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-accent"
            aria-haspopup="dialog"
          >
            <span className="sr-only">{t.projects.viewDetails} </span>
            {title}
          </button>
        </h3>
        <p className="mt-0.5 text-sm font-medium text-accent">{project.subtitle[lang]}</p>
        <p className="mt-3 text-pretty text-sm leading-relaxed text-muted">
          {project.summary[lang]}
        </p>

        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label={t.projects.techStack}>
          {project.tech.map((tag) => (
            <li key={tag} className="chip" dir="ltr">
              {tag}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex items-center justify-between gap-3 pt-5">
          <span
            aria-hidden="true"
            className="inline-flex min-h-[44px] items-center gap-1.5 text-sm font-semibold text-ink transition-colors group-hover:text-accent"
          >
            {t.projects.details}
            <ArrowIcon
              size={16}
              className="transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5"
            />
          </span>
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener"
              className="relative z-10 inline-flex min-h-[44px] items-center gap-1.5 rounded-lg border border-line bg-bg px-3 text-sm font-semibold transition-colors hover:border-accent hover:text-accent"
            >
              {t.projects.liveSite}
              <ExternalIcon size={15} />
              <span className="sr-only">
                {' '}
                — {title} {t.a11y.opensInNewTab}
              </span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
