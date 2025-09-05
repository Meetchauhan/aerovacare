// Utility functions for authentication

/**
 * Check if a token is valid (not null, undefined, or empty)
 * @param {string} token - The token to validate
 * @returns {boolean} - True if token is valid, false otherwise
 */
export const isValidToken = (token) => {
  return token && 
         token !== 'null' && 
         token !== 'undefined' && 
         token.trim() !== '' && 
         token.length > 0;
};

/**
 * Get token from localStorage with validation
 * @returns {string|null} - Valid token or null
 */
export const getStoredToken = () => {
  const token = localStorage.getItem('authToken');
  return isValidToken(token) ? token : null;
};

/**
 * Get user from localStorage with validation
 * @returns {object|null} - User object or null
 */
export const getStoredUser = () => {
  const user = localStorage.getItem('user');
  if (!user) return null;
  
  try {
    const parsedUser = JSON.parse(user);
    return parsedUser;
  } catch (error) {
    console.error('Error parsing user from localStorage:', error);
    // Clear invalid user data
    localStorage.removeItem('user');
    return null;
  }
};

/**
 * Check if user is authenticated based on localStorage
 * @returns {boolean} - True if authenticated, false otherwise
 */
export const isAuthenticated = () => {
  const token = getStoredToken();
  const user = getStoredUser();
  return !!(token && user);
};

/**
 * Clear all authentication data from localStorage
 */
export const clearAuthData = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');
};

/**
 * Store authentication data in localStorage
 * @param {string} token - JWT token
 * @param {object} user - User object
 */
export const storeAuthData = (token, user) => {
  if (isValidToken(token) && user) {
    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify(user));
  }
};
