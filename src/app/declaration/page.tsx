'use client';

import { useLocale } from '@/contexts';
import { motion } from 'framer-motion';
import { CheckCircle, FileText, Shield, Clock, Award } from 'lucide-react';
import { Card, Button, Input } from '@/components/ui';
import { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

const benefits = [
  { icon: Clock, title: 'Пріоритетний запис', titleEn: 'Priority booking', description: 'Запис на прийом поза чергою', descriptionEn: 'Priority appointment booking' },
  { icon: Award, title: 'Персональний лікар', titleEn: 'Personal doctor', description: 'Закріплений сімейний лікар', descriptionEn: 'Assigned family doctor' },
  { icon: Shield, title: 'Контроль здоров\'я', titleEn: 'Health monitoring', description: 'Регулярний моніторинг стану', descriptionEn: 'Regular health monitoring' },
  { icon: FileText, title: 'Пільгові ціни', titleEn: 'Discounted prices', description: 'Знижки на послуги до 15%', descriptionEn: 'Up to 15% discount on services' },
];

const doctors = [
  { id: '1', name: 'Коваленко О.В.', nameEn: 'Kovalenko O.V.', specialty: 'Сімейний лікар', specialtyEn: 'Family doctor' },
  { id: '2', name: 'Шевченко І.П.', nameEn: 'Shevchenko I.P.', specialty: 'Терапевт', specialtyEn: 'Therapist' },
  { id: '3', name: 'Бондаренко М.С.', nameEn: 'Bondarenko M.S.', specialty: 'Сімейний лікар', specialtyEn: 'Family doctor' },
];

export default function DeclarationPage() {
  const { locale } = useLocale();
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    birthDate: '',
    phone: '',
    email: '',
    address: '',
    consent: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = useCallback((field: string, value: string) => {
    // Block digits in name fields
    if (field === 'firstName' || field === 'lastName') {
      const filteredValue = value.replace(/[0-9]/g, '');
      setFormData((prev) => ({ ...prev, [field]: filteredValue }));
    }
    else {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }
  }, []);

  const isFormValid = 
    selectedDoctor &&
    formData.firstName.trim() &&
    formData.lastName.trim() &&
    formData.birthDate &&
    formData.phone.trim() &&
    formData.email.trim() &&
    formData.address.trim() &&
    formData.consent;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  return (
    <>
      <div className="container mx-auto px-4" style={{ marginTop: '-80px', paddingTop: '0' }}>
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
        <h1 className="text-3xl md:text-4xl font-secondary font-medium text-medical-primary-900 mb-4">
          {locale === 'ua' ? 'Декларація з лікарем' : 'Doctor Declaration'}
        </h1>
        <p className="text-lg text-medical-text-secondary max-w-2xl mx-auto">
          {locale === 'ua'
            ? 'Оформіть декларацію з сімейним лікарем онлайн'
            : 'Sign a declaration with a family doctor online'}
        </p>
      </motion.div>

      {/* Benefits */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {benefits.map((benefit, index) => (
          <motion.div
            key={benefit.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-4 text-center h-full">
              <div className="w-12 h-12 bg-medical-accent-100 rounded-sm flex items-center justify-center mx-auto mb-3">
                <benefit.icon className="w-6 h-6 text-medical-accent-600" />
              </div>
              <h3 className="font-medium text-medical-primary-900 mb-1">
                {locale === 'ua' ? benefit.title : benefit.titleEn}
              </h3>
              <p className="text-sm text-medical-text-secondary">
                {locale === 'ua' ? benefit.description : benefit.descriptionEn}
              </p>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Form */}
        <Card className="p-6">
          <h2 className="text-xl font-medium text-medical-primary-900 mb-6">
            {locale === 'ua' ? 'Заповнити форму' : 'Fill the form'}
          </h2>

          {isSuccess ? (
            <motion.div
              className="text-center py-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="w-16 h-16 bg-medical-status-success rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-medium text-medical-primary-900 mb-2">
                {locale === 'ua'
                  ? 'Декларацію успішно оформлено!'
                  : 'Declaration successfully submitted!'}
              </h3>
              <p className="text-medical-text-secondary">
                {locale === 'ua'
                  ? 'Ми зв\'яжемося з вами для підтвердження'
                  : 'We will contact you for confirmation'}
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Doctor Selection */}
              <div>
                <label className="block text-sm font-medium text-medical-text-primary mb-2">
                  {locale === 'ua' ? 'Оберіть лікаря' : 'Select a doctor'}
                </label>
                <div className="space-y-3">
                  {doctors.map((doctor) => {
                    const isSelected = selectedDoctor === doctor.id;
                    return (
                      <div
                        key={doctor.id}
                        onClick={() => setSelectedDoctor(doctor.id)}
                        className={cn(
                          'flex items-center gap-4 p-4 rounded-sm cursor-pointer transition-all border-2',
                          isSelected
                            ? 'border-medical-accent-500 bg-medical-accent-50'
                            : 'border-medical-surface-200 hover:border-medical-accent-300'
                        )}
                      >
                        <div
                          className={cn(
                            'w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors',
                            isSelected
                              ? 'border-medical-accent-500 bg-medical-accent-500'
                              : 'border-medical-surface-400'
                          )}
                        >
                          {isSelected && (
                            <div className="w-2 h-2 bg-white rounded-full" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-medical-primary-900">
                            {locale === 'ua' ? doctor.name : doctor.nameEn}
                          </p>
                          <p className="text-sm text-medical-text-tertiary">
                            {locale === 'ua' ? doctor.specialty : doctor.specialtyEn}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Personal Data */}
              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  label={locale === 'ua' ? 'Прізвище' : 'Last name'}
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  required
                />
                <Input
                  label={locale === 'ua' ? `Ім'я` : 'First name'}
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  type="date"
                  label={locale === 'ua' ? 'Дата народження' : 'Date of birth'}
                  value={formData.birthDate}
                  onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                  required
                />
                <Input
                  type="tel"
                  label={locale === 'ua' ? 'Телефон' : 'Phone'}
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  required
                  placeholder={locale === 'ua' ? 'Ваш номер телефону' : 'Your phone number'}
                />
              </div>

              <Input
                type="email"
                label={locale === 'ua' ? 'Email' : 'Email'}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />

              <Input
                label={locale === 'ua' ? 'Адреса проживання' : 'Home address'}
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                required
              />

              {/* Consent */}
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.consent}
                  onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                  className="w-4 h-4 text-medical-accent-600 mt-1"
                />
                <span className="text-sm text-medical-text-secondary">
                  {locale === 'ua'
                    ? 'Я даю згоду на обробку персональних даних'
                    : 'I consent to the processing of personal data'}
                </span>
              </label>

              <Button
                type="submit"
                isLoading={isSubmitting}
                disabled={!isFormValid}
                className="w-full"
              >
                {locale === 'ua' ? 'Подати декларацію' : 'Submit declaration'}
              </Button>
            </form>
          )}
        </Card>

        {/* Info */}
        <div className="space-y-6">
          <Card className="p-6 bg-medical-primary-900 text-white">
            <h3 className="text-lg font-medium mb-4">
              {locale === 'ua'
                ? 'Що таке декларація?'
                : 'What is a declaration?'}
            </h3>
            <p className="text-medical-surface-300 mb-4">
              {locale === 'ua'
                ? 'Декларація з лікарем — це офіційний документ, який закріплює за вами персонального сімейного лікаря. Це гарантує вам пріоритетне обслуговування та контроль стану здоров\'я.'
                : 'A doctor declaration is an official document that assigns you a personal family doctor. This guarantees you priority service and health monitoring.'}
            </p>
            <ul className="space-y-2 text-medical-surface-300">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-medical-accent-500" />
                <span>{locale === 'ua' ? 'Безкоштовно' : 'Free of charge'}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-medical-accent-500" />
                <span>{locale === 'ua' ? 'Оформлення за 5 хвилин' : '5-minute processing'}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-medical-accent-500" />
                <span>{locale === 'ua' ? 'Діє по всій Україні' : 'Valid across Ukraine'}</span>
              </li>
            </ul>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-medium text-medical-primary-900 mb-4">
              {locale === 'ua' ? 'Необхідні документи' : 'Required documents'}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-medical-accent-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-medium text-medical-accent-600">1</span>
                </div>
                <span className="text-medical-text-secondary">
                  {locale === 'ua' ? 'Паспорт громадянина України' : 'Ukrainian passport'}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-medical-accent-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-medium text-medical-accent-600">2</span>
                </div>
                <span className="text-medical-text-secondary">
                  {locale === 'ua' ? 'Ідентифікаційний код' : 'Tax identification number'}
                </span>
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
    </>
  );
}
