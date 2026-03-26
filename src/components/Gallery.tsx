'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

const galleryImages = [
  { src: '/gallery/images (1).jpg', caption: 'Spiaggia Sabbioni View 1' },
  { src: '/gallery/images (2).jpg', caption: 'Spiaggia Sabbioni View 2' },
  { src: '/gallery/images (3).jpg', caption: 'Spiaggia Sabbioni View 3' },
  { src: '/gallery/images (4).jpg', caption: 'Spiaggia Sabbioni View 4' },
  { src: '/gallery/images (5).jpg', caption: 'Spiaggia Sabbioni View 5' },
  { src: '/gallery/images (6).jpg', caption: 'Spiaggia Sabbioni View 6' },
  { src: '/gallery/images (7).jpg', caption: 'Spiaggia Sabbioni View 7' },
  { src: '/gallery/images (8).jpg', caption: 'Spiaggia Sabbioni View 8' },
  { src: '/gallery/images (9).jpg', caption: 'Spiaggia Sabbioni View 9' },
  { src: '/gallery/images (10).jpg', caption: 'Spiaggia Sabbioni View 10' },
  { src: '/gallery/images (11).jpg', caption: 'Spiaggia Sabbioni View 11' },
  { src: '/gallery/images (12).jpg', caption: 'Spiaggia Sabbioni View 12' },
  { src: '/gallery/images (13).jpg', caption: 'Spiaggia Sabbioni View 13' },
  { src: '/gallery/images (14).jpg', caption: 'Spiaggia Sabbioni View 14' },
  { src: '/gallery/images (15).jpg', caption: 'Spiaggia Sabbioni View 15' },
  { src: '/gallery/images (16).jpg', caption: 'Spiaggia Sabbioni View 16' },
];

export default function Gallery() {
  const t = useTranslations('gallery');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const itemsPerPage = 6;
  const totalPages = Math.ceil(galleryImages.length / itemsPerPage);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const openModal = (src: string) => {
    setSelectedImage(src);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
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
                onClick={() => openModal(photo.src)}
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
              href="https://maps.app.goo.gl/RrA7BBiR2AGERVzbA" 
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
              src={selectedImage} 
              alt="Original size" 
              className="max-w-full max-h-[90vh] object-contain rounded"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}
      </div>
    </section>
  );
}
