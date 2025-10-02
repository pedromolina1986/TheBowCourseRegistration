import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Home from './pages/home';
import AdminDashboard from './pages/adminDashboard.jsx';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

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
        <Route path="/dashboard" element={<AdminDashboard />} />        
      </Routes>
    </Router>
  );
}

export default App;
