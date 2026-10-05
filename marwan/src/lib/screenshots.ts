import screenshotsJson from '../data/screenshots.json';
import type { ScreenshotEntry } from '../types';

const screenshots = screenshotsJson as Record<string, ScreenshotEntry>;

/** Screenshot files captured by `npm run screenshots` (see src/data/screenshots.json). */
export const getScreenshot = (id: string): ScreenshotEntry | undefined => screenshots[id];
