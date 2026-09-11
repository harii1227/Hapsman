import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Gift, ArrowRight, ShieldCheck, Award, Leaf } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="w-full min-h-[55vh] lg:min-h-[600px] lg:max-h-[650px] bg-[#FAF7F2] flex flex-col lg:flex-row items-stretch border-b border-stone-200/60 overflow-hidden">
      
      {/* Left 50% Half: Text Content */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-12 lg:px-16 py-10 sm:py-12 lg:py-14 space-y-5 lg:space-y-6 z-10 text-left">
        
        {/* Top Tagline Badge */}
        <div>
          <div className="inline-flex items-center space-x-2 bg-[#1B4D3E]/10 text-[#1B4D3E] px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase border border-[#1B4D3E]/20 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>INDIA'S PUREST MILLET & MAKHANA HARVEST</span>
          </div>
        </div>

        {/* Main Headline */}
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-[52px] font-extrabold text-stone-900 tracking-tight leading-[1.12]">
          Naturally Delicious.{' '}
          <span className="text-[#1B4D3E] block sm:inline italic font-normal">
            Thoughtfully Made.
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-medium max-w-xl">
          Discover premium slow-roasted makhana, wholesome ancient millets, authentic traditional sweets, grade-A dry fruits, and beautifully curated luxury gifts from Hapsman.
        </p>

        {/* CTA Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center gap-3.5">
          <Link
            to="/products"
            className="w-full sm:w-auto px-8 py-3.5 sm:py-4 bg-[#1B4D3E] text-amber-200 rounded-2xl font-bold text-xs sm:text-sm hover:bg-[#0F2C23] transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center space-x-2 group"
          >
            <span>Shop Now</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            to="/products/gift-hampers"
            className="w-full sm:w-auto px-8 py-3.5 sm:py-4 bg-white text-stone-900 border-2 border-stone-300 hover:border-[#1B4D3E] hover:text-[#1B4D3E] rounded-2xl font-bold text-xs sm:text-sm transition-all duration-300 shadow-xs flex items-center justify-center space-x-2"
          >
            <Gift className="w-4 h-4 text-amber-600" />
            <span>Explore Gift Hampers</span>
          </Link>
        </div>

        {/* Continuous Scrolling Single Row Trust Badges & USPs */}
        <div className="pt-6 border-t border-stone-200/80 w-full overflow-hidden relative">
          <div className="flex space-x-4 animate-marquee whitespace-nowrap items-center py-1">
            {[
              { icon: <Leaf className="w-4 h-4 text-emerald-700 shrink-0" />, title: '100% Natural', subtitle: 'Zero Palm Oil' },
              { icon: <Award className="w-4 h-4 text-amber-600 shrink-0" />, title: 'Grade A Quality', subtitle: 'Handpicked Seeds' },
              { icon: <ShieldCheck className="w-4 h-4 text-emerald-800 shrink-0" />, title: 'FSSAI Certified', subtitle: 'Hygienic Packing' },
              { icon: <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />, title: 'Slow-Roasted Makhana', subtitle: 'Popped Lotus Seeds' },
              { icon: <Leaf className="w-4 h-4 text-emerald-700 shrink-0" />, title: 'Wholesome Millets', subtitle: 'Ancient Grains' },
              { icon: <Award className="w-4 h-4 text-amber-600 shrink-0" />, title: 'Pure Cow Ghee', subtitle: 'Traditional Mithai' },
              
              /* Duplicate items for seamless continuous scrolling loop */
              { icon: <Leaf className="w-4 h-4 text-emerald-700 shrink-0" />, title: '100% Natural', subtitle: 'Zero Palm Oil' },
              { icon: <Award className="w-4 h-4 text-amber-600 shrink-0" />, title: 'Grade A Quality', subtitle: 'Handpicked Seeds' },
              { icon: <ShieldCheck className="w-4 h-4 text-emerald-800 shrink-0" />, title: 'FSSAI Certified', subtitle: 'Hygienic Packing' },
              { icon: <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />, title: 'Slow-Roasted Makhana', subtitle: 'Popped Lotus Seeds' },
              { icon: <Leaf className="w-4 h-4 text-emerald-700 shrink-0" />, title: 'Wholesome Millets', subtitle: 'Ancient Grains' },
              { icon: <Award className="w-4 h-4 text-amber-600 shrink-0" />, title: 'Pure Cow Ghee', subtitle: 'Traditional Mithai' },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-center space-x-2.5 bg-white/90 backdrop-blur-xs px-3.5 py-2 rounded-xl border border-stone-200 shadow-2xs shrink-0"
              >
                {item.icon}
                <div className="text-left">
                  <div className="text-xs font-bold text-stone-900 leading-tight">{item.title}</div>
                  <div className="text-[10px] text-stone-500 font-medium leading-tight">{item.subtitle}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Right 50% Half: Balanced Height Image (Slightly fine-tuned position) */}
      <div className="w-full lg:w-1/2 relative min-h-[350px] sm:min-h-[420px] lg:min-h-[600px] lg:max-h-[650px] bg-[#FAF7F2] flex items-center justify-center overflow-hidden">
        <img
          src="/images/hero1.png"
          alt="HAPSMAN Full Product Range Showcase"
          className="w-full h-full object-cover object-[center_75%] rounded-none max-h-[650px]"
        />
      </div>

    </section>
  );
}
