const CourseCard = ({ code, title, term, description, startDate, endDate, credits, icon: Icon }) => (
  <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
    <div className="flex items-start justify-between mb-4">
      <div>
        <h3 className="text-lg font-semibold mb-1">{code} - {title}</h3>
        <p className="text-sm text-gray-500">{term}</p>
      </div>
      <Icon className="w-5 h-5 text-gray-400" />
    </div>
    <p className="text-sm text-gray-600 mb-4">{description}</p>
    <div className="space-y-2 mb-4">
      <div className="flex justify-between text-sm">
        <span className="text-gray-600">Start Date:</span>
        <span className="font-medium">{startDate}</span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-gray-600">End Date:</span>
        <span className="font-medium">{endDate}</span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-gray-600">Credits:</span>
        <span className="font-medium">{credits}</span>
      </div>
    </div>
    <button className="w-full py-2 border border-gray-300 rounded hover:bg-gray-50 text-sm">
      View Course Details
    </button>
  </div>
);

export default CourseCard;