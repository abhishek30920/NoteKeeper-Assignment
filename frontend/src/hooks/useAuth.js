import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/auth';

export const useAuth = () => {
  const navigate = useNavigate();
  const { 
    user, 
    login,
   logout,
   register,
    updateProfile,
    isAuthenticated,
    error
  } = useAuthStore();

  const handleLogin = useCallback(async (credentials) => {
    await login(credentials);
    navigate('/notes');
  }, [login, navigate]);

  const handleLogout = useCallback(() => {
    logout();
    navigate('/login');
  }, [logout, navigate]);
  const handleRegister = useCallback(async (userData) => {
    console.log(userData);
    await register(userData);
    navigate('/notes');
  }, [register, navigate]);

  return {
    user,
    error,
    isAuthenticated,
    login: handleLogin,
    logout: handleLogout,
    register: handleRegister,
    updateProfile
  };
};