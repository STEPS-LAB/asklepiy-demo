'use client';

import { useLocale } from '@/contexts';
import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import { Star, Calendar, Award, BookOpen, Globe, Clock, CheckCircle } from 'lucide-react';
import { Button, Card } from '@/components/ui';
import { BookingModal } from '@/features/booking';
import { useState } from 'react';

const doctorsData: Record<string, {
  name: string;
  nameEn: string;
  specialty: string;
  specialtyEn: string;
  experience: number;
  rating: number;
  reviews: number;
  biography: string;
  biographyEn: string;
  education: string[];
  certifications: string[];
  languages: string[];
  priceRange: { min: number; max: number };
}> = {
  'kovalenko-oleksandr': {
    name: 'Коваленко Олександр Васильович',
    nameEn: 'Kovalenko Oleksandr Vasylovych',
    specialty: 'Сімейний лікар',
    specialtyEn: 'Family Doctor',
    experience: 15,
    rating: 4.9,
    reviews: 127,
    biography: 'Лікар вищої категорії з 15-річним досвідом роботи. Спеціалізується на діагностиці та лікуванні захворювань внутрішніх органів.',
    biographyEn: 'Highest category doctor with 15 years of experience. Specializes in diagnosis and treatment of internal organ diseases.',
    education: [
      'Національний медичний університет ім. О.О. Богомольця',
      'Інтернатура з терапії',
    ],
    certifications: ['Сімейна медицина', 'УЗД діагностика'],
    languages: ['Українська', 'English'],
    priceRange: { min: 600, max: 1000 },
  },
  'shevchenko-iryna': {
    name: 'Шевченко Ірина Петрівна',
    nameEn: 'Shevchenko Iryna Petrivna',
    specialty: 'Кардіолог',
    specialtyEn: 'Cardiologist',
    experience: 12,
    rating: 4.8,
    reviews: 98,
    biography: 'Провідний кардіолог клініки. Експерт у галузі сучасних методів діагностики серцево-судинних захворювань.',
    biographyEn: 'Leading cardiologist of the clinic. Expert in modern methods of cardiovascular disease diagnosis.',
    education: [
      'Національний медичний університет ім. О.О. Богомольця',
      'Клінічна ординатура з кардіології',
    ],
    certifications: ['Кардіологія', 'Функціональна діагностика', 'Ехокардіографія'],
    languages: ['Українська'],
    priceRange: { min: 800, max: 1500 },
  },
};

