import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { redirect } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getLocalePath, getTopicAlternates, getTopicPath, getTopicUrl, SITE_URL } from '@/lib/site';

type Props = { params: Promise<{ locale: string }> };

export const photosPageContent = {
  it: {
    title: 'Spiaggia Sabbioni Foto: Com\'è la Spiaggia di Riva del Garda',
    description:
      'Foto della Spiaggia Sabbioni a Riva del Garda: panorami sul Lago di Garda, lungolago, area balneazione e scorci utili per capire com\'è davvero la spiaggia.',
    intro:
      'Questa raccolta di foto della Spiaggia Sabbioni aiuta a capire l\'atmosfera della spiaggia, il panorama sul Lago di Garda, la zona lungolago e il tipo di litorale che trovi arrivando a Riva del Garda.',
    notes: [
      'Le immagini sono utili per valutare il tipo di spiaggia e il panorama prima della visita.',
      'La luce del mattino e del tardo pomeriggio è spesso la più interessante per foto e passeggiate.',
      'Le vedute sul lago e sulle montagne aiutano a capire perché Spiaggia Sabbioni sia una delle zone più fotografate di Riva del Garda.',
    ],
  },
  en: {
    title: 'Spiaggia Sabbioni Photos: What the Beach Looks Like in Riva del Garda',
    description:
      'Photos of Spiaggia Sabbioni in Riva del Garda, including Lake Garda views, the promenade, swimming areas and practical scenery to help you understand what the beach looks like.',
    intro:
      'This Spiaggia Sabbioni photo page gives a clearer idea of the beach atmosphere, Lake Garda scenery, waterfront promenade and the kind of shoreline you can expect in Riva del Garda.',
    notes: [
      'The images help visitors evaluate the look and feel of the beach before arriving.',
      'Morning light and late afternoon are often the best moments for photos and waterfront walks.',
      'The lake and mountain views show why Spiaggia Sabbioni is one of the most photographed spots in Riva del Garda.',
    ],
  },
  de: {
    title: 'Fotos der Spiaggia Sabbioni: So sieht der Strand in Riva del Garda aus',
    description:
      'Fotos der Spiaggia Sabbioni in Riva del Garda mit Blick auf den Gardasee, Promenade, Badebereich und praktischen Eindrücken vom Strand.',
    intro:
      'Diese Fotoseite zur Spiaggia Sabbioni vermittelt einen besseren Eindruck von der Strandatmosphäre, den Gardasee-Ausblicken, der Uferpromenade und dem Charakter des Uferbereichs in Riva del Garda.',
    notes: [
      'Die Bilder helfen dabei, vorab den Charakter des Strandes besser einzuschätzen.',
      'Morgenlicht und später Nachmittag sind oft die besten Zeiten für Fotos und Spaziergänge am Wasser.',
      'Der Blick auf See und Berge zeigt gut, warum die Spiaggia Sabbioni zu den meistfotografierten Orten in Riva del Garda gehört.',
    ],
  },
  'zh-Hant': {
    title: 'Spiaggia Sabbioni 照片：里瓦德爾加爾達湖灘實景',
    description:
      '整理 Spiaggia Sabbioni 的實景照片，包含加爾達湖景、湖濱步道、游泳區與可幫助判斷現場氛圍的畫面。',
    intro:
      '這個 Spiaggia Sabbioni 照片頁面，能更直觀地看到沙灘氣氛、加爾達湖景觀、湖濱步道，以及抵達里瓦德爾加爾達後實際會看到的湖岸樣貌。',
    notes: [
      '照片有助於在出發前先判斷沙灘景觀與整體環境。',
      '上午與傍晚通常是拍照和沿湖散步最舒服的時間。',
      '湖景加上山景，是 Spiaggia Sabbioni 在里瓦德爾加爾達很受歡迎的原因之一。',
    ],
  },
} as const;

