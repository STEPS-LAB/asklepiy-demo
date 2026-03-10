'use client';

import { useLocale } from '@/contexts';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import {
  Activity,
  CheckCircle,
  Phone,
  Mail,
  Stethoscope,
  TestTube,
  ClipboardList,
  ArrowRight,
  Clock,
  MapPin,
  Calendar,
  UserCheck,
} from 'lucide-react';
import { Button } from '@/components/ui';

const locations = [
  { id: 1, address: 'м. Житомир, вул. Покровська, 31', addressEn: 'Zhytomyr, Pokrovska St, 31' },
  { id: 2, address: 'м. Житомир, вул. Фещенка-Чопівського, 24/4', addressEn: 'Zhytomyr, Feshchenka-Chopivskoho St, 24/4' },
  { id: 3, address: 'м. Житомир, вул. Шевченка, 14', addressEn: 'Zhytomyr, Shevchenka St, 14' },
  { id: 4, address: 'м. Житомир, вул. Є. Рихліка, 11а', addressEn: 'Zhytomyr, Y. Rykhlika St, 11a' },
  { id: 5, address: 'м. Житомир, вул. Вітрука, 2а', addressEn: 'Zhytomyr, Vitruka St, 2a' },
  { id: 6, address: 'м. Житомир, пр-т. Миру, 5', addressEn: 'Zhytomyr, Myru Ave, 5' },
  { id: 7, address: 'м. Житомир, пр-т. Миру, 21', addressEn: 'Zhytomyr, Myru Ave, 21' },
  { id: 8, address: 'м. Житомир, вул. Чорновола, 8а', addressEn: 'Zhytomyr, Chornovola St, 8a' },
  { id: 9, address: 'м. Житомир, проїзд Шпаковський, 18', addressEn: 'Zhytomyr, Shpakivskyi Passage, 18' },
  { id: 10, address: 'м. Бердичів, вул. Житомирська, 46/1', addressEn: 'Berdychiv, Zhytomyrska St, 46/1' },
];

const screeningComponents = [
  {
    icon: ClipboardList,
    title: { ua: 'Оцінка ризиків', en: 'Risk Assessment' },
    description: {
      ua: 'Індивідуальна оцінка ризиків через опитувальник (серце, діабет 2 типу, ментальне здоров\'я)',
      en: 'Individual risk assessment through questionnaire (heart, type 2 diabetes, mental health)',
    },
  },
  {
    icon: Stethoscope,
    title: { ua: 'Фізичне обстеження', en: 'Physical Examination' },
    description: {
      ua: 'Вимірювання артеріального тиску, пульсу, ваги та зросту',
      en: 'Blood pressure, pulse, weight, and height measurement',
    },
  },
  {
    icon: TestTube,
    title: { ua: 'Лабораторна діагностика', en: 'Laboratory Diagnostics' },
    description: {
      ua: 'Тестування функції серця, кровоносних судин та нирок',
      en: 'Testing of heart, blood vessels, and kidney function',
    },
  },
  {
    icon: UserCheck,
    title: { ua: 'Консультація лікаря', en: 'Doctor\'s Consultation' },
    description: {
      ua: 'Персоналізовані рекомендації щодо способу життя, призначення ліків або е-направлення на додаткове лікування',
      en: 'Personalized recommendations on lifestyle, medication prescriptions, or e-referrals for additional treatment',
    },
  },
];

const steps = [
  {
    icon: Calendar,
    title: { ua: 'Отримайте запрошення', en: 'Get Invitation' },
    description: {
      ua: 'Ви отримаєте запрошення в додатку Дія на 30-й день після вашого дня народження',
      en: 'You will receive an invitation in the Diia app on the 30th day after your birthday',
    },
    step: '01',
  },
  {
    icon: CheckCircle,
    title: { ua: 'Підтвердіть участь', en: 'Confirm Participation' },
    description: {
      ua: 'Після підтвердження участі на вашу Diia.Card буде нараховано 2000 грн',
      en: 'After confirming participation, 2,000 UAH will be credited to your Diia.Card',
    },
    step: '02',
  },
  {
    icon: MapPin,
    title: { ua: 'Зверніться до МЦ "Асклепій"', en: 'Visit Asklepiy MC' },
    description: {
      ua: 'Оберіть зручну локацію та пройдіть обстеження у нашому медичному центрі',
      en: 'Choose a convenient location and complete the examination at our medical center',
    },
    step: '03',
  },
];

