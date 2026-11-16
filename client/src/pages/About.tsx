import { useEffect } from 'react';
import { FiPhone, FiMail, FiMapPin, FiGithub } from 'react-icons/fi';
import PageHeader from '@/components/PageHeader';
import PageFooter from '@/components/PageFooter';

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
      'DualSpark Studio is a partnership firm founded in January 2025, based in Pune, Maharashtra. Remote, serves clients everywhere.'
    );
    setMeta('link[rel="canonical"]', 'href', 'https://dualsparkstudio.com/about');
    setMeta('meta[property="og:title"]', 'content', 'About Us | DualSpark Studio');
    setMeta(
      'meta[property="og:description"]',
      'content',
      'DualSpark Studio is a partnership firm founded in January 2025, based in Pune, Maharashtra. Remote, serves clients everywhere.'
    );
    setMeta('meta[property="og:url"]', 'content', 'https://dualsparkstudio.com/about');
    setMeta('meta[name="twitter:title"]', 'content', 'About Us | DualSpark Studio');
    setMeta(
      'meta[name="twitter:description"]',
      'content',
      'DualSpark Studio is a partnership firm founded in January 2025, based in Pune, Maharashtra. Remote, serves clients everywhere.'
    );
    setMeta('meta[name="twitter:url"]', 'content', 'https://dualsparkstudio.com/about');
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <PageHeader currentPath="/about" />

      <main className="flex-1 container mx-auto px-6 py-16 max-w-4xl space-y-12">
        <header className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            About DualSpark Studio
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            DualSpark Studio is a partnership firm founded in January 2025, based in Pune, Maharashtra. Remote, serves clients everywhere.
          </p>
        </header>

        <section className="space-y-4 border-t border-border/40 pt-8">
          <h2 className="text-2xl font-semibold tracking-tight">Partners</h2>
          <ul className="list-disc list-inside text-muted-foreground space-y-1">
            <li>Yash Vilas Karanjule</li>
            <li>Sahil Ramchandra Dhanawade</li>
          </ul>
        </section>

        <section className="space-y-4 border-t border-border/40 pt-8">
          <h2 className="text-2xl font-semibold tracking-tight">Services</h2>
          <p className="text-muted-foreground leading-relaxed">
            We provide website and software development. We have the most experience building resort and villa booking websites.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Areas we work in include Lonavala, Mahabaleshwar, and Panchgani.
          </p>
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
            <p className="flex items-center gap-2">
              <FiGithub className="text-primary flex-shrink-0" />
              <span>GitHub: <a href="https://github.com/DualSparkStudio" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">https://github.com/DualSparkStudio</a></span>
            </p>
            <p className="flex items-center gap-2">
              <FiMapPin className="text-primary flex-shrink-0" />
              <span>Location: Pune, Maharashtra (Remote, serves clients everywhere)</span>
            </p>
          </div>
        </section>
      </main>

      <PageFooter />
    </div>
  );
};

export default About;
