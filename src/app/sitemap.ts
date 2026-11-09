import type { MetadataRoute } from 'next';
import { locales } from '@/i18n/config';
import { nearbyPlaces } from '@/lib/nearby-content';
import { getLocaleUrl, getTopicUrl, topicSlugs } from '@/lib/site';

const topics = Object.keys(topicSlugs) as Array<keyof typeof topicSlugs>;

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((locale) => [
    {
      url: getLocaleUrl(locale),
      lastModified: new Date('2026-10-04'),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    { url: getLocaleUrl(locale, '/sentiero-del-ponale'), lastModified: new Date('2026-11-09'), changeFrequency: 'monthly' as const, priority: 0.7 },
    ...nearbyPlaces.map(({slug}) => ({ url: getLocaleUrl(locale, `/places/${slug}`), lastModified: new Date('2026-11-09'), changeFrequency: 'monthly' as const, priority: 0.7 })),
    ...topics.map((topic) => ({
      url: getTopicUrl(locale, topic),
      lastModified: new Date('2026-10-04'),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ]);
}
