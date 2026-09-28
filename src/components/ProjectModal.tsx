import { useEffect, useRef } from 'react';
import { asset } from '../config';
import { usePreferences } from '../context/Preferences';
import type { Project } from '../types';
import { CheckIcon, CloseIcon, ExternalIcon } from './Icons';
import { getScreenshot } from '../lib/screenshots';
import { ProjectMedia } from './ProjectMedia';

interface Props {
  project: Project | null;
  onClose: () => void;
}

/**
 * Project details in a native <dialog> (focus trap, Esc to close and
 * top-layer rendering come from the browser).
 */
export function ProjectModal({ project, onClose }: Props) {
  const { t, lang } = usePreferences();
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (project && !dialog.open) {
      dialog.showModal();
      document.body.style.overflow = 'hidden';
    }
    if (!project && dialog.open) dialog.close();
    return () => {
      document.body.style.overflow = '';
    };
  }, [project]);

  const shot = project ? getScreenshot(project.id) : undefined;
  const titleId = 'project-modal-title';

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      onClose={onClose}
      onCancel={onClose}
      onClick={(e) => {
        // Click on the backdrop (outside the panel) closes the dialog.
        if (e.target === e.currentTarget) onClose();
      }}
      className="m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-3xl overflow-y-auto overscroll-contain rounded-2xl border border-line bg-surface p-0 text-ink shadow-lift backdrop:bg-black/60 backdrop:backdrop-blur-sm open:animate-scale-in"
    >
      {project && (
        <div>
          <div className="relative">
            <ProjectMedia
              project={project}
              lang={lang}
              alt={`${project.title[lang]} — ${t.projects.desktopShot}`}
              sizes="(min-width: 800px) 768px, 100vw"
              large
              eager
            />
            <button
              type="button"
              onClick={onClose}
              className="absolute end-3 top-3 grid h-11 w-11 place-items-center rounded-full bg-black/55 text-white backdrop-blur transition hover:bg-black/75"
              aria-label={t.a11y.close}
              autoFocus
            >
              <CloseIcon />
            </button>
          </div>

          <div className="grid gap-8 p-6 sm:p-8 md:grid-cols-[1fr_auto]">
            <div>
              {project.badge && (
                <span className="mb-2 inline-flex rounded-full bg-accent-soft px-2.5 py-0.5 text-xs font-bold text-accent">
                  {project.badge[lang]}
                </span>
              )}
              <h2 id={titleId} className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                {project.title[lang]}
              </h2>
              <p className="mt-1 font-medium text-accent">{project.subtitle[lang]}</p>

              <h3 className="mt-6 text-xs font-bold uppercase tracking-[0.16em] text-muted">
                {t.projects.highlights}
              </h3>
              <ul className="mt-3 space-y-3">
                {project.details[lang].map((item) => (
                  <li key={item} className="flex gap-3 text-pretty leading-relaxed">
                    <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent-soft text-accent">
                      <CheckIcon size={13} strokeWidth={2.5} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <h3 className="mt-6 text-xs font-bold uppercase tracking-[0.16em] text-muted">
                {t.projects.techStack}
              </h3>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {project.tech.map((tag) => (
                  <li key={tag} className="chip" dir="ltr">
                    {tag}
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                {project.url ? (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener"
                    className="btn-primary w-full sm:w-auto"
                  >
                    {t.projects.liveSite}
                    <ExternalIcon size={17} />
                    <span className="sr-only"> {t.a11y.opensInNewTab}</span>
                  </a>
                ) : (
                  <p className="text-sm text-muted">{t.projects.noLink}</p>
                )}
              </div>
            </div>

            {shot?.mobile && (
              <div className="mx-auto w-48 md:w-44">
                <div className="overflow-hidden rounded-[1.6rem] border-[6px] border-ink bg-ink shadow-lift">
                  <img
                    src={asset(shot.mobile)}
                    width={shot.mobileWidth}
                    height={shot.mobileHeight}
                    alt={`${project.title[lang]} — ${t.projects.mobileShot}`}
                    loading="lazy"
                    decoding="async"
                    className="block h-auto w-full rounded-[1.1rem]"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </dialog>
  );
}
