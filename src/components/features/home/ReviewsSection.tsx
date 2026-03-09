'use client';

import { useLocale } from '@/contexts';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { Button } from '@/components/ui';

const reviews = [
  {
    id: 1,
    patient: { ua: 'Олена К.', en: 'Olena K.' },
    doctor: { ua: 'Коваленко О.В.', en: 'Kovalenko O.V.' },
    rating: 5,
    text: {
      ua: 'Дуже вдячна лікарю за професіоналізм та уважне ставлення. Консультація пройшла на найвищому рівні. Клініка сучасна, чиста, персонал привітний.',
      en: 'Very grateful to the doctor for professionalism and attentive care. The consultation was at the highest level. The clinic is modern, clean, and the staff is friendly.',
    },
  },
  {
    id: 2,
    patient: { ua: 'Андрій М.', en: 'Andriy M.' },
    doctor: { ua: 'Бондаренко Н.І.', en: 'Bondarenko N.I.' },
    rating: 5,
    text: {
      ua: 'Чудовий педіатр! Дитина не боїться ходити на прийом. Дуже рекомендую цю клініку всім батькам.',
      en: 'Excellent pediatrician! The child is not afraid to go to appointments. I highly recommend this clinic to all parents.',
    },
  },
  {
    id: 3,
    patient: { ua: 'Тетяна С.', en: 'Tetiana S.' },
    doctor: { ua: 'Шевченко А.П.', en: 'Shevchenko A.P.' },
    rating: 5,
    text: {
      ua: 'Проходжу обстеження у кардіолога. Все дуже організовано, немає черг. Обладнання нове, результати аналізів швидко.',
      en: 'Undergoing examination with a cardiologist. Everything is very organized, no queues. New equipment, fast test results.',
    },
  },
  {
    id: 4,
    patient: { ua: 'Микола В.', en: 'Mykola V.' },
    doctor: { ua: 'Мельник О.Д.', en: 'Melnyk O.D.' },
    rating: 5,
    text: {
      ua: 'Звертався до невролога з проблемами спини. Лікар дуже компетентний, призначив ефективне лікування. Вже відчуваю покращення.',
      en: 'Consulted a neurologist for back problems. The doctor is very competent, prescribed effective treatment. Already feeling improvement.',
    },
  },
];

export function ReviewsSection() {
  const { locale } = useLocale();

  return (
    <section className="section bg-medical-surface-50">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">
            {locale === 'ua' ? 'Відгуки пацієнтів' : 'Patient Reviews'}
          </h2>
          <p className="section-subtitle mx-auto">
            {locale === 'ua'
              ? 'Що кажуть наші пацієнти про нас'
              : 'What our patients say about us'}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              className="bg-white p-6 rounded-sm shadow-medical-md"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-medical-accent-100 rounded-full flex items-center justify-center">
                    <span className="text-medical-accent-700 font-medium">
                      {review.patient[locale === 'ua' ? 'ua' : 'en'].charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-medium text-medical-primary-900">
                      {review.patient[locale === 'ua' ? 'ua' : 'en']}
                    </h4>
                    <p className="text-sm text-medical-text-tertiary">
                      {locale === 'ua' ? 'Лікар:' : 'Doctor:'} {review.doctor[locale === 'ua' ? 'ua' : 'en']}
                    </p>
                  </div>
                </div>
                
                {/* Rating */}
                <div className="flex gap-1">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
              </div>

              {/* Quote Icon */}
              <Quote className="w-6 h-6 text-medical-accent-200 mb-3" />

              {/* Review Text */}
              <p className="text-medical-text-secondary text-sm leading-relaxed mb-4">
                {review.text[locale === 'ua' ? 'ua' : 'en']}
              </p>

              {/* Read More Link */}
              <button className="text-medical-accent-600 text-sm font-medium hover:underline">
                {locale === 'ua' ? 'Читати більше' : 'Read More'}
              </button>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <a href="/reviews">
            <Button variant="outline">
              {locale === 'ua' ? 'Всі відгуки' : 'All Reviews'}
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
