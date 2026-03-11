'use client';

import { useState, useCallback, useEffect } from 'react';
import { useLocale, useUI } from '@/contexts';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Calendar, Clock, User, FileText, ArrowRight, ArrowLeft, Phone, Mail, CreditCard } from 'lucide-react';
import { Button, Card, Modal, Input } from '@/components/ui';
import { cn } from '@/lib/utils';

const bookingSteps = [
  { step: 1, icon: FileText, label: 'Послуга', labelEn: 'Service' },
  { step: 2, icon: Calendar, label: 'Дата і час', labelEn: 'Date & Time' },
  { step: 3, icon: User, label: 'Дані', labelEn: 'Your Data' },
  { step: 4, icon: Check, label: 'Підтвердження', labelEn: 'Confirmation' },
];

const mockServices = [
  { id: '1', name: 'Консультація терапевта', nameEn: 'Therapist consultation', price: 800, duration: 30 },
  { id: '2', name: 'Консультація кардіолога', nameEn: 'Cardiologist consultation', price: 1000, duration: 30 },
  { id: '3', name: 'УЗД діагностика', nameEn: 'Ultrasound diagnostics', price: 600, duration: 20 },
  { id: '4', name: 'ЕКГ обстеження', nameEn: 'ECG examination', price: 400, duration: 15 },
  { id: '5', name: 'Лабораторні аналізи', nameEn: 'Lab tests', price: 500, duration: 15 },
  { id: '6', name: 'МРТ сканування', nameEn: 'MRI scan', price: 2000, duration: 45 },
];

