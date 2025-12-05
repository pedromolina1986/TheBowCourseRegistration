import { useState, useEffect } from 'react';
import { Code, Globe, Database, TestTube, Search, ChevronDown } from 'lucide-react';
import CourseCard from './CourseCard';
import api from '../services/api';

const AllCourses = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTerm, setSelectedTerm] = useState('All Terms');
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    async function loadCourses() {
      try {
        const res = await api.get("/courses");
        const mapped = res.data.map((c) => {
          const startDate = c.start_date ? new Date(c.start_date).toLocaleDateString() : "";
          const endDate = c.end_date ? new Date(c.end_date).toLocaleDateString() : "";
          
          return{
            code: c.course_code,
            title: c.course_name,
            term: c.term_name,     
            description: c.description,
            credits: c.credit_hours,
            maxEnrollment: c.capacity,
            instructor: c.instructor_id,
            startDate: startDate || '',
            endDate: endDate || '',
            icon: Code   
        };
      });
        setCourses(mapped);
      } catch (err) {
        console.error("Failed to load courses:", err);
      }
    }

    loadCourses();
  }, []);

  // Apply search + filter
  const filteredCourses = courses.filter(course => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.code.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTerm =
      selectedTerm === "All Terms" || course.term === selectedTerm;

    return matchesSearch && matchesTerm;
  });

  return (
    <section className="bg-white py-16 rounded-lg border border-neutral-200 mx-auto my-8 p-8 max-w-7xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Available Courses</h2>
          <p className="text-gray-600 mb-6">
            Explore our comprehensive course catalog.
          </p>
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search courses..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-900"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="relative">
              <select
                className="appearance-none px-4 py-2 pr-10 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-900"
                value={selectedTerm}
                onChange={(e) => setSelectedTerm(e.target.value)}
              >
                <option>All Terms</option>
                <option>Winter 2025</option>
                <option>Spring 2025</option>
                <option>Summer 2025</option>
                <option>Fall 2025</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {filteredCourses.map((course, i) => (
            <CourseCard key={i} {...course} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AllCourses;
