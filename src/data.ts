import { Department, Course } from './types';

export const departments: Department[] = [
  {
    id: 'cell-phone',
    name: 'Cell Phone & Smart Phones Maintenance',
    description: 'Learn comprehensive mobile device repair including hardware and software troubleshooting.',
    icon: 'Smartphone',
    color: 'bg-blue-500',
    courses: ['cell-repair', 'smart-maintenance']
  },
  {
    id: 'office-machines',
    name: 'Office Machines Maintenance',
    description: 'Master the repair and maintenance of office equipment including printers, scanners, and copiers.',
    icon: 'Printer',
    color: 'bg-green-500',
    courses: ['printer-repair', 'copier-maintenance']
  },
  {
    id: 'computer-networking',
    name: 'Computer Maintenance & Networking',
    description: 'Advanced computer hardware, software troubleshooting, and network administration.',
    icon: 'Computer',
    color: 'bg-purple-500',
    courses: ['computer-repair', 'networking-basics']
  },
  {
    id: 'audio-video',
    name: 'Audio Video Equipment Maintenance',
    description: 'Repair and maintain audio-visual equipment, receivers, and electronic systems.',
    icon: 'Monitor',
    color: 'bg-red-500',
    courses: ['av-repair', 'electronics-basics']
  },
  {
    id: 'electrical',
    name: 'Building Electrical Installation',
    description: 'Professional electrical installation, wiring, and building electrical systems.',
    icon: 'Zap',
    color: 'bg-yellow-500',
    courses: ['electrical-basics', 'installation-advanced']
  },
  {
    id: 'appliances',
    name: 'Home Appliances Maintenance',
    description: 'Repair and maintain refrigerators, washing machines, and household appliances.',
    icon: 'Home',
    color: 'bg-indigo-500',
    courses: ['appliance-repair', 'hvac-basics']
  },
  {
    id: 'industrial',
    name: 'Industrial Equipment Maintenance',
    description: 'Maintain and repair industrial motors, control systems, and heavy machinery.',
    icon: 'Cog',
    color: 'bg-gray-500',
    courses: ['motor-control', 'industrial-systems']
  }
];

export const courses: Course[] = [
  {
    id: 'cell-repair',
    title: 'Cell Phone Repair Fundamentals',
    description: 'Complete guide to repairing cell phones including hardware diagnostics, component replacement, and troubleshooting.',
    departmentId: 'cell-phone',
    duration: '6 weeks',
    level: 'Beginner',
    instructor: 'Prof. Ahmed Hassan',
    price: 299,
    thumbnail: 'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=500',
    modules: [
      {
        id: 'module-1',
        title: 'Introduction to Mobile Device Architecture',
        type: 'video',
        content: 'Understanding the basic components and architecture of modern smartphones.',
        duration: '45 minutes'
      },
      {
        id: 'module-2',
        title: 'Essential Tools and Safety',
        type: 'text',
        content: 'Learn about the essential tools needed for mobile repair and safety procedures to follow in the workshop.'
      },
      {
        id: 'module-3',
        title: 'Screen Replacement Techniques',
        type: 'video',
        content: 'Step-by-step guide to replacing damaged screens on various smartphone models.',
        duration: '60 minutes'
      },
      {
        id: 'module-4',
        title: 'Knowledge Check',
        type: 'quiz',
        content: 'Test your understanding of mobile device repair fundamentals.'
      }
    ]
  },
  {
    id: 'smart-maintenance',
    title: 'Smart Phone Software Maintenance',
    description: 'Advanced software troubleshooting, firmware updates, and unlocking procedures.',
    departmentId: 'cell-phone',
    duration: '4 weeks',
    level: 'Intermediate',
    instructor: 'Dr. Sarah Mohamed',
    price: 249,
    thumbnail: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=500',
    modules: [
      {
        id: 'module-1',
        title: 'Operating System Fundamentals',
        type: 'video',
        content: 'Understanding Android and iOS systems architecture.',
        duration: '50 minutes'
      },
      {
        id: 'module-2',
        title: 'Software Troubleshooting',
        type: 'text',
        content: 'Common software issues and systematic troubleshooting approaches.'
      }
    ]
  },
  {
    id: 'computer-repair',
    title: 'Computer Hardware Repair',
    description: 'Comprehensive computer hardware diagnostics, repair, and upgrade procedures.',
    departmentId: 'computer-networking',
    duration: '8 weeks',
    level: 'Intermediate',
    instructor: 'Eng. Omar Ali',
    price: 399,
    thumbnail: 'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=500',
    modules: [
      {
        id: 'module-1',
        title: 'PC Architecture Overview',
        type: 'video',
        content: 'Understanding computer components and their interactions.',
        duration: '55 minutes'
      }
    ]
  },
  {
    id: 'networking-basics',
    title: 'Network Administration Basics',
    description: 'Learn network setup, configuration, and troubleshooting for small to medium businesses.',
    departmentId: 'computer-networking',
    duration: '10 weeks',
    level: 'Advanced',
    instructor: 'Dr. Fatima Khaled',
    price: 499,
    thumbnail: 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=500',
    modules: [
      {
        id: 'module-1',
        title: 'Network Fundamentals',
        type: 'video',
        content: 'Basic networking concepts and protocols.',
        duration: '40 minutes'
      }
    ]
  },
  {
    id: 'printer-repair',
    title: 'Printer Maintenance & Repair',
    description: 'Complete guide to maintaining and repairing various types of printers.',
    departmentId: 'office-machines',
    duration: '5 weeks',
    level: 'Beginner',
    instructor: 'Tech. Mahmoud Youssef',
    price: 199,
    thumbnail: 'https://images.pexels.com/photos/4050312/pexels-photo-4050312.jpeg?auto=compress&cs=tinysrgb&w=500',
    modules: [
      {
        id: 'module-1',
        title: 'Printer Types and Components',
        type: 'video',
        content: 'Understanding different printer technologies.',
        duration: '35 minutes'
      }
    ]
  },
  {
    id: 'electrical-basics',
    title: 'Electrical Installation Fundamentals',
    description: 'Basic electrical installation techniques for residential and commercial buildings.',
    departmentId: 'electrical',
    duration: '12 weeks',
    level: 'Beginner',
    instructor: 'Master Electrician Tarek Said',
    price: 599,
    thumbnail: 'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=500',
    modules: [
      {
        id: 'module-1',
        title: 'Electrical Safety',
        type: 'video',
        content: 'Essential safety procedures for electrical work.',
        duration: '30 minutes'
      }
    ]
  }
];