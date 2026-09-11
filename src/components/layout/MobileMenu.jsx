import React from 'react';
import { Link } from 'react-router-dom';
import { X, Gift, Tag, Sparkles, ChevronRight, PhoneCall, ShoppingBag } from 'lucide-react';

export default function MobileMenu({ isOpen, onClose }) {
  if (!isOpen) return null;

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'All Products', path: '/products' },
    { name: 'Makhana Snacks', path: '/products/makhana' },
    { name: 'Millets', path: '/products/millets' },
    { name: 'Sweets', path: '/products/sweets' },
    { name: 'Dry Fruits', path: '/products/dry-fruits' },
    { name: 'Gift Hampers', path: '/products/gift-hampers' },
    { name: 'Offers & Deals', path: '/offers' },
    { name: 'Contact & Bulk Orders', path: '/contact' }
  ];

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-[#FAF7F2] shadow-2xl flex flex-col justify-between z-50">
        <div>
          {/* Header */}
          <div className="p-4 border-b border-stone-200 flex items-center justify-between bg-white">
            <Link to="/" onClick={onClose} className="flex items-center space-x-2">
              <img 
                src="/hapsman-logo.jpg" 
                alt="HAPSMAN Logo" 
                className="h-10 w-auto object-contain rounded-full border border-emerald-800/20"
              />
              <span className="font-serif text-lg font-bold tracking-wider text-[#1B4D3E]">
                HAPSMAN
              </span>
            </Link>
            <button 
              onClick={onClose}
              aria-label="Close menu"
              className="p-2 text-stone-500 hover:text-stone-900 rounded-full hover:bg-stone-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="py-4 px-3 space-y-1 overflow-y-auto max-h-[calc(100vh-200px)]">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={onClose}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-stone-700 hover:text-[#1B4D3E] hover:bg-emerald-50/60 transition-colors"
              >
                <span>{link.name}</span>
                <ChevronRight className="w-4 h-4 text-stone-400" />
              </Link>
            ))}
          </div>
        </div>

        {/* Footer info */}
        <div className="p-4 border-t border-stone-200 bg-white space-y-3">
          <Link
            to="/products/gift-hampers"
            onClick={onClose}
            className="flex items-center justify-center space-x-2 w-full py-2.5 px-4 bg-[#1B4D3E] text-amber-200 rounded-lg font-medium text-sm hover:bg-[#0F2C23] transition-colors"
          >
            <Gift className="w-4 h-4" />
            <span>Corporate Gifting</span>
          </Link>
          <div className="text-xs text-center text-stone-500 font-medium">
            Nature Agro Harvest Pvt. Ltd.
          </div>
        </div>
      </div>
    </div>
  );
}
