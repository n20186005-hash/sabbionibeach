import type { MetadataRoute } from 'next';
import { locales } from '@/i18n/config';
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
    ...topics.map((topic) => ({
      url: getTopicUrl(locale, topic),
      lastModified: new Date('2026-10-04'),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ]);
}
