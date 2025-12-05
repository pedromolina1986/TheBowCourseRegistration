import React, { useState, useEffect } from "react";
import { RefreshCw, Search, X, Plus, Save, Trash2 } from "lucide-react";
import api from "../services/api.js";

const emptyCourse = {
  course_id: null,
  course_code: "-",
  course_name: "-",
  description: "-",
  credit_hours: 3,
  capacity: 30,
  instructor_id: null,
  term_id: null,
  status: "Active",
};

const EditCourse = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [courseData, setCourseData] = useState(emptyCourse);
  const [searchTerm, setSearchTerm] = useState("");
  const [saveMessage, setSaveMessage] = useState("");
  const [isNewCourse, setIsNewCourse] = useState(false);

  const [instructors, setInstructors] = useState([]);
  const [terms, setTerms] = useState([]);

  // Fetch courses
  const fetchCourses = async () => {
    try {
      const res = await api.get("courses");
      const mapped = res.data.map((c) => ({
        course_id: c.course_id,
        course_code: c.course_code || "-",
        course_name: c.course_name || "-",
        description: c.description || "-",
        credit_hours: c.credit_hours || 3,
        capacity: c.capacity || 30,
        instructor_id: c.instructor_id || null,
        term_id: c.term_id || null,
        status: "Active",
      }));
      setCourses(mapped);
      if (!selectedCourseId && mapped.length > 0) {
        setSelectedCourseId(mapped[0].course_id);
        setCourseData(mapped[0]);
      }
    } catch (err) {
      console.error("Failed to fetch courses:", err);
    }
  };

  // Fetch instructors
  const fetchInstructors = async () => {
    try {
      const res = await api.get("instructors");
      setInstructors(res.data);
    } catch (err) {
      console.error("Failed to fetch instructors:", err);
    }
  };

  // Fetch terms
  const fetchTerms = async () => {
    try {
      const res = await api.get("terms");
      setTerms(res.data);
    } catch (err) {
      console.error("Failed to fetch terms:", err);
    }
  };

  useEffect(() => {
    fetchCourses();
    fetchInstructors();
    fetchTerms();
  }, []);

  const filteredCourses = courses.filter(
    (course) =>
      course.course_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.course_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCourseSelect = (id) => {
    const course = courses.find((c) => c.course_id === id);
    if (course) {
      setCourseData({ ...course });
      setSelectedCourseId(id);
      setIsNewCourse(false);
      setSaveMessage("");
    }
  };

  const handleNewCourse = () => {
    setCourseData({ ...emptyCourse });
    setSelectedCourseId(null);
    setIsNewCourse(true);
    setSaveMessage("");
  };

  const handleFieldChange = (field, value) => {
    setCourseData((prev) => ({ ...prev, [field]: value }));
  };

  const validateCourse = () => {
    if (!courseData.course_code.trim()) {
      alert("Course code is required");
      return false;
    }
    if (!courseData.course_name.trim()) {
      alert("Course name is required");
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!validateCourse()) return;

    const payload = {
      term_id: courseData.term_id,
      course_code: courseData.course_code,
      course_name: courseData.course_name,
      description: courseData.description,
      credit_hours: courseData.credit_hours,
      capacity: courseData.capacity,
      instructor_id: courseData.instructor_id,
      modified_by: 1,
    };

    try {
      if (isNewCourse) {
        const res = await api.post("courses", payload);
        setCourses([...courses, res.data]);
        setSelectedCourseId(res.data.course_id);
        setCourseData(res.data);
        setIsNewCourse(false);
        setSaveMessage("New course created successfully!");
      } else {
        await api.put(`courses/${courseData.course_id}`, payload);
        const updated = courses.map((c) =>
          c.course_id === courseData.course_id ? { ...courseData } : c
        );
        setCourses(updated);
        setSaveMessage("Changes saved successfully!");
      }
      setTimeout(() => setSaveMessage(""), 3000);
    } catch (err) {
      console.error("Save failed:", err);
      alert("Failed to save course. See console for details.");
    }
  };

  const handleDelete = async () => {
    if (!courseData.course_id) return;
    if (!window.confirm("Are you sure you want to delete this course?")) return;

    try {
      await api.delete(`courses/${courseData.course_id}`);
      const updated = courses.filter((c) => c.course_id !== courseData.course_id);
      setCourses(updated);
      if (updated.length > 0) {
        handleCourseSelect(updated[0].course_id);
      } else {
        handleNewCourse();
      }
      setSaveMessage("Course deleted successfully!");
      setTimeout(() => setSaveMessage(""), 3000);
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete course. See console for details.");
    }
  };

  const handleCancel = () => {
    if (isNewCourse) {
      if (courses.length > 0) handleCourseSelect(courses[0].course_id);
      else setCourseData({ ...emptyCourse });
      setIsNewCourse(false);
    } else {
      const original = courses.find((c) => c.course_id === selectedCourseId);
      if (original) setCourseData({ ...original });
    }
    setSaveMessage("");
  };

  return (
    <div className="p-4 sm:p-8 bg-gradient-to-br from-blue-100 to-purple-100 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sidebar */}
        <div className="col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="font-semibold text-gray-900">Available Courses</h3>
              <div className="flex gap-2">
                <button
                  onClick={handleNewCourse}
                  className="p-1 hover:bg-blue-50 rounded text-blue-600"
                  title="Add New Course"
                >
                  <Plus size={18} />
                </button>
                <button
                  onClick={fetchCourses}
                  className="p-1 hover:bg-gray-100 rounded"
                  title="Refresh"
                >
                  <RefreshCw size={18} className="text-gray-600" />
                </button>
              </div>
            </div>

            <div className="p-4 border-b">
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

            <div className="p-2 max-h-[70vh] overflow-y-auto">
              {courses.map((course) => (
                <button
                  key={course.course_id}
                  onClick={() => handleCourseSelect(course.course_id)}
                  className={`w-full text-left p-3 rounded-lg mb-1 transition-colors ${
                    selectedCourseId === course.course_id && !isNewCourse
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <p className="font-medium text-sm">{course.course_code}</p>
                  <p className="text-xs mt-0.5">{course.course_name}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-span-1 lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">
                {isNewCourse ? "New Course" : "Course Details"}
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 border border-gray-300 rounded text-gray-700 font-medium hover:bg-gray-50 text-sm"
                >
                  Cancel
                </button>
                {!isNewCourse && (
                  <button
                    onClick={handleDelete}
                    className="px-4 py-2 border border-red-300 text-red-600 rounded text-sm font-medium hover:bg-red-50 flex items-center gap-2"
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                )}
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded flex items-center gap-2 text-sm font-medium hover:bg-gray-800"
                >
                  <Save size={16} /> {isNewCourse ? "Create Course" : "Save Changes"}
                </button>
              </div>
            </div>

            {saveMessage && (
              <div className="mx-6 mt-4 p-3 bg-green-50 border border-green-200 rounded text-green-700 text-sm">
                {saveMessage}
              </div>
            )}

            {/* Form */}
            <div className="p-6 space-y-4">
              {/* Course Code & Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Course Code *</label>
                  <input
                    type="text"
                    value={courseData.course_code}
                    onChange={(e) => handleFieldChange("course_code", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Course Name *</label>
                  <input
                    type="text"
                    value={courseData.course_name}
                    onChange={(e) => handleFieldChange("course_name", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  rows="4"
                  value={courseData.description}
                  onChange={(e) => handleFieldChange("description", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>

              {/* Credits / Capacity */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Credits</label>
                  <input
                    type="number"
                    value={courseData.credit_hours}
                    onChange={(e) => handleFieldChange("credit_hours", parseInt(e.target.value) || 0)}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Capacity</label>
                  <input
                    type="number"
                    value={courseData.capacity}
                    onChange={(e) => handleFieldChange("capacity", parseInt(e.target.value) || 0)}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Instructor / Term */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Instructor</label>
                  <select
                    value={courseData.instructor_id || ""}
                    onChange={(e) => handleFieldChange("instructor_id", parseInt(e.target.value) || null)}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">-</option>
                    {instructors.map((inst) => (
                      <option key={inst.instructor_id} value={inst.instructor_id}>
                        {inst.first_name} {inst.last_name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Term</label>
                  <select
                    value={courseData.term_id || ""}
                    onChange={(e) => handleFieldChange("term_id", parseInt(e.target.value) || null)}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">-</option>
                    {terms.map((t) => (
                      <option key={t.term_id} value={t.term_id}>
                        {t.term_name}
                      </option>
                    ))}
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
