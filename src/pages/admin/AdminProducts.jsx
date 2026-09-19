import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useAdmin } from '../../context/AdminContext';
import {
  Package,
  Search,
  CheckCircle2,
  AlertTriangle,
  Tag,
  ExternalLink,
  Filter,
  Plus,
  Minus,
  RotateCcw,
  ChevronDown,
  Check,
  Save,
  AlertCircle,
  X,
  SlidersHorizontal,
  ArrowUpDown
} from 'lucide-react';
import { Link } from 'react-router-dom';

function StockStatusDropdown({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const options = [
    {
      value: 'in_stock',
      label: 'In Stock',
      sublabel: 'Available in store (50 pcs)',
      dotColor: 'bg-emerald-500',
      badgeStyle: 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
    },
    {
      value: 'low_stock',
      label: 'Low Stock',
      sublabel: 'Limited (25 pcs)',
      dotColor: 'bg-amber-500',
      badgeStyle: 'bg-amber-50 text-amber-800 border-amber-300 hover:bg-amber-100'
    },
    {
      value: 'out_of_stock',
      label: 'Out of Stock',
      sublabel: 'Out of stock (0 pcs)',
      dotColor: 'bg-rose-500',
      badgeStyle: 'bg-rose-50 text-rose-800 border-rose-300 hover:bg-rose-100'
    }
  ];

  const currentOption = options.find(o => o.value === value) || options[0];

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`inline-flex items-center space-x-2 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer shadow-2xs ${currentOption.badgeStyle}`}
      >
        <span className={`w-2 h-2 rounded-full ${currentOption.dotColor}`} />
        <span>{currentOption.label}</span>
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-1.5 w-48 rounded-2xl bg-white p-1.5 shadow-2xl border border-stone-200 z-50 animate-in fade-in zoom-in-95">
          {options.map((opt) => {
            const isSelected = opt.value === value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-stone-100 font-bold text-stone-900'
                    : 'hover:bg-stone-50 text-stone-700 font-medium'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <span className={`w-2 h-2 rounded-full ${opt.dotColor}`} />
                  <div>
                    <span className="block">{opt.label}</span>
                    <span className="block text-[10px] text-stone-400 font-normal">{opt.sublabel}</span>
                  </div>
                </div>
                {isSelected && <Check className="w-3.5 h-3.5 text-stone-900" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

const PRICE_RANGE_OPTIONS = [
  { value: 'all', label: 'All Prices' },
  { value: 'under_100', label: 'Under ₹100' },
  { value: '100_300', label: '₹100 - ₹300' },
  { value: '300_500', label: '₹300 - ₹500' },
  { value: 'above_500', label: 'Above ₹500' }
];

const SORT_OPTIONS = [
  { value: 'default', label: 'Default' },
  { value: 'asc', label: 'Price: Low to High ↑' },
  { value: 'desc', label: 'Price: High to Low ↓' }
];

function CustomFilterDropdown({ value, onChange, options, label, align = 'left' }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const currentOption = options.find(o => o.value === value) || options[0];

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-stone-50 hover:bg-white text-stone-700 border border-stone-200 transition-all cursor-pointer shadow-2xs focus:outline-none focus:ring-2 focus:ring-[#1B4D3E]/20"
      >
        {label && <span className="text-stone-400 font-medium">{label}:</span>}
        <span className="text-stone-900 font-bold">{currentOption?.label}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-stone-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div
          className={`absolute ${align === 'right' ? 'right-0' : 'left-0'} mt-1.5 w-48 rounded-2xl bg-white p-1.5 shadow-2xl border border-stone-200 z-50 animate-in fade-in zoom-in-95`}
        >
          {options.map((opt) => {
            const isSelected = opt.value === value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-stone-100 font-black text-stone-900'
                    : 'hover:bg-stone-50 text-stone-700 font-medium'
                }`}
              >
                <span>{opt.label}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-emerald-700" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function AdminProducts() {
  const { products, saveProductChanges, resetAllStockTo } = useAdmin();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Local draft state for uncommitted changes: { [productId]: { price, stock, stockStatus } }
  // Absolutely no changes are saved to localStorage or live store until Save is clicked!
  const [drafts, setDrafts] = useState({});
  const [toastMessage, setToastMessage] = useState(null);
  const toastTimerRef = useRef(null);

  // Filter and Sorting States
  const [stockFilter, setStockFilter] = useState('all'); // 'all' | 'in_stock' | 'low_stock' | 'out_of_stock'
  const [priceRangeFilter, setPriceRangeFilter] = useState('all'); // 'all' | 'under_100' | '100_300' | '300_500' | 'above_500'
  const [priceSort, setPriceSort] = useState('default'); // 'default' | 'asc' | 'desc'

  const showToast = (msg) => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToastMessage(msg);
    toastTimerRef.current = setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Helper to read draft or saved product properties
  const getProductDraft = (prod) => {
    const defaultStock = prod.stock !== undefined ? prod.stock : 50;
    const defaultStatus = prod.stockStatus || (defaultStock === 0 ? 'out_of_stock' : defaultStock <= 25 ? 'low_stock' : 'in_stock');
    if (drafts[prod.id]) {
      return {
        price: drafts[prod.id].price !== undefined ? drafts[prod.id].price : prod.price,
        stock: drafts[prod.id].stock !== undefined ? drafts[prod.id].stock : defaultStock,
        stockStatus: drafts[prod.id].stockStatus || defaultStatus
      };
    }
    return {
      price: prod.price,
      stock: defaultStock,
      stockStatus: defaultStatus
    };
  };

  // Check if a specific product has uncommitted modifications
  const isProductModified = (prod) => {
    const draft = drafts[prod.id];
    if (!draft) return false;

    const origStock = prod.stock !== undefined ? prod.stock : 50;
    const origPrice = Number(prod.price);
    const origStatus = prod.stockStatus || (origStock === 0 ? 'out_of_stock' : origStock <= 25 ? 'low_stock' : 'in_stock');

    const draftPrice = draft.price === '' ? origPrice : Number(draft.price);
    const draftStock = draft.stock === '' ? origStock : Number(draft.stock);

    return (
      (draft.price !== undefined && draftPrice !== origPrice) ||
      (draft.stock !== undefined && draftStock !== Number(origStock)) ||
      (draft.stockStatus !== undefined && draft.stockStatus !== origStatus)
    );
  };

  // Handle draft price change (pure local state - NO auto-save)
  const handlePriceChange = (prod, val) => {
    setDrafts(prev => {
      const current = getProductDraft(prod);
      return {
        ...prev,
        [prod.id]: {
          ...current,
          price: val
        }
      };
    });
  };

  // Handle draft stock quantity change (pure local state - NO auto-save)
  const handleStockChange = (prod, val) => {
    const num = typeof val === 'number' ? Math.max(0, val) : val;
    setDrafts(prev => {
      const current = getProductDraft(prod);
      const parsed = parseInt(num, 10);
      const autoStatus = isNaN(parsed) ? current.stockStatus : (parsed === 0 ? 'out_of_stock' : parsed <= 25 ? 'low_stock' : 'in_stock');
      return {
        ...prev,
        [prod.id]: {
          ...current,
          stock: num,
          stockStatus: autoStatus
        }
      };
    });
  };

  // Handle draft stock status change:
  // When Low Stock is selected, stock becomes 25 pcs
  // When Out of Stock is selected, stock becomes 0 pcs
  // When In Stock is selected, stock becomes 50 pcs (if previously 0 or low)
  const handleStatusChange = (prod, status) => {
    setDrafts(prev => {
      const current = getProductDraft(prod);
      let newStock = current.stock;
      if (status === 'out_of_stock') {
        newStock = 0;
      } else if (status === 'low_stock') {
        newStock = 25;
      } else if (status === 'in_stock') {
        if (Number(newStock) === 0 || Number(newStock) <= 25) {
          newStock = 50;
        }
      }
      return {
        ...prev,
        [prod.id]: {
          ...current,
          stock: newStock,
          stockStatus: status
        }
      };
    });
  };

  // Save changes for a single product
  const handleSaveSingle = (prodId) => {
    const draft = drafts[prodId];
    if (!draft) return;

    const targetProd = products.find(p => p.id === prodId);
    saveProductChanges({ [prodId]: draft });

    setDrafts(prev => {
      const next = { ...prev };
      delete next[prodId];
      return next;
    });

    showToast(`Saved changes for "${targetProd?.name || 'Product'}"! Live store updated.`);
  };

  // Discard draft for a single product
  const handleDiscardSingle = (prodId) => {
    setDrafts(prev => {
      const next = { ...prev };
      delete next[prodId];
      return next;
    });
  };

  // Compute modified product IDs
  const modifiedProductIds = useMemo(() => {
    return products.filter(p => isProductModified(p)).map(p => p.id);
  }, [products, drafts]);

  const hasUnsavedChanges = modifiedProductIds.length > 0;

  // Save all uncommitted changes across all products
  const handleSaveAll = () => {
    if (modifiedProductIds.length === 0) return;

    const payload = {};
    modifiedProductIds.forEach(id => {
      if (drafts[id]) {
        payload[id] = drafts[id];
      }
    });

    saveProductChanges(payload);
    setDrafts({});
    showToast(`Successfully saved updates for ${modifiedProductIds.length} product(s)! Live store updated.`);
  };

  // Discard all uncommitted changes
  const handleDiscardAll = () => {
    setDrafts({});
    showToast('Discarded all unsaved changes.');
  };

  // Categories list
  const categories = useMemo(() => {
    const set = new Set(products.map(p => p.category).filter(Boolean));
    return ['All', ...Array.from(set)];
  }, [products]);

  // Product count for each category
  const categoryCounts = useMemo(() => {
    const counts = { All: products.length };
    products.forEach(p => {
      if (p.category) {
        counts[p.category] = (counts[p.category] || 0) + 1;
      }
    });
    return counts;
  }, [products]);

  // Filtered and Sorted products
  const filteredProducts = useMemo(() => {
    return products
      .filter(prod => {
        const draft = getProductDraft(prod);
        const currentPrice = Number(draft.price !== undefined ? draft.price : prod.price);
        const currentStatus = draft.stockStatus || prod.stockStatus || 'in_stock';

        // 1. Category Filter
        const matchesCategory = selectedCategory === 'All' || prod.category === selectedCategory;

        // 2. Search Filter
        const q = searchQuery.toLowerCase().trim();
        const matchesSearch =
          !q ||
          prod.name?.toLowerCase().includes(q) ||
          prod.category?.toLowerCase().includes(q) ||
          prod.id?.toString().includes(q);

        // 3. Stock Status Filter
        let matchesStock = true;
        if (stockFilter === 'in_stock') {
          matchesStock = currentStatus === 'in_stock';
        } else if (stockFilter === 'low_stock') {
          matchesStock = currentStatus === 'low_stock';
        } else if (stockFilter === 'out_of_stock') {
          matchesStock = currentStatus === 'out_of_stock';
        }

        // 4. Price Range Filter
        let matchesPrice = true;
        if (priceRangeFilter === 'under_100') {
          matchesPrice = currentPrice < 100;
        } else if (priceRangeFilter === '100_300') {
          matchesPrice = currentPrice >= 100 && currentPrice <= 300;
        } else if (priceRangeFilter === '300_500') {
          matchesPrice = currentPrice > 300 && currentPrice <= 500;
        } else if (priceRangeFilter === 'above_500') {
          matchesPrice = currentPrice > 500;
        }

        return matchesCategory && matchesSearch && matchesStock && matchesPrice;
      })
      .sort((a, b) => {
        if (priceSort === 'asc') {
          const priceA = Number(getProductDraft(a).price);
          const priceB = Number(getProductDraft(b).price);
          return priceA - priceB;
        }
        if (priceSort === 'desc') {
          const priceA = Number(getProductDraft(a).price);
          const priceB = Number(getProductDraft(b).price);
          return priceB - priceA;
        }
        return 0;
      });
  }, [products, selectedCategory, searchQuery, stockFilter, priceRangeFilter, priceSort, drafts]);

  const hasActiveFilters =
    selectedCategory !== 'All' ||
    searchQuery.trim() !== '' ||
    stockFilter !== 'all' ||
    priceRangeFilter !== 'all' ||
    priceSort !== 'default';

  const clearAllFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setStockFilter('all');
    setPriceRangeFilter('all');
    setPriceSort('default');
  };

  // Count summaries
  const inStockCount = products.filter(p => p.stockStatus === 'in_stock').length;
  const lowStockCount = products.filter(p => p.stockStatus === 'low_stock').length;
  const outOfStockCount = products.filter(p => p.stockStatus === 'out_of_stock').length;
  const totalInventoryPcs = products.reduce((sum, p) => sum + (Number(p.stock || p.stockQuantity) || 0), 0);

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 animate-in slide-in-from-top-4 duration-200">
          <div className="bg-stone-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-stone-700 flex items-center space-x-2.5 text-xs font-semibold">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Header and Stock Metric Cards */}
      <div className="bg-white p-6 rounded-3xl border border-stone-200/80 shadow-xs space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-stone-900">Products & Inventory Control</h1>
            <p className="text-xs text-stone-500 mt-1">
              Control live store inventory levels (default 50 pcs per product), mark items out of stock, and update pricing.
            </p>
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-stone-50 border border-stone-200 rounded-xl py-2 pl-10 pr-4 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#1B4D3E] focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Quick Inventory Stock Counters - Clickable to filter */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2 border-t border-stone-100">
          <button
            type="button"
            onClick={() => setStockFilter('all')}
            className={`p-4 rounded-2xl text-left transition-all cursor-pointer border ${
              stockFilter === 'all'
                ? 'bg-stone-100 border-stone-400 ring-2 ring-stone-400/30 shadow-xs'
                : 'bg-stone-50 hover:bg-stone-100/80 border-stone-200/80'
            }`}
          >
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block">
              Total Units In Stock
            </span>
            <span className="text-2xl font-black text-stone-900 mt-1 block">
              {totalInventoryPcs.toLocaleString('en-IN')} <span className="text-sm font-semibold text-stone-500">pcs</span>
            </span>
            <span className="text-[11px] text-stone-400">across {products.length} products</span>
          </button>

          <button
            type="button"
            onClick={() => setStockFilter(stockFilter === 'in_stock' ? 'all' : 'in_stock')}
            className={`p-4 rounded-2xl text-left transition-all cursor-pointer border ${
              stockFilter === 'in_stock'
                ? 'bg-emerald-100/70 border-emerald-500 ring-2 ring-emerald-500/30 shadow-xs'
                : 'bg-emerald-50 hover:bg-emerald-100/50 border-emerald-200'
            }`}
          >
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 block">
              In Stock
            </span>
            <span className="text-2xl font-black text-emerald-900 mt-1 block">
              {inStockCount}
            </span>
            <span className="text-[11px] text-emerald-600 font-medium">Available for order</span>
          </button>

          <button
            type="button"
            onClick={() => setStockFilter(stockFilter === 'low_stock' ? 'all' : 'low_stock')}
            className={`p-4 rounded-2xl text-left transition-all cursor-pointer border ${
              stockFilter === 'low_stock'
                ? 'bg-amber-100/70 border-amber-500 ring-2 ring-amber-500/30 shadow-xs'
                : 'bg-amber-50 hover:bg-amber-100/50 border-amber-200'
            }`}
          >
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 block">
              Low Stock Alert
            </span>
            <span className="text-2xl font-black text-amber-900 mt-1 block">
              {lowStockCount}
            </span>
            <span className="text-[11px] text-amber-600 font-medium">25 pcs or less</span>
          </button>

          <button
            type="button"
            onClick={() => setStockFilter(stockFilter === 'out_of_stock' ? 'all' : 'out_of_stock')}
            className={`p-4 rounded-2xl text-left transition-all cursor-pointer border ${
              stockFilter === 'out_of_stock'
                ? 'bg-red-100/70 border-red-500 ring-2 ring-red-500/30 shadow-xs'
                : 'bg-red-50 hover:bg-red-100/50 border-red-200'
            }`}
          >
            <span className="text-[11px] font-bold uppercase tracking-wider text-red-700 block">
              Out of Stock
            </span>
            <span className="text-2xl font-black text-red-900 mt-1 block">
              {outOfStockCount}
            </span>
            <span className="text-[11px] text-red-600 font-medium">0 pcs remaining</span>
          </button>
        </div>

        {/* Category Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1">
          <Filter className="w-3.5 h-3.5 text-stone-400 mr-1 flex-shrink-0" />
          {categories.map(cat => {
            const count = categoryCounts[cat] || 0;
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 flex-shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-[#1B4D3E] text-white shadow-xs'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`px-1.5 py-0.5 rounded-full text-[10px] font-black leading-none ${
                    isSelected
                      ? 'bg-white/25 text-white'
                      : 'bg-stone-200 text-stone-600'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Secondary Filter Bar: Stock Status & Pricing Filters & Sorting */}
        <div className="pt-3 border-t border-stone-100 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
          {/* Stock Status Pills */}
          <div className="flex items-center space-x-1.5 flex-wrap gap-y-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 mr-1 flex items-center">
              <Package className="w-3.5 h-3.5 mr-1 text-stone-400" /> Stock:
            </span>
            <button
              type="button"
              onClick={() => setStockFilter('all')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                stockFilter === 'all'
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              All ({products.length})
            </button>
            <button
              type="button"
              onClick={() => setStockFilter('in_stock')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
                stockFilter === 'in_stock'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200/60'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>In Stock ({inStockCount})</span>
            </button>
            <button
              type="button"
              onClick={() => setStockFilter('low_stock')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
                stockFilter === 'low_stock'
                  ? 'bg-amber-700 text-white shadow-xs'
                  : 'bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200/60'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span>Low Stock ({lowStockCount})</span>
            </button>
            <button
              type="button"
              onClick={() => setStockFilter('out_of_stock')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
                stockFilter === 'out_of_stock'
                  ? 'bg-rose-700 text-white shadow-xs'
                  : 'bg-rose-50 text-rose-800 hover:bg-rose-100 border border-rose-200/60'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              <span>Out of Stock ({outOfStockCount})</span>
            </button>
          </div>

          {/* Pricing Filters & Sorting */}
          <div className="flex items-center space-x-2.5 flex-wrap gap-y-1.5">
            {/* Price Range Custom Dropdown */}
            <CustomFilterDropdown
              label="Price"
              value={priceRangeFilter}
              onChange={(val) => setPriceRangeFilter(val)}
              options={PRICE_RANGE_OPTIONS}
              align="right"
            />

            {/* Price Sort Custom Dropdown */}
            <CustomFilterDropdown
              label="Sort"
              value={priceSort}
              onChange={(val) => setPriceSort(val)}
              options={SORT_OPTIONS}
              align="right"
            />

            {/* Reset Filters */}
            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearAllFilters}
                className="px-2.5 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold transition-all flex items-center space-x-1 cursor-pointer border border-stone-200"
                title="Reset all filters"
              >
                <X className="w-3.5 h-3.5 text-stone-500" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-3xl border border-stone-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-stone-600">
            <thead className="bg-stone-50 text-[11px] uppercase font-bold text-stone-500 border-b border-stone-200">
              <tr>
                <th className="px-4 py-4 text-center w-12 text-stone-400 font-black">#</th>
                <th className="px-6 py-4">Product Info</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Quantity (Pcs)</th>
                <th className="px-6 py-4">Stock Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-12 text-center text-stone-400">
                    <Package className="w-10 h-10 mx-auto text-stone-300 mb-2" />
                    No products found matching criteria.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((prod, index) => {
                  const draft = getProductDraft(prod);
                  const modified = isProductModified(prod);

                  return (
                    <tr
                      key={prod.id}
                      className={`transition-colors ${
                        modified ? 'bg-amber-50/40 hover:bg-amber-50/70 border-l-4 border-l-amber-500' : 'hover:bg-stone-50/70'
                      }`}
                    >
                      {/* Sequential Product # */}
                      <td className="px-4 py-4 text-center whitespace-nowrap">
                        <span className="inline-flex w-7 h-7 rounded-xl bg-stone-100 items-center justify-center text-xs font-black text-stone-600 border border-stone-200/80">
                          {index + 1}
                        </span>
                      </td>

                      {/* Product Info */}
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <img
                            src={prod.image}
                            alt={prod.name}
                            className="w-12 h-12 object-cover rounded-xl border border-stone-200 flex-shrink-0"
                          />
                          <div className="max-w-xs sm:max-w-sm">
                            <div className="flex items-center space-x-2">
                              <span className="font-bold text-stone-900 block truncate">
                                {prod.name}
                              </span>
                              {modified && (
                                <span className="px-1.5 py-0.5 rounded text-[10px] font-black bg-amber-100 text-amber-800 border border-amber-300 flex-shrink-0">
                                  Unsaved
                                </span>
                              )}
                            </div>
                            <span className="text-[11px] text-stone-500 mt-0.5 block">
                              <span className="font-medium text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded mr-1.5">{prod.category}</span>
                              ID: {prod.id}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Price input (No auto-save) */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-1">
                          <span className="text-xs font-bold text-stone-400">₹</span>
                          <input
                            type="number"
                            min="0"
                            value={draft.price}
                            onChange={(e) => handlePriceChange(prod, e.target.value)}
                            className={`w-20 rounded-lg py-1 px-2 text-xs font-black text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#1B4D3E]/20 transition-all cursor-text [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
                              modified && draft.price !== prod.price
                                ? 'bg-white border-2 border-amber-500 ring-2 ring-amber-200'
                                : 'bg-stone-50 hover:bg-white focus:bg-white border border-stone-300 focus:border-[#1B4D3E]'
                            }`}
                            title="Edit price (click Save button to apply)"
                          />
                        </div>
                        {prod.originalPrice && (
                          <div className="text-[10px] text-stone-400 line-through mt-0.5 pl-3">
                            MRP: ₹{prod.originalPrice}
                          </div>
                        )}
                      </td>

                      {/* Quantity input & buttons (No auto-save) */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-1.5">
                          <button
                            type="button"
                            onClick={() => handleStockChange(prod, Number(draft.stock || 0) - 1)}
                            className="w-7 h-7 rounded-lg bg-stone-100 hover:bg-stone-200 active:scale-95 text-stone-700 flex items-center justify-center transition-all cursor-pointer"
                            title="Decrease 1 pc"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <input
                            type="number"
                            min="0"
                            value={draft.stock}
                            onChange={(e) => handleStockChange(prod, e.target.value)}
                            className={`w-14 rounded-lg py-1 px-1 text-center text-xs font-black text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#1B4D3E] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
                              modified && Number(draft.stock) !== Number(prod.stock !== undefined ? prod.stock : 50)
                                ? 'bg-white border-2 border-amber-500 ring-2 ring-amber-200'
                                : 'bg-stone-50 border border-stone-300'
                            }`}
                            title="Edit stock quantity (click Save button to apply)"
                          />
                          <span className="text-xs font-semibold text-stone-500">pcs</span>
                          <button
                            type="button"
                            onClick={() => handleStockChange(prod, Number(draft.stock || 0) + 1)}
                            className="w-7 h-7 rounded-lg bg-stone-100 hover:bg-stone-200 active:scale-95 text-stone-700 flex items-center justify-center transition-all cursor-pointer"
                            title="Increase 1 pc"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </td>

                      {/* Stock status dropdown (No auto-save) */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StockStatusDropdown
                          value={draft.stockStatus}
                          onChange={(newStatus) => handleStatusChange(prod, newStatus)}
                        />
                      </td>

                      {/* Actions: Save button & View in store */}
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end space-x-2">
                          {modified ? (
                            <>
                              <button
                                type="button"
                                onClick={() => handleSaveSingle(prod.id)}
                                className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-bold shadow-xs transition-all flex items-center space-x-1.5 cursor-pointer animate-in fade-in"
                                title="Click to save changes for this product"
                              >
                                <Save className="w-3.5 h-3.5" />
                                <span>Save</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDiscardSingle(prod.id)}
                                className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-xl transition-colors cursor-pointer"
                                title="Discard unsaved changes"
                              >
                                <RotateCcw className="w-3.5 h-3.5" />
                              </button>
                            </>
                          ) : (
                            <span className="text-[11px] font-semibold text-stone-400 flex items-center space-x-1 py-1.5 px-2 bg-stone-50 rounded-xl border border-stone-200/60">
                              <Check className="w-3 h-3 text-emerald-600" />
                              <span>Saved</span>
                            </span>
                          )}

                          <Link
                            to={`/product/${prod.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-xl bg-stone-100 hover:bg-[#1B4D3E] hover:text-white text-stone-600 transition-all inline-block"
                            title="View product on live store"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
