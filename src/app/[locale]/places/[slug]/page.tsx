import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { locales, type Locale } from '@/i18n/config';
import { getLocaleUrl, SITE_URL } from '@/lib/site';
import { nearbyPlaces } from '@/lib/nearby-content';
import { details, visitFacts } from '@/lib/nearby-details';
import { piniDetails, piniFacts } from '@/lib/pini-content';

type Props = { params: Promise<{ locale: string; slug: string }> };
const labels = {
  it: {back:'Spiaggia Sabbioni', explore:'Esplora', tips:'Consigli per la visita', highlights:'Punti di interesse', about:'A proposito', info:'Informazioni pratiche', address:'Indirizzo', hours:'Orari di apertura', price:'Biglietti', transport:'Come arrivare', experience:'Scopri il luogo', route:'Itinerario suggerito', safety:'Informazioni utili', photo:'Fotografie', stay:'Dove soggiornare', directions:'Indirizzo e mappa', map:'Apri la mappa', source:'Fonte e aggiornamenti', sourceText:'Consulta Garda Trentino per orari, prezzi e condizioni aggiornati. Informazioni verificate il 9 novembre 2026.', other:'Altri luoghi nelle vicinanze'},
  en: {back:'Sabbioni Beach', explore:'Explore', tips:'Visitor tips', highlights:'Highlights', about:'About', info:'Practical information', address:'Address', hours:'Opening hours', price:'Tickets and prices', transport:'Getting there', experience:'Discover the place', route:'Suggested itinerary', safety:'Good to know', photo:'Photography', stay:'Where to stay', directions:'Address and map', map:'Open map', source:'Source and updates', sourceText:'Check Garda Trentino for current hours, prices and conditions. Information checked 9 November 2026.', other:'More places nearby'},
  de: {back:'Spiaggia Sabbioni', explore:'Entdecken', tips:'Tipps für den Besuch', highlights:'Highlights', about:'Über den Ort', info:'Praktische Informationen', address:'Adresse', hours:'Öffnungszeiten', price:'Eintritt und Preise', transport:'Anreise', experience:'Den Ort entdecken', route:'Routenvorschlag', safety:'Gut zu wissen', photo:'Fotografieren', stay:'Übernachten', directions:'Adresse und Karte', map:'Karte öffnen', source:'Quelle und Aktualität', sourceText:'Aktuelle Öffnungszeiten, Preise und Bedingungen bei Garda Trentino prüfen. Informationen geprüft am 9. November 2026.', other:'Weitere Ziele in der Nähe'},
  'zh-Hant': {back:'返回 Sabbioni 湖灘', explore:'探索', tips:'遊覽建議', highlights:'景點特色', about:'關於景點', info:'基本資訊', address:'地址', hours:'開放時間', price:'門票價格', transport:'交通方式', experience:'發現魅力', route:'遊覽路線', safety:'遊覽須知', photo:'拍照建議', stay:'住宿建議', directions:'地址與地圖', map:'開啟地圖', source:'資料來源與更新', sourceText:'出發前請向 Garda Trentino 查詢最新開放時間、價格及現場狀況。資料查核於 2026 年 11 月 9 日。', other:'更多周邊景點'},
} as const;
const extraLabels: Record<Locale, {history:string; visit:string; planning:string; reviews:string; reviewsText:string; managementSource:string}> = {
 it:{history:'Storia e architettura',visit:'L’esperienza',planning:'Organizzare la visita',reviews:'Recensioni dei visitatori',reviewsText:'Consulta le recensioni recenti sulla mappa per confrontare esperienze e informazioni aggiornate.',managementSource:'Fonte sulla gestione'},
 en:{history:'History and architecture',visit:'The experience',planning:'Plan your visit',reviews:'Visitor reviews',reviewsText:'Open the map to read recent visitor reviews and compare experiences.',managementSource:'Management source'},
 de:{history:'Geschichte und Architektur',visit:'Das Erlebnis',planning:'Den Besuch planen',reviews:'Besucherbewertungen',reviewsText:'Auf der Karte aktuelle Besucherbewertungen und Erfahrungen vergleichen.',managementSource:'Quelle zur Zuständigkeit'},
 'zh-Hant':{history:'歷史與建築',visit:'核心體驗',planning:'如何安排遊覽',reviews:'遊客評價',reviewsText:'可開啟地圖查看近期遊客評價，參考不同人的遊覽經驗。',managementSource:'管理資料來源'}
};
export function generateStaticParams() { return nearbyPlaces.map(({slug}) => ({slug})); }
export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale,slug}=await params; const place=nearbyPlaces.find(p=>p.slug===slug); if (!place) return {};
  const c=place.content[(locale in labels ? locale : 'en') as Locale]; const path=`/places/${slug}`;
  return {title:`${c.name} | Riva del Garda`,description:c.intro,alternates:{canonical:getLocaleUrl(locale,path),languages:Object.fromEntries([...locales.map(l=>[l,getLocaleUrl(l,path)]),['x-default',`${SITE_URL}/it${path}`]])}};
}
export default async function PlacePage({params}: Props) {
  const {locale,slug}=await params; const place=nearbyPlaces.find(p=>p.slug===slug); if (!place) notFound();
  setRequestLocale(locale); const lang=(locale in labels ? locale : 'en') as Locale; const l=labels[lang]; const c=place.content[lang]; const d=slug === 'spiaggia-dei-pini' ? piniDetails[lang] : details[slug][lang]; const f=slug === 'spiaggia-dei-pini' ? piniFacts[lang] : visitFacts[slug][lang]; const x=extraLabels[lang];
  return <><Header/><main className="pt-24 pb-20 px-4"><div className="max-w-5xl mx-auto">
    <a href={`/${locale}`} className="underline" style={{color:'var(--accent)'}}>← {l.back}</a>
    <div className="grid md:grid-cols-2 gap-8 items-center mt-8 mb-12">
      <div><p className="uppercase tracking-widest text-sm mb-3" style={{color:'var(--accent)'}}>{slug === 'cascata-varone' ? 'Tenno' : 'Riva del Garda'} · Garda Trentino</p><h1 className="font-display text-4xl md:text-5xl mb-4" style={{color:'var(--text-primary)'}}>{c.name}</h1><p className="text-xl mb-5" style={{color:'var(--text-secondary)'}}>{c.tagline}</p>{slug === 'bastione' && <p className="text-sm mb-3"><a className="underline" href="https://www.gardatrentino.it/it/experience/ascensore-del-bastione-andata-ritorno_78522" target="_blank" rel="noopener noreferrer">Ascensore Bastione · ★ 4.7 / 5 · 28 {x.reviews} · Garda Trentino (2026-11-09) ↗</a></p>}<p className="text-sm mb-4" style={{color:'var(--text-secondary)'}}><strong>{l.hours}: </strong>{f.hours}</p><a className="underline" href={place.mapUrl} target="_blank" rel="noopener noreferrer">{l.map} ↗</a></div>
      <div className="rounded-2xl p-8" style={{background:'var(--card-bg)',border:'1px solid var(--border)'}}><h2 className="font-display text-2xl mb-4" style={{color:'var(--text-primary)'}}>{l.info}</h2><p className="mb-4">{place.address}</p><p>{c.tagline}</p><a href={place.mapUrl} target="_blank" rel="noopener noreferrer" className="inline-block mt-5 underline">{l.map} ↗</a></div>
    </div>
    <div className="grid md:grid-cols-[1fr_280px] gap-12" style={{color:'var(--text-secondary)'}}><article className="space-y-10">
      <section><h2 className="font-display text-3xl mb-3" style={{color:'var(--text-primary)'}}>{l.explore}</h2><p className="leading-relaxed">{c.intro}</p></section>
      <section><h2 className="font-display text-2xl mb-3" style={{color:'var(--text-primary)'}}>{l.tips}</h2><ul className="list-disc pl-6 space-y-2">{c.tips.map(x=><li key={x}>{x}</li>)}</ul></section>
      <section><h2 className="font-display text-2xl mb-3" style={{color:'var(--text-primary)'}}>{l.highlights}</h2><p>{c.highlights}</p></section>
      <section><h2 className="font-display text-2xl mb-3" style={{color:'var(--text-primary)'}}>{l.about}</h2><p className="leading-relaxed mb-3">{c.about}</p><p className="leading-relaxed">{d.management}</p><a className="underline" href={d.managerSource} target="_blank" rel="noopener noreferrer">{x.managementSource} ↗</a></section>
      {([[l.hours,f.hours],[l.price,f.prices],[l.transport,c.transport],[l.experience,c.experience],[slug === 'spiaggia-dei-pini' ? ({it:'Posizione e acque di balneazione',en:'Location and bathing water',de:'Lage und Badegewässer','zh-Hant':'位置與游泳水域'} as Record<Locale,string>)[lang] : x.history,d.history],[x.visit,d.visit],[x.planning,d.planning]] as [string,string][]).map(([title,body])=><section key={title}><h2 className="font-display text-2xl mb-3" style={{color:'var(--text-primary)'}}>{title}</h2><p className="leading-relaxed">{body}</p></section>)}
      <section><h2 className="font-display text-2xl mb-3" style={{color:'var(--text-primary)'}}>{l.route}</h2><ol className="list-decimal pl-6 space-y-2">{c.route.map(x=><li key={x}>{x}</li>)}</ol></section>
      {([[l.safety,c.safety],[l.photo,c.photography],[l.stay,c.accommodation]] as [string,string][]).map(([title,body])=><section key={title}><h2 className="font-display text-2xl mb-3" style={{color:'var(--text-primary)'}}>{title}</h2><p className="leading-relaxed">{body}</p></section>)}
      <section><h2 className="font-display text-2xl mb-3" style={{color:'var(--text-primary)'}}>{x.reviews}</h2><p>{x.reviewsText}</p><a className="underline" href={place.mapUrl} target="_blank" rel="noopener noreferrer">{l.map} ↗</a></section>
      <section><h2 className="font-display text-2xl mb-3" style={{color:'var(--text-primary)'}}>{l.directions}</h2><p>{place.address}</p><a href={place.mapUrl} className="underline" target="_blank" rel="noopener noreferrer">{l.map} ↗</a></section>
      <section><h2 className="font-display text-2xl mb-3" style={{color:'var(--text-primary)'}}>{l.source}</h2><p>{l.sourceText}</p><a href={place.source} className="underline" target="_blank" rel="noopener noreferrer">Garda Trentino ↗</a> · <a href={f.source} className="underline" target="_blank" rel="noopener noreferrer">{l.hours} / {l.price} ↗</a></section>
      <section><h2 className="font-display text-2xl mb-3" style={{color:'var(--text-primary)'}}>{l.other}</h2><ul className="space-y-2"><li><a className="underline" href={`/${locale}/sentiero-del-ponale`}>Sentiero del Ponale →</a></li>{nearbyPlaces.filter(p=>p.slug!==slug).map(p=><li key={p.slug}><a className="underline" href={`/${locale}/places/${p.slug}`}>{p.content[lang].name} →</a></li>)}</ul></section>
    </article><aside><div className="rounded-2xl p-6" style={{background:'var(--card-bg)',border:'1px solid var(--border)'}}><h2 className="font-display text-2xl mb-4" style={{color:'var(--text-primary)'}}>{l.info}</h2><dl className="space-y-4"><div><dt className="font-semibold">{l.address}</dt><dd>{place.address}</dd></div><div><dt className="font-semibold">{l.hours}</dt><dd>{f.hours}</dd></div><div><dt className="font-semibold">{l.price}</dt><dd>{f.prices}</dd></div></dl></div></aside></div>
  </div></main><Footer/></>;
}
