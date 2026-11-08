import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, TrendingDown, Truck, Headset } from 'lucide-react';
import { SiteSettings } from '../types';

interface AboutSectionProps {
  settings: SiteSettings;
  showAbout?: boolean;
  showWhyChoose?: boolean;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  settings,
  showAbout = true,
  showWhyChoose = true,
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldCheck':
        return <ShieldCheck size={32} />;
      case 'TrendingDown':
        return <TrendingDown size={32} />;
      case 'Truck':
        return <Truck size={32} />;
      case 'Headset':
      default:
        return <Headset size={32} />;
    }
  };

  return (
    <section id="about" className="py-20 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* About Us Paragraph */}
        {showAbout && (
          <div className="mb-20 text-center max-w-3xl mx-auto flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-emerald-50 text-emerald-800 border border-emerald-200/60 mb-3">
              ✦ Trust & Heritage
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-slate-900 mb-4 tracking-tight">
              About Us
            </h2>
            <div className="w-16 h-1 bg-amber-500 rounded-full mx-auto mb-6" />
            <p className="text-base sm:text-lg leading-relaxed text-slate-600 font-normal">
              {settings.aboutText}
            </p>
          </div>
        )}

        {/* Why Choose Us 4 Cards */}
        {showWhyChoose && (
          <div className="flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-emerald-50 text-emerald-800 border border-emerald-200/60 mb-3">
              ✦ Value Proposition
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-center text-slate-900 mb-12 tracking-tight">
              Why Choose Mashallah Broker?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
              {settings.whyChooseUsItems?.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-7 rounded-2xl text-center border border-slate-200/80 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_32px_-6px_rgba(0,0,0,0.08)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-center group"
                >
                  <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/10 flex items-center justify-center mb-5 group-hover:bg-emerald-700 group-hover:text-white transition-colors duration-300">
                    {getIcon(item.icon)}
                  </div>
                  <h3 className="text-lg font-display font-bold text-slate-900 mb-2.5">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed font-normal">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
