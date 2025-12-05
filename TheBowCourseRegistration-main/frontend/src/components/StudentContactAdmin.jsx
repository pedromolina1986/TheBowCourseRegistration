import React, { useState } from "react";
import { FaUserCircle, FaPaperclip } from "react-icons/fa";

const StudentContactAdmin = () => {
  const [formData, setFormData] = useState({
    firstName: "John",
    lastName: "Smith",
    studentId: "SD2025001",
    email: "john.smith@student.bow.ca",
    subject: "",
    priority: "Low",
    message: "",
  });

  const [attachments, setAttachments] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setAttachments([...attachments, ...files]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent successfully!");
    console.log(formData, attachments);
  };

  const clearForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      studentId: "",
      email: "",
      subject: "",
      priority: "Low",
      message: "",
    });
    setAttachments([]);
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
      </div>
      <div className="flex items-center space-x-4">
        <span className="text-sm text-gray-500">Response time: 24–48 hours</span>
        <FaUserCircle className="text-4xl text-gray-400" />
      </div>
    </div>

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

          {/* Attachments */}
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
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-purple-600  text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              Send Message
            >
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
          <div className="space-y-3 text-sm">
            <div className="p-2 border rounded-lg">
              <p className="font-semibold">Course Registration Issue</p>
              <p className="text-gray-500 text-xs">Jan 18, 2025</p>
              <p>
                Status: <span className="text-yellow-600">Resolved</span>
              </p>
            </div>
            <div className="p-2 border rounded-lg">
              <p className="font-semibold">Technical Support</p>
              <p className="text-gray-500 text-xs">Jan 10, 2025</p>
              <p>
                Status: <span className="text-green-600">Resolved</span>
              </p>
            </div>
            <button className="text-blue-600 hover:underline text-sm">
              View All Messages →
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default StudentContactAdmin;
