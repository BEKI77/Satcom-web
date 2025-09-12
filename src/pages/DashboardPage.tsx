import { Link } from 'react-router-dom';
import { BookOpen, Clock, Award, TrendingUp, Play, Users, Star } from 'lucide-react';
import { useProfile } from '@/context/profile- context';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/lib';

export function DashboardPage() {
  const { profile: user, enrolledCourses, enrollInCourse, courseProgress } = useProfile();

  // Fetch courses from Supabase
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [progressObj, setProgressObj] = useState<Record<string, number>>({});

  useEffect(() => {
    setLoading(true);
    supabase
      .from('courses')
      .select('*')
      .then(({ data, error }) => {
        if (!error) setCourses(data || []);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    async function fetchProgress() {
      if (typeof courseProgress === 'function') {
        const progressData = await courseProgress();
        setProgressObj(progressData || {});
      } else if (courseProgress) {
        setProgressObj(courseProgress);
      }
    }
    fetchProgress();
  }, [courseProgress]);

  if (!user || !courseProgress || loading) return null;

  // Call courseProgress if it's a function

  const enrolledCourseObjects = courses.filter(course => enrolledCourses.includes(course.id));
  const availableCourses = courses.filter(course => !enrolledCourses.includes(course.id));
  const completedCourses = enrolledCourses.filter(courseId => progressObj && progressObj[courseId] >= 100);
  const totalProgress = enrolledCourses.length > 0
    ? Math.round(enrolledCourses.reduce((sum, courseId) => sum + ((progressObj && progressObj[courseId]) || 0), 0) / enrolledCourses.length)
    : 0;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-blue-600 to-teal-600 rounded-xl text-white p-8 mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {user.userName}!</h1>
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
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">My Courses</h2>
              <Link
                to="/courses"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Browse All Courses →
              </Link>
            </div>
            
            {enrolledCourseObjects.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No courses enrolled yet</h3>
                <p className="text-gray-600 mb-4">Start your learning journey by enrolling in a course</p>
                <Link
                  to="/courses"
                  className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  <BookOpen className="h-4 w-4" />
                  <span>Browse Courses</span>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {enrolledCourseObjects.map(course => {
                  const progress = progressObj[course.id] || 0;
                  return (
                    <div key={course.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                      <div className="flex items-start space-x-4">
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900 mb-1">{course.title}</h3>
                              <p className="text-gray-600 text-sm mb-2 line-clamp-2">{course.description}</p>
                              <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <span className="flex items-center"><Users className="h-4 w-4 mr-1" />{course.instructor}</span>
                                <span className="flex items-center"><Clock className="h-4 w-4 mr-1" />{course.duration}</span>
                              </div>
                            </div>
                            <Link
                              to={`/learn/${course.id}`}
                              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2"
                            >
                              <Play className="h-4 w-4" />
                              <span>Continue</span>
                            </Link>
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

          {/* Recommended Courses */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Recommended for You</h2>
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
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      ))}
                      <span className="text-xs text-gray-500 ml-1">4.8</span>
                    </div>
                    <span className="text-lg font-bold text-blue-600">${course.price}</span>
                  </div>
                  <div className="flex space-x-2">
                    <Link
                      to={`/courses/${course.id}`}
                      className="flex-1 bg-gray-100 text-gray-700 px-3 py-2 rounded text-sm font-medium hover:bg-gray-200 transition-colors text-center"
                    >
                      Details
                    </Link>
                    <button
                      onClick={() => enrollInCourse(course.id)}
                      className="flex-1 bg-blue-600 text-white px-3 py-2 rounded text-sm font-medium hover:bg-blue-700 transition-colors"
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