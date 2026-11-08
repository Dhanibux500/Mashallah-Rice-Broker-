import React, { useEffect } from 'react';
import { ArrowLeft, Scale, CheckCircle2, AlertTriangle, Briefcase } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { SiteSettings, User } from '../types';

interface TermsPageProps {
  settings: SiteSettings;
  currentUser: User | null;
  onNavigate: (path: string) => void;
  onLogout: () => void;
}

export const TermsPage: React.FC<TermsPageProps> = ({
  settings,
  currentUser,
  onNavigate,
  onLogout,
}) => {
  useEffect(() => {
    document.title = 'Terms of Brokerage Service – Mashallah Rice Broker';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Terms of Service for Mashallah Rice Broker (Abdul Sattar Bhayo, Mirpur Mathelo, Sindh). Understand our brokerage mediation, deal completion, and quality checking guidelines.'
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
            ✦ Commercial Guidelines
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight mb-4">
            Terms of Brokerage Service
          </h1>
          <p className="text-slate-500 text-sm mb-8">
            Last Updated: November 2026 · Mashallah Rice Broker (Mirpur Mathelo, Sindh, Pakistan)
          </p>

          <div className="space-y-8 text-slate-600 leading-relaxed text-base">
            <section>
              <h2 className="text-xl font-display font-bold text-slate-900 mb-3 flex items-center gap-2">
                <Briefcase size={20} className="text-emerald-700" />
                1. Brokerage Capacity (Intermediary Status)
              </h2>
              <p>
                Mashallah Rice Broker is strictly an independent grain brokerage service led by Abdul Sattar Bhayo. We are not rice manufacturers, millers, sellers, or direct exporters. Our sole legal and commercial function is to connect willing buyers and verified sellers, facilitate communications, assist in price discovery, and coordinate deal terms between both parties.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-display font-bold text-slate-900 mb-3 flex items-center gap-2">
                <Scale size={20} className="text-emerald-700" />
                2. Brokerage Commission
              </h2>
              <p>
                In accordance with long-standing Pakistani grain market customs, Mashallah Rice Broker earns a standard brokerage commission from both the buyer and the seller. The commission becomes payable only upon the successful completion and confirmation of a commercial trade. Neither party is charged for initial market inquiries or preliminary rate guidance.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-display font-bold text-slate-900 mb-3 flex items-center gap-2">
                <CheckCircle2 size={20} className="text-emerald-700" />
                3. Quality Checking & Physical Samples
              </h2>
              <p>
                While we assist buyers in inspecting physical grain samples, broken grain percentages, and moisture levels before loading, the ultimate commercial acceptance of grain specification is governed by the direct sales agreement between the buyer and the supplying mill. We encourage both parties to clearly record specifications, packaging types, and weighbridge procedures prior to dispatch.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-display font-bold text-slate-900 mb-3 flex items-center gap-2">
                <AlertTriangle size={20} className="text-emerald-700" />
                4. Payment & Delivery Settlement
              </h2>
              <p>
                Payment settlements, banking transfers, Letters of Credit, and physical freight transport agreements are executed directly between the buyer and seller. Mashallah Rice Broker provides logistical coordination, dispatch confirmation, and communication support to foster transparency, but does not hold client funds or provide financial underwriting.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-display font-bold text-slate-900 mb-3">
                5. Governing Law
              </h2>
              <p>
                Any agreements brokered through our firm are governed in accordance with the commercial trade customs and laws of Pakistan. For inquiries or contract mediation, reach out to Abdul Sattar Bhayo at our Mirpur Mathelo desk (03058102365).
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer settings={settings} onNavigate={onNavigate} />
    </div>
  );
};
