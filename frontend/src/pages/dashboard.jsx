import { useState, useEffect } from "react";
import {
  BarChart3,
  User,
  Plus,
  Edit,
  Mail,
  Users,
  GraduationCap,
  FileText,
  Contact,
  Menu,
  X,
} from "lucide-react";
import SidebarMenu from "../components/SidebarMenu.jsx";
import Header from "../components/Header.jsx";
import MainContent from "../components/MainContent.jsx";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const userType = localStorage.getItem("currentUser")
    ? JSON.parse(localStorage.getItem("currentUser")).userType
    : null;

  useEffect(() => {
    // Only redirect if we're currently on /dashboard
    if (userType && userType === "student") {
      navigate("/dashboard/studentdashboard");
    }
  }, []);

  const allMenuItems = [
  
    // ADMIN
    {
      id: "dashboard",
      label: "Dashboard",
      icon: BarChart3,
      route: "/dashboard",
      access: ["admin"],
    },
    {
      id: "courses",
      label: "Courses",
      icon: FileText,
      route: "/dashboard/coursesadmin",
      access: ["admin"],
    },
    {
      id: "profile",
      label: "View Profile",
      icon: User,
      route: "/dashboard/profile",
      access: ["admin"],
    },
    {
      id: "students",
      label: "Registered Students",
      icon: Users,
      route: "/dashboard/students",
      access: ["admin"],
    },
    {
      id: "forms",
      label: "Submitted Forms",
      icon: Mail,
      route: "/dashboard/forms",
      access: ["admin"],
    },

    // STUDENT
    {
      id: "dashboard",
      label: "Dashboard",
      icon: BarChart3,
      route: "/dashboard/studentdashboard",
      access: ["student"],
    },
    {
      id: "profile",
      label: "View Profile",
      icon: User,
      route: "/dashboard/studentprofile",
      access: ["student"],
    },
    {
      id: "terms",
      label: "Term Selection",
      icon: GraduationCap,
      route: "/dashboard/terms",
      access: ["student"],
    },
    {
      id: "courseRegistrations",
      label: "Course Registration",
      icon: Plus,
      route: "/dashboard/courseregistration",
      access: ["student"],
    },
    {
      id: "my-courses",
      label: "My Courses",
      icon: Edit,
      route: "/dashboard/my-courses",
      access: ["student"],
    },
    {
      id: "contactAdmin",
      label: "Contact Admin",
      icon: Contact,
      route: "/dashboard/contact",
      access: ["student"],
    },
  ];

  const menuItems = allMenuItems.filter((item) =>
    item.access.includes(userType)
  );

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar for desktop */}
      <div className="hidden md:flex">
        <SidebarMenu menuItems={menuItems} />
      </div>

      {/* Mobile sidebar overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden transition-opacity ${
          sidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      {/* Sidebar for mobile */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out md:hidden ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Menu</h2>
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <SidebarMenu menuItems={menuItems} />
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-auto">
        {/* Mobile Header / Sidebar Toggle */}
        <div className="flex items-center justify-between border-b bg-white px-4 py-3 md:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-gray-700"
          >
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-semibold">
            <div
              className="flex items-center gap-2 hover:cursor-pointer"
              onClick={() => navigate("/")}
            >
              <GraduationCap className="w-6 h-6" />
              <span className="text-lg font-semibold">
                Bow Course Registration
              </span>
            </div>
          </h1>
          <div className="w-6" /> {/* Spacer */}
        </div>

        {/* Desktop Header */}
        <div className="hidden md:block">
          <Header />
        </div>

        <MainContent />
      </main>
    </div>
  );
};

export default Dashboard;
