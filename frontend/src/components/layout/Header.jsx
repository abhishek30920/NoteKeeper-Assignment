import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { Moon, Sun, LogOut, Plus } from 'lucide-react';
import useThemeStore from '../../store/theme';
import { useAuth } from '../../hooks/useAuth';
import AddNotes from '../notes/AddNotes';

const Header = () => {
  const { theme, toggleTheme } = useThemeStore();
  const { user, logout } = useAuth();

  return (
    <header className={`
      ${theme === 'dark'
        ? 'bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white shadow-2xl shadow-gray-900/50'
        : 'bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 text-gray-800 shadow-xl shadow-blue-100/50'
      }
      p-4 fixed w-full top-0 z-50 transition-all duration-300 ease-in-out
    `}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <Link 
          to="/" 
          className="text-2xl font-bold hover:text-indigo-600 transition-colors duration-200 font-sans mb-4 md:mb-0"
        >
          NotesKeeper
        </Link>

        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6">
          {user ? (
            <>
              <Link 
                to="/notes"
                className="font-medium hover:text-indigo-600 transition-colors duration-200"
              >
                My Notes
              </Link>
              <AddNotes>
                <Button
                  variant="default"
                  className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                  <Plus size={18} className="hidden sm:block" />
                  <span>Add Notes</span>
                </Button>
              </AddNotes>
             
              <Button 
                variant="ghost" 
                onClick={logout}
                className="flex items-center gap-2 hover:text-red-600"
              >
                <LogOut size={18} className="hidden sm:block" />
                <span>Logout</span>
              </Button>
            
            </>
          ) : (
            <>
              <Link 
                to="/login"
                className="font-medium hover:text-indigo-600 transition-colors duration-200"
              >
                Login
              </Link>
              <Link 
                to="/register"
                className="font-medium hover:text-indigo-600 transition-colors duration-200"
              >
                Register
              </Link>
            </>
          )}
          
          <Button 
            variant="outline" 
            onClick={toggleTheme}
            className="flex items-center justify-center w-10 h-10 rounded-full"
          >
            {theme === 'dark' ? 
              <Sun size={18} /> : 
              <Moon size={18} />
            }
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
