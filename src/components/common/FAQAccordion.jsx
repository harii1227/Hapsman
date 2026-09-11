import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FAQAccordion({ items = [] }) {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-3 max-w-3xl mx-auto">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={item.id || index}
            className="border border-stone-200 rounded-xl bg-white overflow-hidden shadow-xs transition-colors"
          >
            <button
              onClick={() => toggle(index)}
              className="w-full p-4 sm:p-5 text-left flex items-center justify-between font-serif font-bold text-stone-900 text-sm sm:text-base hover:text-[#1B4D3E] transition-colors"
            >
              <span>{item.question}</span>
              <ChevronDown
                className={`w-5 h-5 text-stone-400 transition-transform duration-200 shrink-0 ${
                  isOpen ? 'rotate-180 text-[#1B4D3E]' : ''
                }`}
              />
            </button>

            {isOpen && (
              <div className="px-4 sm:px-5 pb-5 pt-0 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100 mt-1">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
