import { useState } from 'react';
import { BarChart3, User, Plus, Edit, Search, Users, Mail, GraduationCap, FileText, ChevronRight, MoreVertical, UserPlus, Bell, Settings, Contact } from 'lucide-react';
import SidebarMenu from '../components/SidebarMenu.jsx';
import Header from '../components/Header.jsx';
import MainContent from '../components/MainContent.jsx';

const Dashboard = () => {

  const userType = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')).userType : null;  

  const allMenuItems = [
    //ALL
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3, route: '/dashboard', access: ["admin","student"] },    
    { id: 'profile', label: 'View Profile', icon: User , route: '/dashboard/profile', access: ["admin","student"]  },
    //ADMIN    
    { id: 'courses', label: 'Courses', icon: FileText, route: '/dashboard/courses', access: ["admin"] },    
    { id: 'students', label: 'Registered Students', icon: Users, route: '/dashboard/students', access: ["admin"] },
    { id: 'forms', label: 'Submitted Forms', icon: Mail, route: '/dashboard/forms', access: ["admin"] },    
    //STUDENT
    { id: 'terms', label: 'Term Selection', icon: GraduationCap, route: '/dashboard/terms', access: ["student"] },
    { id: 'courseRegistrations', label: 'Course Registration', icon: Plus, route: '/dashboard/courseregistration', access: ["student"]  },
    { id: 'my-courses', label: 'My Courses', icon: Edit , route: '/dashboard/my-courses', access: ["student"] },
    { id: 'search', label: 'Search Courses', icon: Search, route: '/dashboard/search', access: ["student"]  },
    { id: 'contactAdmin', label: 'Contact Admin', icon: Contact, route: '/dashboard/contact', access: ["student"]  }    
  ];

  const menuItems = allMenuItems.filter(item => item.access.includes(userType));

  return (
    <div className="flex h-screen bg-gray-50">
      
      <SidebarMenu menuItems={menuItems} />

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <Header />
        <MainContent />        
      </main>
    </div>
  );
};

export default Dashboard;