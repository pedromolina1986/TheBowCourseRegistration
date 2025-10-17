import { useState } from 'react';
import { Code, Globe, Database, TestTube, Search, ChevronDown } from 'lucide-react';
import CourseCard from './CourseCard';

const AllCourses = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTerm, setSelectedTerm] = useState('All Terms');


  const courses = [
    {
      code: 'SDEV101',
      title: 'Programming Fundamentals',
      term: 'Winter 2025',
      description: 'Introduction to programming concepts using modern programming languages. Covers variables, control structures, functions, and basic algorithms.',
      startDate: 'Jan 15, 2025',
      endDate: 'Mar 30, 2025',
      credits: '3',
      icon: Code
    },
    {
      code: 'SDEV102',
      title: 'Web Development',
      term: 'Winter 2025',
      description: 'Comprehensive introduction to web development including HTML, CSS, JavaScript, and modern web frameworks for building responsive websites.',
      startDate: 'Jan 15, 2025',
      endDate: 'Mar 30, 2025',
      credits: '4',
      icon: Globe
    },
    {
      code: 'SDEV103',
      title: 'Database Design',
      term: 'Winter 2025',
      description: 'Learn database design principles, SQL programming, and database management systems for effective data storage and retrieval.',
      startDate: 'Jan 15, 2025',
      endDate: 'Mar 30, 2025',
      credits: '3',
      icon: Database
    },
    {
      code: 'SDEV104',
      title: 'Software Testing',
      term: 'Winter 2025',
      description: 'Comprehensive overview of software testing methodologies including unit testing, integration testing, and automated testing frameworks.',
      startDate: 'Jan 15, 2025',
      endDate: 'Mar 30, 2025',
      credits: '3',
      icon: TestTube
    }
  ];

  return (
    <section className="bg-white py-16 rounded-lg border border-neutral-200 mx-auto my-8 p-8 max-w-7xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Available Courses</h2>
          <p className="text-gray-600 mb-6">
            Explore our comprehensive course catalog for the Software Development department.
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
          {courses.map((course, i) => (
            <CourseCard key={i} {...course} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AllCourses;