'use client';

import { useLocale } from '@/contexts';
import { motion } from 'framer-motion';
import { Building2 } from 'lucide-react';

const partners = [
  { id: 1, name: 'Полісся', nameEn: 'Polissia' },
  { id: 2, name: 'TRX Pantera Club', nameEn: 'TRX Pantera Club' },
  { id: 3, name: 'Атмосфера', nameEn: 'Atmosfera' },
  { id: 4, name: 'Vuso', nameEn: 'Vuso' },
  { id: 5, name: 'Savitar Group', nameEn: 'Savitar Group' },
  { id: 6, name: 'CSD Lab', nameEn: 'CSD Lab' },
];

export function PartnersSection() {
  const { locale } = useLocale();

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-secondary text-2xl md:text-3xl font-medium text-medical-primary-900 mb-2">
            {locale === 'ua' ? 'Наші партнери' : 'Our Partners'}
          </h2>
          <p className="text-medical-text-secondary">
            {locale === 'ua'
              ? 'Надійні партнери для якісної медицини'
              : 'Reliable partners for quality medicine'}
          </p>
        </motion.div>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.id}
              className="flex items-center justify-center p-6 bg-medical-surface-50 rounded-sm hover:bg-medical-accent-50 transition-colors"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="text-center">
                <Building2 className="w-12 h-12 text-medical-accent-400 mx-auto mb-2" />
                <span className="text-sm font-medium text-medical-text-secondary">
                  {locale === 'ua' ? partner.name : partner.nameEn}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
