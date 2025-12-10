// src/components/StudentContactAdmin.jsx
import React, { useState, useEffect } from "react";
import { FaUserCircle, FaPaperclip } from "react-icons/fa";
import api from "../services/api.js";

const StudentContactAdmin = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    studentId: "",
    email: "",
    subject: "", 
    priority: "Low",
    message: "",
  });

  const [attachments, setAttachments] = useState([]);
  const [studentIdNumeric, setStudentIdNumeric] = useState(null);
  const [loadingUser, setLoadingUser] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [history, setHistory] = useState([]);
  const [submitStatus, setSubmitStatus] = useState("");
  const [error, setError] = useState("");

  // 🔹 Load logged-in student info from /users/me
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoadingUser(true);
        setError("");
        const res = await api.get("/users/me"); // GET /api/v1/users/me
        const data = res.data;

        if (data?.user?.user_type?.toLowerCase() === "student" && data.details) {
          const d = data.details;
          setFormData((prev) => ({
            ...prev,
            firstName: d.first_name || "",
            lastName: d.last_name || "",
            studentId: d.student_id?.toString() || "",
            email: d.email || "",
          }));
          setStudentIdNumeric(d.student_id);
          // After we know student_id, fetch their message history
          fetchHistory(d.student_id);
        } else {
          setError("Logged-in user is not a student or missing details.");
        }
      } catch (err) {
        console.error("Error loading user:", err);
        setError("Failed to load user information.");
      } finally {
        setLoadingUser(false);
      }
    };

    const fetchHistory = async (studentId) => {
      if (!studentId) return;
      try {
        setLoadingHistory(true);
        const res = await api.get("/messages"); // GET /api/v1/messages
        const all = res.data || [];
        const mine = all.filter((m) => m.student_id === studentId);
        setHistory(mine);
      } catch (err) {
        console.error("Error loading messages:", err);
        // non-fatal, just no history
      } finally {
        setLoadingHistory(false);
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setSubmitStatus("");
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setAttachments([...attachments, ...files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus("");
    setError("");    

    

    if (!formData.subject) {
      console.log("2")
      setError("Please select a subject.");
      return;
    }

    
    try {
      // 🔹 Send message to backend
      const body = {
        student_id: JSON.parse(localStorage.getItem("currentUser")).id,
        subject: formData.subject,
        issue_description: formData.message,
        priority: formData.priority,
      };

      await api.post("/messages", body); // POST /api/v1/messages

      setSubmitStatus("Message sent successfully!");
      // Optionally refresh history
      try {
        const res = await api.get("/messages");
        const all = res.data || [];
        setHistory(all.filter((m) => m.student_id === studentIdNumeric));
      } catch (err) {
        console.error("Failed to refresh history:", err);
      }

      // You can keep form filled with details, just clear subject + message
      setFormData((prev) => ({
        ...prev,
        subject: "",
        message: "",
        priority: "Low",
      }));
      setAttachments([]);
    } catch (err) {
      console.error("Error submitting message:", err);
      setError("Failed to send message. Please try again.");
    }
  };

  const clearForm = () => {
    setFormData((prev) => ({
      ...prev,
      subject: "",
      priority: "Low",
      message: "",
    }));
    setAttachments([]);
    setSubmitStatus("");
    setError("");
  };

  return (
    <div className="p-4 sm:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 sm:gap-0">
        <div>
          <h1 className="text-3xl font-semibold">Contact Admin</h1>
          <p className="text-gray-500">
            Send a message to the system administrator
          </p>
          {loadingUser && (
            <p className="text-xs text-gray-400 mt-1">
              Loading your profile...
            </p>
          )}
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-500">
            Response time: 24–48 hours
          </span>
          <FaUserCircle className="text-4xl text-gray-400" />
        </div>
      </div>

      {error && (
        <p className="text-sm text-red-500 mb-4">
          {error}
        </p>
      )}
      {submitStatus && (
        <p className="text-sm text-green-600 mb-4">
          {submitStatus}
        </p>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Section - Message Form */}
        <div className="md:col-span-2 bg-white rounded-2xl p-6 shadow">
          <h2 className="font-semibold mb-4 text-lg">Send Message</h2>
          <form onSubmit={handleSubmit}>
            {/* Basic Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm mb-1">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="border rounded-lg p-2 w-full"
                  
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="border rounded-lg p-2 w-full"
                  
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm mb-1">Student ID</label>
                <input
                  type="text"
                  name="studentId"
                  value={formData.studentId}
                  onChange={handleChange}
                  className="border rounded-lg p-2 w-full"
                 
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="border rounded-lg p-2 w-full"
                  
                />
              </div>
            </div>

            {/* Subject & Priority */}
            <div className="mb-4">
              <label className="block text-sm mb-1">Subject</label>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="border rounded-lg p-2 w-full"
              >
                <option value="">Select a subject</option>
                <option>Course Registration</option>
                <option>Technical Support</option>
                <option>Payment Inquiry</option>
                <option>Other</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm mb-2">Priority Level</label>
              <div className="flex flex-col sm:flex-row gap-4">
                {["Low", "Medium", "High", "Urgent"].map((level) => (
                  <label key={level} className="flex items-center gap-1">
                    <input
                      type="radio"
                      name="priority"
                      value={level}
                      checked={formData.priority === level}
                      onChange={handleChange}
                    />
                    {level}
                  </label>
                ))}
              </div>
            </div>

            {/* Message */}
            <div className="mb-4">
              <label className="block text-sm mb-1">Message *</label>
              <textarea
                name="message"
                rows="5"
                placeholder="Please describe your issue or inquiry in detail..."
                value={formData.message}
                onChange={handleChange}
                className="border rounded-lg p-2 w-full"
              ></textarea>
              <p className="text-xs text-gray-500 mt-1">
                Minimum 10 characters required
              </p>
            </div>

            {/* Attachments – frontend only for now */}
            <div className="mb-4 border-2 border-dashed rounded-lg p-4 text-center">
              <input
                type="file"
                multiple
                onChange={handleFileUpload}
                className="hidden"
                id="fileInput"
              />
              <label
                htmlFor="fileInput"
                className="cursor-pointer text-gray-600 flex flex-col items-center"
              >
                <FaPaperclip className="text-2xl mb-2" />
                Drop files here or click to browse
                <p className="text-xs mt-1 text-gray-400">
                  Supported formats: PDF, DOC, DOCX, JPG, PNG (Max: 5MB)
                </p>
              </label>
              {attachments.length > 0 && (
                <ul className="mt-3 text-sm text-left">
                  {attachments.map((file, index) => (
                    <li key={index} className="text-gray-600">
                      • {file.name}
                    </li>
                  ))}
                </ul>
              )}
              <p className="text-xs text-gray-400 mt-2">
                (Attachments are not yet uploaded to the server – backend
                endpoint must support file uploads.)
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-purple-600  text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Send Message
              </button>
              <button
                type="button"
                className="border px-4 py-2 rounded-lg hover:bg-gray-100"
              >
                Save Draft
              </button>
              <button
                type="button"
                onClick={clearForm}
                className="border px-4 py-2 rounded-lg hover:bg-gray-100"
              >
                Clear Form
              </button>
            </div>
          </form>
        </div>

        {/* Right Section - Info + FAQs */}
        <div className="flex flex-col gap-6">
          {/* Contact Info */}
          <div className="bg-gradient-to-r from-blue-600 text-white to-purple-600 rounded-2xl p-4 shadow">
            <h3 className="font-semibold mb-3">Contact Information</h3>
            <p>
              <strong>Email:</strong> admin@bow.ca
            </p>
            <p>
              <strong>Phone:</strong> (403) 410-1400
            </p>
            <p>
              <strong>Office Hours:</strong> Mon–Fri: 8:00 AM – 5:00 PM
            </p>
            <p>
              <strong>Location:</strong> Student Services Office,
              <br />
              Room 101, Main Building
            </p>
          </div>

          {/* FAQs */}
          <div className="bg-white rounded-2xl p-4 shadow">
            <h3 className="font-semibold mb-3">Frequently Asked Questions</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li>
                <strong>How to register for courses?</strong>
                <br />
                Go to the Course Registration section and click “Add to Cart”.
              </li>
              <li>
                <strong>Can I drop a course after registration?</strong>
                <br />
                Yes, visit “My Courses” and select “Drop”.
              </li>
              <li>
                <strong>How do I reset my password?</strong>
                <br />
                Contact admin or use the “Forgot Password” link on login page.
              </li>
              <li>
                <strong>When are course fees due?</strong>
                <br />
                Fees are due before term start; check your student portal.
              </li>
            </ul>
          </div>

          {/* Message History */}
          <div className="bg-white rounded-2xl p-4 shadow">
            <h3 className="font-semibold mb-3">Message History</h3>
            {loadingHistory ? (
              <p className="text-sm text-gray-500">
                Loading your messages...
              </p>
            ) : history.length === 0 ? (
              <p className="text-sm text-gray-500">
                You have not submitted any messages yet.
              </p>
            ) : (
              <div className="space-y-3 text-sm">
                {history.slice(0, 3).map((msg) => (
                  <div key={msg.form_id} className="p-2 border rounded-lg">
                    <p className="font-semibold">{msg.subject}</p>
                    <p className="text-gray-500 text-xs">
                      {new Date(msg.submission_date).toLocaleString()}
                    </p>
                    <p>
                      Status:{" "}
                      <span
                        className={
                          msg.status === "Resolved"
                            ? "text-green-600"
                            : msg.status === "Pending"
                            ? "text-yellow-600"
                            : "text-gray-700"
                        }
                      >
                        {msg.status}
                      </span>
                    </p>
                  </div>
                ))}
                <button className="text-blue-600 hover:underline text-sm">
                  View All Messages →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentContactAdmin;
