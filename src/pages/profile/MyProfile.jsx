import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useAddresses } from '../../hooks/useAddresses';
import { supabase } from '../../utils/supabaseClient';
import { User, Mail, MapPin, ArrowRight, Save, Phone, Edit2, Loader2, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function MyProfile() {
  const { user } = useAuth();
  const { addresses, count, maxLimit } = useAddresses();

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    full_name: '',
    phone: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        full_name: user.user_metadata?.full_name || '',
        phone: user.user_metadata?.phone || ''
      });
    }
  }, [user]);

  const handleSaveProfile = async () => {
    setLoading(true);
    setSuccess(false);
    try {
      await supabase.auth.updateUser({
        data: {
          full_name: formData.full_name,
          phone: formData.phone
        }
      });
      setSuccess(true);
      setIsEditing(false);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error('Failed to update profile:', err);
    } finally {
      setLoading(false);
    }
  };

  const defaultAddr = addresses.find(a => a.isDefault) || addresses[0];

  return (
    <div className="space-y-6 max-w-2xl animate-fade-in">
      <h1 className="text-2xl font-bold text-stone-900">My Profile</h1>
      
      {/* Account Details Card */}
      <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs flex flex-col sm:flex-row items-start sm:space-x-4 gap-y-4">
        <div className="bg-[#1B4D3E] p-3 rounded-2xl flex-shrink-0 text-white shadow-sm mt-1">
          <User className="h-6 w-6" />
        </div>
        <div className="flex-1 w-full">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-stone-900">Personal Information</h3>
            {!isEditing ? (
              <button 
                onClick={() => setIsEditing(true)}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold transition-colors cursor-pointer border border-stone-200/60"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Edit</span>
              </button>
            ) : (
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => {
                    setIsEditing(false);
                    setFormData({
                      full_name: user.user_metadata?.full_name || '',
                      phone: user.user_metadata?.phone || ''
                    });
                  }}
                  className="px-3 py-1.5 rounded-xl text-stone-500 hover:bg-stone-100 text-xs font-bold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSaveProfile}
                  disabled={loading}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[#1B4D3E] hover:bg-[#12362b] text-white text-xs font-bold transition-colors cursor-pointer disabled:opacity-70 shadow-sm"
                >
                  {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                  <span>Save</span>
                </button>
              </div>
            )}
          </div>

          {success && (
            <div className="mb-4 flex items-center space-x-2 text-emerald-700 bg-emerald-50 px-3 py-2 rounded-xl text-xs font-bold border border-emerald-200">
              <CheckCircle2 className="w-4 h-4" />
              <span>Profile updated successfully!</span>
            </div>
          )}

          <div className="space-y-4 text-sm text-stone-600">
            <div className="flex flex-col space-y-1.5">
              <label className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Email Address</label>
              <div className="flex items-center space-x-2.5 bg-stone-50/50 p-2.5 rounded-xl border border-stone-100">
                <Mail className="h-4 w-4 text-stone-400" />
                <span className="font-semibold text-stone-800">{user?.email}</span>
              </div>
              <p className="text-[10px] text-stone-400 pl-1">Email cannot be changed.</p>
            </div>

            <div className="flex flex-col space-y-1.5">
              <label className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Full Name</label>
              {isEditing ? (
                <div className="flex items-center space-x-2.5 relative">
                  <User className="h-4 w-4 text-stone-400 absolute left-3" />
                  <input
                    type="text"
                    value={formData.full_name}
                    onChange={(e) => setFormData(prev => ({...prev, full_name: e.target.value}))}
                    placeholder="Enter your full name"
                    className="w-full bg-white border border-stone-300 rounded-xl py-2 pl-9 pr-3 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#1B4D3E] transition-all"
                  />
                </div>
              ) : (
                <div className="flex items-center space-x-2.5 bg-stone-50/50 p-2.5 rounded-xl border border-stone-100">
                  <User className="h-4 w-4 text-stone-400" />
                  <span className="font-semibold text-stone-800">{formData.full_name || <span className="text-stone-400 italic font-normal">Not provided</span>}</span>
                </div>
              )}
            </div>

            <div className="flex flex-col space-y-1.5">
              <label className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Phone Number</label>
              {isEditing ? (
                <div className="flex items-center space-x-2.5 relative">
                  <Phone className="h-4 w-4 text-stone-400 absolute left-3" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({...prev, phone: e.target.value}))}
                    placeholder="Enter phone number"
                    className="w-full bg-white border border-stone-300 rounded-xl py-2 pl-9 pr-3 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#1B4D3E] transition-all"
                  />
                </div>
              ) : (
                <div className="flex items-center space-x-2.5 bg-stone-50/50 p-2.5 rounded-xl border border-stone-100">
                  <Phone className="h-4 w-4 text-stone-400" />
                  <span className="font-semibold text-stone-800">{formData.phone || <span className="text-stone-400 italic font-normal">Not provided</span>}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Saved Addresses Summary Card */}
      <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-emerald-50 text-emerald-700 rounded-xl">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-900">Delivery Addresses</h3>
              <p className="text-xs text-stone-500">Saved addresses for quick 1-click checkout</p>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
            {count} / {maxLimit} Saved
          </span>
        </div>

        {defaultAddr ? (
          <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200/80 text-xs space-y-1">
            <div className="flex items-center justify-between font-bold text-stone-900">
              <span>{defaultAddr.name} ({defaultAddr.label})</span>
              <span className="text-[10px] text-emerald-700 uppercase font-black">Primary Address</span>
            </div>
            <p className="text-stone-600">{defaultAddr.address}</p>
            <p className="text-stone-500">{defaultAddr.city}, {defaultAddr.state} - {defaultAddr.pincode}</p>
            <p className="text-stone-500">Phone: {defaultAddr.phone}</p>
          </div>
        ) : (
          <p className="text-xs text-stone-500 bg-stone-50 p-4 rounded-2xl border border-dashed border-stone-300">
            You have not saved any delivery address yet. Add up to 3 addresses for fast checkout.
          </p>
        )}

        <div className="pt-2">
          <Link
            to="/profile/addresses"
            className="inline-flex items-center space-x-2 text-xs font-bold text-[#1B4D3E] hover:text-[#0F2C23] hover:underline"
          >
            <span>Manage Saved Addresses</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
