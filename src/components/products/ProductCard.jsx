import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingBag, Heart, Eye, Check, Plus, Minus } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import ProductBadge from '../common/ProductBadge';

export default function ProductCard({ product, onQuickView }) {
  const { cartItems, addItem, increaseQuantity, decreaseQuantity } = useCart();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const cartItem = cartItems.find(item => item.id === product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const toggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  const productImage = product.image || '/hapsman-logo.jpg';

  return (
    <div className="bg-white rounded-2xl border border-stone-200/80 product-card-shadow overflow-hidden flex flex-col justify-between group relative">
      
      {/* Top Image Container - 100% Full Width, Flush Edges */}
      <div className="relative aspect-[4/3] bg-[#FAF7F2] overflow-hidden w-full">
        
        {/* Badge (Top Left) */}
        {product.badge && (
          <div className="absolute top-3 left-3 z-10">
            <span className="inline-block px-2.5 py-1 text-[10px] font-black uppercase tracking-wider bg-amber-400 text-stone-950 rounded-lg shadow-md border border-amber-300">
              {product.badge}
            </span>
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={toggleWishlist}
          aria-label="Add to wishlist"
          className="absolute bottom-3 right-3 z-10 p-2 bg-white/90 hover:bg-white rounded-full text-stone-600 shadow-md transition-transform duration-200 hover:scale-110"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'text-red-500 fill-red-500' : ''}`} />
        </button>

        {/* Quick View / Enlarged Image Eye Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (onQuickView) {
              onQuickView(product);
            }
          }}
          aria-label="View enlarged image"
          title="Click to view enlarged image"
          className="absolute bottom-3 left-3 z-20 w-9 h-9 bg-white/95 hover:bg-white text-[#1B4D3E] rounded-full shadow-lg backdrop-blur-xs transition-all duration-200 hover:scale-110 flex items-center justify-center border border-emerald-900/20 active:scale-95 cursor-pointer"
        >
          <Eye className="w-4 h-4 text-[#1B4D3E]" />
        </button>

        {/* Full-bleed Product Image */}
        <Link to={`/product/${product.id}`} className="block w-full h-full relative">
          <img
            src={productImage}
            alt={product.name}
            className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 rounded-none ${product.stockStatus === 'out_of_stock' ? 'grayscale opacity-60' : ''}`}
          />
          {product.stockStatus === 'out_of_stock' && (
            <div className="absolute inset-0 bg-stone-900/20 flex flex-col items-center justify-end pb-6">
              <span className="bg-rose-600 text-white font-bold text-[11px] uppercase tracking-wider py-1.5 px-4 rounded-full shadow-lg border border-rose-500/50">
                Out of Stock
              </span>
            </div>
          )}
        </Link>
      </div>

      {/* Card Info Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Weight */}
          <div className="flex items-center justify-between text-[11px] text-stone-500 font-medium mb-1">
            <span className="text-[#1B4D3E] font-semibold">{product.category}</span>
            <span className="bg-stone-100 px-2 py-0.5 rounded-md text-stone-700 font-semibold">{product.weight}</span>
          </div>

          {/* Title */}
          <Link to={`/product/${product.id}`}>
            <h3 className="font-serif text-base font-bold text-stone-900 group-hover:text-[#1B4D3E] transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>

          {/* Short Descriptor */}
          <p className="text-xs text-stone-500 line-clamp-2 mt-1 min-h-[2rem]">
            {product.shortDescription}
          </p>

          {/* Rating */}
          <div className="flex items-center space-x-1 mt-2.5">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < Math.floor(product.rating || 5) ? 'fill-amber-400' : 'text-stone-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs font-bold text-stone-800 ml-1">{product.rating || 4.9}</span>
            <span className="text-[11px] text-stone-400">({product.reviewsCount || 15})</span>
          </div>
        </div>

        {/* Pricing & Add to Cart */}
        <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-baseline space-x-1.5">
              <span className="text-base sm:text-lg font-extrabold text-[#1B4D3E]">
                ₹{product.price}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-stone-400 line-through">
                  ₹{product.originalPrice}
                </span>
              )}
            </div>
            {product.discount && (
              <span className="text-[10px] font-bold text-emerald-700">
                Save {product.discount}
              </span>
            )}
          </div>

          {product.stockStatus === 'out_of_stock' ? (
            <button
              disabled
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-stone-200 text-stone-400 cursor-not-allowed shadow-sm border border-stone-200"
            >
              Out of Stock
            </button>
          ) : cartItem ? (
            <div className="flex items-center space-x-1 bg-[#1B4D3E] rounded-full p-1 shadow-md border border-[#143D31]" onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}>
              <button 
                onClick={() => decreaseQuantity(product.id)}
                className="w-7 h-7 flex items-center justify-center rounded-full bg-[#143D31] text-amber-200 hover:bg-[#0a201a] transition-colors"
              >
                <Minus className="w-3.5 h-3.5" strokeWidth={3} />
              </button>
              <span className="text-sm font-bold text-white w-5 text-center leading-none">{cartItem.quantity}</span>
              <button 
                onClick={() => increaseQuantity(product.id)}
                className="w-7 h-7 flex items-center justify-center rounded-full bg-amber-400 text-[#1B4D3E] hover:bg-amber-300 transition-colors shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" strokeWidth={3} />
              </button>
            </div>
          ) : (
            <button
              onClick={handleAddToCart}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-200 flex items-center space-x-1.5 shadow-sm ${
                isAdded
                  ? 'bg-emerald-700 text-white'
                  : 'bg-[#1B4D3E] text-amber-200 hover:bg-[#0F2C23] hover:shadow-md'
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add to Cart</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
