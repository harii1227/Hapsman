import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useAddresses } from '../../hooks/useAddresses';
import { User, Mail, MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function MyProfile() {
  const { user } = useAuth();
  const { addresses, count, maxLimit } = useAddresses();

  const defaultAddr = addresses.find(a => a.isDefault) || addresses[0];

  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="text-2xl font-bold text-stone-900">My Profile</h1>
      
      {/* Account Details Card */}
      <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs flex items-start space-x-4">
        <div className="bg-[#1B4D3E] p-3 rounded-2xl flex-shrink-0 text-white">
          <User className="h-6 w-6" />
        </div>
        <div className="flex-1">
          <h3 className="text-base font-bold text-stone-900">Account Credentials</h3>
          <div className="mt-2 space-y-1.5 text-xs text-stone-600">
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4 text-stone-400" />
              <span className="font-semibold text-stone-800">{user?.email}</span>
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
