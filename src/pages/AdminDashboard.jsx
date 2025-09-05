import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import { Link, useNavigate } from "react-router-dom";
import ProfileManager from "../components/ProfileManager";
import TokenValidator from "../components/TokenValidator";
import VideoManager from "../components/VideoManager";

export default function AdminDashboard() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  const handleLogout = () => {
    dispatch(logout());
    navigate("/admin/login");
  };

  const stats = [
    { title: "Total Patients", value: "2,847", change: "+12%", color: "blue" },
    { title: "Active Cases", value: "156", change: "+3%", color: "green" },
    { title: "Completed Treatments", value: "2,691", change: "+8%", color: "purple" },
    { title: "New Cases This Month", value: "23", change: "-2%", color: "orange" }
  ];

  const recentPatients = [
    { id: 1, name: "John Doe", status: "Active", lastVisit: "2024-01-15", progress: 75 },
    { id: 2, name: "Jane Smith", status: "Completed", lastVisit: "2024-01-10", progress: 100 },
    { id: 3, name: "Mike Johnson", status: "Active", lastVisit: "2024-01-12", progress: 45 },
    { id: 4, name: "Sarah Wilson", status: "Pending", lastVisit: "2024-01-08", progress: 20 }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: "bg-blue-500 text-white",
      green: "bg-green-500 text-white",
      purple: "bg-purple-500 text-white",
      orange: "bg-orange-500 text-white"
    };
    return colors[color] || colors.blue;
  };

  const getStatusColor = (status) => {
    const colors = {
      Active: "bg-green-100 text-green-800",
      Completed: "bg-blue-100 text-blue-800",
      Pending: "bg-yellow-100 text-yellow-800"
    };
    return colors[status] || colors.Pending;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <img 
                src="https://cdn-icons-png.flaticon.com/512/3774/3774299.png" 
                alt="Aerovacare Logo" 
                className="h-8 w-8 object-contain mr-3"
              />
              <h1 className="text-xl font-bold text-gray-900">Aerovacare Admin</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, {user?.name}</span>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-md text-sm hover:bg-red-700 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: "overview", label: "Overview" },
              { id: "patients", label: "Patients" },
              { id: "videos", label: "Videos" },
              { id: "reports", label: "Reports" },
              { id: "settings", label: "Settings" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h2>
            
            {/* Token Validator Component for Testing */}
            <TokenValidator />
            
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <div className={`p-3 rounded-full ${getColorClasses(stat.color)}`}>
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                      <p className="text-sm text-green-600">{stat.change} from last month</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Patients */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Recent Patients</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Patient
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Last Visit
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Progress
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recentPatients.map((patient) => (
                      <tr key={patient.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{patient.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(patient.status)}`}>
                            {patient.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {patient.lastVisit}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full" 
                                style={{ width: `${patient.progress}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-500">{patient.progress}%</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Patients Tab */}
        {activeTab === "patients" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Patient Management</h2>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
                Add New Patient
              </button>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-600">Patient management features will be implemented here.</p>
            </div>
          </div>
        )}

        {/* Videos Tab */}
        {activeTab === "videos" && (
          <div>
            <VideoManager />
          </div>
        )}

        {/* Reports Tab */}
        {activeTab === "reports" && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Reports & Analytics</h2>
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-600">Reports and analytics features will be implemented here.</p>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === "settings" && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile Settings</h2>
            <div className="bg-white rounded-lg shadow p-6">
              <ProfileManager />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
