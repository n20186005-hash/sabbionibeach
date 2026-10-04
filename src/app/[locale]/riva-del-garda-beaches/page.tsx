import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { redirect } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { beachesPageContent } from '../spiagge-riva-del-garda/page';
import { getLocalePath, getTopicAlternates, getTopicPath, getTopicUrl, SITE_URL } from '@/lib/site';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const content = beachesPageContent.en;

  return {
    metadataBase: new URL(SITE_URL),
    title: content.title,
    description: content.description,
    alternates: {
      canonical: getTopicUrl(locale, 'beaches'),
      languages: getTopicAlternates('beaches'),
    },
  };
}

export default async function EnglishBeachesPage({ params }: Props) {
  const { locale } = await params;
  if (locale !== 'en') {
    redirect(getTopicPath(locale, 'beaches'));
  }

  setRequestLocale(locale);
  const tNav = await getTranslations({ locale, namespace: 'nav' });
  const content = beachesPageContent.en;

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

          <section className="grid md:grid-cols-3 gap-4 mb-12">
            {content.beaches.map((beach) => (
              <article
                key={beach.name}
                className="p-5 rounded-2xl"
                style={{ background: 'var(--card-bg)', border: '1px solid var(--border)' }}
              >
                <h2 className="font-semibold text-lg mb-3" style={{ color: 'var(--text-primary)' }}>
                  {beach.name}
                </h2>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {beach.summary}
                </p>
              </article>
            ))}
          </section>

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

          <section className="mt-12">
            <h2 className="font-display text-2xl mb-4" style={{ color: 'var(--text-primary)' }}>
              {content.nextTitle}
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <a
                href={getTopicPath(locale, 'parking')}
                className="block p-5 rounded-xl transition-transform hover:-translate-y-1"
                style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}
              >
                {content.nextLinks[0].label}
              </a>
              <a
                href={getLocalePath(locale)}
                className="block p-5 rounded-xl transition-transform hover:-translate-y-1"
                style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}
              >
                {content.nextLinks[1].label}
              </a>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
