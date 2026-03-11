'use client';

import { useLocale } from '@/contexts';
import { motion } from 'framer-motion';
import { useState } from 'react';
import {
  Heart,
  Shield,
  Users,
  Clock,
  FileText,
  CheckCircle,
  Phone,
  Mail,
  Stethoscope,
  TestTube,
  Activity,
  Syringe,
  ClipboardList,
  ArrowRight,
} from 'lucide-react';
import { Button, Card, Input } from '@/components/ui';
import { DoctorsSection } from '@/components/features/home/DoctorsSection';
import { BookingModal } from '@/features/booking';

const freeServices = [
  {
    icon: Stethoscope,
    title: { ua: 'Діагностика та лікування', en: 'Diagnostics & Treatment' },
    items: {
      ua: ['Лікування поширених захворювань', 'Ведення хронічних хвороб', 'Електронні направлення до спеціалістів', 'Необмежена кількість візитів'],
      en: ['Treatment of common diseases', 'Chronic disease management', 'Electronic referrals to specialists', 'Unlimited visits'],
    },
  },
  {
    icon: FileText,
    title: { ua: 'Довідки та листки непрацездатності', en: 'Medical Certificates & Sick Leave' },
    items: {
      ua: ['Медичні довідки', 'Листки непрацездатності', 'Рецепти за програмою "Доступні ліки"'],
      en: ['Medical certificates', 'Sick leave documents', 'Prescriptions under "Accessible Medicines"'],
    },
  },
  {
    icon: TestTube,
    title: { ua: 'Лабораторні аналізи', en: 'Laboratory Tests' },
    items: {
      ua: ['Загальний аналіз крові', 'Аналіз сечі', 'Холестерин крові', 'Глюкоза крові', 'ВІЛ тест', 'Гепатити B, C'],
      en: ['Complete blood count', 'Urinalysis', 'Blood cholesterol', 'Blood glucose', 'HIV test', 'Hepatitis B, C'],
    },
  },
  {
    icon: Activity,
    title: { ua: 'Інструментальні обстеження', en: 'Instrumental Examinations' },
    items: {
      ua: ['ЕКГ (кардіограма)', 'Спірографія', 'Отоскопія', 'Вимірювання тиску', 'Вимірювання ваги та зросту'],
      en: ['ECG (cardiogram)', 'Spirography', 'Otoscopy', 'Blood pressure measurement', 'Weight and height measurement'],
    },
  },
  {
    icon: Syringe,
    title: { ua: 'Вакцинація', en: 'Vaccination' },
    items: {
      ua: ['Контроль щеплень за календарем', 'Туберкульоз', 'Поліомієліт', 'Кір', 'Гепатит B', 'Правець'],
      en: ['Vaccination control per calendar', 'Tuberculosis', 'Polio', 'Measles', 'Hepatitis B', 'Tetanus'],
    },
  },
  {
    icon: ClipboardList,
    title: { ua: 'Профогляди', en: 'Preventive Examinations' },
    items: {
      ua: ['Діабет', 'ВІЛ', 'Туберкульоз', 'Рак молочної залози', 'Гіпертонія', 'Колоректальний рак'],
      en: ['Diabetes', 'HIV', 'Tuberculosis', 'Breast cancer', 'Hypertension', 'Colorectal cancer'],
    },
  },
];

