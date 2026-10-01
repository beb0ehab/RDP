import '@fontsource/rubik/arabic-400.css';
import '@fontsource/rubik/arabic-500.css';
import '@fontsource/rubik/arabic-700.css';
import '@fontsource/rubik/latin-400.css';
import '@fontsource/rubik/latin-500.css';
import '@fontsource/rubik/latin-700.css';
import './style.css';

/* ==================================================================
 * ⬇️⬇️  ضع رابط واتساب هنا  ⬇️⬇️
 * مثال: 'https://wa.me/201063529309'  (رقمك بالكود الدولي من غير + ولا مسافات)
 * كل أزرار الصفحة بتاخد الرابط من هنا، ومعاه رسالة جاهزة حسب الزرار.
 * ================================================================== */
const WHATSAPP_URL = 'https://wa.me/201063529309';

const isReady = /^https:\/\/(wa\.me|api\.whatsapp\.com)\//.test(WHATSAPP_URL);

document.querySelectorAll<HTMLAnchorElement>('a[data-wa]').forEach((link) => {
  if (!isReady) return; // until the link is set, buttons scroll to the contact section
  const text = link.dataset.wa?.trim();
  // encodeURIComponent (spaces → %20): WhatsApp may show "+" literally.
  link.href = text ? `${WHATSAPP_URL}?text=${encodeURIComponent(text)}` : WHATSAPP_URL;
  link.target = '_blank';
  link.rel = 'noopener';
});

const year = document.getElementById('year');
if (year) year.textContent = String(new Date().getFullYear());

// Reveal sections while scrolling (skipped with reduced motion or without IntersectionObserver).
const items = document.querySelectorAll<HTMLElement>('[data-reveal]');
if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.documentElement.classList.add('js');
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target as HTMLElement;
        // Siblings revealed together come in one after another.
        const index = Array.from(el.parentElement?.children ?? []).indexOf(el);
        el.style.transitionDelay = `${Math.min(index, 5) * 80}ms`;
        el.classList.add('in');
        setTimeout(() => (el.style.transitionDelay = ''), 1200); // keep hover effects instant
        io.unobserve(el);
      });
    },
    { rootMargin: '0px 0px -8% 0px' },
  );
  items.forEach((el) => io.observe(el));
}
