const API_BASE_URL = 'http://localhost:5100/api';

// Helper function to make API calls
const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = localStorage.getItem('authToken');
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  };

  const config = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};

// Admin API functions
export const adminApi = {
  // Register new admin
  register: async (adminData) => {
    return apiCall('/admin/register', {
      method: 'POST',
      body: JSON.stringify(adminData),
    });
  },

  // Login admin
  login: async (credentials) => {
    return apiCall('/admin/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  // Get admin profile
  getProfile: async () => {
    return apiCall('/admin/profile');
  },

  // Update admin profile
  updateProfile: async (profileData) => {
    return apiCall('/admin/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  },

  // Change admin password
  changePassword: async (passwordData) => {
    return apiCall('/admin/change-password', {
      method: 'PUT',
      body: JSON.stringify(passwordData),
    });
  },

  // Get all admins (for super admin)
  getAllAdmins: async () => {
    return apiCall('/admin/all');
  },
};

export default adminApi;
