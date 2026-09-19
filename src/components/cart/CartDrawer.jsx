import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, Truck, CheckCircle2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { offers, getLiveCoupons } from '../../data/offers';

export default function CartDrawer() {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    removeItem,
    increaseQuantity,
    decreaseQuantity,
    getSubtotal,
    getDiscountAmount,
    getShippingFee,
    getTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const subtotal = getSubtotal();
  const freeShippingThreshold = 499;
  const progressPercentage = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const amountForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const handleApplyCouponCode = (e) => {
    e.preventDefault();
    if (!couponInput.trim()) return;

    const liveOffers = getLiveCoupons();
    const matchedOffer = liveOffers.find(
      (o) => o.code.toUpperCase() === couponInput.trim().toUpperCase()
    );

    if (matchedOffer) {
      if (matchedOffer.isActive === false) {
        alert(`Coupon ${matchedOffer.code} is currently disabled.`);
        return;
      }
      applyCoupon(matchedOffer);
      setCouponInput('');
    } else {
      alert('Invalid coupon code.');
    }
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen sm:max-w-md bg-[#FAF7F2] shadow-2xl flex flex-col justify-between border-l border-stone-200">
          
          {/* Header */}
          <div className="p-4 sm:p-5 bg-white border-b border-stone-200 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5 text-[#1B4D3E]" />
              <h3 className="font-serif text-lg font-bold text-stone-900">
                Your Shopping Cart ({cartItems.length})
              </h3>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="bg-emerald-900 text-white p-3 text-xs">
            <div className="flex items-center justify-between mb-1.5 font-medium">
              <span className="flex items-center space-x-1.5">
                <Truck className="w-4 h-4 text-amber-300" />
                <span>
                  {amountForFreeShipping > 0
                    ? `Add ₹${amountForFreeShipping} more for FREE Express Shipping!`
                    : '🎉 You have unlocked FREE Express Shipping!'}
                </span>
              </span>
            </div>
            <div className="w-full bg-emerald-950 rounded-full h-2 overflow-hidden border border-emerald-700/50">
              <div
                className="bg-amber-400 h-full transition-all duration-500 rounded-full"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 bg-emerald-50 text-[#1B4D3E] rounded-full flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="font-serif text-lg font-bold text-stone-800">Your cart is currently empty</h4>
                <p className="text-xs text-stone-500 max-w-xs mx-auto">
                  Discover our delicious roasted makhana, wholesome millets, and festive Indian sweets!
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate('/products');
                  }}
                  className="px-6 py-2.5 bg-[#1B4D3E] text-white rounded-full text-xs font-semibold hover:bg-[#0F2C23] transition-colors shadow-md inline-block"
                >
                  Explore Products
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-3.5 rounded-xl border border-stone-200 shadow-xs flex items-center space-x-3"
                >
                  <img
                    src={item.image || '/hapsman-logo.jpg'}
                    alt={item.name}
                    className="w-16 h-16 object-contain rounded-lg bg-[#FAF7F2] p-1 border border-stone-100 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h5 className="text-xs font-bold text-stone-900 truncate">
                      {item.name}
                    </h5>
                    <p className="text-[11px] text-stone-500">{item.weight}</p>
                    <div className="mt-1 text-xs font-bold text-[#1B4D3E]">
                      ₹{item.price}
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center space-x-2 mt-2">
                      <div className="flex items-center border border-stone-300 rounded-md bg-stone-50">
                        <button
                          onClick={() => decreaseQuantity(item.id)}
                          className="p-1 hover:bg-stone-200 text-stone-600 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-semibold text-stone-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => increaseQuantity(item.id)}
                          className="p-1 hover:bg-stone-200 text-stone-600 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-1 text-stone-400 hover:text-red-600 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Summary */}
          {cartItems.length > 0 && (
            <div className="p-4 sm:p-5 bg-white border-t border-stone-200 space-y-4">
              
              {/* Coupon Form */}
              {appliedCoupon ? (
                <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 p-2.5 rounded-lg text-xs">
                  <div className="flex items-center space-x-2 text-[#1B4D3E] font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Coupon <strong>{appliedCoupon.code}</strong> applied</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-stone-500 hover:text-stone-800 text-[11px] underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCouponCode} className="flex space-x-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 absolute left-3 top-3 text-stone-400" />
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      placeholder="Enter promo or coupon code"
                      className="w-full pl-8 pr-3 py-2 border border-stone-300 rounded-lg text-xs focus:outline-none focus:border-[#1B4D3E]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3.5 py-2 bg-stone-900 text-white rounded-lg text-xs font-semibold hover:bg-stone-800 transition-colors"
                  >
                    Apply
                  </button>
                </form>
              )}

              {/* Price Calculation */}
              <div className="space-y-1.5 text-xs text-stone-600 border-t border-stone-100 pt-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-stone-900">₹{subtotal}</span>
                </div>
                {getDiscountAmount() > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Discount Savings</span>
                    <span className="font-semibold">- ₹{getDiscountAmount()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span className="font-semibold text-stone-900">
                    {getShippingFee() === 0 ? 'FREE' : `₹${getShippingFee()}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-stone-900 border-t border-stone-200 pt-2 mt-2">
                  <span>Total Amount</span>
                  <span className="text-[#1B4D3E]">₹{getTotal()}</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="space-y-2 pt-1">
                <button
                  onClick={handleCheckout}
                  className="w-full py-3 bg-[#1B4D3E] text-amber-200 rounded-xl font-bold text-xs sm:text-sm hover:bg-[#0F2C23] transition-colors shadow-md flex items-center justify-center space-x-2"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate('/cart');
                  }}
                  className="w-full py-2 bg-stone-100 text-stone-700 rounded-xl font-semibold text-xs hover:bg-stone-200 transition-colors text-center"
                >
                  View Detailed Cart Page
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
