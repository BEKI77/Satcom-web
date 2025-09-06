export interface User {
  id: string;
  name: string;
  email: string;
  role: string | null;
  enrolledCourses: string[]|null;
  completedCourses: string[]|null;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  departmentId: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  instructor: string;
  price: number;
  thumbnail: string;
  modules: Module[];
}

export interface Module {
  id: string;
  title: string;
  type: 'video' | 'text' | 'quiz';
  content: string;
  duration?: string;
  completed?: boolean;
}

export interface Department {
  id: string;
  name: string;
  description: string;
  icon: string;
  courses: string[];
  color: string;
}