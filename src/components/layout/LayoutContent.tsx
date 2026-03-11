'use client';

import { useState } from 'react';
import { Header, Footer } from '@/components/layout';
import { BookingModal } from '@/features/booking';
import { AIAssistant } from '@/features/ai-assistant';

export function LayoutContent({ children }: { children: React.ReactNode }) {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <>
      <Header onOpenBooking={() => setIsBookingOpen(true)} />
      <main className="flex-1 pt-20 overflow-x-hidden">{children}</main>
      <Footer />
      <AIAssistant />
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </>
  );
}
