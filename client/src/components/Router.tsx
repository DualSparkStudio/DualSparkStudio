import { lazy, Suspense, useEffect, useState } from 'react';
import Layout from './Layout';

// Lazy-load non-critical routes to keep the main homepage bundle lean
const Admin = lazy(() => import('../pages/Admin'));
const ContactButtons = lazy(() => import('../pages/ContactButtons'));
const Testing = lazy(() => import('../pages/Testing'));

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
    switch (currentPath) {
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
      case '/testing':
        return (
          <Suspense fallback={<RouteLoader />}>
            <Testing navigate={navigate} />
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
