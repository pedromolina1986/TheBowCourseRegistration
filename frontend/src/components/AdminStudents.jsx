import React, { useState, useEffect, useMemo } from "react";
import {
  Users,
  GraduationCap,
  Award,
  Filter,
  X,
  Search,
  MoreVertical,
} from "lucide-react";

import api from "../services/api.js"; // your axios instance

const stats = [
  { label: "Total Students", value: "156", icon: Users, colors: "text-blue-300" },
  { label: "Diploma Program", value: "68", icon: GraduationCap, colors: "text-green-300" },
  { label: "Post-Diploma", value: "45", icon: Award, colors: "text-purple-300" },
  { label: "Certificate", value: "43", icon: Award, colors: "text-red-300" },
];

const RegisteredStudents = () => {
  const [users, setUsers] = useState([]); 
  const [loading, setLoading] = useState(true);

  const [programFilter, setProgramFilter] = useState("All Programs");
  const [termFilter, setTermFilter] = useState("All Terms");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilters, setActiveFilters] = useState(false);

  // FETCH USERS FROM BACKEND -------------------------
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("/users");
        setUsers(response.data); // store all users
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // FILTER LOGIC --------------------------------------
  const filteredStudents = useMemo(() => {
    return users
      .filter((user) => user.user_type.toLowerCase() === "student")
      .filter((student) => {
        const details = student.details || {};

        const matchesProgram =
          programFilter === "All Programs" ||
          (details.program || "").toLowerCase().includes(programFilter.toLowerCase());

        const matchesTerm =
          termFilter === "All Terms" ||
          (details.term_name || "").toLowerCase() === termFilter.toLowerCase();

        const matchesStatus =
          statusFilter === "All Status" ||
          (details.status || "").toLowerCase() === statusFilter.toLowerCase();

        const matchesSearch =
          ((details.first_name || "") + " " + (details.last_name || ""))
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          (details.student_id || "").toString().includes(searchTerm) ||
          (details.email || "").toLowerCase().includes(searchTerm.toLowerCase());

        return matchesProgram && matchesTerm && matchesStatus && matchesSearch;
      });
  }, [users, programFilter, termFilter, statusFilter, searchTerm]);

  const handleApplyFilters = () => setActiveFilters(true);

  const handleClearFilters = () => {
    setProgramFilter("All Programs");
    setTermFilter("All Terms");
    setStatusFilter("All Status");
    setSearchTerm("");
    setActiveFilters(false);
  };

  if (loading)
    return (
      <div className="p-8 text-center text-gray-700 font-medium">
        Loading students...
      </div>
    );

  return (
    <div className="p-4 md:p-8">

      {/* FILTER SECTION */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">

          {/* Program Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Program
            </label>
            <select
              value={programFilter}
              onChange={(e) => setProgramFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option>All Programs</option>
              <option>Diploma</option>
              <option>Post-Diploma</option>
              <option>Certificate</option>
            </select>
          </div>

          {/* Term Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Term
            </label>
            <select
              value={termFilter}
              onChange={(e) => setTermFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option>All Terms</option>
              <option>Winter 2025</option>
              <option>Spring 2025</option>
              <option>Summer 2025</option>
              <option>Fall 2025</option>
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Student Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option>All Status</option>
              <option>Active</option>
              <option>Pending</option>
              <option>Completed</option>
              <option>Inactive</option>
            </select>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleApplyFilters}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2.5 rounded-lg flex items-center gap-2"
          >
            <Filter size={18} /> Apply Filters
          </button>

          <button
            onClick={handleClearFilters}
            className="text-gray-700 border border-gray-200 px-4 py-2.5 rounded-lg flex items-center gap-2"
          >
            <X size={18} /> Clear
          </button>
        </div>
      </div>

      {/* SEARCH BAR */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex gap-3">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search students by name, ID, or email..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg"
            />
          </div>
          <button
            onClick={() => setActiveFilters(true)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2.5 rounded-lg"
          >
            Search
          </button>
        </div>
      </div>

      {/* STUDENT TABLE */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-x-auto">
        <div className="p-6 border-b flex justify-between">
          <h3 className="text-lg font-semibold text-gray-900">
            Student Registry
          </h3>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            Showing {filteredStudents.length} results
            <button className="p-1 hover:bg-gray-100 rounded">
              <MoreVertical size={20} className="text-gray-400" />
            </button>
          </div>
        </div>

        {/* Table Header */}
        <div className="hidden sm:grid px-6 py-4 bg-gray-50 border-b grid-cols-12 text-xs font-medium text-gray-500 uppercase">
          <div className="col-span-3">Student</div>
          <div className="col-span-2">Student ID</div>
          <div className="col-span-3">Program</div>
          <div className="col-span-2">Term</div>
          <div className="col-span-1">Status</div>
          <div className="col-span-1">Registration Date</div>
        </div>

        {/* Table Rows */}
        <div className="divide-y divide-gray-200">
          {filteredStudents.length > 0 ? (
            filteredStudents.map((student, idx) => {
              const d = student.details || {};
              return (
                <div
                  key={idx}
                  className="px-4 py-4 sm:px-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex flex-col sm:grid sm:grid-cols-12 sm:gap-4">
                    
                    {/* Student + Avatar */}
                    <div className="flex items-center gap-3 sm:col-span-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                        <span className="text-lg font-bold">
                          {(d.first_name?.[0] || "-")}{(d.last_name?.[0] || "-")}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {d.first_name || "-"} {d.last_name || "-"}
                        </p>
                        <p className="text-sm text-gray-500">{d.email || "-"}</p>
                      </div>
                    </div>

                    {/* Student ID */}
                    <div className="mt-2 sm:mt-0 sm:col-span-2 text-sm text-gray-900">
                      {d.student_id || "-"}
                    </div>

                    {/* Program */}
                    <div className="mt-2 sm:mt-0 sm:col-span-3">
                      <p className="text-sm text-gray-900 font-medium">
                        {d.program || "-"}
                      </p>
                    </div>

                    {/* Term */}
                    <div className="mt-2 sm:mt-0 sm:col-span-2 text-sm">
                      {d.term_name || "-"}
                    </div>

                    {/* Status */}
                    <div className="mt-2 sm:mt-0 sm:col-span-1">
                      <span
                        className={`inline-block px-2.5 py-1 rounded text-xs font-medium ${
                          d.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : d.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : d.status === "Completed"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {d.status || "-"}
                      </span>
                    </div>

                    {/* Registration */}
                    <div className="mt-2 sm:mt-0 sm:col-span-1 text-sm">
                      {d.registration_date || "-"}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-6 text-gray-500">
              No students found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisteredStudents;
