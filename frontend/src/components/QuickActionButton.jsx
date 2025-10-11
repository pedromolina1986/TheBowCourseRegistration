import React from 'react';
import { ChevronRight } from 'lucide-react';  

const QuickActionButton = ({ action }) => {
  return (
    <button
      className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors mb-1"
    >
      <div className="flex items-center gap-3">
        <action.icon size={18} className="text-gray-600" />
        <span className="text-sm font-medium text-gray-900">{action.label}</span>
      </div>
      <ChevronRight size={18} className="text-gray-400" />
    </button>
  );
};

export default QuickActionButton;