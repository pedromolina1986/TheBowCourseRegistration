import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Home from './pages/home';
import Dashboard from './pages/dashboard';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function App() {

return (
    <Router>
      <Routes>
        <Route path="/" element={<Home to="/home" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />        
      </Routes>
    </Router>
  );
}

export default App;
