import React, { useState, useEffect } from 'react';
import { Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

const announcementMessages = [
  "🌿 Healthy Snacking. Naturally Delicious by HAPSMAN.",
  "📞 Support Helplines: +91 6388239986 | +91 6393919546",
  "✨ Premium Natural Snacks, Sweets & Dry Fruits",
  "🎁 Special Festive Offers & Customized Corporate Hampers",
  "🚚 Free Express Shipping across India on Orders Above ₹499"
];

export default function AnnouncementBar() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcementMessages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + announcementMessages.length) % announcementMessages.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % announcementMessages.length);
  };

  return (
    <div className="bg-[#0F2C23] text-amber-200 text-xs sm:text-sm py-2 px-4 border-b border-amber-500/20">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <button
          onClick={handlePrev}
          aria-label="Previous announcement"
          className="text-amber-200/70 hover:text-amber-200 transition-colors hidden sm:block p-1"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex-1 text-center flex items-center justify-center space-x-2 font-medium tracking-wide">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 hidden sm:inline" />
          <span className="transition-all duration-300 transform">
            {announcementMessages[currentIndex]}
          </span>
        </div>

        <button
          onClick={handleNext}
          aria-label="Next announcement"
          className="text-amber-200/70 hover:text-amber-200 transition-colors hidden sm:block p-1"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
