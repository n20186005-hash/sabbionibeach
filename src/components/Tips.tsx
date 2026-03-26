import { useTranslations } from 'next-intl';

type Tip = {
  title: string;
  content: string;
};

export default function Tips() {
  const t = useTranslations('tips');
  const items: Tip[] = t.raw('items');

  return (
    <section className="section-padding" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2
            className="font-display text-3xl md:text-4xl mb-3"
            style={{ color: 'var(--text-primary)' }}
          >
            {t('title')}
          </h2>
          <p style={{ color: 'var(--text-muted)' }}>{t('subtitle')}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {items.map((tip: Tip, i: number) => (
            <div key={i} className="flex gap-4">
              <div
                className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                style={{
                  background: 'var(--tag-bg)',
                  color: 'var(--accent)',
                }}
              >
                {i + 1}
              </div>
              <div>
                <h3
                  className="font-semibold mb-1"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {tip.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {tip.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
