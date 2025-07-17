import React from 'react';
import { ArrowRight } from 'lucide-react';
import logo from '../assets/logo.jpg';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();


  return (
    <header>
      {/* Top green gradient bar */}
      <div className="h-1 w-full bg-gradient-to-r from-[#8e1b3a] via-[#9f405b] to-[#e64271]" />
      <nav className="bg-white shadow">
        <div className="px-4 md:px-8 lg:px-16">
          <div className="mx-auto max-w-7xl flex items-center justify-between py-4">
            {/* Logo and Text */}
            <div className="flex items-center space-x-3">
              <div className="w-20 h-10 rounded-full flex items-center justify-center">
              <img src={logo} alt="Masjid Council Kerala" className="h-10" />
              </div>
            </div>

            <button
          onClick={() => navigate('/admin-login')}
              
              className="cursor-pointer flex items-center bg-gradient-to-r from-[#8e1b3a] to-[#a07d86] text-white px-5 py-2 rounded-full shadow hover:scale-105 transition-transform"
            >
              Admin Login
              <ArrowRight className="ml-2 w-4 h-4" />
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
