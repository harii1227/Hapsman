import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export default function TradeShowPopup() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (location.pathname !== '/') return;
    
    // Show popup smoothly after slight delay on initial website load
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 250);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  // Handle ESC key to dismiss
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleDismiss();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleDismiss = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 200);
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="UP International Trade Show Announcement"
      onClick={handleDismiss}
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 transition-all duration-300 select-none cursor-pointer ${
        isClosing ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
      }`}
    >
      {/* Dark Blurred Backdrop - clicking anywhere closes popup */}
      <div 
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity duration-300" 
      />

      {/* Popup Content Wrapper */}
      <div 
        className="relative z-10 max-w-xl w-full mx-auto flex flex-col items-center animate-in fade-in zoom-in-95 duration-300"
      >
        {/* Floating Cross Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleDismiss();
          }}
          aria-label="Close popup"
          className="absolute -top-3.5 -right-3.5 sm:-top-4 sm:-right-4 z-20 flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white text-stone-800 hover:text-black shadow-2xl hover:scale-110 active:scale-95 transition-all duration-200 border border-stone-200 focus:outline-none group"
        >
          <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200" />
        </button>

        {/* Banner Image Container - Sharp corners, no rounded border */}
        <div className="relative w-full overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] bg-stone-900">
          <img
            src="/images/ChatGPT Image Sep 25, 2026, 05_20_24 PM.png"
            onError={(e) => {
              // Fallback to clean filename copy if needed
              e.currentTarget.src = '/images/trade-show-popup.png';
            }}
            alt="Hapsman selected among Uttar Pradesh Top Startups at UP International Trade Show 2026 - Hall 05, Stall 9/05"
            className="w-full h-auto max-h-[70vh] object-contain block"
          />
        </div>
      </div>
    </div>
  );
}
