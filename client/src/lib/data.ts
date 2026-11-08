import { Project, Service } from '@shared/schema';

// Project data
export const projects: Project[] = [];

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
