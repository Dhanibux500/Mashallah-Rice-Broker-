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
      <nav className="sticky top-0 z-40 backdrop-blur-md border-b bg-white/80 border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo & Brand Name */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowLogoModal(true)}
              className="flex items-center gap-2 text-left focus:outline-none group"
              title="Click to view logo"
            >
              {settings.logoUrl ? (
                <img
                  src={settings.logoUrl}
                  alt="Logo"
                  className="h-10 object-contain cursor-pointer transition-transform group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center text-white font-bold font-serif shadow-sm cursor-pointer transition-transform group-hover:scale-105">
                  M
                </div>
              )}
              <span className="font-serif font-bold text-xl text-primary tracking-tight">
                Mashallah Broker
              </span>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700">
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-primary transition-colors cursor-pointer"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="hover:text-primary transition-colors cursor-pointer"
            >
              About Us
            </button>
            <button
              onClick={() => scrollToSection('products')}
              className="hover:text-primary transition-colors cursor-pointer"
            >
              Products
            </button>
            <button
              onClick={() => scrollToSection('contact-form')}
              className="hover:text-primary transition-colors cursor-pointer"
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
                    className="flex items-center gap-1.5 text-sm font-medium text-primary hover:text-secondary transition-colors cursor-pointer px-3 py-1.5 rounded-lg border border-primary/20 hover:bg-primary/5"
                  >
                    <LayoutDashboard size={16} />
                    <span>Dashboard</span>
                  </button>
                )}
                <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
                  {currentUser.fullName || currentUser.email}
                </span>
                <button
                  onClick={onLogout}
                  className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-red-600 transition-colors cursor-pointer"
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
                  className="text-sm font-medium text-gray-700 hover:text-primary transition-colors cursor-pointer"
                >
                  Login
                </button>
                <button
                  onClick={() => onNavigate('/auth')}
                  className="text-sm font-medium bg-primary text-white px-5 py-2 rounded-full hover:bg-primary-hover shadow-sm transition-all transform hover:-translate-y-0.5 cursor-pointer"
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
              className="p-2 text-gray-700 hover:text-primary focus:outline-none"
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
