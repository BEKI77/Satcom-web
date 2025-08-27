import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Departments } from './components/Departments';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { Dashboard } from './components/Dashboard';
import { CourseViewer } from './components/CourseViewer';
import { AdminPanel } from './components/AdminPanel';
import { User, Course, Department } from './types';
import { departments, courses } from './data';

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'dashboard' | 'course' | 'admin'>('home');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [enrolledCourses, setEnrolledCourses] = useState<string[]>([]);
  const [courseProgress, setCourseProgress] = useState<Record<string, number>>({});

  // Load user data from localStorage on app start
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

  // Save data to localStorage whenever it changes
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

  const handleLogin = (email: string, password: string) => {
    // Mock authentication - in a real app, this would validate against a backend
    const user: User = {
      id: '1',
      name: email.split('@')[0],
      email,
      role: email.includes('admin') ? 'admin' : 'student',
      enrolledCourses: enrolledCourses,
      completedCourses: []
    };
    setCurrentUser(user);
    setShowAuth(false);
    setCurrentView('dashboard');
  };

  const handleRegister = (name: string, email: string, password: string) => {
    // Mock registration - in a real app, this would create a new user in the backend
    const user: User = {
      id: Date.now().toString(),
      name,
      email,
      role: 'student',
      enrolledCourses: [],
      completedCourses: []
    };
    setCurrentUser(user);
    setShowAuth(false);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('home');
    localStorage.removeItem('satcom_user');
  };

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
          <Dashboard
            user={currentUser!}
            enrolledCourses={enrolledCourses}
            courseProgress={courseProgress}
            onViewCourse={handleViewCourse}
            onEnrollCourse={handleEnrollCourse}
          />
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
        onLogin={() => setShowAuth(true)}
        onLogout={handleLogout}
        onNavigate={setCurrentView}
        currentView={currentView}
      />
      
      {renderCurrentView()}
      
      {currentView === 'home' && <Footer />}
      
      {showAuth && (
        <AuthModal
          onClose={() => setShowAuth(false)}
          onLogin={handleLogin}
          onRegister={handleRegister}
        />
      )}
    </div>
  );
}

export default App;