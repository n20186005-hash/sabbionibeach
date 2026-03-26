import { useTranslations } from 'next-intl';

const MAPS_LINK = 'https://maps.app.goo.gl/ziD9juwpMmLJxGcn8';

export default function Hero() {
  const t = useTranslations('hero');
  const tags: string[] = t.raw('tags');

  return (
    <section
      className="relative min-h-[85vh] flex items-center justify-center section-padding pt-24"
      style={{ 
        background: 'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url("/gallery/images%20(1).jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="max-w-3xl mx-auto text-center">
        <h1
          className="font-display text-5xl md:text-7xl mb-4 animate-fade-in-up"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h1>

        <p
          className="text-xl md:text-2xl mb-8 animate-fade-in-up animate-delay-1 font-light"
          style={{ color: 'var(--text-secondary)' }}
        >
          {t('subtitle')}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mb-8 animate-fade-in-up animate-delay-2">
          <div className="flex items-center gap-1.5">
            <span className="star-filled text-lg">★★★★★</span>
            <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>
              {t('rating')}
            </span>
            <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
              {t('ratingCount')}
            </span>
          </div>

          <span style={{ color: 'var(--border)' }}>|</span>

          <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
            {t('hours')}
          </span>
        </div>

        <a
          href={MAPS_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold transition-all hover:shadow-lg animate-fade-in-up animate-delay-3"
          style={{
            background: 'var(--accent)',
            color: '#FFFFFF',
          }}
        >
          {t('viewOnMap')}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="7 7 17 7 17 17" />
          </svg>
        </a>

        <div className="flex flex-wrap justify-center gap-2 mt-10 animate-fade-in-up animate-delay-4">
          {tags.map((tag: string, i: number) => (
            <span
              key={i}
              className="px-3 py-1 rounded-full text-xs font-medium"
              style={{
                background: 'var(--tag-bg)',
                color: 'var(--tag-text)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
