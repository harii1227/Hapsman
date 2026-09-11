import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function Toast() {
  const { toastMessage } = useCart();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce">
      <div className="bg-[#0F2C23] text-amber-200 px-4 py-3 rounded-xl shadow-2xl border border-amber-500/30 flex items-center space-x-3 text-xs sm:text-sm font-medium">
        <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
        <span>{toastMessage}</span>
      </div>
    </div>
  );
}
