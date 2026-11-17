import { en } from './en/translations';
import { bn } from './bn/translations';

export type Language = 'en' | 'bn';

export const translations = { en, bn };

export type TranslationSchema = typeof en;

/**
 * Resolves a nested key string like 'nav.home' or 'home.heroTitle' against a translation dictionary.
 */
export function getTranslation(dict: Record<string, unknown>, path: string): string {
  const parts = path.split('.');
  let current: unknown = dict;

  for (const part of parts) {
    if (current && typeof current === 'object' && part in current) {
      current = (current as Record<string, unknown>)[part];
    } else {
      return path; // Fallback to path key if missing
    }
  }

  if (typeof current === 'string') {
    return current;
  }

  return path;
}

