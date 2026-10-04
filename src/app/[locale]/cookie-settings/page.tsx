import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import CookieSettingsClient from '@/components/CookieSettingsClient';
import { getLocaleAlternates, getLocaleUrl, SITE_URL } from '@/lib/site';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'cookieSettings' });

  return {
    metadataBase: new URL(SITE_URL),
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: getLocaleUrl(locale, '/cookie-settings'),
      languages: getLocaleAlternates('/cookie-settings'),
    },
    robots: {
      index: false,
      follow: true,
    },
  };
}

export default async function CookieSettingsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <CookieSettingsClient />;
}
