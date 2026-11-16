import { useEffect } from 'react';
import { FiCheck, FiArrowRight, FiPhone, FiMail } from 'react-icons/fi';
import PageHeader from '@/components/PageHeader';
import PageFooter from '@/components/PageFooter';

const ResortVillaWebsites = () => {
  useEffect(() => {
    document.title = 'Resort & Villa Booking Websites | DualSpark Studio';

    const setMeta = (selector: string, attr: string, value: string) => {
      const el = document.querySelector(selector);
      if (el) {
        el.setAttribute(attr, value);
      }
    };

    setMeta('meta[name="title"]', 'content', 'Resort & Villa Booking Websites | DualSpark Studio');
    setMeta(
      'meta[name="description"]',
      'content',
      'DualSpark Studio builds websites for villa and resort owners in Lonavala, Mahabaleshwar and Panchgani. We have the most experience building resort and villa booking websites.'
    );
    setMeta('link[rel="canonical"]', 'href', 'https://dualsparkstudio.com/resort-villa-websites');
    setMeta('meta[property="og:title"]', 'content', 'Resort & Villa Booking Websites | DualSpark Studio');
    setMeta(
      'meta[property="og:description"]',
      'content',
      'DualSpark Studio builds websites for villa and resort owners in Lonavala, Mahabaleshwar and Panchgani. We have the most experience building resort and villa booking websites.'
    );
    setMeta('meta[property="og:url"]', 'content', 'https://dualsparkstudio.com/resort-villa-websites');
    setMeta('meta[name="twitter:title"]', 'content', 'Resort & Villa Booking Websites | DualSpark Studio');
    setMeta(
      'meta[name="twitter:description"]',
      'content',
      'DualSpark Studio builds websites for villa and resort owners in Lonavala, Mahabaleshwar and Panchgani. We have the most experience building resort and villa booking websites.'
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
    'Live availability calendar',
    'Online payments via Razorpay',
    'WhatsApp enquiry buttons',
    'Booking admin dashboard',
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <PageHeader currentPath="/resort-villa-websites" />

      <main className="flex-1 container mx-auto px-6 py-16 max-w-4xl space-y-12">
        <header className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Resort &amp; Villa Booking Websites
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            We have the most experience building resort and villa booking websites. We build for villa and resort owners in Lonavala, Mahabaleshwar and Panchgani.
          </p>
        </header>

        <section className="space-y-4 border-t border-border/40 pt-8">
          <h2 className="text-2xl font-semibold tracking-tight">Areas We Work In</h2>
          <p className="text-muted-foreground leading-relaxed">
            We build for villa and resort owners in Lonavala, Mahabaleshwar and Panchgani.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Our work includes a villa website for a client in Lonavala and a resort website for a client in Bhilar, Mahabaleshwar.
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-1">
            <li>Lonavala</li>
            <li>Mahabaleshwar</li>
            <li>Panchgani</li>
          </ul>
          <p className="pt-2">
            <a
              href="/work"
              onClick={(e) => handleNav(e, '/work')}
              className="inline-flex items-center gap-1.5 text-primary hover:underline font-medium text-sm"
            >
              View our work entries <FiArrowRight className="h-4 w-4" />
            </a>
          </p>
        </section>

        <section className="space-y-4 border-t border-border/40 pt-8">
          <h2 className="text-2xl font-semibold tracking-tight">Features we have built for clients include:</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((feature) => (
              <div
                key={feature}
                className="flex items-center gap-3 p-4 rounded-lg border border-border/60 bg-card/40"
              >
                <div className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                  <FiCheck className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium text-foreground">{feature}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4 border-t border-border/40 pt-8">
          <h2 className="text-2xl font-semibold tracking-tight">Contact</h2>
          <div className="space-y-2 text-muted-foreground">
            <p className="flex items-center gap-2">
              <FiPhone className="text-primary flex-shrink-0" />
              <span>Phone / WhatsApp: +91 92702 69875</span>
            </p>
            <p className="flex items-center gap-2">
              <FiPhone className="text-primary flex-shrink-0" />
              <span>Second phone: +91 70571 50584</span>
            </p>
            <p className="flex items-center gap-2">
              <FiMail className="text-primary flex-shrink-0" />
              <span>Email: <a href="mailto:dualsparkstudio@gmail.com" className="hover:text-primary transition-colors">dualsparkstudio@gmail.com</a></span>
            </p>
          </div>
        </section>
      </main>

      <PageFooter />
    </div>
  );
};

export default ResortVillaWebsites;
