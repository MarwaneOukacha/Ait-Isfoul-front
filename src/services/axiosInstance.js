import axios from 'axios';
import { getAuthToken, refreshToken, logout } from '../services/auth';

const SKIP_AUTH_PATHS = ['/login', '/refresh-token','/customers/add','/rooms/search/hotel','/rooms/isRoomAvailable','/rooms/room/','/email/contact'];

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8088',
});

// Request interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
    const skipAuth = SKIP_AUTH_PATHS.some(path => config.url.startsWith(path));
    if (!skipAuth) {
      const token = getAuthToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log('Attached token to request:', token);
      } else {
        console.warn('No token found');
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);


// Response interceptor for handling expired tokens
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newToken = await refreshToken();
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        logout();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
