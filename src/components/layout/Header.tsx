'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLocale } from '@/contexts';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, Search, User, Mail, Clock, Send } from 'lucide-react';
import { Button, LanguageSwitcher } from '@/components/ui';
import { cn } from '@/lib/utils';
import { fadeInDownVariants, staggerContainerVariants, staggerItemVariants } from '@/lib/motion';
import { MobileMenu } from './MobileMenu';

const phoneNumbers = [
  { prefix: '+38 (067)', number: '183 85 16', full: '+380671838516' },
  { prefix: '+38 (050)', number: '421 84 90', full: '+380504218490' },
  { prefix: '+38 (063)', number: '524 89 66', full: '+380635248966' },
];

const workingHours = {
  weekdays: { ua: 'пн-сб', en: 'Mon-Sat' },
  weekend: { ua: 'нд', en: 'Sun' },
  timeWeekdays: '07:00 — 20:00',
  timeWeekend: '08:00 — 20:00',
};

const navLinks = [
  { href: '/directions', label: 'Напрямки', labelEn: 'Services' },
  { href: '/prices', label: 'Ціни', labelEn: 'Prices' },
  { href: '/news', label: 'Новини', labelEn: 'News' },
  { href: '/analyses', label: 'Аналізи', labelEn: 'Lab Tests' },
  { href: '/asklepiy-rodyna', label: 'Заключити декларацію', labelEn: 'Sign Declaration' },
  { href: '/about', label: 'Про нас', labelEn: 'About' },
  { href: '/contacts', label: 'Контакти', labelEn: 'Contacts' },
];

