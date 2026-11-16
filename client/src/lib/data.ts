import { Project, Service } from '@shared/schema';

// Project data
export const projects: Project[] = [
  {
    id: 1,
    title: 'Lonavala Stays',
    description: 'Villa website for a client in Lonavala.',
    imageUrl: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=600&q=80',
    technologies: ['Website Development', 'Booking System', 'Razorpay'],
    category: 'Resort & Villa Websites',
    link: 'https://lonavalastays.in/',
    githubLink: null,
    featured: true,
  },
  {
    id: 2,
    title: 'Brick & Beam Villa',
    description: 'Villa website for a client.',
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80',
    technologies: ['Website Development', 'Responsive Design'],
    category: 'Resort & Villa Websites',
    link: 'https://brickandbeamvilla.netlify.app/',
    githubLink: null,
    featured: true,
  },
  {
    id: 3,
    title: 'Grand Valley Resort',
    description: 'Resort website for a client in Bhilar, Mahabaleshwar.',
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80',
    technologies: ['Website Development', 'Resort Website'],
    category: 'Resort & Villa Websites',
    link: null,
    githubLink: null,
    featured: true,
  },
  {
    id: 4,
    title: 'The Lead Hunter Club',
    description: 'We did the backend engineering. Someone else built the frontend.',
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80',
    technologies: ['Backend Engineering', 'REST APIs', 'Database Architecture'],
    category: 'Software Development',
    link: 'https://www.theleadhunterclub.com/',
    githubLink: null,
    featured: true,
  },
];

// Service data
export const services: Service[] = [
  {
    id: 1,
    title: 'Website Development',
    description: 'Custom websites designed for performance, responsive layout, and search visibility',
    icon: 'monitor',
    features: [
      'Responsive design for desktop and mobile',
      'Search engine optimization',
      'Fast loading times',
      'Clean, maintainable code'
    ],
  },
  {
    id: 2,
    title: 'Resort & Villa Booking Websites',
    description: 'Specialized websites for resort and villa owners in Lonavala, Mahabaleshwar, and Panchgani',
    icon: 'layers',
    features: [
      'Live availability calendar',
      'Online payments via Razorpay',
      'WhatsApp enquiry buttons',
      'Booking admin dashboard'
    ],
  },
  {
    id: 3,
    title: 'Software & Backend Development',
    description: 'Tailored software development, backend systems, and database engineering',
    icon: 'database',
    features: [
      'Backend engineering and REST APIs',
      'Database architecture and optimization',
      'Custom management dashboards',
      'Secure authentication and data handling'
    ],
  },
];
