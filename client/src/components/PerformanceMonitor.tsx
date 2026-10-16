/**
 * Performance monitoring component
 */

import { useEffect } from 'react';
import { initPerformanceOptimizations, measurePerformance } from '../lib/performance';

export const PerformanceMonitor = () => {
  useEffect(() => {
    // Initialize performance optimizations
    initPerformanceOptimizations();

    // Monitor Core Web Vitals
    if (typeof window !== 'undefined' && 'web-vital' in window) {
      // @ts-ignore
      import('web-vitals').then(({ onCLS, onFCP, onLCP, onINP, onTTFB }: any) => {
        onCLS?.(() => {});
        onFCP?.(() => {});
        onLCP?.(() => {});
        onINP?.(() => {});
        onTTFB?.(() => {});
      }).catch(() => {});
    }

    // Monitor bundle loading performance
    measurePerformance('app-initialization', () => {
      // App initialized
    });

    // Monitor image loading
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      img.addEventListener('load', () => {
        // Image loaded
      });
    });

  }, []);

  return null; // This component doesn't render anything
};

// Performance metrics display (for development)
export const PerformanceMetrics = () => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          // Performance entry logged
        });
      });
      
      observer.observe({ entryTypes: ['measure', 'navigation'] });
      
      return () => observer.disconnect();
    }
  }, []);

  return null;
};
