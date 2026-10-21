import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Send } from 'lucide-react';
import { Product, SiteSettings, Lead } from '../types';

interface ContactSectionProps {
  settings: SiteSettings;
  products: Product[];
  selectedProduct?: string;
  onSubmitLead: (lead: Omit<Lead, 'id' | 'createdAt' | 'status'>) => Promise<void>;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  settings,
  products,
  selectedProduct = '',
  onSubmitLead,
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    productInterest: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (selectedProduct) {
      setFormData((prev) => ({
        ...prev,
        productInterest: selectedProduct,
      }));
    }
  }, [selectedProduct]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone || !formData.message) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmitLead(formData);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        productInterest: '',
        message: '',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact-form" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Column: Contact Details & Google Map */}
          <div>
            <h2 className="text-4xl font-serif font-bold text-primary mb-4">
              Get in Touch
            </h2>
            <div className="w-20 h-1 bg-secondary mb-6" />
            <p className="text-lg text-gray-600 opacity-90 mb-10 leading-relaxed">
              Ready to place an order or need a sample? Fill out the form and our team
              will get back to you within 24 hours.
            </p>

            <div className="space-y-6">
              {/* Address */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0 shadow-xs">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Address</h4>
                  <p className="text-gray-600 text-sm sm:text-base">
                    {settings.contactAddress}
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0 shadow-xs">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Phone</h4>
                  <a
                    href={`tel:${settings.contactPhone}`}
                    className="text-gray-600 hover:text-primary transition-colors text-sm sm:text-base"
                  >
                    {settings.contactPhone}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0 shadow-xs">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Email</h4>
                  <a
                    href={`mailto:${settings.contactEmail}`}
                    className="text-gray-600 hover:text-primary transition-colors text-sm sm:text-base"
                  >
                    {settings.contactEmail}
                  </a>
                </div>
              </div>
            </div>

            {/* Embedded Google Map */}
            {settings.locationMapUrl && (
              <div className="mt-8 rounded-2xl overflow-hidden h-64 border border-gray-200 shadow-sm">
                <iframe
                  src={settings.locationMapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Mashallah Broker Office Map"
                />
              </div>
            )}
          </div>

          {/* Right Column: Inquiry & Lead Form */}
          <div className="p-8 sm:p-10 rounded-3xl shadow-xl bg-white border border-gray-100">
            <h3 className="text-2xl font-serif font-bold text-gray-900 mb-6">
              Request a Rate or Sample
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Tariq Mehmood"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-gray-900"
                />
              </div>

              {/* Email & Phone grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    required
                    type="tel"
                    placeholder="+92 300 0000000"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-gray-900"
                  />
                </div>
              </div>

              {/* Product selection */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Product Interested In
                </label>
                <select
                  value={formData.productInterest}
                  onChange={(e) =>
                    setFormData({ ...formData, productInterest: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-gray-900 cursor-pointer"
                >
                  <option value="">Select a product...</option>
                  {products.map((p) => (
                    <option key={p.id} value={p.name}>
                      {p.name} ({p.origin} - {p.price})
                    </option>
                  ))}
                  <option value="Other">Other / General Inquiry</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Tell us about the quantity, destination port, or specific rice specifications you require..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none transition-all text-gray-900"
                />
              </div>

              {/* Submit button */}
              <button
                disabled={isSubmitting}
                type="submit"
                className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-4 rounded-xl transition-all shadow-md hover:shadow-lg disabled:opacity-70 flex justify-center items-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <span className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                ) : (
                  <>
                    <Send size={18} />
                    <span>Send Request</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
