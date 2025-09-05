# Aerovacare - API Integration Guide

## Overview
The Aerovacare application has been fully integrated with your backend API endpoints. All admin authentication and profile management now uses real API calls instead of mock data.

## API Endpoints Integration

### Base URL
```
http://localhost:5100/api
```

### Integrated Endpoints

| Endpoint | Method | Purpose | Status |
|----------|--------|---------|--------|
| `/admin/register` | POST | Admin registration | ✅ Integrated |
| `/admin/login` | POST | Admin authentication | ✅ Integrated |
| `/admin/profile` | GET | Get admin profile | ✅ Integrated |
| `/admin/profile` | PUT | Update admin profile | ✅ Integrated |
| `/admin/change-password` | PUT | Change admin password | ✅ Integrated |
| `/admin/all` | GET | Get all admins | ✅ Available (not used in UI yet) |

## File Structure

```
src/
├── services/
│   └── adminApi.js              # API service functions
├── store/
│   └── authSlice.js             # Redux auth state management
├── pages/
│   ├── AdminLogin.jsx           # Login page with API integration
│   ├── AdminRegister.jsx        # Registration page
│   └── AdminDashboard.jsx       # Dashboard with profile management
├── components/
│   ├── ProtectedRoute.jsx       # Route protection
│   └── ProfileManager.jsx       # Profile management component
└── App.jsx                      # Main app with routing
```

## Features Implemented

### 1. **Admin Registration**
- **Route:** `/admin/register`
- **Features:**
  - Full form validation
  - Password confirmation
  - Real-time error handling
  - Success redirect to login
  - Professional UI design

### 2. **Admin Login**
- **Route:** `/admin/login`
- **Features:**
  - Real API authentication
  - JWT token storage
  - Persistent login state
  - Error handling
  - Loading states
  - Link to registration

### 3. **Admin Dashboard**
- **Route:** `/admin/dashboard` (Protected)
- **Features:**
  - Profile management
  - Password change functionality
  - Real-time profile updates
  - Statistics overview
  - Patient management interface

### 4. **Profile Management**
- **Features:**
  - View and edit profile information
  - Change password functionality
  - Real-time API updates
  - Form validation
  - Success/error messaging

## API Service Layer

### `adminApi.js`
Centralized API service with the following functions:

```javascript
// Registration
adminApi.register(adminData)

// Authentication
adminApi.login(credentials)

// Profile Management
adminApi.getProfile()
adminApi.updateProfile(profileData)
adminApi.changePassword(passwordData)

// Admin Management
adminApi.getAllAdmins()
```

### Features:
- Automatic token handling
- Error handling and logging
- Consistent response format
- TypeScript-ready structure

## Redux State Management

### Auth State Structure
```javascript
{
  auth: {
    user: {
      id: number,
      name: string,
      email: string,
      phone: string,
      department: string,
      role: string
    },
    token: string,
    isAuthenticated: boolean,
    loading: boolean,
    error: string | null
  }
}
```

### Available Actions
- `loginAsync(credentials)` - Login with API
- `logoutAsync()` - Logout and clear state
- `registerAsync(adminData)` - Register new admin
- `getProfileAsync()` - Fetch current profile
- `updateProfileAsync(profileData)` - Update profile
- `changePasswordAsync(passwordData)` - Change password

## Usage Instructions

### 1. **Start Your Backend Server**
Make sure your API server is running on `http://localhost:5100`

### 2. **Start the Frontend**
```bash
npm run dev
```

### 3. **Access the Application**
- **Home:** `http://localhost:5173/`
- **Admin Login:** `http://localhost:5173/admin/login`
- **Admin Register:** `http://localhost:5173/admin/register`
- **Admin Dashboard:** `http://localhost:5173/admin/dashboard`

### 4. **Test the Integration**
1. Register a new admin account
2. Login with the credentials
3. Access the dashboard
4. Update profile information
5. Change password
6. Test logout functionality

## API Request/Response Format

### Login Request
```javascript
POST /api/admin/login
{
  "email": "admin@example.com",
  "password": "password123"
}
```

### Login Response
```javascript
{
  "success": true,
  "token": "jwt-token-here",
  "user": {
    "id": 1,
    "name": "Admin User",
    "email": "admin@example.com",
    "phone": "+1234567890",
    "department": "IT",
    "role": "admin"
  }
}
```

### Profile Update Request
```javascript
PUT /api/admin/profile
{
  "name": "Updated Name",
  "email": "updated@example.com",
  "phone": "+1234567890",
  "department": "Updated Department"
}
```

### Password Change Request
```javascript
PUT /api/admin/change-password
{
  "currentPassword": "oldpassword",
  "newPassword": "newpassword123"
}
```

## Error Handling

The application handles various error scenarios:

1. **Network Errors** - Connection issues with the API
2. **Authentication Errors** - Invalid credentials
3. **Validation Errors** - Form validation failures
4. **Server Errors** - Backend server issues
5. **Token Expiration** - Automatic logout on token expiry

## Security Features

1. **JWT Token Storage** - Secure token management
2. **Protected Routes** - Authentication required for admin areas
3. **Automatic Logout** - On token expiration or errors
4. **Input Validation** - Client-side and server-side validation
5. **Password Requirements** - Minimum length and confirmation

## Development Notes

- All API calls include proper error handling
- Loading states are shown during API requests
- User feedback is provided for all actions
- The application gracefully handles API failures
- Token is automatically included in authenticated requests
- Profile data is cached in Redux and localStorage

## Future Enhancements

1. **Admin Management** - Use `/admin/all` endpoint for admin list
2. **Role-based Access** - Implement different permission levels
3. **Audit Logging** - Track admin actions
4. **Two-factor Authentication** - Enhanced security
5. **Password Reset** - Forgot password functionality

## Troubleshooting

### Common Issues

1. **API Connection Failed**
   - Check if backend server is running on port 5100
   - Verify CORS settings in your backend
   - Check network connectivity

2. **Authentication Errors**
   - Verify API endpoint responses match expected format
   - Check token handling in browser developer tools
   - Ensure proper error message handling

3. **Profile Update Issues**
   - Verify API accepts the data format being sent
   - Check for required fields in your backend validation
   - Ensure proper error response format

### Debug Mode
Enable console logging by checking browser developer tools for detailed API request/response information.
