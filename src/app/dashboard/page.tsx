'use client';

import { useState } from 'react';
import { useLocale, useAuth } from '@/contexts';
import { motion } from 'framer-motion';
import {
  User,
  Users,
  Calendar,
  FileText,
  Clock,
  ChevronRight,
  Plus,
  Download,
  Activity,
  Heart,
  Stethoscope,
  Baby
} from 'lucide-react';
import { Button, Card } from '@/components/ui';
import { SignInModal } from '@/features/auth';
import { BookingModal } from '@/features/booking';
import { cn, formatDateUA } from '@/lib/utils';

const mockAppointments = [
  {
    id: '1',
    doctor: 'д-р Коваленко О.В.',
    doctorEn: 'Dr. Kovalenko O.V.',
    specialty: 'Терапевт',
    specialtyEn: 'Therapist',
    date: '2026-03-10',
    time: '10:00',
    type: 'consultation',
  },
  {
    id: '2',
    doctor: 'д-р Шевченко І.П.',
    doctorEn: 'Dr. Shevchenko I.P.',
    specialty: 'Кардіолог',
    specialtyEn: 'Cardiologist',
    date: '2026-03-15',
    time: '14:30',
    type: 'followup',
  },
];

const mockMedicalRecords = [
  {
    id: '1',
    type: 'test',
    title: 'Загальний аналіз крові',
    titleEn: 'Complete blood count',
    date: '2026-02-28',
    status: 'ready',
    aiInterpretation: {
      ua: 'Ваш рівень заліза повернувся до норми порівняно з минулим місяцем.',
      en: 'Your iron levels returned to normal compared to last month.',
    },
  },
  {
    id: '2',
    type: 'consultation',
    title: 'Консультація кардіолога',
    titleEn: 'Cardiologist consultation',
    date: '2026-02-20',
    doctor: 'д-р Шевченко І.П.',
    status: 'completed',
  },
  {
    id: '3',
    type: 'test',
    title: 'Біохімічний аналіз',
    titleEn: 'Biochemical analysis',
    date: '2026-02-15',
    status: 'ready',
    aiInterpretation: {
      ua: 'Всі показники в межах норми. Продовжуйте дотримуватися рекомендацій.',
      en: 'All indicators are within normal range. Continue following recommendations.',
    },
  },
];

const familyMembers = [
  { id: '1', relation: 'self', name: 'Олександр К.', nameEn: 'Oleksandr K.', avatar: null },
  { id: '2', relation: 'child', name: 'Софія К.', nameEn: 'Sofia K.', avatar: null },
  { id: '3', relation: 'partner', name: 'Олена К.', nameEn: 'Olena K.', avatar: null },
];

