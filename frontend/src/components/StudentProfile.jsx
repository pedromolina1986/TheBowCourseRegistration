import React, { useState, useEffect } from "react";
import { FaUserCircle, FaCheckCircle } from "react-icons/fa";

const ProfilePage = () => {
  const defaultProfile = {
    firstName: "John",
    lastName: "Smith",
    email: "john.smith@bowcollege.ca",
    phone: "(403) 555-0123",
    StudentId: "STD-2024-001",
    department: "Software Development",
    role: "Student",
    startDate: "January 15, 2020",
    street: "123 Main Street",
    city: "Calgary",
    province: "Alberta",
    postalCode: "T2P 1J9",
    profilePhoto: "",
  };

  const storedProfile =
    JSON.parse(localStorage.getItem("profileData")) || defaultProfile;
  const [profileData, setProfileData] = useState(storedProfile);

  useEffect(() => {
    localStorage.setItem("profileData", JSON.stringify(profileData));
  }, [profileData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    localStorage.setItem("profileData", JSON.stringify(profileData));
    alert("Profile updated successfully!");
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileData((prev) => ({ ...prev, profilePhoto: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Check if profile is complete (no empty required fields)
  const isProfileComplete = () => {
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "StudentId",
      "department",
      "startDate",
      "street",
      "city",
      "province",
      "postalCode",
    ];
    return requiredFields.every((field) => profileData[field]?.trim() !== "");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col p-4 sm:p-6 lg:p-10 text-gray-800">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
        <h1 className="text-xl sm:text-2xl font-bold">My Profile</h1>
        <div className="flex items-center space-x-3">
          {profileData.profilePhoto ? (
            <img
              src={profileData.profilePhoto}
              alt="profile"
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <FaUserCircle className="text-2xl text-gray-600" />
          )}
          <div>
            <p className="font-semibold">
              {profileData.firstName} {profileData.lastName}
            </p>
            <p className="text-sm text-gray-500">{profileData.role}</p>
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Info */}
          <section className="bg-white p-4 sm:p-6 rounded-2xl shadow">
            <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "firstName",
                "lastName",
                "email",
                "phone",
                "street",
                "city",
                "province",
                "postalCode",
              ].map((key) => (
                <div key={key}>
                  <label className="text-sm text-gray-600 capitalize">
                    {key.replace(/([A-Z])/g, " $1")}
                  </label>
                  <input
                    name={key}
                    value={profileData[key]}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-2 focus:ring focus:ring-green-200"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Academic Info */}
          <section className="bg-white p-4 sm:p-6 rounded-2xl shadow">
            <h2 className="text-lg font-semibold mb-4">Academic Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {["StudentId", "department", "startDate"].map((key) => (
                <div key={key}>
                  <label className="text-sm text-gray-600 capitalize">
                    {key.replace(/([A-Z])/g, " $1")}
                  </label>
                  <input
                    name={key}
                    value={profileData[key]}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-2 focus:ring focus:ring-green-200"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Save Button */}
          <div className="mt-4 sm:mt-6 text-right">
            <button
              onClick={handleSave}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg text-sm transition"
            >
              Save Changes
            </button>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Profile Photo */}
          <section className="bg-white p-4 sm:p-6 rounded-2xl shadow text-center">
            {profileData.profilePhoto ? (
              <img
                src={profileData.profilePhoto}
                alt="profile"
                className="w-24 h-24 mx-auto rounded-full mb-3 object-cover"
              />
            ) : (
              <FaUserCircle className="text-6xl text-gray-400 mx-auto mb-3" />
            )}
            <label className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg text-sm cursor-pointer transition">
              Upload New Photo
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoChange}
              />
            </label>
          </section>

          {/* Quick Stats */}
          <section className="bg-white p-4 sm:p-6 rounded-2xl shadow">
            <h2 className="text-lg font-semibold mb-3">Quick Stats</h2>
            <ul className="text-sm space-y-1">
              <li>
                Registered Courses: <strong>4</strong>
              </li>
              <li>
                Completed Courses: <strong>8</strong>
              </li>
              <li>
                Credits Earned: <strong>24</strong>
              </li>
              <li>
                GPA: <strong>3.7</strong>
              </li>
            </ul>
          </section>

          {/* Account Status */}
          <section className="bg-white p-4 sm:p-6 rounded-2xl shadow">
            <h2 className="text-lg font-semibold mb-3">Account Status</h2>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center space-x-2">
                <FaCheckCircle className="text-green-500" />{" "}
                <span>Account Verified</span>
              </li>
              <li className="flex items-center space-x-2">
                <FaCheckCircle className="text-green-500" />{" "}
                <span>Email Confirmed</span>
              </li>
              <li className="flex items-center space-x-2">
                <FaCheckCircle className="text-green-500" />{" "}
                <span>Enrollment Active</span>
              </li>
              <li className="flex items-center space-x-2">
                {isProfileComplete() ? (
                  <FaCheckCircle className="text-green-500" />
                ) : (
                  <FaCheckCircle className="text-yellow-500" />
                )}
                <span>
                  {isProfileComplete()
                    ? "Profile Completed"
                    : "Profile Incomplete"}
                </span>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
