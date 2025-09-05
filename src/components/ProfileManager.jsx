import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfileAsync, changePasswordAsync } from '../store/authSlice';

export default function ProfileManager() {
  const { user, loading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  
  const [activeTab, setActiveTab] = useState('profile');
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        department: user.department || '',
      });
    }
  }, [user]);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setMessage('');
    
    try {
      const result = await dispatch(updateProfileAsync(profileData));
      if (updateProfileAsync.fulfilled.match(result)) {
        setMessage('Profile updated successfully!');
        // No need to refresh profile data - updateProfileAsync already updates the Redux state
      } else {
        setMessage('Failed to update profile: ' + (result.payload || 'Unknown error'));
      }
    } catch (err) {
      setMessage('Failed to update profile: ' + err.message);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setMessage('');
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage('New passwords do not match');
      return;
    }
    
    if (passwordData.newPassword.length < 6) {
      setMessage('New password must be at least 6 characters long');
      return;
    }
    
    try {
      const result = await dispatch(changePasswordAsync({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      }));
      
      if (changePasswordAsync.fulfilled.match(result)) {
        setMessage('Password changed successfully!');
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        });
      } else {
        setMessage('Failed to change password: ' + (result.payload || 'Unknown error'));
      }
    } catch (err) {
      setMessage('Failed to change password: ' + err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex space-x-4 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('profile')}
          className={`py-2 px-1 border-b-2 font-medium text-sm ${
            activeTab === 'profile'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          Profile Information
        </button>
        <button
          onClick={() => setActiveTab('password')}
          className={`py-2 px-1 border-b-2 font-medium text-sm ${
            activeTab === 'password'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          Change Password
        </button>
      </div>

      {message && (
        <div className={`p-4 rounded-lg ${
          message.includes('successfully') 
            ? 'bg-green-50 border border-green-200 text-green-700'
            : 'bg-red-50 border border-red-200 text-red-700'
        }`}>
          {message}
        </div>
      )}

      {activeTab === 'profile' && (
        <form onSubmit={handleProfileUpdate} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                value={profileData.name}
                onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={profileData.email}
                onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                value={profileData.phone}
                onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-2">
                Department
              </label>
              <input
                type="text"
                id="department"
                value={profileData.department}
                onChange={(e) => setProfileData({...profileData, department: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Updating...' : 'Update Profile'}
            </button>
          </div>
        </form>
      )}

      {activeTab === 'password' && (
        <form onSubmit={handlePasswordChange} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Current Password
              </label>
              <input
                type="password"
                id="currentPassword"
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                minLength={6}
              />
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                minLength={6}
              />
            </div>
          </div>
          
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Changing...' : 'Change Password'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
