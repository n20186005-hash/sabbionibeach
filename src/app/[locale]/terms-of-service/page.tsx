import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getLocaleAlternates, getLocalePath, getLocaleUrl, SITE_URL } from '@/lib/site';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'terms' });

  return {
    metadataBase: new URL(SITE_URL),
    title: t('title'),
    description: `${t('title')} - ${SITE_URL.replace('https://www.', '')}`,
    alternates: {
      canonical: getLocaleUrl(locale, '/terms-of-service'),
      languages: getLocaleAlternates('/terms-of-service'),
    },
    robots: {
      index: false,
      follow: true,
    },
  };
}

export default async function TermsOfService({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('terms');
  const tNav = await getTranslations('nav');
  const sections: { heading: string; content: string }[] = t.raw('sections');

  return (
    <>
      <Header />
      <main className="pt-20 pb-16 px-4">
        <div className="max-w-3xl mx-auto">
          <a
            href={getLocalePath(locale)}
            className="inline-flex items-center gap-2 mb-8 text-sm font-medium transition-colors"
            style={{ color: 'var(--accent)' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            {tNav('backHome')}
          </a>

          <h1 className="font-display text-3xl md:text-4xl mb-2" style={{ color: 'var(--text-primary)' }}>
            {t('title')}
          </h1>
          <p className="text-sm mb-10" style={{ color: 'var(--text-muted)' }}>
            {t('lastUpdated')}
          </p>

          {sections.map((section, i) => (
            <div key={i} className="mb-8">
              <h2 className="font-display text-xl mb-3" style={{ color: 'var(--text-primary)' }}>
                {section.heading}
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {section.content}
              </p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
