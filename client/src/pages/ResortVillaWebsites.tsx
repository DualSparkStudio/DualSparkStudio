import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiCalendar, FiCreditCard, FiImage, FiSmartphone, FiShield, FiDollarSign, FiMail, FiPhone, FiCheck } from 'react-icons/fi';
import PageHeader from '@/components/PageHeader';
import PageFooter from '@/components/PageFooter';
import { Button } from '@/components/ui/button';
import { CONTACT_INFO } from '@/lib/constants';

const ResortVillaWebsites = () => {
  useEffect(() => {
    document.title = 'Resort & Villa Website Development | DualSpark Studio';

    const setMeta = (selector: string, attr: string, value: string) => {
      const el = document.querySelector(selector);
      if (el) {
        el.setAttribute(attr, value);
      }
    };

    setMeta('meta[name="title"]', 'content', 'Resort & Villa Website Development | DualSpark Studio');
    setMeta(
      'meta[name="description"]',
      'content',
      'Custom resort and villa booking websites built with direct reservation engines, real-time availability, and multi-currency payments by DualSpark Studio in Pune.'
    );
    setMeta('link[rel="canonical"]', 'href', 'https://dualsparkstudio.com/resort-villa-websites');
    setMeta('meta[property="og:title"]', 'content', 'Resort & Villa Website Development | DualSpark Studio');
    setMeta(
      'meta[property="og:description"]',
      'content',
      'Custom resort and villa booking websites built with direct reservation engines, real-time availability, and multi-currency payments by DualSpark Studio in Pune.'
    );
    setMeta('meta[property="og:url"]', 'content', 'https://dualsparkstudio.com/resort-villa-websites');
    setMeta('meta[name="twitter:title"]', 'content', 'Resort & Villa Website Development | DualSpark Studio');
    setMeta(
      'meta[name="twitter:description"]',
      'content',
      'Custom resort and villa booking websites built with direct reservation engines, real-time availability, and multi-currency payments by DualSpark Studio in Pune.'
    );
    setMeta('meta[name="twitter:url"]', 'content', 'https://dualsparkstudio.com/resort-villa-websites');
  }, []);

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const features = [
    {
      icon: <FiDollarSign className="h-6 w-6 text-primary" />,
      title: 'Commission-Free Direct Reservations',
      description:
        'Eliminate high third-party OTA commissions by providing guests with a direct booking engine on your official website.',
    },
    {
      icon: <FiCalendar className="h-6 w-6 text-primary" />,
      title: 'Real-Time Availability Calendar',
      description:
        'Live booking calendars that sync room and villa availability automatically, preventing double bookings and showing accurate nightly rates.',
    },
    {
      icon: <FiCreditCard className="h-6 w-6 text-primary" />,
      title: 'Multi-Currency Secure Payments',
      description:
        'Direct payment gateway integrations supporting credit cards, UPI, net banking, and international currencies with instant booking confirmations.',
    },
    {
      icon: <FiImage className="h-6 w-6 text-primary" />,
      title: 'High-Resolution Visual Showcase',
      description:
        'Fast-loading visual galleries, floor plans, amenity lists, and property photography presented in a modern, responsive layout.',
    },
    {
      icon: <FiSmartphone className="h-6 w-6 text-primary" />,
      title: 'Mobile-First Responsive Experience',
      description:
        'Engineered specifically for smartphone travelers with lightweight, intuitive reservation flows on all screen sizes.',
    },
    {
      icon: <FiShield className="h-6 w-6 text-primary" />,
      title: 'Property Management & Admin Control',
      description:
        'Easy-to-use admin dashboard to adjust seasonal rates, manage room inventory, view customer reservations, and block dates.',
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <PageHeader currentPath="/resort-villa-websites" />

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
                <FiCalendar className="h-3.5 w-3.5" />
                <span>Hospitality &amp; Luxury Stays</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                Resort &amp; Villa <span className="text-primary">Booking Websites</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                We have the most experience building custom resort and villa booking websites with direct reservation engines and real-time availability.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Value Proposition */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6 max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4 tracking-tight">
                  Take Control of Your Direct Reservations
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Third-party online travel agencies typically charge between 15% and 25% for every booking. DualSpark Studio engineers tailored booking websites that empower resort and villa owners to accept reservations directly, keeping full revenue and establishing a direct line of communication with guests.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  From single private luxury villas to multi-property boutique resorts, our solutions are built with custom code tailored to your exact property setup, amenities, and rate structure.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href="/contact-only" onClick={(e) => handleNav(e, '/contact-only')}>
                    <Button className="w-full sm:w-auto">
                      Get a Booking Website Quote
                    </Button>
                  </a>
                  <a href="/work" onClick={(e) => handleNav(e, '/work')}>
                    <Button variant="outline" className="w-full sm:w-auto">
                      View Our Work
                    </Button>
                  </a>
                </div>
              </div>

              <div className="bg-card/40 border border-border/60 rounded-xl p-8 space-y-4">
                <h3 className="text-lg font-semibold text-foreground mb-2">Key Advantages for Property Owners</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="h-5 w-5 rounded-full bg-primary/10 text-primary flex items-center justify-center mt-0.5 flex-shrink-0">
                      <FiCheck className="h-3.5 w-3.5" />
                    </div>
                    <span className="text-sm text-muted-foreground">Keep 100% of room rates with zero commission cuts on direct bookings.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-5 w-5 rounded-full bg-primary/10 text-primary flex items-center justify-center mt-0.5 flex-shrink-0">
                      <FiCheck className="h-3.5 w-3.5" />
                    </div>
                    <span className="text-sm text-muted-foreground">Direct guest data collection for repeat marketing, loyalty, and special offers.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-5 w-5 rounded-full bg-primary/10 text-primary flex items-center justify-center mt-0.5 flex-shrink-0">
                      <FiCheck className="h-3.5 w-3.5" />
                    </div>
                    <span className="text-sm text-muted-foreground">Custom rate rules for weekends, peak seasons, holiday periods, and long stays.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-5 w-5 rounded-full bg-primary/10 text-primary flex items-center justify-center mt-0.5 flex-shrink-0">
                      <FiCheck className="h-3.5 w-3.5" />
                    </div>
                    <span className="text-sm text-muted-foreground">High-resolution imagery showcasing private pools, lush landscapes, and interior luxury.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Grid */}
        <section className="py-16 bg-muted/20 border-y border-border/40">
          <div className="container mx-auto px-6 max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">
                Built-In Engineering Features
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">
                Everything required to present your property, take reservations, and manage guest bookings seamlessly.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="p-6 rounded-xl border border-border/60 bg-background space-y-3"
                >
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold text-base text-foreground">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6 max-w-3xl text-center">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
              Ready to Launch Your Direct Booking Platform?
            </h2>
            <p className="text-muted-foreground mb-8">
              DualSpark Studio is based in Pune, India, and serves clients everywhere. Connect with our founders to review your property requirements and receive a detailed proposal.
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

export default ResortVillaWebsites;

