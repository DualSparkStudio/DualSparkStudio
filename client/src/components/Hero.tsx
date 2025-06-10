import { useRef, useEffect, useCallback } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { Button } from './ui/button';
import { FiArrowRight, FiCode, FiLayers, FiCpu, FiGlobe } from 'react-icons/fi';
import { useAudio } from '@/lib/stores/useAudio';
import useSmoothScroll from '@/hooks/useSmoothScroll';

const Hero = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const { playHit } = useAudio();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  useEffect(() => {
    // GSAP animations for the title and subtitle
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
      );
    }

    if (subtitleRef.current) {
      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: 'power3.out' }
      );
    }
  }, []);

  // Import our custom smooth scrolling hook
  const scrollToSection = useSmoothScroll();
  
  // Use the smooth scrolling hook with a little delay to ensure animations are smooth
  const handleScrollToSection = useCallback((sectionId: string) => {
    // We don't need to play hit sound as the hook does it for us
    scrollToSection(sectionId, 50);
  }, [scrollToSection]);

  return (
    <section id="hero" className="relative min-h-screen pt-24 pb-36 flex items-center justify-center overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-background/10 to-background/30"></div>
      
      {/* Content Container */}
      <div className="container relative z-10 px-6 mx-auto text-center" ref={ref}>
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          animate={controls}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-6"
        >
          <span className="inline-block px-4 py-1.5 text-sm font-medium text-primary bg-primary/10 rounded-full">
            Web Development + Software Solutions
          </span>
        </motion.div>
        
        <h1 
          ref={titleRef} 
          className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4 text-foreground"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          Where <span className="text-gradient">Development</span> <br />
          Meets <span className="text-accent">Design</span>
        </h1>
        
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          animate={controls}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-8 bg-background/30 backdrop-blur-sm py-2 px-4 rounded-md inline-block"
        >
          <span className="text-lg md:text-xl font-medium tracking-wider text-primary">
            CUSTOM WEBSITE & SOFTWARE, CRAFTED ON DEMAND
          </span>
        </motion.div>
        
        <p 
          ref={subtitleRef} 
          className="max-w-2xl mx-auto text-xl text-muted-foreground mb-10"
        >
          We build professional digital experiences and cutting-edge web applications
          with a focus on performance, usability and business growth.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
          <motion.div
            variants={{
              hidden: { opacity: 0, x: -20 },
              visible: { opacity: 1, x: 0 },
            }}
            initial="hidden"
            animate={controls}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Button 
              size="lg" 
              onClick={() => handleScrollToSection('projects')}
              className="group btn-hover-effect"
            >
              View Our Work
              <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
          
          <motion.div
            variants={{
              hidden: { opacity: 0, x: 20 },
              visible: { opacity: 1, x: 0 },
            }}
            initial="hidden"
            animate={controls}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <div className="gradient-border bg-background">
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => handleScrollToSection('contact')}
                className="group relative z-10"
              >
                Contact Us
              </Button>
            </div>
          </motion.div>
        </div>
        
        {/* Feature highlights */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          animate={controls}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <div className="flex flex-col items-center p-6 bg-background/70 backdrop-blur-md rounded-lg border border-primary/20 shadow-lg shadow-primary/5 hover:shadow-primary/10 hover:border-primary transition-all duration-300">
            <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center rounded-full bg-primary/20 text-primary mb-4">
              <FiCode size={30} />
            </div>
            <div className="text-center">
              <h3 className="text-lg font-medium text-foreground mb-2">Custom Web Development</h3>
              <p className="text-sm text-muted-foreground">Tailored solutions with cutting-edge technology</p>
            </div>
          </div>
          
          <div className="flex flex-col items-center p-6 bg-background/70 backdrop-blur-md rounded-lg border border-accent/20 shadow-lg shadow-accent/5 hover:shadow-accent/10 hover:border-accent transition-all duration-300">
            <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center rounded-full bg-accent/20 text-accent mb-4">
              <FiLayers size={30} />
            </div>
            <div className="text-center">
              <h3 className="text-lg font-medium text-foreground mb-2">Custom Software Solutions</h3>
              <p className="text-sm text-muted-foreground">Scalable applications for your business needs</p>
            </div>
          </div>
          
          <div className="flex flex-col items-center p-6 bg-background/70 backdrop-blur-md rounded-lg border border-primary/20 shadow-lg shadow-primary/5 hover:shadow-primary/10 hover:border-primary transition-all duration-300">
            <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center rounded-full bg-primary/20 text-primary mb-4">
              <FiCpu size={30} />
            </div>
            <div className="text-center">
              <h3 className="text-lg font-medium text-foreground mb-2">Advanced Web Applications</h3>
              <p className="text-sm text-muted-foreground">Powerful solutions for complex business needs</p>
            </div>
          </div>
          
          <div className="flex flex-col items-center p-6 bg-background/70 backdrop-blur-md rounded-lg border border-accent/20 shadow-lg shadow-accent/5 hover:shadow-accent/10 hover:border-accent transition-all duration-300">
            <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center rounded-full bg-accent/20 text-accent mb-4">
              <FiGlobe size={30} />
            </div>
            <div className="text-center">
              <h3 className="text-lg font-medium text-foreground mb-2">Global Reach</h3>
              <p className="text-sm text-muted-foreground">Solutions for businesses worldwide</p>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        onClick={() => handleScrollToSection('projects')}
        title="Scroll down"
      >
        <div className="w-8 h-12 rounded-full border-2 border-muted-foreground flex justify-center hover:border-primary transition-colors">
          <motion.div 
            className="w-1.5 h-3 bg-primary rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
