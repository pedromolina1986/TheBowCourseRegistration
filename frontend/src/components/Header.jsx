import { GraduationCap, Bell, Settings } from 'lucide-react';

const handleClick = () => {
  // Redirect to the admin page
  window.location.href = '/dashboard';
};

const Header = () => (
  window.location.pathname === '/dashboard' ? (
    <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Administrator Dashboard</h1>
        <p className="text-sm text-gray-600 mt-1">
          Welcome back, John Smith. Here's an overview of the SD department.
        </p>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">Administrator</span>
        <button className="p-2 hover:bg-gray-100 rounded-lg">
          <Bell size={20} className="text-gray-600" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-lg">
          <Settings size={20} className="text-gray-600" />
        </button>
      </div>
    </header>
  ) : (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <GraduationCap className="w-6 h-6" />
          <span className="text-lg font-semibold">Bow Course Registration</span>
        </div>
        <div className="flex gap-3">
          <button
            className="px-4 py-2 text-gray-700 hover:text-gray-900"
            onClick={handleClick}
          >
            Login
          </button>
          <button className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800">
            Sign Up
          </button>
        </div>
      </div>
    </header>
  )
);

export default Header;
