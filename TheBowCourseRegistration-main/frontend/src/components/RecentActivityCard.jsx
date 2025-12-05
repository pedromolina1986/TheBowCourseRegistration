import React from 'react';

const RecentActivityCard = ({ activity }) => {
  const Icon = activity.icon;  // Dynamic icon for activity
  return (
    <div className="flex gap-3 pb-5 mb-5 border-b border-gray-200">
      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
        <Icon size={16} className="text-gray-600" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 mb-0.5">{activity.title}</p>
        <p className="text-xs text-gray-500 mb-1">{activity.description}</p>
        <p className="text-xs text-gray-400">{activity.time}</p>
      </div>
    </div>
  );
};

export default RecentActivityCard;