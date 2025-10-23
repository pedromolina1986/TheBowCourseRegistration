import React, { useState } from 'react';
import { RefreshCw, Search, X, Plus, Save, Trash2 } from 'lucide-react';

const initialCourses = [
  { code: 'CS101', name: 'Introduction to Programming', term: 'Winter 2025', program: 'Software Development - Diploma', description: 'This course introduces students to fundamental programming concepts using modern programming languages. Students will learn basic programming constructs, problem-solving techniques, and software development practices.', startDate: '2025-01-15', endDate: '2025-04-30', credits: 3, maxEnrollment: 30, status: 'Active', instructor: 'Dr. Sarah Johnson', location: 'Room 201, Building A', prerequisites: ['High School Mathematics', 'Basic Computer Skills'] },
  { code: 'CS201', name: 'Data Structures', term: 'Spring 2025', program: 'Software Development - Diploma', description: 'Advanced study of data structures and algorithms including arrays, linked lists, trees, and graphs.', startDate: '2025-05-01', endDate: '2025-08-15', credits: 4, maxEnrollment: 25, status: 'Active', instructor: 'Prof. Michael Chen', location: 'Room 305, Building B', prerequisites: ['CS101'] },
  { code: 'CS301', name: 'Database Systems', term: 'Summer 2025', program: 'Software Development - Post-Diploma', description: 'Comprehensive introduction to database design, SQL, and database management systems.', startDate: '2025-06-01', endDate: '2025-09-30', credits: 3, maxEnrollment: 35, status: 'Active', instructor: 'Dr. Emily Williams', location: 'Room 102, Building C', prerequisites: ['CS201'] },
  { code: 'CS401', name: 'Web Development', term: 'Fall 2025', program: 'Software Development - Certificate', description: 'Modern web development using HTML, CSS, JavaScript, and popular frameworks.', startDate: '2025-09-15', endDate: '2025-12-20', credits: 4, maxEnrollment: 40, status: 'Draft', instructor: 'Prof. David Park', location: 'Room 401, Building A', prerequisites: ['CS101', 'CS201'] }
];

const emptyCourseTe = {
  code: '',
  name: '',
  term: 'Winter 2025',
  program: 'Software Development - Diploma',
  description: '',
  startDate: '',
  endDate: '',
  credits: 3,
  maxEnrollment: 30,
  status: 'Draft',
  instructor: 'Dr. Sarah Johnson',
  location: '',
  prerequisites: []
};

