import React, { useState, useMemo } from 'react';
import { Mail, Inbox, AlertTriangle, Clock, Filter, X, Search, Download, MoreVertical, Reply, Eye, CheckCircle, Archive } from 'lucide-react';

const formsData = [
  {
    studentName: 'Emily Rodriguez',
    studentId: 'SD2025003',
    program: 'Diploma Program',
    subject: 'Payment deadline approaching - unable to access payment portal',
    message: "Hi, I'm trying to make my payment for the Winter 2025 term but I keep getting an error when I try to access the payment portal. The deadline is tomorrow and I'm worried about my registration being cancelled. Can someone please help me resolve this issue urgently?",
    status: 'Urgent',
    category: 'Payment Issues',
    date: '3 hours ago',
    fullDate: 'Jan 28, 2025',
    hasResponse: false
  },
  {
    studentName: 'David Park',
    studentId: 'SD2025004',
    program: 'Post-Diploma Program',
    subject: 'Course schedule conflicts between Web Development and Mobile App courses',
    message: "Hello, I noticed that the Web Development Advanced course (WEB301) and Mobile App Development (MOB201) both have classes scheduled for Tuesday and Thursday from 2:00-4:00 PM. I need to take both courses to complete my program requirements. Is there any possibility of changing one of the schedules?",
    status: 'Pending',
    category: 'Schedule Conflicts',
    date: '1 day ago',
    fullDate: 'Jan 27, 2025',
    hasResponse: false
  },
  {
    studentName: 'Lisa Chen',
    studentId: 'SD2025005',
    program: 'Certificate Program',
    subject: 'Prerequisites for Advanced Database course',
    message: "Hi there! I'm interested in enrolling in the Advanced Database course for the Spring term. I have some experience with basic SQL from my previous job, but I'm not sure if I meet all the prerequisites. Could you please let me know what the specific requirements are and when registration opens?",
    status: 'New',
    category: 'Course Inquiry',
    date: '2 days ago',
    fullDate: 'Jan 26, 2025',
    hasResponse: false
  },
  {
    studentName: 'Marcus Williams',
    studentId: 'SD2025006',
    program: 'Diploma Program',
    subject: 'Unable to register for elective courses',
    message: "I'm having trouble registering for my elective courses. The system shows that I have completed all the core requirements, but when I try to select electives, it says I don't have permission. Can you help me understand what I might be missing?",
    status: 'Responded',
    category: 'Registration Help',
    date: '3 days ago',
    fullDate: 'Jan 25, 2025',
    hasResponse: true,
    adminResponse: {
      message: "Hi Marcus, I've reviewed your account and updated your permissions. You should now be able to register for elective courses. Please try again and let us know if you encounter any issues.",
      date: '2 days ago'
    }
  }
];

const stats = [
  { label: 'Total Forms', value: '47', icon: Mail },
  { label: 'New Forms', value: '8', icon: Inbox },
  { label: 'Urgent', value: '3', icon: AlertTriangle },
  { label: 'Pending Response', value: '12', icon: Clock }
];

const SubmittedForms = () => {
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [dateFilter, setDateFilter] = useState('All Time');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(formsData);

  // Apply filters
  const applyFilters = () => {
    let filtered = formsData.filter(form => {
      const matchesStatus =
        statusFilter === 'All Status' || form.status === statusFilter;
      const matchesCategory =
        categoryFilter === 'All Categories' || form.category === categoryFilter;
      const matchesSearch =
        form.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        form.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        form.message.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesStatus && matchesCategory && matchesSearch;
    });

    setFilteredData(filtered);
  };

  const clearFilters = () => {
    setStatusFilter('All Status');
    setCategoryFilter('All Categories');
    setDateFilter('All Time');
    setSearchQuery('');
    setFilteredData(formsData);
  };

  return (
    <div className="p-8">
      {/* Filters Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="grid grid-cols-3 gap-4 mb-4">
          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option>All Status</option>
              <option>New</option>
              <option>Pending</option>
              <option>Urgent</option>
              <option>Responded</option>
              <option>Resolved</option>
            </select>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Category</label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option>All Categories</option>
              <option>Payment Issues</option>
              <option>Course Inquiry</option>
              <option>Schedule Conflicts</option>
              <option>Registration Help</option>
              <option>Technical Support</option>
            </select>
          </div>

          {/* Date Range Filter (not functional yet) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option>All Time</option>
              <option>Today</option>
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Custom Range</option>
            </select>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={applyFilters}
            className="bg-gray-900 text-white px-6 py-2.5 rounded-lg flex items-center gap-2 hover:bg-gray-800 transition-colors"
          >
            <Filter size={18} />
            <span className="font-medium">Apply Filters</span>
          </button>
          <button
            onClick={clearFilters}
            className="text-gray-700 px-4 py-2.5 flex items-center gap-2 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <X size={18} />
            <span className="font-medium">Clear</span>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search forms by student name, subject, or content..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={applyFilters}
            className="bg-gray-900 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-gray-800 transition-colors"
          >
            Search
          </button>        
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-6 mb-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-3">
                <p className="text-sm text-gray-600">{stat.label}</p>
                <Icon size={20} className="text-gray-400" />
              </div>
              <p className="text-3xl font-semibold text-gray-900">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Filtered Results */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Student Form Submissions</h3>
          <span className="text-sm text-gray-600">
            Showing {filteredData.length} result{filteredData.length !== 1 && 's'}
          </span>
        </div>

        <div className="divide-y divide-gray-200">
          {filteredData.map((form, idx) => (
            <div key={idx} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-10 h-10" viewBox="0 0 40 40" fill="none">
                    <circle cx="20" cy="14" r="6" fill="#000" />
                    <path d="M12 28 Q12 22 20 22 Q28 22 28 28" stroke="#000" strokeWidth="1.5" fill="none" />
                    <circle cx="16" cy="14" r="1" fill="#fff" />
                    <circle cx="24" cy="14" r="1" fill="#fff" />
                  </svg>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-semibold text-gray-900">{form.studentName}</h4>
                      <span
                        className={`px-2.5 py-0.5 rounded text-xs font-medium ${
                          form.status === 'Urgent'
                            ? 'bg-red-100 text-red-700'
                            : form.status === 'Pending'
                            ? 'bg-yellow-100 text-yellow-700'
                            : form.status === 'New'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-green-100 text-green-700'
                        }`}
                      >
                        {form.status}
                      </span>
                      <span className="px-2.5 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700">
                        {form.category}
                      </span>
                    </div>
                    <div className="text-right text-sm text-gray-500">
                      <p>{form.date}</p>
                      <p className="text-xs">{form.fullDate}</p>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600">
                    Student ID: {form.studentId} • {form.program}
                  </p>
                  <p className="text-sm font-medium text-gray-900 mt-1">Subject: {form.subject}</p>

                  <p className="text-sm text-gray-700 mt-2 leading-relaxed">{form.message}</p>

                  {form.hasResponse && form.adminResponse && (
                    <div className="bg-gray-50 rounded-lg p-4 mt-4 border-l-4 border-gray-900">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 bg-gray-900 text-white rounded-full flex items-center justify-center text-xs font-bold">
                          BC
                        </div>
                        <span className="text-sm font-medium text-gray-900">Admin Response</span>
                        <span className="text-xs text-gray-500">• {form.adminResponse.date}</span>
                      </div>
                      <p className="text-sm text-gray-700 pl-8">{form.adminResponse.message}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {filteredData.length === 0 && (
            <div className="text-center py-10 text-gray-500">No forms match your filters or search.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubmittedForms;
