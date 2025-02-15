import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { api } from '../lib/api';

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      loading: false,
      error: null,

      login: async ({ email, password }) => {
        try {
          set({ loading: true, error: null });
          const response = await api.post('/auth/login', { email, password });
          const { user, token } = response.data;

          set({
            user,
            token,
            loading: false,
            error: null,
          });

          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          toast.success('Login successful!');

          return response.data;
        } catch (error) {
          console.log(error)
          const errorMessage = error.response?.data?.error || 'Login failed';
          set({
            error: errorMessage,
            loading: false,
            user: null,
            token: null,
          });
          toast.error(errorMessage);
          throw new Error(errorMessage);
        }
      },

      register: async (userData) => {
        try {
          set({ loading: true, error: null });
          const response = await api.post('/auth/register', userData);
          const { user, token } = response.data;

          set({
            user,
            token,
            loading: false,
          });

          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          toast.success('Registration successful!');

          return response.data;
        } catch (error) {
          const errorMessage = error.response?.data?.message || 'Registration failed';
          set({
            error: errorMessage,
            loading: false,
          });
          toast.error(errorMessage);
          throw new Error(errorMessage);
        }
      },

      logout: () => {
        delete api.defaults.headers.common['Authorization'];
        set({
          user: null,
          token: null,
          error: null,
        });
        toast.info('Logged out successfully.');
      },

      updateProfile: async (userData) => {
        try {
          set({ loading: true, error: null });
          const response = await api.put('/auth/profile', userData);

          set({
            user: response.data,
            loading: false,
          });

          toast.success('Profile updated successfully!');
          return response.data;
        } catch (error) {
          const errorMessage = error.response?.data?.message || 'Profile update failed';
          set({
            error: errorMessage,
            loading: false,
          });
          toast.error(errorMessage);
          throw new Error(errorMessage);
        }
      },

      isAuthenticated: () => !!get().token,
      getUser: () => get().user,
      getError: () => get().error,
      isLoading: () => get().loading,
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        token: state.token,
      }),
    }
  )
);

export default useAuthStore;
