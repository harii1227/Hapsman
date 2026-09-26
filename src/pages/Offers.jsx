import React, { useState } from 'react';
import { Tag, Copy, Check, Gift, Sparkles, ArrowRight } from 'lucide-react';
import Breadcrumb from '../components/common/Breadcrumb';
import { offers, getLiveCoupons } from '../data/offers';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

export default function Offers() {
  const [copiedCode, setCopiedCode] = useState(null);
  const { applyCoupon, setIsCartOpen } = useCart();
  const navigate = useNavigate();

  const activeOffers = getLiveCoupons().filter(o => o.isActive !== false && o.showOnMainSite !== false);

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleApplyDirectly = (offer) => {
    applyCoupon(offer);
    setIsCartOpen(true);
  };

  return (
    <div className="bg-[#FAF7F2] py-8 sm:py-12 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Breadcrumb */}
        <Breadcrumb items={[{ label: 'Offers & Promo Codes' }]} />

        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto py-8 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-800/10">
            SPECIAL SAVINGS & DEALS
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-extrabold text-stone-900">
            Hapsman Exclusive Offers
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            Apply these verified coupon codes at checkout to enjoy discounts on healthy snacks, traditional sweets, and festive hampers.
          </p>
        </div>

        {/* Coupon Grid */}
        {activeOffers.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 sm:p-12 text-center border border-stone-200 shadow-sm max-w-lg mx-auto my-12 space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-800 mx-auto flex items-center justify-center">
              <Gift className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-stone-900">
              No Active Promotional Codes
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              We frequently update our seasonal specials and festive discount codes. Please check back soon or explore our gourmet products!
            </p>
            <button
              onClick={() => navigate('/products')}
              className="mt-2 inline-flex items-center space-x-2 px-6 py-3 bg-[#1B4D3E] text-amber-200 text-xs sm:text-sm font-bold rounded-xl hover:bg-[#12352B] transition-colors shadow-md"
            >
              <span>Explore Gourmet Snacks</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : activeOffers.length === 1 ? (
          <div className="max-w-4xl mx-auto my-12">
            {activeOffers.map((offer) => (
              <div
                key={offer.id || offer.code}
                className={`rounded-3xl sm:rounded-[2rem] p-6 sm:p-10 text-white bg-gradient-to-r ${offer.bgGradient || 'from-[#0F2C23] via-[#1B4D3E] to-[#12352B]'} shadow-2xl border border-amber-500/20 flex flex-col md:flex-row items-center justify-between relative overflow-hidden group`}
              >
                {/* Background watermark icon */}
                <Tag className="w-48 h-48 sm:w-64 sm:h-64 text-white/5 absolute -right-6 -bottom-6 sm:-right-10 sm:-bottom-10 transform rotate-12 pointer-events-none" />

                <div className="flex-1 text-center md:text-left space-y-3 sm:space-y-4 mb-6 sm:mb-8 md:mb-0 relative z-10">
                  <div className="inline-flex items-center space-x-2 px-3 py-1 bg-white/10 rounded-full backdrop-blur-sm border border-white/20 mb-1 sm:mb-2">
                    <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-amber-300" />
                    <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-amber-100">
                      {offer.category || 'Exclusive Store Offer'}
                    </span>
                  </div>

                  <h2 className="text-4xl sm:text-5xl font-black text-amber-300 tracking-tight leading-none">
                    {offer.discount || `${offer.percentage || offer.discountValue}% OFF`}
                  </h2>

                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                    {offer.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-stone-200/90 leading-relaxed max-w-md mx-auto md:mx-0">
                    {offer.subtitle}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start space-y-2 sm:space-y-0 sm:space-x-2 pt-2 sm:pt-4 opacity-80">
                    <div className="flex items-center space-x-2">
                      <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white/10 flex items-center justify-center text-[10px] sm:text-xs font-bold">1</span>
                      <span className="text-[11px] sm:text-xs text-stone-200 font-medium tracking-wide">Copy code</span>
                    </div>
                    <ArrowRight className="hidden sm:block w-3 h-3 text-stone-400" />
                    <div className="flex items-center space-x-2">
                      <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white/10 flex items-center justify-center text-[10px] sm:text-xs font-bold">2</span>
                      <span className="text-[11px] sm:text-xs text-stone-200 font-medium tracking-wide">Apply at Checkout</span>
                    </div>
                  </div>
                </div>

                <div className="w-full md:w-80 shrink-0 bg-black/20 sm:bg-black/30 backdrop-blur-md p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-white/10 relative z-10 flex flex-col items-center">
                  <div className="text-[10px] text-stone-300 uppercase tracking-widest font-bold mb-3">Your Promo Code</div>
                  <div className="flex items-center justify-between bg-white/10 w-full p-4 rounded-xl border border-white/20 mb-4 group-hover:border-amber-400/50 transition-colors">
                    <span className="font-mono font-black text-xl tracking-widest text-amber-300">
                      {offer.code}
                    </span>

                    <button
                      onClick={() => handleCopy(offer.code)}
                      className="p-2 hover:bg-white/20 rounded-lg transition-all text-xs font-bold flex items-center space-x-1"
                    >
                      {copiedCode === offer.code ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 text-white" />
                        </>
                      )}
                    </button>
                  </div>

                  <button
                    onClick={() => handleApplyDirectly(offer)}
                    className="w-full py-4 bg-amber-400 text-[#0F2C23] font-black text-sm uppercase tracking-wider rounded-xl hover:bg-amber-300 transition-all shadow-lg hover:shadow-amber-400/30 flex items-center justify-center space-x-2"
                  >
                    <span>Apply Code to Cart</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-10 max-w-6xl mx-auto">
            {activeOffers.map((offer) => (
              <div
                key={offer.id || offer.code}
                className={`rounded-3xl p-6 text-white bg-gradient-to-br ${offer.bgGradient || 'from-[#1B4D3E] to-[#0F2A22]'} shadow-xl border border-amber-500/20 flex flex-col justify-between relative overflow-hidden group`}
              >
                {/* Background watermark icon */}
                <Tag className="w-32 h-32 text-white/5 absolute -right-6 -bottom-6 transform rotate-12 pointer-events-none" />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 bg-white/20 rounded-md backdrop-blur-xs">
                      {offer.category || 'Store Offer'}
                    </span>
                    <Sparkles className="w-4 h-4 text-amber-300" />
                  </div>

                  <div className="text-2xl font-black text-amber-300 mb-1">
                    {offer.discount || `${offer.percentage || offer.discountValue}% OFF`}
                  </div>

                  <h3 className="font-serif text-xl font-bold mb-2">
                    {offer.title}
                  </h3>

                  <p className="text-xs text-stone-200 leading-relaxed">
                    {offer.subtitle}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-white/10 space-y-3 relative z-10">
                  <div className="flex items-center justify-between bg-black/40 p-2.5 rounded-xl border border-white/10">
                    <span className="font-mono font-bold text-sm tracking-wider text-amber-300">
                      {offer.code}
                    </span>

                    <button
                      onClick={() => handleCopy(offer.code)}
                      className="p-1.5 hover:bg-white/10 rounded-md transition-colors text-xs font-semibold flex items-center space-x-1"
                    >
                      {copiedCode === offer.code ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  <button
                    onClick={() => handleApplyDirectly(offer)}
                    className="w-full py-2.5 bg-amber-400 text-stone-950 font-bold text-xs rounded-xl hover:bg-amber-300 transition-colors shadow-md text-center"
                  >
                    Apply Code to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Combo Savings Promo */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-stone-200 shadow-md my-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="font-serif text-2xl font-bold text-stone-900">
              Bulk & Corporate Savings
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 max-w-xl">
              Ordering more than 20 hampers for festive celebrations or employee wellness? Contact our corporate desk for customized bulk discounts.
            </p>
          </div>

          <button
            onClick={() => navigate('/contact')}
            className="px-6 py-3.5 bg-[#1B4D3E] text-amber-200 rounded-xl font-bold text-xs sm:text-sm hover:bg-[#0F2C23] transition-colors shrink-0 flex items-center space-x-2"
          >
            <span>Contact Corporate Desk</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
