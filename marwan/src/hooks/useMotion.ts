import { useEffect } from 'react';

/**
 * Loads the animation layer (GSAP/Lenis, ~50 KB gzip) only when it's needed: on the first
 * scroll/touch/pointer interaction, or a moment after the page has fully loaded. The hero
 * intro is pure CSS, so nothing on screen waits for this.
 * Re-initialises when the language (and so the layout direction) changes.
 */
export function useMotion(key: unknown) {
  useEffect(() => {
    let cleanup: (() => void) | undefined;
    let cancelled = false;
    let started = false;
    const events = ['scroll', 'wheel', 'touchstart', 'pointermove', 'keydown'] as const;

    const start = () => {
      if (started) return;
      started = true;
      events.forEach((e) => window.removeEventListener(e, start));
      import('../motion').then(({ initMotion }) => {
        if (!cancelled) cleanup = initMotion();
      });
    };

    events.forEach((e) => window.addEventListener(e, start, { passive: true, once: true }));
    let timer = 0;
    const afterLoad = () => {
      timer = window.setTimeout(start, 2500);
    };
    if (document.readyState === 'complete') afterLoad();
    else window.addEventListener('load', afterLoad, { once: true });

    return () => {
      cancelled = true;
      events.forEach((e) => window.removeEventListener(e, start));
      window.removeEventListener('load', afterLoad);
      window.clearTimeout(timer);
      cleanup?.();
    };
  }, [key]);
}
