export type Lang = 'en' | 'ar';
export type Theme = 'light' | 'dark';

/** A string in both languages. */
export type Localized = Record<Lang, string>;

export type PlaceholderIcon =
  'map' | 'pipeline' | 'building' | 'graph' | 'mic' | 'send' | 'search' | 'target';

export interface Project {
  /** Unique id — also used for screenshot file names (public/projects/<id>-desktop.webp). */
  id: string;
  title: Localized;
  /** Short subtitle shown under the title, e.g. "Tour Booking Website". */
  subtitle: Localized;
  /** Optional badge, e.g. "Client project". */
  badge?: Localized;
  /** 1–2 line summary shown on the card. */
  summary: Localized;
  /** Full bullet points shown in the details modal. */
  details: { en: string[]; ar: string[] };
  tech: string[];
  /** Live URL — the "Live site" button only shows when this is set. */
  url?: string;
  /** Branded placeholder used when there is no screenshot. */
  placeholder: { icon: PlaceholderIcon; from: string; to: string };
  /** true = shown in the main grid; false = under "More projects". */
  featured: boolean;
}

export interface ScreenshotEntry {
  desktop: string;
  desktopSmall: string;
  width: number;
  height: number;
  mobile?: string;
  mobileWidth?: number;
  mobileHeight?: number;
}
