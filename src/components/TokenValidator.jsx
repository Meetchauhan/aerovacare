import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getStoredToken, getStoredUser, isValidToken, isAuthenticated } from '../utils/authUtils';

export default function TokenValidator() {
  const { user, token, isAuthenticated: reduxAuth } = useSelector((state) => state.auth);
  const [localStorageStatus, setLocalStorageStatus] = useState({
    token: null,
    user: null,
    isValid: false,
    isAuth: false
  });

  useEffect(() => {
    const checkLocalStorage = () => {
      const storedToken = getStoredToken();
      const storedUser = getStoredUser();
      const valid = isValidToken(storedToken);
      const auth = isAuthenticated();

      setLocalStorageStatus({
        token: storedToken,
        user: storedUser,
        isValid: valid,
        isAuth: auth
      });
    };

    checkLocalStorage();
    // Check every 2 seconds
    const interval = setInterval(checkLocalStorage, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-100 p-4 rounded-lg mb-6">
      <h3 className="text-lg font-semibold mb-4">Token Validation Status</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Redux State */}
        <div className="bg-white p-4 rounded-lg">
          <h4 className="font-medium text-blue-600 mb-2">Redux State</h4>
          <div className="space-y-2 text-sm">
            <div>
              <span className="font-medium">Authenticated:</span>
              <span className={`ml-2 px-2 py-1 rounded text-xs ${
                reduxAuth ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {reduxAuth ? 'Yes' : 'No'}
              </span>
            </div>
            <div>
              <span className="font-medium">Token:</span>
              <span className="ml-2 text-gray-600">
                {token ? `${token.substring(0, 20)}...` : 'None'}
              </span>
            </div>
            <div>
              <span className="font-medium">User:</span>
              <span className="ml-2 text-gray-600">
                {user ? user.name || user.email : 'None'}
              </span>
            </div>
          </div>
        </div>

        {/* LocalStorage State */}
        <div className="bg-white p-4 rounded-lg">
          <h4 className="font-medium text-purple-600 mb-2">LocalStorage State</h4>
          <div className="space-y-2 text-sm">
            <div>
              <span className="font-medium">Authenticated:</span>
              <span className={`ml-2 px-2 py-1 rounded text-xs ${
                localStorageStatus.isAuth ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {localStorageStatus.isAuth ? 'Yes' : 'No'}
              </span>
            </div>
            <div>
              <span className="font-medium">Token Valid:</span>
              <span className={`ml-2 px-2 py-1 rounded text-xs ${
                localStorageStatus.isValid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {localStorageStatus.isValid ? 'Yes' : 'No'}
              </span>
            </div>
            <div>
              <span className="font-medium">Token:</span>
              <span className="ml-2 text-gray-600">
                {localStorageStatus.token ? `${localStorageStatus.token.substring(0, 20)}...` : 'None'}
              </span>
            </div>
            <div>
              <span className="font-medium">User:</span>
              <span className="ml-2 text-gray-600">
                {localStorageStatus.user ? localStorageStatus.user.name || localStorageStatus.user.email : 'None'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Overall Status */}
      <div className="mt-4 p-3 rounded-lg bg-blue-50">
        <div className="flex items-center">
          <span className="font-medium text-blue-800">Overall Authentication Status:</span>
          <span className={`ml-2 px-3 py-1 rounded text-sm font-medium ${
            reduxAuth && localStorageStatus.isAuth ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {reduxAuth && localStorageStatus.isAuth ? 'Authenticated' : 'Not Authenticated'}
          </span>
        </div>
        <p className="text-sm text-blue-700 mt-1">
          Both Redux state and localStorage must be valid for authentication.
        </p>
      </div>
    </div>
  );
}
