import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function CategoryCard({ category }) {
  return (
    <Link
      to={`/products/${category.slug}`}
      className="group relative rounded-2xl overflow-hidden shadow-md bg-stone-900 border border-stone-200/80 flex flex-col justify-between h-88 sm:h-96 w-full transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl select-none shrink-0"
    >
      {/* Background Image / Presentation */}
      <div className="absolute inset-0 overflow-hidden bg-stone-900">
        <img
          src={category.image || '/images/hero-banner.jpg'}
          alt={category.name}
          className="w-full h-full object-cover opacity-75 group-hover:opacity-90 group-hover:scale-110 transition-all duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F2C23] via-[#0F2C23]/70 via-50% to-black/20 group-hover:from-[#0F2C23]/95 transition-all duration-500" />
      </div>

      {/* Top Badge */}
      <div className="relative z-10 p-5 flex justify-between items-start">
        {category.badge && (
          <span className="bg-amber-400 text-stone-950 text-[10px] uppercase font-black tracking-wider px-3 py-1 rounded-full shadow-md backdrop-blur-xs">
            {category.badge}
          </span>
        )}
      </div>

      {/* Bottom Details */}
      <div className="relative z-10 p-6 text-white space-y-2.5">
        <div className="text-[11px] text-amber-300 font-bold tracking-wider uppercase flex items-center space-x-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>{category.tagline}</span>
        </div>

        <h3 className="font-serif text-2xl font-extrabold tracking-wide group-hover:text-amber-200 transition-colors">
          {category.name}
        </h3>

        <p className="text-xs text-stone-300 line-clamp-2 leading-relaxed">
          {category.description}
        </p>

        <div className="pt-2 flex items-center text-xs font-extrabold text-amber-300 group-hover:text-amber-200 transition-colors">
          <span>Shop Collection</span>
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1.5 transition-transform" />
        </div>
      </div>
    </Link>
  );
}
