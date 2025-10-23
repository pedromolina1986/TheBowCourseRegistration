import React, { useState } from "react";
import {
  Search,
  RotateCcw,
  Grid,
  List,
  Eye,
  Edit,
  Trash2,
  Link,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const coursesData = [
  {
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
  const [viewMode, setViewMode] = useState("list");
  const navigate = useNavigate();

  return (
    <div className="p-8">
      {/* Search Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="grid grid-cols-4 gap-4 mb-4">
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
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Program Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Program
            </label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
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
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
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
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option>All Statuses</option>
              <option>Active</option>
              <option>Draft</option>
              <option>Archived</option>
            </select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button className="bg-gray-900 text-white px-6 py-2.5 rounded-lg flex items-center gap-2 hover:bg-gray-800 transition-colors">
            <Search size={18} />
            <span className="font-medium">Search Courses</span>
          </button>
          <button className="bg-white text-gray-700 px-6 py-2.5 rounded-lg border border-gray-300 flex items-center gap-2 hover:bg-gray-50 transition-colors">
            <RotateCcw size={18} />
            <span className="font-medium">Clear Filters</span>
          </button>
          <div className="ml-auto text-sm text-gray-600">Found 24 courses</div>
        </div>
      </div>

      {/* Search Results */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {/* Results Header */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">
            Search Results
          </h3>
          <div className="flex items-center gap-3">
            <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option>Sort by Name</option>
              <option>Sort by Code</option>
              <option>Sort by Term</option>
              <option>Sort by Enrollment</option>
            </select>
            <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded ${
                  viewMode === "grid"
                    ? "bg-white shadow-sm"
                    : "hover:bg-gray-200"
                }`}
              >
                <Grid size={18} className="text-gray-600" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded ${
                  viewMode === "list"
                    ? "bg-white shadow-sm"
                    : "hover:bg-gray-200"
                }`}
              >
                <List size={18} className="text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Table Header */}
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <div className="grid grid-cols-12 gap-4 text-xs font-medium text-gray-500 uppercase">
            <div className="col-span-3">Course Details</div>
            <div className="col-span-2">Program</div>
            <div className="col-span-2">Term & Duration</div>
            <div className="col-span-2">Enrollment</div>
            <div className="col-span-2">Instructor</div>
            <div className="col-span-1">Status</div>
            <div className="col-span-1 text-center">Actions</div>
          </div>
        </div>

        {/* Course List */}
        <div className="divide-y divide-gray-200">
          {coursesData.map((course, idx) => {
            const enrollmentPercentage =
              (course.enrollment.current / course.enrollment.max) * 100;
            return (
              <div
                key={idx}
                className="px-6 py-4 hover:bg-gray-50 transition-colors"
              >
                <div className="grid grid-cols-12 gap-4 items-center">
                  {/* Course Details */}
                  <div className="col-span-3">
                    <p className="font-semibold text-gray-900">{course.code}</p>
                    <p className="text-sm text-gray-600 mt-0.5">
                      {course.name}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {course.credits} Credits
                    </p>
                  </div>

                  {/* Program */}
                  <div className="col-span-2">
                    <span className="text-sm text-gray-900">
                      {course.program}
                    </span>
                  </div>

                  {/* Term & Duration */}
                  <div className="col-span-2">
                    <p className="text-sm font-medium text-gray-900">
                      {course.term}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {course.dates}
                    </p>
                  </div>

                  {/* Enrollment */}
                  <div className="col-span-2">
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

                  {/* Instructor */}
                  <div className="col-span-2">
                    <span className="text-sm text-gray-900">
                      {course.instructor}
                    </span>
                  </div>

                  {/* Status */}
                  <div className="col-span-1">
                    <span
                      className={`inline-block px-2.5 py-1 rounded text-xs font-medium ${
                        course.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : course.status === "Draft"
                          ? "bg-gray-100 text-gray-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {course.status}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="col-span-1 flex items-center justify-center gap-2">
                    <button
                      className="p-1.5 hover:bg-gray-100 rounded transition-colors"
                      title="View"
                      onClick={() => navigate("/dashboard/courseForm")}
                    >
                      <Eye size={16} className="text-gray-600" />
                    </button>

                    <button
                      className="p-1.5 hover:bg-gray-100 rounded transition-colors"
                      title="Edit"
                    >
                      <Edit size={16} className="text-gray-600" />
                    </button>
                    <button
                      className="p-1.5 hover:bg-gray-100 rounded transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={16} className="text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <p className="text-sm text-gray-600">Showing 1-5 of 24 courses</p>
          <div className="flex items-center gap-2">
            <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors">
              &lt;
            </button>
            <button className="px-3 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium">
              1
            </button>
            <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors">
              2
            </button>
            <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors">
              3
            </button>
            <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors">
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchCourses;
