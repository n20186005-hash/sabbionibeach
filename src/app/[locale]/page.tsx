import { getTranslations, setRequestLocale } from 'next-intl/server';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Intro from '@/components/Intro';
import Gallery from '@/components/Gallery';
import Reviews from '@/components/Reviews';
import Tips from '@/components/Tips';
import MapEmbed from '@/components/MapEmbed';
import Sources from '@/components/Sources';
import Footer from '@/components/Footer';
import { getLocaleUrl, getTopicPath, GOOGLE_MAPS_URL, PLACE_NAME, REVIEW_COUNT, REVIEW_RATING } from '@/lib/site';

type Props = { params: Promise<{ locale: string }> };

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tMeta = await getTranslations({ locale, namespace: 'meta' });
  const tRelated = await getTranslations({ locale, namespace: 'relatedGuides' });

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    name: PLACE_NAME,
    description: tMeta('description'),
    url: getLocaleUrl(locale),
    touristType: ['Families', 'Beach visitors', 'Lake Garda travelers'],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Via Cristoph Hartung Von Hartungen, 4',
      postalCode: '38066',
      addressLocality: 'Riva del Garda',
      addressRegion: 'Trentino',
      addressCountry: 'IT',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 45.8812511,
      longitude: 10.8464442,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: REVIEW_RATING,
      reviewCount: REVIEW_COUNT,
      bestRating: 5,
    },
    sameAs: [GOOGLE_MAPS_URL],
  };

  return (
    <>
      <Header />
      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <Hero />
        <Intro />
        <Gallery />
        <Reviews />
        <Tips />
        <MapEmbed />
        <section className="section-padding" style={{ background: 'var(--bg-primary)' }}>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <h2
                className="font-display text-3xl md:text-4xl mb-3"
                style={{ color: 'var(--text-primary)' }}
              >
                {tRelated('title')}
              </h2>
              <p style={{ color: 'var(--text-muted)' }}>{tRelated('subtitle')}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <a
                href={getTopicPath(locale, 'parking')}
                className="block p-6 rounded-2xl transition-transform hover:-translate-y-1"
                style={{ background: 'var(--card-bg)', border: '1px solid var(--border)' }}
              >
                <h3 className="font-semibold text-lg mb-2" style={{ color: 'var(--text-primary)' }}>
                  {tRelated('parkingTitle')}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {tRelated('parkingDescription')}
                </p>
              </a>

              <a
                href={getTopicPath(locale, 'beaches')}
                className="block p-6 rounded-2xl transition-transform hover:-translate-y-1"
                style={{ background: 'var(--card-bg)', border: '1px solid var(--border)' }}
              >
                <h3 className="font-semibold text-lg mb-2" style={{ color: 'var(--text-primary)' }}>
                  {tRelated('beachesTitle')}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {tRelated('beachesDescription')}
                </p>
              </a>

              <a
                href={getTopicPath(locale, 'photos')}
                className="block p-6 rounded-2xl transition-transform hover:-translate-y-1"
                style={{ background: 'var(--card-bg)', border: '1px solid var(--border)' }}
              >
                <h3 className="font-semibold text-lg mb-2" style={{ color: 'var(--text-primary)' }}>
                  {tRelated('photosTitle')}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {tRelated('photosDescription')}
                </p>
              </a>

              <a
                href={getTopicPath(locale, 'reviews')}
                className="block p-6 rounded-2xl transition-transform hover:-translate-y-1"
                style={{ background: 'var(--card-bg)', border: '1px solid var(--border)' }}
              >
                <h3 className="font-semibold text-lg mb-2" style={{ color: 'var(--text-primary)' }}>
                  {tRelated('reviewsTitle')}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {tRelated('reviewsDescription')}
                </p>
              </a>
            </div>
          </div>
        </section>
        <Sources />
      </main>
      <Footer />
    </>
  );
}
