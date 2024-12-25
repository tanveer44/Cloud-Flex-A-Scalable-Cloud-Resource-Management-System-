import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client'; // Correct import for React 18
import { BrowserRouter as Router, Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import FileManagerPage from './pages/FileManagerPage';
import FileUpload from './pages/FileUpload';

const DashboardPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login');
    }, 3000); // 3 seconds delay

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div style={dashboardStyle}>
      <h1>Cloudflex MultiCloud File Manager</h1>
      <p>Welcome to your multi-cloud file management platform.</p>
      <p>Redirecting to Login page...</p>
    </div>
  );
};

const dashboardStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  height: '100vh',
  backgroundColor: '#f0f4f8',
  textAlign: 'center',
};

const App = () => {
  const location = useLocation();

  useEffect(() => {
    // Map of routes to background colors
    const routeBackgrounds = {
      
    };

    // Apply the background color
    const backgroundColor = routeBackgrounds[location.pathname] || '#ffffff'; // Default to white
    document.body.style.backgroundColor = backgroundColor;

    console.log(`Route: ${location.pathname}, Background: ${backgroundColor}`); // Debugging logs

    // Cleanup to reset background color (optional)
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, [location]);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/file-upload" element={<FileUpload />} />
      <Route path="/file-manager" element={<FileManagerPage />} />
      <Route path="/" element={<DashboardPage />} /> {/* Default route to dashboard */}
    </Routes>
  );
};

// Render App
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <App />
  </Router>
);
