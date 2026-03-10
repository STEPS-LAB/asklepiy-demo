'use client';

import { createContext, useContext, useCallback, useState, useEffect } from 'react';
import type { Locale } from '@/types';

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

// Client-side locale switching without navigation
export function LocaleProvider({ children, initialLocale }: { children: React.ReactNode; initialLocale: Locale }) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);
  const [isMounted, setIsMounted] = useState(false);

  // On mount, check localStorage for saved locale preference
  useEffect(() => {
    setIsMounted(true);
    const savedLocale = localStorage.getItem('locale') as Locale | null;
    if (savedLocale && (savedLocale === 'ua' || savedLocale === 'en')) {
      setLocaleState(savedLocale);
    }
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    if (newLocale === locale) return;
    
    // Save to localStorage for client-side persistence
    localStorage.setItem('locale', newLocale);
    
    // Save to cookie for server-side persistence (used on full page reload)
    document.cookie = `locale=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
    
    // Update state - content will update via useTranslations hook
    setLocaleState(newLocale);
    
    // Dispatch custom event for components to react to locale change
    window.dispatchEvent(new CustomEvent('localechange', { detail: { locale: newLocale } }));
  }, [locale]);

  const toggleLocale = useCallback(() => {
    const newLocale: Locale = locale === 'ua' ? 'en' : 'ua';
    setLocale(newLocale);
  }, [locale, setLocale]);

  // During SSR or before mount, use the initialLocale
  if (!isMounted) {
    return (
      <LocaleContext.Provider value={{ locale: initialLocale, setLocale, toggleLocale }}>
        {children}
      </LocaleContext.Provider>
    );
  }

  return (
    <LocaleContext.Provider value={{ locale, setLocale, toggleLocale }}>
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
