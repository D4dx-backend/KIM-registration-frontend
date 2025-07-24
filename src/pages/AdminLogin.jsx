import React, { useState } from 'react';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/api/admin/login`,
        formData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.token) {
        // Store the token in localStorage
        localStorage.setItem('adminToken', response.data.token);
        // Navigate to admin dashboard
        navigate('/admin-dashboard');
      }
    } catch (err) {
      console.error('Login error:', err);
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.response?.status === 401) {
        setError('Invalid email or password');
      } else if (err.code === 'ERR_NETWORK') {
        setError('Network error. Please check your connection.');
      } else {
        setError('Login failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl p-8 shadow-[0_4px_20px_rgba(63,9,23,0.5)] border border-[#3f0917]">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            {/* <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white text-2xl font-bold">V</span>
            </div> */}
          </div>

          {/* Title */}
          <h2 className="text-[#8e1b3a] text-xl font-semibold text-center mb-8">
            Admin Login
          </h2>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
              <span className="text-red-400 text-sm">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="mb-4">
              <label className="block text-[#8e1b3a] text-sm mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-transparent border border-[#8e1b3a] rounded-lg px-4 py-3 text-[#8e1b3a] placeholder-[#8e1b3a] focus:ring-[#8e1b3a] focus:border-[#d29aa9] focus:outline-none focus:ring-1  transition-colors"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Password Field */}
            <div className="mb-6">
              <label className="block text-[#8e1b3a] text-sm mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-transparent border border-[#8e1b3a] rounded-lg px-4 py-3 pr-12 text-[#8e1b3a] placeholder-[#8e1b3a] focus:ring-[#8e1b3a] focus:border-[#d29aa9] focus:outline-none focus:ring-1  transition-colors"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#8e1b3a] hover:text-[#a86779] transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full  text-white font-semibold py-3 px-4 rounded-lg hover:from-red-600 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              style={{
                background: 'linear-gradient(to right, #8e1b3a, #9f405b, #e64271)',
              }}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Logging in...</span>
                </>
              ) : (
                <span>Log In</span>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-[#8e1b3a]"></div>
            <div className="px-4 text-[#8e1b3a] text-sm">OR</div>
            <div className="flex-1 border-t border-[#8e1b3a]"></div>
          </div>
          
          {/* <button
            onClick={() => navigate('/')}
            className="w-full bg-[#6a7cdf] text-white font-semibold py-3 px-4 rounded-lg hover:bg-[#3d446d] focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            <span>Back to home</span>
          </button> */}
          <button
  onClick={() => navigate('/')}
  className="w-full text-white font-semibold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
  style={{
    background: 'linear-gradient(to right, #ca7e93, #9f405b, #3f0917)', // cool violet gradient
  }}
>
  <span>Back to home</span>
</button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;