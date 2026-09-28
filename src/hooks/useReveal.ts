import { useEffect } from 'react';

/**
 * Fades/slides in every `.reveal` element once it scrolls into view.
 * Content stays visible if IntersectionObserver is unavailable, and
 * `prefers-reduced-motion` disables the motion in CSS.
 */
export function useReveal(deps: unknown[] = []) {
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    document.documentElement.classList.add('js-reveal');

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    );

    document.querySelectorAll('.reveal:not(.is-visible)').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
