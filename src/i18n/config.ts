export type Locale = (typeof locales)[number];

export const locales = [
  'en',
  'tr',
  'es',
  'fr',
  'de',
  'it',
  'pt',
  'nl',
  'ru',
  'zh',
  'ja',
  'ko',
  'ar',
  'hi',
] as const;
export const defaultLocale: Locale = 'en';
