import { useEffect, useState } from 'react';
import Admin from '../pages/Admin';
import ContactButtons from '../pages/ContactButtons';
import Layout from './Layout';

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
        return <Admin />;
      case '/contact-only':
        return <ContactButtons />;
      case '/':
      default:
        return <Layout navigate={navigate} />;
    }
  };

  return renderRoute();
};

export default Router;
