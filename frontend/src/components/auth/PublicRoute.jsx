import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuthStore from "../../store/auth";
export function PublicRoute({ children }) {
  const token = useAuthStore((state) => state.token);
  const location = useLocation();

  // If user is authenticated, redirect to notes page
  if (token) {
    // Redirect to the originally attempted path if it exists, otherwise go to notes
    const destination = location.state?.from || '/notes';
    return <Navigate to={destination} replace />;
  }

  // If not authenticated, render the public component
  return children;
}