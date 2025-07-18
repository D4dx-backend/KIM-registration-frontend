// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Download, LogOut, Users, Home, Eye, Mail, Phone, Calendar, MapPin } from 'lucide-react';
// import axios from 'axios';
// import logo from '../assets/kim-logo.png';
// import kinlogo from '../assets/kim-logo.png';
// import Footer from '../components/Footer';



// const AdminDashboard = () => {
//   const [users, setUsers] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [downloadLoading, setDownloadLoading] = useState(false);
//   const [downloadStatus, setDownloadStatus] = useState('');
//   const navigate = useNavigate();
//   const [currentPage, setCurrentPage] = useState(1);
//   const usersPerPage = 10;
//   const indexOfLastUser = currentPage * usersPerPage;
//   const indexOfFirstUser = indexOfLastUser - usersPerPage;
//   const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
//   const totalPages = Math.ceil(users.length / usersPerPage);
    
//   useEffect(() => {
//     // Check if admin token exists
//     const token = localStorage.getItem('adminToken');
//     if (!token) {
//       navigate('/admin-login');
//       return;
//     }

//     // Fetch users on component mount
//     fetchUsers();
//   }, [navigate]);

//   const fetchUsers = async () => {
//     try {
//       const token = localStorage.getItem('adminToken');
//       const response = await axios.get(
//         `${import.meta.env.VITE_API_BASE_URL}/api/admin/users`,
//         {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json'
//           }
//         }
//       );
//       setUsers(response.data);
//     } catch (err) {
//       console.error('Error fetching users:', err);
//       if (err.response?.status === 401) {
//         localStorage.removeItem('adminToken');
//         navigate('/admin-login');
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('adminToken');
//     navigate('/admin-login');
//   };

//   const handleDownloadUsers = async () => {
//     setDownloadLoading(true);
//     setDownloadStatus('');

//     try {
//       const token = localStorage.getItem('adminToken');
//       const response = await axios.get(
//         `${import.meta.env.VITE_API_BASE_URL}/api/admin/download-users`,
//         {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json'
//           },
//           responseType: 'blob'
//         }
//       );

//       // Create download link
//       const url = window.URL.createObjectURL(new Blob([response.data]));
//       const link = document.createElement('a');
//       link.href = url;
//       link.setAttribute('download', `registered_students_${new Date().toISOString().split('T')[0]}.xlsx`);
//       document.body.appendChild(link);
//       link.click();
//       link.remove();
//       window.URL.revokeObjectURL(url);

