import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const CourseRegistration = () => {
  const [selectedCourses, setSelectedCourses] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const selectedTerm = location.state?.term || "No term selected";

  const courses = [
    { code: "SERV201", title: "Programming Fundamentals", credits: 3 },
    { code: "SERV202", title: "Database Design", credits: 3 },
    { code: "SERV203", title: "Web Development", credits: 4 },
    { code: "SERV204", title: "Software Security", credits: 3 },
  ];

  const toggleCourse = (course) => {
    setSelectedCourses((prev) =>
      prev.includes(course)
        ? prev.filter((c) => c !== course)
        : [...prev, course]
    );
  };

  const handleViewCart = () => {
    navigate("/my-courses", {
      state: { selectedCourses, term: selectedTerm },
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Course Registration</h2>

      <p className="text-gray-600 mb-6">
        You are registering for:{" "}
        <span className="font-semibold text-blue-600">{selectedTerm}</span>
      </p>

      {/* Course List */}
      <div className="space-y-4">
        {courses.map((course) => (
          <div
            key={course.code}
            className="flex justify-between items-center border p-4 rounded-md hover:shadow-md transition"
          >
            <div>
              <h3 className="font-medium">{course.title}</h3>
              <p className="text-sm text-gray-500">
                {course.code} · {course.credits} Credits
              </p>
            </div>

            <button
              onClick={() => toggleCourse(course)}
              className={`px-4 py-2 rounded-md text-white font-medium transition ${
                selectedCourses.includes(course)
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {selectedCourses.includes(course) ? "Remove" : "Add"}
            </button>
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div className="mt-8 flex justify-between">
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 rounded-md bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium transition"
        >
          ← Back to Home
        </button>

        <button
          onClick={handleViewCart}
          className={`px-6 py-2 rounded-md font-medium text-white transition ${
            selectedCourses.length > 0
              ? "bg-green-600 hover:bg-green-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
          disabled={selectedCourses.length === 0}          
        >
          View Cart ({selectedCourses.length})
        </button>
      </div>
    </div>
  );
};

export default CourseRegistration;
