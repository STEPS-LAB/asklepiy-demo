'use client';

import { useLocale } from '@/contexts';
import { motion } from 'framer-motion';
import { Search, Clock } from 'lucide-react';
import { useState, useMemo } from 'react';
import { Input, Button } from '@/components/ui';

// All lab tests from /analyses page
const allAnalyses = [
  { id: '1', name: { ua: 'Загальний аналіз крові', en: 'Complete blood count' }, price: 200, turnaround: { ua: '1 день', en: '1 day' } },
  { id: '2', name: { ua: 'Глюкоза крові', en: 'Blood glucose' }, price: 150, turnaround: { ua: '1 день', en: '1 day' } },
  { id: '3', name: { ua: 'Холестерин загальний', en: 'Total cholesterol' }, price: 180, turnaround: { ua: '1 день', en: '1 day' } },
  { id: '4', name: { ua: 'ТТГ (тиреотропний гормон)', en: 'TSH (Thyroid stimulating hormone)' }, price: 350, turnaround: { ua: '2 дні', en: '2 days' } },
  { id: '5', name: { ua: 'Вітамін D', en: 'Vitamin D' }, price: 550, turnaround: { ua: '3 дні', en: '3 days' } },
  { id: '6', name: { ua: 'Феритин', en: 'Ferritin' }, price: 320, turnaround: { ua: '1 день', en: '1 day' } },
  { id: '7', name: { ua: 'Біохімічний аналіз крові', en: 'Blood biochemistry' }, price: 450, turnaround: { ua: '1 день', en: '1 day' } },
  { id: '8', name: { ua: 'Загальний аналіз сечі', en: 'Complete urinalysis' }, price: 180, turnaround: { ua: '1 день', en: '1 day' } },
  { id: '9', name: { ua: 'Гормони щитоподібної залози', en: 'Thyroid hormones' }, price: 420, turnaround: { ua: '2 дні', en: '2 days' } },
  { id: '10', name: { ua: 'Кортизол', en: 'Cortisol' }, price: 280, turnaround: { ua: '2 дні', en: '2 days' } },
  { id: '11', name: { ua: 'Інсулін', en: 'Insulin' }, price: 300, turnaround: { ua: '1 день', en: '1 day' } },
  { id: '12', name: { ua: 'Гемоглобін', en: 'Hemoglobin' }, price: 120, turnaround: { ua: '1 день', en: '1 day' } },
  { id: '13', name: { ua: 'Лейкоцити', en: 'Leukocytes' }, price: 100, turnaround: { ua: '1 день', en: '1 day' } },
  { id: '14', name: { ua: 'Еритроцити', en: 'Erythrocytes' }, price: 100, turnaround: { ua: '1 день', en: '1 day' } },
  { id: '15', name: { ua: 'Тромбоцити', en: 'Platelets' }, price: 100, turnaround: { ua: '1 день', en: '1 day' } },
];

// Analysis categories from /analyses page
const analysisCategories = [
  { id: 'blood', name: { ua: 'Аналізи крові', en: 'Blood tests' } },
  { id: 'urine', name: { ua: 'Аналізи сечі', en: 'Urine tests' } },
  { id: 'hormones', name: { ua: 'Гормони', en: 'Hormones' } },
  { id: 'biochemistry', name: { ua: 'Біохімія', en: 'Biochemistry' } },
  { id: 'genetics', name: { ua: 'Генетика', en: 'Genetics' } },
  { id: 'allergies', name: { ua: 'Алергопанелі', en: 'Allergy panels' } },
  { id: 'infections', name: { ua: 'Інфекції', en: 'Infections' } },
];

export function LaboratorySearch() {
  const { locale } = useLocale();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTests = useMemo(() => {
    if (!searchQuery.trim()) {
      // Show first 5 tests by default
      return allAnalyses.slice(0, 5);
    }
    
    const query = searchQuery.toLowerCase();
    return allAnalyses.filter((test) =>
      (locale === 'ua' ? test.name.ua : test.name.en)
        .toLowerCase()
        .includes(query)
    );
  }, [searchQuery, locale]);

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
                className="pl-12 h-12"
              />
            </div>
            <Button className="h-12 px-8">
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
            <div className="grid grid-cols-[50%_30%_20%] gap-4 p-4 bg-medical-primary-900 text-white font-medium">
              <div>
                {locale === 'ua' ? 'Назва' : 'Name'}
              </div>
              <div>
                {locale === 'ua' ? 'Термін' : 'Turnaround'}
              </div>
              <div>
                {locale === 'ua' ? 'Ціна' : 'Price'}
              </div>
            </div>

            {/* Rows */}
            <div className="divide-y divide-medical-surface-200">
              {filteredTests.map((test, index) => (
                <motion.div
                  key={test.id}
                  className="grid grid-cols-[50%_30%_20%] gap-4 p-4 items-center hover:bg-medical-accent-50 transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div>
                    <span className="text-medical-primary-900 font-medium">
                      {locale === 'ua' ? test.name.ua : test.name.en}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-medical-text-secondary">
                    <Clock className="w-4 h-4 flex-shrink-0" />
                    <span className="text-sm whitespace-nowrap">
                      {locale === 'ua' ? test.turnaround.ua : test.turnaround.en}
                    </span>
                  </div>
                  <div className="flex items-center text-medical-primary-900 font-medium tabular-nums">
                    {test.price} ₴
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
