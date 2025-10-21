import { useState } from "react";
import { Search, GraduationCap, Award, Code, Smartphone } from "lucide-react"; 
import ColorButton from "./ColorButton";
import WhiteButton from "./WhiteButton";
import WhiteButtonFull from "./WhiteButtonFull";

const ProgramsPage = () => {
  const [search, setSearch] = useState("");
  const [term, setTerm] = useState("All Terms");
  const [type, setType] = useState("All Types");

  const programs = [
    {
      title: "Software Development - Diploma",
      duration: "2 Years",
      term: "Winter",
      type: "Diploma",
      description:
        "A comprehensive two-year software development diploma program designed to equip students with essential programming skills, database management, web development, and software engineering principles.",
      fees: "$9,254 domestic / $27,735 international",
      department: "Software Development",
      icon: <GraduationCap className="w-10 h-10 m-auto mb-2" />,
      startDate: "September 5, 2024",
      endDate: "June 15, 2026",
    },
    {
      title: "Software Development - Post-Diploma",
      duration: "1 Year",
      term: "Winter",
      type: "Post-Diploma",
      description:
        "An advanced one-year post-diploma program focused on modern software engineering tools and frameworks for professional developers.",
      fees: "$6,800 domestic / $19,500 international",
      department: "Software Development",
      icon: <Award className="w-10 h-10 m-auto mb-2" />,
      startDate: "September 5, 2024",
      endDate: "June 15, 2025",
    },
    {
      title: "Web Development - Certificate",
      duration: "6 Months",
      term: "Spring",
      type: "Certificate",
      description:
        "Fast-track your web development skills with our intensive 6-month certificate program. Learn HTML, CSS, JavaScript, and modern frameworks to build responsive web applications.",
      fees: "$4,250 domestic / $12,750 international",
      department: "Software Development",
      icon: <Code className="w-10 h-10 m-auto mb-2" />,
      startDate: "March 1, 2025",
      endDate: "August 30, 2025",
    },
    {
      title: "Mobile App Development - Certificate",
      duration: "6 Months",
      term: "Summer",
      type: "Certificate",
      description:
        "Master mobile app development for iOS and Android platforms. Learn React Native, Flutter, and native development tools to create engaging mobile applications.",
      fees: "$4,750 domestic / $14,250 international",
      department: "Software Development",
      icon: <Smartphone className="w-10 h-10 m-auto mb-2" />,
      startDate: "June 1, 2025",
      endDate: "November 30, 2025",
    },
  ];

  const filteredPrograms = programs.filter((program) => {
    const matchesSearch = program.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesTerm =
      term === "All Terms" || program.term.toLowerCase() === term.toLowerCase();
    const matchesType =
      type === "All Types" || program.type.toLowerCase() === type.toLowerCase();
    return matchesSearch && matchesTerm && matchesType;
  });

  return (
    <div id="programs-content" className="flex-1 bg-white rounded-lg border border-neutral-200 mx-auto my-8 p-8 max-w-7xl">
      <div className="mb-6">
        <h2 className="text-2xl text-neutral-900 mb-2">
          Software Development Programs
        </h2>
        <p className="text-neutral-600">
          Explore our comprehensive programs designed to advance your career in
          software development.
        </p>
      </div>

      <div className="mb-6">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 text-neutral-400" />
            <input
              type="text"
              placeholder="Search programs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-500"
            />
          </div>
          <select
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            className="px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-500"
          >
            <option>All Terms</option>
            <option>Spring</option>
            <option>Summer</option>
            <option>Fall</option>
            <option>Winter</option>
          </select>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-500"
          >
            <option>All Types</option>
            <option>Diploma</option>
            <option>Post-Diploma</option>
            <option>Certificate</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {filteredPrograms.map((program, index) => (
          <div
            key={index}
            className="bg-white rounded-lg border border-neutral-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-32 flex items-center justify-center text-white">
              <div className="text-center items-center">
                {program.icon}
                <p className="text-sm">{program.title}</p>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg text-neutral-900">{program.title}</h3>
                <span className="bg-neutral-100 text-neutral-800 text-xs px-2 py-1 rounded-full">
                  {program.duration}
                </span>
              </div>
              <p className="text-sm text-neutral-600 mb-1">
                Term: {program.term} | {program.startDate} - {program.endDate}
              </p>
              <p className="text-sm text-neutral-600 mb-1">
                Department: {program.department}
              </p>
              <p className="text-sm text-neutral-600 mb-3">
                Fees: {program.fees}
              </p>
              <p className="text-neutral-700 text-sm mb-4">
                {program.description}
              </p>
              <div className="flex items-center justify-between">
                <WhiteButtonFull label={"View Details"} />
              </div>
            </div>
          </div>
        ))}

        {filteredPrograms.length === 0 && (
          <p className="text-neutral-500 col-span-full text-center">
            No programs match your search.
          </p>
        )}
      </div>
    </div>
  );
};

export default ProgramsPage;
