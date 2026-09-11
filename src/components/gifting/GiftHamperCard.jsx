import React from 'react';
import { Link } from 'react-router-dom';
import { Gift, Check, ShoppingBag, ArrowRight, Sparkles, Eye } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function GiftHamperCard({ hamper, onQuickView }) {
  const { addItem } = useCart();
  const hamperImage = hamper.image || '/hapsman-logo.jpg';

  return (
    <div className="bg-white rounded-3xl border border-amber-500/20 shadow-xl overflow-hidden flex flex-col md:flex-row group hover:shadow-2xl transition-all duration-300">
      
      {/* Visual Box Side - Full Width Image Bleed */}
      <div className="md:w-1/2 relative min-h-[280px] sm:min-h-[340px] bg-[#0F2C23] flex items-center justify-center overflow-hidden">
        {/* Yellow Badge Top Left */}
        <div className="absolute top-4 left-4 bg-amber-400 text-stone-950 text-xs font-black uppercase tracking-wider px-3.5 py-1.5 rounded-xl shadow-md z-10 flex items-center space-x-1 border border-amber-300">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{hamper.badge || 'LUXURY GIFT BOX'}</span>
        </div>

        {/* Quick View Eye Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (onQuickView) onQuickView(hamper);
          }}
          aria-label="View enlarged hamper image"
          title="Click to view enlarged image"
          className="absolute bottom-4 left-4 z-20 w-10 h-10 bg-white/95 hover:bg-white text-[#1B4D3E] rounded-full shadow-lg backdrop-blur-xs transition-all duration-200 hover:scale-110 flex items-center justify-center border border-amber-400/40 cursor-pointer active:scale-95"
        >
          <Eye className="w-5 h-5 text-[#1B4D3E]" />
        </button>

        {/* Full-Bleed Uncropped Hamper Image */}
        <img
          src={hamperImage}
          alt={hamper.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 rounded-none cursor-pointer"
          onClick={(e) => {
            if (onQuickView) {
              e.preventDefault();
              onQuickView(hamper);
            }
          }}
        />
      </div>

      {/* Details Side */}
      <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between bg-gradient-to-br from-white via-[#FAF7F2] to-[#F4EFE6]">
        <div>
          <div className="flex items-center space-x-1.5 text-xs text-amber-800 font-bold uppercase tracking-widest mb-1.5">
            <Gift className="w-4 h-4 text-amber-600" />
            <span>Royal Festive Collection</span>
          </div>

          <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-stone-900 group-hover:text-[#1B4D3E] transition-colors leading-tight">
            {hamper.name}
          </h3>

          <p className="text-xs sm:text-sm text-stone-600 mt-2.5 leading-relaxed">
            {hamper.description}
          </p>

          {/* Included Items List */}
          <div className="mt-5 pt-4 border-t border-stone-200/80">
            <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wider mb-2.5">
              Hamper Contains:
            </h4>
            <div className="flex flex-wrap gap-2">
              {hamper.ingredients && hamper.ingredients.map((item, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center space-x-1.5 text-xs px-3 py-1.5 bg-emerald-50 text-[#1B4D3E] rounded-lg font-semibold border border-emerald-800/15 shadow-2xs"
                >
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{item}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Pricing & CTA */}
        <div className="mt-8 pt-5 border-t border-stone-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">Special Festive Price</div>
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-black text-[#1B4D3E]">₹{hamper.price}</span>
              {hamper.originalPrice && (
                <span className="text-xs text-stone-400 line-through">₹{hamper.originalPrice}</span>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <button
              onClick={() => addItem(hamper, 1)}
              className="flex-1 sm:flex-none px-5 py-3 bg-[#1B4D3E] text-amber-200 rounded-xl text-xs font-bold hover:bg-[#0F2C23] transition-colors shadow-md flex items-center justify-center space-x-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Cart</span>
            </button>

            <Link
              to="/contact"
              className="px-4 py-3 border border-stone-300 text-stone-800 hover:bg-stone-100 rounded-xl text-xs font-semibold transition-colors text-center"
            >
              Bulk Inquiry
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
