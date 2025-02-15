import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import { ToastContainer } from 'react-toastify';
import Layout from './components/layout/Layout';
import Notes from './pages/Notes';
import Home from './pages/Home';
import { PrivateRoute } from './components/auth/ProtectedRoute';
import { PublicRoute } from './components/auth/PublicRoute';

function App() {
  return (
    <>
      {/* Toast container for notifications */}
      <ToastContainer position="top-right" autoClose={3000} />
      
      <BrowserRouter className='min-h-screen'>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* Public home page - accessible to all */}
            <Route index element={<Home />} />

            {/* Authentication routes - protected from authenticated users */}
            <Route 
              path="/login" 
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route 
              path="/register" 
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
            />

            {/* Protected routes - require authentication */}
            <Route 
              path="/notes" 
              element={
                <PrivateRoute>
                  <Notes />
                </PrivateRoute>
              }
            />

            {/* Catch-all route for undefined paths */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;