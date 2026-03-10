'use client';

import { useLocale } from '@/contexts';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Calendar, ArrowRight, Tag } from 'lucide-react';
import { Button } from '@/components/ui';
import { useState, useEffect } from 'react';

const news = [
  {
    id: 1,
    title: {
      ua: 'Новий лікар-інфекціоніст у нашій клініці',
      en: 'New Infectious Disease Specialist at Our Clinic',
    },
    category: { ua: 'Новина', en: 'News' },
    tags: { ua: 'Лікарі', en: 'Doctors' },
    date: '2024-01-15',
    excerpt: {
      ua: 'Раді повідомити про поповнення нашої команди кваліфікованим лікарем-інфекціоністом з 15-річним досвідом.',
      en: 'We are pleased to announce the addition of a qualified infectious disease specialist with 15 years of experience to our team.',
    },
    image: '/images/news/news1.jpg',
  },
  {
    id: 2,
    title: {
      ua: 'Акція: комплексне обстеження для жінок',
      en: 'Promotion: Comprehensive Women\'s Health Check-up',
    },
    category: { ua: 'Акція', en: 'Promotion' },
    tags: { ua: 'Акції', en: 'Promotions' },
    date: '2024-01-10',
    excerpt: {
      ua: 'До 8 березня діє знижка 20% на комплексне гінекологічне обстеження.',
      en: 'Until March 8, enjoy a 20% discount on comprehensive gynecological examination.',
    },
    image: '/images/news/news2.jpg',
  },
  {
    id: 3,
    title: {
      ua: 'Дитячий дієтолог: консультації для маленьких пацієнтів',
      en: 'Pediatric Dietitian: Consultations for Young Patients',
    },
    category: { ua: 'Новина', en: 'News' },
    tags: { ua: 'Педіатрія', en: 'Pediatrics' },
    date: '2024-01-05',
    excerpt: {
      ua: 'Тепер у нашій клініці можна отримати консультацію дитячого дієтолога для формування здорового харчування.',
      en: 'Now you can get a pediatric dietitian consultation at our clinic for healthy eating habits.',
    },
    image: '/images/news/news3.jpg',
  },
  {
    id: 4,
    title: {
      ua: 'Сучасне обладнання для лазерної офтальмології',
      en: 'Modern Equipment for Laser Ophthalmology',
    },
    category: { ua: 'Новина', en: 'News' },
    tags: { ua: 'Обладнання', en: 'Equipment' },
    date: '2024-01-01',
    excerpt: {
      ua: 'Встановлено нове обладнання для лазерної корекції зору останнього покоління.',
      en: 'New latest-generation equipment for laser vision correction has been installed.',
    },
    image: '/images/news/news4.jpg',
  },
];

export function NewsSection() {
  const { locale } = useLocale();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const visibleNews = isMobile ? news.slice(0, 3) : news;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale === 'ua' ? 'uk-UA' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <section className="section bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="flex flex-col md:flex-row md:items-center md:justify-between mb-12 gap-6 md:gap-0"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div>
            <h2 className="section-title">
              {locale === 'ua' ? 'Новини та акції' : 'News & Promotions'}
            </h2>
            <p className="section-subtitle">
              {locale === 'ua'
                ? 'Останні події та спеціальні пропозиції'
                : 'Latest events and special offers'}
            </p>
          </div>
          <Link href="/news">
            <Button variant="outline" rightIcon={<ArrowRight className="w-4 h-4" />}>
              {locale === 'ua' ? 'Дивитись більше' : 'View More'}
            </Button>
          </Link>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {visibleNews.map((item, index) => (
            <motion.div
              key={item.id}
              className="flex flex-col h-full"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="bg-medical-surface-50 rounded-sm overflow-hidden flex flex-col flex-1">
                {/* Image Placeholder */}
                <div className="aspect-[4/3] bg-gradient-to-br from-medical-primary-200 to-medical-accent-200 flex items-center justify-center flex-shrink-0">
                  <Tag className="w-12 h-12 text-medical-primary-900/20" />
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col flex-1">
                  {/* Category Badge */}
                  <span className={`inline-block px-3 py-1 rounded-sm text-xs font-medium mb-3 w-fit ${
                    item.category[locale === 'ua' ? 'ua' : 'en'] === 'Promotion' || item.category[locale === 'ua' ? 'ua' : 'en'] === 'Акція'
                      ? 'bg-medical-accent-100 text-medical-accent-700'
                      : 'bg-medical-primary-100 text-medical-primary-700'
                  }`}>
                    {item.category[locale === 'ua' ? 'ua' : 'en']}
                  </span>

                  {/* Title */}
                  <h3 className="font-medium text-medical-primary-900 mb-2 line-clamp-2">
                    {item.title[locale === 'ua' ? 'ua' : 'en']}
                  </h3>

                  {/* Date */}
                  <div className="flex items-center gap-2 text-sm text-medical-text-tertiary mb-3">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(item.date)}</span>
                  </div>

                  {/* Excerpt */}
                  <p className="text-medical-text-secondary text-sm line-clamp-3 mt-auto">
                    {item.excerpt[locale === 'ua' ? 'ua' : 'en']}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