export default function Screening40Page() {
  const { locale } = useLocale();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    question: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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
              {locale === 'ua' ? 'Національна програма' : 'National Program'}
            </motion.div>

            <h1 className="font-secondary text-3xl md:text-5xl font-medium text-medical-primary-900 mb-6 leading-tight">
              {locale === 'ua'
                ? 'Скринінг 40+'
                : 'Screening 40+'}
            </h1>

            <p className="text-lg text-medical-text-secondary mb-8 leading-relaxed">
              {locale === 'ua'
                ? "Державна програма скринінгу для своєчасного виявлення ризиків серцево-судинних захворювань, діабету та підтримки ментального здоров'я"
                : 'State screening program for timely detection of cardiovascular diseases, diabetes, and mental health support'}
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link href="#program">
                <Button size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  {locale === 'ua' ? 'Дізнатися деталі' : 'Learn More'}
                </Button>
              </Link>
              <Link href="#booking">
                <Button variant="outline" size="lg">
                  {locale === 'ua' ? 'Записатися на обстеження' : 'Book Examination'}
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Program Info Section */}
      <section id="program" className="section bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">
              {locale === 'ua'
                ? 'Що таке скринінг 40+?'
                : 'What is Screening 40+?'}
            </h2>
            <p className="section-subtitle mx-auto max-w-3xl">
              {locale === 'ua'
                ? 'Це ініціатива, яка дозволить мільйонам громадян своєчасно виявити ризики захворювань та отримати якісну медичну допомогу'
                : 'This initiative will allow millions of citizens to timely detect disease risks and receive quality medical care'}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Free Program */}
            <motion.div
              className="bg-gradient-to-br from-medical-primary-900 to-medical-primary-800 text-white p-8 rounded-sm"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="w-14 h-14 bg-white/20 rounded-sm flex items-center justify-center mb-4">
                <CheckCircle className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-medium mb-4">
                {locale === 'ua' ? 'Безкоштовно за держпрограмою' : 'Free via State Program'}
              </h3>
              <p className="text-medical-surface-300 mb-6 leading-relaxed">
                {locale === 'ua'
                  ? 'Повна вартість обстеження (2000 грн) покривається державним фінансуванням через систему Diia.Card'
                  : 'Full examination cost (2,000 UAH) is covered by state funding through Diia.Card system'}
              </p>
              <ul className="space-y-3">
                {[
                  { ua: 'Для всіх громадян віком 40+', en: 'For all citizens aged 40+' },
                  { ua: 'Запрошення через додаток Дія', en: 'Invitation via Diia app' },
                  { ua: '2000 грн на рахунку Diia.Card', en: '2,000 UAH on Diia.Card account' },
                  { ua: 'Комплексне обстеження', en: 'Comprehensive examination' },
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-medical-accent-400 flex-shrink-0 mt-0.5" />
                    <span className="text-medical-surface-200">
                      {locale === 'ua' ? item.ua : item.en}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Alternative Option */}
            <motion.div
              className="bg-medical-surface-50 p-8 rounded-sm border-2 border-medical-surface-200"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="w-14 h-14 bg-medical-accent-100 rounded-sm flex items-center justify-center mb-4">
                <Clock className="w-7 h-7 text-medical-accent-600" />
              </div>
              <h3 className="text-2xl font-medium text-medical-primary-900 mb-4">
                {locale === 'ua' ? 'Альтернативний варіант' : 'Alternative Option'}
              </h3>
              <p className="text-medical-text-secondary mb-6 leading-relaxed">
                {locale === 'ua'
                  ? 'Якщо ви не користуєтесь додатком Дія, можна подати заяву та отримати спеціальну банківську картку через ЦНАП'
                  : 'If you don\'t use the Diia app, you can submit an application and receive a special bank card through TS NAP'}
              </p>
              <ul className="space-y-3">
                {[
                  { ua: 'Звернення до ЦНАПу', en: 'Apply at TS NAP office' },
                  { ua: 'Отримання спеціальної картки', en: 'Receive special bank card' },
                  { ua: 'Також 30 днів після дня народження', en: 'Also 30 days after birthday' },
                  { ua: 'Рівні можливості для всіх', en: 'Equal opportunities for everyone' },
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-medical-accent-600 flex-shrink-0 mt-0.5" />
                    <span className="text-medical-text-secondary">
                      {locale === 'ua' ? item.ua : item.en}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="section bg-medical-surface-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">
              {locale === 'ua'
                ? 'Як скористатися програмою'
                : 'How to Use the Program'}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {steps.map((step, index) => (
              <motion.div
                key={step.step}
                className="bg-white p-6 rounded-sm shadow-medical-md relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-medical-accent-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  {step.step}
                </div>
                <div className="w-14 h-14 bg-medical-accent-100 rounded-sm flex items-center justify-center mb-4">
                  <step.icon className="w-7 h-7 text-medical-accent-600" />
                </div>
                <h3 className="text-xl font-medium text-medical-primary-900 mb-3">
                  {locale === 'ua' ? step.title.ua : step.title.en}
                </h3>
                <p className="text-medical-text-secondary">
                  {locale === 'ua' ? step.description.ua : step.description.en}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included Section */}
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
                ? 'Що входить у комплексний скринінг'
                : 'What\'s Included in Comprehensive Screening'}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {screeningComponents.map((component, index) => (
              <motion.div
                key={component.title[locale === 'ua' ? 'ua' : 'en']}
                className="bg-medical-surface-50 p-6 rounded-sm"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="w-12 h-12 bg-medical-accent-100 rounded-sm flex items-center justify-center mb-4">
                  <component.icon className="w-6 h-6 text-medical-accent-600" />
                </div>
                <h3 className="text-lg font-medium text-medical-primary-900 mb-2">
                  {component.title[locale === 'ua' ? 'ua' : 'en']}
                </h3>
                <p className="text-medical-text-secondary text-sm">
                  {component.description[locale === 'ua' ? 'ua' : 'en']}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form Section */}
      <section id="booking" className="section bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
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
              <div className="bg-medical-surface-50 p-6 rounded-sm">
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

              {/* License Info */}
              <div className="mt-6 p-4 bg-medical-accent-50 rounded-sm border border-medical-accent-200">
                <p className="text-sm text-medical-text-secondary">
                  {locale === 'ua'
                    ? 'Ліцензія МОЗ України №460148 від 30.04.2014'
                    : 'License of Ministry of Health of Ukraine №460148 dated 30.04.2014'}
                </p>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              className="bg-medical-surface-50 p-8 rounded-sm shadow-medical-lg"
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
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={locale === 'ua' ? 'Іван Петренко' : 'Ivan Petrenko'}
                      required
                      className="w-full px-4 py-3 border border-medical-surface-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-medical-accent-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-medical-primary-900 mb-2">
                      {locale === 'ua' ? 'Номер телефону' : 'Phone Number'}
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+38 (___) ___-__-__"
                      required
                      className="w-full px-4 py-3 border border-medical-surface-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-medical-accent-500"
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
                    {locale === 'ua' ? 'Записатися на обстеження' : 'Book Examination'}
                  </Button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-medical-primary-900 to-medical-primary-800">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-secondary text-3xl md:text-4xl font-medium text-white mb-6">
              {locale === 'ua'
                ? "Ваше здоров'я — ваша відповідальність"
                : 'Your health is your responsibility'}
            </h2>
            <p className="text-medical-surface-300 text-lg mb-8 max-w-2xl mx-auto">
              {locale === 'ua'
                ? "Пройдіть скринінг вчасно в МЦ \"Асклепій\". Тільки до кінця року ви можете отримати повне обстеження безкоштовно за державною програмою"
                : 'Get screened on time at MC "Asklepiy". Only until the end of the year you can receive a full examination for free under the state program'}
            </p>
            <Link href="#booking">
              <Button size="lg" variant="secondary" rightIcon={<ArrowRight className="w-4 h-4" />}>
                {locale === 'ua' ? 'Записатися на скринінг' : 'Book Screening'}
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
