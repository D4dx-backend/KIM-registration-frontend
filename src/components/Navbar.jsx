// import React from 'react';
// import { ArrowRight } from 'lucide-react';
// import logo from '../assets/dialouge-logo.png';
// import kinlogo from '../assets/kim-logo.png';
// import { useNavigate } from 'react-router-dom';

// const Navbar = () => {
//     const navigate = useNavigate();


//   return (
//     <header>
//       {/* Top green gradient bar */}
//       <div className="h-1 w-full bg-gradient-to-r from-[#8e1b3a] via-[#9f405b] to-[#e64271]" />
//       <nav className="bg-[#8e1b3a] shadow">
//         <div className="px-4 md:px-8 lg:px-16">
//           <div className="mx-auto  flex items-center justify-between py-4"
//           style={{ maxWidth: "910pt" }}
//           >
//           {/* <div className="mx-auto max-w-6xl flex items-center justify-between py-4"> */}
//             {/* Logo and Text */}
//             <div className="flex items-center space-x-3">
//               <div className="w-auto h-15 rounded-full flex items-center justify-center p-2">
//               <img src={kinlogo} alt="Masjid Council Kerala" className="h-20 w-auto" />
//               </div>
//             </div>

//             <button
//           onClick={() => navigate('/admin-login')}
              
//               className="cursor-pointer flex items-center bg-gradient-to-r from-[#8e1b3a] to-[#a07d86] text-white px-5 py-2 rounded-full shadow hover:scale-105 transition-transform"
//             >
//               Admin Login
//               <ArrowRight className="ml-2 w-4 h-4" />
//             </button>
//           </div>
//         </div>
//       </nav>
//     </header>
//   );
// };

// export default Navbar;


// import React from 'react';
// import { ArrowRight } from 'lucide-react';
// import logo from '../assets/dialouge-logo.png';
// import kinlogo from '../assets/kim-logo.png';
// import { useNavigate } from 'react-router-dom';

// const Navbar = () => {
//     const navigate = useNavigate();

//   return (
//     <header>
//       {/* Top green gradient bar */}
//       <div className="h-1 w-full bg-gradient-to-r from-[#8e1b3a] via-[#9f405b] to-[#e64271]" />
//       <nav className="bg-[#8e1b3a] shadow">
//         <div className="px-4 md:px-8 lg:px-16">
//           <div className="mx-auto  flex items-center justify-between py-4 "
//           style={{ maxWidth: "910pt" }}
//           >
//           {/* <div className="mx-auto max-w-6xl flex items-center justify-between py-4"> */}
//             {/* Logo and Text */}
//             <div className="flex items-center space-x-3">
//               <div className="w-auto h-15 rounded-full flex items-center justify-center p-2 mt-5">
//               <img src={kinlogo} alt="Masjid Council Kerala" className="h-20 w-auto" />
//               </div>
//             </div>

//             <button
//           onClick={() => navigate('/admin-login')}
              
//               className="cursor-pointer flex items-center bg-gradient-to-r from-[#8e1b3a] to-[#a07d86] text-white px-5 py-2 rounded-full shadow hover:scale-105 transition-transform mt-5"
//             >
//               Admin Login
//               <ArrowRight className="ml-2 w-4 h-4" />
//             </button>
//           </div>
//         </div>
//       </nav>
//     </header>
//   );
// };

// export default Navbar;

import React from 'react';
import { ArrowRight } from 'lucide-react';
import logo from '../assets/dialouge-logo.png';
import kinlogo from '../assets/kim-logo.png';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

  return (
    <header>
      {/* Top green gradient bar */}
      <div className="h-1 w-full bg-gradient-to-r from-[#8e1b3a] via-[#9f405b] to-[#e64271]" />
      <nav className="bg-[#8e1b3a] shadow">
        <div className="px-4 sm:px-6 md:px-8 lg:px-16">
          <div className="mx-auto flex items-center justify-between py-3 sm:py-4"
          style={{ maxWidth: "910pt" }}
          >
            {/* Logo and Text */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-auto rounded-full flex items-center justify-center p-1 sm:p-2">
                <img 
                  src={kinlogo} 
                  alt="Masjid Council Kerala" 
                  className="h-12 sm:h-16 md:h-20 w-auto" 
                />
              </div>
            </div>

            <button
              onClick={() => navigate('/admin-login')}
              className="cursor-pointer flex items-center bg-gradient-to-r from-[#8e1b3a] to-[#a07d86] text-white px-3 sm:px-4 md:px-5 py-2 rounded-full shadow hover:scale-105 transition-transform text-sm sm:text-base"
            >
              <span className="hidden sm:inline">Admin Login</span>
              <span className="sm:hidden">Admin</span>
              <ArrowRight className="ml-1 sm:ml-2 w-3 h-3 sm:w-4 sm:h-4" />
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;