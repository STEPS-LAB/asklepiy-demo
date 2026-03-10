'use client';

import { useLocale } from '@/contexts';
import { motion } from 'framer-motion';
import { Building2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useRef, TouchEvent } from 'react';

const partners = [
  { id: 1, name: 'Полісся', nameEn: 'Polissia' },
  { id: 2, name: 'TRX Pantera Club', nameEn: 'TRX Pantera Club' },
  { id: 3, name: 'Атмосфера', nameEn: 'Atmosfera' },
  { id: 4, name: 'Vuso', nameEn: 'Vuso' },
  { id: 5, name: 'Savitar Group', nameEn: 'Savitar Group' },
  { id: 6, name: 'CSD Lab', nameEn: 'CSD Lab' },
];

const VISIBLE_PARTNERS = 3;

export function PartnersSection() {
  const { locale } = useLocale();
  const [startIndex, setStartIndex] = useState(0);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  const visiblePartners = partners.slice(startIndex, startIndex + VISIBLE_PARTNERS);

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setStartIndex((prev) => Math.min(partners.length - VISIBLE_PARTNERS, prev + 1));
  };

  const canGoPrev = startIndex > 0;
  const canGoNext = startIndex < partners.length - VISIBLE_PARTNERS;

  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
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

        {/* Partners Grid with Navigation */}
        <div className="relative">
          <div 
            className="grid grid-cols-3 md:grid-cols-6 gap-6"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {visiblePartners.map((partner, index) => (
              <motion.div
                key={partner.id}
                className="flex items-center justify-center p-6 bg-medical-surface-50 rounded-sm hover:bg-medical-accent-50 transition-colors"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="text-center">
                  <Building2 className="w-12 h-12 text-medical-accent-400 mx-auto mb-2" />
                  <span className="text-sm font-medium text-medical-text-secondary">
                    {locale === 'ua' ? partner.name : partner.nameEn}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Desktop Navigation Arrows */}
          <div className="absolute -top-20 right-0 flex gap-2 max-md:hidden">
            <button
              onClick={handlePrev}
              disabled={!canGoPrev}
              className={`w-12 h-12 rounded-full border-2 border-medical-accent-500 flex items-center justify-center transition-colors ${
                !canGoPrev
                  ? 'opacity-30 cursor-not-allowed'
                  : 'hover:bg-medical-accent-500 hover:text-white'
              }`}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNext}
              disabled={!canGoNext}
              className={`w-12 h-12 rounded-full border-2 border-medical-accent-500 flex items-center justify-center transition-colors ${
                !canGoNext
                  ? 'opacity-30 cursor-not-allowed'
                  : 'hover:bg-medical-accent-500 hover:text-white'
              }`}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Mobile Navigation */}
          <div className="flex md:hidden justify-center gap-2 mt-6">
            <button
              onClick={handlePrev}
              disabled={!canGoPrev}
              className={`w-10 h-10 rounded-full border-2 border-medical-accent-500 flex items-center justify-center transition-colors ${
                !canGoPrev
                  ? 'opacity-30 cursor-not-allowed'
                  : 'hover:bg-medical-accent-500 hover:text-white'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              disabled={!canGoNext}
              className={`w-10 h-10 rounded-full border-2 border-medical-accent-500 flex items-center justify-center transition-colors ${
                !canGoNext
                  ? 'opacity-30 cursor-not-allowed'
                  : 'hover:bg-medical-accent-500 hover:text-white'
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
