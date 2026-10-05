import { asset } from '../config';
import { getScreenshot } from '../lib/screenshots';
import type { Lang, Project } from '../types';
import { PlaceholderGlyph } from './Icons';

/** Branded placeholder for projects without a real screenshot. */
export function ProjectPlaceholder({
  project,
  lang,
  large = false,
}: {
  project: Project;
  lang: Lang;
  large?: boolean;
}) {
  const { from, to, icon } = project.placeholder;
  return (
    <div
      role="img"
      aria-label={project.title[lang]}
      className="relative flex aspect-[16/10] w-full flex-col items-center justify-center overflow-hidden text-white"
      style={{ backgroundImage: `linear-gradient(135deg, ${from}, ${to})` }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,.55) 1px, transparent 1px)',
          backgroundSize: '18px 18px',
          maskImage: 'linear-gradient(to bottom, #000, transparent 85%)',
          WebkitMaskImage: 'linear-gradient(to bottom, #000, transparent 85%)',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-16 -end-10 h-48 w-48 rounded-full bg-white/10 blur-2xl"
      />
      <span
        aria-hidden="true"
        className={`relative grid place-items-center rounded-2xl border border-white/25 bg-white/15 shadow-lg backdrop-blur-sm ${
          large ? 'h-20 w-20' : 'h-14 w-14'
        }`}
      >
        <PlaceholderGlyph name={icon} size={large ? 40 : 28} strokeWidth={1.6} />
      </span>
      <span
        aria-hidden="true"
        className={`relative mt-4 px-6 text-center font-bold tracking-tight drop-shadow-sm ${
          large ? 'text-2xl' : 'text-lg'
        }`}
      >
        {project.title[lang]}
      </span>
    </div>
  );
}

/** Desktop screenshot (+ optional phone overlay), or the placeholder. */
export function ProjectMedia({
  project,
  lang,
  alt,
  sizes,
  large = false,
  eager = false,
}: {
  project: Project;
  lang: Lang;
  alt: string;
  sizes: string;
  large?: boolean;
  eager?: boolean;
}) {
  const shot = getScreenshot(project.id);
  if (!shot) return <ProjectPlaceholder project={project} lang={lang} large={large} />;

  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface-2">
      <img
        src={asset(shot.desktopSmall)}
        srcSet={`${asset(shot.desktopSmall)} 720w, ${asset(shot.desktop)} ${shot.width}w`}
        sizes={sizes}
        width={shot.width}
        height={shot.height}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
      />
    </div>
  );
}
