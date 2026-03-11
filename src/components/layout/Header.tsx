'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLocale, useUI } from '@/contexts';
import { Phone, Search, User, Mail, Clock, Menu } from 'lucide-react';
import { Button, LanguageSwitcher } from '@/components/ui';
import { cn } from '@/lib/utils';
import { BurgerMenu } from './BurgerMenu';

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
  { href: '/analyses', label: 'Послуги', labelEn: 'Services' },
  { href: '/news', label: 'Новини', labelEn: 'News' },
  { href: '/asklepiy-rodyna', label: 'Заключити декларацію', labelEn: 'Sign Declaration' },
  { href: '/about', label: 'Про нас', labelEn: 'About' },
  { href: '/contacts', label: 'Контакти', labelEn: 'Contacts' },
];

interface HeaderProps {
  onOpenBooking?: () => void;
}

export function Header({ onOpenBooking }: HeaderProps) {
  const { locale } = useLocale();
  const { isModalOpen } = useUI();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPhoneDropdownOpen, setIsPhoneDropdownOpen] = useState(false);
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
  const phoneDropdownRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hide header on mobile when modal is open
  useEffect(() => {
    if (isModalOpen && window.innerWidth < 640) {
      document.body.style.paddingTop = '0';
    }
  }, [isModalOpen]);

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (window.location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (phoneDropdownRef.current && !phoneDropdownRef.current.contains(event.target as Node)) {
        setIsPhoneDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <header
        style={{ zIndex: 99995 }}
        className={cn(
          'fixed top-0 left-0 right-0 transition-all duration-500 h-[80px] bg-white',
          isScrolled ? 'glass shadow-medical-md' : 'shadow-sm',
          isModalOpen && 'sm:block hidden'
        )}
      >
        <div className="container mx-auto px-4 h-full">
          <div className="flex items-center justify-between h-full">
            {/* Logo */}
            <div>
              <Link href="/" onClick={handleLogoClick} className="group flex items-center">
                <div className="relative w-[195px] h-[104px]">
                  <Image
                    src="/images/logo.webp"
                    alt={locale === 'ua' ? 'Асклепій' : 'Asklepiy'}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <div key={link.href}>
                  <Link
                    href={link.href}
                    className="px-4 py-2 text-medical-text-secondary hover:text-medical-primary-900 transition-all text-sm font-medium relative group"
                  >
                    {locale === 'ua' ? link.label : link.labelEn}
                    <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-medical-accent-600 transition-all duration-300 group-hover:w-full group-hover:left-0" />
                  </Link>
                </div>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3">
              {/* Language Switcher */}
              <div>
                <LanguageSwitcher />
              </div>

              {/* Search - Desktop */}
              <button
                className="hidden md:flex p-2.5 text-medical-text-secondary hover:text-medical-primary-900 hover:bg-medical-surface-100 rounded-sm transition-all"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Mobile Menu Button */}
              <button
                ref={menuButtonRef}
                className="md:hidden flex p-2.5 text-medical-primary-900 hover:bg-medical-surface-100 rounded-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-medical-accent-600 relative z-[100000]"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  setIsBurgerMenuOpen(true);
                }}
                aria-label="Open menu"
                aria-expanded={isBurgerMenuOpen}
                aria-controls="burger-menu"
                type="button"
              >
                <Menu className="w-6 h-6" />
              </button>

              {/* Phone Dropdown - Desktop */}
              <div ref={phoneDropdownRef} className="relative hidden md:block">
                <button
                  className="flex items-center gap-2 px-4 py-2.5 text-medical-primary-900 font-medium text-sm hover:text-medical-accent-600 hover:bg-medical-surface-100 rounded-sm transition-all"
                  onClick={() => setIsPhoneDropdownOpen(!isPhoneDropdownOpen)}
                >
                  <Phone className="w-4 h-4" />
                </button>

                {isPhoneDropdownOpen && (
                  <div
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
                  </div>
                )}
              </div>

              {/* Sign In / Dashboard */}
              <div>
                <Link href="/dashboard">
                  <Button variant="primary" size="sm" className="hidden sm:inline-flex shadow-medical-md">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span>{locale === 'ua' ? 'Кабінет' : 'Dashboard'}</span>
                    </div>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Burger Menu */}
      <BurgerMenu
        isOpen={isBurgerMenuOpen}
        onClose={() => setIsBurgerMenuOpen(false)}
        onOpenBooking={() => {
          setIsBurgerMenuOpen(false);
          onOpenBooking?.();
        }}
      />
    </>
  );
}
