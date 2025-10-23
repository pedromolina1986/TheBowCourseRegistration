import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MdSearch } from "react-icons/md";
import { FaBookOpen, FaCheckCircle, FaCalendarAlt, FaPlus } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { IoMdSchool } from "react-icons/io";

const StudentDashboard = () => {
  const navigate = useNavigate();

  const [courses] = useState([
    {
      code: "SDEV101",
      name: "Programming Fundamentals",
      start: "Jan 15",
      end: "Mar 30, 2025",
      status: "Active",
    },
    {
      code: "SDEV102",
      name: "Database Design",
      start: "Jan 15",
      end: "Mar 30, 2025",
      status: "Active",
    },
    {
      code: "SDEV103",
      name: "Web Development",
      start: "Jan 15",
      end: "Mar 30, 2025",
      status: "Pending",
    },
    {
      code: "SDEV104",
      name: "Software Security",
      start: "Jan 15",
      end: "Mar 30, 2025",
      status: "Active",
    },
  ]);

  const stats = [
    { title: "Registered Courses", value: courses.length, icon: <IoMdSchool /> },
    { title: "Completed", value: 2, icon: <FaCheckCircle /> },
    { title: "In Progress", value: 2, icon: <FaBookOpen /> },
    { title: "Current Term", value: "Winter", icon: <FaCalendarAlt /> },
  ];

  const quickActions = [
    { name: "Register for Courses", icon: <FaPlus />, path: "/dashboard/courseregistration" },
    { name: "Select Term", icon: <FaCalendarAlt />, path: "/dashboard/terms" },
    { name: "Search Courses", icon: <MdSearch />, path: "/dashboard/my-courses" },
    { name: "Contact Admin", icon: <HiOutlineMail />, path: "/dashboard/contact" },
  ];
  const completedCredits = 15;
  const totalCredits = 60;
  const progressPercent = (completedCredits / totalCredits) * 100;

  return (
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
      {/* Header */}
      <motion.div
        className="flex flex-col md:flex-row justify-between items-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="text-center md:text-left">
          <h1 className="text-3xl font-semibold">Welcome back, John!</h1>
          <p className="text-gray-500">
            Here’s your academic overview for Winter 2025
          </p>
        </div>
        <div className="flex items-center mt-4 md:mt-0 space-x-3">
          {/* ✅ Profile image is now clickable but still need to navigate to the original profile file*/} 
          <img
            src="https://cdn-icons-png.flaticon.com/512/147/147144.png"
            alt="profile"
            onClick={() => navigate("/student/profile")}
            className="w-12 h-12 rounded-full border-2 border-blue-500 shadow-md cursor-pointer hover:scale-110 transition-transform"
          />
          <div>
            <p className="font-semibold">John Smith</p>
            <p className="text-sm text-gray-500">Student</p>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-2xl p-6 flex items-center justify-between shadow hover:shadow-lg transition"
          >
            <div>
              <p className="text-sm text-gray-500">{item.title}</p>
              <h2 className="text-2xl font-bold text-gray-800">{item.value}</h2>
            </div>
            <div className="text-blue-600 text-3xl">{item.icon}</div>
          </motion.div>
        ))}
      </div>

      {/* Courses & Quick Actions */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {/* Current Courses */}
        <motion.div
          className="col-span-2 bg-white p-6 rounded-2xl shadow"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-xl font-semibold mb-4">Current Courses</h2>
          <div className="space-y-4">
            {courses.map((course, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.02 }}
                className="border rounded-xl p-4 flex justify-between items-center hover:shadow-md transition"
              >
                <div>
                  <h3 className="font-semibold text-gray-800">
                    {course.code} - {course.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {course.start} – {course.end}
                  </p>
                </div>
                <span
                  className={`text-sm px-3 py-1 rounded-full ${
                    course.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {course.status}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          className="bg-white p-6 rounded-2xl shadow"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-3">
            {quickActions.map((action, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.03, backgroundColor: "#f3f4f6" }}
                onClick={() => navigate(action.path)}
                className="w-full flex justify-between items-center border p-3 rounded-xl text-left transition"
              >
                <span className="flex items-center gap-2 text-sm font-medium text-gray-800">
                  {action.icon} {action.name}
                </span>
                <span className="text-gray-400">›</span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Program Progress */}
      <motion.div
        className="bg-white p-6 rounded-2xl shadow"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-xl font-semibold mb-4">Program Progress</h2>
        <div className="mb-4">
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-3 bg-blue-600 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 1 }}
            ></motion.div>
          </div>
          <p className="text-sm text-gray-500 mt-2">Year 1 of 2</p>
        </div>

        <div className="grid sm:grid-cols-3 text-center">
          <div>
            <h3 className="text-xl font-bold">{completedCredits}</h3>
            <p className="text-sm text-gray-500">Credits Completed</p>
          </div>
          <div>
            <h3 className="text-xl font-bold">
              {totalCredits - completedCredits}
            </h3>
            <p className="text-sm text-gray-500">Credits Remaining</p>
          </div>
          <div>
            <h3 className="text-xl font-bold">{totalCredits}</h3>
            <p className="text-sm text-gray-500">Total Credits Required</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default StudentDashboard;
