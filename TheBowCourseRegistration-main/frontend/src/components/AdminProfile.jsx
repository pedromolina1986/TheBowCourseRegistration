import React, { useState, useEffect, useCallback } from "react";
import {
  Edit,
  Key,
  Shield,
  X,
  Save,
} from "lucide-react";
import api from "../services/api.js";

const InfoField = ({ label, value }) => (
  <div>
    <label className="block text-sm text-gray-600 mb-2">{label}</label>
    <div className="bg-gray-50 rounded px-4 py-3 text-gray-900">{value || "-"}</div>
  </div>
);

const EditField = ({ label, field, value, onChange }) => (
  <div>
    <label className="block text-sm text-gray-600 mb-2">{label}</label>
    <input
      type="text"
      value={value || ""}
      onChange={(e) => onChange(field, e.target.value)}
      className="w-full bg-white border border-gray-300 rounded px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
    />
  </div>
);

const ProfileManagement = () => {
  const [profileData, setProfileData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    department_id: "",
    street: "",
    city: "",
    province: "",
    postal_code: "",
    role: "",
    employee_id: "",
    start_date: "",
  });
  const [editData, setEditData] = useState({ ...profileData });
  const [isEditing, setIsEditing] = useState(false);

  // Fetch profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/users/me");
        if (res.data.details) {
          setProfileData(res.data.details);
          setEditData(res.data.details);
        }
      } catch (err) {
        console.error("Fetch profile failed:", err);
      }
    };
    fetchProfile();
  }, []);

  // Handle editing
  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => {
    setEditData({ ...profileData });
    setIsEditing(false);
  };
  const handleChange = (field, value) => setEditData(prev => ({ ...prev, [field]: value }));

  // Save profile via PATCH
  const handleSave = async () => {
    try {
      const { first_name, last_name, email, phone_number, department_id, role, employee_id, start_date } = editData;

      const payload = {
        first_name,
        last_name,
        email,
        phone_number,
        department_id
      };

      const res = await api.patch("/users/me", payload);
      setProfileData(editData);
      setIsEditing(false);
    } catch (err) {
      console.error("Save profile failed:", err);
    }
  };



  return (
    <div className="p-4 sm:p-6 md:p-8 bg-gradient-to-br from-blue-100 to-purple-100 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Profile */}
        <div className="md:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-4 sm:p-6 border-b border-gray-200 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center shrink-0">
                <span className="text-3xl font-bold text-gray-400">
                  {profileData.first_name?.[0] || "A"}
                  {profileData.last_name?.[0] || ""}
                </span>
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">
                  {profileData.first_name} {profileData.last_name}
                </h3>
                <p className="text-gray-600 mb-2">{profileData.role || "Administrator"}</p>
                <div className="flex items-center flex-wrap gap-3 text-sm">
                  <span className="flex items-center gap-1 text-gray-600">
                    <Shield size={16} />
                    Administrator
                  </span>
                  <span className="flex items-center gap-1 text-green-600">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    Active
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {!isEditing ? (
                <button
                  onClick={handleEdit}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2.5 rounded-lg flex items-center gap-2 hover:bg-gray-800 transition-colors w-full sm:w-auto justify-center"
                >
                  <Edit size={16} /> Edit Profile
                </button>
              ) : (
                <>
                  <button
                    onClick={handleCancel}
                    className="bg-white text-gray-700 px-4 py-2.5 rounded-lg flex items-center gap-2 hover:bg-gray-100 border border-gray-300 w-full sm:w-auto justify-center"
                  >
                    <X size={16} /> Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2.5 rounded-lg flex items-center gap-2 hover:bg-gray-800 w-full sm:w-auto justify-center"
                  >
                    <Save size={16} /> Save
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Profile Info */}
          <div className="p-4 sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {isEditing ? (
                <>
                  <EditField label="First Name" field="first_name" value={editData.first_name} onChange={handleChange} />
                  <EditField label="Last Name" field="last_name" value={editData.last_name} onChange={handleChange} />
                  <EditField label="Email" field="email" value={editData.email} onChange={handleChange} />
                  <EditField label="Phone Number" field="phone_number" value={editData.phone_number} onChange={handleChange} />
                  <EditField label="Department" field="department_id" value={editData.department_id} onChange={handleChange} />
                  <EditField label="Role" field="role" value={editData.role} onChange={handleChange} />
                  <EditField label="Employee ID" field="employee_id" value={editData.admin_id} onChange={handleChange} />
                  <EditField label="Start Date" field="start_date" value={editData.start_date} onChange={handleChange} />
                </>
              ) : (
                <>
                  <InfoField label="First Name" value={profileData.first_name} />
                  <InfoField label="Last Name" value={profileData.last_name} />
                  <InfoField label="Email" value={profileData.email} />
                  <InfoField label="Phone" value={profileData.phone_number} />
                  <InfoField label="Department" value={profileData.department_id} />
                  <InfoField label="Role" value={profileData.role} />
                  <InfoField label="Employee ID" value={profileData.admin_id} />
                  <InfoField label="Start Date" value={profileData.start_date} />
                </>
              )}
            </div>

            {/* Address */}
            <div className="border-t border-gray-200 pt-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Address Information</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {isEditing ? (
                  <>
                    <EditField label="Street" field="street" value={editData.street} onChange={handleChange} />
                    <EditField label="City" field="city" value={editData.city} onChange={handleChange} />
                    <EditField label="Province" field="province" value={editData.province} onChange={handleChange} />
                    <EditField label="Postal Code" field="postal_code" value={editData.postal_code} onChange={handleChange} />
                  </>
                ) : (
                  <>
                    <InfoField label="Street" value={profileData.street} />
                    <InfoField label="City" value={profileData.city} />
                    <InfoField label="Province" value={profileData.province} />
                    <InfoField label="Postal Code" value={profileData.postal_code} />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-4 sm:p-6 border-b">
              <h3 className="text-lg font-semibold text-gray-900">Account Information</h3>
            </div>
            <div className="p-4 sm:p-6">
              <InfoField label="Account Status" value="Active" />
              <InfoField label="Last Login" value={profileData.last_login ? new Date(profileData.last_login).toLocaleString() : "-"} />
              <InfoField label="Password Updated" value="-" />
              <InfoField label="Profile Updated" value={profileData.profile_updated ? new Date(profileData.profile_updated).toLocaleString() : "-"} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileManagement;
