import axios from 'axios';

// Create a custom Axios instance
const axiosInstance = axios.create({
  baseURL: 'https://pel-gel-backend.onrender.com/v1/api', // Set your API base URL here
  // baseURL: 'http://localhost:5000/v1/api', // Set your API base URL here
  headers: {
    'Content-Type': 'application/json', // Adjust headers if needed
  },
});

// Request Interceptor: Adds the token to each request
axiosInstance.interceptors.request.use(
  (config) => {
    // Retrieve the token from sessionStorage (or localStorage if preferred)
    const token = sessionStorage.getItem('authToken');
    
    if (token) {
      // Attach token to Authorization header
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);

// Response Interceptor: Handles API responses (error handling, etc.)
axiosInstance.interceptors.response.use(
  (response) => {
    // If needed, manipulate the response data here (e.g., logging)
    return response;
  },
  (error) => {
    // Global error handling (for all API calls)
    if (error.response && error.response.status === 401) {
      // If token is expired or unauthorized, clear the session and redirect to login
      sessionStorage.removeItem('authToken');
      window.location.href = '/login'; // Or navigate using react-router
    } else {
      // Handle other types of errors (network, 404, etc.)
      console.error('API Error:', error.response || error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
