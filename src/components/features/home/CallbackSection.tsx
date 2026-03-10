'use client';

import { useLocale } from '@/contexts';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Phone, Mail, Send, CheckCircle } from 'lucide-react';
import { Button, Input, Modal } from '@/components/ui';

export function CallbackSection() {
  const { locale } = useLocale();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    question: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
    setTimeout(() => {
      setIsModalOpen(true);
    }, 500);
  };

  return (
    <>
      <section className="section bg-medical-surface-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              className="flex flex-col"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-secondary text-3xl md:text-4xl font-medium text-medical-primary-900 mb-6">
                {locale === 'ua'
                  ? 'Залишилися питання?'
                  : 'Still have questions?'}
              </h2>
              <p className="text-medical-text-secondary text-lg mb-8 leading-relaxed">
                {locale === 'ua'
                  ? 'Заповніть форму і наш менеджер зв\'яжеться з вами протягом 15 хвилин'
                  : 'Fill out the form and our manager will contact you within 15 minutes'}
              </p>

              {/* Contact Details */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-medical-accent-100 rounded-sm flex items-center justify-center">
                    <Phone className="w-5 h-5 text-medical-accent-600" />
                  </div>
                  <div>
                    <p className="text-sm text-medical-text-tertiary">
                      {locale === 'ua' ? 'Контакт-центр:' : 'Contact Center:'}
                    </p>
                    <a href="tel:+380980463303" className="text-medical-primary-900 font-medium hover:text-medical-accent-600 transition-colors">
                      +38 (098) 046-33-03
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-medical-accent-100 rounded-sm flex items-center justify-center">
                    <Mail className="w-5 h-5 text-medical-accent-600" />
                  </div>
                  <div>
                    <p className="text-sm text-medical-text-tertiary">Email:</p>
                    <a href="mailto:info@asklepiy.com" className="text-medical-primary-900 font-medium hover:text-medical-accent-600 transition-colors">
                      info@asklepiy.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Working Hours */}
              <div className="bg-white p-6 rounded-sm shadow-medical-md mt-auto">
                <h4 className="font-medium text-medical-primary-900 mb-4">
                  {locale === 'ua' ? 'Графік роботи:' : 'Working Hours:'}
                </h4>
                <div className="space-y-2 text-medical-text-secondary">
                  <div className="flex justify-between">
                    <span>{locale === 'ua' ? 'Пн-Сб:' : 'Mon-Sat:'}</span>
                    <span className="font-medium">07:00 - 20:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{locale === 'ua' ? 'Неділя:' : 'Sunday:'}</span>
                    <span className="font-medium">08:00 - 20:00</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              className="bg-white p-8 rounded-sm shadow-medical-lg"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-medical-primary-900 mb-2">
                      {locale === 'ua' ? 'Ваше ім\'я' : 'Your Name'}
                    </label>
                    <Input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={locale === 'ua' ? 'Прізвище Імʼя' : 'Surname Name'}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-medical-primary-900 mb-2">
                      {locale === 'ua' ? 'Номер телефону' : 'Phone Number'}
                    </label>
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+38 (___) ___-__-__"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-medical-primary-900 mb-2">
                      {locale === 'ua' ? 'Ваше запитання' : 'Your Question'}
                    </label>
                    <textarea
                      value={formData.question}
                      onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                      placeholder={locale === 'ua' ? 'Опишіть ваше запитання...' : 'Describe your question...'}
                      rows={4}
                      className="w-full px-4 py-3 border border-medical-surface-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-medical-accent-500 focus:border-transparent resize-none"
                      required
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    <div className="flex items-center justify-center gap-2">
                      <Send className="w-4 h-4" />
                      <span>{locale === 'ua' ? 'Надіслати запитання' : 'Send Question'}</span>
                    </div>
                  </Button>
                </form>
              ) : (
                <motion.div
                  className="text-center py-12"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="w-16 h-16 bg-medical-status-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-medical-status-success" />
                  </div>
                  <h3 className="text-xl font-medium text-medical-primary-900 mb-2">
                    {locale === 'ua' ? 'Дякуємо за звернення!' : 'Thank you for contacting us!'}
                  </h3>
                  <p className="text-medical-text-secondary">
                    {locale === 'ua'
                      ? 'Ми зв\'яжемося з вами найближчим часом'
                      : 'We will contact you shortly'}
                  </p>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Success Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setIsSubmitted(false);
          setFormData({ name: '', phone: '', question: '' });
        }}
        title={locale === 'ua' ? 'Запитання надіслано' : 'Question Sent'}
      >
        <div className="text-center py-6">
          <div className="w-16 h-16 bg-medical-status-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-medical-status-success" />
          </div>
          <p className="text-medical-text-secondary mb-6">
            {locale === 'ua'
              ? 'Наш менеджер зв\'яжеться з вами протягом 15 хвилин'
              : 'Our manager will contact you within 15 minutes'}
          </p>
          <Button onClick={() => {
            setIsModalOpen(false);
            setIsSubmitted(false);
            setFormData({ name: '', phone: '', question: '' });
          }}>
            {locale === 'ua' ? 'Гаразд' : 'OK'}
          </Button>
        </div>
      </Modal>
    </>
  );
}
