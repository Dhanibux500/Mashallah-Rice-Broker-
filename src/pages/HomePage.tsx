import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { FounderSection } from '../components/FounderSection';
import { ProductsSection } from '../components/ProductsSection';
import { AboutSection } from '../components/AboutSection';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { FaqSection } from '../components/FaqSection';
import { ContactSection } from '../components/ContactSection';
import { Footer } from '../components/Footer';
import { SiteSettings, Product, FAQ, Testimonial, User, Lead } from '../types';
import { StorageService } from '../storage';

interface HomePageProps {
  settings: SiteSettings;
  products: Product[];
  faqs: FAQ[];
  testimonials: Testimonial[];
  currentUser: User | null;
  onNavigate: (path: string) => void;
  onLogout: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  settings,
  products,
  faqs,
  testimonials,
  currentUser,
  onNavigate,
  onLogout,
}) => {
  const [selectedProduct, setSelectedProduct] = useState('');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const handleRequestQuote = (productName: string) => {
    setSelectedProduct(productName);
    const formElement = document.getElementById('contact-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubmitLead = async (leadData: Omit<Lead, 'id' | 'createdAt' | 'status'>) => {
    // Artificial small delay for UX realism
    await new Promise((resolve) => setTimeout(resolve, 600));
    try {
      StorageService.addLead(leadData);
      showToast("Message sent successfully! We'll contact you soon.", 'success');
      setSelectedProduct('');
    } catch {
      showToast('Error sending message. Please try again.', 'error');
    }
  };

  const visibility = settings.sectionVisibility || {};

  return (
    <div className="min-h-screen font-sans bg-[#f5f2ed] text-gray-800 flex flex-col relative transition-colors duration-300">
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className={`fixed bottom-4 right-4 p-4 rounded-xl shadow-xl z-50 flex items-center gap-3 text-white text-sm font-medium ${
              toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'
            }`}
          >
            {toast.type === 'success' ? (
              <CheckCircle2 size={20} className="shrink-0" />
            ) : (
              <AlertCircle size={20} className="shrink-0" />
            )}
            <span>{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navbar */}
      <Navbar
        settings={settings}
        currentUser={currentUser}
        onNavigate={onNavigate}
        onLogout={onLogout}
      />

      {/* Hero Section */}
      {visibility.hero !== false && <Hero settings={settings} />}

      {/* Owner Spotlight */}
      {visibility.owner !== false && <FounderSection settings={settings} />}

      {/* Products Section */}
      {visibility.products !== false && (
        <ProductsSection
          products={products}
          onRequestQuote={handleRequestQuote}
        />
      )}

      {/* About & Why Choose Us Section */}
      {(visibility.about !== false || visibility.whyChoose !== false) && (
        <AboutSection
          settings={settings}
          showAbout={visibility.about !== false}
          showWhyChoose={visibility.whyChoose !== false}
        />
      )}

      {/* Client Testimonials Section */}
      {visibility.testimonials !== false && (
        <TestimonialsSection testimonials={testimonials} />
      )}

      {/* FAQ Accordion Section */}
      {visibility.faq !== false && <FaqSection faqs={faqs} />}

      {/* Contact & Inquiry Section */}
      {visibility.contact !== false && (
        <ContactSection
          settings={settings}
          products={products}
          selectedProduct={selectedProduct}
          onSubmitLead={handleSubmitLead}
        />
      )}

      {/* Footer */}
      <Footer settings={settings} />
    </div>
  );
};
