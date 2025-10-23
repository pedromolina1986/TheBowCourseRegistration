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
      code: "SDEV102",
      title: "Database Design",
      status: "Enrolled",
      term: "Winter 2025",
      date: "Jan 15 - Mar 30, 2025",
      schedule: "Tue, Thu 2:00–3:30 PM",
      instructor: "Prof. Michael Chen",
      credits: 3,
      description:
        "Learn relational databases, SQL queries, normalization, and design principles for efficient data storage and retrieval.",
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
      description:
        "Covers secure coding, encryption, authentication, and defense against security vulnerabilities.",
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
      description:
        "Introduces mobile app development using React Native. Build cross-platform apps with interactive UI and local storage.",
    },
    {
      code: "SDEV202",
      title: "Cloud Computing",
      status: "Available",
      term: "Spring 2025",
      date: "Apr 5 - Jun 20, 2025",
      schedule: "Mon, Wed 1:00–2:30 PM",
      instructor: "Dr. Emma Lee",
      credits: 3,
      description:
        "Learn cloud architecture, deployment models, and services (IaaS, PaaS, SaaS) with hands-on AWS and Azure labs.",
    },
    {
      code: "SDEV300",
      title: "Artificial Intelligence",
      status: "Available",
      term: "Spring 2025",
      date: "Apr 10 - Jun 25, 2025",
      schedule: "Fri 10:00–12:00 PM",
      instructor: "Dr. Sarah Connor",
      credits: 3,
      description:
        "Explore machine learning, neural networks, and AI applications in automation and robotics.",
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

  // ✅ Load from localStorage — only initialize defaults on *first visit*
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

  // ✅ Keep localStorage synced
  useEffect(() => {
    if (loaded) {
      localStorage.setItem("studentCourses", JSON.stringify(courses));
    }
  }, [courses, loaded]);

  // ✅ Drop single course
  const handleDrop = (code) => {
    if (window.confirm("Are you sure you want to drop this course?")) {
      const updated = courses.filter((course) => course.code !== code);
      setCourses(updated);
    }
  };

  // ✅ Add selected course
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
<<<<<<< HEAD
  <div className="min-h-screen bg-gray-50 px-4 sm:px-10 py-6 text-gray-800">
    {/* Header */}
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3 sm:gap-0">
      <div>
        <h1 className="text-2xl font-semibold">My Courses</h1>
        <p className="text-gray-500 text-sm sm:text-base">
          Manage your enrolled courses for Winter 2025
        </p>
      </div>
      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700 self-start sm:self-auto">
        <FaPlus /> Add Course
      </button>
    </div>

    {/* Filters */}
    <div className="flex flex-col sm:flex-row flex-wrap gap-3 mb-6 items-start sm:items-center">
      <div className="relative w-full sm:w-1/3">
        <FaSearch className="absolute left-3 top-3 text-gray-400" />
        <input
          type="text"
          placeholder="Search your courses"
          className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <select className="border border-gray-300 rounded-lg px-3 py-2 w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-blue-500">
        <option>All Terms</option>
        <option>Winter 2025</option>
        <option>Spring 2025</option>
      </select>
      <select className="border border-gray-300 rounded-lg px-3 py-2 w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-blue-500">
        <option>All Status</option>
        <option>Enrolled</option>
        <option>In Progress</option>
      </select>
    </div>

    {/* Course Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
      {courses.map((course) => (
        <div
          key={course.code}
          className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition"
        >
          <div className="flex justify-between items-center mb-2 flex-wrap gap-2">
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
          <div className="mt-4 flex justify-between flex-wrap gap-2">
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
=======
    <div className="min-h-screen bg-gray-50 px-10 py-6 text-gray-800 relative">
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
          className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700"
        >
          <FaPlus /> Add Course
>>>>>>> 54b45b322431eacb28f0acdfb9763c7d6105d248
        </button>
      </div>
    </div>

<<<<<<< HEAD
    {/* Course Schedule Overview */}
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8 overflow-x-auto">
      <h3 className="text-lg font-semibold mb-4">Course Schedule Overview</h3>
      <table className="w-full text-left border-t border-gray-200 min-w-[500px]">
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

    {/* Bottom Stats */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
            Add Course
          </button>
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm">
            Search Courses
          </button>
        </div>
      </div>
=======
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
          <option>Spring 2025</option>
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
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
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
>>>>>>> 54b45b322431eacb28f0acdfb9763c7d6105d248
    </div>
  </div>
);

};

export default StudentMyCourses;
