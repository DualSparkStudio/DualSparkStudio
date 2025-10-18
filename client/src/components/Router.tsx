import { Project } from '@shared/schema';
import { useEffect, useState } from 'react';
import Admin from '../pages/Admin';
import Layout from './Layout';
import ProjectsPage from './ProjectsPage';

// Simple router component for handling different pages
const Router = () => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  // Listen for URL changes
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Fetch projects data
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects');
        if (response.ok) {
          const data = await response.json();
          setProjects(data);
        }
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
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
      case '/projects':
        return <ProjectsPage projects={projects} />;
      case '/':
      default:
        return <Layout navigate={navigate} />;
    }
  };

  if (loading && currentPath === '/projects') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return renderRoute();
};

export default Router;
