import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginAsync } from "../store/authSlice";

export default function AdminLogin() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await dispatch(loginAsync(formData));
      
      if (loginAsync.fulfilled.match(result)) {
        navigate("/admin/dashboard");
      } else {
        setError(result.payload || "Login failed. Please try again.");
      }
    } catch {
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-blue-400 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="flex justify-center">
            <div className="bg-white p-4 rounded-full shadow-lg">
              <img 
                src="https://cdn-icons-png.flaticon.com/512/3774/3774299.png" 
                alt="Aerovacare Logo" 
                className="h-16 w-16 object-contain"
              />
            </div>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white drop-shadow-lg">
            Admin Login
          </h2>
          <p className="mt-2 text-center text-lg text-blue-100 drop-shadow">
            Sign in to access the admin dashboard
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-2xl p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                <div className="flex">
                  <svg className="w-5 h-5 text-red-400 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  {error}
                </div>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
              >
                {loading ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </div>
                ) : (
                  "Sign in"
                )}
              </button>
            </div>

            <div className="text-center space-y-2">
              <Link 
                to="/admin/register" 
                className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500 transition"
              >
                Don't have an account? Register here
              </Link>
              <div>
                <Link 
                  to="/" 
                  className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-500 transition"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to Home
                </Link>
              </div>
            </div>
          </form>
        </div>

        <div className="bg-blue-600 bg-opacity-20 backdrop-blur-sm rounded-lg p-6 border border-white border-opacity-30">
          <h3 className="text-white font-semibold mb-3 text-center">API Integration</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between bg-blue-600 bg-opacity-10 rounded-lg p-3">
              <span className="text-blue-100 font-medium">API Endpoint:</span>
              <span className="text-white font-mono text-xs">POST /api/admin/login</span>
            </div>
            <div className="flex items-center justify-between bg-blue-600 bg-opacity-10 rounded-lg p-3">
              <span className="text-blue-100 font-medium">Server:</span>
              <span className="text-white font-mono text-xs">localhost:5100</span>
            </div>
          </div>
          <p className="text-blue-100 text-sm mt-3 text-center">
            Use your registered admin credentials to login
          </p>
        </div>
      </div>
    </div>
  );
}
