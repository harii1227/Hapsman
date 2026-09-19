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

  const activeOffers = getLiveCoupons().filter(o => o.isActive !== false);

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
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-10">
            {activeOffers.map((offer) => (
              <div
                key={offer.id || offer.code}
                className={`rounded-3xl p-6 text-white bg-gradient-to-br ${offer.bgGradient || 'from-[#1B4D3E] to-[#0F2A22]'} shadow-xl border border-amber-500/20 flex flex-col justify-between relative overflow-hidden group`}
              >
                {/* Background watermark icon */}
                <Tag className="w-32 h-32 text-white/5 absolute -right-6 -bottom-6 transform rotate-12" />

                <div>
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

                <div className="mt-8 pt-4 border-t border-white/10 space-y-3">
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
