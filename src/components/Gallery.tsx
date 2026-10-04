'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';
import { GOOGLE_MAPS_URL } from '@/lib/site';

const gallerySources = [
  '/gallery/images (1).jpg',
  '/gallery/images (2).jpg',
  '/gallery/images (3).jpg',
  '/gallery/images (4).jpg',
  '/gallery/images (5).jpg',
  '/gallery/images (6).jpg',
  '/gallery/images (7).jpg',
  '/gallery/images (8).jpg',
  '/gallery/images (9).jpg',
  '/gallery/images (10).jpg',
  '/gallery/images (11).jpg',
  '/gallery/images (12).jpg',
  '/gallery/images (13).jpg',
  '/gallery/images (14).jpg',
  '/gallery/images (15).jpg',
  '/gallery/images (16).jpg',
] as const;

const captionsByLocale = {
  it: [
    'Spiaggia Sabbioni a Riva del Garda con vista sul Lago di Garda',
    'Lungolago vicino alla Spiaggia Sabbioni',
    'Zona balneazione di Spiaggia Sabbioni',
    'Panorama delle montagne sopra Spiaggia Sabbioni',
    'Spiaggia Sabbioni con area relax sul lago',
    'Vista aperta del litorale di Spiaggia Sabbioni',
    'Passeggiata sul lungolago di Riva del Garda',
    'Acqua limpida alla Spiaggia Sabbioni',
    'Spiaggia dei Sabbioni in una giornata soleggiata',
    'Dettaglio della spiaggia di ciottoli a Riva del Garda',
    'Famiglie e visitatori alla Spiaggia Sabbioni',
    'Vista del lago e delle montagne dalla spiaggia',
    'Angolo panoramico vicino a Spiaggia Sabbioni',
    'Riva del Garda e il litorale dei Sabbioni',
    'Passeggiata e servizi vicino alla spiaggia',
    'Spiaggia Sabbioni al tramonto sul Lago di Garda',
  ],
  en: [
    'Spiaggia Sabbioni in Riva del Garda overlooking Lake Garda',
    'Lakeside promenade near Spiaggia Sabbioni',
    'Swimming area at Spiaggia Sabbioni',
    'Mountain panorama above Spiaggia Sabbioni',
    'Spiaggia Sabbioni lakeside relaxation area',
    'Open shoreline view at Spiaggia Sabbioni',
    'Promenade walk in Riva del Garda',
    'Clear water at Spiaggia Sabbioni',
    'Spiaggia dei Sabbioni on a sunny day',
    'Pebble beach detail in Riva del Garda',
    'Families and visitors at Spiaggia Sabbioni',
    'Lake and mountain view from the beach',
    'Scenic corner near Spiaggia Sabbioni',
    'Riva del Garda waterfront by Sabbioni Beach',
    'Walkway and services near the beach',
    'Spiaggia Sabbioni at sunset on Lake Garda',
  ],
  de: [
    'Spiaggia Sabbioni in Riva del Garda mit Blick auf den Gardasee',
    'Uferpromenade nahe der Spiaggia Sabbioni',
    'Badebereich an der Spiaggia Sabbioni',
    'Bergpanorama oberhalb der Spiaggia Sabbioni',
    'Ruhebereich an der Spiaggia Sabbioni am See',
    'Offener Uferblick an der Spiaggia Sabbioni',
    'Spazierweg an der Promenade von Riva del Garda',
    'Klares Wasser an der Spiaggia Sabbioni',
    'Spiaggia dei Sabbioni an einem sonnigen Tag',
    'Detail des Kiesstrands in Riva del Garda',
    'Familien und Besucher an der Spiaggia Sabbioni',
    'Blick auf See und Berge vom Strand',
    'Panoramapunkt nahe der Spiaggia Sabbioni',
    'Uferbereich von Riva del Garda bei Sabbioni',
    'Weg und Service in Strandnähe',
    'Spiaggia Sabbioni bei Sonnenuntergang am Gardasee',
  ],
  'zh-Hant': [
    '里瓦德爾加爾達 Spiaggia Sabbioni 與加爾達湖景觀',
    'Spiaggia Sabbioni 附近的湖濱步道',
    'Spiaggia Sabbioni 的游泳區域',
    'Spiaggia Sabbioni 上方的山景全景',
    'Spiaggia Sabbioni 湖畔休憩區',
    'Spiaggia Sabbioni 開闊湖岸景色',
    '里瓦德爾加爾達湖濱散步道',
    'Spiaggia Sabbioni 清澈的湖水',
    '晴天中的 Spiaggia dei Sabbioni',
    '里瓦德爾加爾達礫石沙灘細節',
    'Spiaggia Sabbioni 的家庭與遊客區域',
    '從沙灘望向湖泊與群山的景色',
    'Spiaggia Sabbioni 附近的觀景角落',
    '里瓦德爾加爾達 Sabbioni 湖岸',
    '沙灘附近的步道與設施',
    '加爾達湖畔黃昏時的 Spiaggia Sabbioni',
  ],
} as const;

export default function Gallery() {
  const t = useTranslations('gallery');
  const locale = useLocale() as keyof typeof captionsByLocale;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<{ src: string; caption: string } | null>(null);

  const captions = captionsByLocale[locale] ?? captionsByLocale.en;
  const galleryImages = gallerySources.map((src, index) => ({
    src,
    caption: captions[index] ?? captionsByLocale.en[index],
  }));

  const itemsPerPage = 6;
  const totalPages = Math.ceil(galleryImages.length / itemsPerPage);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const openModal = (src: string, caption: string) => {
    setSelectedImage({ src, caption });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  const currentImages = galleryImages.slice(
    currentIndex * itemsPerPage,
    (currentIndex + 1) * itemsPerPage
  );

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
          <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>{t('subtitle')}</p>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            {t('sourceText', { year: 2026 })}
          </p>
        </div>

        <div className="relative">
          <div className="gallery-grid">
            {currentImages.map((photo, i) => (
              <div 
                key={i} 
                className="relative group overflow-hidden rounded-lg cursor-pointer"
                onClick={() => openModal(photo.src, photo.caption)}
              >
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

          <div className="flex justify-between items-center mt-8">
            <button 
              onClick={handlePrev}
              className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-800 transition-colors"
              aria-label="Previous page"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            
            <a 
              href={GOOGLE_MAPS_URL}
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm font-medium hover:underline flex items-center gap-2"
              style={{ color: 'var(--accent)' }}
            >
              {t('viewAllOnMaps')}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </a>

            <button 
              onClick={handleNext}
              className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-800 transition-colors"
              aria-label="Next page"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        </div>

        {/* Modal for viewing original image */}
        {isModalOpen && selectedImage && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            onClick={closeModal}
          >
            <button 
              className="absolute top-4 right-4 text-white hover:text-gray-300 p-2"
              onClick={closeModal}
              aria-label="Close modal"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <img 
              src={selectedImage.src}
              alt={selectedImage.caption}
              className="max-w-full max-h-[90vh] object-contain rounded"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}
      </div>
    </section>
  );
}
