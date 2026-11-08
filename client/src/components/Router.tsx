import { lazy, Suspense, useEffect, useState } from 'react';
import Layout from './Layout';

// Lazy-load non-critical routes to keep the main homepage bundle lean
const Admin = lazy(() => import('../pages/Admin'));
const ContactButtons = lazy(() => import('../pages/ContactButtons'));
const About = lazy(() => import('../pages/About'));
const Work = lazy(() => import('../pages/Work'));
const ResortVillaWebsites = lazy(() => import('../pages/ResortVillaWebsites'));

const RouteLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

// Simple router component for handling different pages
const Router = () => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  // Listen for URL changes
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Navigation function
  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
  };

  // Route rendering
  const renderRoute = () => {
    const normalizedPath =
      currentPath.length > 1 && currentPath.endsWith('/')
        ? currentPath.slice(0, -1)
        : currentPath;

    switch (normalizedPath) {
      case '/admin':
        return (
          <Suspense fallback={<RouteLoader />}>
            <Admin />
          </Suspense>
        );
      case '/contact-only':
        return (
          <Suspense fallback={<RouteLoader />}>
            <ContactButtons />
          </Suspense>
        );
      case '/about':
        return (
          <Suspense fallback={<RouteLoader />}>
            <About />
          </Suspense>
        );
      case '/work':
        return (
          <Suspense fallback={<RouteLoader />}>
            <Work />
          </Suspense>
        );
      case '/resort-villa-websites':
        return (
          <Suspense fallback={<RouteLoader />}>
            <ResortVillaWebsites />
          </Suspense>
        );
      case '/':
      default:
        return <Layout navigate={navigate} />;
    }
  };

  return renderRoute();
};

export default Router;