export function Header() {
  const { locale } = useLocale();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPhoneDropdownOpen, setIsPhoneDropdownOpen] = useState(false);
  const phoneDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (window.location.pathname === '/' || window.location.pathname === '/ua' || window.location.pathname === '/en') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (phoneDropdownRef.current && !phoneDropdownRef.current.contains(event.target as Node)) {
        setIsPhoneDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Disable body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      <motion.header
        className={cn(
          'fixed top-0 left-0 right-0 z-overlay transition-all duration-500 h-[80px]',
          isScrolled ? 'glass shadow-medical-md' : 'bg-transparent'
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="container mx-auto px-4 h-full">
          <div className="flex items-center justify-between h-full">
            {/* Logo */}
            <Link href="/" onClick={handleLogoClick} className="group flex items-center">
              <motion.div
                className="relative w-[195px] h-[104px]"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                <Image
                  src="/images/logo.webp"
                  alt={locale === 'ua' ? 'Асклепій' : 'Asklepiy'}
                  fill
                  className="object-contain"
                />
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <motion.nav
              className="hidden lg:flex items-center gap-1"
              variants={staggerContainerVariants}
              initial="hidden"
              animate="visible"
            >
              {navLinks.map((link, index) => (
                <motion.div key={link.href} variants={staggerItemVariants} custom={index}>
                  <Link
                    href={link.href}
                    className="px-4 py-2 text-medical-text-secondary hover:text-medical-primary-900 transition-all text-sm font-medium relative group"
                  >
                    {locale === 'ua' ? link.label : link.labelEn}
                    <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-medical-accent-600 transition-all duration-300 group-hover:w-full group-hover:left-0" />
                  </Link>
                </motion.div>
              ))}
            </motion.nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* Search - Desktop */}
              <motion.button
                className="hidden md:flex p-2.5 text-medical-text-secondary hover:text-medical-primary-900 hover:bg-medical-surface-100 rounded-sm transition-all"
                aria-label="Search"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Search className="w-5 h-5" />
              </motion.button>

              {/* Language Switcher */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                <LanguageSwitcher />
              </motion.div>

              {/* Phone Dropdown - Desktop */}
              <div ref={phoneDropdownRef} className="relative hidden md:block">
                <motion.button
                  className="flex items-center gap-2 px-4 py-2.5 text-medical-primary-900 font-medium text-sm hover:text-medical-accent-600 hover:bg-medical-surface-100 rounded-sm transition-all"
                  onClick={() => setIsPhoneDropdownOpen(!isPhoneDropdownOpen)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Phone className="w-4 h-4" />
                </motion.button>

                <AnimatePresence>
                  {isPhoneDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 top-full mt-2 w-80 bg-white rounded-sm shadow-medical-xl border border-medical-surface-200 z-50 overflow-hidden"
                    >
                      {/* Phone Numbers */}
                      <div className="border-b border-medical-surface-200 box-border">
                        <a
                          href={`tel:${phoneNumbers[0].full}`}
                          className="flex items-center h-14 px-4 border-b border-medical-surface-100 hover:text-medical-accent-600 transition-colors box-border"
                        >
                          <span className="font-medium text-base" style={{ fontVariantNumeric: 'tabular-nums' }}>
                            {phoneNumbers[0].prefix} {phoneNumbers[0].number}
                          </span>
                        </a>
                        <a
                          href={`tel:${phoneNumbers[1].full}`}
                          className="flex items-center h-14 px-4 border-b border-medical-surface-100 hover:text-medical-accent-600 transition-colors box-border"
                        >
                          <span className="font-medium text-base" style={{ fontVariantNumeric: 'tabular-nums' }}>
                            {phoneNumbers[1].prefix} {phoneNumbers[1].number}
                          </span>
                        </a>
                        <a
                          href={`tel:${phoneNumbers[2].full}`}
                          className="flex items-center h-14 px-4 hover:text-medical-accent-600 transition-colors box-border"
                        >
                          <span className="font-medium text-base" style={{ fontVariantNumeric: 'tabular-nums' }}>
                            {phoneNumbers[2].prefix} {phoneNumbers[2].number}
                          </span>
                        </a>
                      </div>

                      {/* Email */}
                      <div className="p-4 border-b border-medical-surface-200">
                        <span className="text-medical-text-tertiary text-sm block mb-2">Email</span>
                        <a
                          href="mailto:info@asklepiy.com"
                          className="flex items-center gap-2 text-medical-primary-900 font-medium hover:text-medical-accent-600 transition-colors"
                        >
                          <Mail className="w-4 h-4 text-medical-accent-600" />
                          info@asklepiy.com
                        </a>
                      </div>

                      {/* Working Hours */}
                      <div className="p-4 border-b border-medical-surface-200">
                        <span className="text-medical-text-tertiary text-sm block mb-3">
                          {locale === 'ua' ? 'Графік роботи контакт центру:' : 'Contact center working hours:'}
                        </span>
                        <div className="space-y-1 text-medical-primary-900 font-medium">
                          <div className="flex justify-between">
                            <span>{locale === 'ua' ? workingHours.weekdays.ua : workingHours.weekdays.en}:</span>
                            <span>{workingHours.timeWeekdays}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>{locale === 'ua' ? workingHours.weekend.ua : workingHours.weekend.en}:</span>
                            <span>{workingHours.timeWeekend}</span>
                          </div>
                        </div>
                      </div>

                      {/* Social Buttons */}
                      <div className="p-4 flex gap-3">
                        <a
                          href="https://t.me/asklepiy_family"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-2 py-2.5 border-2 border-medical-accent-600 rounded-sm text-medical-accent-600 font-medium hover:bg-medical-accent-50 transition-colors"
                        >
                          <Image
                            src="/images/tg-logo.svg"
                            alt="Telegram"
                            width={18}
                            height={18}
                            className="w-[18px] h-[18px] invert brightness-0 saturate-100"
                            style={{ filter: 'invert(39%) sepia(96%) saturate(367%) hue-rotate(147deg) brightness(94%) contrast(86%)' }}
                          />
                          Telegram
                        </a>
                        <a
                          href="viber://chat?number=%2B380671838516"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-2 py-2.5 border-2 border-medical-accent-600 rounded-sm text-medical-accent-600 font-medium hover:bg-medical-accent-50 transition-colors"
                        >
                          <Image
                            src="/images/viber-logo.svg"
                            alt="Viber"
                            width={18}
                            height={18}
                            className="w-[18px] h-[18px] invert brightness-0 saturate-100"
                            style={{ filter: 'invert(39%) sepia(96%) saturate(367%) hue-rotate(147deg) brightness(94%) contrast(86%)' }}
                          />
                          Viber
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Sign In / Dashboard */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Link href="/dashboard">
                  <Button variant="primary" size="sm" className="hidden sm:inline-flex shadow-medical-md">
                    <User className="w-4 h-4 mr-2" />
                    {locale === 'ua' ? 'Кабінет' : 'Dashboard'}
                  </Button>
                </Link>
              </motion.div>

              {/* Mobile Menu Button */}
              <motion.button
                className="lg:hidden p-2 text-medical-primary-900 hover:bg-medical-surface-100 rounded-sm transition-all"
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Open menu"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Menu className="w-6 h-6" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navLinks={navLinks}
      />
    </>
  );
}
