import React, { useEffect } from 'react';
import { ArrowLeft, ShieldCheck, Lock, Eye, FileText } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { SiteSettings, User } from '../types';

interface PrivacyPageProps {
  settings: SiteSettings;
  currentUser: User | null;
  onNavigate: (path: string) => void;
  onLogout: () => void;
}

export const PrivacyPage: React.FC<PrivacyPageProps> = ({
  settings,
  currentUser,
  onNavigate,
  onLogout,
}) => {
  useEffect(() => {
    document.title = 'Privacy Policy – Mashallah Rice Broker | Abdul Sattar Bhayo';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Privacy Policy for Mashallah Rice Broker (Abdul Sattar Bhayo, Mirpur Mathelo, Sindh). Learn how we protect client inquiry data, trade details, and sample requests.'
      );
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-[#fbfbfa] text-slate-800 flex flex-col font-sans">
      <Navbar
        settings={settings}
        currentUser={currentUser}
        onNavigate={onNavigate}
        onLogout={onLogout}
      />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <button
          onClick={() => onNavigate('/')}
          className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-800 hover:text-emerald-950 mb-8 cursor-pointer transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Back to Home</span>
        </button>

        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200/80 shadow-[0_2px_16px_rgba(0,0,0,0.04)]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide bg-emerald-50 text-emerald-800 border border-emerald-200/60 mb-4">
            ✦ Client Protection
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-slate-500 text-sm mb-8">
            Last Updated: November 2026 · Mashallah Rice Broker (Mirpur Mathelo, Sindh, Pakistan)
          </p>

          <div className="space-y-8 text-slate-600 leading-relaxed text-base">
            <section>
              <h2 className="text-xl font-display font-bold text-slate-900 mb-3 flex items-center gap-2">
                <ShieldCheck size={20} className="text-emerald-700" />
                1. Introduction & Brokerage Role
              </h2>
              <p>
                Mashallah Rice Broker, founded and managed by Abdul Sattar Bhayo, operates as an independent rice brokerage firm based in Mirpur Mathelo, Sindh, connecting rice millers, traders, buyers, and exporters across Pakistan. We are not sellers or inventory owners. We value the privacy of our commercial partners and take strict precautions to safeguard contact details, sample requests, and commercial deal parameters.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-display font-bold text-slate-900 mb-3 flex items-center gap-2">
                <FileText size={20} className="text-emerald-700" />
                2. Information We Collect
              </h2>
              <p className="mb-3">
                When you interact with our website or contact our brokerage desk via WhatsApp, phone, or the quote inquiry form, we collect:
              </p>
              <ul className="list-disc pl-6 space-y-1.5 text-sm sm:text-base">
                <li><strong>Contact details:</strong> Full name, business email, telephone/WhatsApp number.</li>
                <li><strong>Trade inquiries:</strong> Rice variety needed (e.g. Super Kernel Basmati, 1121 Kainat, Irri-6, Sella), quantity specifications, destination port/city, and packaging requirements.</li>
                <li><strong>Sample requests:</strong> Delivery addresses for sending verified physical grain samples.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-display font-bold text-slate-900 mb-3 flex items-center gap-2">
                <Lock size={20} className="text-emerald-700" />
                3. How We Use and Protect Your Data
              </h2>
              <p>
                Your inquiry information is strictly used to match buyers with verified rice mills, coordinate quality sample exchanges, negotiate market rates, and communicate deal status. We do not sell, rent, or distribute your business information to third-party marketing agencies. Deal details are shared only with the agreed transacting counterparty upon mutual consent to finalize contracts.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-display font-bold text-slate-900 mb-3 flex items-center gap-2">
                <Eye size={20} className="text-emerald-700" />
                4. Confidentiality of Deals
              </h2>
              <p>
                Commercial transaction terms and client identities are treated with the highest professional discretion. Abdul Sattar Bhayo personally oversees deal coordination to protect both millers and buyers from unauthorized market speculation or unsolicited disclosures.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-display font-bold text-slate-900 mb-3">
                5. Contacting Our Brokerage Desk
              </h2>
              <p>
                If you have questions regarding our privacy practices or wish to update or delete your contact records from our database, contact Abdul Sattar Bhayo directly at:
              </p>
              <div className="mt-3 p-4 bg-slate-50 rounded-2xl border border-slate-200 text-sm">
                <p><strong>Mashallah Rice Broker</strong></p>
                <p>Main Grain Market, Mirpur Mathelo, Sindh, Pakistan</p>
                <p>Phone / WhatsApp: 03058102365 | 0333 3643891</p>
                <p>Email: info@mashallahbroker.com</p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer settings={settings} onNavigate={onNavigate} />
    </div>
  );
};
