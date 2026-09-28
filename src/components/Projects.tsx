import { useCallback, useRef, useState } from 'react';
import { projects } from '../data/projects';
import { usePreferences } from '../context/Preferences';
import { useReveal } from '../hooks/useReveal';
import type { Project } from '../types';
import { ArrowIcon } from './Icons';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';
import { SectionHeading } from './SectionHeading';

const featured = projects.filter((p) => p.featured);
const more = projects.filter((p) => !p.featured);

export function Projects() {
  const { t } = usePreferences();
  const [active, setActive] = useState<Project | null>(null);
  const [showMore, setShowMore] = useState(false);
  const triggerRef = useRef<HTMLElement | null>(null);

  useReveal([showMore]);

  const open = useCallback((project: Project, trigger: HTMLElement) => {
    triggerRef.current = trigger;
    setActive(project);
  }, []);

  const close = useCallback(() => {
    setActive(null);
    // Return focus to the card that opened the dialog.
    requestAnimationFrame(() => triggerRef.current?.focus());
  }, []);

  const toggle =
    more.length > 0 ? (
      <button
        type="button"
        className="inline-flex min-h-[44px] items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-muted transition-colors hover:text-accent"
        aria-expanded={showMore}
        aria-controls="more-projects"
        onClick={() => setShowMore((v) => !v)}
      >
        {showMore ? t.projects.moreHide : t.projects.moreShow}
        <ArrowIcon
          size={16}
          className={`text-accent transition-transform rtl:-scale-x-100 ${showMore ? '-rotate-90' : 'rotate-90'}`}
        />
      </button>
    ) : null;

  return (
    <section
      id="projects"
      className="border-b border-line py-16 sm:py-20"
      aria-labelledby="projects-title"
    >
      <div className="container">
        <SectionHeading id="projects-title" title={t.projects.title} action={toggle} />

        <ul className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p, i) => (
            <li key={p.id}>
              <ProjectCard project={p} index={i} onOpen={open} />
            </li>
          ))}
        </ul>

        {more.length > 0 && (
          <ul
            id="more-projects"
            hidden={!showMore}
            className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 [&[hidden]]:hidden"
          >
            {more.map((p, i) => (
              <li key={p.id}>
                <ProjectCard project={p} index={featured.length + i} onOpen={open} />
              </li>
            ))}
          </ul>
        )}
      </div>

      <ProjectModal project={active} onClose={close} />
    </section>
  );
}
