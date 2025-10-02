import { useState } from 'react';
import { BarChart3, User, Plus, Edit, Search, Users, Mail, GraduationCap, FileText, ChevronRight, MoreVertical, UserPlus, Bell, Settings } from 'lucide-react';

const AdminDashboard = () => {
  const [activeMenu, setActiveMenu] = useState('dashboard');

  const stats = [
    { label: 'Total Students', value: '156', change: '+12 this month', icon: Users },
    { label: 'Active Courses', value: '24', change: '+3 this term', icon: BarChart3 },
    { label: 'Programs', value: '3', change: 'Diploma, Post-Diploma, Certificate', icon: GraduationCap },
    { label: 'Pending Forms', value: '8', change: '2 urgent', icon: Mail }
  ];

  const enrollmentData = [
    { program: 'Software Development - Diploma', duration: '2 years • Winter Term', students: 68 },
    { program: 'Software Development - Post-Diploma', duration: '1 year • Winter Term', students: 45 },
    { program: 'Software Development - Certificate', duration: '6 months • Spring Term', students: 43 }
  ];

  const recentActivities = [
    { 
      type: 'registration', 
      title: 'New student registration', 
      description: 'Sarah Johnson enrolled in Diploma program',
      time: '2 hours ago',
      icon: UserPlus
    },
    { 
      type: 'course', 
      title: 'Course created', 
      description: 'Advanced JavaScript course added',
      time: '5 hours ago',
      icon: Plus
    },
    { 
      type: 'form', 
      title: 'Form submitted', 
      description: 'Michael Chen submitted course inquiry',
      time: '1 day ago',
      icon: Mail
    },
    { 
      type: 'update', 
      title: 'Course updated', 
      description: 'Database Design course schedule modified',
      time: '2 days ago',
      icon: Edit
    }
  ];

  const studentQuestions = [
    {
      name: 'Emily Rodriguez',
      program: 'Diploma Program',
      question: 'Question about prerequisite courses for Advanced Database course. When will registration open?',
      time: '3 hours ago',
      status: 'New'
    },
    {
      name: 'David Park',
      program: 'Post-Diploma Program',
      question: 'Need clarification on course schedule conflicts between Web Development and Mobile App courses.',
      time: '1 day ago',
      status: 'Pending'
    },
    {
      name: 'Lisa Chen',
      program: 'Certificate Program',
      question: 'Payment deadline approaching but unable to access payment portal. Please assist.',
      time: '2 days ago',
      status: 'Urgent'
    }
  ];

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'profile', label: 'View Profile', icon: User },
    { id: 'create', label: 'Create Courses', icon: Plus },
    { id: 'edit', label: 'Edit Courses', icon: Edit },
    { id: 'search', label: 'Search Courses', icon: Search },
    { id: 'students', label: 'Registered Students', icon: Users },
    { id: 'forms', label: 'Submitted Forms', icon: Mail }
  ];

  const quickActions = [
    { label: 'Create New Course', icon: Plus },
    { label: 'View All Students', icon: Users },
    { label: 'Review Forms', icon: Mail }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200 flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center text-white font-bold">
            BC
          </div>
          <span className="font-semibold text-gray-900">Bow Course Registration</span>
        </div>
        
        <nav className="flex-1 p-4">
          {menuItems.map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveMenu(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 transition-colors ${
                  activeMenu === item.id 
                    ? 'bg-gray-100 text-gray-900' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon size={20} />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Administrator Dashboard</h1>
            <p className="text-sm text-gray-600 mt-1">Welcome back, John Smith. Here's an overview of the SD department.</p>
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

        <div className="p-8">
          {/* User Info Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                  <User size={32} className="text-gray-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">John Smith</h2>
                  <p className="text-sm text-gray-600">Administrator • SD Department</p>
                  <div className="flex items-center gap-1 mt-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-gray-600">Admin Status: Active</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Last Login</p>
                <p className="text-base font-medium text-gray-900">Today, 9:15 AM</p>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-4 gap-6 mb-6">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-start justify-between mb-3">
                    <p className="text-sm text-gray-600">{stat.label}</p>
                    <Icon size={20} className="text-gray-400" />
                  </div>
                  <p className="text-3xl font-semibold text-gray-900 mb-1">{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.change}</p>
                </div>
              );
            })}
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-3 gap-6 mb-6">
            {/* Program Enrollment */}
            <div className="col-span-2 bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Program Enrollment</h3>
                <button className="p-1 hover:bg-gray-100 rounded">
                  <MoreVertical size={20} className="text-gray-400" />
                </button>
              </div>
              <div className="p-6">
                {enrollmentData.map((item, idx) => (
                  <div key={idx} className={`flex items-center justify-between ${idx !== enrollmentData.length - 1 ? 'pb-6 mb-6 border-b border-gray-200' : ''}`}>
                    <div>
                      <p className="font-medium text-gray-900 mb-1">{item.program}</p>
                      <p className="text-sm text-gray-500">{item.duration}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-semibold text-gray-900">{item.students}</p>
                      <p className="text-sm text-gray-500">students</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
                <button className="p-1 hover:bg-gray-100 rounded">
                  <MoreVertical size={20} className="text-gray-400" />
                </button>
              </div>
              <div className="p-6">
                {recentActivities.map((activity, idx) => {
                  const Icon = activity.icon;
                  return (
                    <div key={idx} className={`flex gap-3 ${idx !== recentActivities.length - 1 ? 'pb-5 mb-5 border-b border-gray-200' : ''}`}>
                      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon size={16} className="text-gray-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 mb-0.5">{activity.title}</p>
                        <p className="text-xs text-gray-500 mb-1">{activity.description}</p>
                        <p className="text-xs text-gray-400">{activity.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-3 gap-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
              </div>
              <div className="p-4">
                {quickActions.map((action, idx) => {
                  const Icon = action.icon;
                  return (
                    <button
                      key={idx}
                      className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors mb-1"
                    >
                      <div className="flex items-center gap-3">
                        <Icon size={18} className="text-gray-600" />
                        <span className="text-sm font-medium text-gray-900">{action.label}</span>
                      </div>
                      <ChevronRight size={18} className="text-gray-400" />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Recent Student Questions */}
            <div className="col-span-2 bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Recent Student Questions</h3>
                <button className="p-1 hover:bg-gray-100 rounded">
                  <MoreVertical size={20} className="text-gray-400" />
                </button>
              </div>
              <div className="p-6">
                {studentQuestions.map((q, idx) => (
                  <div key={idx} className={`${idx !== studentQuestions.length - 1 ? 'pb-5 mb-5 border-b border-gray-200' : ''}`}>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <User size={20} className="text-gray-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{q.name}</p>
                          <p className="text-xs text-gray-500">{q.program}</p>
                        </div>
                      </div>
                      <span className={`px-2.5 py-1 rounded text-xs font-medium ${
                        q.status === 'New' ? 'bg-blue-100 text-blue-700' :
                        q.status === 'Urgent' ? 'bg-red-100 text-red-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {q.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 mb-2 ml-13">{q.question}</p>
                    <p className="text-xs text-gray-400 ml-13">Submitted {q.time}</p>
                  </div>
                ))}
                <button className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium mt-4">
                  View all submitted forms
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;