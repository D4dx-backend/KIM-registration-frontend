import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Home from './pages/Home';
import AdminLoginForm from './pages/AdminLogin';
import RegistrationForm from './pages/RegistrationForm';
import AdminDashboard from './pages/AdminDashboard';
import React from 'react';

// Create a wrapper component to access useLocation outside Router
const Layout = () => {
  const location = useLocation();

  // Define paths where navbar should be hidden
  const hideNavbarPaths = ['/admin-login', '/admin-dashboard'];

  return (
    <>
      {/* Conditionally show Navbar */}
      {!hideNavbarPaths.includes(location.pathname) && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin-login" element={<AdminLoginForm />} />
        <Route path="/register-form" element={<RegistrationForm />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
