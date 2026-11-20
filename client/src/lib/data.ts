import { Project, Service } from '@shared/schema';

// Project data
export const projects: Project[] = [
  {
    id: 1,
    title: 'Lonavala Stays',
    description: 'Luxury private pool villa booking platform in Lonavala with real-time reservation inquiries and curated villa showcases.',
    imageUrl: '/images/projects/lonavala-stays.jpg',
    technologies: ['Website Development', 'Booking System', 'Razorpay'],
    category: 'Resort & Villa Websites',
    link: 'https://lonavalastays.in/',
    githubLink: null,
    featured: true,
  },
  {
    id: 2,
    title: 'Brick & Beam Villa',
    description: 'Boutique luxury villa website for a 4BHK private estate in Bhilar, Mahabaleshwar with immersive visual galleries and direct booking.',
    imageUrl: '/images/projects/brick-and-beam.jpg',
    technologies: ['Website Development', 'Responsive Design', 'UI/UX'],
    category: 'Resort & Villa Websites',
    link: 'https://brickandbeamvilla.netlify.app/',
    githubLink: null,
    featured: true,
  },
  {
    id: 3,
    title: 'Grand Valley Resort',
    description: 'Full-featured resort website for a luxury destination in Bhilar, Mahabaleshwar showcasing deluxe accommodations and amenities.',
    imageUrl: '/images/projects/grand-valley-resort.jpg',
    technologies: ['Website Development', 'Resort Website', 'Booking Engine'],
    category: 'Resort & Villa Websites',
    link: 'https://grandvalleyresorts.com/',
    githubLink: null,
    featured: true,
  },
  {
    id: 4,
    title: 'The Lead Hunter Club',
    description: 'High-performance backend engineering, REST API architecture, and automated data pipelines powering real-time lead discovery.',
    imageUrl: '/images/projects/lead-hunter-app.jpg',
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
