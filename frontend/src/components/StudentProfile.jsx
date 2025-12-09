import React, { useState, useEffect } from "react";
import { FaUserCircle, FaCheckCircle } from "react-icons/fa";
import api from "../services/api.js";

const StudentProfile = () => {
  const [profile, setProfile] = useState({
    user_name: "",
    user_type: "student",

    first_name: "",
    last_name: "",
    email: "",

    phone: "",
    street: "",
    city: "",
    province: "",
    postal_code: "",

    student_id: "",
    program: "",
    year_level: "",
    start_date: "",

    photo: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch logged-in student's profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("users/me");
        console.log("GET /users/me:", res.data);

        const { user, details } = res.data;

        setProfile((prev) => ({
          ...prev,
          user_name: user?.user_name || "",
          user_type: user?.user_type || "student",

          first_name: details?.first_name || "",
          last_name: details?.last_name || "",
          email: details?.email || "",

          phone: details?.phone || "",
          street: details?.street || "",
          city: details?.city || "",
          province: details?.province || "",
          postal_code: details?.postal_code || "",

          student_id: details?.student_id?.toString() || "",
          program: details?.program || "",
          year_level: details?.year_level?.toString() || "",
          start_date: details?.start_date
            ? String(details.start_date).split("T")[0]
            : "",

          // photo could be loaded later from backend 
        }));

        setError("");
      } catch (err) {
        console.error("Error loading profile:", err);
        setError("Unable to load your profile. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
  try {
    const toNull = (v) => (v === "" ? null : v);

    const cleanYear =
      profile.year_level !== "" && profile.year_level !== null
        ? Number(profile.year_level)
        : null;

    const payload = {
      user_name: profile.user_name,
      first_name: profile.first_name,
      last_name: profile.last_name,
      email: profile.email,
      program: toNull(profile.program),
      year_level: cleanYear,
      phone: toNull(profile.phone),
      street: toNull(profile.street),
      city: toNull(profile.city),
      province: toNull(profile.province),
      postal_code: toNull(profile.postal_code),
      start_date: toNull(profile.start_date), // "" -> null
    };

    console.log("PATCH /users/me with:", payload);
    const res = await api.patch("users/me", payload);
    console.log("PATCH /users/me response:", res.data);

    alert("Profile updated successfully!");
  } catch (err) {
    console.error("❌ Update failed:", err.response?.data || err);
    alert(
      err.response?.data?.detail ||
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Error updating profile. Please try again."
    );
  }
};


  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfile((prev) => ({ ...prev, photo: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  if (loading) {
    return <div className="p-6">Loading your profile...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-purple-50 p-6 sm:p-10 text-gray-800">
      {/* Header */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          My Profile
        </h1>
        <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-full shadow">
          {profile.photo ? (
            <img
              src={profile.photo}
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <FaUserCircle className="w-10 h-10 text-gray-500" />
          )}
          <div>
            <p className="font-semibold">
              {profile.first_name || "Student"} {profile.last_name || ""}
            </p>
            <p className="text-sm text-gray-500">{profile.user_type}</p>
          </div>
        </div>
      </header>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-700 text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT: Main profile info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Info */}
          <section className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                ["first_name", "First Name"],
                ["last_name", "Last Name"],
                ["email", "Email"],
                ["phone", "Phone"],
                ["street", "Street"],
                ["city", "City"],
                ["province", "Province"],
                ["postal_code", "Postal Code"],
              ].map(([key, label]) => (
                <div key={key}>
                  <label className="text-sm text-gray-600">{label}</label>
                  <input
                    name={key}
                    value={profile[key] || ""}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-2 mt-1 focus:ring focus:ring-blue-200"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Academic Info */}
          <section className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-lg font-semibold mb-4">
              Academic Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Student ID - read-only */}
              <div>
                <label className="text-sm text-gray-600">Student ID</label>
                <input
                  name="student_id"
                  value={profile.student_id}
                  readOnly
                  className="w-full border rounded-lg p-2 mt-1 bg-gray-100 cursor-not-allowed"
                />
              </div>

              {/* Department (Program) */}
              <div>
                <label className="text-sm text-gray-600">Department</label>
                <input
                  name="program"
                  value={profile.program || ""}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2 mt-1 focus:ring focus:ring-blue-200"
                />
              </div>

              {/* Year Level */}
              <div>
                <label className="text-sm text-gray-600">Year Level</label>
                <input
                  name="year_level"
                  value={profile.year_level || ""}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2 mt-1 focus:ring focus:ring-blue-200"
                />
              </div>

              {/* Start Date */}
              <div>
                <label className="text-sm text-gray-600">Start Date</label>
                <input
                  type="date"
                  name="start_date"
                  value={profile.start_date || ""}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2 mt-1 focus:ring focus:ring-blue-200"
                />
              </div>
            </div>
          </section>

          <div className="mt-4 text-right">
            <button
              onClick={handleSave}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg text-sm hover:opacity-90 transition"
            >
              Save Changes
            </button>
          </div>
        </div>

        {/* RIGHT: Photo + stats */}
        <div className="space-y-6">
          {/* Photo */}
          <section className="bg-white p-6 rounded-2xl shadow text-center">
            {profile.photo ? (
              <img
                src={profile.photo}
                alt="Profile"
                className="w-24 h-24 mx-auto rounded-full object-cover mb-3"
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

          {/* Quick Stats (static for now) */}
          <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-2xl shadow">
            <h2 className="text-lg font-semibold mb-3">Quick Stats</h2>
            <ul className="text-sm space-y-2">
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

          {/* Account Status (static) */}
          <section className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-lg font-semibold mb-3">Account Status</h2>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <FaCheckCircle className="text-blue-600" />
                <span>Account Verified</span>
              </li>
              <li className="flex items-center gap-2">
                <FaCheckCircle className="text-blue-600" />
                <span>Email Confirmed</span>
              </li>
              <li className="flex items-center gap-2">
                <FaCheckCircle className="text-blue-600" />
                <span>Enrollment Active</span>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
