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
    <section id="contact-form" className="py-20 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Column: Contact Details & Google Map */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-emerald-50 text-emerald-800 border border-emerald-200/60 mb-3">
              ✦ Let's Talk Trade
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-slate-900 tracking-tight mb-4">
              Get in Touch
            </h2>
            <div className="w-16 h-1 bg-amber-500 rounded-full mb-6" />
            <p className="text-base sm:text-lg text-slate-600 mb-10 leading-relaxed font-normal">
              Ready to place an order, negotiate market price, or need physical grain samples? Fill out the form and our brokerage desk will get back to you within 24 hours.
            </p>

            <div className="space-y-6">
              {/* Address */}
              <div className="flex items-center gap-4 p-4 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/10 flex items-center justify-center shrink-0 shadow-xs">
                  <MapPin size={22} />
                </div>
                <div>
                  <h4 className="font-display font-bold text-slate-900 text-sm sm:text-base">Address</h4>
                  <p className="text-slate-600 text-xs sm:text-sm">
                    {settings.contactAddress}
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-4 p-4 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/10 flex items-center justify-center shrink-0 shadow-xs">
                  <Phone size={22} />
                </div>
                <div>
                  <h4 className="font-display font-bold text-slate-900 text-sm sm:text-base">Phone</h4>
                  <a
                    href={`tel:${settings.contactPhone}`}
                    className="text-slate-600 hover:text-emerald-700 transition-colors text-xs sm:text-sm font-medium"
                  >
                    {settings.contactPhone}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-4 p-4 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/10 flex items-center justify-center shrink-0 shadow-xs">
                  <Mail size={22} />
                </div>
                <div>
                  <h4 className="font-display font-bold text-slate-900 text-sm sm:text-base">Email</h4>
                  <a
                    href={`mailto:${settings.contactEmail}`}
                    className="text-slate-600 hover:text-emerald-700 transition-colors text-xs sm:text-sm font-medium"
                  >
                    {settings.contactEmail}
                  </a>
                </div>
              </div>
            </div>

            {/* Embedded Google Map */}
            {settings.locationMapUrl && (
              <div className="mt-8 rounded-2xl overflow-hidden h-64 border border-slate-200 shadow-xs">
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
          <div className="p-8 sm:p-10 rounded-3xl shadow-[0_12px_40px_-10px_rgba(0,0,0,0.08)] bg-white border border-slate-200/80">
            <h3 className="text-2xl font-display font-bold text-slate-900 mb-2">
              Request a Rate or Sample
            </h3>
            <p className="text-slate-600 text-sm mb-6 font-normal">
              Direct connection with verified millers and certified grain brokers.
            </p>
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
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
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/70 focus:bg-white focus:ring-2 focus:ring-emerald-700 focus:border-transparent outline-none transition-all text-slate-900 text-sm"
                />
              </div>

              {/* Email & Phone grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
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
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/70 focus:bg-white focus:ring-2 focus:ring-emerald-700 focus:border-transparent outline-none transition-all text-slate-900 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
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
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/70 focus:bg-white focus:ring-2 focus:ring-emerald-700 focus:border-transparent outline-none transition-all text-slate-900 text-sm"
                  />
                </div>
              </div>

              {/* Product selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                  Product Interested In
                </label>
                <select
                  value={formData.productInterest}
                  onChange={(e) =>
                    setFormData({ ...formData, productInterest: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/70 focus:bg-white focus:ring-2 focus:ring-emerald-700 focus:border-transparent outline-none transition-all text-slate-900 text-sm cursor-pointer"
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
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
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
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/70 focus:bg-white focus:ring-2 focus:ring-emerald-700 focus:border-transparent outline-none resize-none transition-all text-slate-900 text-sm"
                />
              </div>

              {/* Submit button */}
              <button
                disabled={isSubmitting}
                type="submit"
                className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3.5 sm:py-4 rounded-xl transition-all shadow-[0_4px_16px_rgba(4,120,87,0.3)] hover:shadow-[0_8px_24px_rgba(4,120,87,0.4)] hover:-translate-y-0.5 disabled:opacity-70 flex justify-center items-center gap-2 cursor-pointer font-display text-sm sm:text-base"
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
