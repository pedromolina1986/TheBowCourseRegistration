import { GraduationCap, Bell, Settings, Menu, X } from 'lucide-react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const currentUser = JSON.parse(localStorage.getItem("currentUser") || '{}');  

  // Dashboard Header
  if (location.pathname.includes('/dashboard')) {
    return (
      <header className="sticky top-0 z-50 bg-white backdrop-blur-sm border-b border-gray-100 shadow-sm px-4 sm:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600 truncate">{currentUser.username}</span>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <button className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            <Bell size={20} />
          </button>
          <button className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            <Settings size={20} />
          </button>
        </div>
      </header>
    );
  }

  // Public / Home Header
  return (
    <header className="sticky top-0 z-50 bg-white backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        {/* Logo */}
        <div
          className="flex items-center gap-2 hover:cursor-pointer"
          onClick={() => navigate('/')}
        >
          <GraduationCap className="w-6 h-6" />
          <span className="text-lg font-semibold">Bow Course Registration</span>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden sm:flex gap-3">
          <button
            className="px-4 sm:px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            onClick={() => navigate('/login')}
          >
            Login
          </button>
          <button
            className="px-4 sm:px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            onClick={() => navigate('/register')}
          >
            Sign Up
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="sm:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="sm:hidden bg-white border-t border-gray-100 shadow-md px-4 py-3 flex flex-col gap-2">
          <button
            className="w-full text-left px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            onClick={() => {
              navigate('/login');
              setMenuOpen(false);
            }}
          >
            Login
          </button>
          <button
            className="w-full text-left px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            onClick={() => {
              navigate('/register');
              setMenuOpen(false);
            }}
          >
            Sign Up
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
