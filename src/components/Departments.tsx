import React from 'react';
import * as Icons from 'lucide-react';
import { Department } from '../types';

interface DepartmentsProps {
  departments: Department[];
}

export function Departments({ departments }: DepartmentsProps) {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our Technical Departments
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive training programs designed to meet industry demands and provide 
            practical skills for successful technical careers.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {departments.map((department, index) => {
            const IconComponent = (Icons as any)[department.icon] || Icons.Settings;
            
            return (
              <div
                key={department.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group"
              >
                <div className={`${department.color} h-2`}></div>
                <div className="p-6">
                  <div className={`inline-flex items-center justify-center w-16 h-16 ${department.color.replace('bg-', 'bg-opacity-10 text-')} rounded-xl mb-4 group-hover:scale-110 transition-transform`}>
                    <IconComponent className="h-8 w-8" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {department.name}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {department.description}
                  </p>
                  
                  <div className="mt-6 pt-4 border-t border-gray-100">
                    <span className="text-sm font-medium text-gray-500">
                      {department.courses.length} Courses Available
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}