const timeSlots = [
  { time: '09:00', available: true },
  { time: '09:30', available: true },
  { time: '10:00', available: false },
  { time: '10:30', available: true },
  { time: '11:00', available: true },
  { time: '11:30', available: false },
  { time: '14:00', available: true },
  { time: '14:30', available: true },
  { time: '15:00', available: true },
  { time: '15:30', available: false },
  { time: '16:00', available: true },
  { time: '16:30', available: true },
];

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const { locale } = useLocale();
  const { setModalOpen } = useUI();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Sync modal state with UI context
  useEffect(() => {
    setModalOpen(isOpen);
    
    // Lock body scroll when modal is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.setProperty('--scroll-y', `${window.scrollY}px`);
    } else {
      // Restore body scroll
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
      document.body.style.position = '';
      document.body.style.width = '';
      const scrollY = document.body.style.getPropertyValue('--scroll-y');
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY, 10));
        document.body.style.removeProperty('--scroll-y');
      }
    }
    
    return () => {
      if (!isOpen) {
        setModalOpen(false);
        document.body.style.overflow = '';
        document.body.style.touchAction = '';
        document.body.style.position = '';
        document.body.style.width = '';
      }
    };
  }, [isOpen, setModalOpen]);

  // Generate next 7 days
  const getNextDays = () => {
    const days = [];
    const today = new Date();
    const dayNames = locale === 'ua'
      ? ['Нд', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
      : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() + i);
      days.push({
        date: date.toISOString().split('T')[0],
        day: dayNames[date.getDay()],
        dayNum: date.getDate(),
        month: date.toLocaleDateString(locale === 'ua' ? 'uk-UA' : 'en-US', { month: 'short' }),
        fullDate: date.toLocaleDateString(locale === 'ua' ? 'uk-UA' : 'en-US', { 
          day: 'numeric', 
          month: 'long', 
          year: 'numeric' 
        }),
        isToday: i === 0,
      });
    }
    return days;
  };

  const handleNext = useCallback(() => {
    if (currentStep === 3) {
      // Validate form
      const newErrors: Record<string, string> = {};
      if (!formData.firstName.trim()) {
        newErrors.firstName = locale === 'ua' ? "Введіть ваше ім'я" : 'Enter your first name';
      }
      if (!formData.lastName.trim()) {
        newErrors.lastName = locale === 'ua' ? "Введіть ваше прізвище" : 'Enter your last name';
      }
      if (!formData.phone.trim()) {
        newErrors.phone = locale === 'ua' ? 'Введіть номер телефону' : 'Enter phone number';
      }
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }
      setErrors({});
    }
    
    if (currentStep < 4) {
      setCurrentStep((prev) => prev + 1);
    }
  }, [currentStep, formData, locale]);

  const handleBack = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  }, [currentStep]);

  const handleConfirm = useCallback(async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
    setIsSuccess(true);
  }, []);

  const handleClose = useCallback(() => {
    setCurrentStep(1);
    setSelectedService(null);
    setSelectedDate(null);
    setSelectedTime(null);
    setFormData({ firstName: '', lastName: '', phone: '', email: '' });
    setErrors({});
    setIsSuccess(false);
    setModalOpen(false);
    onClose();
  }, [onClose, setModalOpen]);

  const handleInputChange = useCallback((field: string, value: string) => {
    // Block digits in name fields
    if (field === 'firstName' || field === 'lastName') {
      const filteredValue = value.replace(/[0-9]/g, '');
      setFormData((prev) => ({ ...prev, [field]: filteredValue }));
    }
    else {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  }, [errors]);

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return selectedService !== null;
      case 2:
        return selectedDate !== null && selectedTime !== null;
      case 3:
        return formData.firstName.trim() !== '' && formData.lastName.trim() !== '' && formData.phone.trim() !== '';
      default:
        return true;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-3">
            <h3 className="text-lg font-medium text-medical-primary-900 mb-4">
              {locale === 'ua' ? 'Оберіть послугу' : 'Select a service'}
            </h3>
            <div className="grid gap-3 max-h-80 overflow-y-auto">
              {mockServices.map((service) => (
                <motion.button
                  key={service.id}
                  onClick={() => setSelectedService(service.id)}
                  className={cn(
                    'p-4 rounded-sm border-2 text-left transition-all w-full',
                    selectedService === service.id
                      ? 'border-medical-accent-600 bg-medical-accent-50'
                      : 'border-medical-surface-200 hover:border-medical-accent-300'
                  )}
                  whileHover={{ scale: 0.95 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-medical-primary-900 truncate">
                        {locale === 'ua' ? service.name : service.nameEn}
                      </p>
                      <p className="text-sm text-medical-text-tertiary">
                        {service.duration} {locale === 'ua' ? 'хв' : 'min'}
                      </p>
                    </div>
                    <span className="text-medical-accent-600 font-medium flex-shrink-0">
                      {service.price} ₴
                    </span>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-medical-primary-900 mb-3">
                {locale === 'ua' ? 'Оберіть дату' : 'Select a date'}
              </h3>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {getNextDays().map((day) => (
                  <button
                    key={day.date}
                    onClick={() => setSelectedDate(day.date)}
                    className={cn(
                      'flex-shrink-0 w-16 h-20 rounded-sm border-2 flex flex-col items-center justify-center transition-all',
                      selectedDate === day.date
                        ? 'border-medical-accent-600 bg-medical-accent-50'
                        : 'border-medical-surface-200 hover:border-medical-accent-300'
                    )}
                  >
                    <span className="text-xs text-medical-text-tertiary">{day.day}</span>
                    <span className="text-lg font-medium text-medical-primary-900">{day.dayNum}</span>
                    <span className="text-xs text-medical-text-tertiary">{day.month}</span>
                  </button>
                ))}
              </div>
            </div>

            {selectedDate && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h3 className="text-lg font-medium text-medical-primary-900 mb-3">
                  {locale === 'ua' ? 'Оберіть час' : 'Select a time'}
                </h3>
                <div className="grid grid-cols-4 gap-2">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot.time}
                      onClick={() => slot.available && setSelectedTime(slot.time)}
                      disabled={!slot.available}
                      className={cn(
                        'py-2 px-3 rounded-sm text-sm font-medium transition-all',
                        slot.available
                          ? selectedTime === slot.time
                            ? 'bg-medical-accent-600 text-white'
                            : 'bg-medical-surface-100 text-medical-primary-900 hover:bg-medical-accent-100'
                          : 'bg-medical-surface-200 text-medical-text-tertiary cursor-not-allowed line-through'
                      )}
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-medical-primary-900 mb-4">
              {locale === 'ua' ? 'Ваші дані' : 'Your Information'}
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-medical-text-primary mb-2">
                    {locale === 'ua' ? "Прізвище *" : 'Last Name *'}
                  </label>
                  <Input
                    type="text"
                    placeholder={locale === 'ua' ? "Прізвище" : 'Last Name'}
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className={cn(errors.lastName && 'border-medical-status-error')}
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-sm text-medical-status-error">{errors.lastName}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-medical-text-primary mb-2">
                    {locale === 'ua' ? "Ім'я *" : 'First Name *'}
                  </label>
                  <Input
                    type="text"
                    placeholder={locale === 'ua' ? "Ім'я" : 'First Name'}
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className={cn(errors.firstName && 'border-medical-status-error')}
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-sm text-medical-status-error">{errors.firstName}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-medical-text-primary mb-2">
                  {locale === 'ua' ? 'Телефон *' : 'Phone *'}
                </label>
                <Input
                  type="tel"
                  placeholder={locale === 'ua' ? 'Ваш номер телефону' : 'Your phone number'}
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  icon={<Phone className="w-5 h-5" />}
                  className={cn(errors.phone && 'border-medical-status-error')}
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-medical-status-error">{errors.phone}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-medical-text-primary mb-2">
                  {locale === 'ua' ? 'Email (необовʼязково)' : 'Email (optional)'}
                </label>
                <Input
                  type="email"
                  placeholder={locale === 'ua' ? 'example@email.com' : 'example@email.com'}
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  icon={<Mail className="w-5 h-5" />}
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            {isLoading ? (
              <div className="text-center py-8">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-12 h-12 border-4 border-medical-accent-200 border-t-medical-accent-600 rounded-full mx-auto mb-4"
                />
                <p className="text-medical-text-secondary">
                  {locale === 'ua'
                    ? 'Підтверджуємо запис...'
                    : 'Confirming your appointment...'}
                </p>
              </div>
            ) : isSuccess ? (
              <motion.div
                className="text-center py-8"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="w-16 h-16 bg-medical-status-success rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-medium text-medical-primary-900 mb-2">
                  {locale === 'ua' ? 'Запис успішно підтверджено!' : 'Appointment confirmed!'}
                </h3>
                <p className="text-medical-text-secondary mb-4">
                  {locale === 'ua'
                    ? 'Ми зв\'яжемося з вами найближчим часом'
                    : 'We will contact you shortly'}
                </p>
              </motion.div>
            ) : (
              <>
                <h3 className="text-lg font-medium text-medical-primary-900 mb-4">
                  {locale === 'ua' ? 'Підтвердьте запис' : 'Confirm your appointment'}
                </h3>
                <div className="bg-medical-surface-50 rounded-sm p-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-medical-text-tertiary">
                      {locale === 'ua' ? 'Послуга' : 'Service'}
                    </span>
                    <span className="font-medium text-right">
                      {mockServices.find((s) => s.id === selectedService)?.[locale === 'ua' ? 'name' : 'nameEn']}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-medical-text-tertiary">
                      {locale === 'ua' ? 'Дата і час' : 'Date & Time'}
                    </span>
                    <span className="font-medium text-right">
                      {getNextDays().find((d) => d.date === selectedDate)?.fullDate}, {selectedTime}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-medical-text-tertiary">
                      {locale === 'ua' ? "ПІБ" : 'Full Name'}
                    </span>
                    <span className="font-medium text-right">
                      {formData.lastName} {formData.firstName}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-medical-text-tertiary">
                      {locale === 'ua' ? 'Телефон' : 'Phone'}
                    </span>
                    <span className="font-medium text-right">
                      {formData.phone}
                    </span>
                  </div>
                  <div className="border-t border-medical-surface-200 pt-3 flex justify-between">
                    <span className="text-medical-text-tertiary">
                      {locale === 'ua' ? 'Вартість' : 'Price'}
                    </span>
                    <span className="font-medium text-medical-accent-600">
                      {mockServices.find((s) => s.id === selectedService)?.price} ₴
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={locale === 'ua' ? 'Записатись' : 'Book Appointment'} size="lg">
      <div className="w-full">
        {/* Progress Steps */}
        {!isSuccess && (
          <div className="mb-6">
            {/* Grid container - circles and lines row */}
            <div className="grid grid-cols-4 relative">
              {/* Continuous progress line behind all circles - spans from center of first to center of last circle */}
              <div className="absolute top-[15px] left-[12.5%] right-[12.5%] h-0.5 flex">
                {bookingSteps.slice(1).map((step, index) => (
                  <div
                    key={`line-${step.step}`}
                    className={cn(
                      'flex-1 h-full',
                      currentStep > step.step ? 'bg-medical-accent-600' : 'bg-medical-surface-300'
                    )}
                  />
                ))}
              </div>
              
              {/* Step circles */}
              {bookingSteps.map((step) => (
                <div key={`circle-${step.step}`} className="flex justify-center relative z-10">
                  <motion.div
                    className={cn(
                      'w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all',
                      currentStep >= step.step
                        ? 'bg-medical-accent-600 border-medical-accent-600 text-white'
                        : 'bg-white border-medical-surface-300 text-medical-text-tertiary'
                    )}
                    initial={{ scale: 1 }}
                    animate={{ scale: currentStep === step.step ? 1.1 : 1 }}
                  >
                    {currentStep > step.step ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <step.icon className="w-4 h-4" />
                    )}
                  </motion.div>
                </div>
              ))}
            </div>
            
            {/* Labels row - same grid structure for perfect alignment */}
            <div className="grid grid-cols-4 mt-2">
              {bookingSteps.map((step) => (
                <div key={`label-${step.step}`} className="flex justify-center">
                  <span
                    className={cn(
                      'text-[10px] text-center whitespace-nowrap',
                      currentStep >= step.step ? 'text-medical-accent-600 font-medium' : 'text-medical-text-tertiary'
                    )}
                  >
                    {locale === 'ua' ? step.label : step.labelEn}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        {!isSuccess && !isLoading && (
          <div className="flex justify-between mt-6 pt-4 border-t border-medical-surface-200">
            <Button
              variant="ghost"
              onClick={handleBack}
              disabled={currentStep === 1}
              leftIcon={<ArrowLeft className="w-4 h-4" />}
            >
              {locale === 'ua' ? 'Назад' : 'Back'}
            </Button>
            {currentStep < 4 ? (
              <Button
                onClick={handleNext}
                disabled={!canProceed()}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                {locale === 'ua' ? 'Далі' : 'Next'}
              </Button>
            ) : (
              <Button onClick={handleConfirm} disabled={!canProceed()}>
                {locale === 'ua' ? 'Підтвердити запис' : 'Confirm booking'}
              </Button>
            )}
          </div>
        )}

        {isSuccess && (
          <div className="mt-6 pt-4 border-t border-medical-surface-200 text-center">
            <Button onClick={handleClose}>
              {locale === 'ua' ? 'Закрити' : 'Close'}
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
}
