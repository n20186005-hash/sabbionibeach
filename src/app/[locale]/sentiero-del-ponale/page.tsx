// Preview validation branch.
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { locales } from '@/i18n/config';
import { getLocalePath, getLocaleUrl, SITE_URL } from '@/lib/site';

const path = '/sentiero-del-ponale';
const source = 'https://www.gardatrentino.it/it/activity/sentiero-del-ponale-da-riva-del-garda-_8214';
type Props = { params: Promise<{ locale: string }> };
const copy = {
  it: {
    title: 'Sentiero del Ponale da Riva del Garda: guida alla visita',
    description: 'Come organizzare il Sentiero del Ponale da Riva del Garda: partenza, percorso, sicurezza e cosa verificare prima di partire.',
    intro: 'Dalla riva del lago ai pendii sopra Riva del Garda, il Sentiero del Ponale segue il tracciato di una vecchia strada verso la Valle di Ledro. È una possibile escursione da abbinare a una sosta a Spiaggia Sabbioni, dedicandole tempo e preparazione propri.',
    tipsTitle: 'Consigli prima di partire', tips: ['Controlla condizioni, meteo e avvisi sul percorso prima di partire.', 'Indossa scarpe adatte al fondo irregolare e porta acqua e protezione dal sole.', 'Il percorso è condiviso con le biciclette: rispetta le corsie e presta attenzione agli altri utenti.'],
    featuresTitle: 'Cosa rende speciale il percorso', features: 'La vecchia strada panoramica corre sopra il lago, attraversa gallerie e conserva tracce della storia militare della zona. La Tagliata del Ponale è normalmente chiusa al pubblico per ragioni di sicurezza.',
    aboutTitle: 'Informazioni sul sentiero', about: 'La strada, aperta nel 1851 come collegamento con la Valle di Ledro, è diventata un percorso ciclopedonale nel 2004. Il tracciato e le condizioni effettive possono cambiare: consulta sempre la scheda dell’ente turistico.',
    basicsTitle: 'Informazioni pratiche', basics: 'Punto di partenza: Via Monte Oro, Riva del Garda. La scheda ufficiale indica un itinerario di 6,4 km e circa 3 ore; consulta la traccia completa per verificare la destinazione; si tratta di un itinerario da punto a punto, non di un percorso di andata e ritorno. Organizza separatamente il rientro e l’accesso dalla spiaggia.',
    gettingTitle: 'Come arrivare', getting: 'Dal centro di Riva, raggiungi la centrale idroelettrica e segui le indicazioni verso l’inizio del sentiero, prima della galleria stradale. Pianifica separatamente l’accesso da Sabbioni e il ritorno.',
    routeTitle: 'Itinerario di visita', route: ['Raggiungi l’imbocco presso Via Monte Oro e controlla le indicazioni sul posto.', 'Segui la Ponale, mantenendo le corsie indicate per pedoni e ciclisti.', 'Al Belvedere puoi valutare il ritorno sulla stessa via oppure proseguire solo con tempo e preparazione adeguati.'],
    safetyTitle: 'Sicurezza e accessibilità', safety: 'Il sentiero passa sotto pareti rocciose ed è soggetto a caduta di sassi. La scheda turistica lo sconsiglia ai passeggini; verifica le condizioni sul posto e rinuncia in caso di pericolo o chiusura. Non presumere che sia un percorso accessibile a tutti.',
    photoTitle: 'Fotografie', photo: 'I panorami sul lago sono una delle attrattive del percorso. Fermati solo in punti sicuri, senza ostacolare pedoni e biciclette e senza oltrepassare barriere.',
    sourcesTitle: 'Fonte e aggiornamenti', sources: 'Scheda Garda Trentino consultata l’8 novembre 2026. Controlla la pagina ufficiale per stato, condizioni e indicazioni aggiornate.', back: 'Torna alla guida di Spiaggia Sabbioni', official: 'Consulta la scheda del Sentiero del Ponale', map: 'Cerca Via Monte Oro sulla mappa',
  },
  en: {
    title: 'Ponale Trail from Riva del Garda: visitor guide', description: 'Plan the Ponale Trail from Riva del Garda: starting point, route, safety and what to check before setting out.',
    intro: 'Above the lake at Riva del Garda, the Ponale Trail follows a former road towards the Ledro Valley. It can be paired with time at Sabbioni Beach, but needs its own preparation and time.',
    tipsTitle: 'Before you go', tips: ['Check trail notices, weather and conditions before setting out.', 'Wear footwear suitable for uneven ground and bring water and sun protection.', 'The route is shared with cyclists: use the marked lanes and watch for other visitors.'],
    featuresTitle: 'Trail highlights', features: 'The former panoramic road runs above the lake, through tunnels and past traces of the area’s military history. The Ponale fortification is normally closed to the public for safety.',
    aboutTitle: 'About the trail', about: 'The road opened in 1851 to connect the Ledro Valley and became a walking and cycling route in 2004. Conditions can change, so check the tourism authority’s current route information.',
    basicsTitle: 'Practical information', basics: 'Start: Via Monte Oro, Riva del Garda. The official listing describes a 6.4 km route taking around three hours; consult its full route for the destination; this is a point-to-point itinerary, not a round trip. Plan your return and the approach from the beach separately.',
    gettingTitle: 'Getting there', getting: 'From central Riva, head towards the hydroelectric power station and follow signs to the trail entrance before the road tunnel. Plan the approach from Sabbioni and your return separately.',
    routeTitle: 'Suggested route', route: ['Reach the entrance near Via Monte Oro and read the signs on site.', 'Follow the Ponale, using the designated pedestrian and cycle lanes.', 'At Belvedere consider returning the same way, or continue only if you have the time and preparation.'],
    safetyTitle: 'Safety and accessibility', safety: 'The trail runs beneath rocky slopes and is exposed to falling rocks. The tourism authority advises against pushchairs; check on-site conditions and turn back if the route is closed or unsafe. Do not assume it is accessible to everyone.',
    photoTitle: 'Photography', photo: 'Lake views are a highlight. Stop only where safe, keep walking and cycling routes clear and stay behind barriers.',
    sourcesTitle: 'Source and updates', sources: 'Garda Trentino route information checked 8 November 2026. Consult the official page for current status, conditions and directions.', back: 'Back to the Sabbioni Beach guide', official: 'View the official Ponale Trail information', map: 'Search Via Monte Oro on the map',
  },
  de: {
    title: 'Ponale-Weg ab Riva del Garda: Tipps für den Besuch', description: 'Den Ponale-Weg ab Riva del Garda planen: Startpunkt, Route, Sicherheit und aktuelle Hinweise.',
    intro: 'Oberhalb des Gardasees folgt der Ponale-Weg einer ehemaligen Straße Richtung Ledrotal. Ein Ausflug lässt sich mit der Spiaggia Sabbioni verbinden, benötigt aber eigene Zeit und Vorbereitung.',
    tipsTitle: 'Vor dem Aufbruch', tips: ['Wetter, Wegzustand und aktuelle Hinweise prüfen.', 'Geeignete Schuhe für unebenen Untergrund, Wasser und Sonnenschutz mitnehmen.', 'Der Weg wird mit Radfahrenden geteilt: Markierungen beachten und Rücksicht nehmen.'],
    featuresTitle: 'Besonderheiten', features: 'Die ehemalige Panoramastraße führt oberhalb des Sees durch Tunnel und vorbei an Spuren der Militärgeschichte. Die Ponale-Sperre ist aus Sicherheitsgründen normalerweise nicht öffentlich zugänglich.',
    aboutTitle: 'Über den Weg', about: 'Die Straße wurde 1851 als Verbindung ins Ledrotal eröffnet und 2004 zum Geh- und Radweg. Die Bedingungen können sich ändern; aktuelle Angaben stehen bei der Tourismusorganisation.',
    basicsTitle: 'Praktische Informationen', basics: 'Start: Via Monte Oro, Riva del Garda. Der offizielle Routeneintrag nennt 6,4 km und rund drei Stunden; das Ziel in der vollständigen Wegbeschreibung prüfen; dies ist eine Strecke von Punkt zu Punkt und kein Rundweg. Rückweg und Zugang vom Strand separat planen.',
    gettingTitle: 'Anreise', getting: 'Vom Zentrum Rivas zum Wasserkraftwerk gehen und den Schildern zum Einstieg vor dem Straßentunnel folgen. Den Weg ab Sabbioni und die Rückkehr gesondert planen.',
    routeTitle: 'Routenvorschlag', route: ['Den Einstieg nahe Via Monte Oro erreichen und die Beschilderung lesen.', 'Der Ponale folgen und die markierten Geh- und Radspuren nutzen.', 'Am Belvedere die Rückkehr auf demselben Weg erwägen oder nur mit genügend Zeit und Vorbereitung weitergehen.'],
    safetyTitle: 'Sicherheit und Zugänglichkeit', safety: 'Der Weg verläuft unter Felswänden; Steinschlag ist möglich. Die Tourismusorganisation rät von Kinderwagen ab. Bei Sperrung oder Gefahr umkehren; der Weg ist nicht für alle gleichermaßen zugänglich.',
    photoTitle: 'Fotografieren', photo: 'Die Aussicht auf den See ist ein Höhepunkt. Nur an sicheren Stellen anhalten, Wege freihalten und Absperrungen respektieren.',
    sourcesTitle: 'Quelle und Aktualität', sources: 'Garda Trentino, geprüft am 8. November 2026. Aktuellen Zustand und Wegbeschreibung vorab auf der offiziellen Seite prüfen.', back: 'Zurück zum Sabbioni-Strandführer', official: 'Offizielle Informationen zum Ponale-Weg', map: 'Via Monte Oro auf der Karte suchen',
  },
  'zh-Hant': {
    title: '里瓦德爾加爾達 Ponale 步道：遊覽指南', description: '規劃從 Riva del Garda 出發的 Ponale 步道：入口、路線、安全與行前查詢。',
    intro: 'Ponale 步道沿著通往 Ledro 山谷的舊公路，行經加爾達湖上方。可以與 Sabbioni 湖灘安排在同一次旅程，但步道需要另外預留時間並做好準備。',
    tipsTitle: '行前建議', tips: ['出發前查詢步道公告、天氣和現場狀況。', '穿著適合不平路面的鞋，攜帶飲水和防曬用品。', '步道由行人和自行車共用，請遵循分道標示並留意其他使用者。'],
    featuresTitle: '路線特色', features: '舊公路沿湖上方行進，途中有隧道及軍事歷史遺跡。Ponale 防禦工事基於安全原因通常不對公眾開放。',
    aboutTitle: '關於步道', about: '這條公路於 1851 年開通，連接 Ledro 山谷；2004 年轉為步行與自行車路線。路況可能改變，請查看旅遊機構的最新資訊。',
    basicsTitle: '基本資訊', basics: '起點：Riva del Garda 的 Via Monte Oro。官方路線資料列出約 6.4 公里、3 小時；目的地請查看完整路線說明；這是點對點路線，並非往返時間；請另行規劃回程及從湖灘前往入口的路線。',
    gettingTitle: '如何前往', getting: '從里瓦市中心前往水力發電站，依標示抵達公路隧道前的步道入口。從 Sabbioni 出發的接駁和回程需另外規劃。',
    routeTitle: '遊覽路線', route: ['到達 Via Monte Oro 附近入口，閱讀現場標示。', '沿 Ponale 前進，遵守行人及自行車分道。', '抵達 Belvedere 後，可考慮原路返回；只有時間及準備充足時才繼續前行。'],
    safetyTitle: '安全與無障礙', safety: '步道行經岩壁下方，有落石風險。旅遊機構不建議推嬰兒車；遇封閉或危險時應折返，也不要假定路線適合所有行動能力。',
    photoTitle: '拍照', photo: '沿途可欣賞湖景。只在安全位置停留，不阻擋行人與自行車，也不要越過護欄。',
    sourcesTitle: '來源與更新', sources: 'Garda Trentino 路線資料查核於 2026 年 11 月 8 日；出發前請查看官方頁面的最新狀態、路況與指引。', back: '返回 Sabbioni 湖灘指南', official: '查看 Ponale 步道官方資料', map: '在地圖搜尋 Via Monte Oro',
  },
} as const;
function contentFor(locale: string) { return copy[locale as keyof typeof copy] ?? copy.en; }
export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params; const c = contentFor(locale);
  return { title: c.title, description: c.description, alternates: { canonical: getLocaleUrl(locale, path), languages: Object.fromEntries([...locales.map(l => [l, getLocaleUrl(l, path)]), ['x-default', `${SITE_URL}/it${path}`]]) } };
}
export default async function PonalePage({params}: Props) {
  const {locale} = await params; setRequestLocale(locale); const c = contentFor(locale);
  return <><Header/><main className="pt-24 pb-16 px-4"><div className="max-w-4xl mx-auto">
    <a href={getLocalePath(locale)} style={{color:'var(--accent)'}}>{c.back}</a>
    <h1 className="font-display text-3xl md:text-5xl mt-8 mb-5" style={{color:'var(--text-primary)'}}>{c.title}</h1>
    <p className="text-lg leading-relaxed mb-10" style={{color:'var(--text-secondary)'}}>{c.intro}</p>
    <div className="space-y-10" style={{color:'var(--text-secondary)'}}>
      <section><h2 className="font-display text-2xl mb-3" style={{color:'var(--text-primary)'}}>{c.tipsTitle}</h2><ul className="list-disc pl-6 space-y-2">{c.tips.map(x=><li key={x}>{x}</li>)}</ul></section>
      {[[c.featuresTitle,c.features],[c.aboutTitle,c.about],[c.basicsTitle,c.basics]].map(([heading,body])=><section key={heading}><h2 className="font-display text-2xl mb-3" style={{color:'var(--text-primary)'}}>{heading}</h2><p className="leading-relaxed">{body}</p></section>)}
      <section><h2 className="font-display text-2xl mb-3" style={{color:'var(--text-primary)'}}>{c.gettingTitle}</h2><p className="leading-relaxed">{c.getting}</p><a href="https://www.google.com/maps/search/?api=1&query=Via+Monte+Oro%2C+Riva+del+Garda" target="_blank" rel="noopener noreferrer" className="inline-block mt-3 underline" style={{color:'var(--accent)'}}>{c.map}</a></section>
      <section><h2 className="font-display text-2xl mb-3" style={{color:'var(--text-primary)'}}>{c.routeTitle}</h2><ol className="list-decimal pl-6 space-y-2">{c.route.map(x=><li key={x}>{x}</li>)}</ol></section>
      {[[c.safetyTitle,c.safety],[c.photoTitle,c.photo],[c.sourcesTitle,c.sources]].map(([heading,body])=><section key={heading}><h2 className="font-display text-2xl mb-3" style={{color:'var(--text-primary)'}}>{heading}</h2><p className="leading-relaxed">{body}</p></section>)}
      <p><a href={source} target="_blank" rel="noopener noreferrer" className="underline" style={{color:'var(--accent)'}}>{c.official}</a></p>
    </div></div></main><Footer/></>;
}
