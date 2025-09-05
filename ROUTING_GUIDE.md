# Aerovacare Application - Routing & State Management Guide

## Overview
This application has been restructured to include:
- **React Router DOM** for client-side routing
- **Redux Toolkit** for global state management
- **React Redux** for connecting React components to Redux store
- **Protected routes** for admin authentication

## Project Structure

```
src/
├── components/
│   └── ProtectedRoute.jsx     # Component for protecting admin routes
├── pages/
│   ├── Home.jsx              # Landing page (public)
│   ├── AdminLogin.jsx        # Admin login page (public)
│   └── AdminDashboard.jsx    # Admin dashboard (protected)
├── store/
│   ├── index.js              # Redux store configuration
│   └── authSlice.js          # Authentication state management
└── App.jsx                   # Main app with routing setup
```

## Routes

### Public Routes
- `/` - Home page (landing page)
- `/admin/login` - Admin login page

### Protected Routes
- `/admin/dashboard` - Admin dashboard (requires authentication)

## Authentication

### Demo Credentials
- **Email:** admin@aerovacare.com
- **Password:** admin123

### Features
- Login/logout functionality
- Persistent authentication (localStorage)
- Protected route access
- Automatic redirect to login for unauthorized access

## State Management

### Redux Store Structure
```javascript
{
  auth: {
    user: null | { id, email, name, role },
    token: null | string,
    isAuthenticated: boolean,
    loading: boolean,
    error: null | string
  }
}
```

### Available Actions
- `login(user, token)` - Login user
- `logout()` - Logout user
- `clearError()` - Clear authentication errors
- `initializeAuth()` - Initialize auth from localStorage

## Usage

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Access the application:**
   - Home page: `http://localhost:5173/`
   - Admin login: `http://localhost:5173/admin/login`
   - Admin dashboard: `http://localhost:5173/admin/dashboard` (requires login)

3. **Navigation:**
   - Use the "Admin" link in the navigation to access admin login
   - After successful login, you'll be redirected to the dashboard
   - Use the logout button in the dashboard to sign out

## Key Features

### Home Page
- Complete landing page with all original content
- Navigation includes link to admin login
- Responsive design with Tailwind CSS

### Admin Login
- Clean, professional login form
- Form validation and error handling
- Demo credentials provided
- Automatic redirect after successful login

### Admin Dashboard
- Comprehensive dashboard with multiple tabs
- Statistics overview with patient data
- Recent patients table
- Tabbed interface for different admin functions
- Logout functionality

### Protected Routes
- Automatic redirect to login for unauthenticated users
- Loading states during authentication checks
- Persistent login state across browser sessions

## Development Notes

- All components use functional components with React hooks
- Redux Toolkit provides modern Redux patterns with less boilerplate
- React Router v6 is used for routing
- Tailwind CSS is used for styling
- The application is fully responsive and mobile-friendly
