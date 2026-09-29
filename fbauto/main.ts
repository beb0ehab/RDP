import '@fontsource/ibm-plex-sans-arabic/arabic-400.css';
import '@fontsource/ibm-plex-sans-arabic/arabic-600.css';
import '@fontsource/ibm-plex-sans-arabic/arabic-700.css';
// Latin glyphs inside Arabic text (Excel, Brave, API…) use the same family.
import '@fontsource/ibm-plex-sans-arabic/latin-400.css';
import '@fontsource/ibm-plex-sans-arabic/latin-700.css';
import '@fontsource/lalezar/arabic-400.css';
import '@fontsource/pixelify-sans/latin-400.css';
import '@fontsource/pixelify-sans/latin-700.css';
import './style.css';

/* ==================================================================
 * ⬇️⬇️  ضع رابط واتساب هنا  ⬇️⬇️
 * مثال: 'https://wa.me/201063529309'  (رقمك بالكود الدولي من غير + ولا مسافات)
 * كل أزرار الصفحة بتاخد الرابط من هنا، ومعاه رسالة جاهزة حسب الزرار.
 * ================================================================== */
const WHATSAPP_URL = '[ضع رابط واتساب هنا]';

const isReady = /^https:\/\/(wa\.me|api\.whatsapp\.com)\//.test(WHATSAPP_URL);

document.querySelectorAll<HTMLAnchorElement>('a[data-wa]').forEach((link) => {
  if (!isReady) return; // until the link is set, buttons scroll to the contact section
  const text = link.dataset.wa?.trim();
  const url = new URL(WHATSAPP_URL);
  if (text) url.searchParams.set('text', text);
  link.href = url.toString();
  link.target = '_blank';
  link.rel = 'noopener';
});

const year = document.getElementById('year');
if (year) year.textContent = String(new Date().getFullYear());
