import React, { useState } from 'react';
import { Trophy, Award, MapPin, Calendar, Store, Sparkles, ZoomIn, X, CheckCircle2 } from 'lucide-react';

export default function AchievementSection() {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  return (
    <section className="my-16 sm:my-24 relative">
      {/* Background Ambient Glow */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[500px] bg-gradient-to-tr from-amber-400/15 via-emerald-600/10 to-amber-200/20 rounded-full blur-3xl opacity-70 animate-pulse" />
      </div>

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3 px-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100/80 text-amber-900 border border-amber-300 shadow-xs">
          <Trophy className="w-3.5 h-3.5 text-amber-600 animate-bounce" />
          <span>Major Milestone & Recognition</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight leading-tight">
          Selected Among UP's <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-[#1B4D3E] via-emerald-700 to-amber-700 bg-clip-text text-transparent">
            Top Startups & Ideas
          </span>
        </h2>
        <p className="text-sm sm:text-base text-stone-600 max-w-2xl mx-auto leading-relaxed">
          Honoured to represent the rich agricultural heritage of Amethi and the future of healthy, authentic snacking at the prestigious UP International Trade Show 2026.
        </p>
      </div>

      {/* Main Achievement Showcase Card */}
      <div className="bg-gradient-to-br from-[#0F2C23] via-[#143B30] to-[#0A201A] rounded-3xl p-6 sm:p-10 lg:p-12 text-white shadow-2xl border border-amber-400/25 relative overflow-hidden">
        {/* Subtle decorative background watermarks */}
        <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-amber-400/5 blur-2xl pointer-events-none" />
        <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
          <Award className="w-72 h-72 text-amber-300" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">

          {/* Left Column: Details & Accolades (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">

            {/* Accolade Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs font-semibold">
              <Award className="w-4 h-4 text-amber-400 shrink-0" />
              <span>UP International Trade Show 2026 • 4th Edition</span>
            </div>

            <div className="space-y-3">
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-amber-100 leading-snug">
                Representing Amethi's Agricultural Innovation on the Global Stage
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                Hapsman has been chosen as one of the standout ventures in Uttar Pradesh. Our farm-to-table makhana, ancient millet puffs, and pure festive sweets stand at the confluence of health, taste, and tradition.
              </p>
            </div>

            {/* Quick Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="bg-white/5 backdrop-blur-md p-3.5 rounded-xl border border-white/10 hover:border-amber-400/40 transition-colors">
                <div className="flex items-center gap-2.5 text-amber-300 mb-1">
                  <Store className="w-4 h-4" />
                  <span className="text-[11px] font-bold uppercase tracking-wider">Exhibit Stall</span>
                </div>
                <p className="text-base font-extrabold text-white">Stall No. 9/05</p>
                <p className="text-xs text-amber-200/80 font-medium">Hall 05</p>
              </div>

              <div className="bg-white/5 backdrop-blur-md p-3.5 rounded-xl border border-white/10 hover:border-amber-400/40 transition-colors">
                <div className="flex items-center gap-2.5 text-amber-300 mb-1">
                  <Calendar className="w-4 h-4" />
                  <span className="text-[11px] font-bold uppercase tracking-wider">Event Dates</span>
                </div>
                <p className="text-base font-extrabold text-white">Sep 25 - 29</p>
                <p className="text-xs text-stone-300 font-medium">Year 2026</p>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-md p-3.5 rounded-xl border border-white/10 flex items-start gap-3">
              <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300 block">Venue</span>
                <p className="text-xs sm:text-sm font-semibold text-white">
                  India Expo Centre & Mart, Greater Noida
                </p>
              </div>
            </div>

            {/* Highlight Badges */}
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-md bg-emerald-950/60 text-emerald-200 border border-emerald-500/30">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                Govt. Recognized Innovation
              </span>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-md bg-emerald-950/60 text-emerald-200 border border-emerald-500/30">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                Farm-to-Pack Purity
              </span>
            </div>

            {/* Action button */}
            <div className="pt-2">
              <button
                onClick={() => setIsLightboxOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-400 text-stone-950 hover:bg-amber-300 font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-lg hover:shadow-amber-400/20 active:scale-95"
              >
                <ZoomIn className="w-4 h-4" />
                <span>View Full Announcement Banner</span>
              </button>
            </div>

          </div>

          {/* Right Column: Visual Poster with Interactive Presentation (7 Cols) */}
          <div className="lg:col-span-7 flex justify-center">
            <div className="relative group w-full max-w-2xl">

              {/* Outer Glowing Frame Effect */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-amber-400 via-emerald-400 to-amber-300 rounded-2xl blur-md opacity-35 group-hover:opacity-75 transition duration-700 group-hover:duration-200" />

              {/* Poster Card Container */}
              <div
                onClick={() => setIsLightboxOpen(true)}
                className="relative rounded-2xl overflow-hidden shadow-2xl bg-stone-950 cursor-pointer transform group-hover:-translate-y-1.5 transition-all duration-500 border border-amber-400/40"
              >
                <img
                  src="/images/ChatGPT Image Sep 25, 2026, 05_20_24 PM.png"
                  onError={(e) => {
                    e.currentTarget.src = '/images/trade-show-popup.png';
                  }}
                  alt="Hapsman selected among Uttar Pradesh Top Startups at UP International Trade Show 2026"
                  className="w-full h-auto object-cover transform group-hover:scale-102 transition-transform duration-700"
                />

                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-md text-stone-900 text-xs font-bold shadow-xl transform scale-90 group-hover:scale-100 transition-transform duration-300">
                    <ZoomIn className="w-4 h-4 text-emerald-800" />
                    Click to Enlarge Banner
                  </span>
                </div>

                {/* Floating Live Badge Top Left */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-900/85 backdrop-blur-md border border-amber-400/50 text-[11px] font-semibold text-amber-200 shadow-md">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                  <span>Stall No. 9/05 • Hall 05</span>
                </div>

                {/* Floating Event Date Tag Bottom Right */}
                <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-stone-900/85 backdrop-blur-md border border-white/20 text-[11px] font-semibold text-stone-200 shadow-md">
                  Greater Noida • Sep 25-29, 2026
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Lightbox Modal for Full View */}
      {isLightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setIsLightboxOpen(false)}
          className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200 cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full mx-auto"
          >
            {/* Close button */}
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute -top-3.5 -right-3.5 sm:-top-4 sm:-right-4 z-10 w-10 h-10 rounded-full bg-white text-stone-900 hover:text-black flex items-center justify-center shadow-xl border border-stone-200 transition-transform hover:scale-110 active:scale-95"
              aria-label="Close image preview"
            >
              <X className="w-5 h-5" />
            </button>

            <img
              src="/images/ChatGPT Image Sep 25, 2026, 05_20_24 PM.png"
              onError={(e) => {
                e.currentTarget.src = '/images/trade-show-popup.png';
              }}
              alt="Hapsman at UP International Trade Show 2026"
              className="w-full h-auto max-h-[85vh] object-contain rounded-xl shadow-2xl border border-amber-400/40"
            />
          </div>
        </div>
      )}
    </section>
  );
}
