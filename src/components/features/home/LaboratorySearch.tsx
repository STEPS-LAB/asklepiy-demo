'use client';

import { useLocale } from '@/contexts';
import { motion } from 'framer-motion';
import { Search, Clock, DollarSign } from 'lucide-react';
import { useState } from 'react';
import { Input, Button } from '@/components/ui';

const sampleTests = [
  {
    id: 1,
    name: { ua: 'Загальний аналіз крові', en: 'Complete Blood Count' },
    price: 250,
    turnaround: { ua: '1 день', en: '1 day' },
  },
  {
    id: 2,
    name: { ua: 'Біохімія крові (розширена)', en: 'Blood Biochemistry (extended)' },
    price: 580,
    turnaround: { ua: '1-2 дні', en: '1-2 days' },
  },
  {
    id: 3,
    name: { ua: 'Гормони щитоподібної залози', en: 'Thyroid Hormones' },
    price: 420,
    turnaround: { ua: '2 дні', en: '2 days' },
  },
  {
    id: 4,
    name: { ua: 'Аналіз сечі загальний', en: 'Urinalysis' },
    price: 180,
    turnaround: { ua: '1 день', en: '1 day' },
  },
  {
    id: 5,
    name: { ua: 'Глюкоза крові', en: 'Blood Glucose' },
    price: 120,
    turnaround: { ua: '1 день', en: '1 day' },
  },
];

export function LaboratorySearch() {
  const { locale } = useLocale();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTests = sampleTests.filter((test) =>
    (locale === 'ua' ? test.name.ua : test.name.en)
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">
            {locale === 'ua' ? 'Лабораторні дослідження' : 'Laboratory Tests'}
          </h2>
          <p className="section-subtitle mx-auto">
            {locale === 'ua'
              ? 'Знайдіть потрібний аналіз швидко та зручно'
              : 'Find the test you need quickly and easily'}
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          className="max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-medical-text-tertiary" />
              <Input
                type="text"
                placeholder={locale === 'ua' ? 'Пошук аналізів...' : 'Search tests...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12"
              />
            </div>
            <Button>
              {locale === 'ua' ? 'Знайти' : 'Search'}
            </Button>
          </div>
        </motion.div>

        {/* Results Table */}
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="bg-medical-surface-50 rounded-sm overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-12 gap-4 p-4 bg-medical-primary-900 text-white font-medium">
              <div className="col-span-6 md:col-span-6">
                {locale === 'ua' ? 'Назва' : 'Name'}
              </div>
              <div className="col-span-3 md:col-span-3 text-center">
                {locale === 'ua' ? 'Термін' : 'Turnaround'}
              </div>
              <div className="col-span-3 md:col-span-3 text-right">
                {locale === 'ua' ? 'Ціна' : 'Price'}
              </div>
            </div>

            {/* Rows */}
            <div className="divide-y divide-medical-surface-200">
              {filteredTests.map((test, index) => (
                <motion.div
                  key={test.id}
                  className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-medical-accent-50 transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className="col-span-6 md:col-span-6">
                    <span className="text-medical-primary-900 font-medium">
                      {locale === 'ua' ? test.name.ua : test.name.en}
                    </span>
                  </div>
                  <div className="col-span-3 md:col-span-3 flex items-center justify-center gap-2 text-medical-text-secondary">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">
                      {locale === 'ua' ? test.turnaround.ua : test.turnaround.en}
                    </span>
                  </div>
                  <div className="col-span-3 md:col-span-3 flex items-center justify-end gap-2 text-medical-primary-900 font-medium">
                    <DollarSign className="w-4 h-4" />
                    <span>{test.price} ₴</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            className="text-center mt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <a href="/analyses">
              <Button variant="outline">
                {locale === 'ua' ? 'Всі аналізи' : 'All Tests'}
              </Button>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
