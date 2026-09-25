import React, { useState } from 'react';
import { useAddresses } from '../../hooks/useAddresses';
import {
  MapPin,
  Plus,
  Trash2,
  CheckCircle,
  Home,
  Briefcase,
  Building2,
  AlertCircle,
  ShieldAlert,
  Phone,
  Pencil,
  X
} from 'lucide-react';

export default function SavedAddresses() {
  const {
    addresses,
    count,
    maxLimit,
    canAddMore,
    remainingSlots,
    loading,
    addAddress,
    updateAddress,
    deleteAddress,
    setDefault
  } = useAddresses();

  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const [form, setForm] = useState({
    label: 'Home',
    name: '',
    phone: '',
    address: '',
    city: '',
    state: 'Uttar Pradesh',
    pincode: '',
    isDefault: false
  });

  const handleResetForm = () => {
    setForm({
      label: 'Home',
      name: '',
      phone: '',
      address: '',
      city: '',
      state: 'Uttar Pradesh',
      pincode: '',
      isDefault: false
    });
    setEditingId(null);
    setErrorMessage('');
    setIsAdding(false);
  };

  const handleStartEdit = (addr) => {
    setEditingId(addr.id);
    setForm({
      label: addr.label || 'Home',
      name: addr.name || '',
      phone: addr.phone || '',
      address: addr.address || '',
      city: addr.city || '',
      state: addr.state || 'Uttar Pradesh',
      pincode: addr.pincode || '',
      isDefault: addr.isDefault || false
    });
    setErrorMessage('');
    setIsAdding(true);
    // Smooth scroll to top of form
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const handleSaveAddress = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!form.name.trim() || !form.phone.trim() || !form.address.trim() || !form.city.trim() || !form.pincode.trim()) {
      setErrorMessage('Please fill in all required fields (Name, Phone, Address, City, Pincode).');
      return;
    }

    if (form.phone.replace(/\D/g, '').length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number.');
      return;
    }

    if (form.pincode.replace(/\D/g, '').length !== 6) {
      setErrorMessage('Please enter a valid 6-digit Pincode.');
      return;
    }

    let res;
    if (editingId) {
      res = await updateAddress(editingId, form);
    } else {
      res = await addAddress(form);
    }

    if (!res.success) {
      setErrorMessage(res.message);
      return;
    }

    setSuccessMessage(editingId ? 'Address updated successfully!' : 'Address saved successfully!');
    setTimeout(() => setSuccessMessage(''), 3500);
    handleResetForm();
  };

  const handleDelete = async (id) => {
    const res = await deleteAddress(id);
    setDeleteConfirmId(null);
    if (res.success) {
      setSuccessMessage('Address removed. You can now add a new address.');
      setTimeout(() => setSuccessMessage(''), 3500);
      if (editingId === id) {
        handleResetForm();
      }
    }
  };

  const getLabelIcon = (label) => {
    if (label === 'Home') return <Home className="w-3.5 h-3.5" />;
    if (label === 'Work') return <Briefcase className="w-3.5 h-3.5" />;
    return <Building2 className="w-3.5 h-3.5" />;
  };

  const getLabelBadge = (label) => {
    if (label === 'Home') return 'bg-emerald-50 text-emerald-800 border-emerald-200';
    if (label === 'Work') return 'bg-blue-50 text-blue-800 border-blue-200';
    return 'bg-stone-100 text-stone-700 border-stone-200';
  };

  return (
    <div className="space-y-6">
      {/* Header and Slot Counter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl font-bold text-stone-900">Saved Addresses</h1>
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${
              count === maxLimit
                ? 'bg-rose-50 text-rose-700 border-rose-200'
                : 'bg-emerald-50 text-emerald-800 border-emerald-200'
            }`}>
              {count} / {maxLimit} Saved
            </span>
          </div>
          <p className="text-xs text-stone-500 mt-1">
            Store up to 3 delivery addresses for instant 1-click checkout on your orders.
          </p>
        </div>

        {/* Add Address CTA */}
        {canAddMore ? (
          <button
            type="button"
            onClick={() => {
              if (isAdding) {
                handleResetForm();
              } else {
                handleResetForm();
                setIsAdding(true);
              }
            }}
            className="inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-[#1B4D3E] hover:bg-[#0F2C23] text-amber-200 font-bold text-xs transition-all shadow-sm cursor-pointer"
          >
            {isAdding ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            <span>{isAdding ? 'Close Form' : 'Add New Address'}</span>
          </button>
        ) : (
          <div className="inline-flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-amber-50 text-amber-800 border border-amber-200 text-xs font-semibold">
            <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
            <span>Max limit (3/3) reached. You can edit any existing address or delete one to add a new one.</span>
          </div>
        )}
      </div>

      {/* Global Alerts */}
      {successMessage && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs font-medium flex items-center space-x-2 animate-in fade-in">
          <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {errorMessage && (
        <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-800 rounded-2xl text-xs font-medium flex items-center space-x-2 animate-in fade-in">
          <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Add / Edit Address Form Modal/Collapse */}
      {isAdding && (canAddMore || editingId) && (
        <div className="bg-white p-6 rounded-3xl border-2 border-[#1B4D3E]/30 shadow-md space-y-5 animate-in fade-in slide-in-from-top-3">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <h3 className="text-base font-bold text-stone-900 flex items-center space-x-2">
              {editingId ? (
                <>
                  <Pencil className="w-4 h-4 text-[#1B4D3E]" />
                  <span>Edit Delivery Address</span>
                </>
              ) : (
                <>
                  <MapPin className="w-4 h-4 text-[#1B4D3E]" />
                  <span>Add New Delivery Address</span>
                </>
              )}
            </h3>
            <span className="text-xs text-stone-500 font-medium">
              {editingId ? (
                <span className="text-amber-800 font-semibold bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                  Editing Address
                </span>
              ) : (
                <>Available slots: <strong>{remainingSlots}</strong></>
              )}
            </span>
          </div>

          <form onSubmit={handleSaveAddress} className="space-y-4">
            {/* Address Type / Label */}
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                Address Type:
              </label>
              <div className="flex items-center space-x-3">
                {['Home', 'Work', 'Other'].map((lbl) => (
                  <button
                    key={lbl}
                    type="button"
                    onClick={() => setForm({ ...form, label: lbl })}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border flex items-center space-x-1.5 transition-all cursor-pointer ${
                      form.label === lbl
                        ? 'bg-[#1B4D3E] text-white border-[#1B4D3E] shadow-xs'
                        : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    {getLabelIcon(lbl)}
                    <span>{lbl}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Name & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Recipient Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#1B4D3E]/20 focus:border-[#1B4D3E]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="10-digit mobile number"
                  className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#1B4D3E]/20 focus:border-[#1B4D3E]"
                />
              </div>
            </div>

            {/* Street Address */}
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Flat / House No., Building Name & Street *
              </label>
              <input
                type="text"
                required
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                placeholder="e.g. Flat 402, Greenfield Apartments, Civil Lines"
                className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#1B4D3E]/20 focus:border-[#1B4D3E]"
              />
            </div>

            {/* City, State & Pincode */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  City / Town *
                </label>
                <input
                  type="text"
                  required
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  placeholder="e.g. Kanpur"
                  className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#1B4D3E]/20 focus:border-[#1B4D3E]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  State *
                </label>
                <input
                  type="text"
                  required
                  value={form.state}
                  onChange={(e) => setForm({ ...form, state: e.target.value })}
                  placeholder="State"
                  className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#1B4D3E]/20 focus:border-[#1B4D3E]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Pincode *
                </label>
                <input
                  type="text"
                  maxLength={6}
                  required
                  value={form.pincode}
                  onChange={(e) => setForm({ ...form, pincode: e.target.value.replace(/\D/g, '') })}
                  placeholder="6 Digits"
                  className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#1B4D3E]/20 focus:border-[#1B4D3E]"
                />
              </div>
            </div>

            {/* Default Checkbox */}
            <div className="flex items-center space-x-2 pt-1">
              <input
                type="checkbox"
                id="isDefaultCheckbox"
                checked={form.isDefault}
                onChange={(e) => setForm({ ...form, isDefault: e.target.checked })}
                className="w-4 h-4 rounded text-[#1B4D3E] focus:ring-[#1B4D3E] cursor-pointer"
              />
              <label htmlFor="isDefaultCheckbox" className="text-xs font-semibold text-stone-700 cursor-pointer">
                Set as my default delivery address
              </label>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end space-x-3 pt-3 border-t border-stone-100">
              <button
                type="button"
                onClick={handleResetForm}
                className="px-4 py-2 rounded-xl text-xs font-bold text-stone-600 hover:bg-stone-100 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-[#1B4D3E] text-amber-200 hover:bg-[#0F2C23] transition-all shadow-sm flex items-center space-x-1.5 cursor-pointer disabled:opacity-50"
              >
                <CheckCircle className="w-3.5 h-3.5" />
                <span>{editingId ? 'Update Address' : 'Save Address'}</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Address Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {addresses.length === 0 ? (
          <div className="col-span-full bg-stone-50 border border-dashed border-stone-300 rounded-3xl p-10 text-center space-y-3">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mx-auto border border-stone-200 text-stone-400">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-stone-800">No saved addresses yet</h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              Save up to 3 addresses for quick, seamless 1-click checkout on all future orders.
            </p>
            <button
              type="button"
              onClick={() => {
                handleResetForm();
                setIsAdding(true);
              }}
              className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-[#1B4D3E] text-amber-200 text-xs font-bold hover:bg-[#0F2C23] shadow-sm transition-all cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Your First Address</span>
            </button>
          </div>
        ) : (
          addresses.map((addr) => (
            <div
              key={addr.id}
              className={`bg-white rounded-3xl p-5 border transition-all relative flex flex-col justify-between space-y-4 shadow-xs ${
                addr.isDefault
                  ? 'border-emerald-500 ring-2 ring-emerald-500/10'
                  : 'border-stone-200 hover:border-stone-300'
              }`}
            >
              {/* Top Card Bar */}
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  <span className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg text-[11px] font-bold border ${getLabelBadge(addr.label)}`}>
                    {getLabelIcon(addr.label)}
                    <span>{addr.label}</span>
                  </span>
                  {addr.isDefault && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-600 text-white shadow-2xs">
                      Default
                    </span>
                  )}
                </div>

                {/* Edit & Delete Action Buttons */}
                <div className="flex items-center space-x-1">
                  {deleteConfirmId === addr.id ? (
                    <div className="flex items-center space-x-1 animate-in fade-in">
                      <span className="text-[10px] text-stone-500 font-semibold mr-1">Delete?</span>
                      <button
                        type="button"
                        onClick={() => handleDelete(addr.id)}
                        className="px-2 py-1 bg-red-600 text-white rounded-lg text-[10px] font-bold hover:bg-red-700 cursor-pointer"
                      >
                        Yes
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleteConfirmId(null)}
                        className="px-2 py-1 bg-stone-100 text-stone-600 rounded-lg text-[10px] font-bold hover:bg-stone-200 cursor-pointer"
                      >
                        No
                      </button>
                    </div>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={() => handleStartEdit(addr)}
                        className="p-1.5 text-stone-400 hover:text-[#1B4D3E] hover:bg-stone-100 rounded-xl transition-colors cursor-pointer"
                        title="Edit this address"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleteConfirmId(addr.id)}
                        className="p-1.5 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                        title="Delete this address"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Address Details */}
              <div className="space-y-1.5 text-xs text-stone-600">
                <p className="font-bold text-sm text-stone-900">{addr.name}</p>
                <p className="flex items-center text-stone-500 space-x-1">
                  <Phone className="w-3.5 h-3.5 flex-shrink-0 text-stone-400" />
                  <span>{addr.phone}</span>
                </p>
                <p className="text-stone-700 leading-relaxed pt-1">
                  {addr.address}
                </p>
                <p className="font-medium text-stone-800">
                  {addr.city}, {addr.state} - <span className="font-bold">{addr.pincode}</span>
                </p>
              </div>

              {/* Bottom Card Controls */}
              <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                {!addr.isDefault ? (
                  <button
                    type="button"
                    onClick={() => setDefault(addr.id)}
                    className="text-[11px] font-bold text-[#1B4D3E] hover:underline cursor-pointer"
                  >
                    Set as Default
                  </button>
                ) : (
                  <span className="text-[11px] font-semibold text-emerald-700 flex items-center space-x-1">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Selected for fast checkout</span>
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Info Notice about max 3 addresses */}
      <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-stone-200 text-xs text-stone-600 flex items-start space-x-3">
        <ShieldAlert className="w-4 h-4 text-stone-500 flex-shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Address Policy:</strong> A user can save up to <strong>3 delivery addresses</strong>. You can edit any existing address anytime, or delete an address if you wish to add a different one.
        </p>
      </div>
    </div>
  );
}
