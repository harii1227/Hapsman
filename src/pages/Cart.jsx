import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, Tag, Truck, ShieldCheck } from 'lucide-react';
import Breadcrumb from '../components/common/Breadcrumb';
import { useCart } from '../context/CartContext';
import { offers, getLiveCoupons } from '../data/offers';

export default function Cart() {
  const {
    cartItems,
    removeItem,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
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

  const subtotal = getSubtotal();

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const liveOffers = getLiveCoupons();
    const match = liveOffers.find(o => o.code.toUpperCase() === couponInput.trim().toUpperCase());
    if (match) {
      if (match.isActive === false) {
        alert(`Coupon ${match.code} is currently disabled.`);
        return;
      }
      applyCoupon(match);
      setCouponInput('');
    } else {
      alert('Invalid coupon code.');
    }
  };

  return (
    <div className="bg-[#FAF7F2] py-8 sm:py-12 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <Breadcrumb items={[{ label: 'Shopping Cart' }]} />

        <div className="my-6">
          <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-stone-900">
            Shopping Cart ({cartItems.length})
          </h1>
        </div>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 shadow-sm max-w-lg mx-auto my-12 space-y-4">
            <div className="w-20 h-20 bg-emerald-50 text-[#1B4D3E] rounded-full flex items-center justify-center mx-auto">
              <ShoppingBag className="w-10 h-10" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-stone-900">Your cart is empty</h3>
            <p className="text-xs sm:text-sm text-stone-500 max-w-sm mx-auto">
              Discover our slow-roasted makhana, ancient millet snacks, and royal traditional sweets.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center space-x-2 px-8 py-3.5 bg-[#1B4D3E] text-amber-200 rounded-xl font-bold text-xs sm:text-sm hover:bg-[#0F2C23] transition-colors shadow-md"
            >
              <span>Explore Products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-8">
            
            {/* Left Column: Cart Items Table */}
            <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-stone-200">
                <span className="text-xs font-bold text-stone-700 uppercase tracking-wider">Product Details</span>
                <button
                  onClick={clearCart}
                  className="text-xs text-red-600 hover:text-red-800 font-semibold"
                >
                  Clear Cart
                </button>
              </div>

              <div className="divide-y divide-stone-100">
                {cartItems.map((item) => (
                  <div key={item.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.image || '/hapsman-logo.jpg'}
                        alt={item.name}
                        className="w-20 h-20 object-contain bg-[#FAF7F2] rounded-xl p-2 border border-stone-200 shrink-0"
                      />
                      <div>
                        <Link to={`/product/${item.id}`} className="font-serif font-bold text-base text-stone-900 hover:text-[#1B4D3E]">
                          {item.name}
                        </Link>
                        <p className="text-xs text-stone-500">{item.weight}</p>
                        <div className="text-sm font-bold text-[#1B4D3E] mt-1">₹{item.price}</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end space-x-6">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-stone-300 rounded-xl bg-stone-50">
                        <button
                          onClick={() => decreaseQuantity(item.id)}
                          className="p-2 text-stone-600 hover:text-stone-900"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 text-xs font-bold text-stone-900">{item.quantity}</span>
                        <button
                          onClick={() => increaseQuantity(item.id)}
                          className="p-2 text-stone-600 hover:text-stone-900"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-base font-extrabold text-stone-900 min-w-[4rem] text-right">
                        ₹{item.price * item.quantity}
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-stone-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Order Summary */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-5">
                <h3 className="font-serif text-xl font-bold text-stone-900 border-b border-stone-200 pb-3">
                  Order Summary
                </h3>

                {/* Coupon Code Section */}
                {appliedCoupon ? (
                  <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl flex items-center justify-between text-xs">
                    <span className="font-medium text-[#1B4D3E]">Coupon {appliedCoupon.code} applied!</span>
                    <button onClick={removeCoupon} className="text-red-600 underline font-semibold">Remove</button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex space-x-2">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      placeholder="Coupon Code"
                      className="flex-1 px-3 py-2 border border-stone-300 rounded-xl text-xs focus:outline-none focus:border-[#1B4D3E]"
                    />
                    <button type="submit" className="px-4 py-2 bg-stone-900 text-white rounded-xl text-xs font-bold">
                      Apply
                    </button>
                  </form>
                )}

                {/* Price Calculations */}
                <div className="space-y-2 text-xs text-stone-600 pt-2 border-t border-stone-100">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-stone-900">₹{subtotal}</span>
                  </div>
                  {getDiscountAmount() > 0 && (
                    <div className="flex justify-between text-emerald-700 font-semibold">
                      <span>Discount</span>
                      <span>- ₹{getDiscountAmount()}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Estimated Shipping</span>
                    <span className="font-semibold text-stone-900">
                      {getShippingFee() === 0 ? 'FREE' : `₹${getShippingFee()}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-extrabold text-stone-900 border-t border-stone-200 pt-3 mt-3">
                    <span>Total Amount</span>
                    <span className="text-[#1B4D3E]">₹{getTotal()}</span>
                  </div>
                </div>

                <button
                  onClick={() => navigate('/checkout')}
                  className="w-full py-4 bg-[#1B4D3E] text-amber-200 font-extrabold text-sm rounded-2xl hover:bg-[#0F2C23] transition-colors shadow-md flex items-center justify-center space-x-2"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
