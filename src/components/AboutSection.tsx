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
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* About Us Paragraph */}
        {showAbout && (
          <div className="mb-20 text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-serif font-bold text-primary mb-6">
              About Us
            </h2>
            <div className="w-20 h-1 bg-secondary mx-auto mb-6" />
            <p className="text-lg leading-relaxed text-gray-700 opacity-90">
              {settings.aboutText}
            </p>
          </div>
        )}

        {/* Why Choose Us 4 Cards */}
        {showWhyChoose && (
          <div>
            <h2 className="text-3xl font-serif font-bold text-center text-gray-900 mb-12">
              Why Choose Us
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {settings.whyChooseUsItems?.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 rounded-2xl text-center border border-gray-100 bg-[#f5f2ed] hover:shadow-md transition-shadow"
                >
                  <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary">
                    {getIcon(item.icon)}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
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
