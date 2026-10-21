import React from 'react';
import { motion } from 'motion/react';
import { Phone } from 'lucide-react';
import { SiteSettings } from '../types';

interface FounderSectionProps {
  settings: SiteSettings;
}

export const FounderSection: React.FC<FounderSectionProps> = ({ settings }) => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Circular Photo with Decorative Ring */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-48 h-48 md:w-64 md:h-64 shrink-0 relative"
          >
            <div className="absolute inset-0 rounded-full border-4 border-secondary transform translate-x-4 translate-y-4" />
            <img
              src={settings.ownerPhotoUrl || 'https://randomuser.me/api/portraits/men/32.jpg'}
              alt="Abdul Sattar Bhayo"
              className="w-full h-full object-cover rounded-full relative z-10 shadow-xl"
              referrerPolicy="no-referrer"
            />
          </motion.div>

          {/* Founder Bio & Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex-1 text-center md:text-left"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-2">
              Abdul Sattar Bhayo
            </h2>
            <p className="text-lg text-secondary font-medium mb-6 uppercase tracking-wider">
              Founder
            </p>
            <p className="text-lg leading-relaxed mb-8 text-gray-700 opacity-90">
              {settings.ownerBio}
            </p>
            <div className="flex justify-center md:justify-start gap-4">
              <a
                href={`tel:${settings.contactPhone}`}
                className="inline-flex items-center gap-2 bg-primary text-white font-medium px-6 py-3 rounded-full hover:bg-primary-hover shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
              >
                <Phone size={18} />
                <span>Contact Directly</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
