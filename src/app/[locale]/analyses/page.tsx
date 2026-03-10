'use client';

import { useLocale } from '@/contexts';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, ChevronUp, X } from 'lucide-react';
import { Card, Button, Input } from '@/components/ui';
import { useState, useCallback, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { BookingModal } from '@/features/booking/BookingModal';

// Main sections
const serviceSections = [
  {
    id: 'adult-polyclinic',
    name: 'Поліклініка для дорослих',
    nameEn: 'Adult Outpatient Clinic',
    icon: '👨‍⚕️',
  },
  {
    id: 'pediatric-clinic',
    name: 'Поліклініка для дітей',
    nameEn: 'Children Polyclinic',
    icon: '👶',
  },
  {
    id: 'pediatric-procedures',
    name: 'Лікарські процедури та маніпуляції для дітей',
    nameEn: 'Medical Procedures and Manipulations for Children',
    icon: '💉',
  },
  {
    id: 'diagnostics',
    name: 'Діагностичні процедури',
    nameEn: 'Diagnostic Procedures',
    icon: '🔬',
  },
  {
    id: 'laboratory',
    name: 'Лабораторна діагностика',
    nameEn: 'Laboratory Diagnostics',
    icon: '🧪',
  },
  {
    id: 'surgery',
    name: 'Хірургічні операції',
    nameEn: 'Surgical Operations',
    icon: '🏥',
  },
];

// Mock doctors data
const doctors = [
  { id: '1', name: 'Д-р Петренко О.В.', nameEn: 'Dr. Petrenko O.V.', specialty: 'Ортопед-травматолог', specialtyEn: 'Orthopedic-traumatologist' },
  { id: '2', name: 'Д-р Коваленко І.М.', nameEn: 'Dr. Kovalenko I.M.', specialty: 'Уролог', specialtyEn: 'Urologist' },
  { id: '3', name: 'Д-р Бондаренко С.П.', nameEn: 'Dr. Bondarenko S.P.', specialty: 'Кардіолог', specialtyEn: 'Cardiologist' },
  { id: '4', name: 'Д-р Шевченко Н.В.', nameEn: 'Dr. Shevchenko N.V.', specialty: 'Невролог', specialtyEn: 'Neurologist' },
  { id: '5', name: 'Д-р Мельник А.О.', nameEn: 'Dr. Melnyk A.O.', specialty: 'Ендокринолог', specialtyEn: 'Endocrinologist' },
  { id: '6', name: 'Д-р Лисенко В.І.', nameEn: 'Dr. Lysenko V.I.', specialty: 'ЛОР', specialtyEn: 'ENT' },
  { id: '7', name: 'Д-р Гончарук Т.С.', nameEn: 'Dr. Honcharuk T.S.', specialty: 'Ревматолог', specialtyEn: 'Rheumatologist' },
  { id: '8', name: 'Д-р Павленко Д.О.', nameEn: 'Dr. Pavlenko D.O.', specialty: 'Проктолог', specialtyEn: 'Proctologist' },
  { id: '9', name: 'Д-р Савченко Л.М.', nameEn: 'Dr. Savchenko L.M.', specialty: 'Гематолог', specialtyEn: 'Hematologist' },
  { id: '10', name: 'Д-р Ткаченко О.В.', nameEn: 'Dr. Tkachenko O.V.', specialty: 'Дерматовенеролог', specialtyEn: 'Dermatovenereologist' },
];

// Category names with translations
const categoryNames: Record<string, { ua: string; en: string }> = {
  // adult-polyclinic
  'orthopedics': { ua: 'Ортопедія і травматологія', en: 'Orthopedics and Traumatology' },
  'urology': { ua: 'Урологія', en: 'Urology' },
  'hematology': { ua: 'Гематологія', en: 'Hematology' },
  'massage-adults': { ua: 'Масаж для дорослих', en: 'Massage for Adults' },
  'dermatovenereology': { ua: 'Дерматовенерологія', en: 'Dermatovenereology' },
  'cardiology': { ua: 'Кардіологія', en: 'Cardiology' },
  'neurology': { ua: 'Неврологія', en: 'Neurology' },
  'endocrinology': { ua: 'Ендокринологія', en: 'Endocrinology' },
  'ent': { ua: 'Отоларингологія (ЛОР)', en: 'Otolaryngology (ENT)' },
  'rheumatology': { ua: 'Ревматологія', en: 'Rheumatology' },
  'proctology': { ua: 'Проктологія', en: 'Proctology' },
  // pediatric-clinic
  'vaccinations': { ua: 'Щеплення дітей', en: 'Children Vaccinations' },
  'hematology-pediatric': { ua: 'Гематологія дитяча', en: 'Pediatric Hematology' },
  'allergology-pediatric': { ua: 'Алергологія дитяча', en: 'Pediatric Allergology' },
  'surgery-urology-pediatric': { ua: 'Хірургія та урологія дитяча', en: 'Pediatric Surgery and Urology' },
  'nephrology-pediatric': { ua: 'Нефрологія дитяча', en: 'Pediatric Nephrology' },
  'pediatrics': { ua: 'Педіатрія', en: 'Pediatrics' },
  'ent-pediatric': { ua: 'Отоларингологія дитяча', en: 'Pediatric Otolaryngology' },
  'neurology-pediatric': { ua: 'Неврологія дитяча', en: 'Pediatric Neurology' },
  // pediatric-procedures
  'gynecology-pediatric': { ua: 'Гінекологічні дитячі процедури та маніпуляції', en: 'Pediatric Gynecological Procedures' },
  'ophthalmology-pediatric': { ua: 'Офтальмологічні дитячі процедури та маніпуляції', en: 'Pediatric Ophthalmologic Procedures' },
  'ent-pediatric-procedures': { ua: 'Отоларингологічні дитячі процедури та маніпуляції', en: 'Pediatric ENT Procedures' },
  'orthopedics-pediatric': { ua: 'Ортопедичні дитячі процедури та маніпуляції', en: 'Pediatric Orthopedic Procedures' },
  // diagnostics
  'ultrasound': { ua: 'УЗД', en: 'Ultrasound Diagnostics' },
  'functional-diagnostics': { ua: 'Функціональна діагностика', en: 'Functional Diagnostics' },
  'respiratory-diagnostics': { ua: 'Діагностика дихання', en: 'Respiratory Diagnostics' },
  // laboratory
  'pcr': { ua: 'ПЛР діагностика', en: 'PCR Diagnostics' },
  'hepatitis': { ua: 'Вірусні гепатити', en: 'Viral Hepatitis' },
  'biochemical': { ua: 'Біохімічні аналізи', en: 'Biochemical Analysis' },
  // surgery
  'ophthalmic-surgery': { ua: 'Офтальмохірургія', en: 'Ophthalmic Surgery' },
  'urological-surgery': { ua: 'Урологічна хірургія', en: 'Urological Surgery' },
  'ent-surgery': { ua: 'ЛОР хірургія', en: 'ENT Surgery' },
};

// Pricing data with Section → Category → Services structure
const pricingData: Record<string, Record<string, { name: string; nameEn: string; price: number }[]>> = {
  'adult-polyclinic': {
    'orthopedics': [
      { name: 'Консультація ортопеда-травматолога', nameEn: 'Orthopedic-traumatologist consultation', price: 650 },
      { name: 'Консультація ортопеда-травматолога (професор, д.м.н.)', nameEn: 'Orthopedic-traumatologist consultation (Professor, Doctor of Medical Sciences)', price: 950 },
      { name: 'Повторна консультація ортопеда-травматолога', nameEn: 'Orthopedic-traumatologist follow-up consultation', price: 550 },
      { name: 'Онлайн консультація ортопеда-травматолога', nameEn: 'Online orthopedic-traumatologist consultation', price: 650 },
    ],
    'urology': [
      { name: 'Консультація уролога', nameEn: 'Urologist consultation', price: 650 },
      { name: 'Повторна консультація уролога', nameEn: 'Urologist follow-up consultation', price: 550 },
    ],
    'hematology': [
      { name: 'Консультація гематолога', nameEn: 'Hematologist consultation', price: 750 },
      { name: 'Повторна консультація гематолога', nameEn: 'Hematologist follow-up consultation', price: 650 },
    ],
    'massage-adults': [
      { name: 'Лімфодренажний лікувальний масаж', nameEn: 'Lymphatic drainage therapeutic massage', price: 700 },
      { name: 'Загальний лікувальний масаж всього тіла', nameEn: 'Full body therapeutic massage', price: 800 },
      { name: 'Лікувальний масаж спини', nameEn: 'Back therapeutic massage', price: 500 },
      { name: 'Масаж комірової зони', nameEn: 'Neck and collar zone massage', price: 400 },
    ],
    'dermatovenereology': [
      { name: 'Консультація дерматовенеролога', nameEn: 'Dermatovenereologist consultation', price: 650 },
    ],
    'cardiology': [
      { name: 'Консультація кардіолога', nameEn: 'Cardiologist consultation', price: 700 },
      { name: 'Повторна консультація кардіолога', nameEn: 'Cardiologist follow-up consultation', price: 600 },
      { name: 'Онлайн консультація кардіолога', nameEn: 'Online cardiologist consultation', price: 700 },
    ],
    'neurology': [
      { name: 'Консультація невролога', nameEn: 'Neurologist consultation', price: 650 },
      { name: 'Повторна консультація невролога', nameEn: 'Neurologist follow-up consultation', price: 550 },
      { name: 'Консультація невролога (спеціаліст)', nameEn: 'Neurologist consultation (specialist category)', price: 700 },
      { name: 'Онлайн консультація невролога', nameEn: 'Online neurologist consultation', price: 650 },
    ],
    'endocrinology': [
      { name: 'Консультація ендокринолога', nameEn: 'Endocrinologist consultation', price: 650 },
      { name: 'Повторна консультація ендокринолога', nameEn: 'Endocrinologist follow-up consultation', price: 550 },
      { name: 'Онлайн консультація ендокринолога', nameEn: 'Online endocrinologist consultation', price: 650 },
    ],
    'ent': [
      { name: 'Консультація ЛОРа', nameEn: 'ENT consultation', price: 650 },
      { name: 'Повторна консультація ЛОРа', nameEn: 'ENT follow-up consultation', price: 550 },
      { name: 'Онлайн консультація ЛОРа', nameEn: 'Online ENT consultation', price: 650 },
      { name: 'Консультація ЛОРа (лікар спеціаліст)', nameEn: 'ENT consultation (specialist doctor)', price: 700 },
    ],
    'rheumatology': [
      { name: 'Консультація ревматолога', nameEn: 'Rheumatologist consultation', price: 750 },
      { name: 'Онлайн консультація ревматолога', nameEn: 'Online rheumatologist consultation', price: 750 },
      { name: 'Повторна консультація ревматолога', nameEn: 'Rheumatologist follow-up consultation', price: 650 },
    ],
    'proctology': [
      { name: 'Консультація проктолога', nameEn: 'Proctologist consultation', price: 750 },
      { name: 'Повторна консультація проктолога', nameEn: 'Proctologist follow-up consultation', price: 650 },
    ],
  },
  'pediatric-clinic': {
    'vaccinations': [
      { name: '«Туберкулін», проведення діагностичної проби на туберкульоз дітей віком від 4 до 18 років', nameEn: 'Tuberculin skin test for children aged 4-18', price: 250 },
      { name: 'Вакцинація від менінгококової інфекції дітей від 9 місяців препаратом «Менактра»', nameEn: 'Meningococcal vaccination for children from 9 months with Menactra', price: 1850 },
      { name: 'Консультація педіатра перед вакцинацією', nameEn: 'Pediatrician consultation before vaccination', price: 2250 },
      { name: '«Церварикс», вакцинація проти раку шийки матки дітей від 9 років', nameEn: 'Cervarix vaccination against cervical cancer for children from 9 years', price: 2700 },
      { name: 'Вакцинація дитини проти грипу «Джісі Флю Квадривалент»', nameEn: 'Influenza vaccination with GC Flu Quadrivalent', price: 750 },
    ],
    'hematology-pediatric': [
      { name: 'Консультація дитячого гематолога', nameEn: 'Pediatric hematologist consultation', price: 600 },
      { name: 'Консультація дитячого гематолога в динаміці', nameEn: 'Pediatric hematologist follow-up consultation', price: 450 },
    ],
    'allergology-pediatric': [
      { name: 'Консультація дитячого алерголога', nameEn: 'Pediatric allergist consultation', price: 600 },
      { name: 'Консультація дитячого алерголога в динаміці', nameEn: 'Pediatric allergist follow-up consultation', price: 450 },
    ],
    'surgery-urology-pediatric': [
      { name: 'Консультація дитячого хірурга', nameEn: 'Pediatric surgeon consultation', price: 600 },
      { name: 'Консультація дитячого хірурга в динаміці', nameEn: 'Pediatric surgeon follow-up consultation', price: 450 },
      { name: 'Консультація дитячого уролога', nameEn: 'Pediatric urologist consultation', price: 600 },
      { name: 'Консультація дитячого уролога в динаміці', nameEn: 'Pediatric urologist follow-up consultation', price: 450 },
    ],
    'nephrology-pediatric': [
      { name: 'Консультація дитячого нефролога', nameEn: 'Pediatric nephrologist consultation', price: 600 },
      { name: 'Консультація дитячого нефролога в динаміці', nameEn: 'Pediatric nephrologist follow-up consultation', price: 450 },
    ],
    'pediatrics': [
      { name: 'Консультація педіатра з грудного вигодовування', nameEn: 'Pediatrician consultation on breastfeeding', price: 1000 },
      { name: 'Консультація педіатра', nameEn: 'Pediatrician consultation', price: 600 },
      { name: 'Консультація педіатра в динаміці', nameEn: 'Pediatrician follow-up consultation', price: 450 },
      { name: 'Консультація педіатра онлайн', nameEn: 'Online pediatrician consultation', price: 600 },
      { name: 'Консультація педіатра по декларації', nameEn: 'Pediatrician consultation by declaration', price: 0 },
    ],
    'ent-pediatric': [
      { name: 'Консультація дитячого отоларинголога (ЛОР)', nameEn: 'Pediatric ENT consultation', price: 650 },
      { name: 'Консультація дитячого отоларинголога в динаміці', nameEn: 'Pediatric ENT follow-up consultation', price: 500 },
      { name: 'Консультація дитячого отоларинголога онлайн', nameEn: 'Online pediatric ENT consultation', price: 650 },
    ],
    'neurology-pediatric': [
      { name: 'Консультація дитячого невролога', nameEn: 'Pediatric neurologist consultation', price: 600 },
      { name: 'Консультація дитячого невролога в динаміці', nameEn: 'Pediatric neurologist follow-up consultation', price: 450 },
      { name: 'Консультація дитячого невролога онлайн', nameEn: 'Online pediatric neurologist consultation', price: 600 },
    ],
  },
  'pediatric-procedures': {
    'gynecology-pediatric': [
      { name: 'Інстиляція піхви у дитини', nameEn: 'Vaginal instillation in a child', price: 400 },
    ],
    'ophthalmology-pediatric': [
      { name: 'Огляд очного дна (непряма офтальмоскопія) у дитини', nameEn: 'Fundus examination (indirect ophthalmoscopy) in a child', price: 200 },
      { name: 'Підбір окулярів дитині', nameEn: 'Eyeglass selection for a child', price: 300 },
      { name: 'Підбір окулярів дитині (складна рецептура)', nameEn: 'Eyeglass selection for a child (complex prescription)', price: 3000 },
      { name: 'Курс апаратного лікування №8 (спазм акомодації)', nameEn: 'Hardware treatment course No. 8 (accommodation spasm)', price: 2500 },
    ],
    'ent-pediatric-procedures': [
      { name: 'Введення лікарських засобів у слизову носових раковин або гортань у дитини', nameEn: 'Administration of drugs to the nasal turbinates or larynx mucosa in a child', price: 500 },
      { name: 'Продування слухових труб за Політцеру у дитини', nameEn: 'Politzerization (ear blowing) in a child', price: 550 },
      { name: 'Промивання лакун мигдалик у дитини', nameEn: 'Washing of tonsil lacunae in a child', price: 550 },
      { name: 'Анемізація носової порожнини у дитини', nameEn: 'Anemization of the nasal cavity in a child', price: 450 },
      { name: 'Видалення сірчаних пробок у дитини (одне вухо)', nameEn: 'Removal of earwax plugs in a child (one ear)', price: 400 },
      { name: 'Припікання слизової оболонки носової порожнини у дитини', nameEn: 'Cauterization of the nasal mucosa in a child', price: 600 },
      { name: 'Ендоскопія ЛОР органів у дитини', nameEn: 'Endoscopy of ENT organs in a child', price: 900 },
    ],
    'orthopedics-pediatric': [
      { name: 'Пункція суглоба у дитини', nameEn: 'Joint puncture in a child', price: 800 },
      { name: 'Внутрішньосуглобове введення ліків у дитини', nameEn: 'Intra-articular drug administration in a child', price: 600 },
      { name: 'Парафінова терапія для дитини', nameEn: 'Paraffin therapy for a child', price: 400 },
      { name: 'Одягання бандажу або протезу у дитини (без вартості бандажу чи протезу)', nameEn: 'Applying a bandage or prosthesis on a child (without bandage or prosthesis cost)', price: 300 },
    ],
  },
  'diagnostics': {
    'ultrasound': [
      { name: 'УЗД органів черевної порожнини', nameEn: 'Abdominal ultrasound', price: 650 },
      { name: 'УЗД нирок', nameEn: 'Kidney ultrasound', price: 550 },
      { name: 'УЗД сечового міхура', nameEn: 'Bladder ultrasound', price: 450 },
      { name: 'УЗД щитоподібної залози', nameEn: 'Thyroid ultrasound', price: 650 },
    ],
    'functional-diagnostics': [
      { name: 'Електрокардіографія (ЕКГ)', nameEn: 'Electrocardiography (ECG)', price: 250 },
    ],
    'respiratory-diagnostics': [
      { name: 'Бронхоспірометрія', nameEn: 'Bronchospyrometry', price: 400 },
      { name: 'Бронхоспірометрія з бронхолітиком', nameEn: 'Bronchospyrometry with bronchodilator', price: 500 },
    ],
  },
  'laboratory': {
    'pcr': [
      { name: 'Вірус Епштейна-Барр ПЛР', nameEn: 'Epstein–Barr virus PCR', price: 500 },
      { name: 'Вірус герпесу ПЛР', nameEn: 'Herpes virus PCR', price: 450 },
      { name: 'Вірус папіломи людини ПЛР', nameEn: 'Human papillomavirus PCR', price: 550 },
    ],
    'hepatitis': [
      { name: 'Тест на гепатит A', nameEn: 'Hepatitis A test', price: 350 },
      { name: 'Тест на гепатит B', nameEn: 'Hepatitis B test', price: 400 },
      { name: 'Тест на гепатит C', nameEn: 'Hepatitis C test', price: 400 },
    ],
    'biochemical': [
      { name: 'Тригліцериди', nameEn: 'Triglycerides', price: 150 },
      { name: 'Сечова кислота', nameEn: 'Uric acid', price: 150 },
      { name: 'D-димер', nameEn: 'D-dimer', price: 450 },
    ],
  },
  'surgery': {
    'ophthalmic-surgery': [
      { name: 'Факоемульсифікація катаракти', nameEn: 'Cataract phacoemulsification', price: 18000 },
      { name: 'Кантопексія', nameEn: 'Canthopexy', price: 7000 },
      { name: 'Видалення птеригіуму', nameEn: 'Pterygium removal', price: 5000 },
    ],
    'urological-surgery': [
      { name: 'Стентування сечоводу', nameEn: 'Ureteral stenting', price: 6500 },
      { name: 'ТУР операція простати', nameEn: 'TUR prostate surgery', price: 25000 },
      { name: 'Операція з приводу варикоцеле', nameEn: 'Varicocele surgery', price: 12000 },
    ],
    'ent-surgery': [
      { name: 'Септопластика', nameEn: 'Septoplasty', price: 20000 },
      { name: 'Ринопластика', nameEn: 'Rhinoplasty', price: 35000 },
      { name: 'Ендоскопічна операція на пазухах', nameEn: 'Endoscopic sinus surgery', price: 25000 },
    ],
  },
};

// Service booking modal component
interface ServiceBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceName: string;
  serviceNameEn: string;
  price: number;
}

