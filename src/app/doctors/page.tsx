'use client';

import { useLocale } from '@/contexts';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Star, MapPin, Calendar } from 'lucide-react';
import { Card, Button } from '@/components/ui';
import { BookingModal } from '@/features/booking';
import { useState } from 'react';

const doctors = [
  {
    id: '1',
    slug: 'kovalenko-oleksandr',
    name: 'Коваленко Олександр Васильович',
    nameEn: 'Kovalenko Oleksandr Vasylovych',
    specialty: 'Сімейний лікар',
    specialtyEn: 'Family Doctor',
    experience: 15,
    rating: 4.9,
    reviews: 127,
    photo: '/images/doctors/kovalenko.jpg',
  },
  {
    id: '2',
    slug: 'shevchenko-iryna',
    name: 'Шевченко Ірина Петрівна',
    nameEn: 'Shevchenko Iryna Petrivna',
    specialty: 'Кардіолог',
    specialtyEn: 'Cardiologist',
    experience: 12,
    rating: 4.8,
    reviews: 98,
    photo: '/images/doctors/shevchenko.jpg',
  },
  {
    id: '3',
    slug: 'bondarenko-mykola',
    name: 'Бондаренко Микола Сергійович',
    nameEn: 'Bondarenko Mykola Serhiyovych',
    specialty: 'Невролог',
    specialtyEn: 'Neurologist',
    experience: 18,
    rating: 4.9,
    reviews: 156,
    photo: '/images/doctors/bondarenko.jpg',
  },
  {
    id: '4',
    slug: 'melnyk-anna',
    name: 'Мельник Анна Костянтинівна',
    nameEn: 'Melnyk Anna Kostiantynivna',
    specialty: 'Гінеколог',
    specialtyEn: 'Gynecologist',
    experience: 10,
    rating: 4.7,
    reviews: 84,
    photo: '/images/doctors/melnyk.jpg',
  },
  {
    id: '5',
    slug: 'tkachenko-dmytro',
    name: 'Ткаченко Дмитро Олександрович',
    nameEn: 'Tkachenko Dmytro Oleksandrovych',
    specialty: 'Ортопед',
    specialtyEn: 'Orthopedist',
    experience: 14,
    rating: 4.8,
    reviews: 112,
    photo: '/images/doctors/tkachenko.jpg',
  },
  {
    id: '6',
    slug: 'kovalchuk-olena',
    name: 'Ковальчук Олена Миколаївна',
    nameEn: 'Kovalchuk Olena Mykolaivna',
    specialty: 'Педіатр',
    specialtyEn: 'Pediatrician',
    experience: 20,
    rating: 4.9,
    reviews: 203,
    photo: '/images/doctors/kovalchuk.jpg',
  },
];

export default function DoctorsPage() {
  const { locale } = useLocale();
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <h1 className="text-3xl md:text-4xl font-secondary font-medium text-medical-primary-900 mb-4">
          {locale === 'ua' ? 'Наші лікарі' : 'Our Doctors'}
        </h1>
        <p className="text-lg text-medical-text-secondary max-w-2xl mx-auto">
          {locale === 'ua'
            ? 'Висококваліфіковані фахівці з багаторічним досвідом роботи'
            : 'Highly qualified specialists with years of experience'}
        </p>
      </motion.div>

      {/* Doctors Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((doctor, index) => (
          <motion.div
            key={doctor.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: index * 0.1 }}
          >
            <Card className="overflow-hidden h-full">
              {/* Photo Placeholder */}
              <div className="aspect-[4/5] bg-gradient-to-br from-medical-primary-200 to-medical-accent-200 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 bg-white/50 rounded-full flex items-center justify-center">
                    <span className="text-4xl font-medium text-medical-primary-900/30">
                      {doctor.name.split(' ')[0][0]}{doctor.name.split(' ')[1]?.[0]}
                    </span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-medium text-medical-primary-900 mb-1">
                  {locale === 'ua' ? doctor.name : doctor.nameEn}
                </h3>
                <p className="text-medical-accent-600 text-sm mb-4">
                  {locale === 'ua' ? doctor.specialty : doctor.specialtyEn}
                </p>

                <div className="flex items-center gap-4 mb-4 text-sm text-medical-text-secondary">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{doctor.experience} {locale === 'ua' ? 'років досвіду' : 'years exp.'}</span>
                  </div>
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="font-medium">{doctor.rating}</span>
                    <span className="text-medical-text-tertiary">({doctor.reviews})</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Link href={`/doctors/${doctor.slug}`} className="flex-1">
                    <Button variant="outline" className="w-full">
                      {locale === 'ua' ? 'Детальніше' : 'View Profile'}
                    </Button>
                  </Link>
                  <Button className="w-full" onClick={() => setIsBookingOpen(true)}>
                    {locale === 'ua' ? 'Записатись' : 'Book'}
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </div>
  );
}
