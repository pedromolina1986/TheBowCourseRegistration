import React, { useState, useEffect } from "react";
import {
  GraduationCap,
  BookOpen,
  CalendarDays,
  Inbox,
  CheckCircle2,
} from "lucide-react";

const StudentDashboard = () => {
  // Load the saved user from localStorage
  const storedUser = localStorage.getItem("currentUser")
    ? JSON.parse(localStorage.getItem("currentUser"))
    : null;

  // Define states for displayed info
  const [studentName, setStudentName] = useState("Student");
  const [program, setProgram] = useState("Your Program");
  const [termName, setTermName] = useState("Current Term");

  // Load data when the component mounts
  useEffect(() => {
    if (!storedUser) return;

    // Use user_name directly, since that's what we have from backend
    setStudentName(storedUser.user_name || "Student");

    // Show something descriptive for user_type
    if (storedUser.user_type === "student") {
      setProgram("Software Development Program");
    } else if (storedUser.user_type === "admin") {
      setProgram("Administrator");
    }

    setTermName("Current Term");
  }, [storedUser]);

  //JSX rendering
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4 sm:p-6 lg:p-10">
      {/* ==== Header Section ==== */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">
            Welcome back, {studentName}!
          </h1>
          <p className="text-gray-500 text-sm sm:text-base mt-1">
            Here&apos;s your academic overview for {termName}.
          </p>
        </div>

        <div className="flex items-center space-x-3 bg-white px-4 py-2 rounded-full shadow-sm">
          <GraduationCap className="w-6 h-6 text-blue-600" />
          <div>
            <p className="text-sm font-semibold text-gray-800">{program}</p>
            <p className="text-xs text-gray-500">{storedUser?.user_type}</p>
          </div>
        </div>
      </header>

      {/* ==== Stats Cards ==== */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-2xl p-4 shadow-sm flex items-center gap-3">
          <div className="p-3 rounded-full bg-blue-100">
            <BookOpen className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide">
              Registered Courses
            </p>
            <p className="text-xl font-semibold text-gray-900">4</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm flex items-center gap-3">
          <div className="p-3 rounded-full bg-purple-100">
            <CalendarDays className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide">
              Current Term
            </p>
            <p className="text-sm font-semibold text-gray-900">{termName}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm flex items-center gap-3">
          <div className="p-3 rounded-full bg-green-100">
            <Inbox className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide">
              Messages
            </p>
            <p className="text-xl font-semibold text-gray-900">2</p>
          </div>
        </div>
      </section>

      {/* ==== Recent Activity ==== */}
      <section className="bg-white rounded-2xl p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Recent Activity
        </h2>
        <ul className="space-y-3 text-sm text-gray-700">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5" />
            <span>Registered for &quot;Intro to Programming&quot;</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5" />
            <span>Updated profile information</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5" />
            <span>Viewed term selection options</span>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default StudentDashboard;
