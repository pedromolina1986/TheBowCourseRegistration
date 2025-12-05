import React, { useState, useEffect } from "react";
import {
  FaSearch,
  FaCalendarAlt,
  FaUserTie,
  FaPlus,
  FaTimes,
} from "react-icons/fa";

const StudentMyCourses = () => {
  const allCourses = [
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



  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTerm, setSelectedTerm] = useState("All Terms");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [selectedMaxCredits, setSelectedMaxCredits] = useState("All");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [addSelection, setAddSelection] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const storedCourses = localStorage.getItem("studentCourses");
    if (storedCourses) {
      const parsed = JSON.parse(storedCourses);
      setCourses(parsed);
    } else {
      // only runs first time ever (no stored data)
      const initial = allCourses.filter(
        (c) => c.status === "Enrolled" || c.status === "In Progress"
      );
      setCourses(initial);
      localStorage.setItem("studentCourses", JSON.stringify(initial));
    }
    setLoaded(true);
  }, []);
  
  useEffect(() => {
    if (loaded) {
      localStorage.setItem("studentCourses", JSON.stringify(courses));
    }
  }, [courses, loaded]);

  const handleDrop = (code) => {
    if (window.confirm("Are you sure you want to drop this course?")) {
      const updated = courses.filter((course) => course.code !== code);
      setCourses(updated);
    }
  };

  const handleAddCourse = () => {
    if (!addSelection) {
      alert("Please select a course to add!");
      return;
    }
    const selected = allCourses.find((c) => c.code === addSelection);
    if (selected) {
      const updated = [...courses, { ...selected, status: "Enrolled" }];
      setCourses(updated);
      setAddSelection("");
      setShowAddModal(false);
    }
  };

  // 🔹 Filters
  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTerm =
      selectedTerm === "All Terms" || course.term === selectedTerm;
    const matchesStatus =
      selectedStatus === "All Status" || course.status === selectedStatus;
    const matchesCredits =
      selectedMaxCredits === "All" ||
      course.credits <= Number(selectedMaxCredits);
    return matchesSearch && matchesTerm && matchesStatus && matchesCredits;
  });

  const availableCourses = allCourses.filter(
    (c) => !courses.find((enrolled) => enrolled.code === c.code)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 px-10 py-6 text-gray-800 relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">My Courses</h1>
          <p className="text-gray-500">
            Manage your enrolled courses ({courses.length} total)
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700"
        >
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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <select
          value={selectedTerm}
          onChange={(e) => setSelectedTerm(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option>All Terms</option>
          <option>Winter 2025</option>
          <option>Summer 2025</option>
          <option>Spring 2025</option>
          <option>Fall 2025</option>
        </select>

        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option>All Status</option>
          <option>Enrolled</option>
          <option>In Progress</option>
        </select>

        <select
          value={selectedMaxCredits}
          onChange={(e) => setSelectedMaxCredits(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="All">All Credits</option>
          <option value="1">1 or less</option>
          <option value="2">2 or less</option>
          <option value="3">3 or less</option>
          <option value="4">4 or less</option>
        </select>
      </div>

      {/* Course Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
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
                <button
                  className="text-blue-600 text-sm hover:underline"
                  onClick={() => setSelectedCourse(course)}
                >
                  View Details
                </button>
                <button
                  className="text-red-500 text-sm hover:underline"
                  onClick={() => handleDrop(course.code)}
                >
                  Drop
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-3 text-center text-gray-500 py-10 bg-white rounded-xl border">
            No courses registered.
          </div>
        )}
      </div>

      {/* Course Details Modal */}
      {selectedCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-11/12 md:w-1/2 shadow-lg relative">
            <button
              onClick={() => setSelectedCourse(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <FaTimes />
            </button>
            <h2 className="text-xl font-semibold mb-2">{selectedCourse.title}</h2>
            <p className="text-gray-600 mb-3">
              <strong>Course Code:</strong> {selectedCourse.code}
            </p>
            <p className="text-gray-600 mb-3">
              <strong>Instructor:</strong> {selectedCourse.instructor}
            </p>
            <p className="text-gray-600 mb-3">
              <strong>Schedule:</strong> {selectedCourse.schedule}
            </p>
            <p className="text-gray-700 mb-4">{selectedCourse.description}</p>
            <button
              onClick={() => setSelectedCourse(null)}
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Add Course Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-96 shadow-lg relative">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <FaTimes />
            </button>
            <h2 className="text-lg font-semibold mb-4">Add New Course</h2>
            {availableCourses.length > 0 ? (
              <>
                <select
                  value={addSelection}
                  onChange={(e) => setAddSelection(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a course</option>
                  {availableCourses.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.code} — {c.title}
                    </option>
                  ))}
                </select>
                <button
                  onClick={handleAddCourse}
                  className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Add Course
                </button>
              </>
            ) : (
              <p className="text-gray-500">All available courses are already enrolled.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentMyCourses;
