import React from 'react';
import { motion } from 'motion/react';
import { Phone } from 'lucide-react';
import { SiteSettings } from '../types';

interface FounderSectionProps {
  settings: SiteSettings;
}

export const FounderSection: React.FC<FounderSectionProps> = ({ settings }) => {
  return (
    <section className="py-20 sm:py-24 bg-white border-b border-slate-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-16">
          {/* Photo with 4 Rounded Corners ('4 Kono ma Gol') */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="w-52 h-52 sm:w-60 sm:h-60 md:w-64 md:h-64 shrink-0 relative"
          >
            {/* Subtle soft backdrop glow */}
            <div className="absolute -inset-1.5 rounded-[32px] bg-gradient-to-tr from-emerald-600/20 via-amber-400/25 to-emerald-500/10 blur-sm" />
            <div className="relative w-full h-full rounded-[28px] overflow-hidden shadow-2xl ring-4 ring-amber-400/30 border-4 border-white bg-slate-100">
              <img
                src={settings.ownerPhotoUrl || '/abdul-sattar-bhayo-rice-broker.png'}
                alt="Abdul Sattar Bhayo, founder of Mashallah Rice Broker"
                className="w-full h-full object-cover object-top"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
            </div>
          </motion.div>

          {/* Founder Bio & Details */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex-1 text-center md:text-left"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-emerald-50 text-emerald-800 border border-emerald-200/60 mb-3">
              ✦ Executive Leadership
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-extrabold text-slate-900 mb-1 tracking-tight">
              Abdul Sattar Bhayo
            </h2>
            <p className="text-sm font-bold text-amber-600 mb-5 uppercase tracking-wider">
              Founder & Master Grain Broker
            </p>
            <p className="text-base sm:text-lg leading-relaxed mb-7 text-slate-600 font-normal">
              {settings.ownerBio}
            </p>
            <div className="flex justify-center md:justify-start gap-4">
              <a
                href={`tel:${settings.contactPhone}`}
                className="inline-flex items-center gap-2.5 bg-emerald-700 text-white font-bold px-6 py-3 rounded-xl hover:bg-emerald-800 shadow-[0_4px_16px_rgba(4,120,87,0.25)] hover:shadow-[0_8px_24px_rgba(4,120,87,0.35)] transition-all transform hover:-translate-y-0.5 cursor-pointer font-display text-sm sm:text-base"
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
