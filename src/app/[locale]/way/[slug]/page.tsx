'use client';

import { useLocale } from '@/contexts';
import { motion } from 'framer-motion';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  Phone,
  Mail,
  Star,
  ChevronRight,
  ArrowLeft,
  CheckCircle,
  Send,
  User,
  Stethoscope,
  Award,
  BookOpen
} from 'lucide-react';
import { Button, Input, Card } from '@/components/ui';
import Link from 'next/link';
import { BookingModal } from '@/features/booking';

const departmentData = {
  gastroenterology: {
    title: { ua: 'Гастроентерологія', en: 'Gastroenterology' },
    description: {
      ua: 'Сучасне відділення гастроентерології пропонує комплексну діагностику та лікування захворювань органів травлення. Наші фахівці використовують найновіші методики для ефективного лікування пацієнтів.',
      en: 'Our modern gastroenterology department offers comprehensive diagnosis and treatment of digestive organ diseases. Our specialists use the latest techniques for effective patient treatment.',
    },
    features: [
      { ua: 'Сучасне ендоскопічне обладнання', en: 'Modern endoscopic equipment' },
      { ua: 'Досвідчені лікарі-гастроентерологи', en: 'Experienced gastroenterologists' },
      { ua: 'Комплексна діагностика', en: 'Comprehensive diagnostics' },
      { ua: 'Індивідуальний підхід до лікування', en: 'Individual treatment approach' },
    ],
    services: [
      { ua: 'Консультація гастроентеролога', en: 'Gastroenterologist consultation', price: 600 },
      { ua: 'Гастроскопія', en: 'Gastroscopy', price: 1200 },
      { ua: 'Колоноскопія', en: 'Colonoscopy', price: 1800 },
      { ua: 'УЗД органів черевної порожнини', en: 'Abdominal ultrasound', price: 800 },
      { ua: 'pH-метрія стравоходу', en: 'Esophageal pH monitoring', price: 1000 },
      { ua: 'Дихальний тест на Helicobacter', en: 'Helicobacter breath test', price: 500 },
    ],
  },
};

const doctors = [
  {
    name: { ua: 'Коваленко Олександр', en: 'Kovalenko Oleksandr' },
    specialty: { ua: 'Лікар-гастроентеролог', en: 'Gastroenterologist' },
    experience: 15,
    image: '/doctors/kovalenko.jpg',
  },
  {
    name: { ua: 'Шевченко Ірина', en: 'Shevchenko Iryna' },
    specialty: { ua: 'Лікар-гастроентеролог, ендоскопіст', en: 'Gastroenterologist, Endoscopist' },
    experience: 12,
    image: '/doctors/shevchenko.jpg',
  },
  {
    name: { ua: 'Бондаренко Петро', en: 'Bondarenko Petro' },
    specialty: { ua: 'Лікар-дієтолог', en: 'Dietitian' },
    experience: 10,
    image: '/doctors/bondarenko.jpg',
  },
];

const reviews = [
  {
    name: { ua: 'Марія К.', en: 'Maria K.' },
    rating: 5,
    text: {
      ua: 'Дуже задоволена прийомом! Лікар уважно вислухав, призначив необхідні обстеження та ефективне лікування.',
      en: 'Very satisfied with the appointment! The doctor listened carefully, prescribed necessary examinations and effective treatment.',
    },
    date: '15.02.2026',
  },
  {
    name: { ua: 'Олександр П.', en: 'Oleksandr P.' },
    rating: 5,
    text: {
      ua: 'Проходив гастроскопію. Все пройшло швидко та безболісно. Дякую персоналу за професіоналізм!',
      en: 'Had a gastroscopy. Everything was quick and painless. Thank you to the staff for their professionalism!',
    },
    date: '10.02.2026',
  },
  {
    name: { ua: 'Олена В.', en: 'Olena V.' },
    rating: 4,
    text: {
      ua: 'Хороше відділення, сучасне обладнання. Єдине - довелося трохи зачекати на прийом.',
      en: 'Good department, modern equipment. The only thing is I had to wait a bit for the appointment.',
    },
    date: '05.02.2026',
  },
];

