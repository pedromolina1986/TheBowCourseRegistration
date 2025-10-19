const CTA = () => (
  <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 className="text-3xl font-bold mb-4">
        Ready to Start Your Software Development Journey?
      </h2>
      <p className="text-gray-300 mb-8">
        Join thousands of students who have launched successful careers in technology through our comprehensive programs.
      </p>
      <div className="flex gap-4 justify-center">
        <button className="px-6 py-2.5 bg-white text-gray-700 border-2 border-gray-200 font-bold rounded-lg hover:border-blue-300 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
          Sign Up Now
        </button>
        <button className="px-6 py-3 border border-white text-white rounded hover:shadow-lg transition-all duration-300 transform hover:scale-105">
          Contact Admissions
        </button>
      </div>
    </div>
  </section>
);

export default CTA;