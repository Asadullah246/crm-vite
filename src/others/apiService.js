import axios from 'axios';

// Create an Axios instance
const api = axios.create({
  // baseURL: 'http://localhost:7000/api/v1',
  baseURL: 'https://crmbackend.amsisecurity.co.uk/api/v1',
  timeout: 10000, // Optional timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercept requests (optional)
api.interceptors.request.use(
  (config) => {
    // You can add authorization tokens here, if needed
    // config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Intercept responses (optional)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle response errors globally
    if (error.response) {
      console.error('Error Response:', error.response.data);
    } else if (error.request) {
      console.error('No Response Received:', error.request);
    } else {
      console.error('Error Setting Up Request:', error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
