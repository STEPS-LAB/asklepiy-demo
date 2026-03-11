'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import { Header, Footer } from '@/components/layout';

// Dynamic imports for heavy components (loaded on demand)
const BookingModal = dynamic(
  () => import('@/features/booking').then((mod) => mod.BookingModal),
  { 
    loading: () => null,
    ssr: false,
  }
);

const AIAssistant = dynamic(
  () => import('@/features/ai-assistant').then((mod) => mod.AIAssistant),
  { 
    loading: () => null,
    ssr: false,
  }
);

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
