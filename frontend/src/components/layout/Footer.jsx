import React from 'react'
import useThemeStore from '../../store/theme';
const Footer = () => {
  const { theme } = useThemeStore();
  
  return (
    <div className={`
      ${theme === 'dark' 
        ? 'bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white shadow-2xl shadow-gray-900/50' 
        : 'bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 text-gray-800 shadow-xl shadow-blue-100/50'
      }
      p-8 rounded-t-lg border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}
      transition-all duration-300 ease-in-out
    
    `}>
      <div className="container mx-auto text-center">
        <p className="text-lg font-semibold mb-2">NotesKeeper</p>
        <p className="text-sm opacity-80">Copyright 2025</p>
        <p className="text-sm opacity-80">All rights reserved</p>
      </div>
    </div>
  )
}

export default Footer
