import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import Courses from "./pages/courses";
import Dashboard from "./pages/dashboard";
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { HashRouter } from 'react-router-dom'
import DashboardAdmin from "./pages/DashboardAdmin";
import Programs from "./pages/programs";
import MyCourses from "./components/MyCourses";
import AdminProfile from "./components/AdminProfile.jsx";
import SearchCourses from "./components/AdminCourses.jsx";
import RegisteredStudents from "./components/AdminStudents.jsx";
import SubmittedForms from "./components/AdminForms.jsx";
import AdminCourseForm from "./components/AdminCourseForm.jsx";
import StudentCourseRegistration from "./components/StudentCourseRegistration.jsx";
import StudentTermSelection from "./components/StudentTermSelection.jsx";
import StudentContactAdmin from "./components/StudentContactAdmin.jsx";
import StudentMyCourses from "./components/StudentMyCourses.jsx";
import CourseRegistrationCart from "./components/StudentCourseCart.jsx";
import StudentDashboard from "./components/StudentDashboard.jsx"
import StudentProfile from "./components/StudentProfile.jsx"

function App() {
  // Load Tailwind CSS
  const style = document.createElement("link");
  style.rel = "stylesheet";
  style.href =
    "https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css";
  document.head.appendChild(style);

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/programs" element={<Programs />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<DashboardAdmin />} />
          <Route path="profile" element={<AdminProfile />} />
          <Route path="coursesadmin" element={<SearchCourses />} />                                
          <Route path="courseForm" element={<AdminCourseForm />} />
          <Route path="students" element={<RegisteredStudents />} />
          <Route path="my-courses" element={<StudentMyCourses />} />
          <Route path="courseregistration" element={<StudentCourseRegistration />} />
          <Route path="coursecart" element={<CourseRegistrationCart />} />
          <Route path="forms" element={<SubmittedForms />} />          
          <Route path="terms" element={<StudentTermSelection />} />          
          <Route path="contact" element={<StudentContactAdmin />} />          
          <Route path="studentdashboard" element={<StudentDashboard />} />          
          <Route path="studentprofile" element={<StudentProfile />} />          
        </Route>        
        <Route path="*" element={<Navigate to="/" replace />}></Route>
      </Routes>
    </HashRouter>
  );
}

export default App;