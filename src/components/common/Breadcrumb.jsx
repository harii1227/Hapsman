import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumb({ items = [] }) {
  return (
    <nav className="flex items-center space-x-2 text-xs text-stone-500 font-medium py-3">
      <Link to="/" className="hover:text-[#1B4D3E] flex items-center space-x-1">
        <Home className="w-3.5 h-3.5" />
        <span>Home</span>
      </Link>

      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
          {item.link ? (
            <Link to={item.link} className="hover:text-[#1B4D3E]">
              {item.label}
            </Link>
          ) : (
            <span className="text-stone-900 font-semibold">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
