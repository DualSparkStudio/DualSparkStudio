import { useCallback } from 'react';
import { useAudio } from '@/lib/stores/useAudio';

/**
 * A custom hook that provides smooth scrolling functionality with improved performance
 * 
 * @returns {Function} scrollToSection - Function to smoothly scroll to a section
 */
export const useSmoothScroll = () => {
  const { playHit } = useAudio();
  
  const scrollToSection = useCallback((sectionId: string, offset = 50) => {
    // Play hit sound if available
    playHit();
    
    // Get the target section
    const section = document.getElementById(sectionId);
    if (!section) return;
    
    // Cache the current scroll position and target position
    const currentPosition = window.scrollY;
    const targetPosition = section.offsetTop - offset;
    
    // Calculate distance and duration based on distance
    const distance = Math.abs(currentPosition - targetPosition);
    // Adjust duration based on scroll distance (faster for short distances)
    const duration = Math.min(1000, Math.max(500, distance / 2));
    
    // Use requestAnimationFrame for smoother animation
    const startTime = performance.now();
    
    // Easing function for smooth animation
    const easeInOutCubic = (t: number): number => 
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    
    function scrollAnimation(currentTime: number) {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const easeProgress = easeInOutCubic(progress);
      
      // Calculate the new scroll position
      const scrollPosition = currentPosition + (targetPosition - currentPosition) * easeProgress;
      
      // Apply the scroll
      window.scrollTo(0, scrollPosition);
      
      // Continue animation if not complete
      if (progress < 1) {
        requestAnimationFrame(scrollAnimation);
      }
    }
    
    // Start the animation
    requestAnimationFrame(scrollAnimation);
  }, [playHit]);
  
  return scrollToSection;
};

export default useSmoothScroll;