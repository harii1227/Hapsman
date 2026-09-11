import React, { useState, useEffect } from 'react';
import { X, Star, ShoppingBag, Check, Maximize2, ZoomIn, Sparkles } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import QuantitySelector from '../common/QuantitySelector';
import ProductBadge from '../common/ProductBadge';

export default function QuickViewModal({ product, onClose }) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [isFullscreenImage, setIsFullscreenImage] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (isFullscreenImage) {
          setIsFullscreenImage(false);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, isFullscreenImage]);

  if (!product) return null;

  const handleAddToCart = () => {
    addItem(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const productImage = product.image || '/hapsman-logo.jpg';

  return (
    <>
      {/* FULLSCREEN IMAGE LIGHTBOX OVERLAY */}
      {isFullscreenImage && (
        <div 
          className="fixed inset-0 z-60 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-fadeIn"
          onClick={() => setIsFullscreenImage(false)}
        >
          <button
            onClick={() => setIsFullscreenImage(false)}
            aria-label="Close Lightbox"
            className="absolute top-6 right-6 z-70 p-3 bg-white/20 hover:bg-white/40 text-white rounded-full transition-colors shadow-2xl"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="relative max-w-5xl max-h-[90vh] flex flex-col items-center justify-center">
            <img
              src={productImage}
              alt={product.name}
              className="max-w-full max-h-[80vh] object-contain drop-shadow-2xl rounded-2xl border border-white/10"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="mt-4 text-center">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-amber-200">{product.name}</h3>
              <p className="text-xs text-stone-300 mt-1">Click anywhere outside or press ESC to exit full screen view</p>
            </div>
          </div>
        </div>
      )}

      {/* REGULAR ENLARGED QUICK VIEW MODAL */}
      <div className="fixed inset-0 z-50 overflow-y-auto">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />

        {/* Modal Box */}
        <div className="min-h-screen px-4 pt-4 pb-12 text-center flex items-center justify-center">
          <div className="relative inline-block w-full max-w-4xl bg-white rounded-3xl text-left overflow-hidden shadow-2xl transform transition-all border border-stone-200 z-50 my-6">
            
            {/* Close Button */}
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="absolute top-4 right-4 z-30 w-10 h-10 flex items-center justify-center text-stone-700 hover:text-stone-950 bg-stone-100 hover:bg-stone-200 rounded-full shadow-md transition-all hover:scale-110 border border-stone-300 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
              
              {/* Left Side: Large High-Res Image Preview */}
              <div className="md:col-span-6 bg-[#FAF7F2] relative min-h-[350px] sm:min-h-[480px] flex flex-col items-center justify-center p-6 border-b md:border-b-0 md:border-r border-stone-200 group">
                
                {/* Yellow Badge Top Left */}
                {product.badge && (
                  <div className="absolute top-4 left-4 z-10">
                    <span className="inline-block px-3 py-1.5 text-xs font-black uppercase tracking-wider bg-amber-500 text-stone-950 rounded-lg shadow-md border border-amber-400">
                      {product.badge}
                    </span>
                  </div>
                )}

                {/* Full Screen Image Button */}
                <button
                  onClick={() => setIsFullscreenImage(true)}
                  aria-label="View Fullscreen Image"
                  className="absolute bottom-4 right-4 z-10 flex items-center space-x-1.5 px-3 py-1.5 bg-white/90 hover:bg-white text-[#1B4D3E] text-xs font-bold rounded-full shadow-md transition-all hover:scale-105 border border-stone-200"
                >
                  <ZoomIn className="w-4 h-4" />
                  <span>Enlarge Image</span>
                </button>

                {/* Large Image */}
                <div 
                  className="w-full h-full flex items-center justify-center cursor-zoom-in"
                  onClick={() => setIsFullscreenImage(true)}
                >
                  <img
                    src={productImage}
                    alt={product.name}
                    className="w-full h-full object-contain max-h-[420px] drop-shadow-2xl group-hover:scale-105 transition-transform duration-500 rounded-xl"
                  />
                </div>
                <p className="text-[11px] text-stone-400 font-medium mt-3 flex items-center space-x-1">
                  <Maximize2 className="w-3 h-3 text-stone-400" />
                  <span>Click image to view in ultra full-screen size</span>
                </p>
              </div>

              {/* Right Side: Product Meta & Purchase Controls */}
              <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-gradient-to-br from-white via-[#FAF7F2]/40 to-white">
                <div>
                  {/* Category & Weight - pr-12 added to leave room for close button */}
                  <div className="flex items-center justify-between text-xs text-stone-500 font-semibold mb-2 pr-12">
                    <span className="uppercase tracking-widest text-[#1B4D3E] font-bold">{product.category}</span>
                    <span className="bg-stone-100 px-2.5 py-1 rounded-md text-stone-800 font-bold">Net Wt: {product.weight || '1 Pack'}</span>
                  </div>

                  {/* Title */}
                  <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-stone-900 leading-tight">
                    {product.name}
                  </h2>

                  {/* Rating */}
                  <div className="flex items-center space-x-2 mt-2.5">
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating || 5) ? 'fill-amber-400' : 'text-stone-300'}`} />
                      ))}
                    </div>
                    <span className="text-xs font-bold text-stone-800">{product.rating || 4.9}</span>
                    <span className="text-xs text-stone-400">({product.reviewsCount || 120} Reviews)</span>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline space-x-2.5 mt-4 pt-3 border-t border-stone-200/70">
                    <span className="text-2xl sm:text-3xl font-extrabold text-[#1B4D3E]">
                      ₹{product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-stone-400 line-through">₹{product.originalPrice}</span>
                    )}
                    {product.discount && (
                      <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-md">
                        Save {product.discount}
                      </span>
                    )}
                  </div>

                  {/* Short Description */}
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mt-3">
                    {product.shortDescription || product.description}
                  </p>

                  {/* Checkmark Features */}
                  <div className="mt-4 pt-3 border-t border-stone-200/70 space-y-1.5">
                    {(product.benefits || [
                      'Handpicked Grade-A natural ingredients',
                      'No artificial preservatives or trans fats',
                      'Slow-roasted to crunch perfection'
                    ]).slice(0, 3).map((b, idx) => (
                      <div key={idx} className="flex items-center space-x-2 text-xs text-stone-700 font-medium">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quantity & CTA */}
                <div className="space-y-3 pt-4 border-t border-stone-200">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-stone-700 uppercase tracking-wider">Quantity:</span>
                    <QuantitySelector
                      quantity={quantity}
                      onIncrease={() => setQuantity(q => q + 1)}
                      onDecrease={() => setQuantity(q => Math.max(1, q - 1))}
                    />
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className={`w-full py-3.5 px-6 rounded-2xl font-bold text-xs sm:text-sm transition-all duration-200 flex items-center justify-center space-x-2 shadow-md ${
                      isAdded
                        ? 'bg-emerald-700 text-white'
                        : 'bg-[#1B4D3E] text-amber-200 hover:bg-[#0F2C23]'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Added to Shopping Cart!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>Add to Cart — ₹{product.price * quantity}</span>
                      </>
                    )}
                  </button>
                </div>

              </div>

            </div>

          </div>
        </div>
      </div>
    </>
  );
}

