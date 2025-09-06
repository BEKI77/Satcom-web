import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Departments } from './components/Departments';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Dashboard } from './components/Dashboard';
import { CourseViewer } from './components/CourseViewer';
import { AdminPanel } from './components/AdminPanel';
import { User, Course } from './types';
import { departments } from './data';
import { useAuth } from './context/auth-context';

function App() {
  const { user } = useAuth()
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'dashboard' | 'course' | 'admin'>('home');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [enrolledCourses, setEnrolledCourses] = useState<string[]>([]);
  const [courseProgress, setCourseProgress] = useState<Record<string, number>>({});


  useEffect(() => {
    const savedUser = localStorage.getItem('satcom_user');
    const savedEnrollments = localStorage.getItem('satcom_enrollments');
    const savedProgress = localStorage.getItem('satcom_progress');
    
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    if (savedEnrollments) {
      setEnrolledCourses(JSON.parse(savedEnrollments));
    }
    if (savedProgress) {
      setCourseProgress(JSON.parse(savedProgress));
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('satcom_user', JSON.stringify(currentUser));
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('satcom_enrollments', JSON.stringify(enrolledCourses));
  }, [enrolledCourses]);

  useEffect(() => {
    localStorage.setItem('satcom_progress', JSON.stringify(courseProgress));
  }, [courseProgress]);


  const handleEnrollCourse = (courseId: string) => {
    if (!enrolledCourses.includes(courseId)) {
      setEnrolledCourses(prev => [...prev, courseId]);
      setCourseProgress(prev => ({ ...prev, [courseId]: 0 }));
    }
  };

  const handleViewCourse = (course: Course) => {
    setSelectedCourse(course);
    setCurrentView('course');
  };

  const updateProgress = (courseId: string, progress: number) => {
    setCourseProgress(prev => ({ ...prev, [courseId]: progress }));
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          (user ? 
            <Dashboard
              user={user}
              enrolledCourses={enrolledCourses}
              courseProgress={courseProgress}
              onViewCourse={handleViewCourse}
              onEnrollCourse={handleEnrollCourse}
            /> :
            null
          )
        );
      case 'course':
        return selectedCourse ? (
          <CourseViewer
            course={selectedCourse}
            progress={courseProgress[selectedCourse.id] || 0}
            onUpdateProgress={updateProgress}
            onBack={() => setCurrentView('dashboard')}
          />
        ) : null;
      case 'admin':
        return (
          <AdminPanel
            onBack={() => setCurrentView('dashboard')}
          />
        );
      default:
        return (
          <>
            <Hero onGetStarted={() => setShowAuth(true)} />
            <Departments departments={departments} />
            <About />
            <Contact />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        user={currentUser}
        onNavigate={setCurrentView}
        currentView={currentView}
      />
      
      {renderCurrentView()}
      
      {currentView === 'home' && <Footer />}
    </div>
  );
}

export default App;