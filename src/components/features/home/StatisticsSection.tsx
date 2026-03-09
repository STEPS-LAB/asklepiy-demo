'use client';

import { useLocale } from '@/contexts';
import { motion } from 'framer-motion';
import { Award, Activity } from 'lucide-react';

export function StatisticsSection() {
  const { locale } = useLocale();

  const stats = [
    {
      value: '25+',
      label: {
        ua: 'років турботи',
        en: 'years of care',
      },
      icon: null,
    },
    {
      value: null,
      label: {
        ua: 'власна експертна лабораторія',
        en: 'own expert laboratory',
      },
      icon: Award,
    },
    {
      value: '170+',
      label: {
        ua: 'прогресивних лікарів',
        en: 'progressive doctors',
      },
      icon: null,
    },
    {
      value: null,
      label: {
        ua: 'передове діагностичне обладнання',
        en: 'advanced diagnostic equipment',
      },
      icon: Activity,
    },
    {
      value: '2+',
      suffix: {
        ua: 'тис.',
        en: 'K',
      },
      label: {
        ua: 'оперативних втручань на рік',
        en: 'surgeries per year',
      },
      icon: null,
    },
  ];

  return (
    <section className="section bg-medical-primary-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-medical-accent-300 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-medical-primary-400 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 text-center shadow-lg hover:shadow-xl transition-shadow border border-white/10 flex flex-col items-center justify-center min-h-[200px]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              {stat.icon ? (
                <div className="flex flex-col items-center justify-center">
                  <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center mb-4">
                    <stat.icon className="w-7 h-7 text-white" />
                  </div>
                  <p className="text-white/90 font-medium text-sm md:text-base leading-snug">
                    {locale === 'ua' ? stat.label.ua : stat.label.en}
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <div className="mb-3 flex items-baseline justify-center">
                    <span className="text-4xl md:text-5xl lg:text-6xl font-secondary font-medium text-white">
                      {stat.value}
                    </span>
                    {stat.suffix && (
                      <span className="text-xl md:text-2xl font-secondary font-medium text-white/90 ml-1">
                        {locale === 'ua' ? stat.suffix.ua : stat.suffix.en}
                      </span>
                    )}
                  </div>
                  <p className="text-white/90 font-medium text-sm md:text-base leading-snug">
                    {locale === 'ua' ? stat.label.ua : stat.label.en}
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
