import React, { useState, useEffect } from "react";
import {
  BarChart3,
  User,
  Plus,
  Edit,
  Search,
  Users,
  Mail,
  GraduationCap,
  FileText,
  ChevronRight,
  MoreVertical,
  UserPlus,
  Bell,
  Settings,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../services/api"; // Import your API utility

// --- Mock Data / API Simulation ---

// Initial/Placeholder State while loading
const initialStats = [
  { label: "Total Students", value: "...", change: "Loading...", icon: Users, colors: "text-blue-300" },
  { label: "Active Courses", value: "...", change: "Loading...", icon: BarChart3, colors: "text-green-300" },
  { label: "Programs", value: "...", change: "Loading...", icon: GraduationCap, colors: "text-purple-300" },
  { label: "Pending Forms", value: "...", change: "Loading...", icon: Mail, colors: "text-red-300" },
];
const initialEnrollmentData = [];
const initialRecentActivities = [];
const initialStudentQuestions = [];

const quickActions = [
  { label: "Create New Course", icon: Plus, path: "/dashboard/courseForm" },
  { label: "View All Students", icon: Users, path: "/dashboard/students" },
  { label: "Review Forms", icon: Mail, path: "/dashboard/forms" },
];

/**
 * Simulates an API call to fetch dashboard data.
 * In a real app, you would replace this with a 'fetch' or 'axios' call.
 */
const mockFetchDashboardData = async () => {
  
  //api which returns stats
  const statsAPI = await api.get("/dashboard/stats/admin");
  const enrollmentAPI = await api.get("/dashboard/enrollment/admin");
  const activitiesAPI = await api.get("/dashboard/activities/admin");
  const questionsAPI = await api.get("/dashboard/questions/admin");

  // The actual mock data payload
  return {
    stats: statsAPI.data,
    enrollmentData: enrollmentAPI.data,
    recentActivities: activitiesAPI.data,
    studentQuestions: questionsAPI.data
  };
};

// --- Component Definition ---

const DashboardAdmin = () => {
  const navigate = useNavigate();

  // 1. Define state variables
  const [stats, setStats] = useState(initialStats);
  const [enrollmentData, setEnrollmentData] = useState(initialEnrollmentData);
  const [recentActivities, setRecentActivities] = useState(initialRecentActivities);
  const [studentQuestions, setStudentQuestions] = useState(initialStudentQuestions);
  const [isLoading, setIsLoading] = useState(true);

  // 2. Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await mockFetchDashboardData();
        setStats(data.stats);
        setEnrollmentData(data.enrollmentData);
        setRecentActivities(data.recentActivities);
        setStudentQuestions(data.studentQuestions);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array means it runs once

  // Helper function for status colors
  const getStatusClasses = (status) => {
    if (status === "New") return "bg-blue-100 text-blue-700";
    if (status === "Urgent") return "bg-red-100 text-red-700";
    return "bg-yellow-100 text-yellow-700";
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-blue-100 to-purple-100 min-h-screen">
      
      {/* Loading Indicator */}
      {isLoading && (
        <div className="flex items-center justify-center p-4 mb-4 bg-yellow-50 text-yellow-700 border border-yellow-200 rounded-lg">
          <Bell size={18} className="mr-2"/>
          <p className="text-sm font-medium">
            Loading dashboard data from mock server...
          </p>
        </div>
      )}

      {/* User Info Card */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
              <User size={32} className="text-gray-600" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-white">
                {localStorage.getItem("currentUser")
                  ? JSON.parse(localStorage.getItem("currentUser")).user_name
                  : "Admin User"}
              </h2>
              <p className="text-sm text-white">
                Administrator • SD Department
              </p>
              <div className="flex items-center gap-1 mt-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs text-white">
                  Admin Status: Active
                </span>
              </div>
            </div>
          </div>
          <div className="text-left sm:text-right">
            <p className="text-sm text-white">Last Login</p>
            <p className="text-base font-medium text-white">Today, 9:15 AM</p>
          </div>
        </div>
      </div>

      {/* Stats Grid - Data from 'stats' state */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className={`bg-white rounded-lg shadow-sm border border-gray-200 p-5 flex flex-col justify-between`}
            >
              <div className="flex items-start justify-between mb-3">
                <p className="text-sm text-gray-600">{stat.label}</p>
                <Icon size={20} className={`${stat.colors}`} />
              </div>
              <p className="text-3xl font-semibold text-gray-900 mb-1">
                {stat.value}
              </p>
              <p className="text-xs text-gray-600">{stat.change}</p>
            </div>
          );
        })}
      </div>

      {/* Program Enrollment + Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        
        {/* Program Enrollment - Data from 'enrollmentData' state */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="bg-white rounded-t-lg p-5 border-b border-gray-200 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              Program Enrollment
            </h3>
            <button className="p-1 hover:bg-gray-100 rounded">
              <MoreVertical size={20} className="text-gray-400" />
            </button>
          </div>
          <div className="p-5">
             {enrollmentData.length === 0 && !isLoading ? <p className="text-gray-500">No enrollment data available.</p> : enrollmentData.map((item, idx) => (
              <div
                key={idx}
                className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 ${
                  idx !== enrollmentData.length - 1
                    ? "pb-5 mb-5 border-b border-gray-200"
                    : ""
                }`}
              >
                <div>
                  <p className="font-medium text-gray-900 mb-1">
                    {item.program}
                  </p>
                  <p className="text-sm text-gray-500">{item.duration}</p>
                </div>
                <div className="text-left sm:text-right">
                  <p className="text-2xl font-semibold text-gray-900">
                    {item.students}
                  </p>
                  <p className="text-sm text-gray-500">students</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity - Data from 'recentActivities' state */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="bg-white rounded-t-lg p-5 border-b border-gray-200 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              Recent Activity
            </h3>
            <button className="p-1 hover:bg-gray-100 rounded">
              <MoreVertical size={20} className="text-gray-400" />
            </button>
          </div>
          <div className="p-5">
            {recentActivities.length === 0 && !isLoading ? <p className="text-gray-500">No recent activity.</p> : recentActivities.map((activity, idx) => {
              const Icon = activity.icon;
              // Adjusted class for better look with Tailwind's utility classes
              const iconBgClass = activity.colors.replace('bg-', 'bg-').replace('/30', '/10');
              const iconTextClass = activity.colors.replace('bg-', 'text-');
              
              return (
                <div
                  key={idx}
                  className={`flex gap-3 ${
                    idx !== recentActivities.length - 1
                      ? "pb-4 mb-4 border-b border-gray-200"
                      : ""
                  }`}
                >
                  <div className={`${iconBgClass} w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <Icon size={16} className={`${iconTextClass.replace('bg-', 'text-')}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 mb-0.5">
                      {activity.title}
                    </p>
                    <p className="text-xs text-gray-500 mb-1">
                      {activity.description}
                    </p>
                    <p className="text-xs text-gray-400">{activity.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Quick Actions + Student Questions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Quick Actions (Static Data) */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="bg-white rounded-t-lg p-5 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Quick Actions
            </h3>
          </div>
          <div className="p-4">
            {quickActions.map((action, idx) => {
              const Icon = action.icon;
              return (
                <button
                  key={idx}
                  className="w-full flex items-center justify-between px-4 py-3 hover:bg-blue-100 rounded-lg transition-colors mb-1"
                  onClick={() => navigate(action.path)}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={18} className="text-gray-600" />
                    <span className="text-sm font-medium text-gray-900">
                      {action.label}
                    </span>
                  </div>
                  <ChevronRight size={18} className="text-gray-400" />
                </button>
              );
            })}
          </div>
        </div>

        {/* Recent Student Questions - Data from 'studentQuestions' state */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="bg-white rounded-t-lg p-5 border-b border-gray-200 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              Recent Student Questions
            </h3>
            <button className="p-1 hover:bg-gray-100 rounded">
              <MoreVertical size={20} className="text-gray-400" />
            </button>
          </div>
          <div className="p-5">
            {studentQuestions.length === 0 && !isLoading ? <p className="text-gray-500">No student questions.</p> : studentQuestions.map((q, idx) => (
              <div
                key={idx}
                className={`${
                  idx !== studentQuestions.length - 1
                    ? "pb-5 mb-5 border-b border-gray-200"
                    : ""
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2 gap-2">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <User size={20} className="text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{q.name}</p>
                      <p className="text-xs text-gray-500">{q.program}</p>
                    </div>
                  </div>
                  <span
                    className={`px-2.5 py-1 rounded text-xs font-medium self-start sm:self-auto ${getStatusClasses(q.status)}`}
                  >
                    {q.status}
                  </span>
                </div>
                <p className="text-sm text-gray-700 mb-1">{q.question}</p>
                <p className="text-xs text-gray-400">Submitted {q.time}</p>
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
  );
};

export default DashboardAdmin;