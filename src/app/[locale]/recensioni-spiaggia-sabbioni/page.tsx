import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { redirect } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getLocalePath, getTopicAlternates, getTopicPath, getTopicUrl, GOOGLE_MAPS_URL, SITE_URL } from '@/lib/site';

type Props = { params: Promise<{ locale: string }> };

type ReviewItem = {
  name: string;
  date: string;
  stars: number;
  text: string;
};

export const reviewsPageContent = {
  it: {
    title: 'Recensioni Spiaggia Sabbioni: Cosa Pensano i Visitatori',
    description:
      'Sintesi delle recensioni sulla Spiaggia Sabbioni a Riva del Garda: cosa piace di più, cosa sapere su affollamento, famiglie, spiaggia di ciottoli e panorama.',
    intro:
      'Le recensioni della Spiaggia Sabbioni parlano soprattutto di panorama, facilità di accesso, atmosfera familiare e bellezza del Lago di Garda. Allo stesso tempo, alcuni visitatori segnalano affollamento in alta stagione e la necessità di scarpe da acqua per i ciottoli.',
    highlights: [
      'Il panorama sul lago e sulle montagne è il punto più citato nelle opinioni positive.',
      'Molti visitatori la considerano adatta a famiglie e a una giornata rilassata vicino al centro.',
      'Tra le osservazioni più frequenti compaiono affollamento estivo e spiaggia di sassi.',
    ],
    cta: 'Vedi tutte le recensioni su Google Maps',
  },
  en: {
    title: 'Spiaggia Sabbioni Reviews: What Visitors Say',
    description:
      'A practical summary of Spiaggia Sabbioni reviews covering scenery, crowd levels, family suitability, pebbles, lake views and overall visitor experience in Riva del Garda.',
    intro:
      'Reviews of Spiaggia Sabbioni focus heavily on the scenery, easy access, family-friendly atmosphere and the beauty of Lake Garda. At the same time, some visitors mention summer crowds and the usefulness of water shoes on the pebbles.',
    highlights: [
      'Lake and mountain views are the most consistent positive theme in visitor feedback.',
      'Many visitors describe the beach as convenient for families and relaxed lakefront time near town.',
      'The most common cautions are summer crowding and the pebble beach surface.',
    ],
    cta: 'See all reviews on Google Maps',
  },
  de: {
    title: 'Bewertungen zur Spiaggia Sabbioni: Das sagen Besucher',
    description:
      'Praktische Zusammenfassung der Bewertungen zur Spiaggia Sabbioni mit Hinweisen zu Aussicht, Andrang, Familienfreundlichkeit, Kiesstrand und Gesamterlebnis in Riva del Garda.',
    intro:
      'In den Bewertungen zur Spiaggia Sabbioni werden vor allem die Aussicht, die gute Erreichbarkeit, die familienfreundliche Atmosphäre und die Lage am Gardasee hervorgehoben. Gleichzeitig weisen manche Besucher auf sommerlichen Andrang und die Sinnhaftigkeit von Wasserschuhen am Kiesstrand hin.',
    highlights: [
      'See- und Bergblick sind das am häufigsten genannte positive Thema.',
      'Viele Besucher beschreiben den Strand als praktisch für Familien und entspannte Zeit am Wasser in Stadtnähe.',
      'Am häufigsten genannt werden als Einschränkungen Sommerandrang und der Kiesstrand.',
    ],
    cta: 'Alle Bewertungen auf Google Maps ansehen',
  },
  'zh-Hant': {
    title: 'Spiaggia Sabbioni 評價整理：遊客怎麼看這片湖灘',
    description:
      '整理 Spiaggia Sabbioni 在里瓦德爾加爾達的遊客評價，重點涵蓋景色、人潮、親子適合度、礫石灘與整體體驗。',
    intro:
      'Spiaggia Sabbioni 的評價，多半集中在湖景與山景、交通便利、適合家庭，以及加爾達湖畔的整體氣氛。同時，也有旅客提醒夏季較擁擠，礫石灘地形較適合搭配水鞋。',
    highlights: [
      '最常被提到的優點是湖景與山景非常出色。',
      '不少旅客認為這裡適合家庭，也很適合在靠近市區的位置安排輕鬆的湖畔時光。',
      '較常見的提醒則是夏季人潮偏多，以及礫石灘更適合穿水鞋。',
    ],
    cta: '在 Google 地圖查看完整評價',
  },
} as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const content = reviewsPageContent[locale as keyof typeof reviewsPageContent] ?? reviewsPageContent.en;

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

export default async function TopicReviewsPage({ params }: Props) {
  const { locale } = await params;
  if (locale === 'en' || locale === 'de') {
    redirect(getTopicPath(locale, 'reviews'));
  }

  setRequestLocale(locale);
  const tNav = await getTranslations({ locale, namespace: 'nav' });
  const tReviews = await getTranslations({ locale, namespace: 'reviews' });
  const content = reviewsPageContent[locale as keyof typeof reviewsPageContent] ?? reviewsPageContent.en;
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
              {locale === 'it' ? 'In sintesi' : locale === 'de' ? 'Auf einen Blick' : locale === 'zh-Hant' ? '重點整理' : 'At a glance'}
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
              {locale === 'it' ? 'Guarda le foto della spiaggia' : locale === 'de' ? 'Strandfotos ansehen' : locale === 'zh-Hant' ? '查看沙灘照片' : 'See beach photos'}
            </a>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