//       setDownloadStatus('Download completed successfully!');
//       setTimeout(() => setDownloadStatus(''), 3000);
//     } catch (err) {
//       console.error('Download error:', err);
//       if (err.response?.status === 401) {
//         setDownloadStatus('Unauthorized. Please login again.');
//         setTimeout(() => {
//           localStorage.removeItem('adminToken');
//           navigate('/admin-login');
//         }, 2000);
//       } else {
//         setDownloadStatus('Download failed. Please try again.');
//         setTimeout(() => setDownloadStatus(''), 3000);
//       }
//     } finally {
//       setDownloadLoading(false);
//     }
//   };

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric'
//     });
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-[#fdf2f8] via-[#fce7f3] to-[#f3e8ff] flex items-center justify-center p-4">
//         <div className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-8 sm:p-12 shadow-2xl border border-[#e64271]/20 max-w-sm w-full">
//           <div className="relative w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6">
//             <div className="absolute inset-0 bg-gradient-to-r from-[#8e1b3a] to-[#e64271] rounded-full animate-spin opacity-25"></div>
//             <div className="absolute inset-2 bg-gradient-to-r from-[#8e1b3a] to-[#e64271] rounded-full animate-pulse"></div>
//             <div className="absolute inset-4 bg-white rounded-full"></div>
//           </div>
//           <p className="text-[#8e1b3a] font-medium text-base sm:text-lg">Loading registered users...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
    
//     <div className="min-h-screen ">
//       {/* Header */}
//       <header className="relative overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-r from-[#8e1b3a] via-[#9f405b] to-[#e64271]"></div>
//         <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10"></div>
//         <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 sm:py-6 space-y-4 sm:space-y-0">
//             <div className="flex items-center space-x-3 sm:space-x-4">
//               <div className="w-auto h-15 sm:w-auto sm:h-15  rounded-xl flex items-center justify-center ">
//                 {/* <Users className="w-5 h-5 sm:w-6 sm:h-6 text-white" /> */}
//               <img src={logo} alt="Masjid Council Kerala" className="h-15 w-auto " />

//               </div>
//               {/* <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Admin Dashboard</h1> */}
//               <h1 className="text-[25px] font-bold text-white tracking-tight mt-5">
//   Admin Dashboard
// </h1>

//             </div>
//             <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
//               <button
//                 onClick={() => navigate('/')}
//                 className="flex items-center justify-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all duration-300 rounded-xl border border-white/20 hover:border-white/40 text-sm sm:text-base"
//               >
//                 <Home className="w-4 h-4 sm:w-5 sm:h-5" />
//                 <span className="font-medium">Home</span>
//               </button>
//               <button
//                 onClick={handleLogout}
//                 className="flex items-center justify-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all duration-300 rounded-xl border border-white/20 hover:border-white/40 text-sm sm:text-base"
//               >
//                 <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
//                 <span className="font-medium">Logout</span>
//               </button>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="max-w-7xl h-96 mx-auto py-6 sm:py-8 px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
//           <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-xl border border-[#e64271]/10 hover:shadow-2xl transition-all duration-300">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-xs sm:text-sm font-medium text-[#9f405b] uppercase tracking-wider">Total Students</p>
//                 <p className="text-2xl sm:text-3xl font-bold text-[#8e1b3a] mt-1 sm:mt-2">{users.length}</p>
//               </div>
//               <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-[#8e1b3a] to-[#e64271] rounded-xl flex items-center justify-center">
//                 <Users className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
//               </div>
//             </div>
//           </div>
          
//           <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-xl border border-[#e64271]/10 hover:shadow-2xl transition-all duration-300">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-xs sm:text-sm font-medium text-[#9f405b] uppercase tracking-wider">New Today</p>
//                 <p className="text-2xl sm:text-3xl font-bold text-[#8e1b3a] mt-1 sm:mt-2">
//                   {users.filter(user => 
//                     new Date(user.createdAt).toDateString() === new Date().toDateString()
//                   ).length}
//                 </p>
//               </div>
//               <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-[#9f405b] to-[#e64271] rounded-xl flex items-center justify-center">
//                 <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
//               </div>
//             </div>
//           </div>
          
//           <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-xl border border-[#e64271]/10 hover:shadow-2xl transition-all duration-300 sm:col-span-2 lg:col-span-1">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-xs sm:text-sm font-medium text-[#9f405b] uppercase tracking-wider">Districts</p>
//                 <p className="text-2xl sm:text-3xl font-bold text-[#8e1b3a] mt-1 sm:mt-2">
//                   {new Set(users.map(user => user.district)).size}
//                 </p>
//               </div>
//               <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-[#e64271] to-[#8e1b3a] rounded-xl flex items-center justify-center">
//                 <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Download Status */}
//         {downloadStatus && (
//           <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-xl text-sm sm:text-base">
//             {downloadStatus}
//           </div>
//         )}

//         {/* Users List */}
//         <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-[#e64271]/10 overflow-hidden ">
//           <div className="bg-gradient-to-r from-[#8e1b3a]/5 to-[#e64271]/5 px-4 sm:px-8 py-4 sm:py-6 border-b border-[#e64271]/10">
//             <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
//               {/* Left section: icon + heading */}
//               <div className="flex items-center space-x-3 sm:space-x-4">
//                 <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-[#8e1b3a] to-[#e64271] rounded-lg flex items-center justify-center">
//                   <Users className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
//                 </div>
//                 <h2 className="text-lg sm:text-xl font-bold text-[#8e1b3a]">Registered Students</h2>
//               </div>

//               {/* Right section: Download button */}
//               <button
//                 onClick={handleDownloadUsers}
//                 disabled={downloadLoading}
//                 className="w-full sm:w-auto relative overflow-hidden bg-gradient-to-r from-[#e64271] to-[#8e1b3a] text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-xl hover:from-[#d63968] hover:to-[#7a1632] focus:outline-none focus:ring-4 focus:ring-[#e64271]/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 sm:space-x-3 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm sm:text-base"
//               >
//                 {downloadLoading ? (
//                   <>
//                     <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                     <span>Downloading...</span>
//                   </>
//                 ) : (
//                   <>
//                     <Download className="w-4 h-4 sm:w-5 sm:h-5" />
//                     <span>Download Excel</span>
//                   </>
//                 )}
//               </button>
//             </div>
//           </div>
          
//           {users.length === 0 ? (
//             <div className="p-8 sm:p-16 text-center">
//               <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-[#8e1b3a]/10 to-[#e64271]/10 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
//                 <Users className="w-8 h-8 sm:w-10 sm:h-10 text-[#9f405b]" />
//               </div>
//               <h3 className="text-lg sm:text-xl font-semibold text-[#8e1b3a] mb-2">No Students Yet</h3>
//               <p className="text-[#9f405b] text-sm sm:text-base">Students will appear here once they start registering.</p>
//             </div>
//           ) : (
//             <>
//               {/* Desktop Table View */}
//               <div className="hidden lg:block overflow-x-auto">
//                 <table className="min-w-full">
//                   <thead>
//                     <tr className="bg-gradient-to-r from-[#8e1b3a]/5 to-[#e64271]/5">
//                       <th className="px-8 py-4 text-left text-xs font-bold text-[#8e1b3a] uppercase tracking-wider">
//                         Student
//                       </th>
//                       <th className="px-8 py-4 text-left text-xs font-bold text-[#8e1b3a] uppercase tracking-wider">
//                         Contact
//                       </th>
//                       <th className="px-8 py-4 text-left text-xs font-bold text-[#8e1b3a] uppercase tracking-wider">
//                         Location
//                       </th>
//                       <th className="px-8 py-4 text-left text-xs font-bold text-[#8e1b3a] uppercase tracking-wider">
//                         Registration Date
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white/50 divide-y divide-[#e64271]/10">
//                     {currentUsers.map((user, index) => (
//                       <tr key={user._id || index} className="hover:bg-gradient-to-r hover:from-[#8e1b3a]/5 hover:to-[#e64271]/5 transition-all duration-300 group">
//                         <td className="px-8 py-6 whitespace-nowrap">
//                           <div className="flex items-center">
//                             <div className="flex-shrink-0 h-14 w-14">
//                               <div className="h-14 w-14 rounded-2xl bg-gradient-to-r from-[#8e1b3a] to-[#e64271] flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-105">
//                                 <span className="text-white font-bold text-lg">
//                                   {user.fullName?.charAt(0)?.toUpperCase() || 'U'}
//                                 </span>
//                               </div>
//                             </div>
//                             <div className="ml-6">
//                               <div className="text-lg font-bold text-[#8e1b3a] group-hover:text-[#e64271] transition-colors">
//                                 {user.fullName}
//                               </div>
//                               <div className="text-sm text-[#9f405b] font-medium">
//                                 Age: {user.age} • {user.gender}
//                               </div>
//                             </div>
//                           </div>
//                         </td>
//                         <td className="px-8 py-6 whitespace-nowrap">
//                           <div className="space-y-2">
//                             <div className="flex items-center space-x-3 text-[#8e1b3a]">
//                               <div className="w-8 h-8 bg-gradient-to-r from-[#e64271]/20 to-[#8e1b3a]/20 rounded-lg flex items-center justify-center">
//                                 <Mail className="w-4 h-4 text-[#8e1b3a]" />
//                               </div>
//                               <span className="font-medium">{user.email}</span>
//                             </div>
//                             <div className="flex items-center space-x-3 text-[#8e1b3a]">
//                               <div className="w-8 h-8 bg-gradient-to-r from-[#e64271]/20 to-[#8e1b3a]/20 rounded-lg flex items-center justify-center">
//                                 <Phone className="w-4 h-4 text-[#8e1b3a]" />
//                               </div>
//                               <span className="font-medium">{user.mobileNumber}</span>
//                             </div>
//                           </div>
//                         </td>
//                         <td className="px-8 py-6 whitespace-nowrap">
//                           <div className="flex items-center space-x-3">
//                             <div className="w-8 h-8 bg-gradient-to-r from-[#e64271]/20 to-[#8e1b3a]/20 rounded-lg flex items-center justify-center">
//                               <MapPin className="w-4 h-4 text-[#8e1b3a]" />
//                             </div>
//                             <span className="font-semibold text-[#8e1b3a]">{user.district}</span>
//                           </div>
//                         </td>
//                         <td className="px-8 py-6 whitespace-nowrap">
//                           <div className="flex items-center space-x-3">
//                             <div className="w-8 h-8 bg-gradient-to-r from-[#e64271]/20 to-[#8e1b3a]/20 rounded-lg flex items-center justify-center">
//                               <Calendar className="w-4 h-4 text-[#8e1b3a]" />
//                             </div>
//                             <span className="font-medium text-[#9f405b]">{formatDate(user.createdAt)}</span>
//                           </div>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>

//               {/* Mobile Card View */}
//               <div className="lg:hidden divide-y divide-[#e64271]/10 ">
//                 {currentUsers.map((user, index) => (
//                   <div key={user._id || index} className="p-4 sm:p-6 hover:bg-gradient-to-r hover:from-[#8e1b3a]/5 hover:to-[#e64271]/5 transition-all duration-300">
//                     <div className="flex items-start space-x-4">
//                       <div className="flex-shrink-0">
//                         <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#8e1b3a] to-[#e64271] flex items-center justify-center shadow-lg">
//                           <span className="text-white font-bold text-base sm:text-lg">
//                             {user.fullName?.charAt(0)?.toUpperCase() || 'U'}
//                           </span>
//                         </div>
//                       </div>
//                       <div className="flex-1 min-w-0 space-y-3">
//                         <div>
//                           <h3 className="text-base sm:text-lg font-bold text-[#8e1b3a] truncate">
//                             {user.fullName}
//                           </h3>
//                           <p className="text-xs sm:text-sm text-[#9f405b] font-medium">
//                             Age: {user.age} • {user.gender}
//                           </p>
//                         </div>
                        
//                         <div className="space-y-2">
//                           <div className="flex items-center space-x-2 text-xs sm:text-sm">
//                             <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-[#8e1b3a] flex-shrink-0" />
//                             <span className="text-[#8e1b3a] font-medium truncate">{user.email}</span>
//                           </div>
//                           <div className="flex items-center space-x-2 text-xs sm:text-sm">
//                             <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-[#8e1b3a] flex-shrink-0" />
//                             <span className="text-[#8e1b3a] font-medium">{user.mobileNumber}</span>
//                           </div>
//                           <div className="flex items-center space-x-2 text-xs sm:text-sm">
//                             <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-[#8e1b3a] flex-shrink-0" />
//                             <span className="text-[#8e1b3a] font-semibold">{user.district}</span>
//                           </div>
//                           <div className="flex items-center space-x-2 text-xs sm:text-sm">
//                             <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-[#8e1b3a] flex-shrink-0" />
//                             <span className="text-[#9f405b] font-medium">{formatDate(user.createdAt)}</span>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </>
//           )}

//           {users.length > usersPerPage && (
//   <div className="flex justify-center items-center mt-6 space-x-4 ">
//     <button
//       onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//       disabled={currentPage === 1}
//       className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#e64271] to-[#8e1b3a] text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
//     >
//       Previous
//     </button>
//     <span className="font-medium text-[#8e1b3a]">
//       Page {currentPage} of {totalPages}
//     </span>
//     <button
//       onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
//       disabled={currentPage === totalPages}
//       className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#e64271] to-[#8e1b3a] text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
//     >
//       Next
//     </button>
//   </div>
  
// )}

//         </div>
//       </main>
//       <Footer/>

//     </div>
//   );
// };

// export default AdminDashboard;


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, LogOut, Users, Home, Eye, Mail, Phone, Calendar, MapPin } from 'lucide-react';
import axios from 'axios';
import logo from '../assets/kim-logo.png';
import kinlogo from '../assets/kim-logo.png';
import Footer from '../components/Footer';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [downloadLoading, setDownloadLoading] = useState(false);
  const [downloadStatus, setDownloadStatus] = useState('');
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);
    
  useEffect(() => {
    // Check if admin token exists
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin-login');
      return;
    }

    // Fetch users on component mount
    fetchUsers();
  }, [navigate]);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/users`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      setUsers(response.data);
    } catch (err) {
      console.error('Error fetching users:', err);
      if (err.response?.status === 401) {
        localStorage.removeItem('adminToken');
        navigate('/admin-login');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin-login');
  };

  const handleDownloadUsers = async () => {
    setDownloadLoading(true);
    setDownloadStatus('');

    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/download-users`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          responseType: 'blob'
        }
      );

      // Create download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `registered_students_${new Date().toISOString().split('T')[0]}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      setDownloadStatus('Download completed successfully!');
      setTimeout(() => setDownloadStatus(''), 3000);
    } catch (err) {
      console.error('Download error:', err);
      if (err.response?.status === 401) {
        setDownloadStatus('Unauthorized. Please login again.');
        setTimeout(() => {
          localStorage.removeItem('adminToken');
          navigate('/admin-login');
        }, 2000);
      } else {
        setDownloadStatus('Download failed. Please try again.');
        setTimeout(() => setDownloadStatus(''), 3000);
      }
    } finally {
      setDownloadLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#fdf2f8] via-[#fce7f3] to-[#f3e8ff] flex items-center justify-center p-2 xs:p-4">
        <div className="text-center bg-white/80 backdrop-blur-sm rounded-xl xs:rounded-2xl p-6 xs:p-8 sm:p-12 shadow-2xl border border-[#e64271]/20 max-w-xs xs:max-w-sm w-full mx-2">
          <div className="relative w-10 h-10 xs:w-12 xs:h-12 sm:w-16 sm:h-16 mx-auto mb-3 xs:mb-4 sm:mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-[#8e1b3a] to-[#e64271] rounded-full animate-spin opacity-25"></div>
            <div className="absolute inset-2 bg-gradient-to-r from-[#8e1b3a] to-[#e64271] rounded-full animate-pulse"></div>
            <div className="absolute inset-4 bg-white rounded-full"></div>
          </div>
          <p className="text-[#8e1b3a] font-medium text-sm xs:text-base sm:text-lg">Loading registered users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdf2f8] via-[#fce7f3] to-[#f3e8ff]">
      {/* Header */}
      {/* <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#8e1b3a] via-[#9f405b] to-[#e64271]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center py-3 xs:py-4 sm:py-6 space-y-3 xs:space-y-0">
            <div className="flex items-center space-x-2 xs:space-x-3 sm:space-x-4 w-full xs:w-auto">
              <div className="w-auto h-12 xs:h-14 sm:h-15 rounded-lg xs:rounded-xl flex items-center justify-center">
                <img src={logo} alt="Masjid Council Kerala" className="h-12 xs:h-14 sm:h-15 w-auto" />
              </div>
              <h1 className="text-lg xs:text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-tight mt-1 xs:mt-2 sm:mt-5">
                Admin Dashboard
              </h1>
            </div>
            <div className="flex flex-col xs:flex-row items-stretch xs:items-center space-y-2 xs:space-y-0 xs:space-x-1 sm:space-x-2 w-full xs:w-auto">
              <button
                onClick={() => navigate('/')}
                className="flex items-center justify-center space-x-1 xs:space-x-2 px-3 xs:px-4 sm:px-6 py-2 sm:py-3 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all duration-300 rounded-lg xs:rounded-xl border border-white/20 hover:border-white/40 text-xs xs:text-sm sm:text-base"
              >
                <Home className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5" />
                <span className="font-medium">Home</span>
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center justify-center space-x-1 xs:space-x-2 px-3 xs:px-4 sm:px-6 py-2 sm:py-3 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all duration-300 rounded-lg xs:rounded-xl border border-white/20 hover:border-white/40 text-xs xs:text-sm sm:text-base"
              >
                <LogOut className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5" />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header> */}
            <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#8e1b3a] via-[#9f405b] to-[#e64271]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 sm:py-6 space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="w-auto h-15 sm:w-auto sm:h-15  rounded-xl flex items-center justify-center ">
                {/* <Users className="w-5 h-5 sm:w-6 sm:h-6 text-white" /> */}
              <img src={logo} alt="Masjid Council Kerala" className="h-15 w-auto " />

              </div>
              {/* <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Admin Dashboard</h1> */}
              {/* <h1 className="text-[25px] font-bold text-white tracking-tight mt-5">
  Admin Dashboard
</h1> */}
<h1 className="text-sm sm:text-base md:text-lg lg:text-[25px] font-bold text-white tracking-tight mt-9 ">
  Admin Dashboard
</h1>


            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
              <button
                onClick={() => navigate('/')}
                className="flex items-center justify-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all duration-300 rounded-xl border border-white/20 hover:border-white/40 text-sm sm:text-base"
              >
                <Home className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="font-medium">Home</span>
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center justify-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all duration-300 rounded-xl border border-white/20 hover:border-white/40 text-sm sm:text-base"
              >
                <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-4 xs:py-6 sm:py-8 px-3 xs:px-4 sm:px-6 lg:px-8 space-y-4 xs:space-y-6 sm:space-y-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-3 xs:gap-4 sm:gap-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl xs:rounded-2xl p-3 xs:p-4 sm:p-6 shadow-xl border border-[#e64271]/10 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1 mr-2">
                <p className="text-xs sm:text-sm font-medium text-[#9f405b] uppercase tracking-wider truncate">Total Students</p>
                <p className="text-xl xs:text-2xl sm:text-3xl font-bold text-[#8e1b3a] mt-1 sm:mt-2">{users.length}</p>
              </div>
              <div className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-[#8e1b3a] to-[#e64271] rounded-lg xs:rounded-xl flex items-center justify-center flex-shrink-0">
                <Users className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 text-white" />
              </div>
            </div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-xl xs:rounded-2xl p-3 xs:p-4 sm:p-6 shadow-xl border border-[#e64271]/10 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1 mr-2">
                <p className="text-xs sm:text-sm font-medium text-[#9f405b] uppercase tracking-wider truncate">New Today</p>
                <p className="text-xl xs:text-2xl sm:text-3xl font-bold text-[#8e1b3a] mt-1 sm:mt-2">
                  {users.filter(user => 
                    new Date(user.createdAt).toDateString() === new Date().toDateString()
                  ).length}
                </p>
              </div>
              <div className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-[#9f405b] to-[#e64271] rounded-lg xs:rounded-xl flex items-center justify-center flex-shrink-0">
                <Calendar className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 text-white" />
              </div>
            </div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-xl xs:rounded-2xl p-3 xs:p-4 sm:p-6 shadow-xl border border-[#e64271]/10 hover:shadow-2xl transition-all duration-300 xs:col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1 mr-2">
                <p className="text-xs sm:text-sm font-medium text-[#9f405b] uppercase tracking-wider truncate">Districts</p>
                <p className="text-xl xs:text-2xl sm:text-3xl font-bold text-[#8e1b3a] mt-1 sm:mt-2">
                  {new Set(users.map(user => user.district)).size}
                </p>
              </div>
              <div className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-[#e64271] to-[#8e1b3a] rounded-lg xs:rounded-xl flex items-center justify-center flex-shrink-0">
                <MapPin className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Download Status */}
        {downloadStatus && (
          <div className="bg-green-50 border border-green-200 text-green-800 px-3 xs:px-4 py-2 xs:py-3 rounded-lg xs:rounded-xl text-xs xs:text-sm sm:text-base mx-1 xs:mx-0">
            {downloadStatus}
          </div>
        )}

        {/* Users List */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl xs:rounded-2xl shadow-xl border border-[#e64271]/10 overflow-hidden">
          <div className="bg-gradient-to-r from-[#8e1b3a]/5 to-[#e64271]/5 px-3 xs:px-4 sm:px-8 py-3 xs:py-4 sm:py-6 border-b border-[#e64271]/10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-3 sm:space-y-0">
              {/* Left section: icon + heading */}
              <div className="flex items-center space-x-2 xs:space-x-3 sm:space-x-4">
                <div className="w-7 h-7 xs:w-8 xs:h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-[#8e1b3a] to-[#e64271] rounded-md xs:rounded-lg flex items-center justify-center">
                  <Users className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <h2 className="text-base xs:text-lg sm:text-xl font-bold text-[#8e1b3a]">Registered Students</h2>
              </div>

              {/* Right section: Download button */}
              <button
                onClick={handleDownloadUsers}
                disabled={downloadLoading}
                className="w-full sm:w-auto relative overflow-hidden bg-gradient-to-r from-[#e64271] to-[#8e1b3a] text-white font-bold py-2 xs:py-3 sm:py-4 px-4 xs:px-6 sm:px-8 rounded-lg xs:rounded-xl hover:from-[#d63968] hover:to-[#7a1632] focus:outline-none focus:ring-4 focus:ring-[#e64271]/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-1 xs:space-x-2 sm:space-x-3 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-xs xs:text-sm sm:text-base"
              >
                {downloadLoading ? (
                  <>
                    <div className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Downloading...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5" />
                    <span>Download Excel</span>
                  </>
                )}
              </button>
            </div>
          </div>
          
          {users.length === 0 ? (
            <div className="p-6 xs:p-8 sm:p-16 text-center">
              <div className="w-12 h-12 xs:w-16 xs:h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-[#8e1b3a]/10 to-[#e64271]/10 rounded-full flex items-center justify-center mx-auto mb-3 xs:mb-4 sm:mb-6">
                <Users className="w-6 h-6 xs:w-8 xs:h-8 sm:w-10 sm:h-10 text-[#9f405b]" />
              </div>
              <h3 className="text-base xs:text-lg sm:text-xl font-semibold text-[#8e1b3a] mb-2">No Students Yet</h3>
              <p className="text-[#9f405b] text-sm sm:text-base">Students will appear here once they start registering.</p>
            </div>
          ) : (
            <>
              {/* Desktop Table View */}
              <div className="hidden xl:block overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-[#8e1b3a]/5 to-[#e64271]/5">
                      <th className="px-6 py-3 text-left text-xs font-bold text-[#8e1b3a] uppercase tracking-wider">
                        Student
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-[#8e1b3a] uppercase tracking-wider">
                        Contact
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-[#8e1b3a] uppercase tracking-wider">
                        Location
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-[#8e1b3a] uppercase tracking-wider">
                        Registration Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white/50 divide-y divide-[#e64271]/10">
                    {currentUsers.map((user, index) => (
                      <tr key={user._id || index} className="hover:bg-gradient-to-r hover:from-[#8e1b3a]/5 hover:to-[#e64271]/5 transition-all duration-300 group">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-12 w-12">
                              <div className="h-12 w-12 rounded-xl bg-gradient-to-r from-[#8e1b3a] to-[#e64271] flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-105">
                                <span className="text-white font-bold text-base">
                                  {user.fullName?.charAt(0)?.toUpperCase() || 'U'}
                                </span>
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-base font-bold text-[#8e1b3a] group-hover:text-[#e64271] transition-colors">
                                {user.fullName}
                              </div>
                              <div className="text-sm text-[#9f405b] font-medium">
                                Age: {user.age} • {user.gender}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2 text-[#8e1b3a]">
                              <div className="w-6 h-6 bg-gradient-to-r from-[#e64271]/20 to-[#8e1b3a]/20 rounded-lg flex items-center justify-center">
                                <Mail className="w-3 h-3 text-[#8e1b3a]" />
                              </div>
                              <span className="font-medium text-sm">{user.email}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-[#8e1b3a]">
                              <div className="w-6 h-6 bg-gradient-to-r from-[#e64271]/20 to-[#8e1b3a]/20 rounded-lg flex items-center justify-center">
                                <Phone className="w-3 h-3 text-[#8e1b3a]" />
                              </div>
                              {user.whatsappNumber && user.whatsappNumber !== user.mobileNumber ? (
  <>
    <span className="font-medium text-sm">{user.mobileNumber}</span>
    <span className="font-medium text-sm">• WhatsApp: {user.whatsappNumber}</span>
  </>
) : (
  <span className="font-medium text-sm">Mobile & WhatsApp: {user.mobileNumber}</span>
)}

                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 bg-gradient-to-r from-[#e64271]/20 to-[#8e1b3a]/20 rounded-lg flex items-center justify-center">
                              <MapPin className="w-3 h-3 text-[#8e1b3a]" />
                            </div>
                            <span className="font-semibold text-[#8e1b3a] text-sm">{user.district}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 bg-gradient-to-r from-[#e64271]/20 to-[#8e1b3a]/20 rounded-lg flex items-center justify-center">
                              <Calendar className="w-3 h-3 text-[#8e1b3a]" />
                            </div>
                            <span className="font-medium text-[#9f405b] text-sm">{formatDate(user.createdAt)}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Tablet Table View */}
              <div className="hidden md:block xl:hidden overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-[#8e1b3a]/5 to-[#e64271]/5">
                      <th className="px-4 py-3 text-left text-xs font-bold text-[#8e1b3a] uppercase tracking-wider">
                        Student
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-bold text-[#8e1b3a] uppercase tracking-wider">
                        Contact & Location
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-bold text-[#8e1b3a] uppercase tracking-wider">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white/50 divide-y divide-[#e64271]/10">
                    {currentUsers.map((user, index) => (
                      <tr key={user._id || index} className="hover:bg-gradient-to-r hover:from-[#8e1b3a]/5 hover:to-[#e64271]/5 transition-all duration-300 group">
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-[#8e1b3a] to-[#e64271] flex items-center justify-center shadow-lg">
                                <span className="text-white font-bold text-sm">
                                  {user.fullName?.charAt(0)?.toUpperCase() || 'U'}
                                </span>
                              </div>
                            </div>
                            <div className="ml-3">
                              <div className="text-sm font-bold text-[#8e1b3a]">
                                {user.fullName}
                              </div>
                              <div className="text-xs text-[#9f405b] font-medium">
                                Age: {user.age} • {user.gender}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2 text-xs text-[#8e1b3a]">
                              <Mail className="w-3 h-3" />
                              <span className="font-medium truncate max-w-[150px]">{user.email}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-xs text-[#8e1b3a]">
                              <Phone className="w-3 h-3" />
                              <span className="font-medium">{user.mobileNumber}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-xs text-[#8e1b3a]">
                              <MapPin className="w-3 h-3" />
                              <span className="font-semibold">{user.district}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className="font-medium text-[#9f405b] text-xs">{formatDate(user.createdAt)}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className="md:hidden divide-y divide-[#e64271]/10">
                {currentUsers.map((user, index) => (
                  <div key={user._id || index} className="p-3 xs:p-4 hover:bg-gradient-to-r hover:from-[#8e1b3a]/5 hover:to-[#e64271]/5 transition-all duration-300">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 xs:h-12 xs:w-12 rounded-lg xs:rounded-xl bg-gradient-to-r from-[#8e1b3a] to-[#e64271] flex items-center justify-center shadow-lg">
                          <span className="text-white font-bold text-sm xs:text-base">
                            {user.fullName?.charAt(0)?.toUpperCase() || 'U'}
                          </span>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0 space-y-2 xs:space-y-3">
                        <div>
                          <h3 className="text-sm xs:text-base font-bold text-[#8e1b3a] truncate">
                            {user.fullName}
                          </h3>
                          <p className="text-xs text-[#9f405b] font-medium">
                            Age: {user.age} • {user.gender}
                          </p>
                        </div>
                        
                        <div className="space-y-1 xs:space-y-2">
                          <div className="flex items-center space-x-2 text-xs">
                            <Mail className="w-3 h-3 text-[#8e1b3a] flex-shrink-0" />
                            <span className="text-[#8e1b3a] font-medium truncate">{user.email}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-xs">
                            <Phone className="w-3 h-3 text-[#8e1b3a] flex-shrink-0" />
                            <span className="text-[#8e1b3a] font-medium">{user.mobileNumber}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-xs">
                            <MapPin className="w-3 h-3 text-[#8e1b3a] flex-shrink-0" />
                            <span className="text-[#8e1b3a] font-semibold">{user.district}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-xs">
                            <Calendar className="w-3 h-3 text-[#8e1b3a] flex-shrink-0" />
                            <span className="text-[#9f405b] font-medium">{formatDate(user.createdAt)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Pagination */}
          {users.length > usersPerPage && (
            <div className="flex flex-col xs:flex-row justify-center items-center p-4 xs:p-6 space-y-3 xs:space-y-0 xs:space-x-4 bg-gradient-to-r from-[#8e1b3a]/5 to-[#e64271]/5 border-t border-[#e64271]/10">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="w-full xs:w-auto px-3 xs:px-4 py-2 rounded-lg xs:rounded-xl bg-gradient-to-r from-[#e64271] to-[#8e1b3a] text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed text-xs xs:text-sm transition-all duration-300 hover:shadow-lg"
              >
                Previous
              </button>
              <span className="font-medium text-[#8e1b3a] text-xs xs:text-sm px-2">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="w-full xs:w-auto px-3 xs:px-4 py-2 rounded-lg xs:rounded-xl bg-gradient-to-r from-[#e64271] to-[#8e1b3a] text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed text-xs xs:text-sm transition-all duration-300 hover:shadow-lg"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </main>
      
      {/* Footer */}
      <div className="mt-8 xs:mt-12 sm:mt-16">
        <Footer/>
      </div>
    </div>
  );
};

export default AdminDashboard;