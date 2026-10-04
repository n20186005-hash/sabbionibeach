import { locales } from '@/i18n/config';

export const SITE_URL = 'https://www.sabbionibeach.com';
export const GOOGLE_MAPS_URL = 'https://maps.app.goo.gl/28r3jQBy9Cpd4M1C8';
export const PLACE_NAME = 'Spiaggia Sabbioni';
export const REVIEW_RATING = 4.6;
export const REVIEW_COUNT = 6465;
export const topicSlugs = {
  parking: {
    it: '/parcheggio-spiaggia-sabbioni',
    en: '/spiaggia-sabbioni-parking',
    de: '/parkplatz-spiaggia-sabbioni',
    'zh-Hant': '/parcheggio-spiaggia-sabbioni',
  },
  beaches: {
    it: '/spiagge-riva-del-garda',
    en: '/riva-del-garda-beaches',
    de: '/straende-riva-del-garda',
    'zh-Hant': '/spiagge-riva-del-garda',
  },
  photos: {
    it: '/foto-spiaggia-sabbioni',
    en: '/spiaggia-sabbioni-photos',
    de: '/fotos-spiaggia-sabbioni',
    'zh-Hant': '/foto-spiaggia-sabbioni',
  },
  reviews: {
    it: '/recensioni-spiaggia-sabbioni',
    en: '/spiaggia-sabbioni-reviews',
    de: '/bewertungen-spiaggia-sabbioni',
    'zh-Hant': '/recensioni-spiaggia-sabbioni',
  },
} as const;

export type TopicKey = keyof typeof topicSlugs;

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

export function getTopicPath(locale: string, topic: TopicKey) {
  const localizedSlug = topicSlugs[topic][locale as keyof (typeof topicSlugs)[TopicKey]];
  return getLocalePath(locale, localizedSlug ?? topicSlugs[topic].en);
}

export function getTopicUrl(locale: string, topic: TopicKey) {
  return `${SITE_URL}${getTopicPath(locale, topic)}`;
}

export function getTopicAlternates(topic: TopicKey) {
  const languages: Record<string, string> = {};

  locales.forEach((locale) => {
    languages[locale] = getTopicUrl(locale, topic);
  });

  languages['x-default'] = SITE_URL;

  return languages;
}
