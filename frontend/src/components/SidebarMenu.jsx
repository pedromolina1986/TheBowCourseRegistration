import { useState } from "react";
import { Link } from 'react-router-dom';

const SidebarMenu = ({ menuItems }) => {

  const [activeMenu, setActiveMenu] = useState(null);

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200 flex items-center gap-3">        
        <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center text-white font-bold cursor-pointer">
          <Link to="/">BC</Link>
        </div>
        <span
          className="font-semibold text-gray-900 cursor-pointer"          
        >
          <Link to="/">Bow Course Registration</Link>          
        </span>
      </div>

      <nav className="flex-1 p-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link to={item.route === 'dashboard' ? '/dashboard' : `${item.route}`} key={item.id} style={{ textDecoration: 'none' }}>
              <button
                key={item.id}
                onClick={() => setActiveMenu(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 transition-colors ${
                  activeMenu === item.id
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Icon size={20} />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default SidebarMenu;