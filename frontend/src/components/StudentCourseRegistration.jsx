// src/components/StudentCourseRegistration.jsx
import React, { useState, useEffect } from "react";
import { FaSearch, FaFilter, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import api from "../services/api.js";

const StudentCourseRegistration = () => {
  const navigate = useNavigate();
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [search, setSearch] = useState("");

  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Filters state
  const [levelFilter, setLevelFilter] = useState({
    "First Year": false,
    "Second Year": false,
    Electives: false,
  });
  const [typeFilter, setTypeFilter] = useState({
    Core: false,
    Lab: false,
    Project: false,
  });
  const [creditsFilter, setCreditsFilter] = useState({
    3: false,
    4: false,
    6: false,
  });
  const [termFilter, setTermFilter] = useState({
    "Winter 2025": false,
    "Summer 2025": false,
    "Spring 2025": false,
    "Fall 2025": false,
  });

  // Temporary filters for modal
  const [tempLevelFilter, setTempLevelFilter] = useState({ ...levelFilter });
  const [tempTypeFilter, setTempTypeFilter] = useState({ ...typeFilter });
  const [tempCreditsFilter, setTempCreditsFilter] = useState({
    ...creditsFilter,
  });
  const [tempTermFilter, setTempTermFilter] = useState({ ...termFilter });

  // Courses from backend
  const [courses, setCourses] = useState([]);

  // 🔹 Fetch courses from backend
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await api.get("/courses"); // GET /api/v1/courses
        const data = res.data || [];

        // Map backend fields → frontend shape
        const mapped = data.map((c) => ({
          code: c.course_code,
          title: c.course_name,
          credits: c.credit_hours ?? 0,
          term: c.term_name || "TBD Term",
          // you can later format dates nicely instead of raw
          schedule:
            c.start_date && c.end_date
              ? `${c.start_date} – ${c.end_date}`
              : "Schedule TBA",
          description: c.description || "",
          instructor: c.instructor || "TBA",
          // we don’t have available seats in DB,
          // so for now we use capacity as both total + available
          availableSeats: c.capacity ?? 0,
          totalSeats: c.capacity ?? 0,
          level: "First Year", // placeholder until you add field in DB
          type: "Core", // placeholder
          price: 0, // not in DB yet
        }));

        setCourses(mapped);
      } catch (err) {
        console.error("Error loading courses:", err);
        setError("Failed to load courses");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // 🔹 Add/Remove course from cart (frontend only, not DB)
  const toggleCourse = (course) => {
    const isSelected = selectedCourses.find((c) => c.code === course.code);
    if (isSelected) {
      setSelectedCourses(selectedCourses.filter((c) => c.code !== course.code));
      setCourses(
        courses.map((c) =>
          c.code === course.code
            ? { ...c, availableSeats: c.availableSeats + 1 }
            : c
        )
      );
    } else {
      if (course.availableSeats === 0) return;
      setSelectedCourses([...selectedCourses, course]);
      setCourses(
        courses.map((c) =>
          c.code === course.code
            ? { ...c, availableSeats: c.availableSeats - 1 }
            : c
        )
      );
    }
  };

  // 🔹 Apply filters from modal
  const applyFilters = () => {
    setLevelFilter({ ...tempLevelFilter });
    setTypeFilter({ ...tempTypeFilter });
    setCreditsFilter({ ...tempCreditsFilter });
    setTermFilter({ ...tempTermFilter });
    setFilterModalOpen(false);
  };

  // 🔹 Filter courses client-side
  const filteredCourses = courses.filter((course) => {
    const levelSelected = Object.values(levelFilter).some((v) => v);
    const typeSelected = Object.values(typeFilter).some((v) => v);
    const creditsSelected = Object.values(creditsFilter).some((v) => v);
    const termSelected = Object.values(termFilter).some((v) => v);

    const levelMatch = levelSelected ? levelFilter[course.level] : true;
    const typeMatch = typeSelected ? typeFilter[course.type] : true;
    const creditsMatch = creditsSelected
      ? creditsFilter[course.credits]
      : true;
    const termMatch = termSelected ? termFilter[course.term] : true;

    const searchMatch =
      course.code.toLowerCase().includes(search.toLowerCase()) ||
      course.title.toLowerCase().includes(search.toLowerCase());

    return levelMatch && typeMatch && creditsMatch && termMatch && searchMatch;
  });

  return (
    <div className="p-4 sm:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold">
            Course Registration
          </h1>
          <p className="text-gray-500 text-sm sm:text-base">
            Browse and register for courses in your program
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
          <button
            className="flex items-center border px-3 py-2 rounded-lg hover:bg-gray-100"
            onClick={() => setFilterModalOpen(true)}
          >
            <FaFilter className="mr-2" /> Filters
          </button>
        </div>
        <button
          className="border px-4 py-2 rounded-lg hover:bg-gray-100"
          onClick={() =>
            navigate("/dashboard/coursecart", { state: { selectedCourses } })
          }
        >
          View Cart ({selectedCourses.length})
        </button>
      </div>

      {/* Filter Modal */}
      {filterModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl w-80 sm:w-96 shadow-lg">
            <h3 className="font-semibold mb-4 text-lg">Filter Courses</h3>

            {/* Level Filter */}
            <div className="mb-4">
              <h4 className="font-medium">Course Level</h4>
              {Object.keys(tempLevelFilter).map((level) => (
                <label key={level} className="block">
                  <input
                    type="checkbox"
                    checked={tempLevelFilter[level]}
                    onChange={() =>
                      setTempLevelFilter({
                        ...tempLevelFilter,
                        [level]: !tempLevelFilter[level],
                      })
                    }
                  />{" "}
                  {level}
                </label>
              ))}
            </div>

            {/* Type Filter */}
            <div className="mb-4">
              <h4 className="font-medium">Course Type</h4>
              {Object.keys(tempTypeFilter).map((type) => (
                <label key={type} className="block">
                  <input
                    type="checkbox"
                    checked={tempTypeFilter[type]}
                    onChange={() =>
                      setTempTypeFilter({
                        ...tempTypeFilter,
                        [type]: !tempTypeFilter[type],
                      })
                    }
                  />{" "}
                  {type}
                </label>
              ))}
            </div>

            {/* Credits Filter */}
            <div className="mb-4">
              <h4 className="font-medium">Credits</h4>
              {Object.keys(tempCreditsFilter).map((credit) => (
                <label key={credit} className="block">
                  <input
                    type="checkbox"
                    checked={tempCreditsFilter[credit]}
                    onChange={() =>
                      setTempCreditsFilter({
                        ...tempCreditsFilter,
                        [credit]: !tempCreditsFilter[credit],
                      })
                    }
                  />{" "}
                  {credit} Credits
                </label>
              ))}
            </div>

            {/* Term Filter */}
            <div className="mb-4">
              <h4 className="font-medium">Terms</h4>
              {Object.keys(tempTermFilter).map((term) => (
                <label key={term} className="block">
                  <input
                    type="checkbox"
                    checked={tempTermFilter[term]}
                    onChange={() =>
                      setTempTermFilter({
                        ...tempTermFilter,
                        [term]: !tempTermFilter[term],
                      })
                    }
                  />{" "}
                  {term}
                </label>
              ))}
            </div>

            {/* Apply Filters Button */}
            <div className="flex justify-end">
              <button
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={applyFilters}
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Courses List */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl shadow">
        <h2 className="font-semibold mb-4 text-lg">
          Available Courses (
          {loading ? "Loading..." : `${filteredCourses.length} found`})
        </h2>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        {!loading && !error && filteredCourses.length === 0 && (
          <p className="text-gray-500">
            No courses match your selected filters.
          </p>
        )}

        {loading && <p className="text-gray-500">Loading courses...</p>}

        {!loading &&
          !error &&
          filteredCourses.map((course) => (
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
                <p className="text-gray-600 text-sm mb-2">
                  {course.description}
                </p>
                <p className="text-gray-500 text-sm mb-1">
                  📅 {course.schedule}
                </p>
                <p className="text-gray-500 text-sm mb-2">
                  👨‍🏫 {course.instructor}
                </p>
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="border rounded-full px-2 py-1">
                    {course.type}
                  </span>
                  <span className="border rounded-full px-2 py-1">
                    {course.level}
                  </span>
                  <span className="border rounded-full px-2 py-1">
                    {course.term}
                  </span>
                </div>
              </div>

              {/* Add / Remove Button */}
              <div className="text-right flex-shrink-0 flex flex-col items-end gap-2 mt-2 sm:mt-0">
                <p className="text-sm text-gray-500 mb-1">
                  Available Seats:{" "}
                  <span className="font-semibold">
                    {course.availableSeats}/{course.totalSeats}
                  </span>
                </p>
                {selectedCourses.find((c) => c.code === course.code) ? (
                  <button
                    onClick={() => toggleCourse(course)}
                    className="px-4 py-2 rounded-lg text-sm bg-red-600 text-white hover:bg-red-700"
                  >
                    Remove
                  </button>
                ) : (
                  <button
                    onClick={() => toggleCourse(course)}
                    disabled={course.availableSeats === 0}
                    className={`px-4 py-2 rounded-lg text-sm ${
                      course.availableSeats === 0
                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                        : "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:bg-blue-700"
                    }`}
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default StudentCourseRegistration;
