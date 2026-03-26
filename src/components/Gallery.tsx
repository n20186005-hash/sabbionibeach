import { useTranslations } from 'next-intl';

type Photo = {
  src: string;
  caption: string;
};

export default function Gallery() {
  const t = useTranslations('gallery');
  const photos: Photo[] = t.raw('photos');

  return (
    <section className="section-padding" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2
            className="font-display text-3xl md:text-4xl mb-3"
            style={{ color: 'var(--text-primary)' }}
          >
            {t('title')}
          </h2>
          <p style={{ color: 'var(--text-muted)' }}>{t('subtitle')}</p>
        </div>

        <div className="gallery-grid">
          {photos.map((photo: Photo, i: number) => (
            <div key={i} className="relative group overflow-hidden rounded-lg">
              <img
                src={photo.src}
                alt={photo.caption}
                loading="lazy"
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-x-0 bottom-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  background: 'linear-gradient(transparent, rgba(0,0,0,0.6))',
                }}
              >
                <p className="text-white text-sm">{photo.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
