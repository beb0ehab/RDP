import { asset } from '../config';
import { usePreferences } from '../context/Preferences';
import { getScreenshot } from '../lib/screenshots';
import type { Project } from '../types';
import { ExternalIcon } from './Icons';
import { ProjectMedia } from './ProjectMedia';

interface Props {
  project: Project;
  /** Position in the list, shown as a big "01", "02"… label. */
  index: number;
  onOpen: (project: Project, trigger: HTMLElement) => void;
}

export function ProjectCard({ project, index, onOpen }: Props) {
  const { t, lang } = usePreferences();
  const title = project.title[lang];
  const shot = getScreenshot(project.id);

  return (
    <article className="reveal group relative flex h-full flex-col">
      <div className="relative overflow-hidden rounded-md border border-line bg-surface transition duration-300 group-hover:-translate-y-1 group-hover:border-accent/70 group-hover:shadow-[0_18px_40px_-18px_rgb(var(--accent)/0.55)] motion-reduce:group-hover:translate-y-0">
        <ProjectMedia
          project={project}
          lang={lang}
          alt={`${title} — ${t.projects.desktopShot}`}
          sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-black/80 via-transparent via-40% to-transparent"
        />
        <span
          aria-hidden="true"
          dir="ltr"
          className="absolute start-4 top-3 font-display text-4xl leading-none text-[#ff4655] drop-shadow"
        >
          {String(index + 1).padStart(2, '0')}
        </span>
        {shot?.mobile && (
          <div className="absolute bottom-3 end-3 w-[20%] overflow-hidden rounded-[8px] border-[3px] border-black/90 bg-black shadow-lift">
            <img
              src={asset(shot.mobileSmall ?? shot.mobile)}
              {...(shot.mobileSmall && {
                srcSet: `${asset(shot.mobileSmall)} 195w, ${asset(shot.mobile)} 390w`,
                sizes: '80px',
              })}
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

      <div className="mt-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="font-display text-2xl leading-tight">
            <button
              type="button"
              onClick={(e) => onOpen(project, e.currentTarget)}
              className="text-start after:absolute after:inset-0 after:rounded-md after:content-[''] focus-visible:outline-none focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:outline-offset-4 focus-visible:after:outline-accent"
              aria-haspopup="dialog"
            >
              <span className="sr-only">{t.projects.viewDetails} </span>
              {title}
            </button>
          </h3>
          <p className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-accent">
            {project.subtitle[lang]}
          </p>
        </div>
        {project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noopener"
            className="relative z-10 grid h-11 w-11 shrink-0 place-items-center rounded-full border border-line text-muted transition-colors hover:border-accent hover:text-accent"
            title={t.projects.liveSite}
          >
            <ExternalIcon size={16} />
            <span className="sr-only">
              {t.projects.liveSite} — {title} {t.a11y.opensInNewTab}
            </span>
          </a>
        )}
      </div>
    </article>
  );
}
