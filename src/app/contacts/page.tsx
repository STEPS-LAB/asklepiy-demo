'use client';

import { useLocale } from '@/contexts';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';
import { Card, Button, Input } from '@/components/ui';
import { useState } from 'react';

const contactNumbers = [
  { label: 'Реєстратура', labelEn: 'Reception', phone: '+38 (0412) 12-34-56' },
  { label: 'Діагностичний центр', labelEn: 'Diagnostic Center', phone: '+38 (0412) 23-45-67' },
];

const clinicInfo = {
  city: 'м. Житомир',
  cityEn: 'Zhytomyr',
  address: 'вул. Покровська, 31',
  addressEn: 'Pokrovska St, 31',
  doctorReception: {
    label: 'Прийом лікарів',
    labelEn: 'Doctor reception',
    schedule: [
      { day: 'пн-сб', dayEn: 'Mon-Sat', hours: '07:00 — 20:00' },
      { day: 'нд', dayEn: 'Sun', hours: '08:00 — 20:00' },
    ],
  },
  mri: {
    label: 'МРТ',
    labelEn: 'MRI',
    schedule: [
      { day: 'пн-нд', dayEn: 'Mon-Sun', hours: '06:00 — 23:30' },
    ],
  },
  labTests: {
    label: 'Забір аналізів',
    labelEn: 'Lab tests',
    schedule: [
      { day: 'пн-пт', dayEn: 'Mon-Fri', hours: '07:00 — 14:00' },
      { day: 'сб', dayEn: 'Sat', hours: '08:00 — 12:00' },
    ],
  },
};

