import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { redirect } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getLocalePath, getTopicAlternates, getTopicPath, getTopicUrl, SITE_URL } from '@/lib/site';

type Props = { params: Promise<{ locale: string }> };

export const beachesPageContent = {
  it: {
    title: 'Spiagge Riva del Garda: Sabbioni, Pini Beach e Altre Spiagge',
    description:
      'Panoramica delle spiagge di Riva del Garda con focus su Spiaggia Sabbioni, Pini Beach e altre zone utili per chi cerca una spiaggia sul Lago di Garda.',
    intro:
      'Chi cerca le migliori spiagge di Riva del Garda spesso parte da Spiaggia Sabbioni, ma in zona ci sono anche altri tratti di lago che possono essere più adatti in base a panorama, accessibilità, servizi o stile della giornata.',
    beaches: [
      {
        name: 'Spiaggia Sabbioni',
        summary:
          'La spiaggia più conosciuta e cercata a Riva del Garda. Molto comoda, vicina al centro, con ampio lungolago e servizi che la rendono una scelta frequente per famiglie e visitatori al primo soggiorno.',
      },
      {
        name: 'Pini Beach',
        summary:
          'Molto apprezzata da chi vuole restare sul lungolago ma confrontare un\'atmosfera leggermente diversa rispetto ai Sabbioni. È una delle alternative più naturali da includere in un itinerario balneare in città.',
      },
      {
        name: 'Porto San Nicolò e dintorni',
        summary:
          'Area interessante per chi vuole camminare sul lungolago, fermarsi in più punti e scegliere una zona in base a esposizione al sole, vento o vicinanza a servizi e locali.',
      },
    ],
    sections: [
      {
        heading: 'Quale spiaggia scegliere a Riva del Garda',
        content:
          'Se vuoi la spiaggia più famosa, più comoda da raggiungere e meglio collegata al centro, Spiaggia Sabbioni resta la scelta più immediata. Se invece ti interessa variare il panorama o distribuire meglio la giornata tra passeggiata e sosta sul lago, conviene confrontare anche le aree vicine.',
      },
      {
        heading: 'Spiagge per famiglie',
        content:
          'Le famiglie tendono a preferire spiagge facili da raggiungere, con accessi chiari, lungolago comodo e servizi nei dintorni. In quest\'ottica, Spiaggia Sabbioni rimane uno dei riferimenti principali per chi visita Riva del Garda con bambini.',
      },
      {
        heading: 'Quando vale la pena esplorare più di una spiaggia',
        content:
          'Se resti a Riva del Garda più di qualche ora o per più giorni, visitare almeno due spiagge ti aiuta a capire meglio quale ambiente preferisci. Cambiano panorama, densità di visitatori e comodità per il parcheggio o per gli spostamenti a piedi.',
      },
    ],
    nextTitle: 'Pagine utili per organizzare la visita',
    nextLinks: [
      {
        href: '/parcheggio-spiaggia-sabbioni',
        label: 'Leggi la guida al parcheggio di Spiaggia Sabbioni',
      },
      {
        href: '/',
        label: 'Vai alla guida principale di Spiaggia Sabbioni',
      },
    ],
  },
  en: {
    title: 'Best Beaches in Riva del Garda: Sabbioni, Pini Beach and More',
    description:
      'An overview of the main beaches in Riva del Garda, with a focus on Spiaggia Sabbioni, Pini Beach and other useful lakeside areas on Lake Garda.',
    intro:
      'Many searches for beaches in Riva del Garda start with Spiaggia Sabbioni, but there are several other lakefront areas worth comparing depending on scenery, accessibility, facilities and the type of beach day you want.',
    beaches: [
      {
        name: 'Spiaggia Sabbioni',
        summary:
          'The best-known beach in Riva del Garda. It is easy to reach, close to town and supported by a broad waterfront area, which makes it a common first choice for families and first-time visitors.',
      },
      {
        name: 'Pini Beach',
        summary:
          'A popular alternative for visitors who want to stay on the same waterfront stretch while experiencing a slightly different atmosphere from Sabbioni.',
      },
      {
        name: 'Porto San Nicolò area',
        summary:
          'A useful area for anyone who wants to walk the lakeside, stop at multiple points and choose a spot based on sun exposure, wind or proximity to services.',
      },
    ],
    sections: [
      {
        heading: 'Which beach should you choose?',
        content:
          'If you want the most famous and easiest beach to access from central Riva del Garda, Spiaggia Sabbioni is still the obvious starting point. If you want to compare scenery or split the day across more than one lakeside stop, nearby areas are worth checking too.',
      },
      {
        heading: 'Best beach areas for families',
        content:
          'Families often prefer beaches with simple access, a convenient promenade and services nearby. On that basis, Spiaggia Sabbioni remains one of the strongest options in town for visitors with children.',
      },
      {
        heading: 'When it makes sense to explore more than one beach',
        content:
          'If you are staying in Riva del Garda for more than a few hours or over several days, visiting at least two beach areas helps you decide which atmosphere you prefer. Scenery, crowd levels and parking convenience can vary noticeably.',
      },
    ],
    nextTitle: 'Useful pages for planning your visit',
    nextLinks: [
      {
        href: '/parcheggio-spiaggia-sabbioni',
        label: 'Read the Spiaggia Sabbioni parking guide',
      },
      {
        href: '/',
        label: 'Go to the main Spiaggia Sabbioni guide',
      },
    ],
  },
  de: {
    title: 'Strände in Riva del Garda: Sabbioni, Pini Beach und mehr',
    description:
      'Überblick über die wichtigsten Strände in Riva del Garda mit Fokus auf Spiaggia Sabbioni, Pini Beach und weitere Uferbereiche am Gardasee.',
    intro:
      'Viele Suchen nach Stränden in Riva del Garda beginnen mit der Spiaggia Sabbioni. In der Umgebung gibt es jedoch weitere Uferabschnitte, die je nach Aussicht, Erreichbarkeit, Service und gewünschter Strandatmosphäre interessant sein können.',
    beaches: [
      {
        name: 'Spiaggia Sabbioni',
        summary:
          'Der bekannteste Strand in Riva del Garda. Er ist leicht erreichbar, nah an der Stadt und durch die breite Uferpromenade besonders beliebt bei Familien und Erstbesuchern.',
      },
      {
        name: 'Pini Beach',
        summary:
          'Eine beliebte Alternative für alle, die am gleichen Uferabschnitt bleiben, aber eine etwas andere Atmosphäre als an den Sabbioni erleben möchten.',
      },
      {
        name: 'Bereich Porto San Nicolò',
        summary:
          'Interessant für alle, die am See entlang spazieren, mehrere Punkte vergleichen und je nach Sonne, Wind oder Nähe zu Serviceeinrichtungen einen Platz suchen möchten.',
      },
    ],
    sections: [
      {
        heading: 'Welchen Strand sollte man wählen?',
        content:
          'Wer den bekanntesten und am leichtesten erreichbaren Strand nahe dem Zentrum von Riva del Garda sucht, startet am besten mit der Spiaggia Sabbioni. Wer unterschiedliche Eindrücke sammeln möchte, sollte auch die nahegelegenen Uferbereiche vergleichen.',
      },
      {
        heading: 'Strände für Familien',
        content:
          'Familien bevorzugen meist einfache Zugänge, eine bequeme Promenade und Service in der Nähe. Unter diesem Blickwinkel zählt die Spiaggia Sabbioni weiter zu den stärksten Optionen in Riva del Garda.',
      },
      {
        heading: 'Wann lohnt es sich, mehr als einen Strand anzuschauen?',
        content:
          'Wenn du mehr als nur ein paar Stunden oder mehrere Tage in Riva del Garda bleibst, lohnt sich der Vergleich von mindestens zwei Strandbereichen. Aussicht, Andrang und Parkmöglichkeiten können sich deutlich unterscheiden.',
      },
    ],
    nextTitle: 'Nützliche Seiten für die Planung',
    nextLinks: [
      {
        href: '/parcheggio-spiaggia-sabbioni',
        label: 'Zum Parkplatz-Guide der Spiaggia Sabbioni',
      },
      {
        href: '/',
        label: 'Zur Hauptseite der Spiaggia Sabbioni',
      },
    ],
  },
  'zh-Hant': {
    title: '里瓦德爾加爾達湖灘：Sabbioni、Pini Beach 與其他選擇',
    description:
      '整理里瓦德爾加爾達主要湖灘，包含 Spiaggia Sabbioni、Pini Beach 與其他值得比較的湖濱區域。',
    intro:
      '搜尋里瓦德爾加爾達湖灘時，很多人會先看到 Spiaggia Sabbioni，但如果你想比較景觀、便利性、設施或整體氛圍，周邊其實還有其他值得一起看的湖岸區域。',
    beaches: [
      {
        name: 'Spiaggia Sabbioni',
        summary:
          '這裡是里瓦德爾加爾達最知名的湖灘之一，離市中心近、交通方便，也因此常是家庭旅客與第一次造訪者的首選。',
      },
      {
        name: 'Pini Beach',
        summary:
          '如果你想沿著同一段湖濱散步，同時比較和 Sabbioni 稍有不同的氛圍，Pini Beach 是很常被一起考慮的替代選項。',
      },
      {
        name: 'Porto San Nicolò 周邊',
        summary:
          '適合想沿湖步行、邊走邊找適合停留地點的旅客，可依照日照、風況與服務設施來選擇。',
      },
    ],
    sections: [
      {
        heading: '該選哪一個湖灘？',
        content:
          '若你想找知名度最高、從市中心也最容易到達的湖灘，Spiaggia Sabbioni 仍然是最直接的起點。若想在同一天比較不同景色與氣氛，也很適合順路看看周邊其他湖岸區。',
      },
      {
        heading: '適合親子的湖灘',
        content:
          '多數親子旅客會優先考慮交通簡單、步道好走且周邊有設施的地點。以這個標準來看，Spiaggia Sabbioni 仍然是里瓦德爾加爾達非常強的選擇。',
      },
      {
        heading: '什麼時候值得多看幾個湖灘',
        content:
          '如果你會在里瓦德爾加爾達停留超過半天，甚至住上幾晚，那麼安排比較兩個以上湖灘通常很值得。不同區域在人潮、風景與停車便利性上都可能有明顯差異。',
      },
    ],
    nextTitle: '規劃行程時可搭配閱讀',
    nextLinks: [
      {
        href: '/parcheggio-spiaggia-sabbioni',
        label: '查看 Spiaggia Sabbioni 停車指南',
      },
      {
        href: '/',
        label: '回到 Spiaggia Sabbioni 主指南',
      },
    ],
  },
} as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const content = beachesPageContent[locale as keyof typeof beachesPageContent] ?? beachesPageContent.en;

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

export default async function BeachesPage({ params }: Props) {
  const { locale } = await params;
  if (locale === 'en' || locale === 'de') {
    redirect(getTopicPath(locale, 'beaches'));
  }
  setRequestLocale(locale);
  const tNav = await getTranslations({ locale, namespace: 'nav' });
  const content = beachesPageContent[locale as keyof typeof beachesPageContent] ?? beachesPageContent.en;

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
              {content.nextLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href === '/' ? getLocalePath(locale) : getTopicPath(locale, 'parking')}
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
