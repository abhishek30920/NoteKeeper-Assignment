import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import useThemeStore from '../store/theme';
import useAuthStore from '../store/auth';

const Home = () => {
  const { theme } = useThemeStore();
  const token = useAuthStore((state) => state.token);
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (!token) {
      navigate('/login');
    } else {
      navigate('/notes');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div 
      className={`min-h-full w-full flex items-center justify-center mt-2 lg:rounded-2xl h-200
        ${theme === 'dark' 
          ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900' 
          : 'bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100'
        }
      `}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 py-8 sm:py-12">
        <motion.h1 
          className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 
            ${theme === 'dark' ? 'text-white' : 'text-gray-900'}
            background-animate`}
          variants={itemVariants}
        >
          Welcome to Notekeeper
        </motion.h1>
        
        <motion.p 
          className={`text-base sm:text-lg md:text-xl mb-8 sm:mb-12 
            ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}
            max-w-2xl mx-auto`}
          variants={itemVariants}
        >
          Your personal space for capturing thoughts, ideas, and important information.
          Keep your notes organized and accessible anywhere.
        </motion.p>

        <motion.button 
          onClick={handleGetStarted}
          className={`px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-medium text-base sm:text-lg
            ${theme === 'dark' 
              ? 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white' 
              : 'bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-500 hover:to-purple-500 text-white'
            }
            transition-all duration-300 ease-in-out transform hover:scale-105`}
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Get Started
        </motion.button>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mt-12 sm:mt-16"
          variants={containerVariants}
        >
          {[
            { title: "Easy to Use", desc: "Simple and intuitive interface for managing your notes" },
            { title: "Organized", desc: "Keep your notes sorted and easily searchable" },
            { title: "Secure", desc: "Your notes are private and protected" }
          ].map((feature, index) => (
            <motion.div 
              key={index}
              className={`p-4 sm:p-6 rounded-xl 
                ${theme === 'dark' 
                  ? 'bg-gray-800/30 backdrop-blur-sm' 
                  : 'bg-white/30 backdrop-blur-sm'
                }
                hover:transform hover:scale-105 transition-all duration-300`}
              variants={itemVariants}
            >
              <h2 className={`text-xl sm:text-2xl font-bold mb-2 sm:mb-3 
                ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {feature.title}
              </h2>
              <p className={`text-sm sm:text-base ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Home;