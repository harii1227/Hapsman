import React from 'react';
import { useAutoScroll } from '../../hooks/useAutoScroll';

export default function AutoScrollCarousel({ children, className = '' }) {
  const scrollRef = useAutoScroll(0.7); // slightly faster for better visibility

  return (
    <div 
      ref={scrollRef} 
      className={`flex overflow-x-auto sm:grid gap-4 sm:gap-8 pb-4 sm:pb-0 scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] -mx-4 px-4 sm:mx-0 sm:px-0 ${className}`}
    >
      {children}
    </div>
  );
}
