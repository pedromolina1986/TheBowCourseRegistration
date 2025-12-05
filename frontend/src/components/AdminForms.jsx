import React, { useState, useMemo, useEffect } from "react";
import {
  Mail,
  Inbox,
  AlertTriangle,
  Clock,
  Filter,
  X,
  Search,
  Download,
  MoreVertical,
  Reply,
  Eye,
  CheckCircle,
  Archive,
} from "lucide-react";

import api from "../services/api";


const statsTemplate = [
  { label: "Total Forms", value: "0", icon: Mail, colors: "text-green-300" },
  { label: "New Forms", value: "0", icon: Inbox, colors: "text-blue-300" },
  { label: "Urgent", value: "0", icon: AlertTriangle, colors: "text-red-300" },
  { label: "Pending Response", value: "0", icon: Clock, colors: "text-yellow-300" },
];

function formatFullDate(dateStr) {
  if (!dateStr) return "-";
  try {
    const d = new Date(dateStr); 
    return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
  } catch {
    return "-";
  }
}

function timeAgoFromDateOnly(dateStr) {
  if (!dateStr) return "-";
  try {
    const then = new Date(dateStr);
    const now = new Date();
    const diffMs = now - then;
    const diffSec = Math.floor(diffMs / 1000);
    if (diffSec < 60) return `${diffSec} second${diffSec !== 1 ? "s" : ""} ago`;
    const diffMin = Math.floor(diffSec / 60);
    if (diffMin < 60) return `${diffMin} minute${diffMin !== 1 ? "s" : ""} ago`;
    const diffHr = Math.floor(diffMin / 60);
    if (diffHr < 24) return `${diffHr} hour${diffHr !== 1 ? "s" : ""} ago`;
    const diffDay = Math.floor(diffHr / 24);
    return `${diffDay} day${diffDay !== 1 ? "s" : ""} ago`;
  } catch {
    return "-";
  }
}

