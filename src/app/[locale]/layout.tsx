import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { locales, defaultLocale } from '@/i18n/config';
import type { Metadata } from 'next';
import '../globals.css';

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });

  const baseUrl = 'https://www.sabbionibeach.com';
  const alternateLanguages: Record<string, string> = {};
  
  locales.forEach((loc) => {
    alternateLanguages[loc] = loc === defaultLocale ? baseUrl : `${baseUrl}/${loc}`;
  });
  alternateLanguages['x-default'] = baseUrl;

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: locale === defaultLocale ? baseUrl : `${baseUrl}/${locale}`,
      languages: alternateLanguages,
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9279583389810634" crossOrigin="anonymous"></script>
        <meta name="google-adsense-account" content="ca-pub-9279583389810634" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var theme = localStorage.getItem('theme') || 'light';
                document.documentElement.setAttribute('data-theme', theme);
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
