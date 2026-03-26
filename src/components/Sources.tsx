import { useTranslations } from 'next-intl';

export default function Sources() {
  const t = useTranslations('sources');
  const items: string[] = t.raw('items');

  return (
    <section className="section-padding" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-3xl mx-auto">
        <h2
          className="font-display text-2xl md:text-3xl mb-4"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>

        <p
          className="text-sm mb-6 leading-relaxed"
          style={{ color: 'var(--text-muted)' }}
        >
          {t('text')}
        </p>

        <ul className="space-y-2">
          {items.map((item: string, i: number) => (
            <li key={i} className="flex items-start gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
              <span style={{ color: 'var(--accent)' }}>—</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
