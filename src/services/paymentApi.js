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

// Payment API functions
export const paymentApi = {
  // Create payment intent
  createPaymentIntent: async (paymentData) => {
    // Transform data to match backend API requirements
    const requestData = {
      amount: paymentData.amount / 100, // Convert from cents to dollars
      name: paymentData.donorName,
      email: paymentData.donorEmail
    };
    
    return apiCall('/payment/create-intent', {
      method: 'POST',
      body: JSON.stringify(requestData),
    });
  },

  // Confirm payment
  confirmPayment: async (paymentIntentId) => {
    return apiCall('/payment/confirm', {
      method: 'POST',
      body: JSON.stringify({ paymentIntentId }),
    });
  },

  // Get donation details
  getDonationDetails: async (donationId) => {
    return apiCall(`/payment/donation/${donationId}`);
  },

  // Get all donations (Admin only)
  getAllDonations: async (params = {}) => {
    const queryParams = new URLSearchParams(params).toString();
    const endpoint = queryParams ? `/payment/donations?${queryParams}` : '/payment/donations';
    return apiCall(endpoint);
  },

  // Get payment statistics (Admin only)
  getPaymentStats: async () => {
    return apiCall('/payment/stats');
  },
};

// Donation types configuration
export const DONATION_TYPES = {
  GENERAL: 'general',
  EMERGENCY: 'emergency',
  MEDICAL: 'medical',
  EDUCATION: 'education',
  INFRASTRUCTURE: 'infrastructure'
};

// Supported currencies
export const SUPPORTED_CURRENCIES = {
  USD: 'usd',
  EUR: 'eur',
  GBP: 'gbp',
  CAD: 'cad',
  AUD: 'aud'
};

// Payment limits
export const PAYMENT_LIMITS = {
  MIN: 0.50,
  MAX: 1000000
};

export default paymentApi;
