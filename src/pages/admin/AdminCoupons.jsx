import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import {
  Tag,
  Percent,
  Plus,
  Trash2,
  CheckCircle2,
  Copy,
  Check,
  AlertCircle,
  X
} from 'lucide-react';

export default function AdminCoupons() {
  const { coupons, createCoupon, toggleCouponActive, deleteCoupon, activeCouponsCount } = useAdmin();

  // Form state
  const [code, setCode] = useState('');
  const [percentage, setPercentage] = useState('15');
  const [minOrder, setMinOrder] = useState('499');
  const [title, setTitle] = useState('');
  const [showOnMainSite, setShowOnMainSite] = useState(true);
  const [copiedCode, setCopiedCode] = useState(null);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [couponToDelete, setCouponToDelete] = useState(null);

  const handleCreateCoupon = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!code.trim()) {
      setErrorMsg('Please enter a coupon code (e.g. SAVE20).');
      return;
    }

    const res = await createCoupon({
      code,
      percentage,
      minOrder,
      title,
      showOnMainSite
    });

    if (res.success) {
      setSuccessMsg(`Coupon ${res.coupon.code} (${res.coupon.percentage}% OFF) created and activated!`);
      setCode('');
      setTitle('');
      setPercentage('15');
      setMinOrder('499');
      setShowOnMainSite(true);
      setTimeout(() => setSuccessMsg(''), 4000);
    } else {
      setErrorMsg(res.message || 'Failed to create coupon.');
    }
  };

  const handleCopy = (couponCode) => {
    navigator.clipboard.writeText(couponCode);
    setCopiedCode(couponCode);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const inactiveCouponsCount = coupons.length - activeCouponsCount;

  return (
    <div className="space-y-8">
      {/* Header & Overview */}
      <div className="bg-white p-6 rounded-3xl border border-stone-200/80 shadow-xs space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-stone-900">Discount Coupons & Offers</h1>
            <p className="text-xs text-stone-500 mt-1">
              Create custom percentage discount codes, toggle promotional campaigns on/off, or delete expired coupons.
            </p>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-stone-100">
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80">
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block">
              Total Coupons
            </span>
            <span className="text-2xl font-black text-stone-900 mt-1 block">
              {coupons.length}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 block">
              Active Coupons
            </span>
            <span className="text-2xl font-black text-emerald-900 mt-1 block">
              {activeCouponsCount}
            </span>
            <span className="text-[11px] text-emerald-600 font-medium">Ready for checkout use</span>
          </div>

          <div className="p-4 rounded-2xl bg-stone-100 border border-stone-300">
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-600 block">
              Disabled Coupons
            </span>
            <span className="text-2xl font-black text-stone-700 mt-1 block">
              {inactiveCouponsCount}
            </span>
            <span className="text-[11px] text-stone-500 font-medium">Turned off by admin</span>
          </div>
        </div>
      </div>

      {/* Two Column Layout: Create Coupon Form + Coupons Directory */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Column: Create Coupon Form */}
        <div className="bg-white rounded-3xl border border-stone-200/80 shadow-xs p-6 space-y-5">
          <div className="flex items-center space-x-2 border-b border-stone-100 pb-4">
            <div className="w-8 h-8 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 flex items-center justify-center font-bold">
              <Plus className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-stone-900 text-base">Create New Coupon</h3>
              <p className="text-xs text-stone-500">Configure discount percentage and code</p>
            </div>
          </div>

          {successMsg && (
            <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-xl text-xs flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-300 text-red-800 rounded-xl text-xs flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleCreateCoupon} className="space-y-4">
            {/* Coupon Code */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5">
                Coupon Code *
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase().replace(/[^A-Z0-9_-]/g, ''))}
                  placeholder="e.g. HAPS25"
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl py-2.5 px-3.5 text-sm font-mono font-black text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#1B4D3E] focus:border-transparent transition-all uppercase tracking-wider"
                />
              </div>
              <span className="text-[10px] text-stone-400 mt-1 block">Customer will enter this code at checkout</span>
            </div>

            {/* Discount Percentage */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5">
                  Discount (%) *
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="1"
                    max="100"
                    required
                    value={percentage}
                    onChange={(e) => setPercentage(e.target.value)}
                    placeholder="15"
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl py-2.5 pl-3.5 pr-8 text-sm font-bold text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#1B4D3E] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-stone-400 pointer-events-none">%</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5">
                  Min Order (₹)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-stone-400 pointer-events-none">₹</span>
                  <input
                    type="number"
                    min="0"
                    value={minOrder}
                    onChange={(e) => setMinOrder(e.target.value)}
                    placeholder="499"
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl py-2.5 pl-8 pr-3.5 text-sm font-bold text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#1B4D3E] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
              </div>
            </div>

            {/* Title / Description */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5">
                Promotion Title / Note
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Special Weekend Festive Discount"
                className="w-full bg-stone-50 border border-stone-300 rounded-xl py-2.5 px-3.5 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#1B4D3E]"
              />
            </div>

            {/* Show on Main Site Toggle */}
            <div className="flex items-center justify-between p-3 bg-stone-50 border border-stone-200 rounded-xl mt-4">
              <div>
                <label className="block text-xs font-bold text-stone-900">
                  Show on Main Site
                </label>
                <span className="text-[10px] text-stone-500">
                  If off, this will be a hidden/private coupon.
                </span>
              </div>
              <button
                type="button"
                onClick={() => setShowOnMainSite(!showOnMainSite)}
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  showOnMainSite ? 'bg-emerald-600' : 'bg-stone-300'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    showOnMainSite ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-[#1B4D3E] hover:bg-[#143d31] text-amber-200 font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Create & Activate Coupon</span>
            </button>
          </form>
        </div>

        {/* Right Column: Existing Coupons Directory */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-stone-200/80 shadow-xs overflow-hidden">
          <div className="p-5 border-b border-stone-200 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-stone-900 text-base">Store Coupons</h3>
              <p className="text-xs text-stone-500">Toggle active status or delete promotional codes</p>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-stone-100 text-stone-700">
              {coupons.length} total
            </span>
          </div>

          <div className="divide-y divide-stone-100">
            {coupons.length === 0 ? (
              <div className="p-12 text-center text-stone-400">
                <Tag className="w-10 h-10 mx-auto text-stone-300 mb-2" />
                No coupons created yet. Use the form on the left to add one!
              </div>
            ) : (
              coupons.map((c) => {
                const isActive = c.isActive !== false;
                const isCopied = copiedCode === c.code;

                return (
                  <div
                    key={c.id || c.code}
                    className={`p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors ${
                      isActive ? 'bg-white hover:bg-stone-50/70' : 'bg-stone-50/60 opacity-70'
                    }`}
                  >
                    <div className="flex items-start space-x-3.5">
                      <div
                        className={`w-11 h-11 rounded-2xl flex items-center justify-center font-bold text-sm shrink-0 border ${
                          isActive
                            ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                            : 'bg-stone-100 border-stone-300 text-stone-400'
                        }`}
                      >
                        <Percent className="w-5 h-5" />
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-mono font-black text-sm tracking-wider text-stone-900 bg-stone-100 border border-stone-200 px-2.5 py-0.5 rounded-lg">
                            {c.code}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleCopy(c.code)}
                            className="p-1 text-stone-400 hover:text-stone-700 transition-colors"
                            title="Copy code"
                          >
                            {isCopied ? (
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              isActive
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                : 'bg-stone-200 text-stone-600 border border-stone-300'
                            }`}
                          >
                            {isActive ? 'Active' : 'Disabled'}
                          </span>
                          {c.showOnMainSite === false && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-purple-100 text-purple-800 border border-purple-300">
                              Hidden
                            </span>
                          )}
                        </div>

                        <p className="text-xs font-semibold text-stone-800">
                          {c.title || c.discount}
                        </p>

                        <div className="flex items-center space-x-3 text-[11px] text-stone-500">
                          <span>
                            Discount: <strong className="text-emerald-700">{c.percentage || c.discountValue || 10}% OFF</strong>
                          </span>
                          <span>•</span>
                          <span>
                            Min. Order: <strong className="text-stone-700">{c.minOrder ? `₹${c.minOrder}` : 'No minimum'}</strong>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Actions: ON/OFF Toggle & Delete */}
                    <div className="flex items-center justify-between sm:justify-end space-x-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-stone-100">
                      {/* Toggle Button */}
                      <button
                        type="button"
                        onClick={() => toggleCouponActive(c.id || c.code)}
                        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                          isActive ? 'bg-emerald-600' : 'bg-stone-300'
                        }`}
                        title={isActive ? 'Click to Disable coupon' : 'Click to Activate coupon'}
                      >
                        <span
                          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                            isActive ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </button>

                      {/* Delete Button */}
                      <button
                        type="button"
                        onClick={() => setCouponToDelete(c)}
                        className="p-2 rounded-xl text-stone-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                        title="Delete coupon"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Custom Delete Confirmation Modal */}
      {couponToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-150">
          {/* Backdrop click to dismiss */}
          <div
            className="absolute inset-0"
            onClick={() => setCouponToDelete(null)}
          />

          {/* Modal Card */}
          <div className="relative bg-white rounded-2xl p-5 sm:p-6 max-w-[340px] sm:max-w-sm w-full shadow-2xl border border-stone-200/90 z-10 space-y-4 animate-in zoom-in-95 duration-150">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setCouponToDelete(null)}
              className="absolute top-3.5 right-3.5 p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-lg transition-colors"
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header Icon & Title */}
            <div className="text-center space-y-2 pt-1">
              <div className="w-11 h-11 mx-auto rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-red-600 shadow-xs">
                <Trash2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-stone-900">
                  Delete Coupon?
                </h3>
                <p className="text-xs text-stone-500 mt-1 leading-relaxed px-1">
                  Are you sure? Customers will no longer be able to use this code at checkout.
                </p>
              </div>
            </div>

            {/* Coupon Card Preview */}
            <div className="bg-stone-50 border border-stone-200/80 rounded-xl p-3 flex items-center justify-between">
              <div className="flex items-center space-x-2.5 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-100 shrink-0">
                  <Tag className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="font-mono font-bold text-stone-900 tracking-wider text-sm truncate">
                    {couponToDelete.code}
                  </div>
                  <div className="text-[11px] text-stone-500 truncate">
                    {couponToDelete.percentage}% OFF • Min ₹{couponToDelete.minOrder}
                  </div>
                </div>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0 ${
                couponToDelete.active !== false
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-stone-200 text-stone-600'
              }`}>
                {couponToDelete.active !== false ? 'Active' : 'Off'}
              </span>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-2.5 pt-1">
              <button
                type="button"
                onClick={() => setCouponToDelete(null)}
                className="flex-1 py-2.5 px-3 rounded-xl border border-stone-200 text-stone-700 hover:bg-stone-100 font-semibold text-xs sm:text-sm transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  deleteCoupon(couponToDelete.id || couponToDelete.code);
                  setCouponToDelete(null);
                }}
                className="flex-1 py-2.5 px-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-xs sm:text-sm shadow-md shadow-red-600/20 transition-all flex items-center justify-center space-x-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
