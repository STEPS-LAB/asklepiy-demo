'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
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
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={onClose}
        className="p-2 text-medical-text-secondary hover:text-medical-primary-900 transition-colors"
        aria-label="Close menu"
      >
        <X className="w-6 h-6" />
      </motion.button>
    </div>
  );
}

// Navigation Link Component
function NavLink({
  href,
  label,
  onClick,
  delay,
}: {
  href: string;
  label: string;
  onClick: () => void;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30,
        delay,
      }}
    >
      <Link
        href={href}
        onClick={onClick}
        className="flex items-center justify-between px-6 py-5 text-medical-primary-900 font-medium text-lg hover:bg-medical-surface-100/50 rounded-lg mx-4 transition-colors group"
      >
        <span>{label}</span>
        <ChevronRight className="w-5 h-5 text-medical-text-tertiary group-hover:text-medical-primary-900 transition-colors" />
      </Link>
    </motion.div>
  );
}

// Contact Section Component
function ContactSection({ locale }: { locale: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30, delay: 0.4 }}
      className="px-6 py-6"
    >
      <h3 className="text-medical-text-secondary font-medium text-base mb-4">
        {locale === 'ua' ? 'Контакти' : 'Contacts'}
      </h3>

      {/* Phone Numbers */}
      <div className="space-y-4 mb-6">
        {contactNumbers.map((contact, index) => (
          <motion.a
            key={contact.href}
            href={contact.href}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30,
              delay: 0.5 + index * 0.05,
            }}
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
          </motion.a>
        ))}
      </div>

      {/* Working Hours */}
      <motion.div
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 10 }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 30,
          delay: 0.65,
        }}
        className="flex items-start gap-4 py-4 border-t border-b border-medical-surface-200/50 mb-4"
      >
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
      </motion.div>

      {/* Email */}
      <motion.a
        href="mailto:info@asklepiy.com"
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 10 }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 30,
          delay: 0.7,
        }}
        className="flex items-center gap-4 group"
      >
        <div className="w-10 h-10 rounded-full bg-cyan-50/80 flex items-center justify-center flex-shrink-0">
          <Mail className="w-4 h-4 text-medical-accent-600" />
        </div>
        <span className="text-medical-primary-900 font-medium text-base group-hover:text-medical-accent-600 transition-colors">
          info@asklepiy.com
        </span>
      </motion.a>
    </motion.div>
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
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30, delay: 0.8 }}
      className="px-6 pb-8 pt-4 mt-auto"
    >
      <Button
        size="lg"
        className="w-full bg-[#003d6b] hover:bg-[#002f55] text-white font-medium text-lg py-4 rounded-lg shadow-medical-lg transition-all hover:shadow-medical-xl pb-[max(1rem,env(safe-area-inset-bottom))]"
        onClick={onOpenBooking}
      >
        {locale === 'ua' ? 'Записатися на прийом' : 'Book Appointment'}
      </Button>
    </motion.div>
  );
}

// Main Burger Menu Component
export function BurgerMenu({ isOpen, onClose, onOpenBooking }: BurgerMenuProps) {
  const { locale } = useLocale();
  const menuRef = useRef<HTMLDivElement>(null);

  // Scroll lock logic - robust implementation
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
      document.body.style.overflowX = 'hidden';
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.overflow = '';
      document.body.style.overflowX = '';
      document.body.style.touchAction = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }

    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
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

  const handleNavClick = () => {
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-medical-primary-900/50 backdrop-blur-sm z-[9998]"
            onClick={onClose}
          />

          {/* Menu Panel */}
          <motion.div
            ref={menuRef}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30,
              mass: 1,
            }}
            className="fixed top-0 right-0 h-[100dvh] w-full max-w-md bg-slate-50/98 backdrop-blur-md z-[9999] overflow-y-auto overflow-x-hidden -webkit-overflow-scrolling-touch transform-gpu"
            style={{
              willChange: 'transform, opacity',
            }}
          >
            <div className="flex flex-col min-h-full">
              {/* Header */}
              <MenuHeader onClose={onClose} locale={locale} />

              {/* Navigation Links */}
              <nav className="flex-1 py-6">
                {navLinks.map((link, index) => (
                  <NavLink
                    key={link.href}
                    href={link.href}
                    label={locale === 'ua' ? link.label : link.labelEn}
                    onClick={handleNavClick}
                    delay={0.1 + index * 0.05}
                  />
                ))}
              </nav>

              {/* Contact Section */}
              <ContactSection locale={locale} />

              {/* Action Footer */}
              <ActionFooter onOpenBooking={onOpenBooking} locale={locale} />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
