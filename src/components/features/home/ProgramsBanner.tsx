'use client';

import { useLocale } from '@/contexts';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Heart, Activity, TestTube2 } from 'lucide-react';

const programs = [
  {
    icon: Heart,
    title: {
      ua: 'Асклепій Родина',
      en: 'Asklepiy Family',
    },
    description: {
      ua: 'Комплексна програма медичного обслуговування для всієї родини',
      en: 'Comprehensive medical service program for the whole family',
    },
    href: '/asklepiy-rodyna',
    color: 'from-medical-accent-500 to-medical-accent-600',
  },
  {
    icon: Activity,
    title: {
      ua: 'Скринінг 40+',
      en: 'Screening 40+',
    },
    description: {
      ua: 'Профілактична програма для раннього виявлення захворювань',
      en: 'Preventive program for early disease detection',
    },
    href: '/screening-40',
    color: 'from-medical-primary-600 to-medical-primary-700',
  },
  {
    icon: TestTube2,
    title: {
      ua: 'Лабораторні послуги',
      en: 'Laboratory Services',
    },
    description: {
      ua: 'Сучасні аналізи з швидким результатом',
      en: 'Modern tests with fast results',
    },
    href: '/directions#laboratory',
    color: 'from-medical-accent-400 to-medical-primary-600',
  },
];

export function ProgramsBanner() {
  const { locale } = useLocale();

  return (
    <section className="py-16 bg-medical-surface-50">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">
            {locale === 'ua' ? 'Спеціальні програми' : 'Special Programs'}
          </h2>
          <p className="section-subtitle mx-auto">
            {locale === 'ua'
              ? 'Вигідні пропозиції для вашого здоров\'я'
              : 'Profitable offers for your health'}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {programs.map((program, index) => (
            <motion.div
              key={program.href}
              className="group relative overflow-hidden rounded-sm"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className={`h-full bg-gradient-to-br ${program.color} p-8 text-white`}>
                <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-sm flex items-center justify-center mb-4">
                  <program.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-medium mb-3">
                  {locale === 'ua' ? program.title.ua : program.title.en}
                </h3>
                <p className="text-white/90 mb-6">
                  {locale === 'ua' ? program.description.ua : program.description.en}
                </p>
                <Link
                  href={program.href}
                  className="inline-flex items-center text-white font-medium hover:underline"
                >
                  {locale === 'ua' ? 'Дізнатись більше' : 'Learn More'}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
