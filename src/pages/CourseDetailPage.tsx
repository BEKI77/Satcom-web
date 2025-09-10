import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Users, Star, BookOpen, Play, FileText, CheckCircle, Award } from 'lucide-react';
import { courses, departments } from '../data';
import { useAuth } from '@/context/auth-context';
import { useProfile } from '@/context/profile- context';

export function CourseDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const {enrolledCourses, enrollInCourse} = useProfile();

  const course = courses.find(c => c.id === id);
  const department = course ? departments.find(d => d.id === course.departmentId) : null;
  const isEnrolled = course ? enrolledCourses.includes(course.id) : false;

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Course Not Found</h1>
          <Link to="/courses" className="text-blue-600 hover:text-blue-700">
            ← Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  const handleEnroll = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    enrollInCourse(course.id);
  };

  const getModuleIcon = (type: string) => {
    switch (type) {
      case 'video': return Play;
      case 'text': return FileText;
      case 'quiz': return CheckCircle;
      default: return BookOpen;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course Header */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-8">
                <div className="flex items-center space-x-4 mb-4">
                  <span className="text-sm text-blue-600 font-medium bg-blue-50 px-3 py-1 rounded-full">
                    {department?.name}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${
                    course.level === 'Beginner' ? 'bg-green-500' :
                    course.level === 'Intermediate' ? 'bg-yellow-500' : 'bg-red-500'
                  }`}>
                    {course.level}
                  </span>
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-4">{course.title}</h1>
                <p className="text-lg text-gray-600 mb-6">{course.description}</p>

                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Instructor</p>
                      <p className="font-medium text-gray-900">{course.instructor}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Duration</p>
                      <p className="font-medium text-gray-900">{course.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <BookOpen className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Modules</p>
                      <p className="font-medium text-gray-900">{course.modules.length} lessons</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="text-sm text-gray-500 ml-2">4.8 (124 reviews)</span>
                  </div>
                  <span className="text-sm text-gray-500">•</span>
                  <span className="text-sm text-gray-500">2,847 students enrolled</span>
                </div>
              </div>
            </div>

            {/* Course Content */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Content</h2>
              <div className="space-y-4">
                {course.modules.map((module, index) => {
                  const IconComponent = getModuleIcon(module.type);
                  return (
                    <div key={module.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <IconComponent className="h-5 w-5 text-blue-600" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">
                            {index + 1}. {module.title}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">{module.content}</p>
                          {module.duration && (
                            <p className="text-xs text-gray-500 mt-2">{module.duration}</p>
                          )}
                        </div>
                        <div className="flex-shrink-0">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            module.type === 'video' ? 'bg-blue-100 text-blue-800' :
                            module.type === 'text' ? 'bg-green-100 text-green-800' :
                            'bg-orange-100 text-orange-800'
                          }`}>
                            {module.type}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* What You'll Learn */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">What You'll Learn</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  'Master fundamental concepts and principles',
                  'Gain hands-on practical experience',
                  'Learn industry best practices',
                  'Develop problem-solving skills',
                  'Understand safety procedures',
                  'Build confidence in technical work'
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-gray-900 mb-2">${course.price}</div>
                <p className="text-gray-600">One-time payment</p>
              </div>

              {user ? (
                isEnrolled ? (
                  <Link
                    to={`/learn/${course.id}`}
                    className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Play className="h-5 w-5" />
                    <span>Continue Learning</span>
                  </Link>
                ) : (
                  <button
                    onClick={handleEnroll}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Enroll Now
                  </button>
                )
              ) : (
                <div className="space-y-3">
                  <Link
                    to="/register"
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center block"
                  >
                    Register to Enroll
                  </Link>
                  <Link
                    to="/login"
                    className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors text-center block"
                  >
                    Already have an account?
                  </Link>
                </div>
              )}

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-4">This course includes:</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Play className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Video lectures</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FileText className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Reading materials</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Quizzes and assessments</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Award className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Certificate of completion</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}