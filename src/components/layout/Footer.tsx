'use client';

import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { useLocale } from '@/contexts';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Instagram } from 'lucide-react';
import { staggerContainerVariants, fadeInUpVariants } from '@/lib/motion';

const footerLinks = {
  services: [
    { href: '/directions', label: 'Напрямки', labelEn: 'Services' },
    { href: '/analyses', label: 'Послуги', labelEn: 'Services' },
    { href: '/doctors', label: 'Лікарі', labelEn: 'Doctors' },
  ],
  clinic: [
    { href: '/about', label: 'Про нас', labelEn: 'About Us' },
    { href: '/news', label: 'Новини', labelEn: 'News' },
    { href: '/declaration', label: 'Декларація', labelEn: 'Declaration' },
  ],
};

const socialLinks = [
  {
    href: 'https://t.me/Asklepiy_Clinika_Bot',
    renderIcon: () => (
      <div className="w-5 h-5">
        <Image
          src="/images/tg-logo.svg"
          alt="Telegram"
          width={20}
          height={20}
          className="invert"
          style={{ filter: 'invert(100%) brightness(200%)' }}
        />
      </div>
    ),
    label: 'Telegram',
  },
  {
    href: 'https://www.instagram.com/asklepiyua',
    renderIcon: (props: React.SVGProps<SVGSVGElement>) => <Instagram {...props} />,
    label: 'Instagram',
  },
  {
    href: 'viber://pa?chatURI=asklepiy',
    renderIcon: () => (
      <div className="w-5 h-5">
        <Image
          src="/images/viber-logo.svg"
          alt="Viber"
          width={20}
          height={20}
          className="invert"
          style={{ filter: 'invert(100%) brightness(200%)' }}
        />
      </div>
    ),
    label: 'Viber',
  },
];

export function Footer() {
  const { locale } = useLocale();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-medical-primary-900 to-medical-primary-800 text-white">
      <div className="container mx-auto px-4 py-16 lg:py-20">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12"
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {/* Brand */}
          <motion.div className="lg:col-span-2" variants={fadeInUpVariants}>
            <Link href="/" className="flex items-center gap-4 mb-6 group">
              <motion.div
                className="w-12 h-12 bg-white rounded-sm flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <span className="text-medical-primary-900 font-semibold text-xl">A</span>
              </motion.div>
              <div>
                <span className="block font-secondary font-medium text-xl">
                  {locale === 'ua' ? 'Асклепій' : 'Asklepiy'}
                </span>
                <span className="block text-medical-surface-300 text-sm tracking-wide">
                  {locale === 'ua' ? 'Медичний центр' : 'Medical Center'}
                </span>
              </div>
            </Link>
            <p className="text-medical-surface-300 mb-6 max-w-sm font-light leading-relaxed">
              {locale === 'ua'
                ? 'Провідний приватний медичний центр України з сучасним обладнанням та кваліфікованими лікарями.'
                : "Ukraine's leading private clinic with modern equipment and qualified doctors."}
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  className="w-11 h-11 bg-white/10 rounded-sm flex items-center justify-center hover:bg-medical-accent-600 transition-all"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                  target={social.label !== 'Instagram' ? '_blank' : undefined}
                  rel={social.label !== 'Instagram' ? 'noopener noreferrer' : undefined}
                >
                  {social.label === 'Instagram' ? (
                    <social.renderIcon className="w-5 h-5" />
                  ) : (
                    <social.renderIcon />
                  )}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Services */}
          <motion.div variants={fadeInUpVariants}>
            <h3 className="font-secondary font-medium text-lg mb-5">
              {locale === 'ua' ? 'Послуги' : 'Services'}
            </h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link, index) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className="text-medical-surface-300 hover:text-white hover:translate-x-1 transition-all inline-block"
                  >
                    {locale === 'ua' ? link.label : link.labelEn}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Clinic */}
          <motion.div variants={fadeInUpVariants}>
            <h3 className="font-secondary font-medium text-lg mb-5">
              {locale === 'ua' ? 'Медичний центр' : 'Medical Center'}
            </h3>
            <ul className="space-y-3">
              {footerLinks.clinic.map((link, index) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className="text-medical-surface-300 hover:text-white hover:translate-x-1 transition-all inline-block"
                  >
                    {locale === 'ua' ? link.label : link.labelEn}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contacts */}
          <motion.div variants={fadeInUpVariants} className="lg:col-span-1">
            <h3 className="font-secondary font-medium text-lg mb-5">
              {locale === 'ua' ? 'Контакти' : 'Contacts'}
            </h3>
            <ul className="space-y-4">
              <motion.li
                className="flex items-start gap-3"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <MapPin className="w-5 h-5 text-medical-accent-500 mt-0.5 flex-shrink-0" />
                <span className="text-medical-surface-300 font-light">
                  {locale === 'ua'
                    ? 'м. Житомир, вул. Київська 21'
                    : 'Zhytomyr, Kyivska St 21'}
                </span>
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 }}
              >
                <a
                  href="tel:+380412123456"
                  className="flex items-center gap-3 text-medical-surface-300 hover:text-white transition-all group"
                >
                  <Phone className="w-5 h-5 text-medical-accent-500 group-hover:scale-110 transition-transform" />
                  <span>+38 (0412) 12-34-56</span>
                </a>
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <a
                  href="mailto:info@asklepiy.com"
                  className="flex items-center gap-3 text-medical-surface-300 hover:text-white transition-all group"
                >
                  <Mail className="w-5 h-5 text-medical-accent-500 group-hover:scale-110 transition-transform" />
                  <span>info@asklepiy.com</span>
                </a>
              </motion.li>
              <motion.li
                className="flex items-start gap-3"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 }}
              >
                <Clock className="w-5 h-5 text-medical-accent-500 mt-0.5 flex-shrink-0" />
                <div className="text-medical-surface-300 text-sm font-light">
                  <span className="block">
                    {locale === 'ua' ? 'Пн-Пт: 8:00 - 20:00' : 'Mon-Fri: 8:00 - 20:00'}
                  </span>
                  <span className="block">
                    {locale === 'ua' ? 'Сб: 9:00 - 17:00' : 'Sat: 9:00 - 17:00'}
                  </span>
                  <span className="block">
                    {locale === 'ua' ? 'Нд: 9:00 - 15:00' : 'Sun: 9:00 - 15:00'}
                  </span>
                </div>
              </motion.li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          className="mt-16 pt-8 border-t border-white/10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-medical-surface-400 text-sm font-light">
              {locale === 'ua'
                ? `© ${currentYear} Асклепій Клінік. Всі права захищено.`
                : `© ${currentYear} Asklepiy Clinic. All rights reserved.`}
            </p>
            <p className="text-medical-surface-400 text-sm font-light">
              {locale === 'ua'
                ? 'Розроблено '
                : 'Developed by '}
              <a
                href="https://stepslab.vercel.app"
                className="hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                STEPS LAB
              </a>
              {' x Asklepiy Concept'}
            </p>
            <div className="flex items-center gap-6">
              <span className="text-medical-surface-400 text-sm font-light">
                {locale === 'ua'
                  ? 'Політика конфіденційності'
                  : 'Privacy Policy'}
              </span>
              <span className="text-medical-surface-400 text-sm font-light">
                {locale === 'ua'
                  ? 'Умови використання'
                  : 'Terms of Service'}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
