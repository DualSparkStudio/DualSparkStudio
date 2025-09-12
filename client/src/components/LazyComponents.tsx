/**
 * Lazy-loaded components for better performance
 */

import { lazy, Suspense } from 'react';

// Lazy load heavy 3D components
export const LazyThreeScene = lazy(() => import('./ThreeScene'));
export const LazyModelLoader = lazy(() => import('./ModelLoader'));
export const LazyServices3D = lazy(() => import('./Services3D'));
export const LazyText3DEffect = lazy(() => import('./Text3DEffect'));
export const LazyParticles = lazy(() => import('./Particles'));
export const LazyShootingStars = lazy(() => import('./ShootingStars'));
export const LazyFloatingObject = lazy(() => import('./FloatingObject'));

// Lazy load other heavy components
export const LazyProjects = lazy(() => import('./Projects'));
export const LazyServices = lazy(() => import('./Services'));
export const LazyContact = lazy(() => import('./Contact'));

// Loading fallback component
export const ComponentLoader = () => (
  <div className="flex items-center justify-center p-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
);

// Higher-order component for lazy loading with Suspense
export const withLazyLoading = <P extends object>(
  Component: React.ComponentType<P>,
  fallback?: React.ReactNode
) => {
  return (props: P) => (
    <Suspense fallback={fallback || <ComponentLoader />}>
      <Component {...props} />
    </Suspense>
  );
};

// Preload components on user interaction
export const preloadComponents = () => {
  // Preload 3D components when user hovers over navigation
  const preloadThreeComponents = () => {
    import('./ThreeScene');
    import('./ModelLoader');
    import('./Services3D');
  };

  // Preload other components when user scrolls
  const preloadOtherComponents = () => {
    import('./Projects');
    import('./Services');
    import('./Contact');
  };

  return {
    preloadThreeComponents,
    preloadOtherComponents
  };
};
