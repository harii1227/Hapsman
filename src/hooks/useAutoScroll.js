import { useEffect, useRef } from 'react';

export function useAutoScroll(speed = 0.5) {
  const scrollRef = useRef(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let animationFrameId;
    let isHovered = false;
    let isTouching = false;

    const handleMouseEnter = () => (isHovered = true);
    const handleMouseLeave = () => (isHovered = false);
    const handleTouchStart = () => (isTouching = true);
    const handleTouchEnd = () => (isTouching = false);

    el.addEventListener('mouseenter', handleMouseEnter);
    el.addEventListener('mouseleave', handleMouseLeave);
    el.addEventListener('touchstart', handleTouchStart);
    el.addEventListener('touchend', handleTouchEnd);

    const scroll = () => {
      // Only scroll on mobile sizes or if overflowing, and if not interacting
      if (!isHovered && !isTouching && el.scrollWidth > el.clientWidth) {
        el.scrollLeft += speed;
        // Reset to beginning if we hit the end
        if (el.scrollLeft >= el.scrollWidth - el.clientWidth - 1) {
          el.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    return () => {
      cancelAnimationFrame(animationFrameId);
      el.removeEventListener('mouseenter', handleMouseEnter);
      el.removeEventListener('mouseleave', handleMouseLeave);
      el.removeEventListener('touchstart', handleTouchStart);
      el.removeEventListener('touchend', handleTouchEnd);
    };
  }, [speed]);

  return scrollRef;
}
