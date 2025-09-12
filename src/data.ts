import { Department } from './types';

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