export default function DashboardPage() {
  const { locale } = useLocale();
  const { isAuthenticated, user } = useAuth();
  const [selectedMember, setSelectedMember] = useState('1');
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  if (!isAuthenticated) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-medium text-medical-primary-900 mb-4">
            {locale === 'ua'
              ? 'Увійдіть для перегляду кабінету'
              : 'Sign in to view your dashboard'}
          </h1>
          <p className="text-medical-text-secondary mb-6">
            {locale === 'ua'
              ? 'Отримайте доступ до своїх медичних записів та записів на прийом'
              : 'Access your medical records and appointments'}
          </p>
          <a href="https://patient-docs.com/login" target="_blank" rel="noopener noreferrer">
            <Button>
              {locale === 'ua' ? 'Увійти' : 'Sign In'}
            </Button>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-secondary font-medium text-medical-primary-900">
            {locale === 'ua' ? 'Особистий кабінет' : 'Dashboard'}
          </h1>
          <p className="text-medical-text-secondary">
            {locale === 'ua' ? 'Ласкаво просимо' : 'Welcome'}, {user?.firstName}
          </p>
        </div>
        <Button onClick={() => setIsBookingOpen(true)}>
          <Calendar className="w-4 h-4 mr-2" />
          {locale === 'ua' ? 'Записатися на прийом' : 'Book appointment'}
        </Button>
      </div>

      {/* Family Profile Switcher */}
      <div className="mb-8">
        <h2 className="text-lg font-medium text-medical-primary-900 mb-4">
          {locale === 'ua' ? 'Сімейний профіль' : 'Family profile'}
        </h2>
        <div className="flex flex-wrap gap-3">
          {familyMembers.map((member) => (
            <motion.button
              key={member.id}
              onClick={() => setSelectedMember(member.id)}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-sm border-2 transition-all',
                selectedMember === member.id
                  ? 'border-medical-accent-600 bg-medical-accent-50'
                  : 'border-medical-surface-200 hover:border-medical-accent-300'
              )}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div
                className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center',
                  member.relation === 'self'
                    ? 'bg-medical-primary-100'
                    : member.relation === 'child'
                    ? 'bg-medical-accent-100'
                    : 'bg-medical-surface-200'
                )}
              >
                {member.relation === 'self' ? (
                  <User className="w-5 h-5 text-medical-primary-900" />
                ) : member.relation === 'child' ? (
                  <Baby className="w-5 h-5 text-medical-accent-600" />
                ) : (
                  <Users className="w-5 h-5 text-medical-text-secondary" />
                )}
              </div>
              <div className="text-left">
                <p className="font-medium text-medical-primary-900 text-sm">
                  {locale === 'ua' ? member.name : member.nameEn}
                </p>
                <p className="text-xs text-medical-text-tertiary">
                  {locale === 'ua'
                    ? member.relation === 'self'
                      ? 'Я'
                      : member.relation === 'child'
                      ? 'Дитина'
                      : 'Партнер'
                    : member.relation === 'self'
                    ? 'Me'
                    : member.relation === 'child'
                    ? 'Child'
                    : 'Partner'}
                </p>
              </div>
            </motion.button>
          ))}
          <button className="flex items-center gap-3 px-4 py-3 rounded-sm border-2 border-dashed border-medical-surface-300 hover:border-medical-accent-400 transition-colors">
            <Plus className="w-5 h-5 text-medical-text-tertiary" />
            <span className="text-sm text-medical-text-tertiary">
              {locale === 'ua' ? 'Додати' : 'Add'}
            </span>
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Upcoming Appointments */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Calendar className="w-6 h-6 text-medical-accent-600" />
                <h2 className="text-lg font-medium text-medical-primary-900">
                  {locale === 'ua' ? 'Майбутні візити' : 'Upcoming appointments'}
                </h2>
              </div>
            </div>

            {mockAppointments.length > 0 ? (
              <div className="space-y-4">
                {mockAppointments.map((appointment) => (
                  <motion.div
                    key={appointment.id}
                    className="flex items-center gap-4 p-4 bg-medical-surface-50 rounded-sm"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <div className="w-12 h-12 bg-medical-primary-100 rounded-full flex items-center justify-center">
                      <Stethoscope className="w-6 h-6 text-medical-primary-900" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-medical-primary-900">
                        {locale === 'ua' ? appointment.doctor : appointment.doctorEn}
                      </p>
                      <p className="text-sm text-medical-text-tertiary">
                        {locale === 'ua' ? appointment.specialty : appointment.specialtyEn}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 text-medical-text-secondary">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">
                          {formatDateUA(appointment.date)}, {appointment.time}
                        </span>
                      </div>
                      <Button variant="ghost" size="sm" className="mt-2">
                        {locale === 'ua' ? 'Деталі' : 'Details'}
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 text-medical-text-tertiary mx-auto mb-4" />
                <p className="text-medical-text-secondary mb-4">
                  {locale === 'ua'
                    ? 'Немає запланованих візитів'
                    : 'No scheduled appointments'}
                </p>
                <Button onClick={() => setIsBookingOpen(true)}>
                  {locale === 'ua' ? 'Записатися зараз' : 'Book now'}
                </Button>
              </div>
            )}
          </Card>
        </div>

        {/* Quick Actions */}
        <div>
          <Card className="p-6">
            <h2 className="text-lg font-medium text-medical-primary-900 mb-4">
              {locale === 'ua' ? 'Швидкі дії' : 'Quick actions'}
            </h2>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-between">
                <span className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  {locale === 'ua' ? 'Мої результати' : 'My results'}
                </span>
                <ChevronRight className="w-4 h-4" />
              </Button>
              <Button variant="outline" className="w-full justify-between">
                <span className="flex items-center gap-2">
                  <Activity className="w-4 h-4" />
                  {locale === 'ua' ? 'Історія здоров\'я' : 'Health history'}
                </span>
                <ChevronRight className="w-4 h-4" />
              </Button>
              <Button variant="outline" className="w-full justify-between">
                <span className="flex items-center gap-2">
                  <Heart className="w-4 h-4" />
                  {locale === 'ua' ? 'Профілактика' : 'Prevention'}
                </span>
                <ChevronRight className="w-4 h-4" />
              </Button>
              <Button variant="outline" className="w-full justify-between">
                <span className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  {locale === 'ua' ? 'Документи' : 'Documents'}
                </span>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Medical Records Timeline */}
      <div className="mt-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <FileText className="w-6 h-6 text-medical-accent-600" />
              <h2 className="text-lg font-medium text-medical-primary-900">
                {locale === 'ua' ? 'Історія здоров\'я' : 'History of Wellness'}
              </h2>
            </div>
          </div>

          <div className="space-y-4">
            {mockMedicalRecords.map((record, index) => (
              <motion.div
                key={record.id}
                className="relative pl-8 pb-6 last:pb-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {/* Timeline line */}
                {index < mockMedicalRecords.length - 1 && (
                  <div className="absolute left-3 top-8 bottom-0 w-0.5 bg-medical-surface-300" />
                )}
                
                {/* Timeline dot */}
                <div
                  className={cn(
                    'absolute left-0 w-6 h-6 rounded-full flex items-center justify-center border-2',
                    record.type === 'test'
                      ? 'bg-medical-accent-100 border-medical-accent-600'
                      : 'bg-medical-primary-100 border-medical-primary-900'
                  )}
                >
                  {record.type === 'test' ? (
                    <Activity className="w-3 h-3 text-medical-accent-600" />
                  ) : (
                    <Stethoscope className="w-3 h-3 text-medical-primary-900" />
                  )}
                </div>

                <div className="bg-medical-surface-50 rounded-sm p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-medium text-medical-primary-900">
                        {locale === 'ua' ? record.title : record.titleEn}
                      </h3>
                      {record.doctor && (
                        <p className="text-sm text-medical-text-tertiary">{record.doctor}</p>
                      )}
                    </div>
                    <span className="text-xs text-medical-text-tertiary">
                      {formatDateUA(record.date)}
                    </span>
                  </div>

                  {/* AI Interpretation */}
                  {record.aiInterpretation && (
                    <motion.div
                      className="mt-3 p-3 bg-medical-accent-50 rounded-sm"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <div className="flex items-start gap-2">
                        <Activity className="w-4 h-4 text-medical-accent-600 mt-0.5" />
                        <div>
                          <p className="text-xs font-medium text-medical-accent-700 mb-1">
                            {locale === 'ua' ? 'Інтерпретація ШІ' : 'AI Interpretation'}
                          </p>
                          <p className="text-sm text-medical-text-secondary">
                            {locale === 'ua'
                              ? record.aiInterpretation.ua
                              : record.aiInterpretation.en}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div className="flex gap-2 mt-3">
                    <Button variant="ghost" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      {locale === 'ua' ? 'Завантажити' : 'Download'}
                    </Button>
                    <Button variant="ghost" size="sm">
                      {locale === 'ua' ? 'Повторний запис' : 'Repeat appointment'}
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </div>

      <SignInModal isOpen={isSignInOpen} onClose={() => setIsSignInOpen(false)} />
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </div>
  );
}
