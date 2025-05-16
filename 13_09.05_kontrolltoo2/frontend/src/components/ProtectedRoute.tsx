import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }: { children: React.ReactElement }) => {
  const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
