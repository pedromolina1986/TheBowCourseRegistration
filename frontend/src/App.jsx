import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import Courses from "./pages/courses";
import Dashboard from "./pages/dashboard";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import DashboardAdmin from "./pages/DashboardAdmin";
import Programs from "./pages/programs";
import TermSelection from "./components/TermSelection";
import CourseRegistration from "./components/CourseRegistration";
import MyCourses from "./components/MyCourses";
import AdminProfile from "./components/AdminProfile.jsx";
import SearchCourses from "./components/AdminCourses.jsx";
import RegisteredStudents from "./components/AdminStudents.jsx";
import SubmittedForms from "./components/AdminForms.jsx";
import AdminCourseForm from "./components/AdminCourseForm.jsx";

function App() {
  // Load Tailwind CSS
  const style = document.createElement("link");
  style.rel = "stylesheet";
  style.href =
    "https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css";
  document.head.appendChild(style);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/programs" element={<Programs />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<DashboardAdmin />} />
          <Route path="profile" element={<AdminProfile />} />
          <Route path="courses" element={<SearchCourses />} />                                
          <Route path="courseForm" element={<AdminCourseForm />} />
          <Route path="students" element={<RegisteredStudents />} />
          <Route path="my-courses" element={<MyCourses />} />
          <Route path="forms" element={<SubmittedForms />} />
          <Route
            path="create"
            element={<div className="p-6">Create Courses Page</div>}
          />
          <Route
            path="edit"
            element={<div className="p-6">Edit Courses Page</div>}
          />
          <Route
            path="search"
            element={<div className="p-6">Search Courses Page</div>}
          />
        </Route>
        <Route path="/term-selection" element={<TermSelection />} />
        <Route path="/course-registration" element={<CourseRegistration />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
