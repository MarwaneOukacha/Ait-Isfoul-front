import React from 'react';
import { Navigate } from 'react-router-dom';
import { getAuthToken } from '../services/auth'; 
import { jwtDecode } from 'jwt-decode';



const isTokenExpired = (token) => {
  try {
    const decoded = jwtDecode(token);
    if (!decoded.exp) return false;
    return decoded.exp * 1000 < Date.now(); 
  } catch (e) {
    return true;
  }
};

const ProtectedRoute = ({ children }) => {
  const token = getAuthToken();
  if (!token || isTokenExpired(token)) {
    return <Navigate to="/Login" replace />;
  }
  return children;
};

export default ProtectedRoute;
