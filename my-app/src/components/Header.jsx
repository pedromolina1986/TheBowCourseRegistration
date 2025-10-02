import { GraduationCap} from 'lucide-react';

const handleClick = () => {
  //  redirect to the admin page
  window.location.href = '/dashboard';
};

const Header = () => (
  <header className="bg-white shadow-sm">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <GraduationCap className="w-6 h-6" />
        <span className="text-lg font-semibold">Bow Course Registration</span>
      </div>
      <div className="flex gap-3">
        <button className="px-4 py-2 text-gray-700 hover:text-gray-900" onClick={handleClick}>Login</button>
        <button className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800">Sign Up</button>
      </div>
    </div>
  </header>
);

export default Header;