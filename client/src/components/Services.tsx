import { useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'framer-motion';
import { Card, CardContent } from './ui/card';
import { 
  FiMonitor, 
  FiSmartphone, 
  FiShoppingBag, 
  FiLayers, 
  FiCode,
  FiDatabase,
  FiCheck
} from 'react-icons/fi';
import { gsap } from 'gsap';
import FloatingObject from './FloatingObject';
import { services } from '@/lib/data';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';

const Services = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const titleRef = useRef(null);

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  useEffect(() => {
    // GSAP animation for the title
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      );
    }
  }, []);

  // Map service keys to icons
  const serviceIcons: Record<string, JSX.Element> = {
    "Web Development": <FiMonitor size={28} />,
    "Mobile Applications": <FiSmartphone size={28} />,
    "E-commerce Solutions": <FiShoppingBag size={28} />,
    "3D Interactive Experiences": <FiLayers size={28} />,
    "Custom Web Applications": <FiCode size={28} />,
    "Database & Backend Solutions": <FiDatabase size={28} />
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] },
    },
  };

  return (
    <section id="services" className="relative py-24 bg-background/50 backdrop-blur-md">
      {/* Floating 3D elements for visual interest */}
      <div className="absolute top-40 right-20 hidden lg:block">
        <FloatingObject 
          size={1.8}
          position={[0, 0, 0]}
          rotation={[0.3, 0.5, 0.2]}
          color="#64FFDA"
          shape="octahedron"
        />
      </div>
      <div className="absolute bottom-30 left-20 hidden lg:block">
        <FloatingObject 
          size={1.2}
          position={[0, 0, 0]}
          rotation={[0.5, 0.8, 0.3]}
          color="#FF4D5A"
          shape="tetrahedron"
        />
      </div>
      
      <div className="container px-6 mx-auto" ref={ref}>
        {/* Section Header */}
        <div className="text-center mb-16" ref={titleRef}>
          <motion.p 
            className="text-primary text-lg font-medium mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            variants={{
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
          >
            What We Do
          </motion.p>
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            variants={{
              visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.1 } },
            }}
          >
            Our <span className="text-accent">Services</span>
          </motion.h2>
          <motion.p 
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            variants={{
              visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } },
            }}
          >
            We deliver innovative digital solutions to help businesses thrive in the modern world
          </motion.p>
        </div>
        
        {/* Services Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {services.map((service, index) => (
            <motion.div key={service.id} variants={itemVariants}>
              <Card className="h-full hover:shadow-lg transition-all duration-300 hover:translate-y-[-5px] border border-border/50 bg-card/50 backdrop-blur-sm group">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mr-4 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                      {serviceIcons[service.title] || <FiLayers size={28} />}
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">{service.title}</h3>
                  </div>
                  <p className="text-muted-foreground mb-5">{service.description}</p>
                  <ul className="space-y-3">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <span className="text-primary mr-2 mt-1">
                          <FiCheck size={16} />
                        </span>
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Frequently Asked Questions (AEO / GEO) */}
        <motion.div
          className="mt-20 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.3 } },
          }}
        >
          <div className="text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-bold mb-3">Frequently Asked Questions</h3>
            <p className="text-muted-foreground text-sm md:text-base">
              Clear answers to help you understand our capabilities, process, and specialized solutions.
            </p>
          </div>

          <div className="bg-card/40 backdrop-blur-sm border border-border/60 rounded-xl p-6 md:p-8">
            <Accordion type="single" collapsible className="w-full space-y-4">
              <AccordionItem value="item-1" className="border-border/40">
                <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary">
                  Do you build custom websites and direct booking systems for resorts, villas, and hotels?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm leading-relaxed">
                  Yes. We engineer bespoke hospitality websites with commission-free direct booking engines, interactive room and villa showcases, real-time availability calendars, and secure multi-currency payment gateway integrations (Stripe, Razorpay, etc.) designed to maximize guest conversions.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border-border/40">
                <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary">
                  How do 3D interactive elements and WebGL benefit my website?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm leading-relaxed">
                  Interactive 3D configurators, virtual spaces, and real-time WebGL models dramatically increase visitor dwell time, engagement, and customer trust. They let clients interact with products or spaces directly in their browser without downloading external apps.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border-border/40">
                <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary">
                  Can DualSpark Studio build custom business software and web applications?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm leading-relaxed">
                  Absolutely. We build tailor-made SaaS platforms, customer portals, inventory and booking management tools, and scalable REST/GraphQL backends using React, TypeScript, Node.js, Express, and PostgreSQL.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="border-border/40">
                <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary">
                  How do you ensure fast mobile loading times while using 3D graphics?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm leading-relaxed">
                  We use progressive enhancement: critical DOM and above-the-fold content render instantly, while heavy 3D canvases, shaders, and animations are code-split, deferred, and dynamically scaled down on mobile devices (e.g., lower particle counts and disabled bloom post-processing) to guarantee green Core Web Vitals.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="border-border/40">
                <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary">
                  Where is DualSpark Studio located and what markets do you serve?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm leading-relaxed">
                  DualSpark Studio is based in Pune, Maharashtra, India, serving global clients across North America, Europe, Asia, and India seeking premium digital engineering and creative technology.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* FAQPage Structured Data */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "Do you build custom websites and direct booking systems for resorts, villas, and hotels?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Yes. We engineer bespoke hospitality websites with commission-free direct booking engines, interactive room and villa showcases, real-time availability calendars, and secure multi-currency payment gateway integrations designed to maximize guest conversions."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "How do 3D interactive elements and WebGL benefit my website?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Interactive 3D configurators, virtual spaces, and real-time WebGL models dramatically increase visitor dwell time, engagement, and customer trust by letting clients interact with products or spaces directly in their browser."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Can DualSpark Studio build custom business software and web applications?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Absolutely. We build tailor-made SaaS platforms, customer portals, inventory and booking management tools, and scalable REST backends using React, TypeScript, Node.js, Express, and PostgreSQL."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "How do you ensure fast mobile loading times while using 3D graphics?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "We use progressive enhancement: critical DOM and above-the-fold content render instantly, while heavy 3D canvases, shaders, and animations are code-split, deferred, and dynamically scaled down on mobile devices."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Where is DualSpark Studio located and what markets do you serve?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "DualSpark Studio is based in Pune, Maharashtra, India, serving global clients across North America, Europe, Asia, and India seeking premium digital engineering and creative technology."
                    }
                  }
                ]
              })
            }}
          />
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          className="text-center mt-16 p-8 rounded-xl bg-gradient-to-r from-primary/5 to-accent/5 backdrop-blur-sm border border-border/50"
          initial={{ opacity: 0, y: 30 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.4 } },
          }}
        >
          <h3 className="text-2xl font-bold mb-3">Ready to transform your digital presence?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Let's collaborate to create an exceptional digital experience that stands out and delivers results.
          </p>
          <button 
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-md font-medium transition-colors"
            onClick={() => {
              const contactSection = document.getElementById('contact');
              if (contactSection) {
                window.scrollTo({
                  top: contactSection.offsetTop - 50,
                  behavior: 'smooth',
                });
              }
            }}
          >
            Get in Touch
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
