import { BookOpen, Clock, Award, TrendingUp, Play, Users } from 'lucide-react';
import { User, Course } from '../types';
import { courses } from '../data';

interface DashboardProps {
  user: User;
  enrolledCourses: string[];
  courseProgress: Record<string, number>;
  onViewCourse: (course: Course) => void;
  onEnrollCourse: (courseId: string) => void;
}

export function Dashboard({ user, enrolledCourses, courseProgress, onViewCourse, onEnrollCourse }: DashboardProps) {
  const enrolledCourseObjects = courses.filter(course => enrolledCourses.includes(course.id));
  const availableCourses = courses.filter(course => !enrolledCourses.includes(course.id));
  const completedCourses = enrolledCourses.filter(courseId => courseProgress[courseId] >= 100);
  const totalProgress = enrolledCourses.length > 0 ? Math.round(enrolledCourses.reduce((sum, courseId) => sum + (courseProgress[courseId] || 0), 0) / enrolledCourses.length)
    : 0;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-blue-600 to-teal-600 rounded-xl text-white p-8 mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {user.name}!</h1>
          <p className="text-blue-100">Continue your technical education journey</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <BookOpen className="h-10 w-10 text-blue-500 mr-4" />
              <div>
                <p className="text-2xl font-bold text-gray-900">{enrolledCourses.length}</p>
                <p className="text-gray-600">Enrolled Courses</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <Award className="h-10 w-10 text-green-500 mr-4" />
              <div>
                <p className="text-2xl font-bold text-gray-900">{completedCourses.length}</p>
                <p className="text-gray-600">Completed</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <TrendingUp className="h-10 w-10 text-orange-500 mr-4" />
              <div>
                <p className="text-2xl font-bold text-gray-900">{totalProgress}%</p>
                <p className="text-gray-600">Average Progress</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <Clock className="h-10 w-10 text-purple-500 mr-4" />
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {enrolledCourses.length - completedCourses.length}
                </p>
                <p className="text-gray-600">In Progress</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* My Courses */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">My Courses</h2>
            
            {enrolledCourseObjects.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No courses enrolled yet</h3>
                <p className="text-gray-600 mb-4">Start your learning journey by enrolling in a course</p>
              </div>
            ) : (
              <div className="space-y-4">
                {enrolledCourseObjects.map(course => {
                  const progress = courseProgress[course.id] || 0;
                  return (
                    <div key={course.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                      <div className="flex items-start space-x-4">
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900 mb-1">{course.title}</h3>
                              <p className="text-gray-600 text-sm mb-2">{course.description}</p>
                              <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <span className="flex items-center"><Users className="h-4 w-4 mr-1" />{course.instructor}</span>
                                <span className="flex items-center"><Clock className="h-4 w-4 mr-1" />{course.duration}</span>
                              </div>
                            </div>
                            <button
                              onClick={() => onViewCourse(course)}
                              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2"
                            >
                              <Play className="h-4 w-4" />
                              <span>Continue</span>
                            </button>
                          </div>
                          
                          <div className="mt-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium text-gray-700">Progress</span>
                              <span className="text-sm text-gray-500">{Math.round(progress)}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${progress}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Available Courses */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Courses</h2>
            <div className="space-y-4">
              {availableCourses.slice(0, 4).map(course => (
                <div key={course.id} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-32 object-cover rounded-lg mb-3"
                  />
                  <h3 className="font-semibold text-gray-900 mb-1">{course.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{course.instructor}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-blue-600">${course.price}</span>
                    <button
                      onClick={() => onEnrollCourse(course.id)}
                      className="bg-green-600 text-white px-3 py-1 rounded text-sm font-medium hover:bg-green-700 transition-colors"
                    >
                      Enroll
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}