import ProgramCard from '../components/ProgramCard';
import { GraduationCap, Award, Calendar } from 'lucide-react';


const Programs = () => {
  const programs = [
    {
      icon: GraduationCap,
      title: 'Diploma Program',
      duration: '2 Years',
      description: 'A comprehensive two-year software development diploma program designed to equip students with essential programming skills and industry knowledge.',
      details: [
        { label: 'Duration', value: '24 months' },
        { label: 'Start Date', value: 'Sep 5, 2025' },
        { label: 'Domestic Fee', value: '$9,754' },
        { label: 'International Fee', value: '$27,735' }
      ]
    },
    {
      icon: Award,
      title: 'Post-Diploma',
      duration: '1 Year',
      description: 'Jumpstart your tech career with our one-year post-diploma program in software development designed for career advancement.',
      details: [
        { label: 'Duration', value: '12 months' },
        { label: 'Start Date', value: 'Sep 5, 2025' },
        { label: 'Domestic Fee', value: '$7,856' },
        { label: 'International Fee', value: '$21,675' }
      ]
    },
    {
      icon: Calendar,
      title: 'Certificate Program',
      duration: '8 Months',
      description: 'Fast-track your entry into software development with our intensive certificate program covering essential web technologies.',
      details: [
        { label: 'Duration', value: '8 months' },
        { label: 'Start Date', value: 'Mar 15, 2025' },
        { label: 'Domestic Fee', value: '$4,500' },
        { label: 'International Fee', value: '$12,500' }
      ]
    }
  ];
return (
    <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-white text-3xl font-bold mb-4">Our Programs</h2>
          <p className="text-white max-w-3xl mx-auto">
            Choose from our comprehensive Software Development programs designed to fit your career goals and schedule.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {programs.map((program, i) => (
            <ProgramCard key={i} {...program} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Programs;