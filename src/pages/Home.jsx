import React, { useState } from 'react';
import banner from '../assets/kbanner.png';
import borderbtm from '../assets/border-btm.png';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const [showForm, setShowForm] = useState(false);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // You can send form data to backend or reset here
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
    <img src={banner} alt="Banner" className="w-full h-auto object-cover" />
  </div>

  
</div>
<div
    className="w-full h-[20px] bg-repeat-x"
    style={{
      backgroundImage: `url(${borderbtm})`,
      backgroundSize: 'auto 100%',
    }}
  ></div>

      {/* Course Info */}
      <div className="max-w-6xl mx-auto px-6 py-12 bg-white rounded-3xl shadow-2xl mt-10 border border-gray-200 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-xl md:text-2xl font-semibold text-[#8e1b3a] uppercase tracking-widest">Al Jamia Al Islamia Presents</h2>
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mt-4 leading-tight">Understanding Islam</h1>
          <p className="text-lg md:text-xl text-gray-600 mt-3">A 3-Month Comprehensive Online Course</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Features */}
          <div className="bg-gradient-to-br from-[#fde6ec] to-[#fff9fa] p-8 rounded-2xl shadow-lg border border-[#f9e2e8]">
            <h3 className="text-2xl font-bold text-[#8e1b3a] mb-6">🎓 Course Features</h3>
            <ul className="space-y-3 text-gray-700 text-[15.5px] font-medium">
              <li>✅ Weekly topic-focused study</li>
              <li>✅ High-quality recorded video lessons</li>
              <li>✅ Live Q&A sessions every week</li>
              <li>✅ Concise notes alongside every class</li>
              <li>✅ Sessions by expert faculty members</li>
              <li>✅ Final online examination</li>
              <li>✅ Certificate upon successful completion</li>
            </ul>
          </div>

          {/* Topics */}
          <div className="bg-gradient-to-br from-[#f5f7fa] to-[#ffffff] p-8 rounded-2xl shadow-lg border border-gray-200">
            <h3 className="text-2xl font-bold text-[#8e1b3a] mb-6">📚 Topics Covered</h3>
            <ul className="space-y-3 text-gray-700 text-[15.5px] font-medium">
              <li>▪ Belief in God</li>
              <li>▪ Prophethood</li>
              <li>▪ Life after Death</li>
              <li>▪ Ritual Practices</li>
              <li>▪ Family System</li>
              <li>▪ Islam's Liberating Message</li>
              <li>▪ History of Prophets</li>
              <li>▪ Prophet Muhammad ﷺ</li>
              <li>▪ Islamic Contributions to Civilization</li>
              <li>▪ Faith and Ethical Values</li>
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
            
            
            className="cursor-pointer inline-block bg-gradient-to-r from-[#8e1b3a] to-[#c44563] text-white text-lg font-semibold px-10 py-4 rounded-full shadow-md hover:from-[#73132f] hover:to-[#a6324c] transition duration-200"
          >
            📝 Register Now
          </button>
          <div className="text-gray-600 text-sm mt-3 space-y-1">
            <p>📞 For more details: <span className="font-semibold">8606529689</span></p>
            <p>📲 WhatsApp: <span className="font-semibold">8606529687</span></p>
          </div>
        </div>
      </div>

      {/* Registration Form */}
      {showForm && (
        <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-2xl shadow-xl border border-gray-200" id="reg">
          <h2 className="text-3xl font-bold text-center text-[#8e1b3a] mb-8 uppercase">Course Registration</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
              
              type="text" name="fullName" value={formData.fullName} onChange={handleChange} required className="input mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-[#8e1b3a] focus:border-[#8e1b3a]" />
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-sm font-medium  text-gray-700">Date of Birth</label>
              <input  type="date" name="dob" value={formData.dob} onChange={handleChange} required className="input mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-[#8e1b3a] focus:border-[#8e1b3a]" />
            </div>

            {/* Address */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <textarea name="address" value={formData.address} onChange={handleChange} rows={3} required className="input mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-[#8e1b3a] focus:border-[#8e1b3a]" />
            </div>

            {/* District */}
            <div>
              <label className="block text-sm font-medium text-gray-700">District</label>
              <input type="text" name="district" value={formData.district} onChange={handleChange} required className="input mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-[#8e1b3a] focus:border-[#8e1b3a]" />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Email ID</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required className="input mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-[#8e1b3a] focus:border-[#8e1b3a]" />
            </div>

            {/* Mobile Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
              <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} required className="input mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-[#8e1b3a] focus:border-[#8e1b3a]" />
            </div>

            {/* WhatsApp Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700">WhatsApp Number</label>
              <input type="tel" name="whatsapp" value={formData.whatsapp} onChange={handleChange} required className="input mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-[#8e1b3a] focus:border-[#8e1b3a]" />
            </div>

            {/* Age */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Age</label>
              <input type="number" name="age" value={formData.age} onChange={handleChange} required className="input mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-[#8e1b3a] focus:border-[#8e1b3a]" />
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Gender</label>
              <select name="gender" value={formData.gender} onChange={handleChange} required className="input mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-[#8e1b3a] focus:border-[#8e1b3a]">
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
                className="bg-gradient-to-r from-[#8e1b3a] to-[#c44563] text-white font-semibold px-8 py-3 rounded-lg shadow hover:from-[#73132f] hover:to-[#a6324c] transition duration-300"
              >
                Submit Registration
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default HeroSection;
