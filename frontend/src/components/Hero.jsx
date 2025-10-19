

const courseClick = () => {
  window.location.href = '/courses'
}
const programClick = () => {
  window.location.href = '/programs'
}
const Hero = () => (
  

  <section className="bg-gradient-to-br from-blue-100 to-purple-100 py-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Transform Your Future with Bow Valley College
          </h1>
          <p className="text-gray-600 mb-8">
            Join our comprehensive Software Development programs and gain the skills needed to excel in today's tech industry. From diploma to certificate programs, we offer flexible learning paths designed for your success.
          </p>
          <ul className="space-y-3 mb-8">
            {[
              'Industry-relevant curriculum',
              'Expert instructors with real-world experience',
              'Flexible term options throughout the year',
              'Career support and job placement assistance'
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3">
                <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
          <div className="flex gap-4">
            <button className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105" onClick={programClick}>
              Explore Programs
            </button>
            <button className="px-6 py-2.5 bg-white text-gray-700 border-2 border-gray-200 font-bold rounded-lg hover:border-blue-300 hover:shadow-lg transition-all duration-300 transform hover:scale-105" onClick={courseClick}>
              View Courses
            </button>
          </div>
        </div>
        <img src="./public/Student.jpg.webp" alt="Student Learning Together" className="object-cover rounded-lg" /> 
      </div>
    </div>
  </section>
);

export default Hero;