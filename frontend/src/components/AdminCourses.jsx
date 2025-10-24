import React, { useEffect, useState } from "react";
import { Search, RotateCcw, Grid, List, Eye, Edit, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const initialCoursesData = [
  {
    id: 1,
    code: "SDEV-101",
    name: "Introduction to Programming",
    credits: 3,
    program: "Diploma",
    term: "Winter 2025",
    dates: "Jan 15 - Mar 30",
    enrollment: { current: 22, max: 25 },
    instructor: "Dr. Smith",
    status: "Active",
  },
  {
    id: 2,
    code: "SDEV-201",
    name: "Advanced JavaScript Development",
    credits: 4,
    program: "Post-Diploma",
    term: "Spring 2025",
    dates: "Mar 15 - Jun 15",
    enrollment: { current: 18, max: 20 },
    instructor: "Prof. Johnson",
    status: "Active",
  },
  {
    id: 3,
    code: "SDEV-150",
    name: "Database Fundamentals",
    credits: 3,
    program: "Certificate",
    term: "Summer 2025",
    dates: "Jun 1 - Aug 30",
    enrollment: { current: 0, max: 15 },
    instructor: "TBA",
    status: "Draft",
  },
  {
    id: 4,
    code: "SDEV-301",
    name: "Full Stack Web Development",
    credits: 5,
    program: "Diploma",
    term: "Fall 2025",
    dates: "Sep 5 - Dec 15",
    enrollment: { current: 15, max: 30 },
    instructor: "Dr. Williams",
    status: "Active",
  },
  {
    id: 5,
    code: "SDEV-250",
    name: "Mobile App Development",
    credits: 4,
    program: "Post-Diploma",
    term: "Winter 2025",
    dates: "Jan 10 - Apr 5",
    enrollment: { current: 12, max: 18 },
    instructor: "Prof. Davis",
    status: "Active",
  },
];

const SearchCourses = () => {
  const navigate = useNavigate();

  const [viewMode, setViewMode] = useState("list");
  const [courses, setCourses] = useState(initialCoursesData);

  // Filter states
  const [searchText, setSearchText] = useState("");
  const [programFilter, setProgramFilter] = useState("All Programs");
  const [termFilter, setTermFilter] = useState("All Terms");
  const [statusFilter, setStatusFilter] = useState("All Statuses");

  // Sort state
  const [sortBy, setSortBy] = useState("name");

  // Delete confirmation state
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  // Detect if the screen is mobile
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Force grid view on mobile
  useEffect(() => {
    if (isMobile) {
      setViewMode("grid");
    }
  }, [isMobile]);

  // Filter and sort courses
  const filteredCourses = courses
    .filter((course) => {
      const matchesSearch =
        searchText === "" ||
        course.code.toLowerCase().includes(searchText.toLowerCase()) ||
        course.name.toLowerCase().includes(searchText.toLowerCase());

      const matchesProgram =
        programFilter === "All Programs" || course.program === programFilter;

      const matchesTerm =
        termFilter === "All Terms" || course.term === termFilter;

      const matchesStatus =
        statusFilter === "All Statuses" || course.status === statusFilter;

      return matchesSearch && matchesProgram && matchesTerm && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "code":
          return a.code.localeCompare(b.code);
        case "term":
          return a.term.localeCompare(b.term);
        case "enrollment":
          return b.enrollment.current - a.enrollment.current;
        default:
          return 0;
      }
    });

  // Clear all filters
  const handleClearFilters = () => {
    setSearchText("");
    setProgramFilter("All Programs");
    setTermFilter("All Terms");
    setStatusFilter("All Statuses");
  };

  // Delete course
  const handleDelete = (courseId) => {
    setCourses(courses.filter((course) => course.id !== courseId));
    setDeleteConfirm(null);
  };

  return (
  <div className=" bg-gradient-to-br from-blue-100 to-purple-100 p-4 sm:p-6 md:p-8 bg-gray-50 min-h-screen">
    {/* Search Filters */}
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 mb-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {/* Search Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search by Course Name or Code
          </label>
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Enter course name or code"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Program Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Program
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
            Term
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
            Status
          </label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option>All Statuses</option>
            <option>Active</option>
            <option>Draft</option>
            <option>Archived</option>
          </select>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <button
            onClick={handleClearFilters}
            className="bg-white text-gray-700 px-6 py-2.5 rounded-lg border border-gray-300 flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
          >
            <RotateCcw size={18} />
            <span className="font-medium">Clear Filters</span>
          </button>
          <button
            onClick={() => navigate('/dashboard/courseForm')}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2.5 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
          >
            <span className="font-medium">+ Create New Course</span>
          </button>
        </div>
        <div className="sm:ml-auto text-sm text-gray-600 text-center sm:text-right">
          Found {filteredCourses.length} course
          {filteredCourses.length !== 1 ? 's' : ''}
        </div>
      </div>
    </div>

    {/* Search Results */}
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Results Header */}
      <div className="p-4 sm:p-6 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h3 className="text-lg font-semibold text-gray-900">
          Search Results
        </h3>
        <div className="flex flex-wrap items-center gap-3">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="name">Sort by Name</option>
            <option value="code">Sort by Code</option>
            <option value="term">Sort by Term</option>
            <option value="enrollment">Sort by Enrollment</option>
          </select>
          {!isMobile && (
            <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${
                  viewMode === 'grid'
                    ? 'bg-white shadow-sm'
                    : 'hover:bg-blue-100'
                }`}
              >
                <Grid size={18} className="text-gray-600" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${
                  viewMode === 'list'
                    ? 'bg-white shadow-sm'
                    : 'hover:bg-blue-100'
                }`}
              >
                <List size={18} className="text-gray-600" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Table Header (hidden on mobile) */}
      {viewMode === 'list' && (
        <div className="hidden md:block px-6 py-4 bg-gray-50 border-b border-gray-200">
          <div className="grid grid-cols-12 gap-4 text-xs font-medium text-gray-500 uppercase">
            <div className="col-span-3">Course Details</div>
            <div className="col-span-2">Program</div>
            <div className="col-span-2">Term & Duration</div>
            <div className="col-span-2">Enrollment</div>
            <div className="col-span-2">Instructor</div>
            <div className="col-span-1 text-center">Status</div>
          </div>
        </div>
      )}

      {/* Responsive Course List/Grid */}
      {viewMode === 'list' ? (
        <div className="divide-y divide-gray-200">
          {filteredCourses.length === 0 ? (
            <div className="px-6 py-12 text-center text-gray-500">
              No courses found matching your filters.
            </div>
          ) : (
            filteredCourses.map((course) => {
              const enrollmentPercentage =
                (course.enrollment.current / course.enrollment.max) * 100;
              return (
                <div
                  key={course.id}
                  className="px-4 sm:px-6 py-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:items-center">
                    {/* Course Details */}
                    <div className="md:col-span-3">
                      <p className="font-semibold text-gray-900">{course.code}</p>
                      <p className="text-sm text-gray-600 mt-0.5">{course.name}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {course.credits} Credits
                      </p>
                    </div>

                    {/* Program */}
                    <div className="md:col-span-2 text-sm text-gray-900">
                      {course.program}
                    </div>

                    {/* Term & Duration */}
                    <div className="md:col-span-2">
                      <p className="text-sm font-medium text-gray-900">
                        {course.term}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {course.dates}
                      </p>
                    </div>

                    {/* Enrollment */}
                    <div className="md:col-span-2">
                      <p className="text-sm font-medium text-gray-900 mb-1">
                        {course.enrollment.current}/{course.enrollment.max}
                      </p>
                      <div className="w-full bg-blue-100 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full"
                          style={{ width: `${enrollmentPercentage}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Instructor */}
                    <div className="md:col-span-2 text-sm text-gray-900">
                      {course.instructor}
                    </div>

                    {/* Status */}
                    <div className="md:col-span-1">
                      <span
                        className={`inline-block px-2.5 py-1 rounded text-xs font-medium ${
                          course.status === 'Active'
                            ? 'bg-green-100 text-green-700'
                            : course.status === 'Draft'
                            ? 'bg-gray-100 text-gray-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {course.status}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="flex md:col-span-1 justify-end gap-2">
                      <button
                        className="p-1.5 hover:bg-gray-100 rounded transition-colors"
                        onClick={() => navigate(`/dashboard/courseForm`)}
                        title="View"
                      >
                        <Eye size={16} className="text-gray-600" />
                      </button>
                      <button
                        className="p-1.5 hover:bg-gray-100 rounded transition-colors"
                        onClick={() => navigate(`/dashboard/courseForm`)}
                        title="Edit"
                      >
                        <Edit size={16} className="text-gray-600" />
                      </button>
                      <button
                        className="p-1.5 hover:bg-red-100 rounded transition-colors"
                        onClick={() => setDeleteConfirm(course.id)}
                        title="Delete"
                      >
                        <Trash2 size={16} className="text-red-600" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      ) : (
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Grid View */}
          {filteredCourses.length === 0 ? (
            <div className="col-span-full text-center text-gray-500 py-12">
              No courses found matching your filters.
            </div>
          ) : (
            filteredCourses.map((course) => {
              const enrollmentPercentage =
                (course.enrollment.current / course.enrollment.max) * 100;
              return (
                <div
                  key={course.id}
                  className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow bg-white"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-900">{course.code}</h4>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {course.credits} Credits
                      </p>
                    </div>
                    <span
                      className={`px-2.5 py-1 rounded text-xs font-medium ${
                        course.status === 'Active'
                          ? 'bg-green-100 text-green-700'
                          : course.status === 'Draft'
                          ? 'bg-gray-100 text-gray-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {course.status}
                    </span>
                  </div>

                  <h5 className="text-sm font-medium text-gray-900 mb-4">
                    {course.name}
                  </h5>

                  <div className="space-y-3 mb-4">
                    <div>
                      <p className="text-xs text-gray-500 mb-0.5">Program</p>
                      <p className="text-sm text-gray-900">{course.program}</p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500 mb-0.5">Term</p>
                      <p className="text-sm font-medium text-gray-900">
                        {course.term}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {course.dates}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500 mb-0.5">Instructor</p>
                      <p className="text-sm text-gray-900">
                        {course.instructor}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500 mb-1">Enrollment</p>
                      <p className="text-sm font-medium text-gray-900 mb-1">
                        {course.enrollment.current}/{course.enrollment.max}
                      </p>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gray-900 h-2 rounded-full"
                          style={{ width: `${enrollmentPercentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-3 border-t border-gray-200">
                    <button
                      className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                      onClick={() => navigate(`/dashboard/courseForm`)}
                    >
                      <Eye size={14} className="text-gray-600" />
                      View
                    </button>
                    <button
                      className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                      onClick={() => navigate(`/dashboard/courseForm`)}
                    >
                      <Edit size={14} className="text-gray-600" />
                      Edit
                    </button>
                    <button
                      className="px-3 py-2 text-sm border border-red-300 rounded-lg hover:bg-red-50 transition-colors"
                      onClick={() => setDeleteConfirm(course.id)}
                    >
                      <Trash2 size={14} className="text-red-600" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* Pagination */}
      <div className="px-4 sm:px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-sm text-gray-600 text-center sm:text-left">
          Showing 1-{filteredCourses.length} of {filteredCourses.length} courses
        </p>
        <div className="flex flex-wrap justify-center sm:justify-end items-center gap-2">
          <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-blue-100 transition-colors">
            &lt;
          </button>
          <button className="px-3 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg text-sm font-medium">
            1
          </button>
          <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-blue-100 transition-colors">
            2
          </button>
          <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-blue-100 transition-colors">
            3
          </button>
          <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-blue-100 transition-colors">
            &gt;
          </button>
        </div>
      </div>
    </div>

    {/* Delete Confirmation Modal */}
    {deleteConfirm && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Delete Course
          </h3>
          <p className="text-gray-600 mb-6">
            Are you sure you want to delete this course? This action cannot be
            undone.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-end">
            <button
              onClick={() => setDeleteConfirm(null)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => handleDelete(deleteConfirm)}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
);

};

export default SearchCourses;
