import React, { useState } from 'react';
import { RefreshCw, Search, X, Plus, Save, Eye, Trash2 } from 'lucide-react';

const availableCourses = [
  { code: 'CS101', name: 'Introduction to Programming', term: 'Winter 2025' },
  { code: 'CS201', name: 'Data Structures', term: 'Spring 2025' },
  { code: 'CS301', name: 'Database Systems', term: 'Summer 2025' },
  { code: 'CS401', name: 'Web Development', term: 'Fall 2025' }
];

const EditCourse = () => {
  const [selectedCourse, setSelectedCourse] = useState('CS101');
  const [prerequisites, setPrerequisites] = useState([
    'High School Mathematics',
    'Basic Computer Skills'
  ]);

  const removePrerequisite = (index) => {
    setPrerequisites(prerequisites.filter((_, i) => i !== index));
  };

  return (
    <div className="p-8">


      <div className="grid grid-cols-3 gap-6">
        {/* Available Courses Sidebar */}
        <div className="col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">Available Courses</h3>
              <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                <RefreshCw size={18} className="text-gray-600" />
              </button>
            </div>
            
            {/* Search */}
            <div className="p-4 border-b border-gray-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Search courses..."
                  className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Course List */}
            <div className="p-2">
              {availableCourses.map((course, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedCourse(course.code)}
                  className={`w-full text-left p-3 rounded-lg mb-1 transition-colors ${
                    selectedCourse === course.code
                      ? 'bg-gray-900 text-white'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <p className={`font-medium text-sm ${
                    selectedCourse === course.code ? 'text-white' : 'text-gray-900'
                  }`}>
                    {course.code}
                  </p>
                  <p className={`text-xs mt-0.5 ${
                    selectedCourse === course.code ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {course.name}
                  </p>
                  <p className={`text-xs mt-0.5 ${
                    selectedCourse === course.code ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    {course.term}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Course Details Form */}
        <div className="col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Course Details</h3>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Last updated: Dec 20, 2024
                </div>
                <button className="bg-gray-900 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium hover:bg-gray-800 transition-colors">
                  <Save size={16} />
                  Save Changes
                </button>
              </div>
            </div>

            <div className="p-6">
              {/* Course Code and Name */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Course Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value="CS101"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Course Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value="Introduction to Programming"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Program and Term */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Program <span className="text-red-500">*</span>
                  </label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Software Development - Diploma</option>
                    <option>Software Development - Post-Diploma</option>
                    <option>Software Development - Certificate</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Term <span className="text-red-500">*</span>
                  </label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Winter 2025</option>
                    <option>Spring 2025</option>
                    <option>Summer 2025</option>
                    <option>Fall 2025</option>
                  </select>
                </div>
              </div>

              {/* Course Description */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Course Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows="4"
                  defaultValue="This course introduces students to fundamental programming concepts using modern programming languages. Students will learn basic programming constructs, problem-solving techniques, and software development practices."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                ></textarea>
              </div>

              {/* Start and End Date */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value="2025-01-15"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value="2025-04-30"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Credits, Max Enrollment, Status */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Credits</label>
                  <input
                    type="number"
                    value="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Max Enrollment</label>
                  <input
                    type="number"
                    value="30"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Course Status</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Active</option>
                    <option>Draft</option>
                    <option>Archived</option>
                  </select>
                </div>
              </div>

              {/* Instructor and Location */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Instructor</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Dr. Sarah Johnson</option>
                    <option>Prof. Michael Chen</option>
                    <option>Dr. Emily Williams</option>
                    <option>Prof. David Park</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <input
                    type="text"
                    value="Room 201, Building A"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Prerequisites Section */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Prerequisites</label>
                <div className="space-y-2 mb-3">
                  {prerequisites.map((prereq, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-gray-50 px-4 py-2 rounded-lg border border-gray-200">
                      <span className="text-sm text-gray-900">{prereq}</span>
                      <button
                        onClick={() => removePrerequisite(idx)}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  ))}
                </div>
                <button className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900 font-medium">
                  <Plus size={16} />
                  Add Prerequisite
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                <button className="bg-gray-900 text-white px-6 py-2.5 rounded-lg flex items-center gap-2 font-medium hover:bg-gray-800 transition-colors">
                  <Save size={18} />
                  Update Course
                </button>
                <div className="flex items-center gap-3">
                  <button className="bg-white text-gray-700 px-6 py-2.5 rounded-lg border border-gray-300 flex items-center gap-2 font-medium hover:bg-gray-50 transition-colors">
                    <Eye size={18} />
                    Preview
                  </button>
                  <button className="bg-white text-red-600 px-6 py-2.5 rounded-lg border border-red-300 flex items-center gap-2 font-medium hover:bg-red-50 transition-colors">
                    <Trash2 size={18} />
                    Delete Course
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCourse;