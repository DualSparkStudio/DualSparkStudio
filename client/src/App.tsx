import { QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import { lazy, Suspense, useEffect, useState } from 'react';
import Router from './components/Router';
import { Toaster } from './components/ui/sonner';
import './index.css';
import { queryClient } from './lib/queryClient';
import { useAudio } from './lib/stores/useAudio';

// Defer Three.js and 3D canvas so initial DOM (LCP & FCP) paints instantly
const ThreeBackground = lazy(() => import('./components/ThreeBackground'));

const App = () => {
  const [load3D, setLoad3D] = useState(false);
  const { setBackgroundMusic, initSounds } = useAudio();

  useEffect(() => {
    // Schedule 3D background loading after critical content has painted
    if ('requestIdleCallback' in window) {
      const handle = (window as any).requestIdleCallback(() => {
        setLoad3D(true);
      }, { timeout: 1200 });
      return () => (window as any).cancelIdleCallback(handle);
    } else {
      const timer = setTimeout(() => {
        setLoad3D(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    // Initialize audio gently after page settles
    const audioTimer = setTimeout(() => {
      initSounds();
      try {
        const bgMusic = new Audio('/sounds/background.mp3');
        bgMusic.loop = true;
        bgMusic.volume = 0.2;
        setBackgroundMusic(bgMusic);
      } catch {
        // Audio might fail in autoplay-restricted environments
      }
    }, 1500);

    return () => clearTimeout(audioTimer);
  }, [setBackgroundMusic, initSounds]);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="dark">
        <div className="relative min-h-screen overflow-hidden bg-background">
          {/* Deferred 3D background */}
          {load3D && (
            <Suspense fallback={null}>
              <ThreeBackground />
            </Suspense>
          )}

          {/* Main Content rendered immediately */}
          <div className="relative z-10">
            <Router />
          </div>

          {/* Toast notifications */}
          <Toaster position="top-right" />
        </div>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
