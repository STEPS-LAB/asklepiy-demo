'use client';

import { useLocale } from '@/contexts';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Calendar,
  Clock,
  Shield,
  Heart,
  Stethoscope,
  Microscope,
  Users,
  Award,
  Phone
} from 'lucide-react';
import { Button, Card } from '@/components/ui';
import { BookingModal } from '@/features/booking';

// Critical components (above the fold) - loaded immediately
import {
  ProgramsBanner,
  LaboratorySearch,
} from '@/components/features/home';

// Non-critical components (below the fold) - lazy loaded
const DoctorsSection = dynamic(
  () => import('@/components/features/home').then((mod) => mod.DoctorsSection),
  {
    ssr: true,
    loading: () => (
      <section className="section bg-medical-surface-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-sm overflow-hidden shadow-medical-md">
                <div className="aspect-[4/5] bg-medical-surface-200 animate-pulse" />
                <div className="p-6 space-y-3">
                  <div className="h-5 bg-medical-surface-200 animate-pulse rounded w-3/4" />
                  <div className="h-4 bg-medical-surface-200 animate-pulse rounded w-1/2" />
                  <div className="flex gap-4 pt-2">
                    <div className="h-4 bg-medical-surface-200 animate-pulse rounded w-20" />
                    <div className="h-4 bg-medical-surface-200 animate-pulse rounded w-16" />
                  </div>
                  <div className="flex gap-2 pt-4">
                    <div className="flex-1 h-11 bg-medical-surface-200 animate-pulse rounded-sm" />
                    <div className="flex-1 h-11 bg-medical-surface-200 animate-pulse rounded-sm" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    ),
  }
);
const TrustSection = dynamic(() => import('@/components/features/home').then((mod) => mod.TrustSection), { ssr: true });
const DeclarationSection = dynamic(() => import('@/components/features/home').then((mod) => mod.DeclarationSection), { ssr: true });
const GallerySection = dynamic(() => import('@/components/features/home').then((mod) => mod.GallerySection), { ssr: true });
const ReviewsSection = dynamic(() => import('@/components/features/home').then((mod) => mod.ReviewsSection), { ssr: true });
const NewsSection = dynamic(() => import('@/components/features/home').then((mod) => mod.NewsSection), { ssr: true });
const PartnersSection = dynamic(() => import('@/components/features/home').then((mod) => mod.PartnersSection), { ssr: true });
const CallbackSection = dynamic(() => import('@/components/features/home').then((mod) => mod.CallbackSection), { ssr: true });
const StatisticsSection = dynamic(() => import('@/components/features/home').then((mod) => mod.StatisticsSection), { ssr: true });

const services = [
  {
    icon: Stethoscope,
    title: 'Терапія',
    titleEn: 'Therapy',
    description: 'Комплексна діагностика та лікування',
    descriptionEn: 'Comprehensive diagnostics and treatment',
    href: '/directions#therapy',
  },
  {
    icon: Heart,
    title: 'Кардіологія',
    titleEn: 'Cardiology',
    description: 'Сучасні методи лікування серця',
    descriptionEn: 'Modern heart treatment methods',
    href: '/directions#cardiology',
  },
  {
    icon: Users,
    title: 'Педіатрія',
    titleEn: 'Pediatrics',
    description: 'Турбота про здоров\'я дітей',
    descriptionEn: 'Care for children\'s health',
    href: '/directions#pediatrics',
  },
  {
    icon: Microscope,
    title: 'Діагностика',
    titleEn: 'Diagnostics',
    description: 'Точні аналізи та обстеження',
    descriptionEn: 'Accurate tests and examinations',
    href: '/analyses',
  },
];

const features = [
  {
    icon: Shield,
    title: 'Безпека',
    titleEn: 'Safety',
    description: 'Найвищі стандарти безпеки пацієнтів',
    descriptionEn: 'Highest patient safety standards',
  },
  {
    icon: Award,
    title: 'Якість',
    titleEn: 'Quality',
    description: 'Сертифіковані фахівці та обладнання',
    descriptionEn: 'Certified specialists and equipment',
  },
  {
    icon: Clock,
    title: 'Доступність',
    titleEn: 'Accessibility',
    description: 'Зручний графік роботи без вихідних',
    descriptionEn: 'Convenient schedule without weekends',
  },
  {
    icon: Calendar,
    title: 'Онлайн запис',
    titleEn: 'Online Booking',
    description: 'Запис на прийом в один клік',
    descriptionEn: 'One-click appointment booking',
  },
];

