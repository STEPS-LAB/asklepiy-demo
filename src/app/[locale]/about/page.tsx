'use client';

import { useLocale } from '@/contexts';
import { motion } from 'framer-motion';
import { Award, Heart, Users, Activity, Shield, Clock } from 'lucide-react';
import { Card } from '@/components/ui';

const stats = [
  { icon: Award, value: '20+', label: 'років досвіду', labelEn: 'years of experience' },
  { icon: Users, value: '50+', label: 'лікарів', labelEn: 'doctors' },
  { icon: Heart, value: '100K+', label: 'пацієнтів', labelEn: 'satisfied patients' },
  { icon: Activity, value: '500+', label: 'послуг', labelEn: 'services offered' },
];

const values = [
  { icon: Shield, title: 'Професіоналізм', titleEn: 'Professionalism', description: 'Висококваліфіковані фахівці', descriptionEn: 'Highly qualified specialists' },
  { icon: Heart, title: 'Турбота', titleEn: 'Care', description: 'Індивідуальний підхід', descriptionEn: 'Individual approach' },
  { icon: Award, title: 'Якість', titleEn: 'Quality', description: 'Сучасне обладнання', descriptionEn: 'Modern equipment' },
  { icon: Clock, title: 'Доступність', titleEn: 'Accessibility', description: 'Зручний графік', descriptionEn: 'Convenient schedule' },
];

export default function AboutPage() {
  const { locale } = useLocale();

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl md:text-4xl font-secondary font-medium text-medical-primary-900 mb-4">
          {locale === 'ua' ? 'Про клініку Асклепій' : 'About Asklepiy Clinic'}
        </h1>
        <p className="text-lg text-medical-text-secondary max-w-3xl mx-auto">
          {locale === 'ua'
            ? 'Провідний приватний медичний центр України з сучасним обладнанням та кваліфікованими лікарями'
            : "Ukraine's leading private clinic with modern equipment and qualified doctors"}
        </p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-6">
              <stat.icon className="w-8 h-8 text-medical-accent-600 mx-auto mb-3" />
              <span className="block text-3xl font-secondary font-medium text-medical-primary-900 mb-1">
                {stat.value}
              </span>
              <span className="text-medical-text-secondary">
                {locale === 'ua' ? stat.label : stat.labelEn}
              </span>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Mission */}
      <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h2 className="text-2xl font-secondary font-medium text-medical-primary-900 mb-4">
            {locale === 'ua' ? 'Наша місія' : 'Our mission'}
          </h2>
          <p className="text-medical-text-secondary leading-relaxed mb-6">
            {locale === 'ua'
              ? 'Надавати якісні медичні послуги з використанням сучасних технологій та індивідуальним підходом до кожного пацієнта. Ми прагнемо зробити медицину доступною та зрозумілою для кожної людини.'
              : 'To provide quality medical services using modern technologies and an individual approach to each patient. We strive to make medicine accessible and understandable for everyone.'}
          </p>
          <p className="text-medical-text-secondary leading-relaxed">
            {locale === 'ua'
              ? 'Наша команда постійно вдосконалює свої навички та впроваджує новітні методи лікування.'
              : 'Our team constantly improves their skills and implements the latest treatment methods.'}
          </p>
        </motion.div>
        <motion.div
          className="aspect-video bg-gradient-to-br from-medical-primary-200 to-medical-accent-200 rounded-sm"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        />
      </div>

      {/* Values */}
      <div>
        <h2 className="text-2xl font-secondary font-medium text-medical-primary-900 text-center mb-8">
          {locale === 'ua' ? 'Наші цінності' : 'Our values'}
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 text-center h-full">
                <div className="w-14 h-14 bg-medical-accent-100 rounded-sm flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-7 h-7 text-medical-accent-600" />
                </div>
                <h3 className="text-lg font-medium text-medical-primary-900 mb-2">
                  {locale === 'ua' ? value.title : value.titleEn}
                </h3>
                <p className="text-medical-text-secondary text-sm">
                  {locale === 'ua' ? value.description : value.descriptionEn}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
