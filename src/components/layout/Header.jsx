import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, Menu, User, Gift, Sparkles, ChevronDown } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useSearch } from '../../context/SearchContext';
import { useAuth } from '../../context/AuthContext';
import MobileMenu from './MobileMenu';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);

  const { getCartCount, setIsCartOpen } = useCart();
  const { openSearch } = useSearch();
  const { user } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const productCategories = [
    { name: 'All Products', path: '/products' },
    { name: 'Makhana Snacks', path: '/products/makhana' },
    { name: 'Millets', path: '/products/millets' },
    { name: 'Traditional Sweets', path: '/products/sweets' },
    { name: 'Makhana Biscuits', path: '/products/biscuits' },
    { name: 'Royal Dry Fruits', path: '/products/dry-fruits' },
    { name: 'Gift Hampers', path: '/products/gift-hampers' }
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${isScrolled
            ? 'glass-nav shadow-md py-2.5 border-b border-stone-200/60'
            : 'bg-[#FAF7F2] py-3.5 border-b border-stone-200/40'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Left: Brand Logo & Title */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              className="lg:hidden p-2 text-stone-700 hover:text-[#1B4D3E] focus:outline-none"
            >
              <Menu className="w-6 h-6" />
            </button>

            <Link to="/" className="flex items-center space-x-3 group">
              <img
                src="/hapsman-logo.jpg"
                alt="HAPSMAN Logo"
                className="h-11 sm:h-12 w-auto object-contain rounded-full shadow-sm border border-emerald-950/20 group-hover:scale-105 transition-transform duration-200"
              />
              <div className="flex flex-col">
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-wider text-[#1B4D3E] group-hover:text-[#0F2C23]">
                  HAPSMAN
                </span>
                <span className="text-[9px] uppercase tracking-widest text-stone-500 font-semibold hidden sm:inline-block">
                  Natural Foods & Sweets
                </span>
              </div>
            </Link>
          </div>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center space-x-7">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors ${isActive('/') ? 'text-[#1B4D3E] font-semibold border-b-2 border-[#1B4D3E] pb-0.5' : 'text-stone-700 hover:text-[#1B4D3E]'
                }`}
            >
              Home
            </Link>

            <Link
              to="/about"
              className={`text-sm font-medium transition-colors ${isActive('/about') ? 'text-[#1B4D3E] font-semibold border-b-2 border-[#1B4D3E] pb-0.5' : 'text-stone-700 hover:text-[#1B4D3E]'
                }`}
            >
              About
            </Link>

            {/* Products Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setIsProductDropdownOpen(true)}
              onMouseLeave={() => setIsProductDropdownOpen(false)}
            >
              <Link
                to="/products"
                className={`text-sm font-medium flex items-center space-x-1 py-1 transition-colors ${isActive('/products') ? 'text-[#1B4D3E] font-semibold' : 'text-stone-700 hover:text-[#1B4D3E]'
                  }`}
              >
                <span>Products</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70 group-hover:rotate-180 transition-transform duration-200" />
              </Link>

              {/* Mega Dropdown Menu */}
              {isProductDropdownOpen && (
                <div className="absolute top-full left-0 w-56 pt-2 z-50">
                  <div className="bg-white rounded-xl shadow-xl border border-stone-100 py-2 animate-fade-in">
                    {productCategories.map((cat) => (
                      <Link
                        key={cat.path}
                        to={cat.path}
                        className="block px-4 py-2 text-xs font-medium text-stone-700 hover:bg-emerald-50 hover:text-[#1B4D3E] transition-colors"
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/products/gift-hampers"
              className={`text-sm font-medium flex items-center space-x-1 transition-colors ${isActive('/products/gift-hampers') ? 'text-[#1B4D3E] font-semibold border-b-2 border-[#1B4D3E] pb-0.5' : 'text-stone-700 hover:text-[#1B4D3E]'
                }`}
            >
              <Gift className="w-3.5 h-3.5 text-amber-600" />
              <span>Gift Hampers</span>
            </Link>

            <Link
              to="/offers"
              className={`text-sm font-medium transition-colors ${isActive('/offers') ? 'text-[#1B4D3E] font-semibold border-b-2 border-[#1B4D3E] pb-0.5' : 'text-stone-700 hover:text-[#1B4D3E]'
                }`}
            >
              Offers
            </Link>

            <Link
              to="/contact"
              className={`text-sm font-medium transition-colors ${isActive('/contact') ? 'text-[#1B4D3E] font-semibold border-b-2 border-[#1B4D3E] pb-0.5' : 'text-stone-700 hover:text-[#1B4D3E]'
                }`}
            >
              Contact
            </Link>
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <button
              onClick={openSearch}
              aria-label="Search products"
              className="p-2 text-stone-700 hover:text-[#1B4D3E] hover:bg-stone-100 rounded-full transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>

            {user ? (
              <Link
                to="/profile"
                className="hidden sm:flex items-center space-x-2 px-3 py-1.5 text-sm font-medium text-stone-700 hover:text-[#1B4D3E] hover:bg-stone-100 rounded-full transition-colors"
              >
                <div className="w-6 h-6 rounded-full bg-[#1B4D3E] text-white flex items-center justify-center text-xs font-bold">
                  {user.email ? user.email.charAt(0).toUpperCase() : 'U'}
                </div>
                <span className="max-w-[100px] truncate">
                  {user.user_metadata?.full_name || user.email?.split('@')[0]}
                </span>
              </Link>
            ) : (
              <Link
                to="/profile"
                aria-label="Account details"
                className="p-2 text-stone-700 hover:text-[#1B4D3E] hover:bg-stone-100 rounded-full transition-colors hidden sm:block"
              >
                <User className="w-5 h-5" />
              </Link>
            )}

            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="View Shopping Cart"
              className="relative p-2.5 bg-[#1B4D3E] text-white rounded-full hover:bg-[#0F2C23] transition-colors shadow-sm flex items-center justify-center group"
            >
              <ShoppingBag className="w-4 h-4 text-amber-200" />
              {getCartCount() > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-amber-500 text-stone-950 font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-xs">
                  {getCartCount()}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Component */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </>
  );
}
