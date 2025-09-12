/**
 * Performance monitoring component
 */

import { useEffect } from 'react';
import { measurePerformance, initPerformanceOptimizations } from '../lib/performance';

export const PerformanceMonitor = () => {
  useEffect(() => {
    // Initialize performance optimizations
    initPerformanceOptimizations();

    // Monitor Core Web Vitals
    if ('web-vital' in window) {
      import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        getCLS(console.log);
        getFID(console.log);
        getFCP(console.log);
        getLCP(console.log);
        getTTFB(console.log);
      });
    }

    // Monitor bundle loading performance
    measurePerformance('app-initialization', () => {
      console.log('App initialized');
    });

    // Monitor image loading
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      img.addEventListener('load', () => {
        console.log(`Image loaded: ${img.src}`);
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
          console.log(`${entry.name}: ${entry.duration}ms`);
        });
      });
      
      observer.observe({ entryTypes: ['measure', 'navigation'] });
      
      return () => observer.disconnect();
    }
  }, []);

  return null;
};
