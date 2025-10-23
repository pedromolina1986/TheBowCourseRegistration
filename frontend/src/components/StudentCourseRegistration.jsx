import React, { useState } from "react";
import { FaSearch, FaFilter, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const StudentCourseRegistration = () => {
  const navigate = useNavigate();
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [search, setSearch] = useState("");

  const courses = [
    {
      code: "SDEV101",
      title: "Programming Fundamentals",
      credits: 3,
      description:
        "Introduction to programming concepts using modern programming languages. Students will learn variables, data types, control structures, and basic algorithms.",
      schedule: "Jan 15 – Mar 30, 2025 | Wed 9:00–10:30 AM",
      instructor: "Dr. Sarah Johnson",
      availableSeats: 12,
      totalSeats: 25,
      level: "First Year",
      type: "Core",
    },
    {
      code: "SDEV102",
      title: "Database Design",
      credits: 3,
      description:
        "Comprehensive study of database design principles, normalization, SQL, and database management systems.",
      schedule: "Jan 15 – Mar 30, 2025 | Thu 2:00–3:30 PM",
      instructor: "Prof. Michael Chen",
      availableSeats: 8,
      totalSeats: 20,
      level: "First Year",
      type: "Core",
    },
    {
      code: "SDEV103",
      title: "Web Development Fundamentals",
      credits: 4,
      description:
        "Introduction to web development technologies including HTML, CSS, JavaScript, and modern frameworks.",
      schedule: "Jan 15 – Mar 30, 2025 | Wed 11:00–12:30 PM",
      instructor: "Ms. Emily Rodriguez",
      availableSeats: 15,
      totalSeats: 22,
      level: "First Year",
      type: "Core",
    },
    {
      code: "SDEV104",
      title: "Software Security",
      credits: 3,
      description:
        "Study of software security principles, vulnerabilities, and testing methodologies.",
      schedule: "Jan 15 – Mar 30, 2025 | Thu 9:00–12:00 PM",
      instructor: "Dr. James Wilson",
      availableSeats: 6,
      totalSeats: 18,
      level: "First Year",
      type: "Core",
    },
    {
      code: "SDEV105",
      title: "Object-Oriented Programming",
      credits: 4,
      description:
        "Advanced programming concepts including classes, objects, inheritance, and design patterns using Java and C#.",
      schedule: "Jan 15 – Mar 30, 2025 | Thu 11:00–1:00 PM",
      instructor: "Dr. Sarah Johnson",
      availableSeats: 0,
      totalSeats: 20,
      level: "First Year",
      type: "Core",
    },
    {
      code: "SDEV106",
      title: "Systems Analysis & Design",
      credits: 3,
      description:
        "Methodologies for analyzing, designing, and implementing information systems. Focus on requirements gathering and system modeling.",
      schedule: "Jan 15 – Mar 30, 2025 | Wed 2:00–3:00 PM",
      instructor: "Prof. Michael Chen",
      availableSeats: 10,
      totalSeats: 16,
      level: "First Year",
      type: "Core",
    },
  ];

  const toggleCourse = (code) => {
    if (selectedCourses.includes(code)) {
      setSelectedCourses(selectedCourses.filter((c) => c !== code));
    } else {
      setSelectedCourses([...selectedCourses, code]);
    }
  };

  const filteredCourses = courses.filter(
    (course) =>
      course.code.toLowerCase().includes(search.toLowerCase()) ||
      course.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold">
            Course Registration
          </h1>
          <p className="text-gray-500 text-sm sm:text-base">
            Browse and register for courses in your program — Winter 2025
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <FaUserCircle className="text-3xl sm:text-4xl text-gray-400" />
          <div>
            <p className="font-semibold">John Smith</p>
            <p className="text-sm text-gray-500">Student</p>
          </div>
        </div>
      </div>

      {/* Top Controls */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 flex-wrap">
          <div className="relative w-full sm:w-72">
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search courses by name or code"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg w-full"
            />
          </div>
          <button className="flex items-center border px-3 py-2 rounded-lg hover:bg-gray-100">
            <FaFilter className="mr-2" /> Filters
          </button>
          <select className="border rounded-lg px-3 py-2 w-full sm:w-auto">
            <option>All Terms</option>
            <option>Winter 2025</option>
            <option>Spring 2025</option>
          </select>
        </div>
        <button
          className="border px-4 py-2 rounded-lg hover:bg-gray-100"
          onClick={() => navigate("/dashboard/coursecart")}
        >
          View Cart ({selectedCourses.length})
        </button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 text-sm">
        <div>
          <h3 className="font-semibold mb-2">Course Level</h3>
          <label className="block">
            <input type="checkbox" defaultChecked /> First Year (12)
          </label>
          <label className="block">
            <input type="checkbox" /> Second Year (6)
          </label>
          <label className="block">
            <input type="checkbox" /> Electives (8)
          </label>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Course Type</h3>
          <label className="block">
            <input type="checkbox" defaultChecked /> Core (15)
          </label>
          <label className="block">
            <input type="checkbox" /> Lab (8)
          </label>
          <label className="block">
            <input type="checkbox" /> Project (3)
          </label>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Credits</h3>
          <label className="block">
            <input type="checkbox" defaultChecked /> 3 Credits (18)
          </label>
          <label className="block">
            <input type="checkbox" /> 4 Credits (6)
          </label>
          <label className="block">
            <input type="checkbox" /> 6 Credits (2)
          </label>
        </div>
        <div className="flex justify-start sm:justify-end items-start sm:items-end">
          <p className="text-gray-600">
            Selected: {selectedCourses.length} / {courses.length} courses
          </p>
        </div>
      </div>

      {/* Courses List */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl shadow">
        <h2 className="font-semibold mb-4 text-lg">
          Available Courses ({filteredCourses.length} found)
        </h2>

        {filteredCourses.map((course) => (
          <div
            key={course.code}
            className="border-b last:border-0 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3"
          >
            <div className="flex-1">
              <h3 className="font-semibold text-lg">
                {course.code} – {course.title}{" "}
                <span className="text-sm text-gray-500">
                  ({course.credits} Credits)
                </span>
              </h3>
              <p className="text-gray-600 text-sm mb-2">{course.description}</p>
              <p className="text-gray-500 text-sm mb-1">📅 {course.schedule}</p>
              <p className="text-gray-500 text-sm mb-2">
                👨‍🏫 {course.instructor}
              </p>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="border rounded-full px-2 py-1">Core</span>
                <span className="border rounded-full px-2 py-1">
                  {course.level}
                </span>
              </div>
            </div>

            <div className="text-right flex-shrink-0 flex flex-col items-end gap-2 mt-2 sm:mt-0">
              <p className="text-sm text-gray-500 mb-1">
                Available Seats:{" "}
                <span className="font-semibold">
                  {course.availableSeats}/{course.totalSeats}
                </span>
              </p>
              <button
                onClick={() => toggleCourse(course.code)}
                disabled={course.availableSeats === 0}
                className={`px-4 py-2 rounded-lg text-sm ${
                  selectedCourses.includes(course.code)
                    ? "bg-gray-200 text-gray-600"
                    : course.availableSeats === 0
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                {selectedCourses.includes(course.code)
                  ? "✓ Added"
                  : course.availableSeats === 0
                  ? "Full"
                  : "Add to Cart"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 space-x-2 flex-wrap gap-2">
        <button className="border px-3 py-1 rounded">1</button>
        <button className="border px-3 py-1 rounded">2</button>
        <button className="border px-3 py-1 rounded">3</button>
      </div>
    </div>
  );
};

export default StudentCourseRegistration;
