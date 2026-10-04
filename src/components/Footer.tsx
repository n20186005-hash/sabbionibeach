import { useTranslations, useLocale } from 'next-intl';
import { getLocalePath } from '@/lib/site';

export default function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');
  const locale = useLocale();

  return (
    <footer
      className="section-padding pb-8"
      style={{
        background: 'var(--bg-tertiary)',
        borderTop: '1px solid var(--border)',
      }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex flex-wrap justify-center gap-6 mb-8 text-sm">
          <a
            href={getLocalePath(locale, '/privacy-policy')}
            className="transition-colors hover:underline"
            style={{ color: 'var(--text-muted)' }}
          >
            {tNav('privacy')}
          </a>
          <a
            href={getLocalePath(locale, '/terms-of-service')}
            className="transition-colors hover:underline"
            style={{ color: 'var(--text-muted)' }}
          >
            {tNav('terms')}
          </a>
          <a
            href={getLocalePath(locale, '/cookie-settings')}
            className="transition-colors hover:underline"
            style={{ color: 'var(--text-muted)' }}
          >
            {tNav('cookies')}
          </a>
        </div>

        <p className="text-sm mb-2" style={{ color: 'var(--text-muted)' }}>
          {t('support')}{' '}
          <a
            href="mailto:claritleonelmnicol@gmail.com"
            className="underline"
            style={{ color: 'var(--accent)' }}
          >
            claritleonelmnicol@gmail.com
          </a>
        </p>

        <p className="text-xs mt-4" style={{ color: 'var(--text-muted)' }}>
          {t('disclaimer')}
        </p>

        <p className="text-xs mt-2" style={{ color: 'var(--text-muted)' }}>
          {t('rights')}
        </p>
      </div>
    </footer>
  );
}
