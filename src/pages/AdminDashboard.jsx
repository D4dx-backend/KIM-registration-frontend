import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, LogOut, Users, Home, Eye, Mail, Phone, Calendar, MapPin } from 'lucide-react';
import axios from 'axios';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [downloadLoading, setDownloadLoading] = useState(false);
  const [downloadStatus, setDownloadStatus] = useState('');
  const navigate = useNavigate();

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
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading registered users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <div className="flex items-center space-x-2 bg-blue-100 px-3 py-1 rounded-full">
                <Users className="w-4 h-4 text-blue-600" />
                <span className="text-blue-600 font-medium">{users.length} Registered Users</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/')}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Home className="w-5 h-5" />
                <span>Home</span>
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:text-red-700 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Download Section */}
        <div className="mb-8 bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Export Data</h2>
              <p className="text-gray-600">Download all registered students as an Excel file</p>
            </div>
            <button
              onClick={handleDownloadUsers}
              disabled={downloadLoading}
              className="bg-blue-600 text-white font-medium py-2 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {downloadLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Downloading...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Download Excel</span>
                </>
              )}
            </button>
          </div>
          {downloadStatus && (
            <p className={`mt-3 text-sm ${downloadStatus.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>
              {downloadStatus}
            </p>
          )}
        </div>

        {/* Users List */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Registered Students</h2>
          </div>
          
          {users.length === 0 ? (
            <div className="p-8 text-center">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No students registered yet.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Student
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Registration Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user, index) => (
                    <tr key={user._id || index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                              <span className="text-white font-medium text-sm">
                                {user.fullName?.charAt(0)?.toUpperCase() || 'U'}
                              </span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {user.fullName}
                            </div>
                            <div className="text-sm text-gray-500">
                              Age: {user.age} • {user.gender}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          <div className="flex items-center space-x-1 mb-1">
                            <Mail className="w-3 h-3 text-gray-400" />
                            <span>{user.email}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Phone className="w-3 h-3 text-gray-400" />
                            <span>{user.mobileNumber}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-3 h-3 text-gray-400" />
                            <span>{user.district}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3 text-gray-400" />
                          <span>{formatDate(user.createdAt)}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard; 