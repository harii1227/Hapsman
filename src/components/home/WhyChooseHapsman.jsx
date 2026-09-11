import React from 'react';
import { Wheat, ShieldCheck, Heart, Gift, Sparkles, Flame } from 'lucide-react';

export default function WhyChooseHapsman() {
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
    <section className="py-16 sm:py-20 bg-white border-b border-stone-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
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

        {/* 6 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {points.map((pt, idx) => {
            const Icon = pt.icon;
            return (
              <div
                key={idx}
                className="bg-[#FAF7F2] p-6 sm:p-7 rounded-2xl border border-stone-200/80 hover:border-[#1B4D3E]/40 hover:shadow-md transition-all duration-300 group"
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

      </div>
    </section>
  );
}
