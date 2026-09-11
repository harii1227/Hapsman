import React from 'react';
import { Link } from 'react-router-dom';
import { Gift, ArrowRight, Tag, Sparkles } from 'lucide-react';
import { promotionalBanners } from '../../data/offers';

export default function OfferBanner() {
  const banner = promotionalBanners[0];

  return (
    <section className="py-12 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#0F2C23] via-[#1B4D3E] to-[#0F2C23] text-white p-8 sm:p-12 border-2 border-amber-500/30 shadow-xl">
          
          {/* Subtle Background Pattern */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:16px_16px]" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4 text-center lg:text-left">
              <span className="inline-flex items-center space-x-1.5 bg-amber-400 text-stone-950 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{banner.tag}</span>
              </span>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-amber-200 tracking-tight">
                {banner.headline}
              </h2>

              <p className="text-sm sm:text-base text-stone-200 max-w-xl leading-relaxed">
                {banner.subheadline}
              </p>
            </div>

            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <Link
                to={banner.ctaLink}
                className="px-8 py-4 bg-amber-400 text-stone-950 font-extrabold text-sm sm:text-base rounded-2xl hover:bg-amber-300 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center space-x-2 group"
              >
                <Gift className="w-5 h-5" />
                <span>{banner.ctaText}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
