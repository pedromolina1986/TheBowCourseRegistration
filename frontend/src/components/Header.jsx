import { GraduationCap, Bell, Settings } from 'lucide-react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Show a different header on the dashboard page
  if (location.pathname.includes('/dashboard')) {
    return (
      <header className="sticky top-0 z-50 bg-white backdrop-blur-sm border-b border-gray-100 shadow-sm px-8 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Administrator Dashboard</h1>          
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">{JSON.parse(localStorage.getItem("currentUser")).username}</span>
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

  return (
    <header className="sticky top-0 z-50 bg-white backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 hover:cursor-pointer" onClick={() => navigate('/')}>
          <GraduationCap className="w-6 h-6" />
          <span className="text-lg font-semibold">Bow Course Registration</span>
        </div>        

        {/* Login / Sign Up */}
        <div className="flex gap-3">
          <button
            className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            onClick={() => navigate('/login')}
          >
            Login
          </button>
          <button
            className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            onClick={() => navigate('/register')}
          >
            Sign Up
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
