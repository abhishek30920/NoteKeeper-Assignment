import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2 } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import useThemeStore from '../store/theme';

export default function Register() {
  const navigate = useNavigate();
  const {register: registerUser} = useAuth();
  const {theme} = useThemeStore();
  const validationSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'), 
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(8, 'Please confirm your password')
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"]
  });

  const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm({
    resolver: zodResolver(validationSchema)
  });

  const onSubmit = async (data) => {
    try {
      await registerUser({
        email: data.email,
        password: data.password,
        name: data.name
      });
    } catch (error) {
      console.error('Registration failed:', error);
   
    }
  };

  return (
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
            Create your account
          </h2>
          <p className={`mt-2 text-center text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            Or{' '}
            <Link
              to="/login"
              className="font-medium text-indigo-500 hover:text-indigo-400 transition-colors duration-200"
            >
              sign in to your account
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="name" className="sr-only">
                Full name
              </label>
              <input
                {...register('name')}
                id="name"
                type="text"
                autoComplete="name"
                className={`
                  appearance-none rounded-t-md relative block w-full px-3 py-2 border
                  ${theme === 'dark'
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }
                  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm
                `}
                placeholder="Full name"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>
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
                  appearance-none relative block w-full px-3 py-2 border
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
                autoComplete="new-password"
                className={`
                  appearance-none relative block w-full px-3 py-2 border
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
            <div>
              <label htmlFor="confirmPassword" className="sr-only">
                Confirm password
              </label>
              <input
                {...register('confirmPassword')}
                id="confirmPassword"
                type="password"
                autoComplete="new-password"
                className={`
                  appearance-none rounded-b-md relative block w-full px-3 py-2 border
                  ${theme === 'dark'
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }
                  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm
                `}
                placeholder="Confirm password"
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.confirmPassword.message}
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
                'Create account'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}