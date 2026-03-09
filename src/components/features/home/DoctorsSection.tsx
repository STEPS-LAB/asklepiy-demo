'use client';

import { useLocale } from '@/contexts';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Star, Calendar, User } from 'lucide-react';
import { Button } from '@/components/ui';
import { BookingModal } from '@/features/booking';
import { useState } from 'react';

const doctors = [
  {
    id: 1,
    name: { ua: 'Олександр Коваленко', en: 'Oleksandr Kovalenko' },
    specialty: { ua: 'Сімейний лікар', en: 'Family Physician' },
    experience: 15,
    rating: 5.0,
    reviews: 127,
    image: '/images/doctors/doctor1.jpg',
  },
  {
    id: 2,
    name: { ua: 'Наталія Бондаренко', en: 'Nataliia Bondarenko' },
    specialty: { ua: 'Педіатр', en: 'Pediatrician' },
    experience: 12,
    rating: 5.0,
    reviews: 98,
    image: '/images/doctors/doctor2.jpg',
  },
  {
    id: 3,
    name: { ua: 'Андрій Шевченко', en: 'Andriy Shevchenko' },
    specialty: { ua: 'Кардіолог', en: 'Cardiologist' },
    experience: 18,
    rating: 5.0,
    reviews: 156,
    image: '/images/doctors/doctor3.jpg',
  },
  {
    id: 4,
    name: { ua: 'Олена Мельник', en: 'Olena Melnyk' },
    specialty: { ua: 'Невролог', en: 'Neurologist' },
    experience: 10,
    rating: 5.0,
    reviews: 84,
    image: '/images/doctors/doctor4.jpg',
  },
  {
    id: 5,
    name: { ua: 'Дмитро Лисенко', en: 'Dmytro Lysenko' },
    specialty: { ua: 'Ортопед', en: 'Orthopedist' },
    experience: 14,
    rating: 5.0,
    reviews: 112,
    image: '/images/doctors/doctor5.jpg',
  },
  {
    id: 6,
    name: { ua: 'Ірина Кравченко', en: 'Iryna Kravchenko' },
    specialty: { ua: 'Гінеколог', en: 'Gynecologist' },
    experience: 16,
    rating: 5.0,
    reviews: 143,
    image: '/images/doctors/doctor6.jpg',
  },
];

export function DoctorsSection() {
  const { locale } = useLocale();
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <>
      <section className="section bg-medical-surface-50">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">
            {locale === 'ua' ? 'Наші лікарі' : 'Our Doctors'}
          </h2>
          <p className="section-subtitle mx-auto">
            {locale === 'ua'
              ? 'Досвідчені фахівці з турботою про пацієнтів'
              : 'Experienced specialists caring for patients'}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((doctor, index) => (
            <motion.div
              key={doctor.id}
              className="bg-white rounded-sm overflow-hidden shadow-medical-md hover:shadow-medical-lg transition-shadow"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
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
                    <Calendar className="w-4 h-4 text-medical-accent-600" />
                    <span>
                      {doctor.experience} {locale === 'ua' ? 'років' : 'years'}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span>{doctor.rating}</span>
                    <span className="text-medical-text-tertiary">({doctor.reviews})</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Link href={`/doctors/${doctor.id}`} className="flex-1">
                    <Button variant="outline" className="w-full">
                      {locale === 'ua' ? 'Переглянути' : 'View Profile'}
                    </Button>
                  </Link>
                  <Button className="w-full" onClick={() => setIsBookingOpen(true)}>
                    {locale === 'ua' ? 'Записатись' : 'Book'}
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Link href="/doctors">
            <Button variant="outline">
              {locale === 'ua' ? 'Всі лікарі' : 'All Doctors'}
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>

    <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </>
  );
}
