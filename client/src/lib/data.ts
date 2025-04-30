import { Project, Service } from '@shared/schema';

// Project data
export const projects: Project[] = [
  {
    id: 1,
    title: 'E-commerce Platform',
    description: 'A fully responsive e-commerce platform with 3D product visualization and AR try-on features',
    imageUrl: 'https://images.unsplash.com/photo-1508921340878-ba53e1f016ec',
    technologies: ['React', 'Three.js', 'Node.js', 'MongoDB'],
    category: 'E-commerce',
    link: 'https://example.com/ecommerce',
    githubLink: 'https://github.com/example/ecommerce',
    featured: true,
  },
  {
    id: 2,
    title: 'Interactive Dashboard',
    description: 'Data visualization dashboard with real-time updates and interactive 3D charts',
    imageUrl: 'https://images.unsplash.com/photo-1477013743164-ffc3a5e556da',
    technologies: ['Vue.js', 'D3.js', 'WebGL', 'Express'],
    category: 'Web',
    link: 'https://example.com/dashboard',
    githubLink: 'https://github.com/example/dashboard',
    featured: true,
  },
  {
    id: 3,
    title: 'Virtual Event Platform',
    description: 'Interactive virtual event space with customizable avatars and networking features',
    imageUrl: 'https://images.unsplash.com/photo-1534527489986-3e3394ca569c',
    technologies: ['React', 'Three.js', 'WebRTC', 'Firebase'],
    category: '3D',
    link: 'https://example.com/virtual-event',
    githubLink: 'https://github.com/example/virtual-event',
    featured: false,
  },
  {
    id: 4,
    title: 'Mobile Fitness App',
    description: 'Cross-platform fitness application with 3D exercise demonstrations and progress tracking',
    imageUrl: 'https://images.unsplash.com/photo-1515923256482-1c04580b477c',
    technologies: ['React Native', 'Three.js', 'Node.js', 'GraphQL'],
    category: 'Mobile',
    link: 'https://example.com/fitness-app',
    githubLink: 'https://github.com/example/fitness-app',
    featured: false,
  },
  {
    id: 5,
    title: 'Architectural Visualization',
    description: 'Interactive 3D architectural visualization tool for real estate companies',
    imageUrl: 'https://images.unsplash.com/photo-1642942552831-f4cb4ec9988a',
    technologies: ['Three.js', 'React', 'WebGL', 'GSAP'],
    category: '3D',
    link: 'https://example.com/architecture',
    githubLink: 'https://github.com/example/architecture',
    featured: true,
  },
  {
    id: 6,
    title: 'Educational Platform',
    description: 'Interactive learning platform with 3D models and simulations for STEM subjects',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40',
    technologies: ['React', 'Three.js', 'Express', 'PostgreSQL'],
    category: 'Web',
    link: 'https://example.com/education',
    githubLink: 'https://github.com/example/education',
    featured: false,
  },
];

// Service data
export const services: Service[] = [
  {
    id: 1,
    title: 'Web Development',
    description: 'Custom websites that stand out with modern design and functionality',
    icon: 'monitor',
    features: [
      'Responsive design for all devices',
      'SEO optimization',
      'Content management systems',
      'Performance optimization',
      'Accessibility compliance'
    ],
  },
  {
    id: 2,
    title: '3D Interactive Experiences',
    description: 'Engaging 3D elements and animations that bring your website to life',
    icon: 'layers',
    features: [
      '3D product configurators',
      'Interactive data visualizations',
      'WebGL and Three.js implementation',
      'Animated user interfaces',
      'Virtual showrooms and spaces'
    ],
  },
  {
    id: 3,
    title: 'E-commerce Solutions',
    description: 'Complete e-commerce platforms with advanced features and 3D product visualization',
    icon: 'shopping-bag',
    features: [
      'Product catalog management',
      '3D product visualization',
      'Secure payment integration',
      'Inventory management',
      'Customer analytics'
    ],
  },
  {
    id: 4,
    title: 'Mobile Applications',
    description: 'Cross-platform mobile apps with seamless user experiences',
    icon: 'smartphone',
    features: [
      'Native and hybrid apps',
      'Cross-platform compatibility',
      'Interactive UI/UX design',
      'Integration with device features',
      'Performance optimization'
    ],
  },
  {
    id: 5,
    title: 'Custom Web Applications',
    description: 'Tailor-made web applications to solve specific business challenges',
    icon: 'code',
    features: [
      'Custom business logic',
      'Scalable architecture',
      'Cloud deployment',
      'API development and integration',
      'Real-time functionality'
    ],
  },
  {
    id: 6,
    title: 'Database & Backend Solutions',
    description: 'Robust backend systems and database architecture for your applications',
    icon: 'database',
    features: [
      'Database design and optimization',
      'API development',
      'Authentication and authorization',
      'Cloud infrastructure setup',
      'Performance monitoring'
    ],
  },
];
