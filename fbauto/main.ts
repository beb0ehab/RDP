import '@fontsource/ibm-plex-sans-arabic/arabic-400.css';
import '@fontsource/ibm-plex-sans-arabic/arabic-600.css';
import '@fontsource/ibm-plex-sans-arabic/arabic-700.css';
// Latin glyphs inside Arabic text (Excel, Brave, API…) use the same family.
import '@fontsource/ibm-plex-sans-arabic/latin-400.css';
import '@fontsource/ibm-plex-sans-arabic/latin-700.css';
import '@fontsource/lalezar/arabic-400.css';
import '@fontsource/pixelify-sans/latin-400.css';
import '@fontsource/pixelify-sans/latin-700.css';
// VT323: clearer pixel digits for prices.
import '@fontsource/vt323/latin-400.css';
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
