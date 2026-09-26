import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Heart, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0F2C23] text-stone-300 pt-8 pb-4 border-t-2 border-amber-500/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-x-2 gap-y-8 md:gap-6 pb-6 border-b border-emerald-800/40">
          
          {/* Column 1: Brand & Logo */}
          <div className="col-span-2 md:col-span-1 lg:col-span-2 space-y-2">
            <Link to="/" className="flex items-center space-x-2.5 group inline-block">
              <img
                src="/hapsman-logo.jpg"
                alt="HAPSMAN Official Logo"
                className="h-10 w-auto object-contain rounded-full border border-amber-400/30 bg-white p-0.5"
              />
              <span className="font-serif text-xl font-bold tracking-wider text-amber-200">
                HAPSMAN
              </span>
            </Link>
            
            <p className="text-sm text-stone-300/80 max-w-sm leading-relaxed">
              Premium natural food brand crafting wholesome roasted makhana, ancient millet snacks, traditional Indian sweets, grade-A dry fruits, and curated festive gift hampers.
            </p>

            <div className="pt-1 flex items-center space-x-2 text-xs text-amber-300/90 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>FSSAI Certified • 100% Natural • Made in India</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-serif text-base font-semibold text-amber-200 tracking-wider mb-2 border-b border-amber-500/20 pb-0.5 inline-block">
              Hapsman
            </h4>
            <ul className="space-y-1.5 text-sm">
              <li>
                <Link to="/about" className="hover:text-amber-300 transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-amber-300 transition-colors">Our Products</Link>
              </li>
              <li>
                <Link to="/products/gift-hampers" className="hover:text-amber-300 transition-colors">Gift Hampers</Link>
              </li>
              <li>
                <Link to="/offers" className="hover:text-amber-300 transition-colors">Offers & Discounts</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-amber-300 transition-colors">Contact & Enquiries</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Shop Categories */}
          <div>
            <h4 className="font-serif text-base font-semibold text-amber-200 tracking-wider mb-2 border-b border-amber-500/20 pb-0.5 inline-block">
              Shop Collections
            </h4>
            <ul className="space-y-1.5 text-sm">
              <li>
                <Link to="/products/makhana" className="hover:text-amber-300 transition-colors">Makhana Snacks</Link>
              </li>
              <li>
                <Link to="/products/millets" className="hover:text-amber-300 transition-colors">Millets & Puffs</Link>
              </li>
              <li>
                <Link to="/products/biscuits" className="hover:text-amber-300 transition-colors">Makhana Biscuits</Link>
              </li>
              <li>
                <Link to="/products/sweets" className="hover:text-amber-300 transition-colors">Traditional Sweets</Link>
              </li>
              <li>
                <Link to="/products/dry-fruits" className="hover:text-amber-300 transition-colors">Royal Dry Fruits</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Customer Support & Helpline */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="font-serif text-base font-semibold text-amber-200 tracking-wider mb-2 border-b border-amber-500/20 pb-0.5 inline-block">
              Customer Support
            </h4>
            <ul className="space-y-1.5 text-sm">
              <li>
                <Link to="/contact" className="hover:text-amber-300 transition-colors">Contact Us</Link>
              </li>
              <li>
                <Link to="/shipping-policy" className="hover:text-amber-300 transition-colors">Shipping Policy</Link>
              </li>
              <li>
                <Link to="/refund-policy" className="hover:text-amber-300 transition-colors">Refund & Return Policy</Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-amber-300 transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-amber-300 transition-colors">Terms & Conditions</Link>
              </li>
            </ul>

            {/* Contact Phone Numbers */}
            <div className="mt-3 pt-2 border-t border-emerald-800/40 space-y-1 text-xs text-amber-200 font-medium">
              <span className="text-stone-400 font-bold block uppercase tracking-wider text-[11px]">Helplines:</span>
              <div className="space-y-0.5 font-mono text-xs">
                <a href="tel:6388239986" className="block hover:text-amber-400 transition-colors">📞 +91 6388239986</a>
                <a href="tel:6393919546" className="block hover:text-amber-400 transition-colors">📞 +91 6393919546</a>
              </div>
            </div>
          </div>

        </div>

        {/* Middle Section: Manufacturing Credentials */}
        <div className="py-3 border-b border-emerald-800/40 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-stone-300">
          <div className="flex items-center space-x-1.5 text-xs">
            <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <div>
              <span className="font-semibold text-amber-200">Manufactured by: </span>
              <span>Naturagro Harvest Private Limited, Gauriganj, Amethi, UP, India.</span>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex items-center space-x-3 text-sm">
            <span className="text-stone-400 font-medium">Follow:</span>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="p-1.5 bg-emerald-900/60 rounded-full hover:text-amber-300 hover:bg-emerald-800 transition-colors">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" className="p-1.5 bg-emerald-900/60 rounded-full hover:text-amber-300 hover:bg-emerald-800 transition-colors">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.592 0 9 1.583 9 4.615V8z"/></svg>
            </a>
          </div>
        </div>

        {/* Bottom Section: Copyright & Development Credits */}
        <div className="pt-3 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 gap-2 border-t border-emerald-800/30">
          <p>© 2026 Hapsman. All rights reserved.</p>

          <p className="flex items-center space-x-1 text-stone-300 font-medium">
            <span>Powered by</span>
            <span className="text-amber-300 font-bold tracking-wide">
              ARH Consultancy Private Limited
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
