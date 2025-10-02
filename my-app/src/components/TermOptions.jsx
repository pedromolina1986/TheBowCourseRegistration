import { Sprout, Sun, Leaf, Snowflake } from 'lucide-react';

const TermOption = ({ icon: Icon, title, months, dates, registration }) => (
  <div className="text-center p-6">
    <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full mb-4">
      <Icon className="w-6 h-6 text-gray-700" />
    </div>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-sm text-gray-600 mb-3">{months}</p>
    <p className="text-xs text-gray-500 mb-2">{dates}</p>
    <p className="text-xs text-gray-500">{registration}</p>
  </div>
);

const TermOptions = () => {
  const terms = [
    {
      icon: Sprout,
      title: 'Spring Term',
      months: 'March – June',
      dates: 'Classes: Mar 3 – Jun 20',
      registration: 'Registration: Feb 3-15'
    },
    {
      icon: Sun,
      title: 'Summer Term',
      months: 'June – August',
      dates: 'Classes: Jun 23 – Aug 31',
      registration: 'Registration: May 1-20'
    },
    {
      icon: Leaf,
      title: 'Fall Term',
      months: 'September – December',
      dates: 'Classes: Sep 1 – Dec 15',
      registration: 'Registration: Aug 1-15'
    },
    {
      icon: Snowflake,
      title: 'Winter Term',
      months: 'January – March',
      dates: 'Classes: Jan 6 – Mar 31',
      registration: 'Registration: Dec 1-15'
    }
  ];

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Flexible Term Options</h2>
          <p className="text-gray-600">
            Start your journey with us any time of the year with our four-term system.
          </p>
        </div>
        <div className="grid md:grid-cols-4 gap-8">
          {terms.map((term, i) => (
            <TermOption key={i} {...term} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TermOptions;