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
      description: 'Villa website for a client in Lonavala.',
      role: 'Website development',
      link: 'https://lonavalastays.in/',
    },
    {
      name: 'Brick & Beam Villa',
      description: 'Villa website for a client.',
      role: 'Website development',
      link: 'https://brickandbeamvilla.netlify.app/',
    },
    {
      name: 'Grand Valley Resort',
      description: 'Resort website for a client in Bhilar, Mahabaleshwar.',
      role: 'Website development',
      link: null,
    },
    {
      name: 'The Lead Hunter Club',
      description: 'We did the backend engineering. Someone else built the frontend.',
      role: 'Backend engineering',
      link: 'https://www.theleadhunterclub.com/',
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <PageHeader currentPath="/work" />

      <main className="flex-1 container mx-auto px-6 py-16 max-w-4xl space-y-12">
        <header className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Our Work
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Website and software development projects by DualSpark Studio.
          </p>
        </header>

        <section className="space-y-6 border-t border-border/40 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {clients.map((client) => (
              <article
                key={client.name}
                className="p-6 rounded-xl border border-border/60 bg-card/40 space-y-3"
              >
                <div className="flex items-start justify-between gap-4">
                  <h2 className="text-xl font-semibold tracking-tight text-foreground">
                    {client.name}
                  </h2>
                  {client.link && (
                    <a
                      href={client.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80 transition-colors pt-1"
                      aria-label={`Visit ${client.name}`}
                    >
                      <FiExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {client.description}
                </p>
                <p className="text-xs font-medium text-foreground">
                  Our role: <span className="text-muted-foreground">{client.role}</span>
                </p>
                {client.link && (
                  <p className="pt-2 text-xs">
                    <a
                      href={client.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline break-all"
                    >
                      {client.link}
                    </a>
                  </p>
                )}
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
