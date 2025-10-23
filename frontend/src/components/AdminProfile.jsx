import React, { useState, useCallback } from 'react';
import { Edit, Key, Bell, Download, Shield, X, Save, Eye, EyeOff } from 'lucide-react';

const InfoField = ({ label, value }) => (
  <div>
    <label className="block text-sm text-gray-600 mb-2">{label}</label>
    <div className="bg-gray-50 rounded px-4 py-3 text-gray-900">{value}</div>
  </div>
);

const EditField = ({ label, field, value, onChange }) => (
  <div>
    <label className="block text-sm text-gray-600 mb-2">{label}</label>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(field, e.target.value)}
      className="w-full bg-white border border-gray-300 rounded px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
    />
  </div>
);

const ProfileManagement = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@bowcollege.ca',
    phone: '(403) 555-0123',
    employeeId: 'EMP-2024-001',
    department: 'Software Development',
    role: 'System Administrator',
    startDate: 'January 15, 2020',
    street: '123 Main Street',
    city: 'Calgary',
    province: 'Alberta',
    postalCode: 'T2P 1J9'
  });

  const [editData, setEditData] = useState({...profileData});

  const accountInfo = [
    { label: 'Account Status', value: 'Active', isStatus: true },
    { label: 'Last Login', value: 'Today, 9:15 AM' },
    { label: 'Password Updated', value: 'Dec 15, 2024' },
    { label: 'Profile Updated', value: 'Nov 28, 2024' }
  ];

  const quickActions = [
    { label: 'Change Password', icon: Key, action: 'password' },    
  ];

  const permissions = [
    { label: 'Course Management', enabled: true },
    { label: 'Student Management', enabled: true },
    { label: 'System Administration', enabled: true },
    { label: 'Reports Access', enabled: true }
  ];

  const handleEdit = useCallback(() => {
    setEditData({...profileData});
    setIsEditing(true);
  }, [profileData]);

  const handleCancel = useCallback(() => {
    setEditData({...profileData});
    setIsEditing(false);
  }, [profileData]);

  const handleSave = useCallback(() => {
    setProfileData({...editData});
    setIsEditing(false);
  }, [editData]);

  const handleChange = useCallback((field, value) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  const handleQuickAction = useCallback((action) => {
    if (action === 'password') {
      setShowPasswordModal(true);
      setPasswordError('');
      setPasswordSuccess(false);
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    }
  }, []);

  const handlePasswordChange = useCallback((field, value) => {
    setPasswordData(prev => ({
      ...prev,
      [field]: value
    }));
    setPasswordError('');
  }, []);

  const handlePasswordSubmit = useCallback(() => {
    // Validation
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      setPasswordError('All fields are required');
      return;
    }

    if (passwordData.newPassword.length < 8) {
      setPasswordError('New password must be at least 8 characters long');
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError('New password and confirmation do not match');
      return;
    }

    // Simulate password change
    setPasswordSuccess(true);
    setTimeout(() => {
      setShowPasswordModal(false);
      setPasswordSuccess(false);
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    }, 2000);
  }, [passwordData]);

  const handlePasswordModalClose = useCallback(() => {
    setShowPasswordModal(false);
    setPasswordError('');
    setPasswordSuccess(false);
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  }, []);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">            
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
                  <h3 className="text-2xl font-semibold text-gray-900">
                    {profileData.firstName} {profileData.lastName}
                  </h3>
                  <p className="text-gray-600 mb-2">{profileData.role}</p>
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
              {!isEditing ? (
                <button 
                  onClick={handleEdit}
                  className="bg-gray-900 text-white px-4 py-2.5 rounded-lg flex items-center gap-2 hover:bg-gray-800 transition-colors"
                >
                  <Edit size={16} />
                  <span className="text-sm font-medium">Edit Profile</span>
                </button>
              ) : (
                <div className="flex gap-2">
                  <button 
                    onClick={handleCancel}
                    className="bg-white text-gray-700 px-4 py-2.5 rounded-lg flex items-center gap-2 hover:bg-gray-100 transition-colors border border-gray-300"
                  >
                    <X size={16} />
                    <span className="text-sm font-medium">Cancel</span>
                  </button>
                  <button 
                    onClick={handleSave}
                    className="bg-gray-900 text-white px-4 py-2.5 rounded-lg flex items-center gap-2 hover:bg-gray-800 transition-colors"
                  >
                    <Save size={16} />
                    <span className="text-sm font-medium">Save Changes</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Profile Information */}
          <div className="p-6">
            <div className="grid grid-cols-2 gap-4 mb-6">
              {isEditing ? (
                <>
                  <EditField key="firstName" label="First Name" field="firstName" value={editData.firstName} onChange={handleChange} />
                  <EditField key="lastName" label="Last Name" field="lastName" value={editData.lastName} onChange={handleChange} />
                  <EditField key="email" label="Email Address" field="email" value={editData.email} onChange={handleChange} />
                  <EditField key="phone" label="Phone Number" field="phone" value={editData.phone} onChange={handleChange} />
                  <InfoField key="employeeId" label="Employee ID" value={profileData.employeeId} />
                  <EditField key="department" label="Department" field="department" value={editData.department} onChange={handleChange} />
                  <EditField key="role" label="Role" field="role" value={editData.role} onChange={handleChange} />
                  <InfoField key="startDate" label="Start Date" value={profileData.startDate} />
                </>
              ) : (
                <>
                  <InfoField key="firstName-view" label="First Name" value={profileData.firstName} />
                  <InfoField key="lastName-view" label="Last Name" value={profileData.lastName} />
                  <InfoField key="email-view" label="Email Address" value={profileData.email} />
                  <InfoField key="phone-view" label="Phone Number" value={profileData.phone} />
                  <InfoField key="employeeId-view" label="Employee ID" value={profileData.employeeId} />
                  <InfoField key="department-view" label="Department" value={profileData.department} />
                  <InfoField key="role-view" label="Role" value={profileData.role} />
                  <InfoField key="startDate-view" label="Start Date" value={profileData.startDate} />
                </>
              )}
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Address Information</h4>
              <div className="grid grid-cols-2 gap-4">
                {isEditing ? (
                  <>
                    <EditField key="street" label="Street Address" field="street" value={editData.street} onChange={handleChange} />
                    <EditField key="city" label="City" field="city" value={editData.city} onChange={handleChange} />
                    <EditField key="province" label="Province" field="province" value={editData.province} onChange={handleChange} />
                    <EditField key="postalCode" label="Postal Code" field="postalCode" value={editData.postalCode} onChange={handleChange} />
                  </>
                ) : (
                  <>
                    <InfoField key="street-view" label="Street Address" value={profileData.street} />
                    <InfoField key="city-view" label="City" value={profileData.city} />
                    <InfoField key="province-view" label="Province" value={profileData.province} />
                    <InfoField key="postalCode-view" label="Postal Code" value={profileData.postalCode} />
                  </>
                )}
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
                    onClick={() => handleQuickAction(action.action)}
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

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">Change Password</h3>
                <button
                  onClick={handlePasswordModalClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            <div className="p-6">
              {passwordSuccess ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                  <div className="flex items-center gap-2 text-green-800">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-medium">Password changed successfully!</span>
                  </div>
                </div>
              ) : (
                <>
                  {passwordError && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                      <p className="text-sm text-red-800">{passwordError}</p>
                    </div>
                  )}

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Current Password
                      </label>
                      <div className="relative">
                        <input
                          type={showCurrentPassword ? 'text' : 'password'}
                          value={passwordData.currentPassword}
                          onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                          className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 pr-12 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                          placeholder="Enter current password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showCurrentPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        New Password
                      </label>
                      <div className="relative">
                        <input
                          type={showNewPassword ? 'text' : 'password'}
                          value={passwordData.newPassword}
                          onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                          className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 pr-12 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                          placeholder="Enter new password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Must be at least 8 characters</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Confirm New Password
                      </label>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          value={passwordData.confirmPassword}
                          onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                          className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 pr-12 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                          placeholder="Confirm new password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {!passwordSuccess && (
              <div className="p-6 border-t border-gray-200 flex gap-3">
                <button
                  onClick={handlePasswordModalClose}
                  className="flex-1 bg-white text-gray-700 px-4 py-2.5 rounded-lg font-medium hover:bg-gray-100 transition-colors border border-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePasswordSubmit}
                  className="flex-1 bg-gray-900 text-white px-4 py-2.5 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                >
                  Change Password
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileManagement;