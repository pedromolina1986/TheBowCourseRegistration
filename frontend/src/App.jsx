import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import Courses from './pages/courses';
import Dashboard from './pages/dashboard';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DashboardAdmin from "./pages/DashboardAdmin";
import Programs from './pages/programs';



function App() {

  // Load Tailwind CSS
  const style = document.createElement('link');
  style.rel = 'stylesheet';
  style.href = 'https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css';
  document.head.appendChild(style);

return (
    <Router>
      <Routes>
        <Route path="/" element={<Home to="/home" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/courses' element={<Courses/>} />
        <Route path='/programs' element={<Programs/>} />
        <Route path="/dashboard" element={<Dashboard />}>        
          <Route index element={<DashboardAdmin />} />          
          <Route path="profile" element={<div className="p-6">Profile Page</div>} />
          <Route path="create" element={<div className="p-6">Create Courses Page</div>} />
          <Route path="edit" element={<div className="p-6">Edit Courses Page</div>} />
          <Route path="search" element={<div className="p-6">Search Courses Page</div>} />
          <Route path="students" element={<div className="p-6">Registered Students Page</div>} />
          <Route path="forms" element={<div className="p-6">Submitted Forms Page</div>} />
        </Route>
        <Route path="*" element={<Navigate to="/dashboard" replace />} >            
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
