import React, { useState } from "react";
import banner from "../assets/kbanner.png";
import borderbtm from "../assets/border-btm.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DecryptedText from "../components/DecryptedText";
import {
  GraduationCap,
  BookOpen,
  FileText,
  CheckCircle2,
  Circle,
  Phone,
  MessageCircle,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const HeroSection = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    address: "",
    district: "",
    email: "",
    mobile: "",
    whatsapp: "",
    age: "",
    gender: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear message when user starts typing
    if (message.text) setMessage({ type: "", text: "" });
  };

  const clearForm = () => {
    setFormData({
      fullName: "",
      dob: "",
      address: "",
      district: "",
      email: "",
      mobile: "",
      whatsapp: "",
      age: "",
      gender: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: "", text: "" });

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
        gender: formData.gender.toLowerCase(),
      };

      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/users/register`,
        registrationData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Success
      // Success
      setMessage({
        type: "success",
        text: "Registration successful! Thank you for registering.",
      });
      clearForm();
      setTimeout(() => {
        setShowForm(false);
      }, 2000); // 5000 milliseconds = 5 seconds

      // Clear success message after 5 seconds
      setTimeout(() => {
        setMessage({ type: "", text: "" });
      }, 5000);
    } catch (err) {
      console.error("Registration error:", err);

      if (err.response?.data?.msg) {
        setMessage({ type: "error", text: err.response.data.msg });
      } else if (err.response?.data?.errors) {
        const errorMessages = err.response.data.errors
          .map((error) => error.msg)
          .join(", ");
        setMessage({ type: "error", text: errorMessages });
      } else if (err.code === "ERR_NETWORK") {
        setMessage({
          type: "error",
          text: "Network error. Please check your connection.",
        });
      } else {
        setMessage({
          type: "error",
          text: "Registration failed. Please try again.",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {/* Banner */}
      {/* <div>

      <div className="px-4 py-8 md:px-8 lg:px-16">
        <div
          className="relative bg-auto bg-cover bg-center rounded-xl overflow-hidden mx-auto max-w-7xl"
          style={{ backgroundImage: `url(${banner})`, height: 'auto' }}
        >
          <img src={banner} alt="Banner" className="w-full h-auto object-cover" />
        </div>
        <img src={borderbtm} alt="Banner" className="w-2.5 h-2.5 object-cover" />

      </div>
      </div> */}

      <div className="px-4 py-8 md:px-8 lg:px-16">
        <div
          className="relative bg-auto bg-cover bg-center rounded-xl overflow-hidden mx-auto max-w-7xl"
          style={{ backgroundImage: `url(${banner})` }}
        >
          <img
            src={banner}
            alt="Banner"
            className="w-full h-auto object-cover"
          />
        </div>
      </div>
      <div
        className="w-full h-[20px] bg-repeat-x"
        style={{
          backgroundImage: `url(${borderbtm})`,
          backgroundSize: "auto 100%",
        }}
      ></div>

      {/* Course Info */}
      <div className="max-w-6xl mx-auto px-6 py-12 bg-white rounded-3xl shadow-2xl mt-10 border border-gray-200 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-xl md:text-2xl font-semibold text-[#8e1b3a] uppercase tracking-widest">
            Al Jamia Al Islamia Presents
          </h2>
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mt-4 leading-tight">
            Understanding Islam
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mt-3">
            A 3-Month Comprehensive Online Course
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Features */}
          <div className="bg-gradient-to-br from-[#fde6ec] to-[#fff9fa] p-8 rounded-2xl shadow-lg border border-[#f9e2e8]">
            <h3 className="text-2xl font-bold text-[#8e1b3a] mb-6 flex items-center gap-3">
              <GraduationCap className="w-6 h-6" />
              Course Features
            </h3>
            <ul className="space-y-3 text-gray-700 text-[15.5px] font-medium">
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span>Weekly topic-focused study</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span>High-quality recorded video lessons</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span>Live Q&A sessions every week</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span>Concise notes alongside every class</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span>Sessions by expert faculty members</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span>Final online examination</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span>Certificate upon successful completion</span>
              </li>
            </ul>
          </div>

          {/* Topics */}
          <div className="bg-gradient-to-br from-[#f5f7fa] to-[#ffffff] p-8 rounded-2xl shadow-lg border border-gray-200">
            <h3 className="text-2xl font-bold text-[#8e1b3a] mb-6 flex items-center gap-3">
              <BookOpen className="w-6 h-6" />
              Topics Covered
            </h3>
            <ul className="space-y-3 text-gray-700 text-[15.5px] font-medium">
              <li className="flex items-center gap-3">
                <Circle className="w-2 h-2 text-[#8e1b3a] flex-shrink-0" />
                <span>Belief in God</span>
              </li>
              <li className="flex items-center gap-3">
                <Circle className="w-2 h-2 text-[#8e1b3a] flex-shrink-0" />
                <span>Prophethood</span>
              </li>
              <li className="flex items-center gap-3">
                <Circle className="w-2 h-2 text-[#8e1b3a] flex-shrink-0" />
                <span>Life after Death</span>
              </li>
              <li className="flex items-center gap-3">
                <Circle className="w-2 h-2 text-[#8e1b3a] flex-shrink-0" />
                <span>Ritual Practices</span>
              </li>
              <li className="flex items-center gap-3">
                <Circle className="w-2 h-2 text-[#8e1b3a] flex-shrink-0" />
                <span>Family System</span>
              </li>
              <li className="flex items-center gap-3">
                <Circle className="w-2 h-2 text-[#8e1b3a] flex-shrink-0" />
                <span>Islam's Liberating Message</span>
              </li>
              <li className="flex items-center gap-3">
                <Circle className="w-2 h-2 text-[#8e1b3a] flex-shrink-0" />
                <span>History of Prophets</span>
              </li>
              <li className="flex items-center gap-3">
                <Circle className="w-2 h-2 text-[#8e1b3a] flex-shrink-0" />
                <span>Prophet Muhammad ﷺ</span>
              </li>
              <li className="flex items-center gap-3">
                <Circle className="w-2 h-2 text-[#8e1b3a] flex-shrink-0" />
                <span>Islamic Contributions to Civilization</span>
              </li>
              <li className="flex items-center gap-3">
                <Circle className="w-2 h-2 text-[#8e1b3a] flex-shrink-0" />
                <span>Faith and Ethical Values</span>
              </li>
            </ul>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12 space-y-4">
          <button
            onClick={() => {
              setShowForm(true);
              setTimeout(() => {
                const section = document.getElementById("reg");
                if (section) {
                  section.scrollIntoView({ behavior: "smooth" });
                }
              }, 100); // small delay to wait for the form to render
            }}
            className="cursor-pointer inline-flex items-center gap-3 bg-gradient-to-r from-[#8e1b3a] to-[#c44563] text-white text-lg font-semibold px-10 py-4 rounded-full shadow-md hover:from-[#73132f] hover:to-[#a6324c] transition duration-200"
          >
            <FileText className="w-5 h-5" />
            Register Now
          </button>
          <div className="text-gray-600 text-sm mt-3 space-y-1">
            <p className="flex items-center justify-center gap-2">
              <Phone className="w-4 h-4" />
              <span>
                For more details:{" "}
                <span className="font-semibold">8606529689</span>
              </span>
            </p>
            <p className="flex items-center justify-center gap-2">
              <MessageCircle className="w-4 h-4" />
              <span>
                WhatsApp: <span className="font-semibold">8606529687</span>
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Registration Form */}
      {showForm && (
        <div
          className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-2xl shadow-xl border border-gray-200"
          id="reg"
        >
          <h2 className="text-3xl font-bold text-center text-[#8e1b3a] mb-8 uppercase">
            Course Registration
          </h2>

          {/* Message Display */}
          {/* {message.text && (
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
          )} */}
          {message.text && (
            <div
              className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
                message.type === "success"
                  ? "bg-[#fde6ec] border-[#9f405b]"
                  : "bg-red-50 border border-red-200"
              }`}
            >
              {message.type === "success" ? (
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
              )}

              <span
                className={`text-sm ${
                  message.type === "success" ? "text-[#8e1b3a]" : "text-red-700"
                }`}
              >
                {message.type === "success" ? (
                  <DecryptedText
                    key={message.text} // Forces rerun on each new message
                    text={message.text}
                    speed={40} // faster animation
                    maxIterations={10}
                    animateOn="view" // or "always" (by triggering on mount)
                    revealDirection="start"
                    className="revealed"
                    parentClassName="all-letters"
                    encryptedClassName="encrypted"
                  />
                ) : (
                  message.text
                )}
              </span>
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="input mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-[#8e1b3a] focus:border-[#8e1b3a]"
              />
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-sm font-medium  text-gray-700">
                Date of Birth
              </label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                required
                className="input mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-[#8e1b3a] focus:border-[#8e1b3a]"
              />
            </div>

            {/* Address */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows={3}
                required
                className="input mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-[#8e1b3a] focus:border-[#8e1b3a]"
              />
            </div>

            {/* District */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                District
              </label>
              <input
                type="text"
                name="district"
                value={formData.district}
                onChange={handleChange}
                required
                className="input mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-[#8e1b3a] focus:border-[#8e1b3a]"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email ID
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="input mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-[#8e1b3a] focus:border-[#8e1b3a]"
              />
            </div>

            {/* Mobile Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Mobile Number
              </label>
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                required
                className="input mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-[#8e1b3a] focus:border-[#8e1b3a]"
              />
            </div>

            {/* WhatsApp Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                WhatsApp Number
              </label>
              <input
                type="tel"
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleChange}
                required
                className="input mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-[#8e1b3a] focus:border-[#8e1b3a]"
              />
            </div>

            {/* Age */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Age
              </label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
                min="1"
                max="120"
                className="input mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-[#8e1b3a] focus:border-[#8e1b3a]"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Gender
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                className="input mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-[#8e1b3a] focus:border-[#8e1b3a]"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Submit */}
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
      )}
    </div>
  );
};

export default HeroSection;
