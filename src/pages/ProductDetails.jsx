import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, ShoppingBag, Truck, ShieldCheck, Heart, ArrowRight, Check, ChevronDown, Eye, ZoomIn, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Breadcrumb from '../components/common/Breadcrumb';
import QuantitySelector from '../components/common/QuantitySelector';
import ProductCard from '../components/products/ProductCard';
import ProductBadge from '../components/common/ProductBadge';
import QuickViewModal from '../components/products/QuickViewModal';
import { products } from '../data/products';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();

  const product = products.find(p => p.id === id || p.slug === id) || products[0];

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('ingredients');
  const [selectedImage, setSelectedImage] = useState(0);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  React.useEffect(() => {
    setSelectedImage(0);
    setQuantity(1);
  }, [id]);

  const gallery = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image || '/hapsman-logo.jpg'];
  const currentMainImage = gallery[selectedImage] || product.image || '/hapsman-logo.jpg';

  const relatedProducts = products
    .filter(p => p.categorySlug === product.categorySlug && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addItem(product, quantity);
  };

  const handleBuyNow = () => {
    addItem(product, quantity);
    navigate('/checkout');
  };

  return (
    <div className="bg-[#FAF7F2] py-8 sm:py-12 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: 'Products', link: '/products' },
            { label: product.category, link: `/products/${product.categorySlug}` },
            { label: product.name }
          ]}
        />

        {/* Main Product Container */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-amber-500/20 shadow-xl my-6 grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-6 space-y-4">
            {/* Main Stage Image */}
            <div 
              className="relative aspect-square bg-gradient-to-br from-[#FAF7F2] via-white to-[#F4EFE6] rounded-2xl overflow-hidden border border-stone-200/80 flex items-center justify-center p-8 group cursor-zoom-in shadow-inner"
              onClick={() => setQuickViewProduct(product)}
            >
              
              {/* Yellow Badge (Top Left) */}
              {product.badge && (
                <div className="absolute top-4 left-4 z-10">
                  <span className="inline-flex items-center space-x-1 px-3.5 py-1.5 text-xs font-black uppercase tracking-wider bg-amber-400 text-stone-950 rounded-xl shadow-md border border-amber-300">
                    <Sparkles className="w-3.5 h-3.5 text-stone-950" />
                    <span>{product.badge}</span>
                  </span>
                </div>
              )}

              {/* Enlarge Eye Button Overlay (Bottom Right) */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setQuickViewProduct(product);
                }}
                aria-label="Enlarge image"
                title="Click to view enlarged image"
                className="absolute bottom-4 right-4 z-20 flex items-center space-x-1.5 px-3.5 py-2 bg-white/95 hover:bg-white text-[#1B4D3E] text-xs font-bold rounded-full shadow-lg border border-stone-200 transition-all hover:scale-105 active:scale-95"
              >
                <ZoomIn className="w-4 h-4 text-[#1B4D3E]" />
                <span>Enlarge</span>
              </button>

              <img
                src={currentMainImage}
                alt={product.name}
                className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-500 drop-shadow-xl"
              />
            </div>

            {/* Thumbnail Gallery */}
            {gallery.length > 1 && (
              <div className="flex space-x-3 overflow-x-auto pb-2 no-scrollbar">
                {gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`w-20 h-20 bg-[#FAF7F2] rounded-xl border p-2 overflow-hidden transition-all shrink-0 ${
                      selectedImage === idx ? 'border-2 border-[#1B4D3E] ring-2 ring-emerald-600/30 shadow-md scale-105' : 'border-stone-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img || product.image || '/hapsman-logo.jpg'} alt="Thumbnail" className="w-full h-full object-contain drop-shadow-xs" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Product Meta & Purchase Controls */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div>
              {/* Category & Weight */}
              <div className="flex items-center justify-between text-xs text-stone-500 font-semibold mb-2">
                <span className="uppercase tracking-widest text-[#1B4D3E] font-extrabold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-800/10">
                  {product.category}
                </span>
                <span className="bg-stone-100 px-3 py-1 rounded-md text-stone-800 font-bold border border-stone-200">
                  Net Wt: {product.weight || '1 Pack'}
                </span>
              </div>

              {/* Title */}
              <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-stone-900 leading-tight">
                {product.name}
              </h1>

              {/* Rating & Reviews */}
              <div className="flex items-center space-x-2 mt-3">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating || 5) ? 'fill-amber-400' : 'text-stone-300'}`} />
                  ))}
                </div>
                <span className="text-xs font-bold text-stone-800">{product.rating || 4.9}</span>
                <span className="text-xs text-stone-400">({product.reviewsCount || 160} Verified Buyer Reviews)</span>
              </div>

              {/* Price Row */}
              <div className="flex items-baseline space-x-3 mt-5 pt-4 border-t border-stone-200/80">
                <span className="text-3xl sm:text-4xl font-extrabold text-[#1B4D3E]">
                  ₹{product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-base text-stone-400 line-through">₹{product.originalPrice}</span>
                )}
                {product.discount && (
                  <span className="text-xs font-black bg-emerald-100 text-emerald-800 px-3 py-1 rounded-lg border border-emerald-300">
                    Save {product.discount}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mt-4">
                {product.description || product.shortDescription}
              </p>

              {/* Highlight Badges */}
              <div className="grid grid-cols-2 gap-3 mt-6 pt-5 border-t border-stone-200/80">
                <div className="flex items-center space-x-2.5 text-xs text-stone-700 font-semibold bg-[#FAF7F2] p-3 rounded-xl border border-stone-200">
                  <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>100% Pure & Vegetarian</span>
                </div>
                <div className="flex items-center space-x-2.5 text-xs text-stone-700 font-semibold bg-[#FAF7F2] p-3 rounded-xl border border-stone-200">
                  <Truck className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Fast Pan-India Shipping</span>
                </div>
              </div>
            </div>

            {/* Quantity Selector & Add to Cart / Buy Now */}
            <div className="space-y-4 pt-6 border-t border-stone-200">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-stone-700 uppercase tracking-wider">SELECT QUANTITY:</span>
                <QuantitySelector
                  quantity={quantity}
                  onIncrease={() => setQuantity(q => q + 1)}
                  onDecrease={() => setQuantity(q => Math.max(1, q - 1))}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={handleAddToCart}
                  className="w-full py-4 px-6 bg-[#1B4D3E] text-amber-200 hover:bg-[#0F2C23] rounded-2xl font-bold text-xs sm:text-sm transition-all duration-200 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Cart — ₹{product.price * quantity}</span>
                </button>

                <button
                  onClick={handleBuyNow}
                  className="w-full py-4 px-6 bg-amber-400 text-stone-950 hover:bg-amber-300 rounded-2xl font-extrabold text-xs sm:text-sm transition-all duration-200 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg"
                >
                  <span>Buy Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* Tabbed Info */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-sm my-6">
          <div className="flex items-center space-x-2 border-b border-stone-200 pb-4 overflow-x-auto no-scrollbar">
            {['ingredients', 'nutrition', 'storage', 'shipping', 'faqs'].map((tabKey) => (
              <button
                key={tabKey}
                onClick={() => setActiveTab(tabKey)}
                className={`px-4 py-2 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl transition-colors shrink-0 ${
                  activeTab === tabKey
                    ? 'bg-[#1B4D3E] text-amber-200 shadow-xs'
                    : 'text-stone-500 hover:text-stone-900 hover:bg-stone-100'
                }`}
              >
                {tabKey}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="pt-6">
            {activeTab === 'ingredients' && (
              <div className="space-y-3">
                <h4 className="font-serif text-lg font-bold text-stone-900">Ingredients</h4>
                <div className="flex flex-wrap gap-2">
                  {product.ingredients && product.ingredients.map((ing, i) => (
                    <span key={i} className="px-3 py-1.5 bg-stone-100 text-stone-800 rounded-lg text-xs font-semibold">
                      {ing}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'nutrition' && (
              <div className="space-y-3">
                <h4 className="font-serif text-lg font-bold text-stone-900">Nutritional Values (per 100g approx.)</h4>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 max-w-2xl">
                  {product.nutrition && Object.entries(product.nutrition).map(([key, val]) => (
                    <div key={key} className="bg-stone-50 p-3 rounded-xl border border-stone-200 text-center">
                      <div className="text-[10px] uppercase tracking-wider text-stone-400 font-bold">{key}</div>
                      <div className="text-sm font-bold text-[#1B4D3E] mt-1">{val}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'storage' && (
              <div className="space-y-3">
                <h4 className="font-serif text-lg font-bold text-stone-900">Storage & Care Instructions</h4>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-2xl">
                  {product.storage || 'Store in a cool, dry place away from direct sunlight. Reseal pouch tightly after opening to preserve original crunch and freshness.'}
                </p>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="space-y-3">
                <h4 className="font-serif text-lg font-bold text-stone-900">Shipping Information</h4>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-2xl">
                  Standard delivery timeline is 3-5 business days across India. Free shipping applies on all orders above ₹499. Vacuum sealed packaging ensures zero freshness loss during transit.
                </p>
              </div>
            )}

            {activeTab === 'faqs' && (
              <div className="space-y-3">
                <h4 className="font-serif text-lg font-bold text-stone-900">Frequently Asked Questions</h4>
                <p className="text-xs sm:text-sm text-stone-600">
                  Is this product 100% vegetarian? Yes, all Hapsman snacks and sweets are 100% pure vegetarian (FSSAI green dot certified).
                </p>
              </div>
            )}
          </div>

        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="my-12">
            <h3 className="font-serif text-2xl font-bold text-stone-900 mb-6">
              You May Also Like
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} onQuickView={(prod) => setQuickViewProduct(prod)} />
              ))}
            </div>
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