const EditCourse = () => {
  const [availableCourses, setAvailableCourses] = useState(initialCourses);
  const [selectedCourseCode, setSelectedCourseCode] = useState('CS101');
  const [searchTerm, setSearchTerm] = useState('');
  const [courseData, setCourseData] = useState(initialCourses[0]);
  const [saveMessage, setSaveMessage] = useState('');
  const [showPrereqModal, setShowPrereqModal] = useState(false);
  const [selectedPrereq, setSelectedPrereq] = useState('');
  const [isNewCourse, setIsNewCourse] = useState(false);

  const filteredCourses = availableCourses.filter(course =>
    course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const availablePrerequisites = availableCourses
    .filter(course => course.code !== courseData.code)
    .map(course => course.code + ' - ' + course.name);

  const handleCourseSelect = (courseCode) => {
    const course = availableCourses.find(c => c.code === courseCode);
    if (course) {
      setCourseData({ ...course });
      setSelectedCourseCode(courseCode);
      setSaveMessage('');
      setIsNewCourse(false);
    }
  };

  const handleNewCourse = () => {
    setCourseData({ ...emptyCourseTe });
    setSelectedCourseCode('');
    setSaveMessage('');
    setIsNewCourse(true);
  };

  const handleFieldChange = (field, value) => {
    setCourseData(prev => ({ ...prev, [field]: value }));
  };

  const removePrerequisite = (index) => {
    setCourseData(prev => ({
      ...prev,
      prerequisites: prev.prerequisites.filter((_, i) => i !== index)
    }));
  };

  const addPrerequisite = () => {
    if (selectedPrereq && !courseData.prerequisites.includes(selectedPrereq)) {
      setCourseData(prev => ({
        ...prev,
        prerequisites: [...prev.prerequisites, selectedPrereq]
      }));
      setSelectedPrereq('');
      setShowPrereqModal(false);
    }
  };

  const validateCourse = () => {
    if (!courseData.code.trim()) {
      alert('Course code is required');
      return false;
    }
    if (!courseData.name.trim()) {
      alert('Course name is required');
      return false;
    }
    if (!courseData.description.trim()) {
      alert('Course description is required');
      return false;
    }
    if (!courseData.startDate) {
      alert('Start date is required');
      return false;
    }
    if (!courseData.endDate) {
      alert('End date is required');
      return false;
    }
    
    // Check if course code already exists (only for new courses)
    if (isNewCourse && availableCourses.some(c => c.code === courseData.code)) {
      alert('A course with this code already exists');
      return false;
    }
    
    return true;
  };

  const handleSave = () => {
    if (!validateCourse()) return;

    if (isNewCourse) {
      // Add new course
      setAvailableCourses([...availableCourses, { ...courseData }]);
      setSelectedCourseCode(courseData.code);
      setIsNewCourse(false);
      setSaveMessage('New course created successfully!');
    } else {
      // Update existing course
      const updatedCourses = availableCourses.map(course => 
        course.code === selectedCourseCode ? { ...courseData } : course
      );
      setAvailableCourses(updatedCourses);
      setSaveMessage('Changes saved successfully!');
    }
    
    setTimeout(() => setSaveMessage(''), 3000);
    console.log('Saved course data:', courseData);
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete ' + courseData.code + '?')) {
      const updatedCourses = availableCourses.filter(c => c.code !== courseData.code);
      setAvailableCourses(updatedCourses);
      
      if (updatedCourses.length > 0) {
        handleCourseSelect(updatedCourses[0].code);
      } else {
        handleNewCourse();
      }
      
      setSaveMessage('Course deleted successfully!');
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  const handleCancel = () => {
    if (isNewCourse && availableCourses.length > 0) {
      handleCourseSelect(availableCourses[0].code);
    } else if (!isNewCourse) {
      const originalCourse = availableCourses.find(c => c.code === selectedCourseCode);
      if (originalCourse) {
        setCourseData({ ...originalCourse });
      }
    }
    setSaveMessage('');
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">Available Courses</h3>
              <div className="flex gap-2">
                <button 
                  onClick={handleNewCourse}
                  className="p-1 hover:bg-blue-50 rounded transition-colors text-blue-600"
                  title="Add New Course"
                >
                  <Plus size={18} />
                </button>
                <button 
                  onClick={() => setSearchTerm('')}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                  title="Refresh"
                >
                  <RefreshCw size={18} className="text-gray-600" />
                </button>
              </div>
            </div>
            
            <div className="p-4 border-b border-gray-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="p-2">
              {isNewCourse && (
                <button
                  className="w-full text-left p-3 rounded-lg mb-1 transition-colors bg-blue-600 text-white"
                >
                  <p className="font-medium text-sm">New Course</p>
                  <p className="text-xs mt-0.5 text-blue-100">Click to create</p>
                </button>
              )}
              {filteredCourses.map((course, idx) => (
                <button
                  key={idx}
                  onClick={() => handleCourseSelect(course.code)}
                  className={'w-full text-left p-3 rounded-lg mb-1 transition-colors ' + (selectedCourseCode === course.code && !isNewCourse ? 'bg-gray-900 text-white' : 'hover:bg-gray-50')}
                >
                  <p className={'font-medium text-sm ' + (selectedCourseCode === course.code && !isNewCourse ? 'text-white' : 'text-gray-900')}>
                    {course.code}
                  </p>
                  <p className={'text-xs mt-0.5 ' + (selectedCourseCode === course.code && !isNewCourse ? 'text-gray-300' : 'text-gray-600')}>
                    {course.name}
                  </p>
                  <p className={'text-xs mt-0.5 ' + (selectedCourseCode === course.code && !isNewCourse ? 'text-gray-400' : 'text-gray-500')}>
                    {course.term}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                {isNewCourse ? 'New Course' : 'Course Details'}
              </h3>
              <div className="flex items-center gap-3">
                {!isNewCourse && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Last updated: Dec 20, 2024
                  </div>
                )}
                <button 
                  onClick={handleCancel}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors text-sm"
                >
                  Cancel
                </button>
                {!isNewCourse && (
                  <button 
                    onClick={handleDelete}
                    className="px-4 py-2 border border-red-300 text-red-600 rounded-lg flex items-center gap-2 text-sm font-medium hover:bg-red-50 transition-colors"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                )}
                <button 
                  onClick={handleSave}
                  className="bg-gray-900 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium hover:bg-gray-800 transition-colors"
                >
                  <Save size={16} />
                  {isNewCourse ? 'Create Course' : 'Save Changes'}
                </button>
              </div>
            </div>

            {saveMessage && (
              <div className="mx-6 mt-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
                {saveMessage}
              </div>
            )}

            <div className="p-6">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Course Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={courseData.code}
                    onChange={(e) => handleFieldChange('code', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., CS101"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Course Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={courseData.name}
                    onChange={(e) => handleFieldChange('name', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Introduction to Programming"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Program <span className="text-red-500">*</span>
                  </label>
                  <select 
                    value={courseData.program}
                    onChange={(e) => handleFieldChange('program', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option>Software Development - Diploma</option>
                    <option>Software Development - Post-Diploma</option>
                    <option>Software Development - Certificate</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Term <span className="text-red-500">*</span>
                  </label>
                  <select 
                    value={courseData.term}
                    onChange={(e) => handleFieldChange('term', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option>Winter 2025</option>
                    <option>Spring 2025</option>
                    <option>Summer 2025</option>
                    <option>Fall 2025</option>
                  </select>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Course Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows="4"
                  value={courseData.description}
                  onChange={(e) => handleFieldChange('description', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Enter a detailed description of the course..."
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={courseData.startDate}
                    onChange={(e) => handleFieldChange('startDate', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={courseData.endDate}
                    onChange={(e) => handleFieldChange('endDate', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Credits</label>
                  <input
                    type="number"
                    value={courseData.credits}
                    onChange={(e) => handleFieldChange('credits', parseInt(e.target.value) || 0)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="1"
                    max="6"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Max Enrollment</label>
                  <input
                    type="number"
                    value={courseData.maxEnrollment}
                    onChange={(e) => handleFieldChange('maxEnrollment', parseInt(e.target.value) || 0)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Course Status</label>
                  <select 
                    value={courseData.status}
                    onChange={(e) => handleFieldChange('status', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option>Active</option>
                    <option>Draft</option>
                    <option>Archived</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Instructor</label>
                  <select 
                    value={courseData.instructor}
                    onChange={(e) => handleFieldChange('instructor', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
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
                    value={courseData.location}
                    onChange={(e) => handleFieldChange('location', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Room 201, Building A"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Prerequisites</label>
                <div className="space-y-2 mb-3">
                  {courseData.prerequisites.map((prereq, idx) => (
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
                <button 
                  onClick={() => setShowPrereqModal(true)}
                  className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900 font-medium"
                >
                  <Plus size={16} />
                  Add Prerequisite
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showPrereqModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Add Prerequisite</h3>
              <button 
                onClick={() => {
                  setShowPrereqModal(false);
                  setSelectedPrereq('');
                }}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Course
              </label>
              <select 
                value={selectedPrereq}
                onChange={(e) => setSelectedPrereq(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">-- Select a course --</option>
                {availablePrerequisites.map((prereq, idx) => (
                  <option key={idx} value={prereq}>{prereq}</option>
                ))}
              </select>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button 
                onClick={() => {
                  setShowPrereqModal(false);
                  setSelectedPrereq('');
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={addPrerequisite}
                disabled={!selectedPrereq}
                className="px-4 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Add Prerequisite
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditCourse;