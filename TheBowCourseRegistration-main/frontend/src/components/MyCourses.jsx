import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const MyCourses = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { selectedCourses = [], term = "No term selected" } = location.state || {};

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">My Courses</h2>
      <p className="text-gray-600 mb-6">
        {selectedCourses.length > 0
          ? `Here are the courses you registered for ${term}.`
          : `No courses registered for ${term}.`}
      </p>

      {selectedCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {selectedCourses.map((course) => (
            <div key={course.code} className="border rounded-lg p-4 shadow-sm bg-white">
              <h3 className="font-medium">{course.title}</h3>
              <p className="text-sm text-gray-500">{course.code}</p>
              <div className="mt-2 text-sm text-gray-600">
                <p>Schedule: TBD</p>
                <p>Credits: {course.credits}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">You haven’t added any courses yet.</p>
      )}

      {/* Buttons */}
      <div className="mt-8 flex justify-between">
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 rounded-md bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium transition"
        >
          ← Back to Home
        </button>

        <button
          onClick={() => navigate(-1)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition"
        >
          Back to Registration
        </button>
      </div>
    </div>
  );
};

export default MyCourses;
