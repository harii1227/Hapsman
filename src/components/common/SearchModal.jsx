import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ShoppingBag, ArrowRight } from 'lucide-react';
import { useSearch } from '../../context/SearchContext';
import { products } from '../../data/products';

export default function SearchModal() {
  const { isSearchOpen, closeSearch, searchQuery, setSearchQuery } = useSearch();
  const [results, setResults] = useState([]);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 100);
    }
  }, [isSearchOpen]);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    const q = searchQuery.toLowerCase();
    const filtered = products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        (p.ingredients && p.ingredients.some(i => i.toLowerCase().includes(q)))
    );
    setResults(filtered);
  }, [searchQuery]);

  if (!isSearchOpen) return null;

  const handleSelectProduct = (productId) => {
    closeSearch();
    navigate(`/product/${productId}`);
  };

  const quickSearchTags = ['Makhana', 'Millets', 'Kaju Katli', 'Pudina Mint', 'Peri-Peri', 'Gift Hampers', 'Biscuit'];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={closeSearch}
      />

      {/* Modal Container */}
      <div className="min-h-screen px-4 pt-16 pb-20 text-center flex justify-center items-start">
        <div className="relative inline-block w-full max-w-2xl bg-white rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all border border-stone-200 z-50">
          
          {/* Search Input Bar */}
          <div className="p-4 border-b border-stone-200 flex items-center space-x-3 bg-[#FAF7F2]">
            <Search className="w-5 h-5 text-[#1B4D3E] shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search makhana, millets, kaju katli, gift hampers..."
              className="w-full bg-transparent text-stone-900 placeholder-stone-400 text-sm sm:text-base focus:outline-none"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="text-stone-400 hover:text-stone-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={closeSearch}
              className="text-xs font-semibold px-2.5 py-1.5 bg-stone-200 hover:bg-stone-300 text-stone-700 rounded-md transition-colors"
            >
              ESC
            </button>
          </div>

          {/* Quick Tags */}
          {!searchQuery && (
            <div className="p-5">
              <h4 className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-3">
                Popular Searches
              </h4>
              <div className="flex flex-wrap gap-2">
                {quickSearchTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSearchQuery(tag)}
                    className="text-xs px-3 py-1.5 bg-emerald-50 text-[#1B4D3E] rounded-full hover:bg-[#1B4D3E] hover:text-white transition-colors border border-emerald-800/10 font-medium"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Results List */}
          {searchQuery && (
            <div className="max-h-96 overflow-y-auto p-4 space-y-3">
              <div className="text-xs text-stone-500 font-medium px-2">
                Found {results.length} result{results.length !== 1 ? 's' : ''} for "{searchQuery}"
              </div>

              {results.length === 0 ? (
                <div className="text-center py-10 text-stone-500">
                  <p className="text-sm font-medium">No products found matching "{searchQuery}"</p>
                  <p className="text-xs text-stone-400 mt-1">Try searching for makhana, millets, sweets or hampers.</p>
                </div>
              ) : (
                results.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => handleSelectProduct(product.id)}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-emerald-50/70 transition-colors cursor-pointer group border border-transparent hover:border-emerald-800/10"
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={product.image || '/hapsman-logo.jpg'}
                        alt={product.name}
                        className="w-12 h-12 object-contain bg-white rounded-lg p-1 border border-stone-200"
                      />
                      <div>
                        <h4 className="text-sm font-semibold text-stone-900 group-hover:text-[#1B4D3E]">
                          {product.name}
                        </h4>
                        <p className="text-xs text-stone-500">
                          {product.category} • {product.weight}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-sm font-bold text-[#1B4D3E]">
                        ₹{product.price}
                      </span>
                      <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-[#1B4D3E] group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
