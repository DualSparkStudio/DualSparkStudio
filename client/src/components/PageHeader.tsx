import { useState } from 'react';
import { FiMenu, FiX, FiPhone } from 'react-icons/fi';
import { Button } from './ui/button';
import { CONTACT_INFO } from '@/lib/constants';

interface PageHeaderProps {
  currentPath?: string;
}

export const PageHeader = ({ currentPath = '' }: PageHeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Work', path: '/work' },
    { label: 'Resort & Villa Websites', path: '/resort-villa-websites' },
    { label: 'Contact', path: '/contact-only' },
  ];

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        {/* Brand / Logo */}
        <a
          href="/"
          onClick={(e) => handleNav(e, '/')}
          className="flex items-center gap-2 text-xl font-bold tracking-tight transition-opacity hover:opacity-90"
        >
          <span className="text-primary">Dual</span>
          <span className="text-accent">Spark</span>
          <span className="text-cyan-400">Studio</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {navLinks.map((link) => {
            const isActive = currentPath === link.path;
            return (
              <a
                key={link.path}
                href={link.path}
                onClick={(e) => handleNav(e, link.path)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-primary bg-primary/10'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="/contact-only"
            onClick={(e) => handleNav(e, '/contact-only')}
          >
            <Button size="sm" className="btn-hover-effect">
              <FiPhone className="mr-1.5 h-3.5 w-3.5" />
              Get in Touch
            </Button>
          </a>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="flex md:hidden">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </Button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-b border-border bg-background/95 backdrop-blur-sm md:hidden px-6 py-4 space-y-2">
          {navLinks.map((link) => {
            const isActive = currentPath === link.path;
            return (
              <a
                key={link.path}
                href={link.path}
                onClick={(e) => handleNav(e, link.path)}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isActive
                    ? 'text-primary bg-primary/10'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                {link.label}
              </a>
            );
          })}
          <div className="pt-2">
            <a
              href="/contact-only"
              onClick={(e) => handleNav(e, '/contact-only')}
              className="block"
            >
              <Button size="sm" className="w-full">
                <FiPhone className="mr-1.5 h-3.5 w-3.5" />
                Get in Touch
              </Button>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default PageHeader;

