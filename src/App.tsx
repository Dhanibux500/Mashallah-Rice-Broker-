import { useState, useEffect, useCallback } from 'react';
import { HomePage } from './pages/HomePage';
import { AdminPage } from './pages/AdminPage';
import { AuthPage } from './pages/AuthPage';
import { SiteSettings, Product, FAQ, Testimonial, Lead, User } from './types';
import { StorageService } from './storage';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });

  const [settings, setSettings] = useState<SiteSettings>(() => StorageService.getSettings());
  const [products, setProducts] = useState<Product[]>(() => StorageService.getProducts());
  const [faqs, setFaqs] = useState<FAQ[]>(() => StorageService.getFaqs());
  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => StorageService.getTestimonials());
  const [leads, setLeads] = useState<Lead[]>(() => StorageService.getLeads());
  const [users, setUsers] = useState<User[]>(() => StorageService.getUsers());
  const [currentUser, setCurrentUser] = useState<User | null>(() => StorageService.getCurrentUser());

  const loadData = useCallback(() => {
    const s = StorageService.getSettings();
    const p = StorageService.getProducts();
    const f = StorageService.getFaqs();
    const t = StorageService.getTestimonials();
    const l = StorageService.getLeads();
    const u = StorageService.getUsers();
    const cu = StorageService.getCurrentUser();

    setSettings(s);
    setProducts(p);
    setFaqs(f);
    setTestimonials(t);
    setLeads(l);
    setUsers(u);
    setCurrentUser(cu);

    if (s.theme) {
      document.documentElement.className = s.theme;
    } else {
      document.documentElement.className = '';
    }
  }, []);

  useEffect(() => {
    loadData();

    const handleStorageChange = () => {
      loadData();
    };

    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };

    window.addEventListener('mashallah_storage_change', handleStorageChange);
    window.addEventListener('mashallah_auth_change', handleStorageChange);
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('mashallah_storage_change', handleStorageChange);
      window.removeEventListener('mashallah_auth_change', handleStorageChange);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [loadData]);

  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    StorageService.setCurrentUser(null);
    setCurrentUser(null);
    navigate('/');
  };

  // Routing
  if (currentPath === '/auth') {
    return (
      <AuthPage
        onNavigate={navigate}
        onLoginSuccess={(user) => {
          setCurrentUser(user);
        }}
      />
    );
  }

  if (currentPath === '/admin') {
    // If not authenticated as admin, prompt or show warning / redirect to /auth
    if (!currentUser || currentUser.role !== 'admin') {
      return (
        <div className="min-h-screen bg-[#f5f2ed] flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full text-center border border-gray-100">
            <div className="w-14 h-14 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="font-bold text-xl">!</span>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Admin Access Required</h2>
            <p className="text-gray-600 text-sm mb-6">
              You must be logged in as an administrator (e.g.{' '}
              <span className="font-mono text-primary font-semibold">
                admin@mashallahBroker.com
              </span>
              ) to access the Mashallah Admin portal.
            </p>
            <div className="space-y-3">
              <button
                onClick={() => navigate('/auth')}
                className="w-full bg-primary hover:bg-primary-hover text-white font-medium py-3 rounded-xl transition-all shadow-sm cursor-pointer"
              >
                Go to Login / Sign In
              </button>
              <button
                onClick={() => navigate('/')}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 rounded-xl transition-all cursor-pointer"
              >
                Return to Website
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <AdminPage
        settings={settings}
        products={products}
        faqs={faqs}
        leads={leads}
        users={users}
        currentUser={currentUser}
        onNavigate={navigate}
        onLogout={handleLogout}
        onRefreshData={loadData}
      />
    );
  }

  // Default: Home Page
  return (
    <HomePage
      settings={settings}
      products={products}
      faqs={faqs}
      testimonials={testimonials}
      currentUser={currentUser}
      onNavigate={navigate}
      onLogout={handleLogout}
    />
  );
}
