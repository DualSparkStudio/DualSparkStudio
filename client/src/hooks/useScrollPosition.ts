import { useState, useEffect } from 'react';

interface ScrollPosition {
  scrollX: number;
  scrollY: number;
  scrollDirection: 'up' | 'down' | 'none';
  previousScrollY: number;
}

const useScrollPosition = (): ScrollPosition => {
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
    scrollX: 0,
    scrollY: 0,
    scrollDirection: 'none',
    previousScrollY: 0,
  });

  useEffect(() => {
    let ticking = false;
    let lastScrollY = window.scrollY;

    const updateScrollPosition = () => {
      const currentScrollY = window.scrollY;
      const currentScrollX = window.scrollX;
      
      const scrollDirection = 
        currentScrollY > lastScrollY ? 'down' :
        currentScrollY < lastScrollY ? 'up' : 'none';

      setScrollPosition({
        scrollY: currentScrollY,
        scrollX: currentScrollX,
        scrollDirection,
        previousScrollY: lastScrollY,
      });

      lastScrollY = currentScrollY;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        // Use requestAnimationFrame to optimize performance
        window.requestAnimationFrame(updateScrollPosition);
        ticking = true;
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', onScroll);

    // Set initial position
    updateScrollPosition();

    // Cleanup on unmount
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return scrollPosition;
};

export default useScrollPosition;
