import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { isAuthenticated as checkLocalStorageAuth } from '../utils/authUtils';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading, isInitialized } = useSelector((state) => state.auth);
  const location = useLocation();

  // Show loading spinner while auth is being initialized or while loading
  if (loading || !isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Check both Redux state and localStorage for authentication
  const isAuth = isAuthenticated && checkLocalStorageAuth();

  if (!isAuth) {
    // Redirect to login page with return url
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
