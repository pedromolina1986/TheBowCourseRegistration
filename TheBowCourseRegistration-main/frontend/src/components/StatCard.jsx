import React from 'react';

const StatCard = ({ stat }) => {
  const Icon = stat.icon;  // This allows dynamic icon import
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-start justify-between mb-3">
        <p className="text-sm text-gray-600">{stat.label}</p>
        <Icon size={20} className="text-gray-400" />
      </div>
      <p className="text-3xl font-semibold text-gray-900 mb-1">{stat.value}</p>
      <p className="text-xs text-gray-500">{stat.change}</p>
    </div>
  );
};

export default StatCard;