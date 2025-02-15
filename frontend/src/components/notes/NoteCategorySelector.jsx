import React, { useState } from 'react';
import useThemeStore from '../../store/theme';
import { useNotes } from '../../hooks/useNotes';
import { Badge } from '../ui/badge';
import NoteCards from './NoteCards';
import { NoteFilter } from './NoteFilter';
import { motion } from 'framer-motion';

const notesCategories = ['All', 'Work', 'Personal', 'Ideas', 'Todos'];

const NoteCategorySelector = () => {
  const { notes } = useNotes();
  const { theme } = useThemeStore();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleSearch = (query) => {
    setSearchTerm(query.toLowerCase());
  };

  const filteredNotes = notes.filter((note) => {
    const categoryMatch = selectedCategory === 'All' || note.category === selectedCategory;
    const searchMatch =
      searchTerm === '' ||
      note.title.toLowerCase().includes(searchTerm) ||
      note.content.toLowerCase().includes(searchTerm);
    return categoryMatch && searchMatch;
  });

  const getBadgeColors = (category, isSelected) => {
    const baseColors = {
      'All': 'from-blue-500 to-blue-600',
      'Work': 'from-purple-500 to-purple-600',
      'Personal': 'from-pink-500 to-pink-600',
      'Ideas': 'from-green-500 to-green-600',
      'Todos': 'from-orange-500 to-orange-600'
    };

    if (theme === 'dark') {
      return isSelected
        ? `bg-gradient-to-r ${baseColors[category]} text-white`
        : 'bg-gray-800 text-gray-300 hover:bg-gray-700';
    }
    
    return isSelected
      ? `bg-gradient-to-r ${baseColors[category]} text-white`
      : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200';
  };

  return (
    <div className={`relative mt-16 sm:mt-0 p-4 rounded-xl transition-colors duration-300 ${
      theme === 'dark'
        ? 'bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white'
        : 'bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 text-gray-800'
    }`}>
      {/* Search Container with Fixed Position */}
      <div className="sticky top-16 z-10 pt-1  px-2 ">
        <NoteFilter onFilter={handleSearch} />
      </div>

      {/* Categories Container */}
      <div className="flex flex-wrap gap-2 mb-6 px-2 py-2">
        {notesCategories.map((category) => (
          <motion.div
            key={category}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Badge
              onClick={() => handleCategoryChange(category)}
              className={`
                px-4 py-2 
                text-sm md:text-base
                font-medium
                rounded-full
                cursor-pointer
                transition-all
                duration-300
                transform
                shadow-lg
                hover:shadow-xl
                ${getBadgeColors(category, selectedCategory === category)}
              `}
            >
              {category}
            </Badge>
          </motion.div>
        ))}
      </div>

      {/* Notes List */}
      <div className="mt-4">
        <NoteCards filteredNotes={filteredNotes} />
      </div>
    </div>
  );
};

export default NoteCategorySelector;