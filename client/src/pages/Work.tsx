import { useEffect } from 'react';
import { FiExternalLink } from 'react-icons/fi';
import PageHeader from '@/components/PageHeader';
import PageFooter from '@/components/PageFooter';

const Work = () => {
  useEffect(() => {
    document.title = 'Our Work | DualSpark Studio';

    const setMeta = (selector: string, attr: string, value: string) => {
      const el = document.querySelector(selector);
      if (el) {
        el.setAttribute(attr, value);
      }
    };

    setMeta('meta[name="title"]', 'content', 'Our Work | DualSpark Studio');
    setMeta(
      'meta[name="description"]',
      'content',
      'Website and software development projects by DualSpark Studio.'
    );
    setMeta('link[rel="canonical"]', 'href', 'https://dualsparkstudio.com/work');
    setMeta('meta[property="og:title"]', 'content', 'Our Work | DualSpark Studio');
    setMeta(
      'meta[property="og:description"]',
      'content',
      'Website and software development projects by DualSpark Studio.'
    );
    setMeta('meta[property="og:url"]', 'content', 'https://dualsparkstudio.com/work');
    setMeta('meta[name="twitter:title"]', 'content', 'Our Work | DualSpark Studio');
    setMeta(
      'meta[name="twitter:description"]',
      'content',
      'Website and software development projects by DualSpark Studio.'
    );
    setMeta('meta[name="twitter:url"]', 'content', 'https://dualsparkstudio.com/work');
  }, []);

  const clients = [
    {
      name: 'Lonavala Stays',
      description: 'Luxury private pool villa booking platform in Lonavala with real-time reservation inquiries and curated villa showcases.',
      role: 'Website Development & Booking Flow',
      category: 'Resort & Villa Websites',
      image: '/images/projects/lonavala-stays.jpg',
      technologies: ['Website Development', 'Booking System', 'Razorpay'],
      link: 'https://lonavalastays.in/',
    },
    {
      name: 'Brick & Beam Villa',
      description: 'Boutique luxury villa website for a 4BHK private estate in Bhilar, Mahabaleshwar with immersive visual galleries and direct booking.',
      role: 'Custom Web Development & UI Design',
      category: 'Resort & Villa Websites',
      image: '/images/projects/brick-and-beam.jpg',
      technologies: ['Website Development', 'Responsive Design', 'UI/UX'],
      link: 'https://brickandbeamvilla.netlify.app/',
    },
    {
      name: 'Grand Valley Resort',
      description: 'Full-featured resort website for a luxury destination in Bhilar, Mahabaleshwar showcasing deluxe accommodations and amenities.',
      role: 'Full-Stack Web Development',
      category: 'Resort & Villa Websites',
      image: '/images/projects/grand-valley-resort.jpg',
      technologies: ['Website Development', 'Resort Website', 'Booking Engine'],
      link: 'https://grandvalleyresorts.com/',
    },
    {
      name: 'The Lead Hunter Club',
      description: 'High-performance backend engineering, REST API architecture, and automated data pipelines powering real-time lead discovery.',
      role: 'Backend Engineering & API Architecture',
      category: 'Software Development',
      image: '/images/projects/lead-hunter-app.jpg',
      technologies: ['Backend Engineering', 'REST APIs', 'Database Architecture'],
      link: 'https://www.theleadhunterclub.com/',
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <PageHeader currentPath="/work" />

      <main className="flex-1 container mx-auto px-6 py-16 max-w-5xl space-y-12">
        <header className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Our Work
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Website and software development projects by DualSpark Studio.
          </p>
        </header>

        <section className="space-y-6 border-t border-border/40 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {clients.map((client) => (
              <article
                key={client.name}
                className="overflow-hidden rounded-xl border border-border/60 bg-card/40 hover:border-primary/50 transition-all duration-300 flex flex-col group shadow-sm hover:shadow-md"
              >
                {client.image && (
                  <div className="relative overflow-hidden h-52 bg-muted/30">
                    <img
                      src={client.image}
                      alt={`${client.name} preview`}
                      loading="lazy"
                      decoding="async"
                      width="600"
                      height="350"
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
                      {client.link && (
                        <a
                          href={client.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-medium text-white bg-primary px-3 py-1.5 rounded-full shadow hover:bg-primary/90 transition-colors"
                          aria-label={`Visit ${client.name}`}
                        >
                          Visit Live Site <FiExternalLink className="h-3.5 w-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                )}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span className="inline-block px-2 py-0.5 text-xs font-medium text-primary bg-primary/10 rounded mb-2">
                          {client.category}
                        </span>
                        <h2 className="text-xl font-semibold tracking-tight text-foreground">
                          {client.name}
                        </h2>
                      </div>
                      {client.link && (
                        <a
                          href={client.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary/80 transition-colors p-1"
                          aria-label={`Visit ${client.name}`}
                        >
                          <FiExternalLink className="h-5 w-5" />
                        </a>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {client.description}
                    </p>
                  </div>

                  <div className="space-y-3 pt-3 border-t border-border/40">
                    <p className="text-xs font-medium text-foreground">
                      Our role: <span className="text-muted-foreground">{client.role}</span>
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {client.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="text-[11px] px-2 py-0.5 bg-background rounded border border-border text-muted-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    {client.link && (
                      <p className="pt-1 text-xs">
                        <a
                          href={client.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline break-all inline-flex items-center gap-1"
                        >
                          {client.link}
                        </a>
                      </p>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <PageFooter />
    </div>
  );
};

export default Work;
