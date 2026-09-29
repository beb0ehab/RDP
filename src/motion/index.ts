/**
 * Scroll & interaction animations (GSAP + ScrollTrigger, Lenis smooth scroll on desktop).
 *
 * Loaded lazily after the first paint so it never delays the page. Everything is driven by
 * data attributes in the markup:
 *   data-split            heading whose [data-split-word] children slide up word by word
 *   data-anim="card"      staggered card reveal (+ image zoom-out)
 *   data-anim="fade"      simple fade/slide up
 *   data-anim="step"      process steps (slide in from the reading direction)
 *   data-anim="pop"       scale/rotate in
 *   data-process          process list; its [data-process-line] draws while scrolling
 *   data-parallax="word|portrait|float"
 *   data-count="500"      counts up from 0
 *   data-tilt             3D tilt toward the pointer (desktop)
 *   data-magnetic, .btn-primary, .btn-secondary   magnetic hover (desktop)
 *   data-progress         page scroll progress bar
 * With prefers-reduced-motion nothing is animated.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

gsap.registerPlugin(ScrollTrigger);

const EASE = 'expo.out';

function magnetic(el: HTMLElement, strength = 0.3) {
  const x = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' });
  const y = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' });
  const move = (e: PointerEvent) => {
    const r = el.getBoundingClientRect();
    x((e.clientX - (r.left + r.width / 2)) * strength);
    y((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const leave = () => {
    x(0);
    y(0);
  };
  el.addEventListener('pointermove', move);
  el.addEventListener('pointerleave', leave);
  return () => {
    el.removeEventListener('pointermove', move);
    el.removeEventListener('pointerleave', leave);
  };
}

function tilt(el: HTMLElement, max = 6) {
  gsap.set(el, { transformPerspective: 900 });
  const rx = gsap.quickTo(el, 'rotationX', { duration: 0.6, ease: 'power3.out' });
  const ry = gsap.quickTo(el, 'rotationY', { duration: 0.6, ease: 'power3.out' });
  const move = (e: PointerEvent) => {
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    rx(-py * max);
    ry(px * max);
  };
  const leave = () => {
    rx(0);
    ry(0);
  };
  el.addEventListener('pointermove', move);
  el.addEventListener('pointerleave', leave);
  return () => {
    el.removeEventListener('pointermove', move);
    el.removeEventListener('pointerleave', leave);
  };
}

export function initMotion(): () => void {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {};

  const root = document.documentElement;
  const rtl = root.dir === 'rtl';
  const desktop = window.matchMedia('(pointer: fine) and (min-width: 1024px)').matches;
  root.classList.add('gsap-on');

  // Smooth scrolling (desktop only — touch devices keep native scrolling).
  let lenis: Lenis | null = null;
  const raf = (time: number) => lenis?.raf(time * 1000);
  if (desktop) {
    lenis = new Lenis({ lerp: 0.1, anchors: true }); // anchor offset comes from CSS scroll-padding-top
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
  }

  const cleanups: Array<() => void> = [];

  const ctx = gsap.context(() => {
    // Progress bar
    gsap.to('[data-progress]', {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: { start: 0, end: 'max', scrub: 0.3 },
    });

    // Hero parallax: the giant word drifts down, the portrait rises slightly.
    const hero = { trigger: '#top', start: 'top top', end: 'bottom top', scrub: true };
    gsap.to('[data-parallax="word"]', {
      yPercent: 45,
      opacity: 0.35,
      ease: 'none',
      scrollTrigger: hero,
    });
    gsap.to('[data-parallax="portrait"]', { yPercent: -10, ease: 'none', scrollTrigger: hero });

    // Count-up numbers
    gsap.utils.toArray<HTMLElement>('[data-count]').forEach((el) => {
      const target = Number(el.dataset.count);
      const obj = { v: 0 };
      el.textContent = '0';
      gsap.to(obj, {
        v: target,
        duration: 1.8,
        delay: 0.7,
        ease: 'power2.out',
        onUpdate: () => {
          el.textContent = String(Math.round(obj.v));
        },
      });
    });

    // Headings: words slide up from behind a mask.
    gsap.utils.toArray<HTMLElement>('[data-split]').forEach((heading) => {
      const words = heading.querySelectorAll('[data-split-word]');
      gsap.from(words, {
        yPercent: 115,
        rotate: rtl ? -4 : 4,
        duration: 1,
        ease: EASE,
        stagger: 0.07,
        scrollTrigger: { trigger: heading, start: 'top 88%', once: true },
      });
    });

    // Cards: staggered rise; screenshots inside zoom out.
    gsap.set('[data-anim="card"]', { y: 70, opacity: 0 });
    gsap.set('[data-anim="card"] img', { scale: 1.18 });
    ScrollTrigger.batch('[data-anim="card"]', {
      start: 'top 90%',
      once: true,
      onEnter: (els) => {
        gsap.to(els, { y: 0, opacity: 1, duration: 1.1, ease: EASE, stagger: 0.12 });
        gsap.to(
          els.flatMap((el) => Array.from(el.querySelectorAll('img'))),
          { scale: 1, duration: 1.6, ease: EASE, stagger: 0.12 },
        );
      },
    });

    // Simple fades
    gsap.set('[data-anim="fade"]', { y: 30, opacity: 0 });
    ScrollTrigger.batch('[data-anim="fade"]', {
      start: 'top 92%',
      once: true,
      onEnter: (els) => gsap.to(els, { y: 0, opacity: 1, duration: 0.9, ease: EASE, stagger: 0.1 }),
    });

    // Process steps + line drawing
    gsap.set('[data-anim="step"]', { x: rtl ? 40 : -40, opacity: 0 });
    ScrollTrigger.batch('[data-anim="step"]', {
      start: 'top 90%',
      once: true,
      onEnter: (els) =>
        gsap.to(els, { x: 0, opacity: 1, duration: 0.9, ease: EASE, stagger: 0.12 }),
    });
    gsap.to('[data-process-line]', {
      scaleY: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: '[data-process]',
        start: 'top 80%',
        end: 'bottom 60%',
        scrub: true,
      },
    });

    // Statement card
    gsap.from('[data-anim="pop"]', {
      scale: 0.9,
      rotate: rtl ? 3 : -3,
      opacity: 0,
      duration: 1.2,
      ease: EASE,
      scrollTrigger: { trigger: '[data-anim="pop"]', start: 'top 85%', once: true },
    });

    // Contact devices drift while scrolling
    gsap.fromTo(
      '[data-parallax="float"]',
      { yPercent: 12 },
      {
        yPercent: -12,
        ease: 'none',
        scrollTrigger: { trigger: '#contact', start: 'top bottom', end: 'bottom top', scrub: true },
      },
    );

    if (desktop) {
      gsap.utils.toArray<HTMLElement>('[data-tilt]').forEach((el) => cleanups.push(tilt(el)));
      gsap.utils
        .toArray<HTMLElement>('.btn-primary, .btn-secondary, [data-magnetic]')
        .forEach((el) => cleanups.push(magnetic(el)));
    }
  });

  // Images and fonts change the layout after load; recalc trigger positions.
  const refresh = () => ScrollTrigger.refresh();
  window.addEventListener('load', refresh);
  document.fonts?.ready.then(refresh);

  return () => {
    window.removeEventListener('load', refresh);
    cleanups.forEach((fn) => fn());
    ctx.revert();
    if (lenis) {
      gsap.ticker.remove(raf);
      lenis.destroy();
    }
    root.classList.remove('gsap-on');
  };
}
