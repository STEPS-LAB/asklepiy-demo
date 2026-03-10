'use client';

import { useLocale } from '@/contexts';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight } from 'lucide-react';
import { Card, Button } from '@/components/ui';
import Link from 'next/link';

const newsItems = [
  {
    id: '1',
    title: 'Нові можливості МРТ діагностики',
    titleEn: 'New MRI diagnostics capabilities',
    excerpt: 'Відкрито нове відділення МРТ з апаратом експертного класу',
    excerptEn: 'New MRI department opened with expert-class equipment',
    date: '2026-03-01',
    category: 'news',
    image: '/images/news/mri.jpg',
  },
  {
    id: '2',
    title: 'Акція: Комплексна діагностика зі знижкою 20%',
    titleEn: 'Promotion: Comprehensive diagnostics 20% off',
    excerpt: 'Оберіть комплекс послуг та отримайте знижку',
    excerptEn: 'Choose a service package and get a discount',
    date: '2026-02-25',
    category: 'promotion',
    image: '/images/news/promo.jpg',
  },
  {
    id: '3',
    title: 'Консультація кардіолога без черг',
    titleEn: 'Cardiologist consultation without queues',
    excerpt: 'Тепер запис до кардіолога доступний онлайн',
    excerptEn: 'Cardiologist appointments now available online',
    date: '2026-02-20',
    category: 'news',
    image: '/images/news/cardio.jpg',
  },
  {
    id: '4',
    title: 'Весняна акція на лабораторні аналізи',
    titleEn: 'Spring promotion on lab tests',
    excerpt: 'Знижки до 30% на популярні аналізи',
    excerptEn: 'Up to 30% off on popular tests',
    date: '2026-02-15',
    category: 'promotion',
    image: '/images/news/lab.jpg',
  },
];

export default function NewsPage() {
  const { locale } = useLocale();

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl md:text-4xl font-secondary font-medium text-medical-primary-900 mb-4">
          {locale === 'ua' ? 'Новини та Акції' : 'News & Promotions'}
        </h1>
        <p className="text-lg text-medical-text-secondary max-w-2xl mx-auto">
          {locale === 'ua'
            ? 'Останні новини та спеціальні пропозиції клініки'
            : 'Latest news and special offers from the clinic'}
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        {newsItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="overflow-hidden h-full group cursor-pointer">
              <div className="aspect-[16/9] bg-gradient-to-br from-medical-primary-200 to-medical-accent-200 relative">
                <div className="absolute top-4 left-4">
                  <span
                    className={`px-3 py-1 rounded-sm text-xs font-medium ${
                      item.category === 'promotion'
                        ? 'bg-medical-status-warning text-white'
                        : 'bg-medical-accent-600 text-white'
                    }`}
                  >
                    {item.category === 'promotion'
                      ? locale === 'ua'
                        ? 'Акція'
                        : 'Promotion'
                      : locale === 'ua'
                      ? 'Новина'
                      : 'News'}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-medical-text-tertiary mb-3">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(item.date).toLocaleDateString(locale === 'ua' ? 'uk-UA' : 'en-US')}</span>
                </div>
                <h3 className="text-lg font-medium text-medical-primary-900 mb-2 group-hover:text-medical-accent-600 transition-colors">
                  {locale === 'ua' ? item.title : item.titleEn}
                </h3>
                <p className="text-medical-text-secondary">
                  {locale === 'ua' ? item.excerpt : item.excerptEn}
                </p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
