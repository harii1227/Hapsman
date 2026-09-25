import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Flame, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import HeroSection from '../components/home/HeroSection';
import CategoryCard from '../components/products/CategoryCard';
import AutoScrollCarousel from '../components/common/AutoScrollCarousel';
import ProductCard from '../components/products/ProductCard';
import WhyChooseHapsman from '../components/home/WhyChooseHapsman';
import GiftHamperCard from '../components/gifting/GiftHamperCard';
import OfferBanner from '../components/home/OfferBanner';
import TestimonialCard from '../components/testimonials/TestimonialCard';
import Newsletter from '../components/home/Newsletter';
import QuickViewModal from '../components/products/QuickViewModal';

import { categories } from '../data/categories';
import { testimonials } from '../data/testimonials';
import { useAdmin } from '../context/AdminContext';

export default function Home() {
  const { products } = useAdmin();
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const categoryCarouselRef = useRef(null);
  const testimonialCarouselRef = useRef(null);

  const scrollCategory = (direction) => {
    if (categoryCarouselRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      categoryCarouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const scrollTestimonial = (direction) => {
    if (testimonialCarouselRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      testimonialCarouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const bestSellers = products.filter(p => p.isBestSeller).slice(0, 4);
  const makhanaProducts = products.filter(p => p.categorySlug === 'makhana').slice(0, 4);
  const milletProducts = products.filter(p => p.categorySlug === 'millets').slice(0, 3);
  const sweetsProducts = products.filter(p => p.categorySlug === 'sweets').slice(0, 4);
  const dryFruitsProducts = products.filter(p => p.categorySlug === 'dry-fruits').slice(0, 4);
  const giftHampers = products.filter(p => p.categorySlug === 'gift-hampers');

  return (
    <div className="space-y-0">
      
      {/* 3. HERO SECTION */}
      <HeroSection />

      {/* 3.5 CONTINUOUS SCROLLING MARQUEE TICKER BANNER */}
      <div className="bg-[#1B4D3E] text-amber-200 py-3.5 border-y border-amber-400/30 overflow-hidden relative shadow-md">
        <div className="flex space-x-12 animate-marquee whitespace-nowrap items-center text-xs font-black uppercase tracking-widest">
          {[
            '🍃 100% Slow-Roasted Makhana',
            '⚡ Zero Palm Oil & Trans Fat',
            '🌾 Wholesome Ancient Millets',
            '✨ Royal Pure Cow Ghee Sweets',
            '🎁 Curated Luxury Gift Hampers',
            '🚚 Free Express Shipping Above ₹499',
            '🏆 Grade-A Jumbo Cashews & Badam',
            
            /* Repeated for infinite continuous scrolling loop */
            '🍃 100% Slow-Roasted Makhana',
            '⚡ Zero Palm Oil & Trans Fat',
            '🌾 Wholesome Ancient Millets',
            '✨ Royal Pure Cow Ghee Sweets',
            '🎁 Curated Luxury Gift Hampers',
            '🚚 Free Express Shipping Above ₹499',
            '🏆 Grade-A Jumbo Cashews & Badam',
          ].map((text, i) => (
            <span key={i} className="inline-flex items-center space-x-2 shrink-0 hover:text-white transition-colors">
              <span>{text}</span>
              <span className="text-amber-400/50 mx-4">•</span>
            </span>
          ))}
        </div>
      </div>

      {/* 4. FEATURED CATEGORIES SECTION - CONTINUOUS SCROLLING CAROUSEL */}
      <section className="py-16 sm:py-20 bg-white border-b border-stone-200/60 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#1B4D3E] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-800/10">
                OUR RANGE
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-stone-900 mt-2">
                Explore Our Collection
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-xl">
                Wholesome ingredients. Authentic flavours. Something for every occasion.
              </p>
            </div>

            <div className="flex items-center space-x-3 shrink-0">
              <Link
                to="/products"
                className="text-xs sm:text-sm font-bold text-[#1B4D3E] hover:text-[#0F2C23] flex items-center space-x-1.5 group bg-emerald-50 px-4 py-2.5 rounded-full border border-emerald-800/10 hover:bg-emerald-100/80 transition-colors"
              >
                <span>View All Categories</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* Continuous Infinite Scrolling Marquee Carousel Slider */}
        <div className="relative w-full overflow-hidden py-3">
          <div className="flex space-x-6 animate-marquee-reverse hover:[animation-play-state:paused] w-max px-4">
            {[...categories, ...categories, ...categories, ...categories].map((cat, idx) => (
              <div key={`${cat.id}-${idx}`} className="w-[280px] sm:w-[320px] lg:w-[350px] shrink-0">
                <CategoryCard category={cat} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. BEST SELLERS SECTION */}
      <section className="py-16 sm:py-20 bg-[#FAF7F2] border-b border-stone-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-800 bg-amber-100/80 px-3 py-1 rounded-full border border-amber-600/20">
                CUSTOMER FAVORITES
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-stone-900 mt-2">
                Best Sellers
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 mt-1">
                The most loved delicacies ordered daily across India.
              </p>
            </div>
            <Link
              to="/products"
              className="mt-4 md:mt-0 text-xs sm:text-sm font-bold text-[#1B4D3E] hover:text-[#0F2C23] flex items-center space-x-1 group"
            >
              <span>Explore All Products</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <AutoScrollCarousel className="sm:grid-cols-2 lg:grid-cols-4">
            {bestSellers.map((product) => (
              <div key={product.id} className="w-[85vw] max-w-[280px] shrink-0 sm:w-auto sm:shrink snap-center sm:snap-align-none">
                <ProductCard product={product} onQuickView={(p) => setQuickViewProduct(p)} />
              </div>
            ))}
          </AutoScrollCarousel>
        </div>
      </section>

      {/* 6. WHY HAPSMAN */}
      <WhyChooseHapsman />

      {/* 7. MAKHANA COLLECTION */}
      <section className="py-16 sm:py-20 bg-[#FAF7F2] border-b border-stone-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-800/10">
                GUILT-FREE MUNCHING
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-stone-900 mt-2">
                Slow-Roasted Makhana Collection
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 mt-1">
                Popped lotus seeds infused with authentic hand-blended seasonings.
              </p>
            </div>
            <Link
              to="/products/makhana"
              className="mt-4 md:mt-0 text-xs sm:text-sm font-bold text-[#1B4D3E] hover:text-[#0F2C23] flex items-center space-x-1 group"
            >
              <span>Shop All Makhana Flavors</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <AutoScrollCarousel className="sm:grid-cols-2 lg:grid-cols-4">
            {makhanaProducts.map((product) => (
              <div key={product.id} className="w-[85vw] max-w-[280px] shrink-0 sm:w-auto sm:shrink snap-center sm:snap-align-none">
                <ProductCard product={product} onQuickView={(p) => setQuickViewProduct(p)} />
              </div>
            ))}
          </AutoScrollCarousel>
        </div>
      </section>

      {/* 8. MILLET COLLECTION */}
      <section className="py-16 sm:py-20 bg-white border-b border-stone-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-600/20">
                ANCIENT GRAINS
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-stone-900 mt-2">
                Wholesome Millet Snacks
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 mt-1">
                Ragi, Jowar, and Makki puffs crafted for nutritious daily snacking.
              </p>
            </div>
            <Link
              to="/products/millets"
              className="mt-4 md:mt-0 text-xs sm:text-sm font-bold text-[#1B4D3E] hover:text-[#0F2C23] flex items-center space-x-1 group"
            >
              <span>Explore Millets</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            {milletProducts.map((product) => (
              <ProductCard key={product.id} product={product} onQuickView={(p) => setQuickViewProduct(p)} />
            ))}
          </div>
        </div>
      </section>

      {/* 9. SWEETS COLLECTION */}
      <section className="py-16 sm:py-20 bg-[#FAF7F2] border-b border-stone-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-800 bg-amber-100 px-3 py-1 rounded-full border border-amber-600/20">
                ROYAL HERITAGE
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-stone-900 mt-2">
                Traditional Indian Sweets
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 mt-1">
                Pure cow ghee mithai made for Diwali, weddings, and family celebrations.
              </p>
            </div>
            <Link
              to="/products/sweets"
              className="mt-4 md:mt-0 text-xs sm:text-sm font-bold text-[#1B4D3E] hover:text-[#0F2C23] flex items-center space-x-1 group"
            >
              <span>Shop All Sweets</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <AutoScrollCarousel className="sm:grid-cols-2 lg:grid-cols-4">
            {sweetsProducts.map((product) => (
              <div key={product.id} className="w-[85vw] max-w-[280px] shrink-0 sm:w-auto sm:shrink snap-center sm:snap-align-none">
                <ProductCard product={product} onQuickView={(p) => setQuickViewProduct(p)} />
              </div>
            ))}
          </AutoScrollCarousel>
        </div>
      </section>

      {/* 10. GIFT HAMPERS SECTION */}
      <section className="py-16 sm:py-20 bg-[#0F2C23] text-white border-b border-amber-500/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400 bg-amber-400/10 px-4 py-1.5 rounded-full border border-amber-400/30">
              ROYAL GIFTING EXPERIENCE
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-amber-200">
              Curated Gift Hampers
            </h2>
            <p className="text-xs sm:text-sm text-stone-300">
              Make every festival, corporate event, and family celebration unforgettable with royal Hapsman rigid gift boxes.
            </p>
          </div>

          {/* Luxury Hampers Festive Banner Showcase */}
          <div className="mb-14 rounded-3xl overflow-hidden bg-gradient-to-r from-amber-950 via-[#1B4D3E] to-[#0F2C23] border-2 border-amber-400/40 p-8 sm:p-12 shadow-2xl relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-6 space-y-4 text-center lg:text-left">
                <span className="inline-flex items-center space-x-1.5 bg-amber-400 text-stone-950 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>FESTIVE GIFTING COLLECTION 2026</span>
                </span>

                <h3 className="font-serif text-3xl sm:text-4xl font-extrabold text-amber-200 leading-tight">
                  Gift Royal Traditions by Hapsman
                </h3>

                <p className="text-xs sm:text-sm text-stone-200 leading-relaxed max-w-lg">
                  Handcrafted gold-embossed boxes filled with silver Kaju Katli, roasted Peri-Peri makhana, grade-A cashews, almonds, and organic millet puffs. Perfect for corporate & family gifting.
                </p>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
                  <Link
                    to="/products/gift-hampers"
                    className="px-6 py-3.5 bg-amber-400 text-stone-950 rounded-xl font-extrabold text-xs sm:text-sm hover:bg-amber-300 transition-colors shadow-lg flex items-center space-x-2"
                  >
                    <span>Shop All Hampers</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    to="/contact"
                    className="px-6 py-3.5 bg-white/10 text-amber-200 border border-amber-400/40 rounded-xl font-bold text-xs sm:text-sm hover:bg-white/20 transition-colors backdrop-blur-xs"
                  >
                    Custom Corporate Orders
                  </Link>
                </div>
              </div>

              {/* 3 Hamper Boxes Composite Showcase */}
              <div className="lg:col-span-6 grid grid-cols-3 gap-3">
                <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-amber-400/30 text-center hover:scale-105 transition-transform cursor-pointer" onClick={() => setQuickViewProduct(giftHampers[0] || products[0])}>
                  <img src="/images/999.png" alt="₹999 Hamper" className="w-full h-28 object-contain mb-2 drop-shadow-md" />
                  <div className="text-[11px] font-bold text-amber-300">Healthy Hamper</div>
                  <div className="text-xs font-black text-white">₹999</div>
                </div>

                <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-amber-400/40 text-center hover:scale-105 transition-transform shadow-lg relative cursor-pointer" onClick={() => setQuickViewProduct(giftHampers[1] || products[1])}>
                  <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-amber-400 text-stone-950 text-[9px] font-black uppercase px-2 py-0.5 rounded-full">POPULAR</span>
                  <img src="/images/1499.png" alt="₹1499 Hamper" className="w-full h-28 object-contain mb-2 drop-shadow-md" />
                  <div className="text-[11px] font-bold text-amber-300">Celebration</div>
                  <div className="text-xs font-black text-white">₹1,499</div>
                </div>

                <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-amber-400/30 text-center hover:scale-105 transition-transform cursor-pointer" onClick={() => setQuickViewProduct(giftHampers[2] || products[2])}>
                  <img src="/images/1899.png" alt="₹1899 Hamper" className="w-full h-28 object-contain mb-2 drop-shadow-md" />
                  <div className="text-[11px] font-bold text-amber-300">Dry Fruit Box</div>
                  <div className="text-xs font-black text-white">₹1,899</div>
                </div>
              </div>

            </div>
          </div>

          {/* Individual Hamper Cards List */}
          <div className="space-y-8">
            {giftHampers.map((hamper) => (
              <GiftHamperCard key={hamper.id} hamper={hamper} onQuickView={(p) => setQuickViewProduct(p)} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/contact"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-amber-400 text-stone-950 rounded-2xl font-bold text-sm hover:bg-amber-300 transition-colors shadow-lg"
            >
              <span>Enquire for Bulk Corporate Orders</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 11. PROMOTIONAL OFFER BANNER */}
      <OfferBanner />

      {/* 12. DRY FRUITS SECTION */}
      <section className="py-16 sm:py-20 bg-white border-b border-stone-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-800/10">
                GRADE-A SELECTION
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-stone-900 mt-2">
                Royal Dry Fruits
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 mt-1">
                Handpicked jumbo cashews, almonds, pistachios, dates & figs.
              </p>
            </div>
            <Link
              to="/products/dry-fruits"
              className="mt-4 md:mt-0 text-xs sm:text-sm font-bold text-[#1B4D3E] hover:text-[#0F2C23] flex items-center space-x-1 group"
            >
              <span>Shop All Dry Fruits</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <AutoScrollCarousel className="sm:grid-cols-2 lg:grid-cols-4">
            {dryFruitsProducts.map((product) => (
              <div key={product.id} className="w-[85vw] max-w-[280px] shrink-0 sm:w-auto sm:shrink snap-center sm:snap-align-none">
                <ProductCard product={product} onQuickView={(p) => setQuickViewProduct(p)} />
              </div>
            ))}
          </AutoScrollCarousel>
        </div>
      </section>

      {/* 13. TESTIMONIALS SECTION - SINGLE ROW CONTINUOUS CAROUSEL */}
      <section className="py-16 sm:py-20 bg-[#FAF7F2] border-b border-stone-200/60 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-[#1B4D3E] bg-emerald-100/80 px-4 py-1.5 rounded-full border border-emerald-800/20 shadow-xs">
                REAL REVIEWS FROM REAL SNACK LOVERS
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 mt-2">
                What Our Customers Say
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-lg">
                Trusted by 15,000+ households, corporate clients & food connoisseurs across India.
              </p>
            </div>

            <div className="flex items-center space-x-3 shrink-0">
              {/* Carousel Arrows */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => scrollTestimonial('left')}
                  className="p-2.5 rounded-full bg-white border border-stone-300/80 text-stone-700 hover:bg-[#1B4D3E] hover:text-white hover:border-[#1B4D3E] transition-all shadow-xs active:scale-95 cursor-pointer"
                  aria-label="Previous Testimonial"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => scrollTestimonial('right')}
                  className="p-2.5 rounded-full bg-white border border-stone-300/80 text-stone-700 hover:bg-[#1B4D3E] hover:text-white hover:border-[#1B4D3E] transition-all shadow-xs active:scale-95 cursor-pointer"
                  aria-label="Next Testimonial"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Trust Badge */}
              <div className="inline-flex items-center space-x-1.5 bg-white px-4 py-2 rounded-full border border-stone-200 shadow-xs text-xs font-bold text-stone-800">
                <span className="text-amber-500 font-extrabold">4.9 ★★★★★</span>
                <span className="text-stone-400">•</span>
                <span>12,500+ Ratings</span>
              </div>
            </div>
          </div>
        </div>

        {/* Single Row Movable Continuous Carousel Slider */}
        <div className="relative w-full overflow-hidden py-2">
          <div
            ref={testimonialCarouselRef}
            className="flex space-x-6 animate-marquee-slow hover:[animation-play-state:paused] w-max px-4 scroll-smooth"
          >
            {[...testimonials, ...testimonials, ...testimonials, ...testimonials].map((item, idx) => (
              <div key={`${item.id}-${idx}`} className="w-[300px] sm:w-[350px] lg:w-[380px] shrink-0">
                <TestimonialCard item={item} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 15. NEWSLETTER */}
      <Newsletter />

      {/* QUICK VIEW / ENLARGED IMAGE MODAL */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />

    </div>
  );
}