export const photoGallery = {
  it: [
    { src: '/gallery/images (1).jpg', alt: 'Spiaggia Sabbioni a Riva del Garda con vista sul Lago di Garda', caption: 'Vista aperta sul lago e sulle montagne.' },
    { src: '/gallery/images (2).jpg', alt: 'Lungolago vicino alla Spiaggia Sabbioni', caption: 'Il tratto del lungolago vicino alla spiaggia.' },
    { src: '/gallery/images (3).jpg', alt: 'Zona balneazione della Spiaggia Sabbioni', caption: 'Area utile per capire l\'accesso all\'acqua.' },
    { src: '/gallery/images (4).jpg', alt: 'Panorama montano sopra Spiaggia Sabbioni', caption: 'Uno dei panorami più riconoscibili di Riva del Garda.' },
    { src: '/gallery/images (5).jpg', alt: 'Spiaggia Sabbioni con area relax sul lago', caption: 'Spazi aperti per fermarsi a lungo sul lago.' },
    { src: '/gallery/images (8).jpg', alt: 'Acqua limpida alla Spiaggia Sabbioni', caption: 'Una foto utile per valutare colore e trasparenza dell\'acqua.' },
    { src: '/gallery/images (12).jpg', alt: 'Vista del lago e delle montagne dalla spiaggia', caption: 'Prospettiva ampia sulla zona balneare e sul contesto naturale.' },
    { src: '/gallery/images (16).jpg', alt: 'Spiaggia Sabbioni al tramonto sul Lago di Garda', caption: 'Il momento migliore per chi cerca foto più atmosferiche.' },
  ],
  en: [
    { src: '/gallery/images (1).jpg', alt: 'Spiaggia Sabbioni in Riva del Garda overlooking Lake Garda', caption: 'A wide view of the lake and surrounding mountains.' },
    { src: '/gallery/images (2).jpg', alt: 'Lakeside promenade near Spiaggia Sabbioni', caption: 'The waterfront area close to the beach.' },
    { src: '/gallery/images (3).jpg', alt: 'Swimming area at Spiaggia Sabbioni', caption: 'Useful for understanding how the beach meets the water.' },
    { src: '/gallery/images (4).jpg', alt: 'Mountain panorama above Spiaggia Sabbioni', caption: 'One of the most recognizable views in Riva del Garda.' },
    { src: '/gallery/images (5).jpg', alt: 'Spiaggia Sabbioni lakeside relaxation area', caption: 'Open areas that help visitors picture a longer beach stop.' },
    { src: '/gallery/images (8).jpg', alt: 'Clear water at Spiaggia Sabbioni', caption: 'Helpful for judging water colour and clarity.' },
    { src: '/gallery/images (12).jpg', alt: 'Lake and mountain view from the beach', caption: 'A broad look at the swimming area and natural setting.' },
    { src: '/gallery/images (16).jpg', alt: 'Spiaggia Sabbioni at sunset on Lake Garda', caption: 'A strong reference for late-day atmosphere and photos.' },
  ],
  de: [
    { src: '/gallery/images (1).jpg', alt: 'Spiaggia Sabbioni in Riva del Garda mit Blick auf den Gardasee', caption: 'Weiter Blick auf den See und die umliegenden Berge.' },
    { src: '/gallery/images (2).jpg', alt: 'Uferpromenade nahe der Spiaggia Sabbioni', caption: 'Der Uferbereich in direkter Nähe zum Strand.' },
    { src: '/gallery/images (3).jpg', alt: 'Badebereich an der Spiaggia Sabbioni', caption: 'Hilfreich, um den Übergang vom Strand ins Wasser zu sehen.' },
    { src: '/gallery/images (4).jpg', alt: 'Bergpanorama oberhalb der Spiaggia Sabbioni', caption: 'Einer der bekanntesten Ausblicke in Riva del Garda.' },
    { src: '/gallery/images (5).jpg', alt: 'Ruhebereich an der Spiaggia Sabbioni am See', caption: 'Offene Flächen, die einen längeren Aufenthalt gut vorstellbar machen.' },
    { src: '/gallery/images (8).jpg', alt: 'Klares Wasser an der Spiaggia Sabbioni', caption: 'Nützlich, um Farbe und Klarheit des Wassers einzuschätzen.' },
    { src: '/gallery/images (12).jpg', alt: 'Blick auf See und Berge vom Strand', caption: 'Weiter Blick auf Badebereich und natürliche Umgebung.' },
    { src: '/gallery/images (16).jpg', alt: 'Spiaggia Sabbioni bei Sonnenuntergang am Gardasee', caption: 'Ein guter Eindruck von der Stimmung am späten Tag.' },
  ],
  'zh-Hant': [
    { src: '/gallery/images (1).jpg', alt: '里瓦德爾加爾達 Spiaggia Sabbioni 與加爾達湖景觀', caption: '可以看出湖面與群山的大範圍視角。' },
    { src: '/gallery/images (2).jpg', alt: 'Spiaggia Sabbioni 附近的湖濱步道', caption: '接近沙灘的湖濱區域實景。' },
    { src: '/gallery/images (3).jpg', alt: 'Spiaggia Sabbioni 的游泳區域', caption: '有助於理解沙灘與水面的接合方式。' },
    { src: '/gallery/images (4).jpg', alt: 'Spiaggia Sabbioni 上方的山景全景', caption: '里瓦德爾加爾達很有代表性的景觀之一。' },
    { src: '/gallery/images (5).jpg', alt: 'Spiaggia Sabbioni 湖畔休憩區', caption: '方便想像長時間停留時的環境感受。' },
    { src: '/gallery/images (8).jpg', alt: 'Spiaggia Sabbioni 清澈的湖水', caption: '可作為觀察湖水顏色與透明度的參考。' },
    { src: '/gallery/images (12).jpg', alt: '從沙灘望向湖泊與群山的景色', caption: '能看到游泳區與整體自然背景。' },
    { src: '/gallery/images (16).jpg', alt: '加爾達湖畔黃昏時的 Spiaggia Sabbioni', caption: '適合判斷傍晚氣氛與拍照效果。' },
  ],
} as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const content = photosPageContent[locale as keyof typeof photosPageContent] ?? photosPageContent.en;

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

