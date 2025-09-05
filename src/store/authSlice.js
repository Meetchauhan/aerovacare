import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { adminApi } from '../services/adminApi';
import { storeAuthData, clearAuthData, getStoredToken, getStoredUser } from '../utils/authUtils';

// Async thunk for login
export const loginAsync = createAsyncThunk(
  'auth/loginAsync',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await adminApi.login(credentials);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for logout
export const logoutAsync = createAsyncThunk(
  'auth/logoutAsync',
  async (_, { rejectWithValue }) => {
    try {
      // For now, just clear local storage
      // In a real app, you might want to call a logout endpoint
      clearAuthData();
      return true;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for getting profile
export const getProfileAsync = createAsyncThunk(
  'auth/getProfileAsync',
  async (_, { rejectWithValue }) => {
    try {
      const response = await adminApi.getProfile();
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for updating profile
export const updateProfileAsync = createAsyncThunk(
  'auth/updateProfileAsync',
  async (profileData, { rejectWithValue }) => {
    try {
      const response = await adminApi.updateProfile(profileData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for changing password
export const changePasswordAsync = createAsyncThunk(
  'auth/changePasswordAsync',
  async (passwordData, { rejectWithValue }) => {
    try {
      const response = await adminApi.changePassword(passwordData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for registering new admin
export const registerAsync = createAsyncThunk(
  'auth/registerAsync',
  async (adminData, { rejectWithValue }) => {
    try {
      const response = await adminApi.register(adminData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.error = null;
      // Store in localStorage for persistence
      localStorage.setItem('authToken', action.payload.token);
      localStorage.setItem('user', JSON.stringify(action.payload.user));
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      // Clear localStorage using utility function
      clearAuthData();
    },
    clearError: (state) => {
      state.error = null;
    },
    // Initialize auth state from localStorage
    initializeAuth: (state) => {
      const token = getStoredToken();
      const user = getStoredUser();
      
      if (token && user) {
        state.token = token;
        state.user = user;
        state.isAuthenticated = true;
      } else {
        // Clear invalid or missing token
        clearAuthData();
        state.token = null;
        state.user = null;
        state.isAuthenticated = false;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      // Login async
      .addCase(loginAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.loading = false;
        // Handle the API response format: { success, message, data: { admin, token } }
        const responseData = action.payload.data || action.payload;
        state.user = responseData.admin;
        state.token = responseData.token;
        state.isAuthenticated = true;
        state.error = null;
        // Store in localStorage for persistence using utility function
        storeAuthData(responseData.token, responseData.admin);
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })
      // Logout async
      .addCase(logoutAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutAsync.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.error = null;
        // Clear localStorage using utility function
        clearAuthData();
      })
      .addCase(logoutAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get Profile async
      .addCase(getProfileAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProfileAsync.fulfilled, (state, action) => {
        state.loading = false;
        // Handle the API response format: { success, message, data: { admin } }
        const responseData = action.payload.data || action.payload;
        state.user = responseData.admin || responseData.user;
        state.error = null;
        // Update localStorage using utility function
        storeAuthData(state.token, responseData.admin || responseData.user);
      })
      .addCase(getProfileAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Profile async
      .addCase(updateProfileAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfileAsync.fulfilled, (state, action) => {
        state.loading = false;
        // Handle the API response format: { success, message, data: { admin } }
        const responseData = action.payload.data || action.payload;
        state.user = responseData.admin || responseData.user;
        state.error = null;
        // Update localStorage using utility function
        storeAuthData(state.token, responseData.admin || responseData.user);
      })
      .addCase(updateProfileAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Change Password async
      .addCase(changePasswordAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changePasswordAsync.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(changePasswordAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Register async
      .addCase(registerAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerAsync.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        // Note: Registration might not automatically log in the user
        // depending on your API design
      })
      .addCase(registerAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { login, logout, clearError, initializeAuth } = authSlice.actions;
export default authSlice.reducer;
