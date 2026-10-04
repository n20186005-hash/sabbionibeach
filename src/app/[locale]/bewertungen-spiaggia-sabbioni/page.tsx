import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { redirect } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { reviewsPageContent } from '../recensioni-spiaggia-sabbioni/page';
import { getLocalePath, getTopicAlternates, getTopicPath, getTopicUrl, GOOGLE_MAPS_URL, SITE_URL } from '@/lib/site';

type Props = { params: Promise<{ locale: string }> };

type ReviewItem = {
  name: string;
  date: string;
  stars: number;
  text: string;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const content = reviewsPageContent.de;

  return {
    metadataBase: new URL(SITE_URL),
    title: content.title,
    description: content.description,
    alternates: {
      canonical: getTopicUrl(locale, 'reviews'),
      languages: getTopicAlternates('reviews'),
    },
  };
}

export default async function GermanReviewsPage({ params }: Props) {
  const { locale } = await params;
  if (locale !== 'de') {
    redirect(getTopicPath(locale, 'reviews'));
  }

  setRequestLocale(locale);
  const tNav = await getTranslations({ locale, namespace: 'nav' });
  const tReviews = await getTranslations({ locale, namespace: 'reviews' });
  const content = reviewsPageContent.de;
  const items = tReviews.raw('items') as ReviewItem[];

  return (
    <>
      <Header />
      <main className="pt-20 pb-16 px-4">
        <div className="max-w-5xl mx-auto">
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
          <p className="text-lg leading-relaxed mb-10" style={{ color: 'var(--text-secondary)' }}>
            {content.intro}
          </p>

          <section className="mb-12">
            <h2 className="font-display text-2xl mb-4" style={{ color: 'var(--text-primary)' }}>
              Auf einen Blick
            </h2>
            <ul className="space-y-3">
              {content.highlights.map((highlight) => (
                <li key={highlight} className="flex items-start gap-3">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'var(--accent)' }} />
                  <span style={{ color: 'var(--text-primary)' }}>{highlight}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="grid md:grid-cols-2 gap-4 mb-12">
            {items.map((review) => (
              <article
                key={`${review.name}-${review.date}`}
                className="p-5 rounded-xl"
                style={{ background: 'var(--card-bg)', border: '1px solid var(--border)' }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
                    {review.name}
                  </span>
                  <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                    {review.date}
                  </span>
                </div>
                <div className="text-sm mb-2" style={{ color: 'var(--accent)' }}>
                  {'★'.repeat(review.stars)}
                  {'☆'.repeat(5 - review.stars)}
                </div>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {review.text}
                </p>
              </article>
            ))}
          </section>

          <section className="grid md:grid-cols-2 gap-4">
            <a
              href={GOOGLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-5 rounded-xl transition-transform hover:-translate-y-1"
              style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}
            >
              {content.cta}
            </a>
            <a
              href={getTopicPath(locale, 'photos')}
              className="block p-5 rounded-xl transition-transform hover:-translate-y-1"
              style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}
            >
              Strandfotos ansehen
            </a>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
