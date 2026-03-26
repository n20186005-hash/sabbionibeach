import { useTranslations } from 'next-intl';

export default function Intro() {
  const t = useTranslations('intro');
  const highlights: string[] = t.raw('highlights');

  return (
    <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-3xl mx-auto">
        <h2
          className="font-display text-3xl md:text-4xl mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>

        <p
          className="text-lg mb-8 leading-relaxed"
          style={{ color: 'var(--text-secondary)' }}
        >
          {t('description')}
        </p>

        <ul className="space-y-3">
          {highlights.map((item: string, i: number) => (
            <li key={i} className="flex items-start gap-3">
              <span
                className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ background: 'var(--accent)' }}
              />
              <span style={{ color: 'var(--text-primary)' }}>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
