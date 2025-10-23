import React from "react";
import { FaSearch, FaCalendarAlt, FaUserTie, FaPlus } from "react-icons/fa";

const  StudentMyCourses = () => {
  const courses = [
    {
      code: "SDEV102",
      title: "Database Design",
      status: "Enrolled",
      term: "Winter 2025",
      date: "Jan 15 - Mar 30, 2025",
      schedule: "Tue, Thu 2:00–3:30 PM",
      instructor: "Prof. Michael Chen",
      credits: 3,
    },
    {
      code: "SDEV104",
      title: "Software Security",
      status: "Enrolled",
      term: "Winter 2025",
      date: "Jan 15 - Mar 30, 2025",
      schedule: "Fri 9:00–12:00 PM",
      instructor: "Dr. James Wilson",
      credits: 3,
    },
    {
      code: "SDEV107",
      title: "Mobile App Development",
      status: "In Progress",
      term: "Winter 2025",
      date: "Jan 15 - Mar 30, 2025",
      schedule: "Mon, Wed 3:00–4:30 PM",
      instructor: "Ms. Lisa Park",
      credits: 4,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 px-10 py-6 text-gray-800">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">My Courses</h1>
          <p className="text-gray-500">Manage your enrolled courses for Winter 2025</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700">
          <FaPlus /> Add Course
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6 items-center">
        <div className="relative w-full md:w-1/3">
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search your courses"
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <select className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>All Terms</option>
          <option>Winter 2025</option>
          <option>Spring 2025</option>
        </select>
        <select className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>All Status</option>
          <option>Enrolled</option>
          <option>In Progress</option>
        </select>
      </div>

      {/* Course Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {courses.map((course) => (
          <div
            key={course.code}
            className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition"
          >
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-semibold text-lg">{course.code}</h2>
              <span
                className={`text-sm px-2 py-1 rounded-full ${
                  course.status === "Enrolled"
                    ? "bg-green-100 text-green-600"
                    : "bg-yellow-100 text-yellow-600"
                }`}
              >
                {course.status}
              </span>
            </div>
            <p className="text-gray-700 font-medium mb-1">{course.title}</p>
            <p className="text-sm text-gray-500 mb-2">
              <FaCalendarAlt className="inline mr-1" /> {course.date}
            </p>
            <p className="text-sm text-gray-500 mb-2">
              <FaCalendarAlt className="inline mr-1" /> {course.schedule}
            </p>
            <p className="text-sm text-gray-500">
              <FaUserTie className="inline mr-1" /> {course.instructor}
            </p>
            <p className="text-sm text-gray-600 mt-2">{course.credits} Credits</p>
            <div className="mt-4 flex justify-between">
              <button className="text-blue-600 text-sm hover:underline">View Details</button>
              <button className="text-red-500 text-sm hover:underline">Drop</button>
            </div>
          </div>
        ))}

        {/* Add Course Card */}
        <div className="flex flex-col items-center justify-center bg-gray-100 p-5 rounded-xl border border-gray-300 hover:bg-gray-200 transition">
          <FaPlus className="text-gray-500 text-3xl mb-2" />
          <p className="font-medium text-gray-700">Add New Course</p>
          <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
            Browse Courses
          </button>
        </div>
      </div>

      {/* Course Schedule Overview */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
        <h3 className="text-lg font-semibold mb-4">Course Schedule Overview</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-t border-gray-200">
            <thead>
              <tr className="text-gray-500 text-sm">
                <th className="py-2">Monday</th>
                <th>Tuesday</th>
                <th>Wednesday</th>
                <th>Thursday</th>
                <th>Friday</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-sm">
                <td className="py-3">SDEV107<br />3:00–4:30 PM</td>
                <td>SDEV102<br />2:00–3:30 PM</td>
                <td>SDEV107<br />3:00–4:30 PM</td>
                <td>SDEV102<br />2:00–3:30 PM</td>
                <td>SDEV104<br />9:00–12:00 PM</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h4 className="font-semibold mb-3">Course Statistics</h4>
          <p>Total Credits: <span className="font-medium">10</span></p>
          <p>Enrolled Courses: <span className="font-medium">3</span></p>
          <p>Completed Courses: <span className="font-medium">0</span></p>
          <p>GPA: <span className="font-medium">-</span></p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 md:col-span-2">
          <h4 className="font-semibold mb-3">Quick Actions</h4>
          <div className="flex flex-wrap gap-3">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
              + Add Course
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm">
              🔍 Search Courses
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentMyCourses;
