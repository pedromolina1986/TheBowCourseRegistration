import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const TermSelection = () => {
  const [selectedTerm, setSelectedTerm] = useState("");
  const navigate = useNavigate();

  const terms = [
    { id: 1, name: "Winter 2025", start: "Jan 5", end: "Apr 20" },
    { id: 2, name: "Spring 2025", start: "May 10", end: "Aug 15" },
    { id: 3, name: "Summer 2025", start: "Jun 20", end: "Sep 10" },
    { id: 4, name: "Fall 2025", start: "Sep 25", end: "Dec 15" },
  ];

  const handleContinue = () => {
    navigate("/course-registration", { state: { term: selectedTerm } });
  };

  return (
    <div className="p-4 sm:p-6 lg:p-10">
      <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">
        Select Your Term
      </h2>
      <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
        Choose a term to begin your course registration process.
      </p>

      {/* Term Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {terms.map((term) => (
          <div
            key={term.id}
            onClick={() => setSelectedTerm(term.name)}
            className={`p-4 sm:p-5 border rounded-lg cursor-pointer transition-all duration-200 ${
              selectedTerm === term.name
                ? "border-blue-600 bg-blue-50 shadow-md"
                : "border-gray-300 hover:shadow-lg hover:border-blue-400"
            }`}
          >
            <h3 className="font-semibold text-base sm:text-lg">{term.name}</h3>
            <p className="text-sm text-gray-500">
              {term.start} - {term.end}
            </p>
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <button
          onClick={() => navigate("/")}
          className="px-4 sm:px-6 py-2 rounded-md bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium transition"
        >
          ← Back to Home
        </button>

        <button
          onClick={handleContinue}
          disabled={!selectedTerm}
          className={`px-4 sm:px-6 py-2 rounded-md text-white font-medium transition ${
            selectedTerm
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Continue to Course Registration
        </button>
      </div>
    </div>
  );
};

export default TermSelection;
