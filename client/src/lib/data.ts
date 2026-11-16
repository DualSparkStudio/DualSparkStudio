import { Project, Service } from '@shared/schema';

// Project data
export const projects: Project[] = [];

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
