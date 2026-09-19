import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { Link } from 'react-router-dom';
import { ShieldCheck, Lock, ArrowRight, Store, KeyRound, AlertCircle, Eye, EyeOff } from 'lucide-react';

export default function AdminRoute({ children }) {
  const { isAdminAuthenticated, loginWithPin } = useAdmin();
  const [pin, setPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePinSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    
    const result = loginWithPin(pin.trim());
    if (!result.success) {
      setError(result.message || 'Incorrect Security PIN. Access denied.');
      setIsSubmitting(false);
    }
  };

  if (isAdminAuthenticated) {
    return children;
  }

  return (
    <div className="min-h-screen bg-[#0A1612] flex items-center justify-center px-4 py-12 text-stone-100">
      <div className="max-w-md w-full space-y-6 bg-[#12241E] border border-[#1D3B31] p-7 sm:p-9 rounded-3xl shadow-2xl relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="text-center relative z-10 space-y-3">
          <div className="relative inline-block">
            <img
              src="/hapsman-logo.jpg"
              alt="HAPSMAN Logo"
              className="w-18 h-18 object-contain rounded-full border-2 border-amber-400/40 mx-auto shadow-xl"
            />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#1B4D3E] border border-amber-400/60 flex items-center justify-center text-amber-300 shadow-sm">
              <Lock className="w-3 h-3" />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white font-serif">
              Hapsman Admin Console
            </h1>
            <p className="text-xs text-stone-300 mt-1.5 leading-relaxed">
              Restricted administrative system. Enter your Master Security PIN to access store orders and inventory.
            </p>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-red-950/70 border border-red-500/40 text-red-200 px-4 py-3 rounded-2xl text-xs flex items-center space-x-2.5 animate-in fade-in duration-150">
            <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        {/* PIN verification form */}
        <form onSubmit={handlePinSubmit} className="space-y-4 relative z-10">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-amber-200/80 mb-2">
              Master Security PIN
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                <KeyRound className="w-4 h-4 text-amber-400/80" />
              </div>
              <input
                type={showPin ? 'text' : 'password'}
                required
                autoFocus
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="Enter admin PIN"
                className="w-full bg-[#091410] border border-[#234539] rounded-xl py-3 pl-10 pr-11 text-white placeholder-stone-500 text-sm font-mono tracking-wider focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPin(!showPin)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-stone-400 hover:text-stone-200 transition-colors"
                title={showPin ? 'Hide PIN' : 'Show PIN'}
              >
                {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !pin}
            className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 active:scale-[0.99] text-stone-950 font-bold text-sm shadow-lg shadow-amber-500/20 transition-all disabled:opacity-50 cursor-pointer"
          >
            <span>Unlock Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Return to storefront */}
        <div className="pt-3 border-t border-[#1D3B31] flex justify-center text-xs relative z-10">
          <Link
            to="/"
            className="text-stone-400 hover:text-amber-200 flex items-center space-x-1.5 transition-colors"
          >
            <Store className="w-4 h-4" />
            <span>Return to Public Storefront</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