export default function HomePage() {
  const { locale } = useLocale();
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <>
      {/* Hero Section */}
      <section
        className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-medical-primary-50 via-white to-medical-accent-50"
      >
        {/* Background Pattern - static */}
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute top-20 right-0 w-96 h-96 bg-medical-accent-200 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-medical-primary-200 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 pt-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div>
              <span className="inline-block px-4 py-2 bg-medical-accent-100 text-medical-accent-700 rounded-sm text-sm font-medium mb-6">
                {locale === 'ua' ? 'Провідний медичний центр України' : 'Leading medical center of Ukraine'}
              </span>

              <h1 className="font-secondary text-4xl md:text-5xl lg:text-6xl font-medium text-medical-primary-900 leading-tight mb-6">
                {locale === 'ua'
                  ? 'Сучасна медицина з турботою про вас'
                  : 'Modern Medicine with Care for You'}
              </h1>

              <p className="text-lg text-medical-text-secondary mb-8 max-w-xl">
                {locale === 'ua'
                  ? 'Провідний приватний медичний центр України з інноваційними підходами до лікування та діагностики'
                  : "Ukraine's leading private clinic with innovative approaches to treatment and diagnostics"}
              </p>

              <div className="flex flex-wrap gap-4">
                <Button size="lg" rightIcon={<ArrowRight className="w-4 h-4" />} onClick={() => setIsBookingOpen(true)}>
                  {locale === 'ua' ? 'Записатися на прийом' : 'Book Appointment'}
                </Button>
                <a href="tel:+380412123456">
                  <Button variant="outline" size="lg" leftIcon={<Phone className="w-4 h-4" />}>
                    {locale === 'ua' ? 'Зателефонувати' : 'Call Now'}
                  </Button>
                </a>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative hidden lg:block flex items-center">
              <div className="relative z-10 rounded-sm overflow-hidden shadow-medical-xl max-w-[85%] ml-auto w-full">
                <div className="aspect-[4/5] bg-gradient-to-br from-medical-primary-200 to-medical-accent-200 flex items-center justify-center">
                  <Stethoscope className="w-28 h-28 text-medical-primary-900/20" />
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-full h-full bg-medical-accent-100 rounded-sm -z-10" />
              <div className="absolute -bottom-4 -left-4 w-3/4 h-3/4 bg-medical-primary-100 rounded-sm -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <StatisticsSection />

      {/* Services Section */}
      <section className="section bg-medical-surface-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">
              {locale === 'ua' ? 'Напрямки' : 'Medical Directions'}
            </h2>
            <p className="section-subtitle mx-auto">
              {locale === 'ua'
                ? 'Комплексний підхід до вашого здоров\'я'
                : 'Comprehensive approach to your health'}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.href}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={service.href}>
                  <Card
                    className="p-6 h-full group cursor-pointer"
                    interactive
                  >
                    <div className="w-14 h-14 bg-medical-accent-100 rounded-sm flex items-center justify-center mb-4 group-hover:bg-medical-accent-600 transition-colors">
                      <service.icon className="w-7 h-7 text-medical-accent-600 group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-lg font-medium text-medical-primary-900 mb-2">
                      {locale === 'ua' ? service.title : service.titleEn}
                    </h3>
                    <p className="text-medical-text-secondary text-sm">
                      {locale === 'ua' ? service.description : service.descriptionEn}
                    </p>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link href="/directions">
              <Button variant="outline">
                <span className="flex items-center">
                  {locale === 'ua' ? 'Всі напрямки' : 'All directions'}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </span>
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">
              {locale === 'ua' ? 'Чому обирають нас' : 'Why choose us'}
            </h2>
            <p className="section-subtitle mx-auto">
              {locale === 'ua'
                ? 'Переваги нашої клініки'
                : 'Advantages of our clinic'}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="text-center p-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="w-16 h-16 bg-medical-primary-100 rounded-sm flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-medical-primary-900" />
                </div>
                <h3 className="text-lg font-medium text-medical-primary-900 mb-2">
                  {locale === 'ua' ? feature.title : feature.titleEn}
                </h3>
                <p className="text-medical-text-secondary text-sm">
                  {locale === 'ua' ? feature.description : feature.descriptionEn}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Banner Section */}
      <ProgramsBanner />

      {/* Laboratory Search Section */}
      <LaboratorySearch />

      {/* Doctors Section */}
      <DoctorsSection />

      {/* Trust Section */}
      <TrustSection />

      {/* Declaration Section */}
      <DeclarationSection />

      {/* Gallery Section */}
      <GallerySection />

      {/* Reviews Section */}
      <ReviewsSection />

      {/* News Section */}
      <NewsSection />

      {/* Partners Section */}
      <PartnersSection />

      {/* Callback Section */}
      <CallbackSection />

      {/* CTA Section */}
      <section className="section bg-gradient-to-r from-medical-primary-900 to-medical-primary-800">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-secondary font-medium text-white mb-6">
              {locale === 'ua'
                ? 'Подбайте про своє здоров\'я вже сьогодні'
                : 'Take care of your health today'}
            </h2>
            <p className="text-medical-surface-300 mb-8 text-lg">
              {locale === 'ua'
                ? 'Запишіться на консультацію до наших фахівців'
                : 'Schedule a consultation with our specialists'}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="secondary" size="lg" onClick={() => setIsBookingOpen(true)}>
                {locale === 'ua' ? 'Записатися на прийом' : 'Book Appointment'}
              </Button>
              <Link href="/doctors">
                <Button variant="outline" size="lg" className="bg-transparent border-white text-white hover:bg-white hover:text-medical-primary-900">
                  {locale === 'ua' ? 'Наші лікарі' : 'Our Doctors'}
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </>
  );
}
