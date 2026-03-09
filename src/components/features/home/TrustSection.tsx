'use client';

import { useLocale } from '@/contexts';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Shield, Activity, Stethoscope, Heart, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui';

const benefits = [
  {
    icon: Shield,
    title: {
      ua: 'Комплексний підхід',
      en: 'Comprehensive Approach',
    },
    description: {
      ua: 'Від діагностики до лікування в одній клініці',
      en: 'From diagnosis to treatment in one clinic',
    },
  },
  {
    icon: Activity,
    title: {
      ua: 'Власна хірургія',
      en: 'In-house Surgery',
    },
    description: {
      ua: 'Сучасні операційні з мінімальним втручанням',
      en: 'Modern operating rooms with minimal intervention',
    },
  },
  {
    icon: Stethoscope,
    title: {
      ua: 'Безперервність лікування',
      en: 'Continuity of Care',
    },
    description: {
      ua: 'Один лікар супроводжує пацієнта на всіх етапах',
      en: 'One doctor accompanies the patient at all stages',
    },
  },
  {
    icon: Heart,
    title: {
      ua: 'Мінімальні ризики',
      en: 'Minimal Risks',
    },
    description: {
      ua: 'Точна діагностика знижує ризик помилок',
      en: 'Accurate diagnostics reduce error risks',
    },
  },
];

export function TrustSection() {
  const { locale } = useLocale();

  return (
    <section className="section bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-secondary text-3xl md:text-4xl font-medium text-medical-primary-900 mb-6">
              {locale === 'ua'
                ? 'Нам довіряють найцінніше'
                : 'They trust us with what\'s most valuable'}
            </h2>
            <p className="text-medical-text-secondary text-lg mb-6 leading-relaxed">
              {locale === 'ua'
                ? 'Медичний центр "Асклепій" — це сучасний багатопрофільний заклад, який надає повний спектр медичних послуг. Ми поєднуємо передові технології діагностики та лікування з індивідуальним підходом до кожного пацієнта.'
                : 'Asklepiy Clinic is a modern multidisciplinary medical center providing a full range of medical services. We combine advanced diagnostic and treatment technologies with an individual approach to each patient.'}
            </p>
            <p className="text-medical-text-secondary mb-8 leading-relaxed">
              {locale === 'ua'
                ? 'Наша місія — забезпечити якісну та доступну медичну допомогу, використовуючи доказову медицину та міжнародні протоколи лікування.'
                : 'Our mission is to provide quality and accessible medical care using evidence-based medicine and international treatment protocols.'}
            </p>

            {/* Benefits Grid */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  className="flex gap-3"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-medical-accent-100 rounded-sm flex items-center justify-center">
                    <benefit.icon className="w-5 h-5 text-medical-accent-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-medical-primary-900 text-sm mb-1">
                      {locale === 'ua' ? benefit.title.ua : benefit.title.en}
                    </h4>
                    <p className="text-medical-text-secondary text-xs">
                      {locale === 'ua' ? benefit.description.ua : benefit.description.en}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Feature list */}
            <div className="space-y-3 mb-8">
              {[
                { ua: 'Сучасне високоточне обладнання', en: 'Modern high-precision equipment' },
                { ua: 'Сертифіковані фахівці', en: 'Certified specialists' },
                { ua: 'Доказова медицина та стандарти', en: 'Evidence-based medicine & standards' },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <CheckCircle className="w-5 h-5 text-medical-accent-600 flex-shrink-0" />
                  <span className="text-medical-text-secondary">
                    {locale === 'ua' ? item.ua : item.en}
                  </span>
                </motion.div>
              ))}
            </div>

            <Link href="/booking">
              <Button size="lg">
                {locale === 'ua' ? 'Записатися на прийом' : 'Book Appointment'}
              </Button>
            </Link>
          </motion.div>

          {/* Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="relative z-10 rounded-sm overflow-hidden shadow-medical-xl">
              <div className="aspect-[4/3] bg-gradient-to-br from-medical-primary-200 to-medical-accent-200 flex items-center justify-center">
                <Heart className="w-32 h-32 text-medical-primary-900/20" />
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-full h-full bg-medical-accent-100 rounded-sm -z-10" />
            <div className="absolute -bottom-4 -left-4 w-3/4 h-3/4 bg-medical-primary-100 rounded-sm -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
