import type { Config } from 'tailwindcss';
import base from '../tailwind.config';

/** Same design tokens as the main site, scanning only Marwan's files. */
export default {
  ...base,
  content: ['./marwan/index.html', './marwan/src/**/*.{ts,tsx}'],
} satisfies Config;
