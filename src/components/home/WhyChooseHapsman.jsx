import React, { useRef } from 'react';
import { Wheat, ShieldCheck, Heart, Gift, Sparkles, Flame, ChevronRight, ChevronLeft } from 'lucide-react';

export default function WhyChooseHapsman() {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -280, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 280, behavior: 'smooth' });
    }
  };

  const points = [
    {
      icon: Wheat,
      title: 'Wholesome Ingredients',
      desc: '100% natural ancient millets, organic makhana, and unrefined sweeteners.'
    },
    {
      icon: ShieldCheck,
      title: 'Premium Quality',
      desc: 'Hand-picked grade A cashews, almonds, and lotus seeds sorted with precision.'
    },
    {
      icon: Flame,
      title: 'Authentic Indian Flavours',
      desc: 'Slow-roasted with traditional spices, pure cow ghee, and heritage recipes.'
    },
    {
      icon: Gift,
      title: 'Thoughtful Gifting',
      desc: 'Ornate festive hampers and corporate boxes designed to impress every recipient.'
    },
    {
      icon: Sparkles,
      title: 'Carefully Crafted',
      desc: 'Hygienically packaged in small batches to seal in fresh crunch and aroma.'
    },
    {
      icon: Heart,
      title: 'Made for Every Occasion',
      desc: 'From daily healthy snacking to weddings, Diwali, and corporate celebrations.'
    }
  ];

  return (
    <section className="py-16 sm:py-20 bg-white border-b border-stone-200/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-800/10">
            THE HAPSMAN DIFFERENCE
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-stone-900">
            Why Choose Hapsman?
          </h2>
          <p className="text-sm sm:text-base text-stone-600">
            Blending authentic Indian culinary traditions with modern clean-label nutrition.
          </p>
        </div>

        {/* 6 Cards Grid / Carousel */}
        <div className="relative group">
          
          <button 
            onClick={scrollLeft}
            className="md:hidden absolute left-0 top-1/2 -translate-y-1/2 z-10 -ml-3 bg-white shadow-[0_4px_12px_rgba(0,0,0,0.15)] border border-stone-200 p-2 rounded-full text-stone-700 hover:text-[#1B4D3E] active:scale-95 transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div 
            ref={scrollRef}
            className="flex overflow-x-auto md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 scroll-smooth snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] px-1 py-4"
          >
            {points.map((pt, idx) => {
              const Icon = pt.icon;
              return (
                <div
                  key={idx}
                  className="w-[85vw] max-w-[320px] shrink-0 md:w-auto md:shrink snap-center md:snap-align-none bg-[#FAF7F2] p-6 sm:p-7 rounded-2xl border border-stone-200/80 hover:border-[#1B4D3E]/40 hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="w-12 h-12 bg-[#1B4D3E] text-amber-200 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-xs">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-stone-900 group-hover:text-[#1B4D3E] transition-colors mb-2">
                    {pt.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {pt.desc}
                  </p>
                </div>
              );
            })}
          </div>

          <button 
            onClick={scrollRight}
            className="md:hidden absolute right-0 top-1/2 -translate-y-1/2 z-10 -mr-3 bg-white shadow-[0_4px_12px_rgba(0,0,0,0.15)] border border-stone-200 p-2 rounded-full text-stone-700 hover:text-[#1B4D3E] active:scale-95 transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          
        </div>

      </div>
    </section>
  );
}
