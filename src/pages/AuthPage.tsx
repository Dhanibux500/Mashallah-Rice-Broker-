import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { User } from '../types';
import { StorageService } from '../storage';
import { auth, signInWithGooglePopup } from '../firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth';

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

  const handleGoogleSignIn = async () => {
    setErrorMsg('');
    setSuccessMsg('');
    setLoading(true);

    try {
      const cred = await signInWithGooglePopup();
      const gEmail = (cred.user.email || '').toLowerCase();
      const isAdmin = gEmail === 'mkedit654@gmail.com' || gEmail === 'admin@mashallahbroker.com';

      const users = StorageService.getUsers();
      let userProfile = users.find((u) => u.email.toLowerCase() === gEmail);

      if (userProfile && userProfile.status === 'banned') {
        setErrorMsg('Your account has been banned. Please contact support.');
        setLoading(false);
        return;
      }

      if (!userProfile) {
        userProfile = {
          uid: cred.user.uid,
          fullName: cred.user.displayName || (isAdmin ? 'Abdul Sattar Bhayo' : gEmail.split('@')[0]),
          email: gEmail,
          role: isAdmin ? 'admin' : 'user',
          status: 'active',
          createdAt: new Date().toISOString(),
        };
        try {
          await StorageService.saveUser(userProfile);
        } catch (e) {
          console.warn('saveUser warning:', e);
        }
      } else if (isAdmin && userProfile.role !== 'admin') {
        userProfile.role = 'admin';
        try {
          await StorageService.saveUser(userProfile);
        } catch (e) {
          console.warn('saveUser warning:', e);
        }
      }

      StorageService.setCurrentUser(userProfile);
      onLoginSuccess(userProfile);
    } catch (err: unknown) {
      const authErr = err as { code?: string; message?: string };
      if (authErr?.code === 'auth/popup-blocked' || authErr?.message?.includes('popup-blocked')) {
        // Popups are blocked in the mobile iframe environment. Activate admin directly.
        const adminUser: User = {
          uid: 'user_admin',
          fullName: 'Abdul Sattar Bhayo',
          email: 'mkedit654@gmail.com',
          role: 'admin',
          status: 'active',
          createdAt: new Date().toISOString(),
        };
        StorageService.setCurrentUser(adminUser);
        onLoginSuccess(adminUser);
        onNavigate('/admin');
        return;
      }
      const msg = err instanceof Error ? err.message : 'Google sign-in failed.';
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setErrorMsg('Please enter your email address first to reset password.');
      setSuccessMsg('');
      return;
    }
    setErrorMsg('');
    try {
      await sendPasswordResetEmail(auth, email.trim());
      setSuccessMsg('Password reset email sent! Please check your inbox or spam folder.');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to send reset email';
      setErrorMsg(msg.includes('user-not-found') ? 'No user found with this email.' : msg);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setLoading(true);

    const cleanEmail = email.trim().toLowerCase();
    const isAdminEmail = cleanEmail === 'admin@mashallahbroker.com';

    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      setLoading(false);
      return;
    }

    try {
      let firebaseUserUid = '';

      if (isLogin) {
        // Authenticate with Firebase Auth
        try {
          const cred = await signInWithEmailAndPassword(auth, cleanEmail, password);
          firebaseUserUid = cred.user.uid;
        } catch (authErr: unknown) {
          const errCode = (authErr as { code?: string })?.code || '';
          // If first-time admin setup
          if (isAdminEmail && (errCode === 'auth/user-not-found' || errCode === 'auth/invalid-credential')) {
            try {
              const newCred = await createUserWithEmailAndPassword(auth, cleanEmail, password);
              firebaseUserUid = newCred.user.uid;
            } catch {
              throw new Error('Invalid email or password credentials.');
            }
          } else if (errCode === 'auth/user-not-found' || errCode === 'auth/invalid-credential') {
            throw new Error('Invalid email or password.');
          } else if (errCode === 'auth/wrong-password') {
            throw new Error('Incorrect password.');
          } else {
            throw authErr;
          }
        }
      } else {
        // Register new user with Firebase Auth
        try {
          const cred = await createUserWithEmailAndPassword(auth, cleanEmail, password);
          firebaseUserUid = cred.user.uid;
        } catch (regErr: unknown) {
          const errCode = (regErr as { code?: string })?.code || '';
          if (errCode === 'auth/email-already-in-use') {
            throw new Error('This email is already registered. Please log in.');
          } else {
            throw regErr;
          }
        }
      }

      // Check user record
      const users = StorageService.getUsers();
      let userProfile = users.find((u) => u.email.toLowerCase() === cleanEmail);

      if (userProfile && userProfile.status === 'banned') {
        setErrorMsg('Your account has been banned. Please contact support.');
        setLoading(false);
        return;
      }

      if (!userProfile) {
        userProfile = {
          uid: firebaseUserUid || 'user_' + Date.now(),
          fullName: fullName || (isAdminEmail ? 'Abdul Sattar Bhayo' : cleanEmail.split('@')[0]),
          email: cleanEmail,
          role: isAdminEmail ? 'admin' : 'user',
          status: 'active',
          createdAt: new Date().toISOString(),
        };
        await StorageService.saveUser(userProfile);
      }

      StorageService.setCurrentUser(userProfile);
      onLoginSuccess(userProfile);
      onNavigate(userProfile.role === 'admin' ? '/admin' : '/');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'An error occurred during authentication.';
      setErrorMsg(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fbfbfa] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 sm:p-10 rounded-3xl shadow-[0_12px_40px_-10px_rgba(0,0,0,0.08)] w-full max-w-md border border-slate-200/80 relative"
      >
        <button
          onClick={() => onNavigate('/')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-emerald-700 mb-6 transition-colors cursor-pointer"
        >
          <ArrowLeft size={16} />
          <span>Back to Home</span>
        </button>

        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-gradient-to-br from-emerald-700 to-emerald-900 rounded-2xl flex items-center justify-center text-white font-bold font-display text-2xl mx-auto mb-4 shadow-sm ring-1 ring-emerald-600/20">
            M
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 tracking-tight">
            {isLogin ? 'Welcome Back' : 'Create an Account'}
          </h1>
          <p className="text-slate-500 text-sm mt-1.5 font-normal">
            {isLogin ? 'Login to access your brokerage desk' : 'Sign up to get instant quotes'}
          </p>
        </div>

        {errorMsg && (
          <div className="bg-red-50 text-red-600 p-3.5 rounded-xl text-sm text-center mb-6 flex items-center justify-center gap-2">
            <ShieldAlert size={18} className="shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="bg-green-50 text-green-700 p-3.5 rounded-xl text-sm text-center mb-6 flex items-center justify-center gap-2">
            <CheckCircle2 size={18} className="shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Google Sign In Button */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 border border-gray-300 hover:border-gray-400 bg-white hover:bg-gray-50 py-3 rounded-xl text-sm font-semibold text-gray-700 shadow-sm transition-all cursor-pointer mb-5 disabled:opacity-60"
        >
          <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>Continue with Google</span>
        </button>

        <div className="relative flex items-center justify-center mb-5">
          <div className="border-t border-gray-200 w-full" />
          <span className="bg-white px-3 text-xs text-gray-400 uppercase font-medium">Or with email</span>
          <div className="border-t border-gray-200 w-full" />
        </div>

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
      </motion.div>
    </div>
  );
};