export default function ContactsPage() {
  const { locale } = useLocale();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setIsSuccess(true);
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setIsSuccess(false), 3000);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <h1 className="text-3xl md:text-4xl font-secondary font-medium text-medical-primary-900 mb-4">
          {locale === 'ua' ? 'Контакти' : 'Contacts'}
        </h1>
        <p className="text-lg text-medical-text-secondary max-w-2xl mx-auto">
          {locale === 'ua'
            ? 'Зв\'яжіться з нами зручним способом'
            : 'Get in touch with us'}
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Contact Info */}
        <Card className="p-6 min-h-[20rem] md:min-h-[24rem]">
          <h2 className="text-xl font-medium text-medical-primary-900 mb-6">
            {locale === 'ua' ? 'Контактна інформація' : 'Contact information'}
          </h2>

          {/* Address */}
          <div className="flex items-start gap-4 mb-5">
            <div className="w-12 h-12 bg-medical-accent-100 rounded-sm flex items-center justify-center flex-shrink-0">
              <MapPin className="w-6 h-6 text-medical-accent-600" />
            </div>
            <div>
              <h3 className="font-medium text-medical-primary-900 mb-1">
                {locale === 'ua' ? 'Адреса' : 'Address'}
              </h3>
              <p className="text-medical-text-secondary">
                {locale === 'ua'
                  ? `${clinicInfo.city}, ${clinicInfo.address}`
                  : `${clinicInfo.cityEn}, ${clinicInfo.addressEn}`}
              </p>
            </div>
          </div>

          {/* Phone Numbers */}
          <div className="space-y-4 mb-5">
            {contactNumbers.map((contact) => (
              <div key={contact.phone} className="flex items-start gap-4">
                <div className="w-12 h-12 bg-medical-accent-100 rounded-sm flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-medical-accent-600" />
                </div>
                <div>
                  <h3 className="font-medium text-medical-primary-900">
                    {locale === 'ua' ? contact.label : contact.labelEn}
                  </h3>
                  <a
                    href={`tel:${contact.phone.replace(/\D/g, '')}`}
                    className="text-medical-accent-600 hover:text-medical-accent-700 transition-colors"
                  >
                    {contact.phone}
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Email */}
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-medical-accent-100 rounded-sm flex items-center justify-center flex-shrink-0">
              <Mail className="w-6 h-6 text-medical-accent-600" />
            </div>
            <div>
              <h3 className="font-medium text-medical-primary-900 mb-1">
                {locale === 'ua' ? 'Email' : 'Email'}
              </h3>
              <a
                href="mailto:info@asklepiy.com"
                className="text-medical-accent-600 hover:text-medical-accent-700 transition-colors"
              >
                info@asklepiy.com
              </a>
            </div>
          </div>
        </Card>

        {/* Interactive Map */}
        <Card className="overflow-hidden min-h-[20rem] md:min-h-[24rem]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2534.5!2d28.62!3d50.25!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d7d6e7a5e5e5e5%3A0x123456789abcdef!2z0JrQuNGG0LAsINC60LjQvdC-0LLQsCwg0JrQuNGG0LIg0JLQsNC90YHQutC-0LksIDMx!5e0!3m2!1suk!2sua!4v1234567890"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full"
          />
        </Card>

        {/* Working Hours */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <Clock className="w-6 h-6 text-medical-accent-600" />
            <h2 className="text-xl font-medium text-medical-primary-900">
              {locale === 'ua' ? 'Графік роботи' : 'Working hours'}
            </h2>
          </div>

          {/* Doctor Reception */}
          <div className="mb-6">
            <h3 className="font-medium text-medical-primary-900 mb-3">
              {locale === 'ua' ? clinicInfo.doctorReception.label : clinicInfo.doctorReception.labelEn}
            </h3>
            <div className="space-y-2">
              {clinicInfo.doctorReception.schedule.map((schedule) => (
                <div key={schedule.day} className="flex justify-between items-center py-2 border-b border-medical-surface-200 last:border-0">
                  <span className="text-medical-text-secondary">
                    {locale === 'ua' ? schedule.day : schedule.dayEn}
                  </span>
                  <span className="font-medium text-medical-primary-900">
                    {schedule.hours}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* MRI */}
          <div className="mb-6">
            <h3 className="font-medium text-medical-primary-900 mb-3">
              {locale === 'ua' ? clinicInfo.mri.label : clinicInfo.mri.labelEn}
            </h3>
            <div className="space-y-2">
              {clinicInfo.mri.schedule.map((schedule) => (
                <div key={schedule.day} className="flex justify-between items-center py-2 border-b border-medical-surface-200 last:border-0">
                  <span className="text-medical-text-secondary">
                    {locale === 'ua' ? schedule.day : schedule.dayEn}
                  </span>
                  <span className="font-medium text-medical-primary-900">
                    {schedule.hours}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Lab Tests */}
          <div>
            <h3 className="font-medium text-medical-primary-900 mb-3">
              {locale === 'ua' ? clinicInfo.labTests.label : clinicInfo.labTests.labelEn}
            </h3>
            <div className="space-y-2">
              {clinicInfo.labTests.schedule.map((schedule) => (
                <div key={schedule.day} className="flex justify-between items-center py-2 border-b border-medical-surface-200 last:border-0">
                  <span className="text-medical-text-secondary">
                    {locale === 'ua' ? schedule.day : schedule.dayEn}
                  </span>
                  <span className="font-medium text-medical-primary-900">
                    {schedule.hours}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Contact Form */}
        <Card className="p-6">
          <h2 className="text-xl font-medium text-medical-primary-900 mb-6">
            {locale === 'ua' ? 'Написати нам' : 'Send us a message'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label={locale === 'ua' ? 'Ваше ім\'я' : 'Your name'}
              placeholder={locale === 'ua' ? 'Прізвище Імʼя' : 'Surname Name'}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <Input
              type="email"
              label={locale === 'ua' ? 'Email' : 'Email'}
              placeholder="your@email.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
            <div>
              <label className="block text-sm font-medium text-medical-text-primary mb-2">
                {locale === 'ua' ? 'Повідомлення' : 'Message'}
              </label>
              <textarea
                className="w-full px-4 py-3 bg-white border border-medical-surface-300 rounded-sm text-medical-text-primary placeholder-medical-text-tertiary focus:outline-none focus:border-medical-accent-600 focus:ring-2 focus:ring-medical-accent-200 transition-all resize-none"
                rows={4}
                placeholder={locale === 'ua' ? 'Ваше повідомлення...' : 'Your message...'}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
              />
            </div>
            <Button type="submit" isLoading={isSubmitting} className="w-full" leftIcon={<MessageCircle className="w-4 h-4" />}>
              {isSuccess
                ? locale === 'ua'
                  ? 'Повідомлення відправлено!'
                  : 'Message sent!'
                : locale === 'ua'
                ? 'Надіслати повідомлення'
                : 'Send message'}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
