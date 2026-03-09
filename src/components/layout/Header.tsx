'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLocale } from '@/contexts';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, Search, User } from 'lucide-react';
import { Button, LanguageSwitcher } from '@/components/ui';
import { cn } from '@/lib/utils';
import { fadeInDownVariants, staggerContainerVariants, staggerItemVariants } from '@/lib/motion';
import { MobileMenu } from './MobileMenu';

const navLinks = [
  { href: '/directions', label: 'Напрямки', labelEn: 'Services' },
  { href: '/prices', label: 'Ціни', labelEn: 'Prices' },
  { href: '/news', label: 'Новини', labelEn: 'News' },
  { href: '/analyses', label: 'Аналізи', labelEn: 'Lab Tests' },
  { href: '/about', label: 'Про нас', labelEn: 'About' },
  { href: '/contacts', label: 'Контакти', labelEn: 'Contacts' },
];

export function Header() {
  const { locale } = useLocale();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
          'fixed top-0 left-0 right-0 z-overlay transition-all duration-500',
          isScrolled ? 'glass py-3 shadow-medical-md' : 'bg-transparent py-5'
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="group">
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

              {/* Phone - Desktop */}
              <motion.a
                href="tel:+380412123456"
                className="hidden md:flex items-center gap-2 text-medical-primary-900 font-medium text-sm hover:text-medical-accent-600 transition-colors"
                whileHover={{ scale: 1.02 }}
              >
                <Phone className="w-4 h-4" />
                <span>+38 (0412) 12-34-56</span>
              </motion.a>

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
