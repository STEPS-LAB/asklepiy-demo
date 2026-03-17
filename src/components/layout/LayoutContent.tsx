'use client';

import { useState, useEffect } from 'react';
import { Header, Footer, ScrollToTop } from '@/components/layout';
import { BookingModal } from '@/features/booking';
import { AIAssistant } from '@/features/ai-assistant';
import { useLocale } from '@/contexts';

export function LayoutContent({ children }: { children: React.ReactNode }) {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [showSkipLink, setShowSkipLink] = useState(false);
  const { locale } = useLocale();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        setShowSkipLink(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const skipToMain = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const main = document.querySelector('main');
    if (main) {
      main.setAttribute('tabindex', '-1');
      main.focus();
      main.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <ScrollToTop />
      <a
        href="#main-content"
        onClick={skipToMain}
        className={`sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-medical-primary-900 focus:rounded-sm focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-medical-accent-600 ${showSkipLink ? 'focus:not-sr-only' : ''}`}
      >
        {locale === 'ua' ? 'Перейти до основного контенту' : 'Skip to main content'}
      </a>
      <Header onOpenBooking={() => setIsBookingOpen(true)} />
      <main id="main-content" className="flex-1 pt-20 overflow-x-hidden" tabIndex={-1}>
        {children}
      </main>
      <Footer />
      <AIAssistant />
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </>
  );
}
