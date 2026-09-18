import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { User, Package, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function ProfileLayout() {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      navigate('/');
      // Wait a tiny bit so the navigation finishes before auth state changes
      setTimeout(async () => {
        await signOut();
      }, 50);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const navItems = [
    { name: 'My Profile', path: '/profile/me', icon: User },
    { name: 'Order History', path: '/profile/orders', icon: Package },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Sidebar */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-4 sticky top-24">
            <h2 className="text-xl font-bold text-stone-900 mb-6 px-4">My Account</h2>
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-colors ${
                        isActive
                          ? 'bg-[#FAF7F2] text-[#1B4D3E]'
                          : 'text-stone-600 hover:bg-stone-50 hover:text-stone-900'
                      }`
                    }
                  >
                    <Icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </NavLink>
                );
              })}
              
              <button
                onClick={handleLogout}
                className="w-full flex items-center px-4 py-3 text-sm font-medium rounded-xl text-red-600 hover:bg-red-50 transition-colors mt-4"
              >
                <LogOut className="mr-3 h-5 w-5" />
                Sign Out
              </button>
            </nav>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="md:col-span-3">
          <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6 md:p-8 min-h-[60vh]">
            <Outlet />
          </div>
        </div>
        
      </div>
    </div>
  );
}
