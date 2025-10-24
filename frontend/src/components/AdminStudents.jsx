import React, { useState, useMemo } from "react";
import {
  Users,
  GraduationCap,
  Award,
  Filter,
  X,
  Search,
  Download,
  MoreVertical,
} from "lucide-react";

const studentsData = [
  {
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    studentId: "SD2025001",
    program: "Software Development - Diploma",
    duration: "2 years",
    term: "Winter 2025",
    status: "Active",
    registrationDate: "Jan 15, 2025",
  },
  {
    name: "Michael Chen",
    email: "michael.chen@email.com",
    studentId: "SD2025002",
    program: "Software Development - Post-Diploma",
    duration: "1 year",
    term: "Winter 2025",
    status: "Pending",
    registrationDate: "Jan 18, 2025",
  },
  {
    name: "Emily Rodriguez",
    email: "emily.rodriguez@email.com",
    studentId: "SD2025003",
    program: "Software Development - Certificate",
    duration: "6 months",
    term: "Spring 2025",
    status: "Active",
    registrationDate: "Jan 20, 2025",
  },
  {
    name: "David Park",
    email: "david.park@email.com",
    studentId: "SD2025004",
    program: "Software Development - Diploma",
    duration: "2 years",
    term: "Winter 2025",
    status: "Active",
    registrationDate: "Jan 22, 2025",
  },
  {
    name: "Lisa Thompson",
    email: "lisa.thompson@email.com",
    studentId: "SD2025005",
    program: "Software Development - Post-Diploma",
    duration: "1 year",
    term: "Winter 2025",
    status: "Completed",
    registrationDate: "Jan 25, 2025",
  },
];

const stats = [
  { label: "Total Students", value: "156", icon: Users, colors:"text-blue-300" },
  { label: "Diploma Program", value: "68", icon: GraduationCap, colors:"text-green-300" },
  { label: "Post-Diploma", value: "45", icon: Award, colors:"text-purple-300" },
  { label: "Certificate", value: "43", icon: Award, colors:"text-red-300" },
];

const RegisteredStudents = () => {
  const [programFilter, setProgramFilter] = useState("All Programs");
  const [termFilter, setTermFilter] = useState("All Terms");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilters, setActiveFilters] = useState(false);

  // Filtered + searched data
  const filteredStudents = useMemo(() => {
    return studentsData.filter((student) => {
      const matchesProgram =
        programFilter === "All Programs" ||
        student.program.toLowerCase().includes(programFilter.toLowerCase());
      const matchesTerm =
        termFilter === "All Terms" || student.term === termFilter;
      const matchesStatus =
        statusFilter === "All Status" || student.status === statusFilter;
      const matchesSearch =
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesProgram && matchesTerm && matchesStatus && matchesSearch;
    });
  }, [programFilter, termFilter, statusFilter, searchTerm]);

  const handleApplyFilters = () => setActiveFilters(true);
  const handleClearFilters = () => {
    setProgramFilter("All Programs");
    setTermFilter("All Terms");
    setStatusFilter("All Status");
    setSearchTerm("");
    setActiveFilters(false);
  };

  return (
    <div className="p-4 md:p-8">
      {/* Filters Section */}
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option>All Status</option>
              <option>Active</option>
              <option>Pending</option>
              <option>Completed</option>
              <option>Inactive</option>
            </select>
          </div>
        </div>

        {/* Apply Filters Button */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <button
            onClick={handleApplyFilters}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2.5 rounded-lg flex items-center gap-2 hover:bg-gray-800 transition-colors"
          >
            <Filter size={18} />
            <span className="font-medium">Apply Filters</span>
          </button>
          <button
            onClick={handleClearFilters}
            className="text-gray-700 border border-gray-200 px-4 py-2.5 flex items-center gap-2 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <X size={18} />
            <span className="font-medium">Clear</span>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="flex-1 relative w-full">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search students by name, ID, or email..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={() => setActiveFilters(true)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-gray-800 transition-colors"
          >
            Search
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-start justify-between mb-3">
                <p className="text-sm text-gray-600">{stat.label}</p>
                <Icon size={20} className={stat.colors}/>
              </div>
              <p className="text-3xl font-semibold text-gray-900">
                {stat.value}
              </p>
            </div>
          );
        })}
      </div>

      {/* Student Registry Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-x-auto">        

        {/* Student Registry Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <h3 className="text-lg font-semibold text-gray-900">
              Student Registry
            </h3>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">
                Showing {filteredStudents.length} results
              </span>
              <button className="p-1 hover:bg-gray-100 rounded">
                <MoreVertical size={20} className="text-gray-400" />
              </button>
            </div>
          </div>

          {/* Table Header for desktop */}
          <div className="hidden sm:grid px-6 py-4 bg-gray-50 border-b border-gray-200 grid-cols-12 text-xs font-medium text-gray-500 uppercase">
            <div className="col-span-3">Student</div>
            <div className="col-span-2">Student ID</div>
            <div className="col-span-3">Program</div>
            <div className="col-span-2">Term</div>
            <div className="col-span-1">Status</div>
            <div className="col-span-1">Registration Date</div>
          </div>

          {/* Table Rows / Cards */}
          <div className="divide-y divide-gray-200">
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student, idx) => (
                <div
                  key={idx}
                  className="px-4 py-4 sm:px-6 sm:py-4 hover:bg-gray-50 transition-colors"
                >
                  {/* Mobile Card Layout */}
                  <div className="flex flex-col sm:grid sm:grid-cols-12 sm:gap-4">
                    <div className="flex items-center gap-3 sm:col-span-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg
                          className="w-8 h-8"
                          viewBox="0 0 40 40"
                          fill="none"
                        >
                          <circle cx="20" cy="14" r="6" fill="#000" />
                          <path
                            d="M12 28 Q12 22 20 22 Q28 22 28 28"
                            stroke="#000"
                            strokeWidth="1.5"
                            fill="none"
                          />
                          <circle cx="16" cy="14" r="1" fill="#fff" />
                          <circle cx="24" cy="14" r="1" fill="#fff" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {student.name}
                        </p>
                        <p className="text-sm text-gray-500">{student.email}</p>
                      </div>
                    </div>

                    {/* Mobile stacked info */}
                    <div className="mt-2 sm:mt-0 sm:col-span-2 text-sm text-gray-900">
                      <span className="sm:hidden font-medium">ID: </span>
                      {student.studentId}
                    </div>
                    <div className="mt-2 sm:mt-0 sm:col-span-3">
                      <p className="text-sm text-gray-900 font-medium">
                        <span className="sm:hidden font-medium">Program: </span>
                        {student.program}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5 sm:mt-0">
                        <span className="sm:hidden font-medium">
                          Duration:{" "}
                        </span>
                        {student.duration}
                      </p>
                    </div>
                    <div className="mt-2 sm:mt-0 sm:col-span-2 text-sm text-gray-900">
                      <span className="sm:hidden font-medium">Term: </span>
                      {student.term}
                    </div>
                    <div className="mt-2 sm:mt-0 sm:col-span-1">
                      <span
                        className={`inline-block px-2.5 py-1 rounded text-xs font-medium ${
                          student.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : student.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : student.status === "Completed"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {student.status}
                      </span>
                    </div>
                    <div className="mt-2 sm:mt-0 sm:col-span-1 text-sm text-gray-900">
                      <span className="sm:hidden font-medium">
                        Registered:{" "}
                      </span>
                      {student.registrationDate}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-6 text-gray-500 text-sm">
                No students found.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisteredStudents;
