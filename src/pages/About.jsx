import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/common/Breadcrumb';
import { ShieldCheck, Heart, Leaf, Award, MapPin, ArrowRight } from 'lucide-react';

export default function About() {
  return (
    <div className="bg-[#FAF7F2] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <Breadcrumb items={[{ label: 'About Us' }]} />

        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto py-8 sm:py-12 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-800/10">
            OUR BRAND STORY
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-extrabold text-stone-900 leading-tight">
            Healthy Snacking Should Never Compromise On Taste.
          </h1>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
            Hapsman was born out of a simple commitment: bringing the richness of traditional Indian food, clean wholesome ingredients, and royal gifting aesthetics to modern homes.
          </p>
        </div>

        {/* Visual Banner */}
        <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-white my-10 bg-stone-900 relative">
          <img
            src="/images/hero-banner.jpg"
            alt="Hapsman Heritage & Food Craftsmanship"
            className="w-full h-[500px] sm:h-[650px] lg:h-[800px] object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-6 sm:p-10">
            <div className="text-white space-y-2">
              <span className="text-xs font-bold text-amber-300 uppercase tracking-widest">
                AUTHENTIC INDIAN HERITAGE
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold">
                Naturagro Harvest Private Limited
              </h2>
              <p className="text-xs sm:text-sm text-stone-300 max-w-xl">
                Manufactured with love and strict hygiene standards in Gauriganj, Amethi, Uttar Pradesh, India.
              </p>
            </div>
          </div>
        </div>

        {/* 4 Pillars Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-16">
          
          <div className="bg-white p-8 rounded-2xl border border-stone-200/90 shadow-sm space-y-3">
            <div className="w-10 h-10 bg-emerald-50 text-[#1B4D3E] rounded-xl flex items-center justify-center font-bold">
              01
            </div>
            <h3 className="font-serif text-2xl font-bold text-stone-900">Our Story</h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Founded with the vision to replace deep-fried, chemical-laden junk food with authentic Indian makhana, ancient millet puffs, and pure ghee sweets. We believe snacking should nourish both body and soul.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-stone-200/90 shadow-sm space-y-3">
            <div className="w-10 h-10 bg-emerald-50 text-[#1B4D3E] rounded-xl flex items-center justify-center font-bold">
              02
            </div>
            <h3 className="font-serif text-2xl font-bold text-stone-900">Our Philosophy</h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Food is celebration. We use zero palm oil, zero synthetic colorings, and zero harmful additives. Every seed is slow-roasted, every laddu is hand-rolled, and every dry fruit is hand-sorted.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-stone-200/90 shadow-sm space-y-3">
            <div className="w-10 h-10 bg-emerald-50 text-[#1B4D3E] rounded-xl flex items-center justify-center font-bold">
              03
            </div>
            <h3 className="font-serif text-2xl font-bold text-stone-900">Our Products</h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              From spicy Peri-Peri roasted makhana and light Ragi Munch puffs to royal Kaju Katli, Makhana Biscuits, and handpicked W240 cashews—our range covers every daily munching and festive gifting need.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-stone-200/90 shadow-sm space-y-3">
            <div className="w-10 h-10 bg-emerald-50 text-[#1B4D3E] rounded-xl flex items-center justify-center font-bold">
              04
            </div>
            <h3 className="font-serif text-2xl font-bold text-stone-900">Our Promise</h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              100% transparency in ingredients, grade-A quality standards, FSSAI certified processing, and royal customer experience from unboxing to every crisp bite.
            </p>
          </div>

        </div>

        {/* Manufacturing Badge Box */}
        <div className="bg-[#0F2C23] text-amber-200 p-8 sm:p-10 rounded-3xl border border-amber-500/30 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 my-12">
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
              <MapPin className="w-4 h-4" />
              <span>Manufacturing & Operations Headquarters</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Naturagro Harvest Private Limited
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 max-w-xl">
              Gauriganj, Amethi, Uttar Pradesh, India.
            </p>
          </div>

          <Link
            to="/products"
            className="px-6 py-3.5 bg-amber-400 text-stone-950 rounded-xl font-bold text-xs sm:text-sm hover:bg-amber-300 transition-colors shrink-0 flex items-center space-x-2"
          >
            <span>Explore Products</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}