export default function WayPage() {
  const { locale } = useLocale();
  const params = useParams();
  const router = useRouter();
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', comment: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const slug = params.slug as string;
  const department = departmentData.gastroenterology; // Demo: always show gastroenterology

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', phone: '', comment: '' });
      setIsBookingOpen(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-medical-surface-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-medical-primary-900 to-medical-primary-800 text-white py-10 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/directions"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              {locale === 'ua' ? 'Напрямки' : 'Directions'}
            </Link>
            
            <motion.div 
              className="flex items-center gap-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <motion.div 
                className="w-14 h-14 bg-white/20 rounded-sm flex items-center justify-center backdrop-blur-sm"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <Stethoscope className="w-7 h-7 text-white" />
              </motion.div>
              <div>
                <h1 className="text-3xl md:text-4xl font-secondary font-medium">
                  {locale === 'ua' ? department.title.ua : department.title.en}
                </h1>
                <motion.div 
                  className="flex items-center gap-3 text-white/80 mt-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <motion.div 
                    className="flex items-center gap-1"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">4.9</span>
                  </motion.div>
                  <span>•</span>
                  <motion.span 
                    className="hover:text-white transition-colors cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                  >
                    {locale === 'ua' ? '127 відгуків' : '127 reviews'}
                  </motion.span>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Department */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            <div>
              <h2 className="text-3xl font-secondary font-medium text-medical-primary-900 mb-6">
                {locale === 'ua'
                  ? 'Про відділення'
                  : 'About the Department'}
              </h2>
              <p className="text-lg text-medical-text-secondary mb-6 leading-relaxed">
                {locale === 'ua' ? department.description.ua : department.description.en}
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {department.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <CheckCircle className="w-5 h-5 text-medical-status-success flex-shrink-0" />
                    <span className="text-medical-text-secondary">
                      {locale === 'ua' ? feature.ua : feature.en}
                    </span>
                  </motion.div>
                ))}
              </div>

              <Button
                size="lg"
                className="mt-8"
                onClick={() => setIsBookingOpen(true)}
              >
                <span className="flex items-center">
                  {locale === 'ua' ? 'Записатися на прийом' : 'Book an appointment'}
                  <ChevronRight className="w-5 h-5 ml-2" />
                </span>
              </Button>
            </div>

            <div className="relative">
              <div className="aspect-[4/3] bg-gradient-to-br from-medical-accent-100 to-medical-surface-100 rounded-sm flex items-center justify-center">
                <Stethoscope className="w-32 h-32 text-medical-accent-300" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-sm shadow-medical-lg">
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-medical-primary-900">15+</p>
                    <p className="text-sm text-medical-text-tertiary">
                      {locale === 'ua' ? 'років досвіду' : 'years of experience'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Doctors */}
      <section className="py-12 bg-medical-surface-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-secondary font-medium text-medical-primary-900 text-center mb-4">
              {locale === 'ua' ? 'Наші лікарі' : 'Our Doctors'}
            </h2>
            <p className="text-lg text-medical-text-secondary text-center mb-12 max-w-2xl mx-auto">
              {locale === 'ua'
                ? 'Висококваліфіковані фахівці з багаторічним досвідом'
                : 'Highly qualified specialists with years of experience'}
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {doctors.map((doctor, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-sm overflow-hidden shadow-medical-md hover:shadow-medical-lg transition-shadow"
                >
                  {/* Doctor Image Placeholder */}
                  <div className="aspect-[4/5] bg-gradient-to-br from-medical-primary-200 to-medical-accent-200 flex items-center justify-center">
                    <User className="w-24 h-24 text-medical-primary-900/20" />
                  </div>

                  {/* Info */}
                  <div className="p-6">
                    <h3 className="text-lg font-medium text-medical-primary-900 mb-1">
                      {locale === 'ua' ? doctor.name.ua : doctor.name.en}
                    </h3>
                    <p className="text-medical-text-secondary text-sm mb-4">
                      {locale === 'ua' ? doctor.specialty.ua : doctor.specialty.en}
                    </p>

                    {/* Stats */}
                    <div className="flex items-center gap-4 mb-4 text-sm text-medical-text-secondary">
                      <div className="flex items-center gap-1">
                        <Award className="w-4 h-4 text-medical-accent-600" />
                        <span>
                          {doctor.experience} {locale === 'ua' ? 'років' : 'years'}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button variant="outline" className="w-full">
                        {locale === 'ua' ? 'Переглянути' : 'View Profile'}
                      </Button>
                      <Button className="w-full" onClick={() => setIsBookingOpen(true)}>
                        {locale === 'ua' ? 'Записатись' : 'Book'}
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services & Prices */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-secondary font-medium text-medical-primary-900 text-center mb-4">
              {locale === 'ua' ? 'Послуги та ціни' : 'Services & Prices'}
            </h2>
            <p className="text-lg text-medical-text-secondary text-center mb-12 max-w-2xl mx-auto">
              {locale === 'ua'
                ? 'Прозоре ціноутворення без прихованих платежів'
                : 'Transparent pricing with no hidden fees'}
            </p>

            <div className="max-w-4xl mx-auto">
              {department.services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center justify-between py-4 border-b border-medical-surface-200 last:border-0 hover:bg-medical-surface-50 px-4 -mx-4 rounded-sm transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-5 h-5 text-medical-accent-400" />
                    <span className="text-medical-text-secondary">
                      {locale === 'ua' ? service.ua : service.en}
                    </span>
                  </div>
                  <span className="text-lg font-medium text-medical-primary-900">
                    {service.price} ₴
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-12 bg-medical-surface-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-secondary font-medium text-medical-primary-900 text-center mb-4">
              {locale === 'ua' ? 'Відгуки пацієнтів' : 'Patient Reviews'}
            </h2>
            <p className="text-lg text-medical-text-secondary text-center mb-12 max-w-2xl mx-auto">
              {locale === 'ua'
                ? 'Думки наших пацієнтів про якість обслуговування'
                : 'What our patients say about our service quality'}
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              {reviews.map((review, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6 h-full">
                    <div className="flex items-center gap-2 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            'w-4 h-4',
                            i < review.rating
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-medical-surface-300'
                          )}
                        />
                      ))}
                    </div>
                    <p className="text-medical-text-secondary mb-4 leading-relaxed">
                      {locale === 'ua' ? review.text.ua : review.text.en}
                    </p>
                    <div className="flex items-center justify-between text-sm text-medical-text-tertiary">
                      <span className="font-medium text-medical-primary-900">
                        {locale === 'ua' ? review.name.ua : review.name.en}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {review.date}
                      </span>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Booking Form Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <Card className="p-8 bg-gradient-to-br from-medical-primary-900 to-medical-primary-800 text-white">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-secondary font-medium mb-2">
                  {locale === 'ua' ? 'Запишіться на прийом' : 'Book an appointment'}
                </h2>
                <p className="text-white/80">
                  {locale === 'ua'
                    ? 'Залиште заявку і ми зв\'яжемося з вами протягом 15 хвилин'
                    : 'Leave your details and we will contact you within 15 minutes'}
                </p>
              </div>

              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    type="text"
                    placeholder={locale === 'ua' ? 'Ваше ім\'я' : 'Your name'}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white/40 focus:ring-white/20"
                  />
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    placeholder={locale === 'ua' ? 'Ваш номер телефону' : 'Your phone number'}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white/40 focus:ring-white/20"
                  />
                  <Input
                    type="text"
                    placeholder={locale === 'ua' ? 'Коментар (необов\'язково)' : 'Comment (optional)'}
                    value={formData.comment}
                    onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white/40 focus:ring-white/20"
                  />
                  <div className="flex justify-center">
                    <Button
                      type="submit"
                      size="lg"
                      className="bg-white text-medical-primary-900 hover:bg-white/90 justify-center"
                    >
                      <div className="flex items-center">
                        <Send className="w-4 h-4 mr-2" />
                        <span>{locale === 'ua' ? 'Надіслати заявку' : 'Send request'}</span>
                      </div>
                    </Button>
                  </div>
                </form>
              ) : (
                <motion.div
                  className="text-center py-8"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <CheckCircle className="w-16 h-16 text-white mx-auto mb-4" />
                  <h3 className="text-xl font-medium mb-2">
                    {locale === 'ua' ? 'Дякуємо за заявку!' : 'Thank you for your request!'}
                  </h3>
                  <p className="text-white/80">
                    {locale === 'ua'
                      ? 'Наш менеджер зв\'яжеться з вами найближчим часом'
                      : 'Our manager will contact you shortly'}
                  </p>
                </motion.div>
              )}
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Booking Modal */}
      {isBookingOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-sm shadow-medical-xl max-w-md w-full p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-medium text-medical-primary-900">
                {locale === 'ua' ? 'Запис на прийом' : 'Book appointment'}
              </h3>
              <button
                onClick={() => setIsBookingOpen(false)}
                className="text-medical-text-tertiary hover:text-medical-primary-900"
              >
                <ArrowLeft className="w-5 h-5 rotate-180" />
              </button>
            </div>

            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label={locale === 'ua' ? 'Ваше ім\'я' : 'Your name'}
                  placeholder={locale === 'ua' ? 'Іван Петренко' : 'Ivan Petrenko'}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
                <Input
                  type="tel"
                  label={locale === 'ua' ? 'Номер телефону' : 'Phone number'}
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                  placeholder={locale === 'ua' ? 'Ваш номер телефону' : 'Your phone number'}
                />
                <div>
                  <label className="block text-sm font-medium text-medical-text-primary mb-2">
                    {locale === 'ua' ? 'Коментар' : 'Comment'}
                  </label>
                  <textarea
                    className="w-full px-4 py-3 border border-medical-surface-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-medical-accent-500 resize-none"
                    rows={3}
                    placeholder={locale === 'ua' ? 'Ваше повідомлення...' : 'Your message...'}
                    value={formData.comment}
                    onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                  />
                </div>
                <Button type="submit" size="lg" className="w-full">
                  <Send className="w-4 h-4 mr-2" />
                  {locale === 'ua' ? 'Надіслати заявку' : 'Send request'}
                </Button>
              </form>
            ) : (
              <motion.div
                className="text-center py-8"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <CheckCircle className="w-16 h-16 text-medical-status-success mx-auto mb-4" />
                <h3 className="text-xl font-medium text-medical-primary-900 mb-2">
                  {locale === 'ua' ? 'Дякуємо за заявку!' : 'Thank you for your request!'}
                </h3>
                <p className="text-medical-text-secondary">
                  {locale === 'ua'
                    ? 'Наш менеджер зв\'яжеться з вами протягом 15 хвилин'
                    : 'Our manager will contact you within 15 minutes'}
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}

      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </div>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}