const SubmittedForms = () => {
  // filters & search states
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [dateFilter, setDateFilter] = useState("All Time");
  const [searchQuery, setSearchQuery] = useState("");

  // data states
  const [forms, setForms] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    let mounted = true;
    const fetchMessages = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await api.get("/messages");
        const data = Array.isArray(res.data) ? res.data : [];

        const mapped = data.map((msg) => {

            console.log("submission_date from backend:", msg.submission_date);

          // Student name
          const first = msg.student_first_name ?? "-";
          const last = msg.student_last_name ?? "-";
          const studentName = (first === "-" && last === "-") ? "-" : `${first} ${last}`.trim();


          // IDs & program
          const studentId = msg.student_id ? String(msg.student_id) : "-";
          const program = msg.program ?? "-";

          // Subject & message
          const subject = msg.subject ?? "-";
          const message = msg.issue_description ?? "-";

          // Status & category
          const status = msg.status ?? "-";
          const category = msg.priority ?? "-";

          // Dates (submission_date is date-only)
          const submission_date = msg.submission_date ?? null;
          const date = submission_date ? timeAgoFromDateOnly(submission_date) : "-";
          const fullDate = submission_date ? formatFullDate(submission_date) : "-";

          // Admin response
          const hasResponse = Boolean(msg.admin_response);
          const adminResponse = hasResponse
            ? {
                message: msg.admin_response ?? "-",
                date: msg.response_date ? formatFullDate(msg.response_date) : "-",
              }
            : null;

          return {
            studentName,
            studentId,
            program,
            subject,
            message,
            status,
            category,
            date,
            fullDate,
            hasResponse,
            adminResponse,
          };
        });

        if (mounted) {
          setForms(mapped);
          setFilteredData(mapped);
        }
      } catch (err) {
        console.error("Failed to load messages:", err);
        if (mounted) {
          setError("Failed to load messages.");
          setForms([]); 
          setFilteredData([]);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchMessages();

    return () => {
      mounted = false;
    };
  }, []);

  // compute stats from live forms
  const computedStats = useMemo(() => {
    const total = forms.length;
    const newForms = forms.filter((f) => (f.status ?? "").toLowerCase() === "new").length;
    const urgent = forms.filter((f) => (f.status ?? "").toLowerCase() === "urgent").length;
    const pendingResponse = forms.filter((f) => {
      const s = (f.status ?? "").toLowerCase();
      return s === "pending" || !f.hasResponse;
    }).length;

    return [
      { ...statsTemplate[0], value: String(total) },
      { ...statsTemplate[1], value: String(newForms) },
      { ...statsTemplate[2], value: String(urgent) },
      { ...statsTemplate[3], value: String(pendingResponse) },
    ];
  }, [forms]);

  // Apply filters (status, category, search, date range)
  const applyFilters = () => {
    const q = (searchQuery ?? "").toLowerCase().trim();
    const base = forms ?? [];

    const filtered = base.filter((form) => {
      const matchesStatus =
        statusFilter === "All Status" || (form.status ?? "") === statusFilter;

      const matchesCategory =
        categoryFilter === "All Categories" || (form.category ?? "") === categoryFilter;

      const matchesSearch =
        q === "" ||
        (form.studentName ?? "").toLowerCase().includes(q) ||
        (form.subject ?? "").toLowerCase().includes(q) ||
        (form.message ?? "").toLowerCase().includes(q);

      // Date filter basic handling (All Time / Today / Last 7 days / Last 30 days)
      let matchesDate = true;
      if (dateFilter && dateFilter !== "All Time" && form.submission_date) {
        try {
          const submission = new Date(form.submission_date + "T00:00:00"); // use backend date
          const now = new Date();
          if (dateFilter === "Today") {
            matchesDate = submission.toDateString() === now.toDateString();
          } else if (dateFilter === "Last 7 days") {
            matchesDate = (now - submission) / (1000 * 60 * 60 * 24) <= 7;
          } else if (dateFilter === "Last 30 days") {
            matchesDate = (now - submission) / (1000 * 60 * 60 * 24) <= 30;
          }
        } catch {
          matchesDate = true;
        }
      }

      return matchesStatus && matchesCategory && matchesSearch && matchesDate;
    });

    setFilteredData(filtered);
  };

  const clearFilters = () => {
    setStatusFilter("All Status");
    setCategoryFilter("All Categories");
    setDateFilter("All Time");
    setSearchQuery("");
    setFilteredData(forms);
  };

  return (
    <div className="p-4 sm:p-8">
      {/* Filters Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option>All Status</option>
              <option>New</option>
              <option>Pending</option>
              <option>Urgent</option>
              <option>Responded</option>
              <option>Resolved</option>
            </select>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Category
            </label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option>All Categories</option>
              <option>Payment Issues</option>
              <option>Course Inquiry</option>
              <option>Schedule Conflicts</option>
              <option>Registration Help</option>
              <option>Technical Support</option>
            </select>
          </div>

          {/* Date Range Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date Range
            </label>
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option>All Time</option>
              <option>Today</option>
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Custom Range</option>
            </select>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={applyFilters}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2.5 rounded-lg flex items-center gap-2 hover:bg-gray-800 transition-colors"
          >
            <Filter size={18} />
            <span className="font-medium">Apply Filters</span>
          </button>
          <button
            onClick={clearFilters}
            className="text-gray-700 px-4 py-2.5 border border-gray-200 flex items-center gap-2 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <X size={18} />
            <span className="font-medium">Clear</span>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="flex-1 relative w-full">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search forms by student name, subject, or content..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={applyFilters}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-gray-800 transition-colors"
          >
            Search
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-6">
        {computedStats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-start justify-between mb-3">
                <p className="text-sm text-gray-600">{stat.label}</p>
                <Icon size={20} className={stat.colors} />
              </div>
              <p className="text-3xl font-semibold text-gray-900">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Filtered Results */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <h3 className="text-lg font-semibold text-gray-900">
            Student Form Submissions
          </h3>
          <span className="text-sm text-gray-600">
            Showing {filteredData.length} result
            {filteredData.length !== 1 && "s"}
          </span>
        </div>

        <div className="divide-y divide-gray-200">
          {filteredData.map((form, idx) => (
            <div key={idx} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                {/* Avatar */}
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-lg font-bold uppercase">
                    {form.studentName && form.studentName !== "-"
                      ? form.studentName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                      : "-"}
                  </span>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-2 gap-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-semibold text-gray-900">
                        {form.studentName}
                      </h4>
                      <span
                        className={`px-2.5 py-0.5 rounded text-xs font-medium ${
                          form.status === "Urgent"
                            ? "bg-red-100 text-red-700"
                            : form.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : form.status === "New"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {form.status}
                      </span>
                      <span className="px-2.5 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700">
                        {form.category}
                      </span>
                    </div>
                    <div className="text-right text-sm text-gray-500">
                      <p>{form.date}</p>
                      <p className="text-xs">{form.fullDate}</p>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600">
                    Student ID: {form.studentId} • {form.program}
                  </p>
                  <p className="text-sm font-medium text-gray-900 mt-1">
                    Subject: {form.subject}
                  </p>

                  <p className="text-sm text-gray-700 mt-2 leading-relaxed">
                    {form.message}
                  </p>

                  {form.hasResponse && form.adminResponse && (
                    <div className="bg-gray-50 rounded-lg p-4 mt-4 border-l-4 border-gray-900">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 bg-gray-900 text-white rounded-full flex items-center justify-center text-xs font-bold">
                          BC
                        </div>
                        <span className="text-sm font-medium text-gray-900">
                          Admin Response
                        </span>
                        <span className="text-xs text-gray-500">
                          • {form.adminResponse.date}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 pl-8">
                        {form.adminResponse.message}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {filteredData.length === 0 && (
            <div className="text-center py-10 text-gray-500">
              {loading ? "Loading..." : error ?? "No forms match your filters or search."}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubmittedForms;
