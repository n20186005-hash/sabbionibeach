import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { redirect } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { parkingPageContent } from '../parcheggio-spiaggia-sabbioni/page';
import { getLocalePath, getTopicAlternates, getTopicPath, getTopicUrl, GOOGLE_MAPS_URL, SITE_URL } from '@/lib/site';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const content = parkingPageContent.en;

  return {
    metadataBase: new URL(SITE_URL),
    title: content.title,
    description: content.description,
    alternates: {
      canonical: getTopicUrl(locale, 'parking'),
      languages: getTopicAlternates('parking'),
    },
  };
}

export default async function EnglishParkingPage({ params }: Props) {
  const { locale } = await params;
  if (locale !== 'en') {
    redirect(getTopicPath(locale, 'parking'));
  }

  setRequestLocale(locale);
  const tNav = await getTranslations({ locale, namespace: 'nav' });
  const content = parkingPageContent.en;

  return (
    <>
      <Header />
      <main className="pt-20 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
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

          <h1 className="font-display text-3xl md:text-5xl mb-4" style={{ color: 'var(--text-primary)' }}>
            {content.title}
          </h1>
          <p className="text-lg leading-relaxed mb-8" style={{ color: 'var(--text-secondary)' }}>
            {content.intro}
          </p>

          <div className="space-y-8">
            {content.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="font-display text-2xl mb-3" style={{ color: 'var(--text-primary)' }}>
                  {section.heading}
                </h2>
                <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {section.content}
                </p>
              </section>
            ))}
          </div>

          <div
            className="mt-10 p-6 rounded-2xl"
            style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}
          >
            <a
              href={GOOGLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold"
              style={{ color: 'var(--accent)' }}
            >
              {content.ctaTitle}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </a>
          </div>

          <section className="mt-12">
            <h2 className="font-display text-2xl mb-4" style={{ color: 'var(--text-primary)' }}>
              {content.nearbyTitle}
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <a
                href={getTopicPath(locale, 'beaches')}
                className="block p-5 rounded-xl transition-transform hover:-translate-y-1"
                style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}
              >
                {content.nearbyLinks[0].label}
              </a>
              <a
                href={getLocalePath(locale)}
                className="block p-5 rounded-xl transition-transform hover:-translate-y-1"
                style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}
              >
                {content.nearbyLinks[1].label}
              </a>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
