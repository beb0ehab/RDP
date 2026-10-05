import { useCallback, useRef, useState } from 'react';
import { projects } from '../data/projects';
import { usePreferences } from '../context/Preferences';
import type { Project } from '../types';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';
import { SectionHeading } from './SectionHeading';

export function Projects() {
  const { t } = usePreferences();
  const [active, setActive] = useState<Project | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

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
    <section
      id="projects"
      className="border-b border-line py-16 sm:py-20"
      aria-labelledby="projects-title"
    >
      <div className="container">
        <SectionHeading id="projects-title" title={t.projects.title} />

        <ul className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <li key={p.id}>
              <ProjectCard project={p} index={i} onOpen={open} />
            </li>
          ))}
        </ul>
      </div>

      <ProjectModal project={active} onClose={close} />
    </section>
  );
}
