import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { redirect } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { photoGallery, photosPageContent } from '../foto-spiaggia-sabbioni/page';
import { getLocalePath, getTopicAlternates, getTopicPath, getTopicUrl, SITE_URL } from '@/lib/site';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const content = photosPageContent.en;

  return {
    metadataBase: new URL(SITE_URL),
    title: content.title,
    description: content.description,
    alternates: {
      canonical: getTopicUrl(locale, 'photos'),
      languages: getTopicAlternates('photos'),
    },
  };
}

export default async function EnglishPhotosPage({ params }: Props) {
  const { locale } = await params;
  if (locale !== 'en') {
    redirect(getTopicPath(locale, 'photos'));
  }

  setRequestLocale(locale);
  const tNav = await getTranslations({ locale, namespace: 'nav' });
  const content = photosPageContent.en;
  const images = photoGallery.en;

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

          <section className="grid md:grid-cols-2 gap-6 mb-12">
            {images.map((image) => (
              <figure
                key={image.src}
                className="overflow-hidden rounded-2xl"
                style={{ background: 'var(--card-bg)', border: '1px solid var(--border)' }}
              >
                <img src={image.src} alt={image.alt} className="w-full h-72 object-cover" loading="lazy" />
                <figcaption className="p-4 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {image.caption}
                </figcaption>
              </figure>
            ))}
          </section>

          <section className="mb-12">
            <h2 className="font-display text-2xl mb-4" style={{ color: 'var(--text-primary)' }}>
              What these photos help you understand
            </h2>
            <ul className="space-y-3">
              {content.notes.map((note) => (
                <li key={note} className="flex items-start gap-3">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'var(--accent)' }} />
                  <span style={{ color: 'var(--text-primary)' }}>{note}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl mb-4" style={{ color: 'var(--text-primary)' }}>
              Continue exploring
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <a
                href={getTopicPath(locale, 'reviews')}
                className="block p-5 rounded-xl transition-transform hover:-translate-y-1"
                style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}
              >
                Read the visitor review summary
              </a>
              <a
                href={getTopicPath(locale, 'parking')}
                className="block p-5 rounded-xl transition-transform hover:-translate-y-1"
                style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}
              >
                See the parking guide
              </a>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