function ServiceBookingModal({ isOpen, onClose, serviceName, serviceNameEn, price }: ServiceBookingModalProps) {
  const { locale } = useLocale();
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleDoctorSelect = (doctorId: string) => {
    setSelectedDoctor(doctorId);
  };

  const handleNext = () => {
    if (step === 1 && !selectedDoctor) return;
    
    if (step === 2) {
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

    if (step < 3) {
      setStep((prev) => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    setIsSuccess(true);
  };

  const handleClose = () => {
    setStep(1);
    setSelectedDoctor(null);
    setFormData({ firstName: '', lastName: '', phone: '', email: '' });
    setErrors({});
    setIsSuccess(false);
    onClose();
  };

  const handleInputChange = (field: string, value: string) => {
    if (field === 'firstName' || field === 'lastName') {
      const filteredValue = value.replace(/[0-9]/g, '');
      setFormData((prev) => ({ ...prev, [field]: filteredValue }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const selectedDoctorData = doctors.find((d) => d.id === selectedDoctor);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />
          
          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto pointer-events-auto"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-medical-surface-200 p-4 flex items-center justify-between z-10">
                <h2 className="text-lg font-medium text-medical-primary-900">
                  {locale === 'ua' ? 'Записатися на прийом' : 'Book Appointment'}
                </h2>
                <button
                  onClick={handleClose}
                  className="p-2 hover:bg-medical-surface-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-medical-text-tertiary" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                {isSuccess ? (
                  <motion.div
                    className="text-center py-8"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <div className="w-16 h-16 bg-medical-status-success rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-medium text-medical-primary-900 mb-2">
                      {locale === 'ua' ? 'Запис успішно підтверджено!' : 'Appointment confirmed!'}
                    </h3>
                    <p className="text-medical-text-secondary mb-4">
                      {locale === 'ua'
                        ? 'Ми зв\'яжемося з вами найближчим часом'
                        : 'We will contact you shortly'}
                    </p>
                    <Button onClick={handleClose}>
                      {locale === 'ua' ? 'Закрити' : 'Close'}
                    </Button>
                  </motion.div>
                ) : isLoading ? (
                  <div className="text-center py-8">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-12 h-12 border-4 border-medical-accent-200 border-t-medical-accent-600 rounded-full mx-auto mb-4"
                    />
                    <p className="text-medical-text-secondary">
                      {locale === 'ua' ? 'Підтверджуємо запис...' : 'Confirming your appointment...'}
                    </p>
                  </div>
                ) : step === 1 ? (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    {/* Service Info */}
                    <div className="bg-medical-surface-50 rounded-sm p-4 mb-4">
                      <p className="text-sm text-medical-text-tertiary mb-1">
                        {locale === 'ua' ? 'Послуга' : 'Service'}
                      </p>
                      <p className="font-medium text-medical-primary-900">
                        {locale === 'ua' ? serviceName : serviceNameEn}
                      </p>
                      <p className="text-medical-accent-600 font-medium mt-1">
                        {price.toLocaleString('ua-UA')} ₴
                      </p>
                    </div>

                    <h3 className="text-base font-medium text-medical-primary-900">
                      {locale === 'ua' ? 'Оберіть лікаря' : 'Select a doctor'}
                    </h3>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {doctors.map((doctor) => (
                        <button
                          key={doctor.id}
                          onClick={() => handleDoctorSelect(doctor.id)}
                          className={cn(
                            'w-full p-4 rounded-sm border-2 text-left transition-all',
                            selectedDoctor === doctor.id
                              ? 'border-medical-accent-600 bg-medical-accent-50'
                              : 'border-medical-surface-200 hover:border-medical-accent-300'
                          )}
                        >
                          <p className="font-medium text-medical-primary-900">
                            {locale === 'ua' ? doctor.name : doctor.nameEn}
                          </p>
                          <p className="text-sm text-medical-text-tertiary">
                            {locale === 'ua' ? doctor.specialty : doctor.specialtyEn}
                          </p>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                ) : step === 2 ? (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    {/* Summary */}
                    <div className="bg-medical-surface-50 rounded-sm p-4 space-y-2 mb-4">
                      <div className="flex justify-between">
                        <span className="text-sm text-medical-text-tertiary">
                          {locale === 'ua' ? 'Послуга' : 'Service'}
                        </span>
                        <span className="font-medium text-right text-sm">
                          {locale === 'ua' ? serviceName : serviceNameEn}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-medical-text-tertiary">
                          {locale === 'ua' ? 'Лікар' : 'Doctor'}
                        </span>
                        <span className="font-medium text-right text-sm">
                          {locale === 'ua' ? selectedDoctorData?.name : selectedDoctorData?.nameEn}
                        </span>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-medical-surface-200">
                        <span className="text-sm text-medical-text-tertiary">
                          {locale === 'ua' ? 'Вартість' : 'Price'}
                        </span>
                        <span className="font-medium text-medical-accent-600 text-right">
                          {price.toLocaleString('ua-UA')} ₴
                        </span>
                      </div>
                    </div>

                    <h3 className="text-base font-medium text-medical-primary-900">
                      {locale === 'ua' ? 'Ваші дані' : 'Your Information'}
                    </h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-medical-text-primary mb-1">
                            {locale === 'ua' ? "Прізвище *" : 'Last Name *'}
                          </label>
                          <Input
                            type="text"
                            placeholder={locale === 'ua' ? "Прізвище" : 'Last Name'}
                            value={formData.lastName}
                            onChange={(e) => handleInputChange('lastName', e.target.value)}
                            className={cn('h-10', errors.lastName && 'border-medical-status-error')}
                          />
                          {errors.lastName && (
                            <p className="mt-1 text-xs text-medical-status-error">{errors.lastName}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-medical-text-primary mb-1">
                            {locale === 'ua' ? "Ім'я *" : 'First Name *'}
                          </label>
                          <Input
                            type="text"
                            placeholder={locale === 'ua' ? "Ім'я" : 'First Name'}
                            value={formData.firstName}
                            onChange={(e) => handleInputChange('firstName', e.target.value)}
                            className={cn('h-10', errors.firstName && 'border-medical-status-error')}
                          />
                          {errors.firstName && (
                            <p className="mt-1 text-xs text-medical-status-error">{errors.firstName}</p>
                          )}
                        </div>
                      </div>
                      <div>
                        <Input
                          type="tel"
                          label={locale === 'ua' ? 'Телефон *' : 'Phone *'}
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          error={errors.phone}
                          placeholder="+38 (0XX) XXX-XX-XX"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-medical-text-primary mb-1">
                          {locale === 'ua' ? 'Email (необовʼязково)' : 'Email (optional)'}
                        </label>
                        <Input
                          type="email"
                          placeholder={locale === 'ua' ? 'example@email.com' : 'example@email.com'}
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="h-10"
                        />
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <div className="bg-medical-surface-50 rounded-sm p-4 space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-medical-text-tertiary">
                          {locale === 'ua' ? 'Послуга' : 'Service'}
                        </span>
                        <span className="font-medium text-right text-sm">
                          {locale === 'ua' ? serviceName : serviceNameEn}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-medical-text-tertiary">
                          {locale === 'ua' ? 'Лікар' : 'Doctor'}
                        </span>
                        <span className="font-medium text-right text-sm">
                          {locale === 'ua' ? selectedDoctorData?.name : selectedDoctorData?.nameEn}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-medical-text-tertiary">
                          {locale === 'ua' ? "ПІБ" : 'Full Name'}
                        </span>
                        <span className="font-medium text-right text-sm">
                          {formData.lastName} {formData.firstName}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-medical-text-tertiary">
                          {locale === 'ua' ? 'Телефон' : 'Phone'}
                        </span>
                        <span className="font-medium text-right text-sm">
                          {formData.phone}
                        </span>
                      </div>
                      <div className="border-t border-medical-surface-200 pt-3 flex justify-between">
                        <span className="text-sm text-medical-text-tertiary">
                          {locale === 'ua' ? 'Вартість' : 'Price'}
                        </span>
                        <span className="font-medium text-medical-accent-600 text-right">
                          {price.toLocaleString('ua-UA')} ₴
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Footer Buttons */}
              {!isSuccess && !isLoading && (
                <div className="sticky bottom-0 bg-white border-t border-medical-surface-200 p-4 flex justify-between gap-3">
                  {step > 1 ? (
                    <Button
                      variant="ghost"
                      onClick={() => setStep((prev) => prev - 1)}
                    >
                      {locale === 'ua' ? 'Назад' : 'Back'}
                    </Button>
                  ) : (
                    <div />
                  )}
                  <Button
                    onClick={handleNext}
                    disabled={(step === 1 && !selectedDoctor) || (step === 2 && (!formData.firstName || !formData.lastName || !formData.phone))}
                  >
                    {step === 3
                      ? (locale === 'ua' ? 'Підтвердити запис' : 'Confirm booking')
                      : (locale === 'ua' ? 'Далі' : 'Next')}
                  </Button>
                </div>
              )}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default function ServicesPage() {
  const { locale } = useLocale();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [bookingModal, setBookingModal] = useState<{
    isOpen: boolean;
    serviceName: string;
    serviceNameEn: string;
    price: number;
  }>({ isOpen: false, serviceName: '', serviceNameEn: '', price: 0 });

  // Search results - filter services based on query
  const searchResults = useMemo(() => {
    if (searchQuery.length < 2) return [];

    const query = searchQuery.toLowerCase();
    const results: Array<{
      sectionId: string;
      sectionName: string;
      categoryId: string;
      categoryName: string;
      serviceName: string;
      serviceNameEn: string;
      price: number;
    }> = [];

    Object.entries(pricingData).forEach(([sectionId, categories]) => {
      Object.entries(categories).forEach(([categoryId, services]) => {
        services.forEach((service) => {
          const nameUa = service.name.toLowerCase();
          const nameEn = service.nameEn.toLowerCase();
          
          if (nameUa.includes(query) || nameEn.includes(query)) {
            const section = serviceSections.find(s => s.id === sectionId);
            results.push({
              sectionId,
              sectionName: locale === 'ua' ? section?.name || '' : section?.nameEn || '',
              categoryId,
              categoryName: categoryNames[categoryId]?.[locale === 'ua' ? 'ua' : 'en'] || categoryId,
              serviceName: service.name,
              serviceNameEn: service.nameEn,
              price: service.price,
            });
          }
        });
      });
    });

    return results;
  }, [searchQuery, locale]);

  const toggleSection = (sectionId: string) => {
    if (expandedSection === sectionId) {
      setExpandedSection(null);
      setSelectedCategory(null);
    } else {
      setExpandedSection(sectionId);
      setSelectedCategory(null);
    }
  };

  const selectCategory = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const handleBookService = (serviceName: string, serviceNameEn: string, price: number) => {
    setBookingModal({ isOpen: true, serviceName, serviceNameEn, price });
  };

  const renderServiceTable = (services: { name: string; nameEn: string; price: number }[], category: string) => {
    return (
      <div className="overflow-hidden">
        <table className="w-full table-fixed">
          <thead>
            <tr className="border-b border-medical-surface-200">
              <th className="text-left py-3 px-4 text-sm font-medium text-medical-text-tertiary w-3/4">
                {locale === 'ua' ? 'Послуга' : 'Service'}
              </th>
              <th className="text-right py-3 px-4 text-sm font-medium text-medical-text-tertiary w-1/4">
                {locale === 'ua' ? 'Ціна' : 'Price'}
              </th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence mode="wait">
              {services.map((service, idx) => (
                <motion.tr
                  key={service.name}
                  className="border-b border-medical-surface-100 hover:bg-medical-surface-50 transition-colors cursor-pointer group"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: idx * 0.04, duration: 0.2 }}
                  onClick={() => handleBookService(service.name, service.nameEn, service.price)}
                >
                  <td className="py-4 px-4 text-medical-text-primary">
                    <span className="group-hover:text-medical-accent-600 transition-colors">
                      {locale === 'ua' ? service.name : service.nameEn}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <span className="font-medium text-medical-accent-600 group-hover:underline">
                      {service.price.toLocaleString('ua-UA')} ₴
                    </span>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    );
  };

  const renderSectionContent = (sectionId: string) => {
    const sectionData = pricingData[sectionId];

    if (!sectionData) {
      return (
        <div className="p-8 text-center text-medical-text-tertiary">
          {locale === 'ua'
            ? 'Інформація про послуги цього розділу уточнюється'
            : 'Information about services in this section is being clarified'}
        </div>
      );
    }

    // Only show the selected category content
    if (selectedCategory && sectionData[selectedCategory]) {
      return (
        <motion.div
          key={selectedCategory}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="mt-4"
        >
          {renderServiceTable(sectionData[selectedCategory], selectedCategory)}
        </motion.div>
      );
    }

    return (
      <div className="py-8 text-center text-medical-text-tertiary">
        {locale === 'ua'
          ? 'Оберіть категорію послуг'
          : 'Select a service category'}
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl md:text-4xl font-secondary font-medium text-medical-primary-900 mb-4">
          {locale === 'ua' ? 'Послуги та ціни' : 'Services & Prices'}
        </h1>
        <p className="text-lg text-medical-text-secondary max-w-2xl mx-auto">
          {locale === 'ua'
            ? 'Повний перелік медичних послуг з прозорим ціноутворенням'
            : 'Complete list of medical services with transparent pricing'}
        </p>
      </motion.div>

      {/* Search */}
      <div className="max-w-xl mx-auto mb-12">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-medical-text-tertiary" />
          <Input
            type="text"
            placeholder={locale === 'ua' ? 'Пошук послуги...' : 'Search service...'}
            className="pl-12"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        {/* Search Results */}
        {searchQuery.length >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-sm shadow-medical-lg border border-medical-surface-200 max-h-96 overflow-y-auto z-10"
          >
            {searchResults.length > 0 ? (
              <div className="divide-y divide-medical-surface-100">
                {searchResults.slice(0, 10).map((result, idx) => (
                  <button
                    key={`${result.sectionId}-${result.categoryId}-${idx}`}
                    className="w-full px-4 py-3 text-left hover:bg-medical-surface-50 transition-colors"
                    onClick={() => {
                      setExpandedSection(result.sectionId);
                      setSelectedCategory(result.categoryId);
                      setSearchQuery('');
                    }}
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <p className="text-medical-primary-900 font-medium">
                          {locale === 'ua' ? result.serviceName : result.serviceNameEn}
                        </p>
                        <p className="text-sm text-medical-text-tertiary mt-0.5">
                          {result.categoryName} • {result.sectionName}
                        </p>
                      </div>
                      <span className="font-medium text-medical-accent-600 whitespace-nowrap">
                        {result.price.toLocaleString('ua-UA')} ₴
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="p-4 text-center text-medical-text-tertiary">
                {locale === 'ua'
                  ? 'Нічого не знайдено'
                  : 'Nothing found'}
              </div>
            )}
          </motion.div>
        )}
      </div>

      {/* Service Sections */}
      <div className="space-y-4">
        {serviceSections.map((section, index) => {
          const sectionData = pricingData[section.id];

          return (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="overflow-hidden">
                {/* Section Header */}
                <button
                  onClick={() => toggleSection(section.id)}
                  className={cn(
                    'w-full flex items-center justify-between p-6 transition-colors',
                    expandedSection === section.id ? 'bg-medical-surface-50' : 'hover:bg-medical-surface-50'
                  )}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-3xl">{section.icon}</span>
                    <div className="text-left">
                      <h2 className="text-xl font-medium text-medical-primary-900">
                        {locale === 'ua' ? section.name : section.nameEn}
                      </h2>
                    </div>
                  </div>
                  {expandedSection === section.id ? (
                    <ChevronUp className="w-6 h-6 text-medical-text-tertiary" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-medical-text-tertiary" />
                  )}
                </button>

                {/* Section Content */}
                {expandedSection === section.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-medical-surface-200"
                  >
                    <div className="p-6">
                      {/* Categories Grid */}
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2 mb-6">
                        {sectionData && Object.keys(sectionData).map((category) => (
                          <button
                            key={category}
                            onClick={() => selectCategory(category)}
                            className={cn(
                              'px-4 py-2.5 text-left text-sm rounded-sm transition-colors',
                              selectedCategory === category
                                ? 'bg-medical-accent-600 text-white font-medium'
                                : 'bg-medical-surface-50 text-medical-text-primary hover:bg-medical-surface-100'
                            )}
                          >
                            {categoryNames[category] ? (locale === 'ua' ? categoryNames[category].ua : categoryNames[category].en) : category}
                          </button>
                        ))}
                      </div>

                      {/* Service Tables */}
                      {renderSectionContent(section.id)}
                    </div>
                  </motion.div>
                )}
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Booking Modal */}
      <ServiceBookingModal
        isOpen={bookingModal.isOpen}
        onClose={() => setBookingModal({ ...bookingModal, isOpen: false })}
        serviceName={bookingModal.serviceName}
        serviceNameEn={bookingModal.serviceNameEn}
        price={bookingModal.price}
      />
    </div>
  );
}
