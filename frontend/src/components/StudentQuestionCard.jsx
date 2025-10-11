import React from 'react';
import { User } from 'lucide-react';  // Importing the User icon

const StudentQuestionCard = ({ question }) => {
  return (
    <div className="pb-5 mb-5 border-b border-gray-200">
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
            <User size={20} className="text-gray-600" />
          </div>
          <div>
            <p className="font-medium text-gray-900">{question.name}</p>
            <p className="text-xs text-gray-500">{question.program}</p>
          </div>
        </div>
        <span
          className={`px-2.5 py-1 rounded text-xs font-medium ${
            question.status === 'New'
              ? 'bg-blue-100 text-blue-700'
              : question.status === 'Urgent'
              ? 'bg-red-100 text-red-700'
              : 'bg-yellow-100 text-yellow-700'
          }`}
        >
          {question.status}
        </span>
      </div>
      <p className="text-sm text-gray-700 mb-2 ml-13">{question.question}</p>
      <p className="text-xs text-gray-400 ml-13">Submitted {question.time}</p>
    </div>
  );
};

export default StudentQuestionCard;