import React from 'react';
import { Edit, Key, Bell, Download, Shield, Users, Building, Calendar } from 'lucide-react';

const ProfileManagement = () => {
  const accountInfo = [
    { label: 'Account Status', value: 'Active', isStatus: true },
    { label: 'Last Login', value: 'Today, 9:15 AM' },
    { label: 'Password Updated', value: 'Dec 15, 2024' },
    { label: 'Profile Updated', value: 'Nov 28, 2024' }
  ];

  const quickActions = [
    { label: 'Change Password', icon: Key },
    { label: 'Notification Settings', icon: Bell },
    { label: 'Download Profile Data', icon: Download }
  ];

  const permissions = [
    { label: 'Course Management', enabled: true },
    { label: 'Student Management', enabled: true },
    { label: 'System Administration', enabled: true },
    { label: 'Reports Access', enabled: true }
  ];

  const InfoField = ({ label, value }) => (
    <div>
      <label className="block text-sm text-gray-600 mb-2">{label}</label>
      <div className="bg-gray-50 rounded px-4 py-3 text-gray-900">{value}</div>
    </div>
  );

  return (
    <div className="p-8">            
      <div className="grid grid-cols-3 gap-6">
        {/* Profile Card - Spans 2 columns */}
        <div className="col-span-2 bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Profile Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg className="w-16 h-16" viewBox="0 0 100 100" fill="none">
                    <circle cx="50" cy="35" r="15" fill="#000"/>
                    <path d="M30 70 Q30 55 50 55 Q70 55 70 70" stroke="#000" strokeWidth="3" fill="none"/>
                    <circle cx="40" cy="35" r="2" fill="#fff"/>
                    <circle cx="60" cy="35" r="2" fill="#fff"/>
                    <path d="M35 40 Q50 45 65 40" stroke="#fff" strokeWidth="2" fill="none"/>
                    <rect x="35" y="25" width="30" height="8" fill="#000" rx="1"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900">John Smith</h3>
                  <p className="text-gray-600 mb-2">System Administrator</p>
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1 text-sm text-gray-600">
                      <Shield size={16} />
                      Administrator
                    </span>
                    <span className="flex items-center gap-1 text-sm text-green-600">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      Active
                    </span>
                  </div>
                </div>
              </div>
              <button className="bg-gray-900 text-white px-4 py-2.5 rounded-lg flex items-center gap-2 hover:bg-gray-800 transition-colors">
                <Edit size={16} />
                <span className="text-sm font-medium">Edit Profile</span>
              </button>
            </div>
          </div>

          {/* Profile Information */}
          <div className="p-6">
            <div className="grid grid-cols-2 gap-4 mb-6">
              <InfoField label="First Name" value="John" />
              <InfoField label="Last Name" value="Smith" />
              <InfoField label="Email Address" value="john.smith@bowcollege.ca" />
              <InfoField label="Phone Number" value="(403) 555-0123" />
              <InfoField label="Employee ID" value="EMP-2024-001" />
              <InfoField label="Department" value="Software Development" />
              <InfoField label="Role" value="System Administrator" />
              <InfoField label="Start Date" value="January 15, 2020" />
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Address Information</h4>
              <div className="grid grid-cols-2 gap-4">
                <InfoField label="Street Address" value="123 Main Street" />
                <InfoField label="City" value="Calgary" />
                <InfoField label="Province" value="Alberta" />
                <InfoField label="Postal Code" value="T2P 1J9" />
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-6">
          {/* Account Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Account Information</h3>
            </div>
            <div className="p-6">
              {accountInfo.map((info, idx) => (
                <div key={idx} className={`flex justify-between items-center ${idx !== accountInfo.length - 1 ? 'pb-3 mb-3 border-b border-gray-100' : ''}`}>
                  <span className="text-sm text-gray-600">{info.label}</span>
                  {info.isStatus ? (
                    <span className="flex items-center gap-1 text-sm text-green-600 font-medium">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      {info.value}
                    </span>
                  ) : (
                    <span className="text-sm text-gray-900 font-medium">{info.value}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
            </div>
            <div className="p-4">
              {quickActions.map((action, idx) => {
                const Icon = action.icon;
                return (
                  <button
                    key={idx}
                    className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors mb-1"
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={18} className="text-gray-600" />
                      <span className="text-sm font-medium text-gray-900">{action.label}</span>
                    </div>
                    <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Permissions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Permissions</h3>
            </div>
            <div className="p-6">
              {permissions.map((permission, idx) => (
                <div key={idx} className={`flex items-center justify-between ${idx !== permissions.length - 1 ? 'pb-3 mb-3 border-b border-gray-100' : ''}`}>
                  <span className="text-sm text-gray-900">{permission.label}</span>
                  <div className="flex items-center gap-2 text-green-600 text-sm font-medium">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Enabled
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileManagement;