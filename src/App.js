import React, { useEffect, useState } from 'react';
import './App.css';
import Login from './Components/Login/Login';
import Home from './Components/Home/Home';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';


// Main App component wrapped inside Router
function App() {
  return (
    <Router>
        <AuthenticatedApp />
    </Router>
  );
}

// This component handles routing and authentication logic
function AuthenticatedApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(null); // Initially null for loading state
  const navigate = useNavigate(); // Hook to navigate

  useEffect(() => {
    // Check if there's session data
    const sessionData = sessionStorage.getItem('authToken'); // Check for session data
    if (sessionData) {
      setIsLoggedIn(true); // User is logged in
    } else {
      setIsLoggedIn(false); // User is not logged in
      navigate('/login'); // Redirect to login if no session
    }
  }, [navigate]);

  if (isLoggedIn === null) {
    return <div>Loading...</div>; // Loading state until session check is complete
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      {/* Protect /home route and redirect to /login if not logged in */}
      <Route path="/home" element={<PrivateRoute isLoggedIn={isLoggedIn} Component={Home} />} />
      <Route path="/" element={isLoggedIn ? <Home /> : <Login />} /> {/* Default route */}
    </Routes>
  );
}

// PrivateRoute component that redirects to login if not authenticated
function PrivateRoute({ isLoggedIn, Component }) {
  if (!isLoggedIn) {
    return null; // If not logged in, nothing is rendered, so no route is shown
  }
  return <Component />;
}

export default App;
