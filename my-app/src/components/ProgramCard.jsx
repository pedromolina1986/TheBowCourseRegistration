
const ProgramCard = ({ icon: Icon, title, duration, description, details }) => (
  <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
    <div className="flex items-center gap-3 mb-4">
      <Icon className="w-6 h-6" />
      <h3 className="text-xl font-semibold">{title}</h3>
    </div>
    <p className="text-sm text-gray-500 mb-4">{duration}</p>
    <p className="text-gray-600 mb-6">{description}</p>
    <div className="space-y-2 mb-6">
      {details.map((detail, i) => (
        <div key={i} className="flex justify-between text-sm">
          <span className="text-gray-600">{detail.label}:</span>
          <span className="font-medium">{detail.value}</span>
        </div>
      ))}
    </div>
    <button className="w-full py-2 border border-gray-300 rounded hover:bg-gray-50 text-sm">
      View Details
    </button>
  </div>
);

export default ProgramCard;