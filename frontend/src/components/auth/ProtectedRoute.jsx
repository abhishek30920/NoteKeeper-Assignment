import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuthStore from "../../store/auth";

// PrivateRoute: Protects routes that require authentication
export function PrivateRoute({ children }) {
  const token = useAuthStore((state) => state.token);
  const location = useLocation();

  // If no token exists, redirect to login while saving the attempted path
  if (!token) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // If authenticated, render the protected component
  return children;
}

// PublicRoute: Prevents authenticated users from accessing public routes
