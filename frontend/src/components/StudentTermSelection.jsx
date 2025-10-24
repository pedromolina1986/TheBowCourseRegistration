import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const StudentTermSelection = () => {
  const [selectedTerm, setSelectedTerm] = useState("Winter 2025");
  const navigate = useNavigate();

  const terms = [
    {
      name: "Winter 2025",
      period: "January – March",
      startDate: "January 15, 2025",
      endDate: "March 30, 2025",
      deadline: "January 10, 2025",
      availableCourses: 26,
    },
    {
      name: "Spring 2025",
      period: "March – June",
      startDate: "March 31, 2025",
      endDate: "June 20, 2025",
      deadline: "February 15, 2025",
      availableCourses: 22,
    },
    {
      name: "Summer 2025",
      period: "June – August",
      startDate: "June 23, 2025",
      endDate: "August 15, 2025",
      deadline: "May 1, 2025",
      availableCourses: 18,
    },
    {
      name: "Fall 2025",
      period: "September – December",
      startDate: "September 8, 2025",
      endDate: "December 18, 2025",
      deadline: "July 15, 2025",
      availableCourses: 28,
    },
  ];

  // 🔹 Continue to Course Registration
  const handleContinue = () => {
    navigate("/dashboard/courseregistration", { state: { selectedTerm } });
  };

  // 🔹 Back to Student Dashboard need to navigate this
  const handleBack = () => {
    navigate("/dashboard/studentdashboard");
  };

  return (
    <div className="p-4 sm:p-6 lg:p-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold">
            Select Your Term
          </h1>
          <p className="text-gray-500 text-sm sm:text-base">
            Choose the term for course registration — you must select a term
            before you can register for courses.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <img
            src="https://cdn-icons-png.flaticon.com/512/147/147144.png"
            alt="profile"
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
          />
          <div>
            <p className="font-semibold text-sm sm:text-base">John Smith</p>
            <p className="text-xs sm:text-sm text-gray-500">Student</p>
          </div>
        </div>
      </div>

      {/* Current Program Info */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 sm:p-6 rounded-2xl shadow mb-6 sm:mb-8">
        <h2 className="text-white text-base sm:text-lg font-semibold mb-3">
          Current Program Information
        </h2>
        <div className="text-white grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 text-sm gap-y-2 sm:gap-y-3">
          <p>
            <strong>Program:</strong> Software Development - Diploma (2 years)
          </p>
          <p>
            <strong>Department:</strong> Software Development
          </p>
          <p>
            <strong>Student ID:</strong> SD2025001
          </p>
          <p>
            <strong>Enrollment Status:</strong>{" "}
            <span className="text-white font-medium">Active</span>
          </p>
        </div>
      </div>

      {/* Terms */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {terms.map((term) => (
          <div
            key={term.name}
            className={`border rounded-2xl p-4 sm:p-5 cursor-pointer transition-all duration-200 ${
              selectedTerm === term.name
                ? "border-blue-600 bg-blue-50 shadow-md"
                : "border-gray-200 bg-white hover:border-blue-400 hover:shadow-lg"
            }`}
            onClick={() => setSelectedTerm(term.name)}
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-base sm:text-lg">
                {term.name}
              </h3>
              {selectedTerm === term.name ? (
                <FaCheckCircle className="text-blue-600" />
              ) : (
                <div className="w-4 h-4 border rounded-full"></div>
              )}
            </div>
            <p className="text-sm text-gray-500 mb-3">{term.period}</p>

            <div className="text-sm space-y-1 text-gray-600">
              <p>
                <strong>Start Date:</strong> {term.startDate}
              </p>
              <p>
                <strong>End Date:</strong> {term.endDate}
              </p>
              <p>
                <strong>Registration Deadline:</strong> {term.deadline}
              </p>
              <p>
                <strong>Available Courses:</strong> {term.availableCourses}
              </p>
            </div>

            <div className="mt-3 text-center">
              {selectedTerm === term.name ? (
                <span className="text-sm text-blue-600 font-medium">
                  Currently Selected
                </span>
              ) : (
                <button className="text-sm text-blue-600 font-medium hover:underline">
                  Select {term.name}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Important Info */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl shadow text-sm text-gray-600 space-y-2 mb-6 sm:mb-8">
        <h2 className="font-semibold mb-2 text-base sm:text-lg">
          Important Information
        </h2>
        <ul className="list-disc list-inside space-y-1">
          <li>
            You can register for 2–5 courses per term based on your program
            requirements.
          </li>
          <li>
            Registration deadlines are strictly enforced. Late registrations may
            not be accepted.
          </li>
          <li>
            Course fees will be calculated based on your selected courses and
            billing information.
          </li>
          <li>
            You can change your term selection until the registration deadline.
          </li>
        </ul>
      </div>

      {/* Bottom Buttons */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
        <button
          onClick={handleBack}
          className="border px-5 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition"
        >
          ← Back to Dashboard
        </button>
        <button
          onClick={handleContinue}
          disabled={!selectedTerm}
          className={`px-6 py-2 rounded-lg text-white font-medium transition ${
            selectedTerm
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Continue to Course Registration →
        </button>
      </div>
    </div>
  );
};

export default StudentTermSelection;
