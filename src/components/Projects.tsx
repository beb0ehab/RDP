import { useCallback, useRef, useState } from 'react';
import { projects } from '../data/projects';
import { usePreferences } from '../context/Preferences';
import { useReveal } from '../hooks/useReveal';
import type { Project } from '../types';
import { ChevronDownIcon } from './Icons';
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

  return (
    <section id="projects" className="section" aria-labelledby="projects-title">
      <div className="container">
        <SectionHeading
          id="projects-title"
          eyebrow={t.projects.eyebrow}
          title={t.projects.title}
          lead={t.projects.lead}
        />

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p, i) => (
            <li key={p.id}>
              <ProjectCard project={p} index={i} onOpen={open} />
            </li>
          ))}
        </ul>

        {more.length > 0 && (
          <div className="mt-10">
            <div className="flex justify-center">
              <button
                type="button"
                className="btn-secondary"
                aria-expanded={showMore}
                aria-controls="more-projects"
                onClick={() => setShowMore((v) => !v)}
              >
                {showMore ? t.projects.moreHide : `${t.projects.moreShow} (${more.length})`}
                <ChevronDownIcon
                  size={18}
                  className={`transition-transform ${showMore ? 'rotate-180' : ''}`}
                />
              </button>
            </div>
            <ul
              id="more-projects"
              hidden={!showMore}
              className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 [&[hidden]]:hidden"
            >
              {more.map((p, i) => (
                <li key={p.id}>
                  <ProjectCard project={p} index={featured.length + i} onOpen={open} />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <ProjectModal project={active} onClose={close} />
    </section>
  );
}
