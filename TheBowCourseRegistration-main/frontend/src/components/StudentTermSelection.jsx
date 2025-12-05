// src/pages/StudentTermSelection.jsx

import React, { useState, useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const StudentTermSelection = () => {
  const navigate = useNavigate();

  // header + program info
  const [studentHeader, setStudentHeader] = useState({
    first_name: "",
    last_name: "",
    user_type: "student",
    student_id: "",
    program: "",
  });

  // terms + selection
  const [terms, setTerms] = useState([]);
  const [selectedTermId, setSelectedTermId] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const formatDate = (value) => {
    if (!value) return "N/A";
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) {
      // already a yyyy-mm-dd string
      return String(value).slice(0, 10);
    }
    return d.toISOString().slice(0, 10);
  };

  // Load terms, student info, and existing term selection
  useEffect(() => {
    const loadPageData = async () => {
      try {
        // Load all terms
        const termsRes = await api.get("terms");
        setTerms(termsRes.data || []);

        // Load logged-in user info for header
        const userRes = await api.get("users/me");
        const { user, details } = userRes.data;

        setStudentHeader({
          first_name: details?.first_name || user?.user_name || "",
          last_name: details?.last_name || "",
          user_type: user?.user_type || "student",
          student_id: details?.student_id?.toString() || "",
          program: details?.program || "",
        });

        // Load current term selection (if any)
        try {
          const selRes = await api.get("student/term-selection");
          if (selRes.data?.term_id) {
            setSelectedTermId(selRes.data.term_id);
          }
        } catch (innerErr) {
          // If 404 or no selection yet, just ignore
          console.warn("No existing term selection or error:", innerErr);
        }

        setError("");
      } catch (err) {
        console.error("Error loading term selection page:", err);
        setError("Unable to load term selection. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadPageData();
  }, []);

  const handleSelectTerm = (termId) => {
    setSelectedTermId(termId);
  };

  // Continue to Course Registration and save selection
  const handleContinue = async () => {
    if (!selectedTermId) {
      alert("Please select a term first.");
      return;
    }

    try {
      setSaving(true);
      const res = await api.post("student/term-selection", {
        term_id: selectedTermId,
      });
      console.log("Saved term selection:", res.data);

      alert("Term selection saved successfully!");

      // Pass selected term to Course Registration page
      navigate("/dashboard/courseregistration", {
        state: { termId: selectedTermId },
      });
    } catch (err) {
      console.error("Failed to save term selection:", err.response?.data || err);
      alert(
        err.response?.data?.error ||
          "Failed to save term selection. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  // Back to Student Dashboard
  const handleBack = () => {
    navigate("/dashboard/studentdashboard");
  };

  if (loading) {
    return <div className="p-6">Loading term selection...</div>;
  }

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
            <p className="font-semibold text-sm sm:text-base">
              {studentHeader.first_name || "Student"}{" "}
              {studentHeader.last_name || ""}
            </p>
            <p className="text-xs sm:text-sm text-gray-500">
              {studentHeader.user_type
                ? studentHeader.user_type.charAt(0).toUpperCase() +
                  studentHeader.user_type.slice(1)
                : "Student"}
            </p>
          </div>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* Current Program Info */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 sm:p-6 rounded-2xl shadow mb-6 sm:mb-8 text-white">
        <h2 className="text-base sm:text-lg font-semibold mb-3">
          Current Program Information
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 text-sm gap-y-2 sm:gap-y-3">
          <p>
            <strong>Program:</strong>{" "}
            {studentHeader.program || "Software Development - Diploma (2 years)"}
          </p>
          <p>
            <strong>Department:</strong> Software Development
          </p>
          <p>
            <strong>Student ID:</strong>{" "}
            {studentHeader.student_id || "SD2025001"}
          </p>
          <p>
            <strong>Enrollment Status:</strong>{" "}
            <span className="font-medium">Active</span>
          </p>
        </div>
      </div>

      {/* Terms from backend */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {terms.map((term) => {
          const isSelected = selectedTermId === term.term_id;
          return (
            <div
              key={term.term_id}
              className={`border rounded-2xl p-4 sm:p-5 cursor-pointer transition-all duration-200 ${
                isSelected
                  ? "border-blue-600 bg-blue-50 shadow-md"
                  : "border-gray-200 bg-white hover:border-blue-400 hover:shadow-lg"
              }`}
              onClick={() => handleSelectTerm(term.term_id)}
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-base sm:text-lg">
                  {term.term_name}
                </h3>
                {isSelected ? (
                  <FaCheckCircle className="text-blue-600" />
                ) : (
                  <div className="w-4 h-4 border rounded-full" />
                )}
              </div>

              <p className="text-sm text-gray-500 mb-3">
                {/* Simple period using dates */}
                {formatDate(term.start_date)} – {formatDate(term.end_date)}
              </p>

              <div className="text-sm space-y-1 text-gray-600">
                <p>
                  <strong>Start Date:</strong> {formatDate(term.start_date)}
                </p>
                <p>
                  <strong>End Date:</strong> {formatDate(term.end_date)}
                </p>
                <p>
                  <strong>Status:</strong> {term.status || "Unknown"}
                </p>
              </div>

              <div className="mt-3 text-center">
                {isSelected ? (
                  <span className="text-sm text-blue-600 font-medium">
                    Currently Selected
                  </span>
                ) : (
                  <button
                    type="button"
                    className="text-sm text-blue-600 font-medium hover:underline"
                  >
                    Select Term
                  </button>
                )}
              </div>
            </div>
          );
        })}
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
          disabled={!selectedTermId || saving}
          className={`px-6 py-2 rounded-lg text-white font-medium transition ${
            !selectedTermId || saving
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {saving
            ? "Saving selection..."
            : "Continue to Course Registration →"}
        </button>
      </div>
    </div>
  );
};

export default StudentTermSelection;
