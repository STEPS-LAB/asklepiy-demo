'use client';

import { createContext, useContext, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import type { Locale } from '@/types';

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

// This provider is now just for client-side locale switching
export function LocaleProvider({ children, initialLocale }: { children: React.ReactNode; initialLocale: Locale }) {
  const router = useRouter();

  const setLocale = useCallback((newLocale: Locale) => {
    // Save to localStorage for client-side persistence
    localStorage.setItem('locale', newLocale);
    // Save to cookie for middleware to use on navigation
    document.cookie = `locale=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
    
    // Update URL with new locale
    const currentPath = window.location.pathname;
    const pathWithoutLocale = currentPath.replace(/^\/(ua|en)/, '');
    router.push(`/${newLocale}${pathWithoutLocale}`);
  }, [router]);

  const toggleLocale = useCallback(() => {
    const newLocale: Locale = initialLocale === 'ua' ? 'en' : 'ua';
    setLocale(newLocale);
  }, [initialLocale, setLocale]);

  return (
    <LocaleContext.Provider value={{ locale: initialLocale, setLocale, toggleLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
}
