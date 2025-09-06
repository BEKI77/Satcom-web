import { User, Settings, Home, BookOpen, Users, LogOut } from 'lucide-react';
import { User as UserType } from '../types';
import { useAuth } from '../context/auth-context';

interface HeaderProps {
  user: UserType | null;
  onNavigate: (view: 'home' | 'dashboard' | 'course' | 'admin') => void;
  currentView: string;
}

export function Header({ onNavigate, currentView }: HeaderProps) {
  const { user, logout } = useAuth();
  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => onNavigate('home')}>
              <Settings className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-md lg:text-xl font-bold text-gray-900">SATCOM TECHNOLOGY</h1>
                <p className="text-sm text-gray-500">Technical Education Center</p>
              </div>
            </div>
          </div>

          <nav className="hidden md:flex space-x-8">
            {user && (
              <>
                <button
                  onClick={() => onNavigate('home')}
                  className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <Home className="h-4 w-4" />
                  <span>Home</span>
                </button>
                <button
                  onClick={() => onNavigate('dashboard')}
                  className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <BookOpen className="h-4 w-4" />
                  <span>Dashboard</span>
                </button>
                {user.role === 'admin' && (
                  <button
                    onClick={() => onNavigate('admin')}
                    className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    <Users className="h-4 w-4" />
                    <span>Admin</span>
                  </button>
                )}
              </>
            )}
          </nav>

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 bg-gray-100 rounded-full px-3 py-2">
                  <User className="h-5 w-5 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">{user.name}</span>
                  {user.role === 'admin' && (
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Admin</span>
                  )}
                </div>
                <button
                  onClick={()=>{
                    console.log("here")
                    logout()
                  }}
                  className="flex items-center space-x-1 text-gray-600 hover:text-red-600 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            ) : (
              null
            )}
          </div>
        </div>
      </div>
    </header>
  );
}