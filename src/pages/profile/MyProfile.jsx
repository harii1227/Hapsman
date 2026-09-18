import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { User, Mail } from 'lucide-react';

export default function MyProfile() {
  const { user } = useAuth();

  return (
    <div>
      <h1 className="text-2xl font-bold text-stone-900 mb-6">My Profile</h1>
      
      <div className="space-y-6 max-w-lg">
        <div className="bg-[#FAF7F2] p-6 rounded-2xl flex items-start space-x-4 border border-stone-200">
          <div className="bg-[#1B4D3E] p-3 rounded-full flex-shrink-0">
            <User className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-stone-900">Account Details</h3>
            <div className="mt-4 space-y-3">
              <div className="flex items-center text-stone-600">
                <Mail className="h-5 w-5 mr-3 text-stone-400" />
                <span>{user?.email}</span>
              </div>
            </div>
          </div>
        </div>

        {/* We can add profile edit forms here in the future */}
      </div>
    </div>
  );
}
