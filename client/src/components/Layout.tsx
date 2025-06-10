import useSmoothScroll from '@/hooks/useSmoothScroll';
import { useAudio } from '@/lib/stores/useAudio';
import { AnimatePresence, motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useCallback, useEffect, useState } from 'react';
import { FiArrowUp, FiMoon, FiSun } from 'react-icons/fi';
import { toast } from 'sonner';
import Contact from './Contact';
import Hero from './Hero';
import PageTransition from './PageTransition';
import Projects from './Projects';
import Services from './Services';
import { Button } from './ui/button';

const Layout = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { backgroundMusic, isMuted, toggleMute, playHit } = useAudio();
  const [pageTransition, setPageTransition] = useState({
    isVisible: false,
    direction: 'up',
    nextSection: ''
  });

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 100);
      
      // Determine active section based on scroll position
      const sections = document.querySelectorAll('section');
      let currentSection = activeSection;
      
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
          currentSection = section.id;
        }
      });
      
      if (currentSection !== activeSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  // Use our custom smooth scrolling hook
  const smoothScrollTo = useSmoothScroll();
  
  // Enhanced scroll with transition effects
  const scrollToSectionWithTransition = useCallback((sectionId: string) => {
    // Close mobile menu if open
    setMenuOpen(false);
    
    // Update the active section immediately
    setActiveSection(sectionId);
    
    // Perform the scroll immediately
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  // Toggle music playing
  const handleAudioToggle = useCallback(() => {
    if (backgroundMusic) {
      if (isMuted) {
        backgroundMusic.play().catch(() => {
          toast.error('Audio playback failed. Please interact with the page first.');
        });
      } else {
        backgroundMusic.pause();
      }
      toggleMute();
    }
  }, [backgroundMusic, isMuted, toggleMute]);

  // Initialize audio
  useEffect(() => {
    if (backgroundMusic && !isMuted) {
      // We need user interaction before playing audio
      const handleFirstInteraction = () => {
        backgroundMusic.play().catch(e => console.error('Audio play failed:', e));
        document.removeEventListener('click', handleFirstInteraction);
      };
      document.addEventListener('click', handleFirstInteraction);
      
      return () => {
        document.removeEventListener('click', handleFirstInteraction);
      };
    }
  }, [backgroundMusic, isMuted]);

  return (
    <div className="min-h-screen font-sans text-foreground">
      {/* Header with Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300 backdrop-blur-md bg-background/70">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold"
            onClick={() => scrollToSectionWithTransition('hero')}
            role="button"
            tabIndex={0}
          >
            <span className="text-primary">Dual</span>
            <span className="text-accent">Spark</span>
            <span className="text-cyan-400">Studio</span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-4">
            {['home', 'projects', 'services', 'contact'].map((section) => (
              <Button
                key={section}
                onClick={() => {
                  if (section === 'home') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  } else {
                    scrollToSectionWithTransition(section);
                  }
                }}
                variant={activeSection === section ? "default" : "ghost"}
                size="sm"
                className="font-medium"
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </Button>
            ))}
            
            <Button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              variant="ghost"
              size="icon"
              title={theme === 'dark' ? "Switch to light mode" : "Switch to dark mode"}
            >
              {theme === 'dark' ? <FiSun size={18} /> : <FiMoon size={18} />}
            </Button>
          </nav>

          {/* Mobile Navigation Toggle */}
          <div className="md:hidden flex items-center">
            <Button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              variant="ghost"
              size="icon"
              className="mr-2"
            >
              {theme === 'dark' ? <FiSun size={18} /> : <FiMoon size={18} />}
            </Button>
          </div>
        </div>
      </header>

      {/* Scroll to Top Button */}
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-8 right-8 z-50 p-3 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-colors ${
          showScrollTop ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <FiArrowUp size={24} />
      </motion.button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 mt-16 bg-background/95 backdrop-blur-sm"
          >
            <div className="container mx-auto p-6 flex flex-col items-center space-y-6 pt-10">
              {['hero', 'projects', 'services', 'contact'].map((section) => (
                <Button
                  key={section}
                  onClick={() => scrollToSectionWithTransition(section)}
                  variant={activeSection === section ? "default" : "ghost"}
                  size="lg"
                  className="w-full justify-center"
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </Button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page Transition Effect */}
      <PageTransition 
        isVisible={pageTransition.isVisible} 
        direction={pageTransition.direction as 'up' | 'down' | 'left' | 'right'}
      />

      {/* Main Content */}
      <main className="relative z-10">
        <Hero />
        <Projects />
        <Services />
        <Contact />
      </main>

      {/* Footer */}
      <footer className="relative z-10 bg-background/80 backdrop-blur-md py-8 border-t border-border">
        <div className="container mx-auto px-6 text-center">
          <p className="text-muted-foreground">
            © {new Date().getFullYear()} DualSparkStudio. All rights reserved.
          </p>
          <div className="mt-4 flex justify-center space-x-6">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => {
                playHit();
                window.open('https://www.linkedin.com/in/dualspark-studio-a50757363', '_blank');
              }}
              className="text-muted-foreground hover:text-primary transition-colors duration-200 btn-hover-effect"
            >
              LinkedIn
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => {
                playHit();
                window.open('https://github.com/dualsparkstudio', '_blank');
              }}
              className="text-muted-foreground hover:text-primary transition-colors duration-200 btn-hover-effect"
            >
              GitHub
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => {
                playHit();
                window.open('https://www.linkedin.com/in/dualspark-studio-a50757363', '_blank');
              }}
              className="text-muted-foreground hover:text-primary transition-colors duration-200 btn-hover-effect"
            >
              Instagram
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
