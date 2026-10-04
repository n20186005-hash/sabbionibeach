import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { redirect } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getLocalePath, getTopicAlternates, getTopicPath, getTopicUrl, GOOGLE_MAPS_URL, SITE_URL } from '@/lib/site';

type Props = { params: Promise<{ locale: string }> };

export const parkingPageContent = {
  it: {
    title: 'Parcheggio Spiaggia Sabbioni: Dove Parcheggiare a Riva del Garda',
    description:
      'Guida al parcheggio per Spiaggia Sabbioni a Riva del Garda: dove lasciare l\'auto, quanto si cammina, cosa aspettarsi in alta stagione e consigli utili per arrivare in spiaggia senza stress.',
    intro:
      'Se arrivi in auto, il parcheggio è una delle informazioni più utili da controllare prima di andare alla Spiaggia Sabbioni. La zona è vicina al centro di Riva del Garda e al lungolago, quindi i posti comodi tendono a riempirsi nelle giornate di sole e nei mesi estivi.',
    sections: [
      {
        heading: 'Dove parcheggiare vicino alla Spiaggia Sabbioni',
        content:
          'Le soluzioni più pratiche sono i parcheggi vicini al lungolago e all\'area sportiva di Riva del Garda. In genere conviene puntare a parcheggi ufficiali o stalli regolamentati, così da raggiungere la spiaggia a piedi in pochi minuti senza dover rientrare in centro.',
      },
      {
        heading: 'Quanto si cammina dal parcheggio alla spiaggia',
        content:
          'Una volta parcheggiata l\'auto, il tragitto finale è di solito semplice e pianeggiante. Dalle aree più vicine si arriva a Spiaggia Sabbioni con una breve camminata, utile anche per chi viaggia con bambini, passeggino o attrezzatura da lago.',
      },
      {
        heading: 'Parcheggio in alta stagione',
        content:
          'Nei weekend estivi e nelle ore centrali della giornata il parcheggio può diventare più difficile. Se possibile, conviene arrivare presto al mattino oppure nel tardo pomeriggio, quando la rotazione dei posti tende a migliorare.',
      },
      {
        heading: 'Consigli pratici prima di partire',
        content:
          'Controlla sempre la segnaletica locale, eventuali limiti di sosta e la distanza reale dal lago. Se soggiorni in centro a Riva del Garda, valuta anche di andare a piedi o in bici: spesso è la soluzione più comoda per evitare traffico e ricerca del posto.',
      },
    ],
    ctaTitle: 'Apri la posizione su Google Maps',
    nearbyTitle: 'Dopo il parcheggio, cosa consultare',
    nearbyLinks: [
      {
        href: '/spiagge-riva-del-garda',
        label: 'Confronta le spiagge di Riva del Garda',
      },
      {
        href: '/',
        label: 'Torna alla guida principale di Spiaggia Sabbioni',
      },
    ],
  },
  en: {
    title: 'Spiaggia Sabbioni Parking: Where to Park in Riva del Garda',
    description:
      'A practical parking guide for Spiaggia Sabbioni in Riva del Garda, including where to leave your car, walking distance, peak-season expectations and tips for an easier visit.',
    intro:
      'If you are arriving by car, parking is one of the first things worth checking before going to Spiaggia Sabbioni. The beach is close to the town centre and waterfront, so the most convenient spaces tend to fill up quickly on sunny days and in summer.',
    sections: [
      {
        heading: 'Where to park near Spiaggia Sabbioni',
        content:
          'The most practical options are the official parking areas and regulated spaces near the lakeside and sports area of Riva del Garda. These usually let you reach the beach on foot in a few minutes without needing to drive back into the centre.',
      },
      {
        heading: 'Walking distance from the car park',
        content:
          'Once you have parked, the final walk is usually straightforward and mostly flat. The closest areas are convenient for families, visitors carrying beach gear and anyone who wants quick access to the waterfront.',
      },
      {
        heading: 'Parking in peak season',
        content:
          'Summer weekends and midday hours are typically the busiest. Arriving earlier in the morning or later in the afternoon can make parking easier and reduce the time spent searching for a space.',
      },
      {
        heading: 'Useful planning tips',
        content:
          'Check local parking signs, payment rules and the real walking distance to the lakefront. If you are staying in central Riva del Garda, walking or cycling can often be the easiest option.',
      },
    ],
    ctaTitle: 'Open the location on Google Maps',
    nearbyTitle: 'Useful pages to read next',
    nearbyLinks: [
      {
        href: '/spiagge-riva-del-garda',
        label: 'Compare the beaches in Riva del Garda',
      },
      {
        href: '/',
        label: 'Back to the main Spiaggia Sabbioni guide',
      },
    ],
  },
  de: {
    title: 'Parkplatz Spiaggia Sabbioni: Wo parkt man in Riva del Garda?',
    description:
      'Praktischer Guide zum Parken an der Spiaggia Sabbioni in Riva del Garda: wo du das Auto abstellst, wie weit du zu Fuß gehst und was dich in der Hochsaison erwartet.',
    intro:
      'Wenn du mit dem Auto anreist, ist Parken eine der wichtigsten Informationen vor dem Besuch der Spiaggia Sabbioni. Der Strand liegt nahe am Zentrum von Riva del Garda und an der Promenade, deshalb sind die bequemsten Parkplätze an sonnigen Tagen und im Sommer oft schnell belegt.',
    sections: [
      {
        heading: 'Wo man nahe der Spiaggia Sabbioni parken kann',
        content:
          'Am praktischsten sind offizielle Parkplätze und regulierte Stellplätze in der Nähe der Promenade und des Sportbereichs von Riva del Garda. Von dort erreicht man den Strand meist in wenigen Minuten zu Fuß, ohne wieder zurück ins Zentrum fahren zu müssen.',
      },
      {
        heading: 'Wie weit ist der Fußweg vom Parkplatz?',
        content:
          'Sobald das Auto steht, ist der letzte Weg in der Regel einfach und weitgehend eben. Die nächstgelegenen Bereiche sind besonders angenehm für Familien, Besucher mit Strandausrüstung oder alle, die schnell an das Wasser möchten.',
      },
      {
        heading: 'Parken in der Hochsaison',
        content:
          'An Sommerwochenenden und rund um die Mittagszeit ist die Nachfrage am größten. Wer früher am Morgen oder später am Nachmittag kommt, hat meist bessere Chancen auf einen passenden Parkplatz.',
      },
      {
        heading: 'Praktische Tipps vor der Anfahrt',
        content:
          'Achte immer auf lokale Beschilderung, Parkregeln und die tatsächliche Entfernung zum Seeufer. Wenn du im Zentrum von Riva del Garda wohnst, ist zu Fuß oder mit dem Fahrrad oft die einfachere Lösung.',
      },
    ],
    ctaTitle: 'Standort auf Google Maps öffnen',
    nearbyTitle: 'Was du danach noch ansehen kannst',
    nearbyLinks: [
      {
        href: '/spiagge-riva-del-garda',
        label: 'Strände in Riva del Garda vergleichen',
      },
      {
        href: '/',
        label: 'Zur Hauptseite der Spiaggia Sabbioni zurück',
      },
    ],
  },
  'zh-Hant': {
    title: 'Spiaggia Sabbioni 停車指南：里瓦德爾加爾達怎麼停車',
    description:
      '整理 Spiaggia Sabbioni 停車資訊，包含自駕停在哪裡、步行距離、旺季情況與前往建議。',
    intro:
      '如果你打算自駕前往 Spiaggia Sabbioni，停車通常是出發前最值得先確認的資訊之一。沙灘靠近里瓦德爾加爾達市中心與湖濱，因此天氣好或夏季時，方便的位置往往很快就會停滿。',
    sections: [
      {
        heading: '沙灘附近可考慮的停車區',
        content:
          '通常可優先留意湖濱與運動區附近的正式停車場或合法路邊停車位，這樣下車後能以較短步行距離抵達 Spiaggia Sabbioni，也比較不用再繞回市中心找位置。',
      },
      {
        heading: '從停車處走到沙灘要多久',
        content:
          '停好車後，最後一段步行通常相對平坦且容易。對親子旅客、帶推車的家庭，或攜帶較多湖灘用品的旅客來說，這點特別重要。',
      },
      {
        heading: '旺季停車情況',
        content:
          '夏季週末與中午前後通常最熱門。若能提早上午抵達，或避開最尖峰時段，通常比較容易找到合適車位。',
      },
      {
        heading: '出發前的小提醒',
        content:
          '建議先確認現場標誌、收費方式與實際步行距離。如果住宿就在里瓦德爾加爾達市中心，步行或騎車往往會比開車更省事。',
      },
    ],
    ctaTitle: '在 Google 地圖中開啟位置',
    nearbyTitle: '接著可以看的頁面',
    nearbyLinks: [
      {
        href: '/spiagge-riva-del-garda',
        label: '比較里瓦德爾加爾達各湖灘',
      },
      {
        href: '/',
        label: '返回 Spiaggia Sabbioni 主指南',
      },
    ],
  },
} as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const content = parkingPageContent[locale as keyof typeof parkingPageContent] ?? parkingPageContent.en;

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

export default async function ParkingPage({ params }: Props) {
  const { locale } = await params;
  if (locale === 'en' || locale === 'de') {
    redirect(getTopicPath(locale, 'parking'));
  }
  setRequestLocale(locale);
  const tNav = await getTranslations({ locale, namespace: 'nav' });
  const content = parkingPageContent[locale as keyof typeof parkingPageContent] ?? parkingPageContent.en;

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
              {content.nearbyLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href === '/' ? getLocalePath(locale) : getTopicPath(locale, 'beaches')}
                  className="block p-5 rounded-xl transition-transform hover:-translate-y-1"
                  style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
