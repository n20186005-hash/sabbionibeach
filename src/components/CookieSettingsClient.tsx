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
    localStorage.setItem('cookiePrefs', JSON.stringify({ analytics, marketing }));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
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
          <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>
            {t('lastUpdated')}
          </p>
          <p className="text-sm mb-10 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {t('description')}
          </p>

          <div className="p-5 rounded-xl mb-4" style={{ background: 'var(--card-bg)', border: '1px solid var(--border)' }}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>{t('necessary.title')}</h3>
                <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>{t('necessary.description')}</p>
              </div>
              <span className="text-xs font-medium px-3 py-1 rounded-full flex-shrink-0 ml-4" style={{ background: 'var(--tag-bg)', color: 'var(--accent)' }}>
                {t('necessary.status')}
              </span>
            </div>
          </div>

          <div className="p-5 rounded-xl mb-4" style={{ background: 'var(--card-bg)', border: '1px solid var(--border)' }}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>{t('analytics.title')}</h3>
                <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>{t('analytics.description')}</p>
              </div>
              <button onClick={() => setAnalytics(!analytics)} className={`toggle-switch flex-shrink-0 ml-4 ${analytics ? 'active' : ''}`} aria-label="Toggle analytics" />
            </div>
          </div>

          <div className="p-5 rounded-xl mb-8" style={{ background: 'var(--card-bg)', border: '1px solid var(--border)' }}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>{t('marketing.title')}</h3>
                <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>{t('marketing.description')}</p>
              </div>
              <button onClick={() => setMarketing(!marketing)} className={`toggle-switch flex-shrink-0 ml-4 ${marketing ? 'active' : ''}`} aria-label="Toggle marketing" />
            </div>
          </div>

          <button
            onClick={handleSave}
            className="px-6 py-3 rounded-lg text-sm font-semibold transition-all"
            style={{ background: saved ? '#22c55e' : 'var(--accent)', color: '#FFFFFF' }}
          >
            {saved ? '✓' : t('save')}
          </button>
        </div>
      </main>
      <Footer />
    </>
  );
}
