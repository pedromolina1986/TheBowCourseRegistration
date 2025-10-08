import { useState } from 'react';
import { BarChart3, User, Plus, Edit, Search, Users, Mail, GraduationCap, FileText, ChevronRight, MoreVertical, UserPlus, Bell, Settings } from 'lucide-react';
import SidebarMenu from '../components/SidebarMenu.jsx';
import Header from '../components/Header.jsx';
import MainContent from '../components/MainContent.jsx';

const Dashboard = () => {

  

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3, route: '/dashboard' },
    { id: 'profile', label: 'View Profile', icon: User , route: '/dashboard/profile' },
    { id: 'create', label: 'Create Courses', icon: Plus, route: '/dashboard/create' },
    { id: 'edit', label: 'Edit Courses', icon: Edit , route: '/dashboard/edit' },
    { id: 'search', label: 'Search Courses', icon: Search, route: '/dashboard/search' },
    { id: 'students', label: 'Registered Students', icon: Users, route: '/dashboard/students' },
    { id: 'forms', label: 'Submitted Forms', icon: Mail, route: '/dashboard/forms' },
    { id: 'graduates', label: 'Graduates', icon: GraduationCap, route: '/dashboard/graduates' },
    { id: 'reports', label: 'Reports', icon: FileText, route: '/dashboard/reports' },
    { id: 'settings', label: 'Settings', icon: Settings, route: '/dashboard/settings' }
  ];


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