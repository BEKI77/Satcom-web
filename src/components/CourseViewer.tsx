import React, { useState } from 'react';
import { ArrowLeft, Play, FileText, CheckCircle, Clock, User, Star } from 'lucide-react';
import { Course, Module } from '../types';

interface CourseViewerProps {
  course: Course;
  progress: number;
  onUpdateProgress: (courseId: string, progress: number) => void;
  onBack: () => void;
}

export function CourseViewer({ course, progress, onUpdateProgress, onBack }: CourseViewerProps) {
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [completedModules, setCompletedModules] = useState<string[]>([]);

  const currentModule = course.modules[currentModuleIndex];
  const totalModules = course.modules.length;
  const completedCount = completedModules.length;

  const handleModuleComplete = (moduleId: string) => {
    if (!completedModules.includes(moduleId)) {
      const newCompleted = [...completedModules, moduleId];
      setCompletedModules(newCompleted);
      
      const newProgress = (newCompleted.length / totalModules) * 100;
      onUpdateProgress(course.id, newProgress);
    }
  };

  const handleNextModule = () => {
    if (currentModuleIndex < totalModules - 1) {
      setCurrentModuleIndex(currentModuleIndex + 1);
    }
  };

  const handlePreviousModule = () => {
    if (currentModuleIndex > 0) {
      setCurrentModuleIndex(currentModuleIndex - 1);
    }
  };

  const renderModuleContent = (module: Module) => {
    switch (module.type) {
      case 'video':
        return (
          <div className="space-y-6">
            <div className="bg-gray-900 rounded-lg aspect-video flex items-center justify-center">
              <div className="text-center text-white">
                <Play className="h-16 w-16 mx-auto mb-4 text-blue-400" />
                <h3 className="text-xl font-semibold mb-2">{module.title}</h3>
                <p className="text-gray-300 mb-4">{module.content}</p>
                {module.duration && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-600">
                    <Clock className="h-4 w-4 mr-1" />
                    {module.duration}
                  </span>
                )}
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-lg font-semibold mb-3">Module Description</h4>
              <p className="text-gray-600">{module.content}</p>
            </div>
          </div>
        );
      
      case 'text':
        return (
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="flex items-center mb-6">
              <FileText className="h-8 w-8 text-blue-600 mr-3" />
              <h3 className="text-2xl font-bold text-gray-900">{module.title}</h3>
            </div>
            <div className="prose max-w-none">
              <p className="text-gray-700 text-lg leading-relaxed mb-6">{module.content}</p>
              
              <div className="bg-blue-50 border-l-4 border-blue-400 p-6 my-6">
                <h4 className="text-lg font-semibold text-blue-900 mb-2">Key Learning Points</h4>
                <ul className="text-blue-800 space-y-2">
                  <li>• Understanding fundamental concepts and principles</li>
                  <li>• Practical application techniques</li>
                  <li>• Safety considerations and best practices</li>
                  <li>• Troubleshooting common issues</li>
                </ul>
              </div>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-yellow-800 mb-2">💡 Pro Tip</h4>
                <p className="text-yellow-700">
                  Take notes while studying and practice the concepts in a real-world scenario when possible. 
                  This will help reinforce your learning and improve retention.
                </p>
              </div>
            </div>
          </div>
        );
      
      case 'quiz':
        return (
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="flex items-center mb-6">
              <CheckCircle className="h-8 w-8 text-green-600 mr-3" />
              <h3 className="text-2xl font-bold text-gray-900">{module.title}</h3>
            </div>
            <div className="text-center py-12">
              <div className="bg-green-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Knowledge Assessment</h4>
              <p className="text-gray-600 mb-8">{module.content}</p>
              <button className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                Start Quiz
              </button>
            </div>
          </div>
        );
      
      default:
        return <div>Unknown module type</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Dashboard</span>
              </button>
            </div>
            <div className="flex items-center space-x-6">
              <div className="text-right">
                <p className="text-sm text-gray-500">Progress</p>
                <p className="text-lg font-semibold text-gray-900">{Math.round(progress)}%</p>
              </div>
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Course Modules Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <div className="mb-6">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-32 object-cover rounded-lg mb-4"
                />
                <h3 className="text-lg font-bold text-gray-900 mb-2">{course.title}</h3>
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <User className="h-4 w-4 mr-1" />
                  {course.instructor}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="h-4 w-4 mr-1" />
                  {course.duration}
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-gray-900 mb-4">Course Modules</h4>
                {course.modules.map((module, index) => (
                  <button
                    key={module.id}
                    onClick={() => setCurrentModuleIndex(index)}
                    className={`w-full text-left p-3 rounded-lg transition-all ${
                      index === currentModuleIndex
                        ? 'bg-blue-50 border-2 border-blue-200'
                        : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {module.type === 'video' && <Play className="h-4 w-4 text-blue-600" />}
                        {module.type === 'text' && <FileText className="h-4 w-4 text-green-600" />}
                        {module.type === 'quiz' && <CheckCircle className="h-4 w-4 text-orange-600" />}
                        <span className="text-sm font-medium">{module.title}</span>
                      </div>
                      {completedModules.includes(module.id) && (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      )}
                    </div>
                    {module.duration && (
                      <p className="text-xs text-gray-500 mt-1 ml-6">{module.duration}</p>
                    )}
                  </button>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Completed</span>
                  <span className="font-semibold">{completedCount}/{totalModules}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              {renderModuleContent(currentModule)}
            </div>

            {/* Module Navigation */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <button
                  onClick={handlePreviousModule}
                  disabled={currentModuleIndex === 0}
                  className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Previous</span>
                </button>

                <div className="flex items-center space-x-4">
                  {!completedModules.includes(currentModule.id) && (
                    <button
                      onClick={() => handleModuleComplete(currentModule.id)}
                      className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center space-x-2"
                    >
                      <CheckCircle className="h-4 w-4" />
                      <span>Mark Complete</span>
                    </button>
                  )}
                  
                  <button
                    onClick={handleNextModule}
                    disabled={currentModuleIndex === totalModules - 1}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
                  >
                    <span>Next</span>
                    <Play className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}