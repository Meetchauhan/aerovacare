// Video API service for handling video operations

const API_BASE_URL = 'http://localhost:5100/api';

/**
 * Helper function to make API calls with authentication
 * @param {string} endpoint - API endpoint
 * @param {object} options - Fetch options
 * @returns {Promise} - API response
 */
const apiCall = async (endpoint, options = {}) => {
  const token = localStorage.getItem('authToken');
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  // Remove Content-Type for FormData (let browser set it with boundary)
  if (options.body instanceof FormData) {
    delete config.headers['Content-Type'];
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};

/**
 * Video API service
 */
export const videoApi = {
  /**
   * Upload a video
   * @param {FormData} formData - FormData containing video file, title, and description
   * @returns {Promise} - Upload response
   */
  uploadVideo: async (formData) => {
    return apiCall('/videos/upload', {
      method: 'POST',
      body: formData,
    });
  },

  /**
   * Get all videos with pagination and filtering
   * @param {object} params - Query parameters
   * @param {number} params.page - Page number (default: 1)
   * @param {number} params.limit - Items per page (default: 10)
   * @param {string} params.category - Video category filter
   * @param {string} params.search - Search term
   * @returns {Promise} - Videos list response
   */
  getVideos: async (params = {}) => {
    const queryParams = new URLSearchParams();
    
    if (params.page) queryParams.append('page', params.page);
    if (params.limit) queryParams.append('limit', params.limit);
    if (params.category) queryParams.append('category', params.category);
    if (params.search) queryParams.append('search', params.search);

    const queryString = queryParams.toString();
    const endpoint = queryString ? `/videos?${queryString}` : '/videos';
    
    return apiCall(endpoint, {
      method: 'GET',
    });
  },

  /**
   * Delete a video
   * @param {string} videoId - Video ID to delete
   * @returns {Promise} - Delete response
   */
  deleteVideo: async (videoId) => {
    return apiCall(`/videos/${videoId}`, {
      method: 'DELETE',
    });
  },

  /**
   * Get video details by ID
   * @param {string} videoId - Video ID
   * @returns {Promise} - Video details response
   */
  getVideoById: async (videoId) => {
    return apiCall(`/videos/${videoId}`, {
      method: 'GET',
    });
  },

  /**
   * Update video details
   * @param {string} videoId - Video ID
   * @param {object} updateData - Updated video data
   * @returns {Promise} - Update response
   */
  updateVideo: async (videoId, updateData) => {
    return apiCall(`/videos/${videoId}`, {
      method: 'PUT',
      body: JSON.stringify(updateData),
    });
  },

  /**
   * Get video stream URL
   * @param {string} videoId - Video ID
   * @returns {string} - Video stream URL
   */
  getVideoStreamUrl: (videoId) => {
    const token = localStorage.getItem('authToken');
    return `${API_BASE_URL}/videos/stream/${videoId}${token ? `?token=${token}` : ''}`;
  },

  /**
   * Get video stream URL with headers for fetch
   * @param {string} videoId - Video ID
   * @returns {object} - Object with url and headers
   */
  getVideoStreamConfig: (videoId) => {
    const token = localStorage.getItem('authToken');
    return {
      url: `${API_BASE_URL}/videos/stream/${videoId}`,
      headers: token ? { 'Authorization': `Bearer ${token}` } : {}
    };
  },

  /**
   * Get video thumbnail URL
   * @param {string} videoId - Video ID
   * @returns {string|null} - Video thumbnail URL or null if not available
   */
  getVideoThumbnailUrl: (videoId) => {
    // Only return thumbnail URL if we're sure the endpoint exists
    // For now, return null to avoid 404 errors
    return null;
  },
};

// Video categories for filtering
export const VIDEO_CATEGORIES = {
  GENERAL: 'general',
  MEDICAL: 'medical',
  EDUCATION: 'education',
  EMERGENCY: 'emergency',
  INFRASTRUCTURE: 'infrastructure',
};

// Video status constants
export const VIDEO_STATUS = {
  UPLOADING: 'uploading',
  PROCESSING: 'processing',
  READY: 'ready',
  FAILED: 'failed',
};

// Default pagination settings
export const DEFAULT_PAGINATION = {
  page: 1,
  limit: 10,
};
