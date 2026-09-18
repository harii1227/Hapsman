import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [step, setStep] = useState(1); // 1: Email, 2: Success Message
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const { signInWithOtp, signInWithOAuth } = useAuth();
  const location = useLocation();

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      await signInWithOAuth('google');
    } catch (err) {
      setError(err.message || 'Failed to login with Google.');
      setLoading(false);
    }
  };

  const handleSendMagicLink = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      // Supabase's signInWithOtp defaults to sending a Magic Link
      // We pass the current window location so it works for both local and production
      await signInWithOtp(email, { emailRedirectTo: window.location.origin });
      setStep(2);
    } catch (err) {
      setError(err.message || 'Failed to send login link. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-[#FAF7F2] px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl border border-stone-100 animate-fade-in">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-stone-900">
            {step === 1 ? 'Welcome Back' : 'Check Your Email'}
          </h2>
          <p className="mt-2 text-center text-sm text-stone-600">
            {step === 1 
              ? 'Enter your email to receive a secure login link.' 
              : `We sent a magic link to ${email}`}
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        {step === 1 ? (
          <div className="mt-8 space-y-6">
            
            {/* Google Login Button */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full flex items-center justify-center space-x-3 py-3 px-4 border border-stone-200 rounded-xl bg-white hover:bg-stone-50 text-stone-700 font-bold shadow-sm transition-all disabled:opacity-70"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span>Continue with Google</span>
            </button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-stone-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-3 bg-white text-stone-500 font-medium">Or log in with email</span>
              </div>
            </div>

            <form className="space-y-6" onSubmit={handleSendMagicLink}>
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-stone-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none rounded-xl relative block w-full px-3 py-3 pl-10 border border-stone-300 placeholder-stone-500 text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#1B4D3E] focus:border-transparent sm:text-sm transition-all"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !email}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-[#1B4D3E] hover:bg-[#143d31] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1B4D3E] transition-all disabled:opacity-70"
            >
              {loading ? (
                <Loader2 className="animate-spin h-5 w-5" />
              ) : (
                <>
                  Send Magic Link
                  <span className="absolute right-0 inset-y-0 flex items-center pr-3">
                    <ArrowRight className="h-5 w-5 text-[#2a6d59] group-hover:text-white transition-colors" />
                  </span>
                </>
              )}
            </button>
          </form>
          </div>
        ) : (
          <div className="mt-8 flex flex-col items-center justify-center space-y-6">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
              <CheckCircle2 className="h-8 w-8 text-emerald-600" />
            </div>
            <p className="text-center text-stone-600">
              Click the link inside the email we just sent you to instantly log in. You can close this tab if you open the link on your phone or another window!
            </p>
            
            <button 
              type="button" 
              onClick={() => setStep(1)}
              className="text-sm text-[#1B4D3E] hover:underline pt-4"
            >
              Use a different email
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