export default function AsklepiyRodynaPage() {
  const { locale } = useLocale();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    doctor: '',
    question: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    if (field === 'name' || field === 'doctor') {
      const filteredValue = value.replace(/[0-9]/g, '');
      setFormData((prev) => ({ ...prev, [field]: filteredValue }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  return (
    <div className="pt-[80px]">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-medical-primary-50 via-white to-medical-accent-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="inline-block px-4 py-2 bg-medical-accent-100 text-medical-accent-700 rounded-sm text-sm font-medium mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {locale === 'ua' ? 'Сімейна медицина' : 'Family Medicine'}
            </motion.div>

            <h1 className="font-secondary text-3xl md:text-5xl font-medium text-medical-primary-900 mb-6 leading-tight">
              {locale === 'ua'
                ? 'Для нас найважливіше — це здоров\'я та довіра кожної родини'
                : 'For us, the most important thing is the health and trust of every family'}
            </h1>

            <p className="text-lg text-medical-text-secondary mb-8 leading-relaxed">
              {locale === 'ua'
                ? '«Асклепій Родина» — це сучасний центр сімейної медицини біля вашого дому. Якісні медичні послуги у комфортних умовах без черг та стресу.'
                : '"Asklepiy Rodyna" is a modern family medicine center near your home. Quality medical services in comfortable conditions without queues and stress.'}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-[340px] sm:max-w-[680px] mx-auto">
              <Button
                size="lg"
                rightIcon={<ArrowRight className="w-4 h-4" />}
                onClick={() => window.location.href = '#declaration'}
                className="w-full sm:flex-1"
              >
                {locale === 'ua' ? 'Заключити декларацію' : 'Sign Declaration'}
              </Button>
              <Button
                variant="outline"
                size="lg"
                leftIcon={<img src="/images/tg-logo.svg" alt="Telegram" className="w-5 h-5" />}
                onClick={() => window.open('https://t.me/asklepiy_rodyna', '_blank', 'noopener,noreferrer')}
                className="w-full sm:flex-1 justify-center"
              >
                <span className="text-center">{locale === 'ua' ? 'Telegram-канал сімейної медицини' : 'Family Medicine Telegram Channel'}</span>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Service Options Section */}
      <section className="section bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">
              {locale === 'ua'
                ? 'Як ви можете обслуговуватись в «Асклепій Родина»?'
                : 'How can you get service at "Asklepiy Rodyna"?'}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* With Declaration */}
            <motion.div
              className="bg-gradient-to-br from-medical-primary-900 to-medical-primary-800 text-white p-8 rounded-sm flex flex-col"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="w-14 h-14 bg-white/20 rounded-sm flex items-center justify-center mb-4">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-medium mb-4">
                {locale === 'ua' ? 'З декларацією' : 'With Declaration'}
              </h3>
              <p className="text-medical-surface-300 mb-6 leading-relaxed">
                {locale === 'ua'
                  ? 'Безкоштовні послуги за програмою медичних гарантій НСЗУ. Первинна медична допомога.'
                  : 'Free services under NSZU medical guarantees program. Primary medical care.'}
              </p>
              <ul className="space-y-3 mb-6 flex-grow">
                {[
                  { ua: 'Надійний медичний партнер біля дому', en: 'Reliable medical partner near home' },
                  { ua: 'Доказова медицина та сучасні протоколи', en: 'Evidence-based medicine & modern protocols' },
                  { ua: 'Комплексні рішення для здоров\'я родини', en: 'Comprehensive health solutions for family' },
                  { ua: 'Професійна допомога без черг', en: 'Professional help without queues' },
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-medical-accent-400 flex-shrink-0 mt-0.5" />
                    <span className="text-medical-surface-200">
                      {locale === 'ua' ? item.ua : item.en}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto text-center">
                <Button variant="secondary" onClick={() => window.location.href = '#declaration'}>
                  {locale === 'ua' ? 'Заключити декларацію' : 'Sign Declaration'}
                </Button>
              </div>
            </motion.div>

            {/* Without Declaration */}
            <motion.div
              className="bg-medical-surface-50 p-8 rounded-sm border-2 border-medical-surface-200 flex flex-col"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="w-14 h-14 bg-medical-accent-100 rounded-sm flex items-center justify-center mb-4">
                <Heart className="w-7 h-7 text-medical-accent-600" />
              </div>
              <h3 className="text-2xl font-medium text-medical-primary-900 mb-4">
                {locale === 'ua' ? 'Без декларації' : 'Without Declaration'}
              </h3>
              <p className="text-medical-text-secondary mb-6 leading-relaxed">
                {locale === 'ua'
                  ? 'Платні послуги доступні без декларації. Отримайте якісну медичну допомогу в зручний час.'
                  : 'Paid services available without declaration. Get quality medical care at your convenience.'}
              </p>
              <ul className="space-y-3 mb-6 flex-grow">
                {[
                  { ua: 'Консультація терапевта або педіатра', en: 'Therapist or pediatrician consultation' },
                  { ua: 'Лабораторні аналізи у власній лабораторії', en: 'Lab tests in our own laboratory' },
                  { ua: 'УЗД на сучасному експертному обладнанні', en: 'Ultrasound on modern expert equipment' },
                  { ua: 'ЕКГ або Холтер-моніторування', en: 'ECG or Holter monitoring' },
                  { ua: 'Добове моніторування тиску', en: '24-hour blood pressure monitoring' },
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-medical-accent-600 flex-shrink-0 mt-0.5" />
                    <span className="text-medical-text-secondary">
                      {locale === 'ua' ? item.ua : item.en}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto text-center">
                <Button
                  variant="outline"
                  onClick={() => setIsBookingOpen(true)}
                >
                  {locale === 'ua' ? 'Записатися на прийом' : 'Book Appointment'}
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Doctor Selection Section */}
      <DoctorsSection showTitleOnly title={
        locale === 'ua'
          ? 'Оберіть лікаря, з яким бажаєте заключити декларацію'
          : 'Choose a doctor to sign a declaration with'
      } />

      {/* Free Services Section */}
      <section className="section bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">
              {locale === 'ua'
                ? 'Безкоштовні послуги по декларації'
                : 'Free Services with Declaration'}
            </h2>
            <p className="section-subtitle mx-auto">
              {locale === 'ua'
                ? 'Послуги сімейного лікаря, терапевта і педіатра, які раніше були доступні тільки в державних поліклініках, тепер доступні в «Асклепій»'
                : 'Family doctor, therapist and pediatrician services previously available only in public clinics are now available at Asklepiy'}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {freeServices.map((service, index) => (
              <motion.div
                key={service.title[locale === 'ua' ? 'ua' : 'en']}
                className="bg-medical-surface-50 p-6 rounded-sm"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="w-12 h-12 bg-medical-accent-100 rounded-sm flex items-center justify-center mb-4">
                  <service.icon className="w-6 h-6 text-medical-accent-600" />
                </div>
                <h3 className="text-lg font-medium text-medical-primary-900 mb-4">
                  {service.title[locale === 'ua' ? 'ua' : 'en']}
                </h3>
                <ul className="space-y-2">
                  {service.items[locale === 'ua' ? 'ua' : 'en'].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-medical-text-secondary text-sm">
                      <CheckCircle className="w-4 h-4 text-medical-accent-600 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="section bg-medical-surface-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              className="flex flex-col"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-secondary text-3xl md:text-4xl font-medium text-medical-primary-900 mb-6">
                {locale === 'ua' ? 'Залишилися питання?' : 'Still have questions?'}
              </h2>
              <p className="text-medical-text-secondary text-lg mb-8 leading-relaxed">
                {locale === 'ua'
                  ? 'Заповніть форму і наш менеджер зв\'яжеться з вами протягом 15 хвилин'
                  : 'Fill out the form and our manager will contact you within 15 minutes'}
              </p>

              {/* Contact Details */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-medical-accent-100 rounded-sm flex items-center justify-center">
                    <Phone className="w-5 h-5 text-medical-accent-600" />
                  </div>
                  <div>
                    <p className="text-sm text-medical-text-tertiary">
                      {locale === 'ua' ? 'Контакт-центр:' : 'Contact Center:'}
                    </p>
                    <a href="tel:+380980463303" className="text-medical-primary-900 font-medium hover:text-medical-accent-600 transition-colors">
                      +38 (098) 046-33-03
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-medical-accent-100 rounded-sm flex items-center justify-center">
                    <Mail className="w-5 h-5 text-medical-accent-600" />
                  </div>
                  <div>
                    <p className="text-sm text-medical-text-tertiary">Email:</p>
                    <a href="mailto:info@asklepiy.com" className="text-medical-primary-900 font-medium hover:text-medical-accent-600 transition-colors">
                      info@asklepiy.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Working Hours */}
              <div className="bg-white p-6 rounded-sm shadow-medical-md mt-auto">
                <h4 className="font-medium text-medical-primary-900 mb-4">
                  {locale === 'ua' ? 'Графік роботи:' : 'Working Hours:'}
                </h4>
                <div className="space-y-2 text-medical-text-secondary">
                  <div className="flex justify-between">
                    <span>{locale === 'ua' ? 'Пн-Сб:' : 'Mon-Sat:'}</span>
                    <span className="font-medium">07:00 - 20:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{locale === 'ua' ? 'Неділя:' : 'Sunday:'}</span>
                    <span className="font-medium">08:00 - 20:00</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              className="bg-white p-8 rounded-sm shadow-medical-lg"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              {isSuccess ? (
                <motion.div
                  className="text-center py-12"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="w-16 h-16 bg-medical-status-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-medical-status-success" />
                  </div>
                  <h3 className="text-xl font-medium text-medical-primary-900 mb-2">
                    {locale === 'ua' ? 'Дякуємо за звернення!' : 'Thank you for contacting us!'}
                  </h3>
                  <p className="text-medical-text-secondary">
                    {locale === 'ua'
                      ? 'Ми зв\'яжемося з вами найближчим часом'
                      : 'We will contact you shortly'}
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-medical-primary-900 mb-2">
                      {locale === 'ua' ? 'Ваше ім\'я' : 'Your Name'}
                    </label>
                    <Input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder={locale === 'ua' ? 'Прізвище ім\'я' : 'Last name first name'}
                      required
                    />
                  </div>

                  <div>
                    <Input
                      type="tel"
                      label={locale === 'ua' ? 'Номер телефону' : 'Phone Number'}
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      required
                      placeholder={locale === 'ua' ? 'Ваш номер телефону' : 'Your phone number'}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-medical-primary-900 mb-2">
                      {locale === 'ua' ? 'Ваш лікар' : 'Your Doctor'}
                    </label>
                    <Input
                      type="text"
                      value={formData.doctor}
                      onChange={(e) => handleInputChange('doctor', e.target.value)}
                      placeholder={locale === 'ua' ? 'ПІБ лікаря' : 'Doctor\'s name'}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-medical-primary-900 mb-2">
                      {locale === 'ua' ? 'Запитання або коментар' : 'Question or Comment'}
                    </label>
                    <textarea
                      value={formData.question}
                      onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                      placeholder={locale === 'ua' ? 'Опишіть ваше запитання...' : 'Describe your question...'}
                      rows={4}
                      className="w-full px-4 py-3 border border-medical-surface-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-medical-accent-500 focus:border-transparent resize-none"
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    {locale === 'ua' ? 'Укласти декларацію' : 'Sign Declaration'}
                  </Button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </div>
  );
}
