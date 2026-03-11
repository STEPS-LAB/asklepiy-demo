'use client';

import { useLocale } from '@/contexts';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, TouchEvent, useCallback, useEffect } from 'react';
import { Building2, ChevronLeft, ChevronRight } from 'lucide-react';

const partners = [
  { id: 1, name: 'Полісся', nameEn: 'Polissia' },
  { id: 2, name: 'TRX Pantera Club', nameEn: 'TRX Pantera Club' },
  { id: 3, name: 'Атмосфера', nameEn: 'Atmosfera' },
  { id: 4, name: 'Vuso', nameEn: 'Vuso' },
  { id: 5, name: 'Savitar Group', nameEn: 'Savitar Group' },
  { id: 6, name: 'CSD Lab', nameEn: 'CSD Lab' },
];

const VISIBLE_PARTNERS_MOBILE = 3;

// Animation variants for smooth sliding
const sliderVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -100 : 100,
    opacity: 0,
  }),
};

export function PartnersSection() {
  const { locale } = useLocale();
  const [startIndex, setStartIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  // Handle responsive visible partners count
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const visiblePartnersCount = isMobile ? VISIBLE_PARTNERS_MOBILE : partners.length;
  const visiblePartners = partners.slice(startIndex, startIndex + visiblePartnersCount);

  const handlePrev = useCallback(() => {
    if (isAnimating || startIndex === 0) return;
    setSlideDirection(-1);
    setStartIndex((prev) => Math.max(0, prev - 1));
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 400);
  }, [isAnimating, startIndex]);

  const handleNext = useCallback(() => {
    if (isAnimating || startIndex >= partners.length - visiblePartnersCount) return;
    setSlideDirection(1);
    setStartIndex((prev) => Math.min(partners.length - visiblePartnersCount, prev + 1));
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 400);
  }, [isAnimating, startIndex, visiblePartnersCount]);

  const canGoPrev = startIndex > 0;
  const canGoNext = startIndex < partners.length - visiblePartnersCount;

  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = 0;
  };

  const handleTouchMove = (e: TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (isAnimating) return;
    const swipeThreshold = 50;
    const diff = touchStartX.current - touchEndX.current;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0 && canGoNext) {
        handleNext();
      } else if (diff < 0 && canGoPrev) {
        handlePrev();
      }
    }
  };

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-secondary text-2xl md:text-3xl font-medium text-medical-primary-900 mb-2">
            {locale === 'ua' ? 'Наші партнери' : 'Our Partners'}
          </h2>
          <p className="text-medical-text-secondary">
            {locale === 'ua'
              ? 'Надійні партнери для якісної медицини'
              : 'Reliable partners for quality medicine'}
          </p>
        </motion.div>

        {/* Partners Slider with Navigation */}
        <div className="relative">
          {/* Partners Grid */}
          <div
            className={`grid gap-4 ${isMobile ? 'overflow-hidden' : ''}`}
            style={{ gridTemplateColumns: isMobile ? `repeat(${VISIBLE_PARTNERS_MOBILE}, 1fr)` : `repeat(${partners.length}, 1fr)` }}
            onTouchStart={isMobile ? handleTouchStart : undefined}
            onTouchMove={isMobile ? handleTouchMove : undefined}
            onTouchEnd={isMobile ? handleTouchEnd : undefined}
          >
            <AnimatePresence mode="wait" initial={false}>
              {visiblePartners.map((partner, index) => (
                <motion.div
                  key={`${partner.id}-${startIndex}`}
                  className="relative flex flex-col items-center justify-end p-4 bg-medical-surface-50 rounded-sm hover:bg-medical-accent-50 transition-colors min-h-[140px]"
                  initial={{ opacity: 0, scale: 0.9, x: slideDirection * 100 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.9, x: -slideDirection * 100 }}
                  transition={{ delay: index * 0.03, duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="absolute top-4 left-1/2 -translate-x-1/2">
                    <Building2 className="w-10 h-10 text-medical-accent-400" />
                  </div>
                  <span className="text-xs font-medium text-medical-text-secondary text-center">
                    {locale === 'ua' ? partner.name : partner.nameEn}
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Navigation Arrows - Mobile only (below slider) */}
          {isMobile && (
            <div className="flex sm:hidden justify-center gap-3 mt-6">
              <button
                onClick={handlePrev}
                disabled={!canGoPrev || isAnimating}
                className={`w-10 h-10 rounded-full border-2 border-medical-accent-500 flex items-center justify-center transition-all active:scale-95 ${
                  !canGoPrev || isAnimating
                    ? 'opacity-30 cursor-not-allowed'
                    : 'hover:bg-medical-accent-500 hover:text-white'
                }`}
                aria-label="Previous"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                disabled={!canGoNext || isAnimating}
                className={`w-10 h-10 rounded-full border-2 border-medical-accent-500 flex items-center justify-center transition-all active:scale-95 ${
                  !canGoNext || isAnimating
                    ? 'opacity-30 cursor-not-allowed'
                    : 'hover:bg-medical-accent-500 hover:text-white'
                }`}
                aria-label="Next"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
