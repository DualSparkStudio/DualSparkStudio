import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiCode, FiLayers, FiMapPin, FiMail, FiPhone, FiCheckCircle, FiUsers, FiCpu } from 'react-icons/fi';
import PageHeader from '@/components/PageHeader';
import PageFooter from '@/components/PageFooter';
import { Button } from '@/components/ui/button';
import { CONTACT_INFO } from '@/lib/constants';

const About = () => {
  useEffect(() => {
    document.title = 'About Us | DualSpark Studio — Pune Web & Software Development';

    const setMeta = (selector: string, attr: string, value: string) => {
      const el = document.querySelector(selector);
      if (el) {
        el.setAttribute(attr, value);
      }
    };

    setMeta('meta[name="title"]', 'content', 'About Us | DualSpark Studio — Pune Web & Software Development');
    setMeta(
      'meta[name="description"]',
      'content',
      'DualSpark Studio is a Pune-based web and software development studio founded by Yash Vilas Karanjule and Sahil Ramchandra Dhanawade, serving clients everywhere.'
    );
    setMeta('link[rel="canonical"]', 'href', 'https://dualsparkstudio.com/about');
    setMeta('meta[property="og:title"]', 'content', 'About Us | DualSpark Studio');
    setMeta(
      'meta[property="og:description"]',
      'content',
      'DualSpark Studio is a Pune-based web and software development studio founded by Yash Vilas Karanjule and Sahil Ramchandra Dhanawade, serving clients everywhere.'
    );
    setMeta('meta[property="og:url"]', 'content', 'https://dualsparkstudio.com/about');
    setMeta('meta[name="twitter:title"]', 'content', 'About Us | DualSpark Studio');
    setMeta(
      'meta[name="twitter:description"]',
      'content',
      'DualSpark Studio is a Pune-based web and software development studio founded by Yash Vilas Karanjule and Sahil Ramchandra Dhanawade, serving clients everywhere.'
    );
    setMeta('meta[name="twitter:url"]', 'content', 'https://dualsparkstudio.com/about');
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
      <PageHeader currentPath="/about" />

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
                <FiUsers className="h-3.5 w-3.5" />
                <span>Our Story &amp; Team</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                About <span className="text-primary">DualSpark</span> Studio
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                DualSpark Studio is a Pune-based web and software development studio founded by Yash Vilas Karanjule and Sahil Ramchandra Dhanawade, serving clients everywhere.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Founding & Leadership */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6 max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4 tracking-tight">
                  Founded on Technical Precision and Practical Execution
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Founded in January 2025 as a dedicated partnership firm in Pune, Maharashtra, India, DualSpark Studio was established to provide direct, high-caliber engineering for businesses seeking customized digital solutions.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  We bridge the gap between creative visual design and scalable system architecture. Whether engineering high-performance booking engines for luxury hospitality retreats or building custom full-stack software platforms, we focus on code that performs reliably and drives concrete business outcomes.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href="/work" onClick={(e) => handleNav(e, '/work')}>
                    <Button variant="outline" className="w-full sm:w-auto">
                      Explore Our Work
                    </Button>
                  </a>
                  <a href="/contact-only" onClick={(e) => handleNav(e, '/contact-only')}>
                    <Button className="w-full sm:w-auto">
                      Contact Founders
                    </Button>
                  </a>
                </div>
              </div>

              <div className="space-y-6">
                <div className="p-6 rounded-xl border border-border/60 bg-card/40 backdrop-blur-sm">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                      YK
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">Yash Vilas Karanjule</h3>
                      <p className="text-sm text-primary">Founder &amp; Partner</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Leads technical architecture, frontend engineering, and specialized development for resort and villa reservation systems.
                  </p>
                </div>

                <div className="p-6 rounded-xl border border-border/60 bg-card/40 backdrop-blur-sm">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold text-lg">
                      SD
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">Sahil Ramchandra Dhanawade</h3>
                      <p className="text-sm text-accent">Founder &amp; Partner</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Directs software engineering, cloud systems, and database infrastructure for custom web applications.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Pillars */}
        <section className="py-16 bg-muted/20 border-y border-border/40">
          <div className="container mx-auto px-6 max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">
                Core Domains of Expertise
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">
                Engineering modern digital solutions built with modern technology stacks.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-xl border border-border/60 bg-background space-y-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                  <FiLayers className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-lg">Resort &amp; Villa Booking Platforms</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We have the most experience building custom resort and villa websites with integrated direct booking engines, real-time availability calendars, and payment processing.
                </p>
              </div>

              <div className="p-6 rounded-xl border border-border/60 bg-background space-y-3">
                <div className="h-10 w-10 rounded-lg bg-accent/10 text-accent flex items-center justify-center">
                  <FiCode className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-lg">Custom Web &amp; Cloud Software</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Full-stack software engineering using React, TypeScript, Node.js, Express, and PostgreSQL for business management tools and custom SaaS platforms.
                </p>
              </div>

              <div className="p-6 rounded-xl border border-border/60 bg-background space-y-3">
                <div className="h-10 w-10 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
                  <FiCpu className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-lg">3D &amp; Interactive WebGL</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Bespoke 3D web experiences and Three.js implementations designed for modern desktop and mobile browsers.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Location & Direct Contact Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6 max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 text-primary text-sm font-medium mb-4">
              <FiMapPin className="h-4 w-4" />
              <span>Pune, Maharashtra, India</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              DualSpark Studio is based in Pune, India, and serves clients everywhere.
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8">
              Reach out directly to discuss your upcoming website, software project, or booking engine integration.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
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

export default About;

