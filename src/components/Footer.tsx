import React from 'react';
import { SiteSettings } from '../types';

interface FooterProps {
  settings: SiteSettings;
  onNavigate?: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ settings, onNavigate }) => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer className="bg-slate-950 text-slate-400 py-12 sm:py-16 border-t border-slate-900 pb-24 sm:pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-10 border-b border-slate-800/80 items-start">
            {/* Logo and Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                {settings.logoUrl ? (
                  <img
                    src={settings.logoUrl}
                    alt="Mashallah Rice Broker Logo"
                    className="h-10 object-contain grayscale brightness-200"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-9 h-9 bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-xl flex items-center justify-center text-white font-bold font-display shadow-xs ring-1 ring-emerald-500/20">
                    M
                  </div>
                )}
                <span className="font-display font-extrabold text-xl text-white tracking-tight">
                  Mashallah Rice Broker
                </span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                Independent rice brokerage founded by Abdul Sattar Bhayo. 15+ years of trusted experience connecting rice mills, wholesalers, and exporters across all Pakistan.
              </p>
              <p className="text-xs text-slate-500">
                Mirpur Mathelo, Sindh, Pakistan · Nationwide Brokerage
              </p>
            </div>

            {/* Quick Contact & Info */}
            <div>
              <h4 className="font-display font-bold text-white text-base mb-3">
                Brokerage Desk
              </h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <span className="text-slate-500">Founder:</span> Abdul Sattar Bhayo
                </li>
                <li>
                  <span className="text-slate-500">Phone:</span>{' '}
                  <a href="tel:03058102365" className="hover:text-amber-400 transition-colors">
                    03058102365
                  </a>{' '}
                  / {' '}
                  <a href="tel:03333643891" className="hover:text-amber-400 transition-colors">
                    0333 3643891
                  </a>
                </li>
                <li>
                  <span className="text-slate-500">WhatsApp:</span>{' '}
                  <a href="https://wa.me/923058102365" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors">
                    +92 305 8102365
                  </a>
                </li>
                <li>
                  <span className="text-slate-500">Location:</span> Mirpur Mathelo, Sindh
                </li>
              </ul>
            </div>

            {/* Social Icons & Legal */}
            <div>
              <h4 className="font-display font-bold text-white text-base mb-3">
                Connect & Legal
              </h4>
              <div className="flex items-center gap-4 text-slate-400 mb-6">
                {settings.socialLinks?.facebook && (
                  <a
                    href={settings.socialLinks.facebook}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-amber-400 transition-colors"
                    aria-label="Facebook"
                  >
                    <i className="fa-brands fa-facebook text-xl" />
                  </a>
                )}
                {settings.socialLinks?.instagram && (
                  <a
                    href={settings.socialLinks.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-amber-400 transition-colors"
                    aria-label="Instagram"
                  >
                    <i className="fa-brands fa-instagram text-xl" />
                  </a>
                )}
                {settings.socialLinks?.youtube && (
                  <a
                    href={settings.socialLinks.youtube}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-amber-400 transition-colors"
                    aria-label="YouTube"
                  >
                    <i className="fa-brands fa-youtube text-xl" />
                  </a>
                )}
                {settings.socialLinks?.tiktok && (
                  <a
                    href={settings.socialLinks.tiktok}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-amber-400 transition-colors"
                    aria-label="TikTok"
                  >
                    <i className="fa-brands fa-tiktok text-xl" />
                  </a>
                )}
                {settings.socialLinks?.linkedin && (
                  <a
                    href={settings.socialLinks.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-amber-400 transition-colors"
                    aria-label="LinkedIn"
                  >
                    <i className="fa-brands fa-linkedin text-xl" />
                  </a>
                )}
              </div>

              <div className="flex flex-wrap gap-4 text-xs text-slate-400">
                {onNavigate ? (
                  <>
                    <button
                      onClick={() => onNavigate('/privacy-policy')}
                      className="hover:text-white transition-colors underline cursor-pointer"
                    >
                      Privacy Policy
                    </button>
                    <button
                      onClick={() => onNavigate('/terms')}
                      className="hover:text-white transition-colors underline cursor-pointer"
                    >
                      Terms of Service
                    </button>
                  </>
                ) : (
                  <>
                    <a href="/privacy-policy" className="hover:text-white transition-colors underline">
                      Privacy Policy
                    </a>
                    <a href="/terms" className="hover:text-white transition-colors underline">
                      Terms of Service
                    </a>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
            <div>
              © {currentYear} Mashallah Rice Broker. All rights reserved.
            </div>
            <div>
              Mirpur Mathelo, Sindh, Pakistan · Connecting Buyers & Sellers Nationwide
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Action Buttons on Mobile: Sticky Call + WhatsApp */}
      <div className="fixed bottom-4 left-4 right-4 sm:hidden z-50 flex items-center gap-3">
        <a
          href="tel:03058102365"
          className="flex-1 bg-emerald-800 text-white font-bold py-3 px-4 rounded-xl shadow-2xl flex items-center justify-center gap-2 text-sm border border-emerald-600/30"
          aria-label="Call Abdul Sattar Bhayo"
        >
          <i className="fa-solid fa-phone" />
          <span>Call Broker</span>
        </a>
        <a
          href="https://wa.me/923058102365"
          target="_blank"
          rel="noreferrer"
          className="flex-1 bg-green-600 text-white font-bold py-3 px-4 rounded-xl shadow-2xl flex items-center justify-center gap-2 text-sm border border-green-500/30"
          aria-label="WhatsApp Abdul Sattar Bhayo"
        >
          <i className="fa-brands fa-whatsapp text-lg" />
          <span>WhatsApp</span>
        </a>
      </div>

      {/* Floating WhatsApp Action Button for Desktop */}
      <a
        href="https://wa.me/923058102365"
        target="_blank"
        rel="noreferrer"
        className="hidden sm:flex fixed bottom-6 left-6 bg-green-500 text-white w-14 h-14 rounded-full shadow-2xl hover:bg-green-600 hover:scale-110 transition-all z-50 items-center justify-center cursor-pointer group"
        aria-label="Chat with Abdul Sattar Bhayo on WhatsApp"
        title="Chat on WhatsApp (03058102365)"
      >
        <i className="fa-brands fa-whatsapp text-3xl" />
        <span className="sr-only">Chat on WhatsApp</span>
      </a>
    </>
  );
};
