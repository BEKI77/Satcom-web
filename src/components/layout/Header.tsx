// import { useState } from 'react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { User, Settings, Home, BookOpen, Users, LogOut, Menu, X, UserCircle } from 'lucide-react';
// import { useAuth } from '../../context/auth-context';

// export function Header() {
//   const { user, logout } = useAuth();
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   const handleLogout = () => {
//     logout();
//     navigate('/');
//     setIsMobileMenuOpen(false);
//   };

//   const isActive = (path: string) => location.pathname === path;

//   const publicNavItems = [
//     { path: '/', label: 'Home', icon: Home },
//     { path: '/courses', label: 'Courses', icon: BookOpen },
//     { path: '/about', label: 'About', icon: Users },
//     { path: '/contact', label: 'Contact', icon: User },
//   ];

//   const userNavItems = user ? [
//     { path: '/dashboard', label: 'Dashboard', icon: BookOpen },
//     { path: '/profile', label: 'Profile', icon: UserCircle },
//     ...(user.role === 'admin' ? [{ path: '/admin', label: 'Admin', icon: Settings }] : []),
//   ] : [];

//   return (
//     <header className="bg-white shadow-lg sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center py-4">
//           {/* Logo */}
//           <Link to="/" className="flex items-center space-x-2">
//             <Settings className="h-8 w-8 text-blue-600" />
//             <div>
//               <h1 className="text-xl font-bold text-gray-900">SATCOM TECHNOLOG</h1>
//               <p className="text-sm text-gray-500">Technical Education Center</p>
//             </div>
//           </Link>

//           {/* Desktop Navigation */}
//           <nav className="hidden md:flex space-x-8">
//             {publicNavItems.map((item) => (
//               <Link
//                 key={item.path}
//                 to={item.path}
//                 className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
//                   isActive(item.path)
//                     ? 'text-blue-600 bg-blue-50'
//                     : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
//                 }`}
//               >
//                 <item.icon className="h-4 w-4" />
//                 <span>{item.label}</span>
//               </Link>
//             ))}
            
//             {userNavItems.map((item) => (
//               <Link
//                 key={item.path}
//                 to={item.path}
//                 className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
//                   isActive(item.path)
//                     ? 'text-blue-600 bg-blue-50'
//                     : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
//                 }`}
//               >
//                 <item.icon className="h-4 w-4" />
//                 <span>{item.label}</span>
//               </Link>
//             ))}
//           </nav>

//           {/* User Actions */}
//           <div className="hidden md:flex items-center space-x-4">
//             {user ? (
//               <div className="flex items-center space-x-3">
//                 <div className="flex items-center space-x-2 bg-gray-100 rounded-full px-3 py-2">
//                   <User className="h-5 w-5 text-gray-600" />
//                   <span className="text-sm font-medium text-gray-700">{user.name}</span>
//                   {user.role === 'admin' && (
//                     <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Admin</span>
//                   )}
//                 </div>
//                 <button
//                   onClick={handleLogout}
//                   className="flex items-center space-x-1 text-gray-600 hover:text-red-600 transition-colors"
//                 >
//                   <LogOut className="h-4 w-4" />
//                   <span>Logout</span>
//                 </button>
//               </div>
//             ) : (
//               <div className="flex items-center space-x-3">
//                 <Link
//                   to="/login"
//                   className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
//                 >
//                   Login
//                 </Link>
//                 <Link
//                   to="/register"
//                   className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
//                 >
//                   Register
//                 </Link>
//               </div>
//             )}
//           </div>

//           {/* Mobile menu button */}
//           <button
//             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//             className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
//           >
//             {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//           </button>
//         </div>

//         {/* Mobile Navigation */}
//         {isMobileMenuOpen && (
//           <div className="md:hidden border-t border-gray-200 py-4">
//             <div className="space-y-2">
//               {[...publicNavItems, ...userNavItems].map((item) => (
//                 <Link
//                   key={item.path}
//                   to={item.path}
//                   onClick={() => setIsMobileMenuOpen(false)}
//                   className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium transition-colors ${
//                     isActive(item.path)
//                       ? 'text-blue-600 bg-blue-50'
//                       : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
//                   }`}
//                 >
//                   <item.icon className="h-5 w-5" />
//                   <span>{item.label}</span>
//                 </Link>
//               ))}
              
//               {user ? (
//                 <button
//                   onClick={handleLogout}
//                   className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50 w-full text-left"
//                 >
//                   <LogOut className="h-5 w-5" />
//                   <span>Logout</span>
//                 </button>
//               ) : (
//                 <div className="space-y-2 pt-2 border-t border-gray-200">
//                   <Link
//                     to="/login"
//                     onClick={() => setIsMobileMenuOpen(false)}
//                     className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
//                   >
//                     Login
//                   </Link>
//                   <Link
//                     to="/register"
//                     onClick={() => setIsMobileMenuOpen(false)}
//                     className="block px-3 py-2 rounded-md text-base font-medium bg-blue-600 text-white hover:bg-blue-700"
//                   >
//                     Register
//                   </Link>
//                 </div>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </header>
//   );
// }
"use client"

import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { User, Settings, Home, BookOpen, Users, LogOut, Menu, X, UserCircle, Zap } from "lucide-react"
import { useAuth } from "../../context/auth-context"

export function Header() {
  const { user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate("/")
    setIsMobileMenuOpen(false)
  }

  const isActive = (path: string) => location.pathname === path

  const publicNavItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/courses", label: "Courses", icon: BookOpen },
    { path: "/about", label: "About", icon: Users },
    { path: "/contact", label: "Contact", icon: User },
  ]

  const userNavItems = user
    ? [
        { path: "/dashboard", label: "Dashboard", icon: BookOpen },
        { path: "/profile", label: "Profile", icon: UserCircle },
        ...(user.role === "admin" ? [{ path: "/admin", label: "Admin", icon: Settings }] : []),
      ]
    : []

  return (
    <header className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 backdrop-blur-md border-b border-slate-700/50 sticky top-0 z-50 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-xl blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative bg-gradient-to-r from-blue-600 to-cyan-500 p-2 rounded-xl">
                <Zap className="h-8 w-8 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent">
                SATCOM TECHNOLOG
              </h1>
              <p className="text-sm text-slate-400 font-medium">Technical Education Center</p>
            </div>
          </Link>

          <nav className="hidden md:flex space-x-2">
            {publicNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive(item.path)
                    ? "text-white bg-gradient-to-r from-blue-600 to-cyan-500 shadow-lg shadow-blue-500/25"
                    : "text-slate-300 hover:text-white hover:bg-slate-700/50 hover:shadow-lg hover:shadow-slate-500/10"
                }`}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            ))}

            {userNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive(item.path)
                    ? "text-white bg-gradient-to-r from-blue-600 to-cyan-500 shadow-lg shadow-blue-500/25"
                    : "text-slate-300 hover:text-white hover:bg-slate-700/50 hover:shadow-lg hover:shadow-slate-500/10"
                }`}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-3 bg-slate-800/50 backdrop-blur-sm rounded-xl px-4 py-2.5 border border-slate-700/50">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-sm font-medium text-white">{user.name}</span>
                  </div>
                  {user.role === "admin" && (
                    <span className="text-xs bg-gradient-to-r from-amber-500 to-orange-500 text-white px-2.5 py-1 rounded-full font-medium">
                      Admin
                    </span>
                  )}
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-slate-400 hover:text-red-400 transition-colors px-3 py-2 rounded-lg hover:bg-slate-800/50"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="text-sm font-medium">Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="text-slate-300 hover:text-white font-medium transition-colors px-4 py-2 rounded-lg hover:bg-slate-700/50"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-2.5 rounded-xl font-medium hover:from-blue-700 hover:to-cyan-600 transition-all duration-200 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-700/50 transition-all duration-200"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-slate-700/50 py-4 backdrop-blur-sm">
            <div className="space-y-2">
              {[...publicNavItems, ...userNavItems].map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
                    isActive(item.path)
                      ? "text-white bg-gradient-to-r from-blue-600 to-cyan-500 shadow-lg shadow-blue-500/25"
                      : "text-slate-300 hover:text-white hover:bg-slate-700/50"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              ))}

              {user ? (
                <div className="pt-4 border-t border-slate-700/50 space-y-3">
                  <div className="flex items-center space-x-3 px-4 py-3 bg-slate-800/50 rounded-xl border border-slate-700/50">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <span className="text-white font-medium">{user.name}</span>
                      {user.role === "admin" && (
                        <span className="block text-xs bg-gradient-to-r from-amber-500 to-orange-500 text-white px-2 py-0.5 rounded-full font-medium w-fit mt-1">
                          Admin
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 w-full text-left transition-all duration-200"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-2 pt-4 border-t border-slate-700/50">
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-3 rounded-xl text-base font-medium text-slate-300 hover:text-white hover:bg-slate-700/50 transition-all duration-200"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-3 rounded-xl text-base font-medium bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:from-blue-700 hover:to-cyan-600 transition-all duration-200 shadow-lg shadow-blue-500/25"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
