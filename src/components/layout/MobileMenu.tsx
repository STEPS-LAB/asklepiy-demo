'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone, Mail, Clock, ChevronRight } from 'lucide-react';
import { useLocale } from '@/contexts';
import { cn } from '@/lib/utils';
import { useEffect, useCallback } from 'react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: { href: string; label: string; labelEn: string }[];
}

const contactNumbers = [
  { label: 'Реєстратура', labelEn: 'Reception', phone: '+38 (0412) 12-34-56' },
  { label: 'Діагностичний центр', labelEn: 'Diagnostic Center', phone: '+38 (0412) 23-45-67' },
  { label: 'Педіатрія', labelEn: 'Pediatrics', phone: '+38 (0412) 34-56-78' },
];

export function MobileMenu({ isOpen, onClose, navLinks }: MobileMenuProps) {
  const { locale } = useLocale();

  // Prevent body scroll on iOS more reliably
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
      }
    }
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop - optimized for iOS */}
          <motion.div
            className="fixed inset-0 bg-medical-primary-900/60 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            onClick={onClose}
          />

          {/* Menu Panel - optimized for iOS with hardware acceleration */}
          <motion.div
            className="fixed inset-y-0 right-0 w-full max-w-md bg-white z-40 overflow-y-auto -webkit-overflow-scrolling-touch"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ 
              duration: 0.35, 
              ease: [0.32, 0.72, 0, 1],
              type: 'tween'
            }}
            style={{ 
              transform: 'translateZ(0)',
              WebkitTransform: 'translateZ(0)',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-medical-surface-200">
              <div>
                <span className="block text-medical-primary-900 font-secondary font-medium text-xl">
                  {locale === 'ua' ? 'Асклепій' : 'Asklepiy'}
                </span>
                <span className="block text-medical-text-tertiary text-sm">
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

            {/* Navigation */}
            <nav className="p-6">
              <ul className="space-y-2">
                {navLinks.map((link, index) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.2 }}
                  >
                    <a
                      href={link.href}
                      className="flex items-center justify-between py-4 px-4 rounded-sm text-medical-text-primary hover:bg-medical-accent-50 transition-colors group"
                      onClick={onClose}
                    >
                      <span className="font-medium text-lg">
                        {locale === 'ua' ? link.label : link.labelEn}
                      </span>
                      <ChevronRight className="w-5 h-5 text-medical-text-tertiary group-hover:text-medical-accent-600 transition-colors" />
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>

            {/* Contact Numbers */}
            <div className="px-6 py-4 border-t border-medical-surface-200">
              <h3 className="text-sm font-medium text-medical-text-tertiary mb-4">
                {locale === 'ua' ? 'Контакти' : 'Contacts'}
              </h3>
              <ul className="space-y-3">
                {contactNumbers.map((contact, index) => (
                  <motion.li
                    key={contact.phone}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.05, duration: 0.2 }}
                  >
                    <a
                      href={`tel:${contact.phone.replace(/\D/g, '')}`}
                      className="flex items-center gap-3 py-2 px-4 rounded-sm hover:bg-medical-surface-100 transition-colors"
                    >
                      <div className="w-8 h-8 bg-medical-accent-100 rounded-full flex items-center justify-center">
                        <Phone className="w-4 h-4 text-medical-accent-600" />
                      </div>
                      <div>
                        <span className="block text-xs text-medical-text-tertiary">
                          {locale === 'ua' ? contact.label : contact.labelEn}
                        </span>
                        <span className="block text-medical-primary-900 font-medium">
                          {contact.phone}
                        </span>
                      </div>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Working Hours */}
            <div className="px-6 py-4 border-t border-medical-surface-200">
              <div className="flex items-start gap-3 py-3 px-4 rounded-sm">
                <Clock className="w-5 h-5 text-medical-accent-600 mt-0.5" />
                <div>
                  <span className="block text-sm font-medium text-medical-primary-900">
                    {locale === 'ua' ? 'Графік роботи' : 'Working hours'}
                  </span>
                  <span className="block text-sm text-medical-text-secondary">
                    {locale === 'ua'
                      ? 'Пн-Пт: 8:00 - 20:00'
                      : 'Mon-Fri: 8:00 - 20:00'}
                  </span>
                  <span className="block text-sm text-medical-text-secondary">
                    {locale === 'ua'
                      ? 'Сб: 9:00 - 17:00'
                      : 'Sat: 9:00 - 17:00'}
                  </span>
                  <span className="block text-sm text-medical-text-secondary">
                    {locale === 'ua'
                      ? 'Нд: 9:00 - 15:00'
                      : 'Sun: 9:00 - 15:00'}
                  </span>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="px-6 py-4 border-t border-medical-surface-200">
              <a
                href="mailto:info@asklepiy.com"
                className="flex items-center gap-3 py-3 px-4 rounded-sm hover:bg-medical-surface-100 transition-colors"
              >
                <Mail className="w-5 h-5 text-medical-accent-600" />
                <span className="text-medical-primary-900 font-medium">info@asklepiy.com</span>
              </a>
            </div>

            {/* CTA Button */}
            <div className="p-6 border-t border-medical-surface-200">
              <a
                href="/booking"
                className={cn(
                  'flex items-center justify-center w-full py-4 rounded-sm',
                  'bg-medical-primary-900 text-white font-medium',
                  'hover:bg-medical-primary-800 transition-colors'
                )}
              >
                {locale === 'ua' ? 'Записатися на прийом' : 'Book appointment'}
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
