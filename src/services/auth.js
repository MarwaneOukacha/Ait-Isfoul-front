import axiosInstance from '../services/axiosInstance';

import CryptoJS from 'crypto-js';

const API_BASE = 'http://localhost:8088'; // your API base URL
const TOKEN_KEY = 'auth_token';
const REFRESH_KEY = 'refresh_token';
const SECRET_KEY = 'AERF3456sd34TG@2&è(--+à@fjffkdz,'; //replace with a secure key

// Encrypt & store token
const saveToken = (token, refreshToken) => {
  const encrypted = CryptoJS.AES.encrypt(token, SECRET_KEY).toString();
  const encryptedRefresh = CryptoJS.AES.encrypt(refreshToken, SECRET_KEY).toString();
  localStorage.setItem(TOKEN_KEY, encrypted);
  localStorage.setItem(REFRESH_KEY, encryptedRefresh);
};

const getToken = () => {
  const encrypted = localStorage.getItem(TOKEN_KEY);
  if (!encrypted) return null;
  try {
    return CryptoJS.AES.decrypt(encrypted, SECRET_KEY).toString(CryptoJS.enc.Utf8);
  } catch (e) {
    return null;
  }
};

const getRefreshToken = () => {
  const encrypted = localStorage.getItem(REFRESH_KEY);
  if (!encrypted) return null;
  try {
    return CryptoJS.AES.decrypt(encrypted, SECRET_KEY).toString(CryptoJS.enc.Utf8);
  } catch (e) {
    return null;
  }
};

const clearTokens = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_KEY);
};

export const login = async ({ email, password }) => {
  try {
    const response = await axiosInstance.post(`${API_BASE}/login`, { email, password });
    const { access_token, refresh_token } = response.data;
    saveToken(access_token, refresh_token);
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || 'Login failed');
  }
};

export const refreshToken = async () => {
  const token = getRefreshToken();
  if (!token) throw new Error('No refresh token found');

  try {
    const response = await axiosInstance.post(`${API_BASE}/refresh-token?refreshToken=${token}`);
    const { access_token, refresh_token } = response.data;
    saveToken(access_token, refresh_token);
    return access_token;
  } catch (err) {
    clearTokens();
    throw new Error('Token refresh failed');
  }
};

export const logout = () => {
  clearTokens();
};

export const getAuthToken = () => getToken();
