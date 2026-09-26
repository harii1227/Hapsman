import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import ProductCard from '../components/products/ProductCard';
import QuickViewModal from '../components/products/QuickViewModal';
import Breadcrumb from '../components/common/Breadcrumb';
import { categories } from '../data/categories';
import { useAdmin } from '../context/AdminContext';
import { SlidersHorizontal, Search, X, Check, ChevronDown } from 'lucide-react';

function CustomSortDropdown({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const options = [
    { id: 'popularity', label: 'Popularity / Best Selling' },
    { id: 'price-low', label: 'Price: Low to High' },
    { id: 'price-high', label: 'Price: High to Low' },
    { id: 'rating', label: 'Top Rated' }
  ];

  const selectedOption = options.find(o => o.id === value) || options[0];

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between min-w-[170px] space-x-2 border border-stone-300 bg-white text-xs font-semibold rounded-xl px-3 py-2 text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#1B4D3E]/20 transition-all hover:bg-stone-50 cursor-pointer shadow-2xs"
      >
        <span>{selectedOption.label}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-stone-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-52 bg-white border border-stone-200 rounded-xl shadow-2xl z-50 py-1.5 animate-in fade-in zoom-in-95">
          {options.map((opt) => (
            <button
              key={opt.id}
              onClick={() => {
                onChange(opt.id);
                setIsOpen(false);
              }}
              className={`w-full text-left px-3 py-2.5 text-xs flex items-center justify-between transition-colors cursor-pointer ${
                opt.id === value ? 'bg-stone-100/80 font-bold text-[#1B4D3E]' : 'text-stone-700 font-medium hover:bg-stone-50'
              }`}
            >
              <span>{opt.label}</span>
              {opt.id === value && <Check className="w-3.5 h-3.5 text-[#1B4D3E]" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Products() {
  const { categorySlug } = useParams();
  const navigate = useNavigate();
  const { products } = useAdmin();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categorySlug || 'all');
  const [priceRange, setPriceRange] = useState(2000);
  const [sortBy, setSortBy] = useState('popularity');
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Sync route param with state
  React.useEffect(() => {
    if (categorySlug) {
      setSelectedCategory(categorySlug);
    } else {
      setSelectedCategory('all');
    }
  }, [categorySlug]);

  const handleCategoryChange = (slug) => {
    setSelectedCategory(slug);
    if (slug === 'all') {
      navigate('/products');
    } else {
      navigate(`/products/${slug}`);
    }
  };

  const currentCategoryObj = categories.find(c => c.slug === selectedCategory);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category match
      if (selectedCategory !== 'all' && p.categorySlug !== selectedCategory) {
        return false;
      }
      // Price match
      if (p.price > priceRange) {
        return false;
      }
      // Search match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesCategory = p.category.toLowerCase().includes(q);
        const matchesDesc = p.shortDescription.toLowerCase().includes(q);
        if (!matchesName && !matchesCategory && !matchesDesc) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      return 0; // popularity / default
    });
  }, [selectedCategory, priceRange, searchQuery, sortBy]);

  return (
    <div className="bg-[#FAF7F2] py-8 sm:py-12 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: 'Products', link: '/products' },
            ...(currentCategoryObj ? [{ label: currentCategoryObj.name }] : [])
          ]}
        />

        {/* Page Title */}
        <div className="my-6 space-y-2">
          <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-stone-900">
            {currentCategoryObj ? currentCategoryObj.name : 'All Hapsman Collections'}
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 max-w-2xl">
            {currentCategoryObj
              ? currentCategoryObj.description
              : 'Explore our complete range of slow-roasted makhana, wholesome millets, traditional sweets, grade-A dry fruits, and festive hampers.'}
          </p>
        </div>

        {/* Category Pills Bar */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-4 my-6 no-scrollbar">
          <button
            onClick={() => handleCategoryChange('all')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-colors shrink-0 shadow-2xs ${
              selectedCategory === 'all'
                ? 'bg-[#1B4D3E] text-amber-200'
                : 'bg-white text-stone-700 hover:bg-stone-200 border border-stone-300'
            }`}
          >
            All Products ({products.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.slug)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-colors shrink-0 shadow-2xs ${
                selectedCategory === cat.slug
                  ? 'bg-[#1B4D3E] text-amber-200'
                  : 'bg-white text-stone-700 hover:bg-stone-200 border border-stone-300'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Filter and Sort Toolbar */}
        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Search inside list */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search in these items..."
              className="w-full pl-9 pr-3 py-2 border border-stone-300 rounded-xl text-xs focus:outline-none focus:border-[#1B4D3E]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-stone-400 hover:text-stone-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Price Range Slider */}
          <div className="flex items-center space-x-3 w-full md:w-auto">
            <span className="text-xs font-semibold text-stone-600 shrink-0">Max Price: ₹{priceRange}</span>
            <input
              type="range"
              min="50"
              max="2000"
              step="50"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-32 accent-[#1B4D3E] cursor-pointer"
            />
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center space-x-2 w-full md:w-auto justify-end">
            <SlidersHorizontal className="w-4 h-4 text-stone-500" />
            <span className="text-xs font-semibold text-stone-600">Sort by:</span>
            <CustomSortDropdown value={sortBy} onChange={setSortBy} />
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-stone-200 space-y-3">
            <h3 className="font-serif text-xl font-bold text-stone-800">No products found</h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              Try adjusting your search keywords, price filter slider, or select another category.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
                setPriceRange(2000);
                navigate('/products');
              }}
              className="px-5 py-2.5 bg-[#1B4D3E] text-white rounded-xl text-xs font-bold hover:bg-[#0F2C23] transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={(p) => setQuickViewProduct(p)}
              />
            ))}
          </div>
        )}

        {/* QUICK VIEW / ENLARGED IMAGE MODAL */}
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />

      </div>
    </div>
  );
}
