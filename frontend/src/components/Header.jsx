import { GraduationCap, Bell, Settings } from 'lucide-react';

const handleClick = () => {
  // Redirect to the login page
  window.location.href = '/login';
};

const logoClick = () => {
  window.location.href = '/'
}

const signUpClick = () => {
  window.location.href = '/register'
}


const Header = () => (
  window.location.pathname === '/dashboard' ? (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm px-8 py-4 flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Administrator Dashboard</h1>
        <p className="text-sm text-gray-600 mt-1">
          Welcome back, John Smith. Here's an overview of the SD department.
        </p>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">Administrator</span>
        <button className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105">
          <Bell size={20} className="text-gray-600" />
        </button>
        <button className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105">
          <Settings size={20} className="text-gray-600" />
        </button>
      </div>
    </header>
  ) : (
    <header className="sticky top-0 z-50 bg-white backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 hover:cursor-pointer" onClick={logoClick}>
          <GraduationCap className="w-6 h-6" />
          <span className="text-lg font-semibold">Bow Course Registration</span>
        </div>
        <div className="flex gap-3">
          <button
            className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            onClick={handleClick}
          >
            Login
          </button>
          <button 
          className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          onClick={signUpClick}
          >
            Sign Up
          </button>
        </div>
      </div>
    </header>
  )
);

export default Header;
