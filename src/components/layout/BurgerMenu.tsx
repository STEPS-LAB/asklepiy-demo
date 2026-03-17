'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import Link from 'next/link';
import { X, ChevronRight, Phone, Clock, Mail } from 'lucide-react';
import { useLocale } from '@/contexts';
import { Button } from '@/components/ui';

interface BurgerMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBooking?: () => void;
}

const navLinks = [
  { href: '/directions', label: 'Напрямки', labelEn: 'Services' },
  { href: '/analyses', label: 'Послуги', labelEn: 'Services' },
  { href: '/news', label: 'Новини', labelEn: 'News' },
  { href: '/asklepiy-rodyna', label: 'Заключити декларацію', labelEn: 'Sign Declaration' },
  { href: '/about', label: 'Про нас', labelEn: 'About' },
  { href: '/contacts', label: 'Контакти', labelEn: 'Contacts' },
];

const contactNumbers = [
  { label: 'Реєстратура', labelEn: 'Reception', phone: '+38 (0412) 12-34-56', href: 'tel:+380412123456' },
  { label: 'Діагностичний центр', labelEn: 'Diagnostic Center', phone: '+38 (0412) 23-45-67', href: 'tel:+380412234567' },
  { label: 'Педіатрія', labelEn: 'Pediatrics', phone: '+38 (0412) 34-56-78', href: 'tel:+380412345678' },
];

const workingHours = {
  weekdays: { ua: 'Пн-Пт', en: 'Mon-Fri', hours: '8:00 - 20:00' },
  saturday: { ua: 'Сб', en: 'Sat', hours: '9:00 - 17:00' },
  sunday: { ua: 'Нд', en: 'Sun', hours: '9:00 - 15:00' },
};

// Menu Header Component
function MenuHeader({ onClose, locale }: { onClose: () => void; locale: string }) {
  return (
    <div className="flex items-center justify-between px-6 py-5 border-b border-medical-surface-200/50">
      <div className="flex flex-col">
        <span className="text-medical-primary-900 font-secondary text-xl font-medium">
          {locale === 'ua' ? 'Асклепій' : 'Asklepiy'}
        </span>
        <span className="text-medical-text-tertiary text-sm mt-0.5">
          {locale === 'ua' ? 'Медичний центр' : 'Medical Center'}
        </span>
      </div>
      <button
        onClick={onClose}
        className="p-2 text-medical-text-secondary hover:text-medical-primary-900 transition-colors"
        aria-label="Close menu"
      >
        <X className="w-6 h-6" />
      </button>
    </div>
  );
}

// Navigation Link Component
function NavLink({
  href,
  label,
  onClick,
}: {
  href: string;
  label: string;
  onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}) {
  return (
    <div>
      <Link
        href={href}
        onClick={onClick}
        className="flex items-center justify-between px-6 py-5 text-medical-primary-900 font-medium text-lg hover:bg-medical-surface-100/50 rounded-lg mx-4 transition-colors group"
      >
        <span>{label}</span>
        <ChevronRight className="w-5 h-5 text-medical-text-tertiary group-hover:text-medical-primary-900 transition-colors" />
      </Link>
    </div>
  );
}

// Contact Section Component
function ContactSection({ locale }: { locale: string }) {
  return (
    <div className="px-6 py-6">
      <h3 className="text-medical-text-secondary font-medium text-base mb-4">
        {locale === 'ua' ? 'Контакти' : 'Contacts'}
      </h3>

      {/* Phone Numbers */}
      <div className="space-y-4 mb-6">
        {contactNumbers.map((contact) => (
          <a
            key={contact.href}
            href={contact.href}
            className="flex items-center gap-4 group"
          >
            <div className="w-10 h-10 rounded-full bg-cyan-50/80 flex items-center justify-center flex-shrink-0">
              <Phone className="w-4 h-4 text-medical-accent-600" />
            </div>
            <div className="flex flex-col">
              <span className="text-medical-text-tertiary text-sm">
                {locale === 'ua' ? contact.label : contact.labelEn}
              </span>
              <span className="text-medical-primary-900 font-semibold text-base group-hover:text-medical-accent-600 transition-colors">
                {contact.phone}
              </span>
            </div>
          </a>
        ))}
      </div>

      {/* Working Hours */}
      <div className="flex items-start gap-4 py-4 border-t border-b border-medical-surface-200/50 mb-4">
        <div className="w-10 h-10 rounded-full bg-cyan-50/80 flex items-center justify-center flex-shrink-0">
          <Clock className="w-4 h-4 text-medical-accent-600" />
        </div>
        <div className="flex flex-col">
          <span className="text-medical-primary-900 font-medium text-base mb-2">
            {locale === 'ua' ? 'Графік роботи' : 'Working Hours'}
          </span>
          <div className="space-y-1 text-medical-text-secondary text-sm">
            <div className="flex justify-between gap-4">
              <span>{locale === 'ua' ? workingHours.weekdays.ua : workingHours.weekdays.en}:</span>
              <span className="text-medical-text-primary">{workingHours.weekdays.hours}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span>{locale === 'ua' ? workingHours.saturday.ua : workingHours.saturday.en}:</span>
              <span className="text-medical-text-primary">{workingHours.saturday.hours}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span>{locale === 'ua' ? workingHours.sunday.ua : workingHours.sunday.en}:</span>
              <span className="text-medical-text-primary">{workingHours.sunday.hours}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Email */}
      <a
        href="mailto:info@asklepiy.com"
        className="flex items-center gap-4 group"
      >
        <div className="w-10 h-10 rounded-full bg-cyan-50/80 flex items-center justify-center flex-shrink-0">
          <Mail className="w-4 h-4 text-medical-accent-600" />
        </div>
        <span className="text-medical-primary-900 font-medium text-base group-hover:text-medical-accent-600 transition-colors">
          info@asklepiy.com
        </span>
      </a>
    </div>
  );
}

