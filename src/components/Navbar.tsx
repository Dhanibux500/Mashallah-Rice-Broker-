import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Menu, LayoutDashboard, LogOut } from 'lucide-react';
import { SiteSettings, User } from '../types';

interface NavbarProps {
  settings: SiteSettings;
  currentUser: User | null;
  onNavigate: (path: string) => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  settings,
  currentUser,
  onNavigate,
  onLogout,
}) => {
  const [showLogoModal, setShowLogoModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    if (window.location.pathname !== '/' && window.location.hash !== '') {
      onNavigate('/');
      setTimeout(() => {
        const el = document.getElementById(id);
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(id);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav className="sticky top-0 z-40 backdrop-blur-xl border-b bg-white/90 border-slate-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          {/* Logo & Brand Name */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowLogoModal(true)}
              className="flex items-center gap-3 text-left focus:outline-none group cursor-pointer"
              title="Click to view logo"
            >
              {settings.logoUrl ? (
                <img
                  src={settings.logoUrl}
                  alt="Logo"
                  className="h-10 sm:h-11 object-contain cursor-pointer transition-transform group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-700 to-emerald-900 rounded-xl flex items-center justify-center text-white font-bold font-display shadow-sm ring-1 ring-emerald-600/20 cursor-pointer transition-transform group-hover:scale-105 text-lg">
                  M
                </div>
              )}
              <span className="font-display font-extrabold text-xl sm:text-2xl text-slate-900 tracking-tight group-hover:text-emerald-700 transition-colors">
                Mashallah Broker
              </span>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-emerald-700 transition-colors cursor-pointer py-1"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="hover:text-emerald-700 transition-colors cursor-pointer py-1"
            >
              About Us
            </button>
            <button
              onClick={() => scrollToSection('products')}
              className="hover:text-emerald-700 transition-colors cursor-pointer py-1"
            >
              Products
            </button>
            <button
              onClick={() => scrollToSection('contact-form')}
              className="hover:text-emerald-700 transition-colors cursor-pointer py-1"
            >
              Contact
            </button>
          </div>

          {/* Auth / Admin Action Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {currentUser ? (
              <div className="flex items-center gap-3">
                {currentUser.role === 'admin' && (
                  <button
                    onClick={() => onNavigate('/admin')}
                    className="flex items-center gap-1.5 text-sm font-semibold text-emerald-800 hover:text-emerald-950 transition-colors cursor-pointer px-3.5 py-2 rounded-xl border border-emerald-700/20 bg-emerald-50 hover:bg-emerald-100/60 shadow-xs"
                  >
                    <LayoutDashboard size={16} />
                    <span>Dashboard</span>
                  </button>
                )}
                <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
                  {currentUser.fullName || currentUser.email}
                </span>
                <button
                  onClick={onLogout}
                  className="flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-red-600 transition-colors cursor-pointer px-2 py-1"
                  title="Logout"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => onNavigate('/auth')}
                  className="text-sm font-semibold text-slate-700 hover:text-emerald-700 transition-colors cursor-pointer px-3 py-2"
                >
                  Login
                </button>
                <button
                  onClick={() => onNavigate('/auth')}
                  className="text-sm font-bold bg-emerald-700 text-white px-5 py-2.5 rounded-xl hover:bg-emerald-800 shadow-[0_2px_8px_-1px_rgba(4,120,87,0.3)] hover:shadow-[0_4px_12px_-1px_rgba(4,120,87,0.4)] transition-all transform hover:-translate-y-0.5 cursor-pointer font-display"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>

          {/* Mobile hamburger menu button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-emerald-700 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t border-gray-200 bg-white px-4 pt-3 pb-5 space-y-3"
            >
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="block w-full text-left py-2 text-gray-700 font-medium hover:text-primary"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="block w-full text-left py-2 text-gray-700 font-medium hover:text-primary"
              >
                About Us
              </button>
              <button
                onClick={() => scrollToSection('products')}
                className="block w-full text-left py-2 text-gray-700 font-medium hover:text-primary"
              >
                Products
              </button>
              <button
                onClick={() => scrollToSection('contact-form')}
                className="block w-full text-left py-2 text-gray-700 font-medium hover:text-primary"
              >
                Contact
              </button>

              <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
                {currentUser ? (
                  <>
                    {currentUser.role === 'admin' && (
                      <button
                        onClick={() => {
                          setMobileMenuOpen(false);
                          onNavigate('/admin');
                        }}
                        className="w-full text-center py-2 bg-primary/10 text-primary font-medium rounded-lg"
                      >
                        Dashboard
                      </button>
                    )}
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onLogout();
                      }}
                      className="w-full text-center py-2 text-red-600 font-medium"
                    >
                      Logout ({currentUser.fullName || currentUser.email})
                    </button>
                  </>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onNavigate('/auth');
                      }}
                      className="flex-1 py-2 text-center border border-gray-300 rounded-lg text-gray-700 font-medium"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onNavigate('/auth');
                      }}
                      className="flex-1 py-2 text-center bg-primary text-white rounded-lg font-medium"
                    >
                      Sign Up
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* High-res Logo Lightbox Modal */}
      <AnimatePresence>
        {showLogoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm cursor-pointer"
            onClick={() => setShowLogoModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl w-full flex items-center justify-center pointer-events-none"
            >
              {settings.logoUrl ? (
                <img
                  src={settings.logoUrl}
                  alt="Logo Enlarged"
                  className="max-w-full max-h-[80vh] object-contain drop-shadow-2xl pointer-events-auto rounded-xl"
                  referrerPolicy="no-referrer"
                  onClick={(e) => e.stopPropagation()}
                />
              ) : (
                <div
                  className="w-64 h-64 bg-primary rounded-2xl flex items-center justify-center text-white font-bold font-serif text-9xl drop-shadow-2xl pointer-events-auto select-none"
                  onClick={(e) => e.stopPropagation()}
                >
                  M
                </div>
              )}
              <button
                onClick={() => setShowLogoModal(false)}
                className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors pointer-events-auto"
                aria-label="Close modal"
              >
                <X size={32} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
