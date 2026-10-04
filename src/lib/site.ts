import { locales } from '@/i18n/config';

export const SITE_URL = 'https://www.sabbionibeach.com';
export const GOOGLE_MAPS_URL = 'https://maps.app.goo.gl/28r3jQBy9Cpd4M1C8';
export const PLACE_NAME = 'Spiaggia Sabbioni';
export const REVIEW_RATING = 4.6;
export const REVIEW_COUNT = 6465;

function normalizePath(path = '') {
  if (!path || path === '/') {
    return '';
  }

  return path.startsWith('/') ? path : `/${path}`;
}

export function getLocalePath(locale: string, path = '') {
  return `/${locale}${normalizePath(path)}`;
}

export function getLocaleUrl(locale: string, path = '') {
  return `${SITE_URL}${getLocalePath(locale, path)}`;
}

export function getLocaleAlternates(path = '') {
  const languages: Record<string, string> = {};

  locales.forEach((locale) => {
    languages[locale] = getLocaleUrl(locale, path);
  });

  languages['x-default'] = SITE_URL;

  return languages;
}