// Action Footer Component
function ActionFooter({
  onOpenBooking,
  locale,
}: {
  onOpenBooking?: () => void;
  locale: string;
}) {
  const handleClick = useCallback(() => {
    onOpenBooking?.();
  }, [onOpenBooking]);

  return (
    <div className="px-6 pb-8 pt-4 mt-auto">
      <Button
        size="lg"
        className="w-full bg-[#003d6b] hover:bg-[#002f55] text-white font-medium text-lg py-4 rounded-lg shadow-medical-lg transition-all hover:shadow-medical-xl pb-[max(1rem,env(safe-area-inset-bottom))]"
        onClick={handleClick}
      >
        {locale === 'ua' ? 'Записатися на прийом' : 'Book Appointment'}
      </Button>
    </div>
  );
}

// Main Burger Menu Component
export function BurgerMenu({ isOpen, onClose, onOpenBooking }: BurgerMenuProps) {
  const { locale } = useLocale();
  const menuRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Handle mount state
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Handle open animation
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      // Small delay to allow element to mount before animating
      const timer = setTimeout(() => {
        setIsAnimating(true);
      }, 10);
      return () => clearTimeout(timer);
    } else {
      setIsAnimating(false);
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Scroll lock logic
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.overflowX = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = '';
      document.body.style.overflowX = '';
      document.body.style.touchAction = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.overflowX = '';
      document.body.style.touchAction = '';
    };
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    // Scroll to top immediately
    window.scrollTo(0, 0);
    onClose();
    // Navigate after a short delay to ensure scroll happens
    const href = e.currentTarget.href;
    // Use requestAnimationFrame to ensure scroll is processed
    requestAnimationFrame(() => {
      window.location.href = href;
    });
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isMounted) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-medical-primary-900/50 backdrop-blur-sm transition-opacity duration-300 ease-in-out"
        style={{ 
          zIndex: 99998,
          opacity: isAnimating ? 1 : 0,
          pointerEvents: isAnimating ? 'auto' : 'none'
        }}
        onClick={handleBackdropClick}
        aria-hidden="true"
      />

      {/* Menu Panel */}
      {shouldRender && (
        <div
          ref={menuRef}
          id="burger-menu"
          className="fixed top-0 right-0 h-[100dvh] w-full max-w-md bg-slate-50/98 backdrop-blur-md overflow-y-auto overflow-x-hidden"
          style={{ 
            zIndex: 99999,
            transform: isAnimating ? 'translateX(0)' : 'translateX(100%)',
            transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            willChange: 'transform'
          }}
          role="dialog"
          aria-modal="true"
          aria-label={locale === 'ua' ? 'Меню навігації' : 'Navigation menu'}
        >
          <div className="flex flex-col min-h-full">
            {/* Header */}
            <MenuHeader onClose={onClose} locale={locale} />

            {/* Navigation Links */}
            <nav className="flex-1 py-6">
              {navLinks.map((link) => (
                <NavLink
                  key={link.href}
                  href={link.href}
                  label={locale === 'ua' ? link.label : link.labelEn}
                  onNavigate={() => handleNavClick(link.href)}
                />
              ))}
            </nav>

            {/* Contact Section */}
            <ContactSection locale={locale} />

            {/* Action Footer */}
            <ActionFooter onOpenBooking={onOpenBooking} locale={locale} />
          </div>
        </div>
      )}
    </>
  );
}
