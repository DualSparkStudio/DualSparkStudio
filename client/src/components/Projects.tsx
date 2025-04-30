import { useState, useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'framer-motion';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { FiExternalLink, FiGithub, FiChevronRight } from 'react-icons/fi';
import { projects } from '@/lib/data';
import { gsap } from 'gsap';
import FloatingObject from './FloatingObject';

// Project categories
const categories = ['All', 'Web', '3D', 'Mobile', 'E-commerce'];

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });
  const headerRef = useRef(null);

  // Filter projects based on active category
  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  useEffect(() => {
    // GSAP animation for header
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: {
          trigger: headerRef.current,
          start: 'top bottom-=100',
        }}
      );
    }
  }, []);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
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
    <section id="projects" className="relative py-24 overflow-hidden bg-background/80 backdrop-blur-md">
      {/* Floating 3D elements */}
      <div className="absolute top-20 left-10 hidden lg:block">
        <FloatingObject 
          size={1.5}
          position={[0, 0, 0]}
          rotation={[0.5, 0.5, 0]}
          color="#64FFDA"
          shape="box"
        />
      </div>
      <div className="absolute bottom-40 right-10 hidden lg:block">
        <FloatingObject 
          size={2}
          position={[0, 0, 0]}
          rotation={[0.3, 0.8, 0.2]}
          color="#FF4D5A"
          shape="sphere"
        />
      </div>
      
      <div className="container px-6 mx-auto" ref={ref}>
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-foreground mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            variants={{
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
          >
            Our <span className="text-primary">Projects</span>
          </motion.h2>
          <motion.p 
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            variants={{
              visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } },
            }}
          >
            Explore our portfolio of innovative websites and interactive applications
          </motion.p>
        </div>
        
        {/* Category Filter */}
        <motion.div 
          className="flex flex-wrap justify-center gap-2 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.3 } },
          }}
        >
          {categories.map(category => (
            <Button
              key={category}
              variant={activeCategory === category ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleCategoryChange(category)}
              className="min-w-[80px]"
            >
              {category}
            </Button>
          ))}
        </motion.div>
        
        {/* Projects Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {filteredProjects.map((project, index) => (
            <motion.div key={project.id} variants={itemVariants}>
              <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow group">
                <div className="relative overflow-hidden h-48">
                  <img 
                    src={project.imageUrl} 
                    alt={project.title} 
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-start p-4">
                    <div className="flex gap-2">
                      {project.link && (
                        <a 
                          href={project.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-white bg-primary/90 hover:bg-primary p-2 rounded-full transition-colors"
                        >
                          <FiExternalLink size={16} />
                        </a>
                      )}
                      {project.githubLink && (
                        <a 
                          href={project.githubLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-white bg-foreground/80 hover:bg-foreground p-2 rounded-full transition-colors"
                        >
                          <FiGithub size={16} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                <CardContent className="p-5">
                  <div className="mb-1">
                    <span className="inline-block px-2 py-1 text-xs font-medium text-primary bg-primary/10 rounded">
                      {project.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">{project.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span 
                        key={techIndex} 
                        className="text-xs px-2 py-1 bg-background rounded border border-border"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
        
        {/* View More Button */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.6 } },
          }}
        >
          <Button variant="outline" size="lg" className="group">
            View All Projects
            <FiChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
