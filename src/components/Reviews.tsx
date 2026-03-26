import { useTranslations } from 'next-intl';

const MAPS_LINK = 'https://maps.app.goo.gl/ziD9juwpMmLJxGcn8';

type Review = {
  name: string;
  date: string;
  stars: number;
  text: string;
};

function StarRating({ count }: { count: number }) {
  return (
    <span className="star-filled text-sm tracking-wider">
      {'★'.repeat(count)}
      {'☆'.repeat(5 - count)}
    </span>
  );
}

export default function Reviews() {
  const t = useTranslations('reviews');
  const items: Review[] = t.raw('items');

  return (
    <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6">
          <h2
            className="font-display text-3xl md:text-4xl mb-4"
            style={{ color: 'var(--text-primary)' }}
          >
            {t('title')}
          </h2>
          <p
            className="text-sm max-w-2xl mx-auto leading-relaxed"
            style={{ color: 'var(--text-muted)' }}
          >
            {t('declaration')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mt-10">
          {items.map((review: Review, i: number) => (
            <div
              key={i}
              className="p-5 rounded-xl transition-shadow hover:shadow-md"
              style={{
                background: 'var(--card-bg)',
                border: '1px solid var(--border)',
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
                  {review.name}
                </span>
                <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  {review.date}
                </span>
              </div>
              <StarRating count={review.stars} />
              <p className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {review.text}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <a
            href={MAPS_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium transition-colors"
            style={{ color: 'var(--accent)' }}
          >
            {t('moreReviews')}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
