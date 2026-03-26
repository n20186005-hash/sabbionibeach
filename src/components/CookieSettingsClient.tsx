'use client';

import { useTranslations, useLocale } from 'next-intl';
import { defaultLocale } from '@/i18n/config';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useState, useEffect } from 'react';

export default function CookieSettingsClient() {
  const t = useTranslations('cookieSettings');
  const tNav = useTranslations('nav');
  const locale = useLocale();
  const prefix = locale === defaultLocale ? '' : `/${locale}`;

  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const prefs = localStorage.getItem('cookiePrefs');
    if (prefs) {
      const parsed = JSON.parse(prefs);
      setAnalytics(parsed.analytics || false);
      setMarketing(parsed.marketing || false);
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem(
      'cookiePrefs',
      JSON.stringify({ analytics, marketing })
    );
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <>
      <Header />
      <main className="pt-20 pb-16 px-4">
        <div className="max-w-3xl mx-auto">
          <a
            href={`${prefix}/`}
            className="inline-flex items-center gap-2 mb-8 text-sm font-medium transition-colors"
            style={{ color: 'var(--accent)' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            {tNav('backHome')}
          </a>

          <h1 className="font-display text-3xl md:text-4xl mb-2" style={{ color: 'var(--text-primary)' }}>
            {t('title')}
          </h1>
          <p className="text-sm mb-10" style={{ color: 'var(--text-muted)' }}>
            {t('lastUpdated')}
          </p>

          <p className="mb-8" style={{ color: 'var(--text-secondary)' }}>
            {t('description')}
          </p>

          <div className="space-y-6">
            <div className="p-6 rounded-xl" style={{ background: 'var(--bg-secondary)' }}>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>{t('necessary.title')}</h3>
                <span className="text-sm font-medium" style={{ color: 'var(--accent)' }}>{t('necessary.status')}</span>
              </div>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{t('necessary.description')}</p>
            </div>

            <div className="p-6 rounded-xl" style={{ background: 'var(--bg-secondary)' }}>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>{t('analytics.title')}</h3>
                <div 
                  className={`toggle-switch ${analytics ? 'active' : ''}`}
                  onClick={() => setAnalytics(!analytics)}
                ></div>
              </div>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{t('analytics.description')}</p>
            </div>

            <div className="p-6 rounded-xl" style={{ background: 'var(--bg-secondary)' }}>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>{t('marketing.title')}</h3>
                <div 
                  className={`toggle-switch ${marketing ? 'active' : ''}`}
                  onClick={() => setMarketing(!marketing)}
                ></div>
              </div>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{t('marketing.description')}</p>
            </div>
          </div>

          <div className="mt-10 flex items-center gap-4">
            <button
              onClick={handleSave}
              className="px-6 py-3 rounded-lg font-medium transition-opacity"
              style={{ background: 'var(--accent)', color: '#fff' }}
            >
              {t('save')}
            </button>
            {saved && (
              <span className="text-sm" style={{ color: 'var(--accent)' }}>
                ✓ Saved
              </span>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
