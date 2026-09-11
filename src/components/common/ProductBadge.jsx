import React from 'react';

export default function ProductBadge({ text, variant = 'default' }) {
  if (!text) return null;

  const variants = {
    default: 'bg-emerald-900 text-amber-200 border-emerald-700',
    bestseller: 'bg-amber-500 text-stone-950 font-bold border-amber-400',
    trending: 'bg-red-700 text-white font-semibold border-red-600',
    new: 'bg-teal-800 text-white border-teal-600',
    gold: 'bg-amber-900 text-amber-300 border-amber-600'
  };

  const selectedClass = variants[variant] || variants.default;

  return (
    <span
      className={`inline-block px-2.5 py-1 text-[10px] uppercase tracking-wider rounded-md border shadow-xs ${selectedClass}`}
    >
      {text}
    </span>
  );
}