export default function DoctorPage() {
  const { locale } = useLocale();
  const params = useParams();
  const slug = params.slug as string;
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const doctor = doctorsData[slug] || doctorsData['kovalenko-oleksandr'];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Doctor Info Card */}
          <Card className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Photo */}
              <div className="w-full md:w-48 aspect-square bg-gradient-to-br from-medical-primary-200 to-medical-accent-200 rounded-sm flex items-center justify-center flex-shrink-0">
                <span className="text-6xl font-medium text-medical-primary-900/30">
                  {doctor.name.split(' ')[0][0]}{doctor.name.split(' ')[1]?.[0]}
                </span>
              </div>

              {/* Info */}
              <div className="flex-1">
                <h1 className="text-2xl font-secondary font-medium text-medical-primary-900 mb-2">
                  {locale === 'ua' ? doctor.name : doctor.nameEn}
                </h1>
                <p className="text-lg text-medical-accent-600 mb-4">
                  {locale === 'ua' ? doctor.specialty : doctor.specialtyEn}
                </p>

                <div className="flex flex-wrap gap-4 mb-4">
                  <div className="flex items-center gap-2 text-medical-text-secondary">
                    <Calendar className="w-5 h-5" />
                    <span>{doctor.experience} {locale === 'ua' ? 'років досвіду' : 'years experience'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-amber-500">
                    <Star className="w-5 h-5 fill-current" />
                    <span className="font-medium text-medical-text-primary">{doctor.rating}</span>
                    <span className="text-medical-text-tertiary">({doctor.reviews} {locale === 'ua' ? 'відгуків' : 'reviews'})</span>
                  </div>
                </div>

                <Button onClick={() => setIsBookingOpen(true)}>
                  {locale === 'ua' ? 'Записатися на консультацію' : 'Book consultation'}
                </Button>
              </div>
            </div>
          </Card>

          {/* Biography */}
          <Card className="p-6">
            <h2 className="text-xl font-medium text-medical-primary-900 mb-4">
              {locale === 'ua' ? 'Про лікаря' : 'About the doctor'}
            </h2>
            <p className="text-medical-text-secondary leading-relaxed">
              {locale === 'ua' ? doctor.biography : doctor.biographyEn}
            </p>
          </Card>

          {/* Education */}
          <Card className="p-6">
            <h2 className="text-xl font-medium text-medical-primary-900 mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              {locale === 'ua' ? 'Освіта' : 'Education'}
            </h2>
            <ul className="space-y-2">
              {doctor.education.map((edu, index) => (
                <li key={index} className="flex items-start gap-2 text-medical-text-secondary">
                  <CheckCircle className="w-5 h-5 text-medical-accent-600 flex-shrink-0 mt-0.5" />
                  <span>{edu}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Certifications */}
          <Card className="p-6">
            <h2 className="text-xl font-medium text-medical-primary-900 mb-4 flex items-center gap-2">
              <Award className="w-5 h-5" />
              {locale === 'ua' ? 'Сертифікати' : 'Certifications'}
            </h2>
            <div className="flex flex-wrap gap-2">
              {doctor.certifications.map((cert, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-medical-accent-50 text-medical-accent-700 rounded-sm text-sm font-medium"
                >
                  {cert}
                </span>
              ))}
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Languages */}
          <Card className="p-6">
            <h3 className="text-lg font-medium text-medical-primary-900 mb-4 flex items-center gap-2">
              <Globe className="w-5 h-5" />
              {locale === 'ua' ? 'Мови' : 'Languages'}
            </h3>
            <div className="flex flex-wrap gap-2">
              {doctor.languages.map((lang, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-medical-surface-100 text-medical-text-secondary rounded-sm text-sm"
                >
                  {lang}
                </span>
              ))}
            </div>
          </Card>

          {/* Price Range */}
          <Card className="p-6">
            <h3 className="text-lg font-medium text-medical-primary-900 mb-4 flex items-center gap-2">
              {locale === 'ua' ? 'Вартість прийому' : 'Consultation price'}
            </h3>
            <div className="text-2xl font-medium text-medical-accent-600">
              {doctor.priceRange.min} - {doctor.priceRange.max} ₴
            </div>
            <p className="text-sm text-medical-text-tertiary mt-1">
              {locale === 'ua' ? 'залежить від типу консультації' : 'depends on consultation type'}
            </p>
          </Card>

          {/* Working Hours */}
          <Card className="p-6">
            <h3 className="text-lg font-medium text-medical-primary-900 mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5" />
              {locale === 'ua' ? 'Графік прийому' : 'Schedule'}
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-medical-text-secondary">{locale === 'ua' ? 'Пн-Пт' : 'Mon-Fri'}</span>
                <span className="font-medium">8:00 - 17:00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-medical-text-secondary">{locale === 'ua' ? 'Субота' : 'Saturday'}</span>
                <span className="font-medium">9:00 - 14:00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-medical-text-secondary">{locale === 'ua' ? 'Неділя' : 'Sunday'}</span>
                <span className="text-medical-text-tertiary">Вихідний</span>
              </div>
            </div>
          </Card>

          {/* Book CTA */}
          <Card className="p-6 bg-medical-primary-900 text-white">
            <h3 className="text-lg font-medium mb-4">
              {locale === 'ua' ? 'Запишіться на прийом' : 'Book an appointment'}
            </h3>
            <p className="text-medical-surface-300 text-sm mb-4">
              {locale === 'ua'
                ? 'Оберіть зручний час для візиту до лікаря'
                : 'Choose a convenient time to visit the doctor'}
            </p>
            <Button variant="secondary" className="w-full" onClick={() => setIsBookingOpen(true)}>
              {locale === 'ua' ? 'Онлайн запис' : 'Book online'}
            </Button>
          </Card>
        </div>
      </div>

      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </div>
  );
}
