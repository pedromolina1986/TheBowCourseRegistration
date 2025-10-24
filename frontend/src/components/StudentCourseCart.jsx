import { useState } from "react";
import { Code, Database, Smartphone } from "lucide-react";

export default function CourseRegistrationCart() {
  const [courses, setCourses] = useState([
    {
      id: 1,
      name: "Web Development Fundamentals",
      code: "WDF101",
      term: "Winter 2025 | Jan 8 - Mar 28, 2025",
      description:
        "Introduction to HTML, CSS, and JavaScript fundamentals for web development.",
      price: 1250,
      icon: Code,
      color: "bg-blue-300"
    },
    {
      id: 2,
      name: "Database Design & SQL",
      code: "DBS201",
      term: "Winter 2025 | Jan 8 - Mar 28, 2025",
      description:
        "Learn database design principles and SQL programming for data management.",
      price: 1180,
      icon: Database,
      color: "bg-green-300"
    },
    {
      id: 3,
      name: "Mobile App Development",
      code: "MAD301",
      term: "Winter 2025 | Jan 8 - Mar 28, 2025",
      description:
        "Build native and cross-platform mobile applications using modern frameworks.",
      price: 1420,
      icon: Smartphone,
      color: "bg-red-300"
    },
  ]);

  const [promoCode, setPromoCode] = useState("");
  const registrationFee = 150;
  const studentServicesFee = 75;

  const removeCourse = (id) => {
    setCourses(courses.filter((course) => course.id !== id));
  };

  const subtotal = courses.reduce((sum, course) => sum + course.price, 0);
  const total = subtotal + registrationFee + studentServicesFee;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100">
      <div className="p-4 sm:p-8">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-2">
            Shopping Cart
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            Review your selected courses before proceeding to payment
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Courses List */}
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Selected Courses ({courses.length})
            </h3>

            <div className="space-y-4">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="bg-white rounded-lg border border-gray-200 p-6 flex flex-col sm:flex-row justify-between gap-4"
                >
                  <div className="flex gap-4 flex-1">
                    <div className={`${course.color} w-16 h-16 rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <course.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-900 mb-1">
                        {course.name}
                      </h4>
                      <p className="text-sm text-gray-600 mb-1">
                        Course Code: {course.code}
                      </p>
                      <p className="text-sm text-gray-600 mb-2">
                        Term: {course.term}
                      </p>
                      <p className="text-sm text-gray-500">
                        {course.description}
                      </p>
                    </div>
                  </div>
                  <div className="text-right sm:ml-4 flex-shrink-0">
                    <p className="text-xl font-semibold text-gray-900 mb-2">
                      ${course.price.toLocaleString()}
                    </p>
                    <button
                      onClick={() => removeCourse(course.id)}
                      className="text-sm text-gray-600 hover:text-red-600 flex items-center gap-1"
                    >
                      <span className="text-lg">×</span> Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button className="mt-6 text-gray-600 hover:text-gray-900 flex items-center gap-2 text-sm font-medium">
              <span className="text-xl">+</span> Add More Courses
            </button>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-96">
            <div className="bg-white rounded-lg border border-gray-200 p-6 sticky lg:top-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Order Summary
              </h3>

              <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({courses.length} courses)</span>
                  <span className="font-medium">
                    ${subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Registration Fee</span>
                  <span className="font-medium">${registrationFee}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Student Services Fee</span>
                  <span className="font-medium">${studentServicesFee}</span>
                </div>
              </div>

              <div className="flex justify-between text-lg font-semibold text-gray-900 mb-6">
                <span>Total</span>
                <span>${total.toLocaleString()}</span>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Type
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-slate-500">
                  <option>Domestic Student</option>
                  <option>International Student</option>
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Promo Code
                </label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    placeholder="Enter code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                  />
                  <button className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium">
                    Apply
                  </button>
                </div>
              </div>

              <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-102 mb-3">
                Proceed to Payment
              </button>

              <button className="w-full bg-white text-gray-700 py-3 rounded-lg font-medium border border-gray-300 hover:bg-gray-50 transition-colors">
                Save for Later
              </button>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="text-sm font-semibold text-gray-900 mb-3">
                  Student Information
                </h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>Student ID: SD2025001</p>
                  <p>Program: Software Development - Diploma</p>
                  <p>Term: Winter 2025</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
