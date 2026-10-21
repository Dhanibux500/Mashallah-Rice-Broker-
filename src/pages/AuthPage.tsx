import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, KeyRound, ShieldAlert } from 'lucide-react';
import { User } from '../types';
import { StorageService } from '../storage';

interface AuthPageProps {
  onNavigate: (path: string) => void;
  onLoginSuccess: (user: User) => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({
  onNavigate,
  onLoginSuccess,
}) => {
  const [isLogin, setIsLogin] = useState(true);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = () => {
    if (!email) {
      setErrorMsg('Please enter your email address first to reset password.');
      setSuccessMsg('');
      return;
    }
    setErrorMsg('');
    setSuccessMsg('Password reset email sent! Please check your inbox or spam folder.');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setLoading(true);

    setTimeout(() => {
      try {
        const users = StorageService.getUsers();

        if (isLogin) {
          const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());

          if (user) {
            if (user.status === 'banned') {
              setErrorMsg('Your account has been banned. Please contact support.');
              setLoading(false);
              return;
            }
            StorageService.setCurrentUser(user);
            onLoginSuccess(user);
            onNavigate(user.role === 'admin' ? '/admin' : '/');
          } else {
            // If not found in users list, check if it's admin or create as user
            const isAdmin = email.toLowerCase() === 'admin@mashallahbroker.com';
            const newUser: User = {
              uid: 'user_' + Date.now(),
              fullName: fullName || (isAdmin ? 'Abdul Sattar Bhayo' : email.split('@')[0]),
              email: email,
              role: isAdmin ? 'admin' : 'user',
              status: 'active',
              createdAt: new Date().toISOString(),
            };
            const allUsers = StorageService.getUsers();
            allUsers.push(newUser);
            localStorage.setItem('mashallah_users', JSON.stringify(allUsers));
            StorageService.setCurrentUser(newUser);
            onLoginSuccess(newUser);
            onNavigate(isAdmin ? '/admin' : '/');
          }
        } else {
          // Sign up
          const existing = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
          if (existing) {
            setErrorMsg('An account with this email already exists. Please log in.');
            setLoading(false);
            return;
          }

          const isAdmin = email.toLowerCase() === 'admin@mashallahbroker.com';
          const newUser: User = {
            uid: 'user_' + Date.now(),
            fullName: fullName || email.split('@')[0],
            email: email,
            role: isAdmin ? 'admin' : 'user',
            status: 'active',
            createdAt: new Date().toISOString(),
          };

          const allUsers = StorageService.getUsers();
          allUsers.push(newUser);
          localStorage.setItem('mashallah_users', JSON.stringify(allUsers));
          StorageService.setCurrentUser(newUser);
          onLoginSuccess(newUser);
          onNavigate(isAdmin ? '/admin' : '/');
        }
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'An error occurred during authentication.';
        setErrorMsg(message);
      } finally {
        setLoading(false);
      }
    }, 400);
  };

  const handleQuickAdminLogin = () => {
    setEmail('admin@mashallahBroker.com');
    setPassword('Admin123!');
    const users = StorageService.getUsers();
    let adminUser = users.find((u) => u.email.toLowerCase() === 'admin@mashallahbroker.com');
    if (!adminUser) {
      adminUser = {
        uid: 'user_admin',
        fullName: 'Abdul Sattar Bhayo',
        email: 'admin@mashallahBroker.com',
        role: 'admin',
        status: 'active',
        createdAt: new Date().toISOString(),
      };
      users.push(adminUser);
      localStorage.setItem('mashallah_users', JSON.stringify(users));
    }
    StorageService.setCurrentUser(adminUser);
    onLoginSuccess(adminUser);
    onNavigate('/admin');
  };

  return (
    <div className="min-h-screen bg-[#f5f2ed] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 sm:p-10 rounded-3xl shadow-xl w-full max-w-md border border-gray-100 relative"
      >
        <button
          onClick={() => onNavigate('/')}
          className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-primary mb-6 transition-colors cursor-pointer"
        >
          <ArrowLeft size={16} />
          <span>Back to Home</span>
        </button>

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-bold font-serif text-2xl mx-auto mb-4 shadow-sm">
            M
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            {isLogin ? 'Welcome Back' : 'Create an Account'}
          </h1>
          <p className="text-gray-500 text-sm mt-2">
            {isLogin ? 'Login to access your account' : 'Sign up to get started'}
          </p>
        </div>

        {errorMsg && (
          <div className="bg-red-50 text-red-600 p-3.5 rounded-xl text-sm text-center mb-6 flex items-center justify-center gap-2">
            <ShieldAlert size={18} className="shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="bg-green-50 text-green-700 p-3.5 rounded-xl text-sm text-center mb-6">
            {successMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                required={!isLogin}
                placeholder="e.g. Tariq Mehmood"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-white text-gray-900 text-sm"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-white text-gray-900 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-white text-gray-900 text-sm"
            />
            {isLogin && (
              <div className="flex justify-end mt-2">
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-xs text-primary hover:underline font-medium cursor-pointer"
                >
                  Forgot Password?
                </button>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg disabled:opacity-70 flex justify-center items-center gap-2 cursor-pointer text-sm"
          >
            {loading ? (
              <span className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
            ) : isLogin ? (
              'Sign In'
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setErrorMsg('');
              setSuccessMsg('');
            }}
            className="text-primary font-bold hover:underline cursor-pointer"
          >
            {isLogin ? 'Sign Up' : 'Log In'}
          </button>
        </div>

        {/* Quick Demo Admin Login */}
        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <p className="text-xs text-gray-400 mb-2">Reviewer & Admin Shortcut</p>
          <button
            type="button"
            onClick={handleQuickAdminLogin}
            className="w-full flex items-center justify-center gap-2 border border-secondary text-gray-800 bg-amber-50/50 hover:bg-amber-100/60 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
          >
            <KeyRound size={15} className="text-secondary" />
            <span>Quick Login as Admin (admin@mashallahBroker.com)</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
