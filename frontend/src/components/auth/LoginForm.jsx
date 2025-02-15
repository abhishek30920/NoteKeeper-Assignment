import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2 } from 'lucide-react';



import useThemeStore from './../../store/theme';
import { useAuth } from './../../hooks/useAuth';
const loginSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export default function LoginForm() {
  const { theme } = useThemeStore();
  const navigate = useNavigate();
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      await login({email: data.email, password: data.password});
    } catch (error) {
      console.error('Login failed:', error);
    
    }
  };

  return (
    <>
 
    <div className={`
      min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8
      ${theme === 'dark'
        ? 'bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900'
        : 'bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50'
      }
      transition-all duration-300 ease-in-out
    `}>
      <div className={`
        max-w-md w-full space-y-8 p-8 rounded-lg
        ${theme === 'dark'
          ? 'bg-gray-800 shadow-2xl shadow-gray-900/50'
          : 'bg-white shadow-xl shadow-blue-100/50'
        }
      `}>
        <div>
          <h2 className={`mt-6 text-center text-3xl font-extrabold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Sign in to your account
          </h2>
          <p className={`mt-2 text-center text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            Or{' '}
            <Link
              to="/register"
              className="font-medium text-indigo-500 hover:text-indigo-400 transition-colors duration-200"
            >
              create a new account
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                {...register('email')}
                id="email"
                type="email"
                autoComplete="email"
                className={`
                  appearance-none rounded-t-md relative block w-full px-3 py-2 border
                  ${theme === 'dark'
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }
                  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm
                `}
                placeholder="Email address"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                {...register('password')}
                id="password"
                type="password"
                autoComplete="current-password"
                className={`
                  appearance-none rounded-b-md relative block w-full px-3 py-2 border
                  ${theme === 'dark'
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }
                  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm
                `}
                placeholder="Password"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {isSubmitting ? (
                <Loader2 className="animate-spin h-5 w-5" />
              ) : (
                'Sign in'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
}