import React, { useState } from 'react';
import { RefreshCw, Search, X, Plus, Save, Eye, Trash2 } from 'lucide-react';

const initialCourses = [
  { code: 'CS101', name: 'Introduction to Programming', term: 'Winter 2025', program: 'Software Development - Diploma', description: 'This course introduces students to fundamental programming concepts using modern programming languages. Students will learn basic programming constructs, problem-solving techniques, and software development practices.', startDate: '2025-01-15', endDate: '2025-04-30', credits: 3, maxEnrollment: 30, status: 'Active', instructor: 'Dr. Sarah Johnson', location: 'Room 201, Building A', prerequisites: ['High School Mathematics', 'Basic Computer Skills'] },
  { code: 'CS201', name: 'Data Structures', term: 'Spring 2025', program: 'Software Development - Diploma', description: 'Advanced study of data structures and algorithms including arrays, linked lists, trees, and graphs.', startDate: '2025-05-01', endDate: '2025-08-15', credits: 4, maxEnrollment: 25, status: 'Active', instructor: 'Prof. Michael Chen', location: 'Room 305, Building B', prerequisites: ['CS101'] },
  { code: 'CS301', name: 'Database Systems', term: 'Summer 2025', program: 'Software Development - Post-Diploma', description: 'Comprehensive introduction to database design, SQL, and database management systems.', startDate: '2025-06-01', endDate: '2025-09-30', credits: 3, maxEnrollment: 35, status: 'Active', instructor: 'Dr. Emily Williams', location: 'Room 102, Building C', prerequisites: ['CS201'] },
  { code: 'CS401', name: 'Web Development', term: 'Fall 2025', program: 'Software Development - Certificate', description: 'Modern web development using HTML, CSS, JavaScript, and popular frameworks.', startDate: '2025-09-15', endDate: '2025-12-20', credits: 4, maxEnrollment: 40, status: 'Draft', instructor: 'Prof. David Park', location: 'Room 401, Building A', prerequisites: ['CS101', 'CS201'] }
];

const EditCourse = () => {
  const [availableCourses, setAvailableCourses] = useState(initialCourses);
  const [selectedCourseCode, setSelectedCourseCode] = useState('CS101');
  const [searchTerm, setSearchTerm] = useState('');
  const [courseData, setCourseData] = useState(initialCourses[0]);
  const [saveMessage, setSaveMessage] = useState('');
  const [showPrereqModal, setShowPrereqModal] = useState(false);
  const [selectedPrereq, setSelectedPrereq] = useState('');

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
    }
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

  const handleSave = () => {
    const updatedCourses = availableCourses.map(course => 
      course.code === selectedCourseCode ? { ...courseData } : course
    );
    setAvailableCourses(updatedCourses);
    setSaveMessage('Changes saved successfully!');
    setTimeout(() => setSaveMessage(''), 3000);
    console.log('Saved course data:', courseData);
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete ' + courseData.code + '?')) {
      alert('Course deleted successfully!');
    }
  };

  return (
  <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-1">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">Available Courses</h3>
            <button
              onClick={() => setSearchTerm('')}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
            >
              <RefreshCw size={18} className="text-gray-600" />
            </button>
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

          <div className="p-2 max-h-[60vh] overflow-auto">
            {filteredCourses.map((course, idx) => (
              <button
                key={idx}
                onClick={() => handleCourseSelect(course.code)}
                className={
                  'w-full text-left p-3 rounded-lg mb-1 transition-colors ' +
                  (selectedCourseCode === course.code ? 'bg-gray-900 text-white' : 'hover:bg-gray-50')
                }
              >
                <p className={'font-medium text-sm ' + (selectedCourseCode === course.code ? 'text-white' : 'text-gray-900')}>
                  {course.code}
                </p>
                <p className={'text-xs mt-0.5 ' + (selectedCourseCode === course.code ? 'text-gray-300' : 'text-gray-600')}>
                  {course.name}
                </p>
                <p className={'text-xs mt-0.5 ' + (selectedCourseCode === course.code ? 'text-gray-400' : 'text-gray-500')}>
                  {course.term}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="md:col-span-2">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
            <h3 className="text-lg font-semibold text-gray-900">Course Details</h3>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Last updated: Dec 20, 2024
              </div>
              <button
                onClick={handleSave}
                className="bg-gray-900 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium hover:bg-gray-800 transition-colors"
              >
                <Save size={16} />
                Save Changes
              </button>
            </div>
          </div>

          {saveMessage && (
            <div className="mx-6 mt-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
              {saveMessage}
            </div>
          )}

          <div className="p-6 space-y-4">
            {/* Course Code & Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Course Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={courseData.code}
                  onChange={(e) => handleFieldChange('code', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                />
              </div>
            </div>

            {/* Program & Term */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Course Description <span className="text-red-500">*</span>
              </label>
              <textarea
                rows="4"
                value={courseData.description}
                onChange={(e) => handleFieldChange('description', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              ></textarea>
            </div>

            {/* Start & End Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

            {/* Other fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Credits</label>
                <input
                  type="number"
                  value={courseData.credits}
                  onChange={(e) => handleFieldChange('credits', parseInt(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Max Enrollment</label>
                <input
                  type="number"
                  value={courseData.maxEnrollment}
                  onChange={(e) => handleFieldChange('maxEnrollment', parseInt(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
          </div>
        </div>
      </div>
    </div>
  </div>
);

};

export default EditCourse;