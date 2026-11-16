import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import { Button } from './ui/button';
import { CONTACT_INFO, SOCIAL_LINKS } from '@/lib/constants';

export const PageFooter = () => {
  const currentYear = new Date().getFullYear();

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-border/40 bg-background/80 backdrop-blur-md pt-12 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Col 1: Studio info */}
          <div className="md:col-span-2 space-y-4">
            <div className="text-xl font-bold">
              <span className="text-primary">Dual</span>
              <span className="text-accent">Spark</span>
              <span className="text-cyan-400">Studio</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
              DualSpark Studio is a Pune-based web and software development studio working with clients everywhere. We have the most experience building resort and villa booking websites.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <Button
                variant="ghost"
                size="sm"
                aria-label="Visit DualSpark Studio GitHub profile"
                onClick={() => window.open(SOCIAL_LINKS.github, '_blank', 'noopener,noreferrer')}
                className="text-muted-foreground hover:text-primary"
              >
                GitHub
              </Button>
              <Button
                variant="ghost"
                size="sm"
                aria-label="Visit DualSpark Studio Instagram profile"
                onClick={() => window.open(SOCIAL_LINKS.instagram, '_blank', 'noopener,noreferrer')}
                className="text-muted-foreground hover:text-primary"
              >
                Instagram
              </Button>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a
                  href="/"
                  onClick={(e) => handleNav(e, '/')}
                  className="hover:text-primary transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  onClick={(e) => handleNav(e, '/about')}
                  className="hover:text-primary transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/work"
                  onClick={(e) => handleNav(e, '/work')}
                  className="hover:text-primary transition-colors"
                >
                  Our Work
                </a>
              </li>
              <li>
                <a
                  href="/resort-villa-websites"
                  onClick={(e) => handleNav(e, '/resort-villa-websites')}
                  className="hover:text-primary transition-colors"
                >
                  Resort &amp; Villa Websites
                </a>
              </li>
              <li>
                <a
                  href="/contact-only"
                  onClick={(e) => handleNav(e, '/contact-only')}
                  className="hover:text-primary transition-colors"
                >
                  Direct Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact & Location */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <FiMapPin className="text-primary flex-shrink-0" />
                <span>{CONTACT_INFO.address.city}, {CONTACT_INFO.address.state}, {CONTACT_INFO.address.country}</span>
              </li>
              <li className="flex items-center gap-2">
                <FiMail className="text-primary flex-shrink-0" />
                <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-primary transition-colors">
                  {CONTACT_INFO.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <FiPhone className="text-primary flex-shrink-0" />
                <span>{CONTACT_INFO.phone}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/40 pt-6 text-center text-xs text-muted-foreground">
          © {currentYear} DualSparkStudio. All rights reserved. Based in Pune, India, and serving clients everywhere.
        </div>
      </div>
    </footer>
  );
};

export default PageFooter;