export default async function PhotosPage({ params }: Props) {
  const { locale } = await params;
  if (locale === 'en' || locale === 'de') {
    redirect(getTopicPath(locale, 'photos'));
  }

  setRequestLocale(locale);
  const tNav = await getTranslations({ locale, namespace: 'nav' });
  const content = photosPageContent[locale as keyof typeof photosPageContent] ?? photosPageContent.en;
  const images = photoGallery[locale as keyof typeof photoGallery] ?? photoGallery.en;

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
              {locale === 'it' ? 'Cosa mostrano queste foto' : locale === 'de' ? 'Was diese Fotos zeigen' : locale === 'zh-Hant' ? '這些照片能幫你看見什麼' : 'What these photos help you understand'}
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
              {locale === 'it' ? 'Continua la visita' : locale === 'zh-Hant' ? '延伸閱讀' : 'Continue exploring'}
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <a
                href={getTopicPath(locale, 'reviews')}
                className="block p-5 rounded-xl transition-transform hover:-translate-y-1"
                style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}
              >
                {locale === 'it' ? 'Leggi la sintesi delle recensioni' : locale === 'de' ? 'Zur Zusammenfassung der Bewertungen' : locale === 'zh-Hant' ? '查看遊客評價整理' : 'Read the visitor review summary'}
              </a>
              <a
                href={getTopicPath(locale, 'parking')}
                className="block p-5 rounded-xl transition-transform hover:-translate-y-1"
                style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}
              >
                {locale === 'it' ? 'Consulta la guida al parcheggio' : locale === 'de' ? 'Zum Parkplatz-Guide' : locale === 'zh-Hant' ? '查看停車指南' : 'See the parking guide'}
              </a>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
