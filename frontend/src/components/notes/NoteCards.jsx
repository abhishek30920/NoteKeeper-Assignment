import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { PlusCircle, StickyNote } from 'lucide-react';
import NoteCard from './NoteCard';
import { useNotes } from '../../hooks/useNotes';
import useThemeStore from '../../store/theme';
import AddNotes from './AddNotes';

const EmptyState = ({ onCreateNote }) => {
  const { theme } = useThemeStore();
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center col-span-full h-[70vh] px-4"
    >
      <div className={`p-6 rounded-xl text-center max-w-md mx-auto ${
        theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-50'
      }`}>
        <motion.div
          animate={{ 
            rotate: [0, 10, -10, 10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="inline-block mb-4"
        >
          <StickyNote size={64} className={`${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
          }`} />
        </motion.div>
        
        <h3 className={`text-xl font-semibold mb-2 ${
          theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
        }`}>
          Start Your Note Collection
        </h3>
        
        <p className={`mb-6 ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
        }`}>
          Capture your thoughts, ideas, and tasks. Create your first note to get started!
        </p>
        <AddNotes>
                <Button
                  variant="default"
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <PlusCircle className="w-5 h-5 mr-2" />
                  <span>Add Notes</span>
                </Button>
              </AddNotes>
        
      </div>
    </motion.div>
  );
};

const NoteCards = ({ filteredNotes, onCreateNote }) => {
  const { theme } = useThemeStore();
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 h-[70vh] ${
        theme === 'dark'
          ? 'bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white shadow-2xl shadow-gray-900/50'
          : 'bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 text-gray-800 shadow-xl shadow-purple-100/50'
      }`}
    >
      {filteredNotes.length > 0 ? (
        filteredNotes.map((note) => (
          <motion.div
            key={note._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <NoteCard note={note} />
          </motion.div>
        ))
      ) : (
        <EmptyState onCreateNote={AddNotes} />
      )}
    </motion.div>
  );
};

export default NoteCards;