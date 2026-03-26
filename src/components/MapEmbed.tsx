import { useTranslations } from 'next-intl';

const MAPS_LINK = 'https://maps.app.goo.gl/ziD9juwpMmLJxGcn8';
const MAPS_EMBED = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2777.5030553365928!2d10.846444177130653!3d45.881251071083845!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478217c4ea09c03f%3A0x7b767de88421b5a2!2sSpiaggia%20Sabbioni!5e0!3m2!1sen!2sus!4v1774448137578!5m2!1sen!2sus';

export default function MapEmbed() {
  const t = useTranslations('map');

  return (
    <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2
            className="font-display text-3xl md:text-4xl mb-3"
            style={{ color: 'var(--text-primary)' }}
          >
            {t('title')}
          </h2>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            {t('address')}
          </p>
        </div>

        <div className="map-container rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
          <iframe
            src={MAPS_EMBED}
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Spiaggia Sabbioni - Google Maps"
          />
        </div>

        <div className="text-center mt-6">
          <a
            href={MAPS_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all"
            style={{
              color: 'var(--accent)',
              border: '1px solid var(--accent)',
            }}
          >
            {t('openInMaps')}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
