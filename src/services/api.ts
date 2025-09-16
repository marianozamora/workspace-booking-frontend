import axios from 'axios';

// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
  API_KEY:
    import.meta.env.VITE_API_KEY || 'default-api-key-change-in-production',
  TIMEOUT: 10000,
} as const;

// Create axios instance with default configuration
export const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': API_CONFIG.API_KEY,
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    // Handle common error cases
    if (error.response?.status === 401) {
      // Handle authentication failure silently or with proper error handling
    }

    return Promise.reject(error);
  }
);

export default apiClient;
