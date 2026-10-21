import React from 'react';
import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { SiteSettings } from '../types';

interface HeroProps {
  settings: SiteSettings;
}

export const Hero: React.FC<HeroProps> = ({ settings }) => {
  const scrollToProducts = () => {
    const el = document.getElementById('products');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* Hero Banner Background Image */}
      <img
        src={
          settings.heroBannerUrl ||
          'https://images.unsplash.com/photo-1595113316349-9fa4eb24f884?auto=format&fit=crop&q=80&w=2000'
        }
        alt="Mashallah Rice Fields"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Hero Content */}
      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight drop-shadow-md"
        >
          {settings.heroHeading}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-8 font-light max-w-2xl mx-auto drop-shadow"
        >
          {settings.heroSubheading}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <button
            onClick={scrollToProducts}
            className="inline-flex items-center gap-2 bg-secondary text-gray-900 font-bold px-8 py-4 rounded-full text-lg hover:bg-secondary-hover shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 cursor-pointer"
          >
            <span>View Our Products</span>
            <ChevronDown size={20} className="animate-bounce" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};
