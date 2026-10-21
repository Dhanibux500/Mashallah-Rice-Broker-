import React from 'react';
import { SiteSettings } from '../types';

interface FooterProps {
  settings: SiteSettings;
}

export const Footer: React.FC<FooterProps> = ({ settings }) => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer className="bg-gray-950 text-gray-400 py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Logo and Brand */}
            <div className="flex items-center gap-3">
              {settings.logoUrl ? (
                <img
                  src={settings.logoUrl}
                  alt="Logo"
                  className="h-10 object-contain grayscale brightness-200"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-8 h-8 bg-secondary rounded flex items-center justify-center text-gray-950 font-bold font-serif">
                  M
                </div>
              )}
              <span className="font-serif font-bold text-xl text-white">
                Mashallah Broker
              </span>
            </div>

            {/* Social Icons using Font Awesome */}
            <div className="flex items-center gap-6 text-gray-400">
              {settings.socialLinks?.facebook && (
                <a
                  href={settings.socialLinks.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-secondary transition-colors"
                  aria-label="Facebook"
                >
                  <i className="fa-brands fa-facebook text-2xl" />
                </a>
              )}
              {settings.socialLinks?.instagram && (
                <a
                  href={settings.socialLinks.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-secondary transition-colors"
                  aria-label="Instagram"
                >
                  <i className="fa-brands fa-instagram text-2xl" />
                </a>
              )}
              {settings.socialLinks?.youtube && (
                <a
                  href={settings.socialLinks.youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-secondary transition-colors"
                  aria-label="YouTube"
                >
                  <i className="fa-brands fa-youtube text-2xl" />
                </a>
              )}
              {settings.socialLinks?.tiktok && (
                <a
                  href={settings.socialLinks.tiktok}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-secondary transition-colors"
                  aria-label="TikTok"
                >
                  <i className="fa-brands fa-tiktok text-2xl" />
                </a>
              )}
              {settings.socialLinks?.linkedin && (
                <a
                  href={settings.socialLinks.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-secondary transition-colors"
                  aria-label="LinkedIn"
                >
                  <i className="fa-brands fa-linkedin text-2xl" />
                </a>
              )}
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
            © {currentYear} Mashallah Broker. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Action Button */}
      {settings.socialLinks?.whatsapp && (
        <a
          href={settings.socialLinks.whatsapp}
          target="_blank"
          rel="noreferrer"
          className="fixed bottom-6 left-6 bg-green-500 text-white w-14 h-14 rounded-full shadow-2xl hover:bg-green-600 hover:scale-110 transition-all z-50 flex items-center justify-center cursor-pointer group"
          aria-label="Chat on WhatsApp"
          title="Chat on WhatsApp"
        >
          <i className="fa-brands fa-whatsapp text-3xl" />
          <span className="sr-only">Chat on WhatsApp</span>
        </a>
      )}
    </>
  );
};
