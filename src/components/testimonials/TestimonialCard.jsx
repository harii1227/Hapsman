import React from 'react';
import { Star, CheckCircle2, Quote, ShoppingBag } from 'lucide-react';

export default function TestimonialCard({ item }) {
  const initials = item.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2);

  return (
    <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-md flex flex-col justify-between hover:shadow-2xl hover:border-amber-400/50 hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden group h-[280px] w-full select-none">
      {/* Watermark Quote Icon */}
      <Quote className="w-12 h-12 text-amber-500/10 absolute top-4 right-4 group-hover:text-amber-500/25 group-hover:scale-110 transition-all pointer-events-none" />

      <div className="space-y-3">
        {/* Header: Avatar, Name & Rating */}
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 rounded-full ${item.avatarBg || 'bg-[#1B4D3E]'} text-amber-200 font-extrabold text-xs flex items-center justify-center shadow-md shrink-0 border border-amber-400/30`}>
            {initials}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-1.5">
              <h5 className="font-serif font-bold text-stone-900 text-sm truncate">{item.name}</h5>
              {item.verified && (
                <span className="inline-flex items-center space-x-1 bg-emerald-50 text-emerald-800 text-[9px] font-bold px-2 py-0.5 rounded-full border border-emerald-800/15 shrink-0">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  <span>Verified</span>
                </span>
              )}
            </div>
            <p className="text-[11px] text-stone-500">{item.city} • {item.date || 'Verified Buyer'}</p>
          </div>
        </div>

        {/* Rating Stars */}
        <div className="flex items-center space-x-1 bg-amber-50 px-2.5 py-0.5 rounded-full w-fit border border-amber-400/20">
          {[...Array(item.rating || 5)].map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          ))}
          <span className="text-[11px] font-black text-amber-900 ml-1">5.0</span>
        </div>

        {/* Comment */}
        <p className="text-xs text-stone-700 leading-relaxed font-sans italic line-clamp-4">
          "{item.comment}"
        </p>
      </div>

      {/* Footer Purchased Item Pill */}
      {item.purchasedItem && (
        <div className="pt-3 border-t border-stone-100 flex items-center space-x-2 text-stone-500">
          <ShoppingBag className="w-3.5 h-3.5 text-[#1B4D3E] shrink-0" />
          <span className="text-[10px] font-medium text-stone-600 truncate bg-stone-50 px-2.5 py-1 rounded-lg border border-stone-200/60 w-full">
            Purchased: <strong className="text-stone-900 font-semibold">{item.purchasedItem}</strong>
          </span>
        </div>
      )}
    </div>
  );
}
