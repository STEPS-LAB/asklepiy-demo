'use client';

import { useLocale } from '@/contexts';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import {
  User,
  Baby,
  Monitor,
  Microscope,
  Clipboard,
  Bed
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

type DepartmentTab = 'adult' | 'children' | 'diagnostics' | 'laboratory' | 'checkups' | 'surgery';

interface Service {
  ua: string;
  en: string;
}

interface Department {
  id: DepartmentTab;
  title: { ua: string; en: string };
  subtitle: { ua: string; en: string };
  icon: React.ComponentType<{ className?: string }>;
  services: Service[];
}

const departments: Department[] = [
  {
    id: 'adult',
    title: { ua: 'Доросле відділення', en: 'Adult Department' },
    subtitle: { ua: 'Поліклініка для дорослих', en: 'Adult Polyclinic' },
    icon: User,
    services: [
      { ua: 'Гастроентерологія', en: 'Gastroenterology' },
      { ua: 'Гематологія', en: 'Hematology' },
      { ua: 'Гінекологія', en: 'Gynecology' },
      { ua: 'Дерматовенерологія', en: 'Dermatology and Venereology' },
      { ua: 'Ендокринологія', en: 'Endocrinology' },
      { ua: 'Інфекційні хвороби', en: 'Infectious Diseases' },
      { ua: 'Кардіологія', en: 'Cardiology' },
      { ua: 'Комплексні обстеження', en: 'Comprehensive Examinations' },
      { ua: 'Мамологія', en: 'Mammology' },
      { ua: 'Масаж для дорослих', en: 'Adult Massage' },
      { ua: 'Неврологія', en: 'Neurology' },
      { ua: 'Нейрохірургія', en: 'Neurosurgery' },
      { ua: 'Ортопедія та травматологія', en: 'Orthopedics and Traumatology' },
      { ua: 'Отоларингологія', en: 'Otolaryngology' },
      { ua: 'Офтальмологія', en: 'Ophthalmology' },
      { ua: 'Пластична хірургія', en: 'Plastic Surgery' },
      { ua: 'Проктологія', en: 'Proctology' },
      { ua: 'Пульмонологія', en: 'Pulmonology' },
      { ua: 'Ревматологія', en: 'Rheumatology' },
      { ua: 'Судинна хірургія', en: 'Vascular Surgery' },
      { ua: 'Сурдологія', en: 'Audiology' },
      { ua: 'Терапія', en: 'Therapy' },
      { ua: 'Урологія', en: 'Urology' },
      { ua: 'Хірургія', en: 'Surgery' },
      { ua: 'Щеплення дорослих', en: 'Adult Vaccinations' },
    ],
  },
  {
    id: 'children',
    title: { ua: 'Дитяче відділення', en: 'Children\'s Department' },
    subtitle: { ua: 'Поліклініка для дітей', en: 'Children\'s Polyclinic' },
    icon: Baby,
    services: [
      { ua: 'Алергологія дитяча', en: 'Pediatric Allergology' },
      { ua: 'Гастроентерологія дитяча', en: 'Pediatric Gastroenterology' },
      { ua: 'Гематологія дитяча', en: 'Pediatric Hematology' },
      { ua: 'Гінекологія дитяча', en: 'Pediatric Gynecology' },
      { ua: 'Довідки до школи та садочку', en: 'School and Kindergarten Certificates' },
      { ua: 'Ендокринологія дитяча', en: 'Pediatric Endocrinology' },
      { ua: 'Імунологія дитяча', en: 'Pediatric Immunology' },
      { ua: 'Інфекційні хвороби дитячі', en: 'Pediatric Infectious Diseases' },
      { ua: 'Кардіоревматологія дитяча', en: 'Pediatric Cardiorheumatology' },
      { ua: 'Логопедія', en: 'Speech Therapy' },
      { ua: 'Масаж для дітей', en: 'Children\'s Massage' },
      { ua: 'Неврологія дитяча', en: 'Pediatric Neurology' },
      { ua: 'Нефрологія дитяча', en: 'Pediatric Nephrology' },
      { ua: 'Ортопедія та травматологія дитяча', en: 'Pediatric Orthopedics and Traumatology' },
      { ua: 'Отоларингологія дитяча', en: 'Pediatric Otolaryngology' },
      { ua: 'Офтальмологія дитяча', en: 'Pediatric Ophthalmology' },
      { ua: 'Педіатрія', en: 'Pediatrics' },
      { ua: 'Пульмонологія дитяча', en: 'Pediatric Pulmonology' },
      { ua: 'Хірургія та урологія дитяча', en: 'Pediatric Surgery and Urology' },
      { ua: 'Щеплення дітей', en: 'Children\'s Vaccinations' },
    ],
  },
  {
    id: 'diagnostics',
    title: { ua: 'Діагностика', en: 'Diagnostics' },
    subtitle: { ua: 'Інструментальні методи обстеження', en: 'Instrumental Examination Methods' },
    icon: Monitor,
    services: [
      { ua: 'Аудіометрія', en: 'Audiometry' },
      { ua: 'Бронхоспірометрія', en: 'Bronchospirometry' },
      { ua: 'Денситометрія', en: 'Densitometry' },
      { ua: 'Електроенцефалографія (ЕЕГ)', en: 'Electroencephalography (EEG)' },
      { ua: 'Електрокардіографія (ЕКГ)', en: 'Electrocardiography (ECG)' },
      { ua: 'Електронейроміографія (ЕНМГ)', en: 'Electroneuromyography (ENMG)' },
      { ua: 'Ендоскопія', en: 'Endoscopy' },
      { ua: 'КТ', en: 'CT Scan' },
      { ua: 'Маммографія', en: 'Mammography' },
      { ua: 'МРТ', en: 'MRI' },
      { ua: 'Капіляроскопія', en: 'Capillaroscopy' },
      { ua: 'Рентген', en: 'X-ray' },
      { ua: 'УЗД', en: 'Ultrasound' },
      { ua: 'Холтер АТ та ЕКГ', en: 'Holter BP and ECG' },
    ],
  },
  {
    id: 'laboratory',
    title: { ua: 'Лабораторія', en: 'Laboratory' },
    subtitle: { ua: 'Лабораторні дослідження', en: 'Laboratory Tests' },
    icon: Microscope,
    services: [
      { ua: 'Загальний аналіз крові', en: 'Complete Blood Count' },
      { ua: 'Загальний аналіз сечі', en: 'Complete Urinalysis' },
      { ua: 'Біохімічний аналіз крові', en: 'Blood Biochemistry' },
      { ua: 'Гормональні дослідження', en: 'Hormonal Tests' },
      { ua: 'Імунологічні дослідження', en: 'Immunological Tests' },
      { ua: 'Мікробіологічні дослідження', en: 'Microbiological Tests' },
      { ua: 'ПЦР-діагностика', en: 'PCR Diagnostics' },
      { ua: 'Цитологічні дослідження', en: 'Cytological Tests' },
      { ua: 'Гістологічні дослідження', en: 'Histological Tests' },
      { ua: 'Алергопанелі', en: 'Allergy Panels' },
      { ua: 'Онкомаркери', en: 'Tumor Markers' },
      { ua: 'Вітамінні комплекси', en: 'Vitamin Panels' },
    ],
  },
  {
    id: 'checkups',
    title: { ua: 'Чек-апи', en: 'Check-ups' },
    subtitle: { ua: 'Комплексні програми обстеження', en: 'Comprehensive Examination Programs' },
    icon: Clipboard,
    services: [
      { ua: 'Щорічний чек-ап', en: 'Annual Check-up' },
      { ua: 'Чек-ап для жінок', en: 'Women\'s Check-up' },
      { ua: 'Чек-ап для чоловіків', en: 'Men\'s Check-up' },
      { ua: 'Чек-ап після 40', en: 'Check-up After 40' },
      { ua: 'Чек-ап для дітей', en: 'Children\'s Check-up' },
      { ua: 'Кардіо чек-ап', en: 'Cardio Check-up' },
      { ua: 'Гастро чек-ап', en: 'Gastro Check-up' },
      { ua: 'Передопераційний чек-ап', en: 'Preoperative Check-up' },
      { ua: 'Шкільний чек-ап', en: 'School Check-up' },
      { ua: 'Спортсменів', en: 'Athletes Check-up' },
    ],
  },
  {
    id: 'surgery',
    title: { ua: 'Оперативні втручання', en: 'Surgeries' },
    subtitle: { ua: 'Хірургічні втручання', en: 'Surgical Procedures' },
    icon: Bed,
    services: [
      { ua: 'Лапароскопічні операції', en: 'Laparoscopic Surgeries' },
      { ua: 'Гінекологічні операції', en: 'Gynecological Surgeries' },
      { ua: 'Урологічні операції', en: 'Urological Surgeries' },
      { ua: 'Проктологічні операції', en: 'Proctological Surgeries' },
      { ua: 'Ортопедичні операції', en: 'Orthopedic Surgeries' },
      { ua: 'Отоларингологічні операції', en: 'ENT Surgeries' },
      { ua: 'Офтальмологічні операції', en: 'Ophthalmological Surgeries' },
      { ua: 'Пластичні операції', en: 'Plastic Surgeries' },
      { ua: 'Ендоскопічні операції', en: 'Endoscopic Surgeries' },
      { ua: 'Видалення гриж', en: 'Hernia Repair' },
      { ua: 'Видалення апендициту', en: 'Appendectomy' },
      { ua: 'Видалення жовчного міхура', en: 'Cholecystectomy' },
    ],
  },
];

export default function DirectionsPage() {
  const { locale } = useLocale();
  const [activeTab, setActiveTab] = useState<DepartmentTab>('adult');

  const activeDepartment = departments.find((d) => d.id === activeTab) || departments[0];

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl md:text-4xl font-secondary font-medium text-medical-primary-900 mb-4">
          {locale === 'ua' ? 'Напрямки' : 'Directions'}
        </h1>
        <p className="text-lg text-medical-text-secondary max-w-2xl mx-auto">
          {locale === 'ua'
            ? 'Комплексний підхід до вашого здоров\'я'
            : 'Comprehensive approach to your health'}
        </p>
      </motion.div>

      {/* Department Tabs */}
      <div className="mb-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 mb-6">
          {departments.map((dept) => {
            const Icon = dept.icon;
            const isActive = activeTab === dept.id;
            return (
              <motion.button
                key={dept.id}
                onClick={() => setActiveTab(dept.id)}
                className={cn(
                  'flex items-center justify-center gap-2 px-3 py-4 rounded-sm text-sm font-medium transition-all',
                  'w-full h-full',
                  isActive
                    ? 'bg-medical-primary-900 text-white shadow-medical-md font-semibold'
                    : 'bg-medical-surface-100 text-medical-text-secondary hover:bg-medical-surface-200 hover:font-semibold'
                )}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon className={cn('w-6 h-6 flex-shrink-0', isActive ? 'text-white' : 'text-medical-accent-600')} />
                <span className="text-center whitespace-normal leading-tight">
                  {locale === 'ua' ? dept.title.ua : dept.title.en}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Services Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="mb-6">
              <h2 className="text-xl font-medium text-medical-primary-900 bg-medical-primary-900/10 inline-block px-4 py-2 rounded-sm">
                {locale === 'ua' ? activeDepartment.subtitle.ua : activeDepartment.subtitle.en}
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {activeDepartment.services.map((service, index) => (
                <Link
                  key={locale === 'ua' ? service.ua : service.en}
                  href="/way/hastroenterolohiya"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.02 }}
                    className="flex items-center gap-3 p-3 rounded-sm hover:bg-medical-surface-100 transition-all duration-300 cursor-pointer group"
                  >
                    <div className="w-2 h-2 bg-medical-accent-400 rounded-full flex-shrink-0 group-hover:bg-medical-accent-600 transition-all duration-300" />
                    <span className="text-medical-text-secondary group-hover:text-medical-primary-900 group-hover:font-semibold transition-all duration-300">
                      {locale === 'ua' ? service.ua : service.en}
                    </span>
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
