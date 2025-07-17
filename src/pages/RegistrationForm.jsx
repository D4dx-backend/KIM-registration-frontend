import React, { useState } from 'react';
import axios from 'axios';
import { CheckCircle, AlertCircle } from 'lucide-react';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    dob: '',
    address: '',
    district: '',
    email: '',
    mobile: '',
    whatsapp: '',
    age: '',
    gender: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear message when user starts typing
    if (message.text) setMessage({ type: '', text: '' });
  };

  const clearForm = () => {
    setFormData({
      fullName: '',
      dob: '',
      address: '',
      district: '',
      email: '',
      mobile: '',
      whatsapp: '',
      age: '',
      gender: '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: '', text: '' });

    try {
      // Prepare data for backend (matching the expected format)
      const registrationData = {
        fullName: formData.fullName,
        dateOfBirth: formData.dob,
        address: formData.address,
        district: formData.district,
        email: formData.email,
        mobileNumber: formData.mobile,
        whatsappNumber: formData.whatsapp || formData.mobile, // Use mobile as fallback
        age: parseInt(formData.age),
        gender: formData.gender.toLowerCase()
      };

      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/api/users/register`,
        registrationData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      // Success
      setMessage({ type: 'success', text: 'Registration successful! Thank you for registering.' });
      clearForm();
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setMessage({ type: '', text: '' });
      }, 5000);

    } catch (err) {
      console.error('Registration error:', err);
      
      if (err.response?.data?.msg) {
        setMessage({ type: 'error', text: err.response.data.msg });
      } else if (err.response?.data?.errors) {
        const errorMessages = err.response.data.errors.map(error => error.msg).join(', ');
        setMessage({ type: 'error', text: errorMessages });
      } else if (err.code === 'ERR_NETWORK') {
        setMessage({ type: 'error', text: 'Network error. Please check your connection.' });
      } else {
        setMessage({ type: 'error', text: 'Registration failed. Please try again.' });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
      <h2 className="text-3xl font-bold text-center text-[#8e1b3a] mb-8 uppercase">Course Registration</h2>
      
      {/* Message Display */}
      {message.text && (
        <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
          message.type === 'success' 
            ? 'bg-green-50 border border-green-200' 
            : 'bg-red-50 border border-red-200'
        }`}>
          {message.type === 'success' ? (
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
          )}
          <span className={`text-sm ${
            message.type === 'success' ? 'text-green-700' : 'text-red-700'
          }`}>
            {message.text}
          </span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-[#8e1b3a] focus:border-[#8e1b3a]"
          />
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
            className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-[#8e1b3a] focus:border-[#8e1b3a]"
          />
        </div>

        {/* Address */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            rows={3}
            required
            className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-[#8e1b3a] focus:border-[#8e1b3a]"
          />
        </div>

        {/* District */}
        <div>
          <label className="block text-sm font-medium text-gray-700">District</label>
          <input
            type="text"
            name="district"
            value={formData.district}
            onChange={handleChange}
            required
            className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-[#8e1b3a] focus:border-[#8e1b3a]"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Email ID</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-[#8e1b3a] focus:border-[#8e1b3a]"
          />
        </div>

        {/* Mobile Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
          <input
            type="tel"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            required
            className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-[#8e1b3a] focus:border-[#8e1b3a]"
          />
        </div>

        {/* WhatsApp Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700">WhatsApp Number</label>
          <input
            type="tel"
            name="whatsapp"
            value={formData.whatsapp}
            onChange={handleChange}
            required
            className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-[#8e1b3a] focus:border-[#8e1b3a]"
          />
        </div>

        {/* Age */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
            min="1"
            max="120"
            className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-[#8e1b3a] focus:border-[#8e1b3a]"
          />
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-[#8e1b3a] focus:border-[#8e1b3a]"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2 mt-6 text-center">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-gradient-to-r from-[#8e1b3a] to-[#c44563] text-white font-semibold px-8 py-3 rounded-lg shadow hover:from-[#73132f] hover:to-[#a6324c] transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 mx-auto"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Registering...</span>
              </>
            ) : (
              <span>Submit Registration</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
