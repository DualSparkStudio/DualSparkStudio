import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiLayers, FiCode, FiCpu, FiExternalLink, FiMail, FiPhone, FiBriefcase } from 'react-icons/fi';
import PageHeader from '@/components/PageHeader';
import PageFooter from '@/components/PageFooter';
import { Button } from '@/components/ui/button';
import { CONTACT_INFO } from '@/lib/constants';

const Work = () => {
  useEffect(() => {
    document.title = 'Our Work & Case Studies | DualSpark Studio';

    const setMeta = (selector: string, attr: string, value: string) => {
      const el = document.querySelector(selector);
      if (el) {
        el.setAttribute(attr, value);
      }
    };

    setMeta('meta[name="title"]', 'content', 'Our Work & Case Studies | DualSpark Studio');
    setMeta(
      'meta[name="description"]',
      'content',
      'Explore web and software development projects by DualSpark Studio. High-performance booking systems, bespoke software, and web applications.'
    );
    setMeta('link[rel="canonical"]', 'href', 'https://dualsparkstudio.com/work');
    setMeta('meta[property="og:title"]', 'content', 'Our Work & Case Studies | DualSpark Studio');
    setMeta(
      'meta[property="og:description"]',
      'content',
      'Explore web and software development projects by DualSpark Studio. High-performance booking systems, bespoke software, and web applications.'
    );
    setMeta('meta[property="og:url"]', 'content', 'https://dualsparkstudio.com/work');
    setMeta('meta[name="twitter:title"]', 'content', 'Our Work & Case Studies | DualSpark Studio');
    setMeta(
      'meta[name="twitter:description"]',
      'content',
      'Explore web and software development projects by DualSpark Studio. High-performance booking systems, bespoke software, and web applications.'
    );
    setMeta('meta[name="twitter:url"]', 'content', 'https://dualsparkstudio.com/work');
  }, []);

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <PageHeader currentPath="/work" />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-b from-background via-muted/10 to-background border-b border-border/40">
          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20 mb-6">
                <FiBriefcase className="h-3.5 w-3.5" />
                <span>Portfolio &amp; Solutions</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                Our <span className="text-primary">Work</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                DualSpark Studio is a Pune-based web and software development studio engineering bespoke software and specialized resort and villa booking websites.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Focus Areas / Project Categories */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6 max-w-5xl space-y-12">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
                Specialized Engineering Solutions
              </h2>
              <p className="text-muted-foreground text-sm md:text-base">
                We engineer digital solutions focusing on performance, clean architecture, and practical business requirements.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Card 1: Resort & Villa */}
              <div className="p-8 rounded-xl border border-border/60 bg-card/40 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                    <FiLayers className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold">Resort &amp; Villa Websites</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Custom websites built specifically for luxury resorts, boutique villas, and vacation rentals with integrated direct booking engines to accept commission-free direct reservations.
                  </p>
                  <ul className="text-xs text-muted-foreground space-y-1.5 pt-2">
                    <li className="flex items-center gap-1.5">
                      <span className="h-1 w-1 rounded-full bg-primary" />
                      Direct reservation engine
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="h-1 w-1 rounded-full bg-primary" />
                      Real-time availability calendars
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="h-1 w-1 rounded-full bg-primary" />
                      Multi-currency payment integration
                    </li>
                  </ul>
                </div>
                <div>
                  <a href="/resort-villa-websites" onClick={(e) => handleNav(e, '/resort-villa-websites')}>
                    <Button variant="outline" size="sm" className="w-full">
                      Learn More <FiExternalLink className="ml-1.5 h-3.5 w-3.5" />
                    </Button>
                  </a>
                </div>
              </div>

              {/* Card 2: Custom Cloud Software */}
              <div className="p-8 rounded-xl border border-border/60 bg-card/40 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="h-12 w-12 rounded-lg bg-accent/10 text-accent flex items-center justify-center">
                    <FiCode className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold">Custom Web Software</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Tailored business software, backend architectures, customer portals, and admin management dashboards engineered using TypeScript, Node.js, and PostgreSQL.
                  </p>
                  <ul className="text-xs text-muted-foreground space-y-1.5 pt-2">
                    <li className="flex items-center gap-1.5">
                      <span className="h-1 w-1 rounded-full bg-accent" />
                      Backend platform for The Lead Hunter Club
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="h-1 w-1 rounded-full bg-accent" />
                      Secure REST APIs &amp; database schemas
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="h-1 w-1 rounded-full bg-accent" />
                      Tailored management dashboards
                    </li>
                  </ul>
                </div>
                <div>
                  <a href="/contact-only" onClick={(e) => handleNav(e, '/contact-only')}>
                    <Button variant="outline" size="sm" className="w-full">
                      Discuss Software <FiExternalLink className="ml-1.5 h-3.5 w-3.5" />
                    </Button>
                  </a>
                </div>
              </div>

              {/* Card 3: 3D Web & Interactive */}
              <div className="p-8 rounded-xl border border-border/60 bg-card/40 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="h-12 w-12 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
                    <FiCpu className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold">3D Web Experiences</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Three.js and WebGL digital presentations running natively inside the browser, creating memorable brand interactions without compromising load performance.
                  </p>
                  <ul className="text-xs text-muted-foreground space-y-1.5 pt-2">
                    <li className="flex items-center gap-1.5">
                      <span className="h-1 w-1 rounded-full bg-cyan-400" />
                      Custom Three.js particle systems
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="h-1 w-1 rounded-full bg-cyan-400" />
                      GLSL shader effects &amp; 3D scenes
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="h-1 w-1 rounded-full bg-cyan-400" />
                      Smooth mobile-compatible rendering
                    </li>
                  </ul>
                </div>
                <div>
                  <a href="/contact-only" onClick={(e) => handleNav(e, '/contact-only')}>
                    <Button variant="outline" size="sm" className="w-full">
                      Inquire About 3D <FiExternalLink className="ml-1.5 h-3.5 w-3.5" />
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Portfolio Notice & Direct Consultation */}
        <section className="py-16 bg-muted/20 border-y border-border/40">
          <div className="container mx-auto px-6 max-w-4xl text-center">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
              Curated Client Case Studies
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
              We are actively curating and documenting our client case studies. If you would like a private walkthrough of our past work, code samples, or architecture demonstrations, reach out to our team directly.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="/contact-only" onClick={(e) => handleNav(e, '/contact-only')}>
                <Button className="w-full sm:w-auto">
                  Contact Us For Case Studies
                </Button>
              </a>
              <a href="/about" onClick={(e) => handleNav(e, '/about')}>
                <Button variant="outline" className="w-full sm:w-auto">
                  About DualSpark Studio
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6 max-w-3xl text-center">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
              Have a Project in Mind?
            </h2>
            <p className="text-muted-foreground mb-8">
              Based in Pune, India, and serving clients everywhere. We are ready to discuss your requirements.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border bg-card hover:bg-muted text-sm font-medium transition-colors"
              >
                <FiMail className="text-primary" />
                {CONTACT_INFO.email}
              </a>
              <a
                href={`tel:+919270269875`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border bg-card hover:bg-muted text-sm font-medium transition-colors"
              >
                <FiPhone className="text-primary" />
                +91 9270269875
              </a>
            </div>
          </div>
        </section>
      </main>

      <PageFooter />
    </div>
  );
};

export default Work;

